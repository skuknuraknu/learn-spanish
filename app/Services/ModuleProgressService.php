<?php

namespace App\Services;

use App\Models\LearningModule;
use App\Models\LearningSection;
use App\Models\User;
use App\Models\UserSentenceProgress;
use Illuminate\Support\Collection;

class ModuleProgressService
{
    /**
     * Get a flipped collection of mastered sentence IDs for fast O(1) lookup.
     *
     * @return \Illuminate\Support\Collection<int, int>
     */
    public static function getMasteredSentenceIds(?User $user): Collection
    {
        $user = $user ?? User::query()->first();

        return $user
            ? UserSentenceProgress::where('user_id', $user->id)
                ->where('status', 'mastered')
                ->pluck('sentence_id')
                ->flip()
            : collect();
    }

    /**
     * Check if a specific module is locked for the user.
     * A module is locked if any preceding module (by order_index) is not completed.
     */
    public static function isModuleLocked(LearningModule $module, ?User $user): bool
    {
        $allModules = LearningModule::with('sections.sentences:id,learning_section_id')
            ->orderBy('order_index')
            ->get();

        $mastered = self::getMasteredSentenceIds($user);

        foreach ($allModules as $m) {
            if ($m->id === $module->id) {
                // If we reached this module and all previous modules were completed, it's unlocked.
                return false;
            }

            $sentenceIds = $m->sections->flatMap->sentences->pluck('id');
            $isCompleted = $sentenceIds->isNotEmpty() && $sentenceIds->every(fn ($id) => $mastered->has($id));

            if (! $isCompleted) {
                // A preceding module is incomplete, so $module is locked.
                return true;
            }
        }

        return false;
    }

    /**
     * Check if a specific section belongs to a locked module.
     */
    public static function isSectionLocked(LearningSection $section, ?User $user): bool
    {
        $module = $section->module ?? LearningModule::find($section->learning_module_id);
        if (! $module) {
            return false;
        }

        return self::isModuleLocked($module, $user);
    }
}
