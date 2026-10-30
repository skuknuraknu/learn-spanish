<?php

namespace App\Http\Controllers;

use App\Models\LearningSection;
use App\Models\Sentence;
use App\Models\User;
use App\Models\UserSentenceProgress;
use App\Services\ModuleProgressService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class QuizController extends Controller
{
    public function show(Request $request, ?LearningSection $learningSection = null): Response|RedirectResponse
    {
        $user = $request->user() ?? User::query()->first();

        // If section is passed via query param ?section_id=
        if (! $learningSection && $request->has('section_id')) {
            $learningSection = LearningSection::find($request->query('section_id'));
        }

        if ($learningSection) {
            if (ModuleProgressService::isSectionLocked($learningSection, $user)) {
                return redirect()->route('modules')->with('error', 'Kuis untuk modul ini masih terkunci. Selesaikan modul sebelumnya terlebih dahulu.');
            }

            $learningSection->load('module');
            $sentences = $learningSection->sentences()->with('words')->get();
            $sectionContext = [
                'id' => $learningSection->id,
                'title' => $learningSection->title,
                'moduleTitle' => $learningSection->module?->title ?? 'Learning Module',
            ];
            $title = 'Quiz: '.$learningSection->title;
        } else {
            $sentences = Sentence::with(['words', 'section.module'])->inRandomOrder()->take(10)->get();
            $sectionContext = null;
            $title = 'General Spanish Practice Quiz';
        }

        // Global pool of translations for realistic distractors
        $allTranslations = Sentence::pluck('translation')->unique()->values()->all();

        $questions = [];
        $index = 1;

        foreach ($sentences as $sentence) {
            // Build distractor options (3 distractors + 1 correct)
            $distractors = collect($allTranslations)
                ->filter(fn ($t) => $t !== $sentence->translation)
                ->shuffle()
                ->take(3)
                ->all();

            // If not enough unique sentence translations, fill with simple alternatives
            while (count($distractors) < 3) {
                $distractors[] = 'Alternative translation '.count($distractors);
            }

            $options = collect([...$distractors, $sentence->translation])->shuffle()->values()->all();

            // Format breakdown hint
            $hintParts = $sentence->words->map(function ($w) {
                $note = $w->grammar_notes ? ' ('.$w->grammar_notes.')' : '';
                return "{$w->word}: {$w->literal_translation}{$note}";
            })->take(4)->implode(' • ');

            // Mix question types (alternating between multiple-choice and flashcard by default)
            $questionType = ($index % 2 === 1) ? 'multiple-choice' : 'flashcard';

            $questions[] = [
                'id' => $index,
                'sentence_id' => $sentence->id,
                'question_type' => $questionType,
                'prompt' => 'What is the correct translation for this sentence?',
                'spanish_text' => $sentence->spanish_text,
                'options' => $options,
                'correct_answer' => $sentence->translation,
                'explanation' => "Sentence: \"{$sentence->spanish_text}\" translates to \"{$sentence->translation}\".",
                'word_breakdown_hint' => $hintParts ?: null,
                'category' => $sentence->category,
                'difficulty' => $sentence->difficulty_level,
            ];

            $index++;
        }

        // Calculate streak
        $progress = $user
            ? UserSentenceProgress::where('user_id', $user->id)->get()
            : collect();

        $streak = $this->calculateStreak($progress);

        return Inertia::render('quiz', [
            'title' => $title,
            'section' => $sectionContext,
            'questions' => $questions,
            'currentStreak' => $streak,
        ]);
    }

    public function finish(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'results' => 'required|array',
            'results.*.sentence_id' => 'required|integer|exists:sentences,id',
            'results.*.is_correct' => 'required|boolean',
            'results.*.rating' => 'nullable|string',
            'score' => 'nullable|integer',
        ]);

        $user = $request->user() ?? User::query()->first();
        if (! $user) {
            return redirect()->back();
        }

        foreach ($validated['results'] as $item) {
            $progress = UserSentenceProgress::firstOrNew([
                'user_id' => $user->id,
                'sentence_id' => $item['sentence_id'],
            ]);

            $isCorrect = (bool) $item['is_correct'];
            $rating = $item['rating'] ?? null;

            // Mastery progression logic
            if ($isCorrect || in_array($rating, ['good', 'easy'], true)) {
                if ($progress->status === 'learning' || $rating === 'easy') {
                    $progress->status = 'mastered';
                } else {
                    $progress->status = 'learning';
                }
            } else {
                $progress->status = 'learning';
            }

            $progress->review_count = ($progress->review_count ?? 0) + 1;
            $progress->last_reviewed_at = now();
            $progress->save();
        }

        return redirect()->back();
    }

    private function calculateStreak($progress): int
    {
        $days = $progress->pluck('last_reviewed_at')->filter()
            ->map(fn ($d) => $d->toDateString())->unique()->flip();

        $day = now()->startOfDay();
        if (! $days->has($day->toDateString())) {
            $day = $day->subDay();
        }

        $streak = 0;
        while ($days->has($day->toDateString())) {
            $streak++;
            $day = $day->subDay();
        }

        return $streak;
    }
}
