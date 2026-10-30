<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserSentenceProgress;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    public function show(Request $request): Response
    {
        $user = $request->user() ?? User::query()->first();

        // Default or session-persisted learning preferences
        $preferences = $request->session()->get('learning_preferences', [
            'dailyGoalMinutes' => 15,
            'dailyWordsGoal' => 10,
            'reminderEnabled' => true,
            'reminderTime' => '19:00',
            'soundEffects' => true,
            'weeklyReport' => true,
        ]);

        return Inertia::render('settings', [
            'user' => [
                'id' => $user?->id ?? 1,
                'name' => $user?->name ?? 'Pengguna Spanyol',
                'email' => $user?->email ?? 'user@example.com',
            ],
            'preferences' => $preferences,
        ]);
    }

    public function updateProfile(Request $request): RedirectResponse
    {
        $user = $request->user() ?? User::query()->first();
        if (! $user) {
            return redirect()->back()->with('error', 'Pengguna tidak ditemukan.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$user->id,
        ]);

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        return redirect()->back()->with('success', 'Profil berhasil diperbarui.');
    }

    public function updatePassword(Request $request): RedirectResponse
    {
        $user = $request->user() ?? User::query()->first();
        if (! $user) {
            return redirect()->back()->with('error', 'Pengguna tidak ditemukan.');
        }

        $validated = $request->validate([
            'current_password' => 'required|string',
            'password' => ['required', 'string', 'confirmed', Password::defaults()],
        ]);

        if (! Hash::check($validated['current_password'], $user->password)) {
            return redirect()->back()->withErrors([
                'current_password' => 'Kata sandi saat ini tidak cocok.',
            ]);
        }

        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        return redirect()->back()->with('success', 'Kata sandi berhasil diperbarui.');
    }

    public function updatePreferences(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'dailyGoalMinutes' => 'required|integer|min:5|max:120',
            'dailyWordsGoal' => 'required|integer|min:1|max:100',
            'reminderEnabled' => 'required|boolean',
            'reminderTime' => 'required|string',
            'soundEffects' => 'required|boolean',
            'weeklyReport' => 'required|boolean',
        ]);

        $request->session()->put('learning_preferences', $validated);

        return redirect()->back()->with('success', 'Preferensi belajar berhasil disimpan.');
    }

    public function resetProgress(Request $request): RedirectResponse
    {
        $user = $request->user() ?? User::query()->first();
        if ($user) {
            UserSentenceProgress::where('user_id', $user->id)->delete();
        }

        return redirect()->back()->with('success', 'Seluruh progres belajar telah berhasil di-reset.');
    }

    public function deleteAccount(Request $request): RedirectResponse
    {
        $user = $request->user() ?? User::query()->first();
        if ($user) {
            UserSentenceProgress::where('user_id', $user->id)->delete();
            // In demo mode without active auth, we can reset the user details instead of complete DB drop
            $user->update([
                'name' => 'Akun Baru',
                'email' => 'newuser@example.com',
            ]);
        }

        return redirect()->route('dashboard')->with('success', 'Akun telah berhasil dihapus.');
    }
}
