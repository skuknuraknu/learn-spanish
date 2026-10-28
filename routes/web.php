<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LearningController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\VocabularyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::get('/dashboard', [DashboardController::class, 'show'])->name('dashboard');
Route::get('/modules', [ModuleController::class, 'index'])->name('modules');
Route::get('/learn', [LearningController::class, 'resume'])->name('learn');
Route::get('/learn/{learningSection}', [LearningController::class, 'show'])->name('learn.section');
Route::post('/sentences/{sentence}/mastered', [LearningController::class, 'markMastered'])->name('sentences.mastered');

Route::get('/quiz', [QuizController::class, 'show'])->name('quiz');
Route::get('/quiz/{learningSection}', [QuizController::class, 'show'])->name('quiz.section');
Route::post('/quiz/finish', [QuizController::class, 'finish'])->name('quiz.finish');

Route::get('/vocabulary', [VocabularyController::class, 'index'])->name('vocabulary');
Route::post('/vocabulary/{wordBreakdown}/mastery', [VocabularyController::class, 'toggleMastery'])->name('vocabulary.mastery');

Route::get('/settings', fn () => Inertia::render('coming-soon', ['title' => 'Settings', 'description' => 'Customize your experience.']))->name('settings');
