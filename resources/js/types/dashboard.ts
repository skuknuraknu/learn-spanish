export type ModuleStatus = 'not_started' | 'in_progress' | 'completed';

export interface DashboardStats {
    streak: number;
    masteredWords: number;
    overallProgress: number;
}

export interface CurrentSection {
    moduleTitle: string;
    sectionTitle: string;
    completed: number;
    total: number;
    progress: number;
    started: boolean;
}

export interface ModuleOverview {
    id: number;
    title: string;
    description: string | null;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    sectionCount: number;
    sentenceCount: number;
    progress: number;
    status: ModuleStatus;
}

export interface DashboardPageProps {
    userName: string;
    stats: DashboardStats;
    current: CurrentSection | null;
    modules: ModuleOverview[];
}
