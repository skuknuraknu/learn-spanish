export type Difficulty = 'beginner' | 'upper beginner' | 'intermediate' | 'upper intermediate' | 'advanced';

export interface WordBreakdown {
    word: string;
    translation: string;
    partOfSpeech: string;
    grammarNotes: string;
    /** Dictionary/root form, e.g. "gustar" for "gusta". */
    root?: string;
}

export interface SentenceLearningProps {
    id?: number;
    sentence: string;
    translation: string;
    difficulty: Difficulty;
    /** Grammar category shown as a badge, e.g. "Presente de Indicativo". */
    grammarCategory?: string;
    mastered?: boolean;
    words: WordBreakdown[];
}

export interface LearningSectionInfo {
    id: number;
    title: string;
    description: string | null;
    moduleTitle: string;
}

/** `learning` is deferred: undefined while loading, empty when the section has no sentences. */
export interface LearningPageProps {
    section: LearningSectionInfo;
    learning?: SentenceLearningProps[];
}

export interface SectionOverview {
    id: number;
    title: string;
    description: string | null;
    sentenceCount: number;
    masteredCount: number;
    completed: boolean;
}

export interface ModuleWithSections {
    id: number;
    title: string;
    description: string | null;
    difficulty: Difficulty;
    completedSections: number;
    isCompleted?: boolean;
    isLocked?: boolean;
    sections: SectionOverview[];
}
