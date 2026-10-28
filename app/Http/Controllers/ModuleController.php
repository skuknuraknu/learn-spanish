<?php

namespace App\Http\Controllers;

use App\Models\LearningModule;
use App\Models\User;
use App\Models\UserSentenceProgress;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ModuleController extends Controller
{
    public function index(Request $request): Response
    {
        // No auth yet: fall back to the first user so progress shows up.
        $user = $request->user() ?? User::query()->first();

        $mastered = $user
            ? UserSentenceProgress::where('user_id', $user->id)->where('status', 'mastered')->pluck('sentence_id')->flip()
            : collect();

        $modules = LearningModule::with('sections.sentences:id,learning_section_id')
            ->orderBy('order_index')
            ->get()
            ->map(function (LearningModule $module) use ($mastered) {
                $sections = $module->sections->map(function ($section) use ($mastered) {
                    $ids = $section->sentences->pluck('id');
                    $done = $ids->filter(fn ($id) => $mastered->has($id))->count();

                    return [
                        'id' => $section->id,
                        'title' => $section->title,
                        'description' => $section->description,
                        'sentenceCount' => $ids->count(),
                        'masteredCount' => $done,
                        'completed' => $ids->count() > 0 && $done === $ids->count(),
                    ];
                })->values();

                return [
                    'id' => $module->id,
                    'title' => $module->title,
                    'description' => $module->description,
                    'difficulty' => $module->difficulty_level,
                    'completedSections' => $sections->where('completed', true)->count(),
                    'sections' => $sections,
                ];
            })->values();

        return Inertia::render('modules', ['modules' => $modules]);
    }
}
