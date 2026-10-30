export type ThemeMode = 'light' | 'dark' | 'system';
export type AccentColor = 'neutral' | 'indigo' | 'emerald' | 'amber' | 'rose';

export interface UserProfile {
    id: number;
    name: string;
    email: string;
}

export interface LearningPreferences {
    dailyGoalMinutes: number;
    dailyWordsGoal: number;
    reminderEnabled: boolean;
    reminderTime: string;
    soundEffects: boolean;
    weeklyReport: boolean;
}

export interface SettingsPageProps {
    user: UserProfile;
    preferences: LearningPreferences;
    flash?: {
        success?: string | null;
        error?: string | null;
    };
}
