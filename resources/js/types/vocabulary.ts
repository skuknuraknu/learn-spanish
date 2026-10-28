export type MasteryLevel = 'new' | 'learning' | 'mastered';

export interface VocabularyItem {
    id: number;
    word: string;
    literal_translation: string;
    part_of_speech: string;
    grammar_notes: string | null;
    sentence_context: string;
    sentence_translation: string;
    sentence_id: number;
    section_id?: number | null;
    mastery_level: MasteryLevel;
    review_count: number;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: PaginationLink[];
}

export interface VocabularyFilters {
    search?: string;
    partOfSpeech?: string;
    masteryStatus?: string;
}

export interface VocabularyStats {
    totalWords: number;
    masteredWords: number;
    learningWords: number;
}

export interface VocabularyPageProps {
    items: PaginatedData<VocabularyItem>;
    filters: VocabularyFilters;
    partsOfSpeech: string[];
    stats: VocabularyStats;
}
