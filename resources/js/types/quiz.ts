export type QuestionType = 'multiple-choice' | 'flashcard';
export type AssessmentRating = 'hard' | 'good' | 'easy';

export interface FlashcardItem {
    id: number;
    sentence_id?: number;
    spanish_text: string;
    translation: string;
    word_breakdown_hint?: string;
    audio_url?: string | null;
    grammar_notes?: string | null;
    difficulty?: string;
}

export interface QuizQuestion {
    id: number;
    sentence_id: number;
    question_type: QuestionType;
    prompt: string;
    spanish_text: string;
    options: string[];
    correct_answer: string;
    explanation?: string;
    word_breakdown_hint?: string;
    category?: string;
    difficulty?: string;
}

export interface UserAnswerRecord {
    questionId: number;
    sentenceId: number;
    selected: string;
    isCorrect: boolean;
    rating?: AssessmentRating;
}

export interface QuizState {
    currentIndex: number;
    score: number;
    streak: number;
    userAnswers: Record<number, UserAnswerRecord>;
    isCompleted: boolean;
}

export interface QuizSectionContext {
    id: number;
    title: string;
    moduleTitle: string;
}

export interface QuizPageProps {
    title: string;
    section?: QuizSectionContext | null;
    questions: QuizQuestion[];
    currentStreak: number;
}
