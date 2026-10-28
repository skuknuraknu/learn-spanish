<?php

namespace App\Http\Controllers;

use App\Models\LearningSection;
use App\Models\Sentence;
use App\Models\User;
use App\Models\UserSentenceProgress;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LearningController extends Controller
{
    /** Resume: send the user to the first section that isn't fully mastered. */
    public function resume(Request $request): RedirectResponse
    {
        $mastered = $this->masteredIds($request);

        $sections = LearningSection::with('sentences:id,learning_section_id')
            ->orderBy('learning_module_id')->orderBy('order_index')->get();

        $target = $sections->first(
            fn ($s) => $s->sentences->isNotEmpty() && $s->sentences->contains(fn ($x) => ! $mastered->has($x->id))
        ) ?? $sections->first();

        return $target
            ? redirect()->route('learn.section', $target)
            : redirect()->route('modules');
    }

    public function show(Request $request, LearningSection $learningSection): Response
    {
        $mastered = $this->masteredIds($request);
        $section = $learningSection->load('module');

        return Inertia::render('learn', [
            'section' => [
                'id' => $section->id,
                'title' => $section->title,
                'description' => $section->description,
                'moduleTitle' => $section->module->title,
            ],
            // Deferred: the page renders a skeleton first, then this loads.
            'learning' => Inertia::defer(fn () => $section->sentences()->with('words')->get()
                ->map(fn (Sentence $s) => [
                    'id' => $s->id,
                    'sentence' => $s->spanish_text,
                    'translation' => $s->translation,
                    'difficulty' => $s->difficulty_level,
                    'grammarCategory' => $s->category,
                    'mastered' => $mastered->has($s->id),
                    'words' => $s->words->map(fn ($w) => [
                        'word' => $w->word,
                        'translation' => $w->literal_translation,
                        'partOfSpeech' => $w->part_of_speech,
                        'grammarNotes' => $w->grammar_notes ?? '',
                    ])->values(),
                ])->values()),
        ]);
    }

    public function markMastered(Request $request, Sentence $sentence): RedirectResponse
    {
        $user = $request->user() ?? User::query()->first();
        abort_unless($user, 403);

        $progress = UserSentenceProgress::firstOrNew(['user_id' => $user->id, 'sentence_id' => $sentence->id]);
        $progress->status = 'mastered';
        $progress->review_count = ($progress->review_count ?? 0) + 1;
        $progress->last_reviewed_at = now();
        $progress->save();

        return back();
    }

    private function masteredIds(Request $request)
    {
        $user = $request->user() ?? User::query()->first();

        return $user
            ? UserSentenceProgress::where('user_id', $user->id)->where('status', 'mastered')->pluck('sentence_id')->flip()
            : collect();
    }
}
