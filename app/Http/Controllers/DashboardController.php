<?php

namespace App\Http\Controllers;

use App\Models\LearningModule;
use App\Models\User;
use App\Models\UserSentenceProgress;
use App\Models\WordBreakdown;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function show(Request $request): Response
    {
        // No auth yet: fall back to the first user so the dashboard has data.
        $user = $request->user() ?? User::query()->first();

        $progress = $user
            ? UserSentenceProgress::where('user_id', $user->id)->get()->keyBy('sentence_id')
            : collect();

        $modules = LearningModule::with(['sections.sentences:id,learning_section_id'])
            ->orderBy('order_index')
            ->get();

        $current = null;
        $totalSentences = 0;
        $totalMastered = 0;
        $isUnlocked = true;

        $moduleData = $modules->map(function (LearningModule $module) use ($progress, &$current, &$totalSentences, &$totalMastered, &$isUnlocked) {
            $sentenceCount = 0;
            $mastered = 0;

            foreach ($module->sections as $section) {
                $ids = $section->sentences->pluck('id');
                $sectionMastered = $ids->filter(fn ($id) => ($progress[$id]->status ?? 'new') === 'mastered')->count();
                $sentenceCount += $ids->count();
                $mastered += $sectionMastered;

                // The current section is the first one that isn't fully mastered in an unlocked module.
                if ($isUnlocked && $current === null && $ids->count() > 0 && $sectionMastered < $ids->count()) {
                    $current = [
                        'moduleTitle' => $module->title,
                        'sectionTitle' => $section->title,
                        'completed' => $sectionMastered,
                        'total' => $ids->count(),
                        'progress' => (int) round($sectionMastered / $ids->count() * 100),
                        'started' => $ids->contains(fn ($id) => isset($progress[$id])),
                    ];
                }
            }

            $totalSentences += $sentenceCount;
            $totalMastered += $mastered;

            $pct = $sentenceCount ? (int) round($mastered / $sentenceCount * 100) : 0;
            $isCompleted = $pct === 100 && $sentenceCount > 0;
            $started = $module->sections->flatMap->sentences->contains(fn ($s) => isset($progress[$s->id]));

            $isLocked = ! $isUnlocked;
            if (! $isCompleted) {
                $isUnlocked = false;
            }

            $status = $isLocked ? 'locked' : ($isCompleted ? 'completed' : ($started ? 'in_progress' : 'not_started'));

            return [
                'id' => $module->id,
                'title' => $module->title,
                'description' => $module->description,
                'difficulty' => $module->difficulty_level,
                'sectionCount' => $module->sections->count(),
                'sentenceCount' => $sentenceCount,
                'progress' => $pct,
                'status' => $status,
                'isLocked' => $isLocked,
            ];
        })->values();

        $masteredIds = $progress->where('status', 'mastered')->keys();

        return Inertia::render('dashboard', [
            'userName' => $user?->name ?? 'Learner',
            'stats' => [
                'streak' => $this->streak($progress),
                'masteredWords' => WordBreakdown::whereIn('sentence_id', $masteredIds)->count(),
                'overallProgress' => $totalSentences ? (int) round($totalMastered / $totalSentences * 100) : 0,
            ],
            'current' => $current,
            'modules' => $moduleData,
        ]);
    }

    /** Consecutive days with a review, ending today or yesterday. */
    private function streak($progress): int
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
