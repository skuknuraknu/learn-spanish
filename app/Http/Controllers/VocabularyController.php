<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserSentenceProgress;
use App\Models\WordBreakdown;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VocabularyController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user() ?? User::query()->first();

        // Get all progress for user
        $progress = $user
            ? UserSentenceProgress::where('user_id', $user->id)->get()->keyBy('sentence_id')
            : collect();

        $query = WordBreakdown::with(['sentence.section']);

        // Search query
        if ($search = trim((string) $request->input('search'))) {
            $query->where(function ($q) use ($search) {
                $q->where('word', 'like', "%{$search}%")
                    ->orWhere('literal_translation', 'like', "%{$search}%")
                    ->orWhere('grammar_notes', 'like', "%{$search}%")
                    ->orWhereHas('sentence', function ($sq) use ($search) {
                        $sq->where('spanish_text', 'like', "%{$search}%")
                            ->orWhere('translation', 'like', "%{$search}%");
                    });
            });
        }

        // Part of Speech filter
        if ($pos = $request->input('part_of_speech')) {
            if ($pos !== 'all') {
                $query->where('part_of_speech', $pos);
            }
        }

        // Mastery status filter:
        if ($status = $request->input('status')) {
            if ($status !== 'all') {
                if ($status === 'mastered') {
                    $masteredSentenceIds = $progress->where('status', 'mastered')->pluck('sentence_id');
                    $query->whereIn('sentence_id', $masteredSentenceIds);
                } elseif ($status === 'learning') {
                    $learningSentenceIds = $progress->where('status', 'learning')->pluck('sentence_id');
                    $query->whereIn('sentence_id', $learningSentenceIds);
                } elseif ($status === 'new') {
                    $knownSentenceIds = $progress->pluck('sentence_id');
                    $query->whereNotIn('sentence_id', $knownSentenceIds);
                }
            }
        }

        $paginated = $query->orderBy('word', 'asc')
            ->paginate(12)
            ->withQueryString();

        // Transform items to strict format
        $paginated->getCollection()->transform(function ($item) use ($progress) {
            $prog = $progress->get($item->sentence_id);

            return [
                'id' => $item->id,
                'word' => $item->word,
                'literal_translation' => $item->literal_translation,
                'part_of_speech' => $item->part_of_speech,
                'grammar_notes' => $item->grammar_notes,
                'sentence_context' => $item->sentence?->spanish_text ?? '',
                'sentence_translation' => $item->sentence?->translation ?? '',
                'sentence_id' => $item->sentence_id,
                'section_id' => $item->sentence?->learning_section_id,
                'mastery_level' => $prog?->status ?? 'new',
                'review_count' => $prog?->review_count ?? 0,
            ];
        });

        // Parts of speech list
        $partsOfSpeech = WordBreakdown::select('part_of_speech')
            ->distinct()
            ->orderBy('part_of_speech')
            ->pluck('part_of_speech')
            ->all();

        // Calculate general vocabulary statistics
        $masteredSentenceIds = $progress->where('status', 'mastered')->pluck('sentence_id');
        $learningSentenceIds = $progress->where('status', 'learning')->pluck('sentence_id');

        $totalWords = WordBreakdown::count();
        $masteredWords = WordBreakdown::whereIn('sentence_id', $masteredSentenceIds)->count();
        $learningWords = WordBreakdown::whereIn('sentence_id', $learningSentenceIds)->count();

        return Inertia::render('vocabulary', [
            'items' => $paginated,
            'filters' => [
                'search' => $request->input('search', ''),
                'partOfSpeech' => $request->input('part_of_speech', 'all'),
                'masteryStatus' => $request->input('status', 'all'),
            ],
            'partsOfSpeech' => $partsOfSpeech,
            'stats' => [
                'totalWords' => $totalWords,
                'masteredWords' => $masteredWords,
                'learningWords' => $learningWords,
            ],
        ]);
    }

    public function toggleMastery(Request $request, WordBreakdown $wordBreakdown): RedirectResponse
    {
        $user = $request->user() ?? User::query()->first();
        if (! $user) {
            return redirect()->back();
        }

        $progress = UserSentenceProgress::firstOrNew([
            'user_id' => $user->id,
            'sentence_id' => $wordBreakdown->sentence_id,
        ]);

        $progress->status = ($progress->status === 'mastered') ? 'learning' : 'mastered';
        $progress->review_count = ($progress->review_count ?? 0) + 1;
        $progress->last_reviewed_at = now();
        $progress->save();

        return redirect()->back();
    }
}
