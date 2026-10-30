<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LearningController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\SettingsController;
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

Route::get('/settings', [SettingsController::class, 'show'])->name('settings');
Route::patch('/settings/profile', [SettingsController::class, 'updateProfile'])->name('settings.profile');
Route::put('/settings/password', [SettingsController::class, 'updatePassword'])->name('settings.password');
Route::post('/settings/preferences', [SettingsController::class, 'updatePreferences'])->name('settings.preferences');
Route::post('/settings/reset-progress', [SettingsController::class, 'resetProgress'])->name('settings.reset-progress');
Route::delete('/settings/account', [SettingsController::class, 'deleteAccount'])->name('settings.account');
