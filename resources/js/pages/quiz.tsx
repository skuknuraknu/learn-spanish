import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    BookOpenIcon,
    FlameIcon,
    LayersIcon,
    SparklesIcon,
    TrophyIcon,
} from 'lucide-react';
import { useState } from 'react';

import { Flashcard } from '@/components/quiz/flashcard';
import { MultipleChoiceQuiz } from '@/components/quiz/multiple-choice-quiz';
import { QuizSummary } from '@/components/quiz/quiz-summary';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import type { AssessmentRating, QuestionType, QuizPageProps, QuizQuestion, UserAnswerRecord } from '@/types/quiz';

export default function Quiz({ title, section, questions, currentStreak }: QuizPageProps) {
    const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>(questions);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Record<number, UserAnswerRecord>>({});
    const [isCompleted, setIsCompleted] = useState(false);
    const [currentAnswered, setCurrentAnswered] = useState(false);
    const [modeOverride, setModeOverride] = useState<'mixed' | QuestionType>('mixed');

    // Handle case where questions list is empty
    if (!activeQuestions || activeQuestions.length === 0) {
        return (
            <AppLayout title={title} description="Practice quiz and flashcards.">
                <Card className="mx-auto w-full max-w-xl text-center">
                    <CardContent className="flex flex-col items-center gap-3 py-12">
                        <BookOpenIcon className="size-8 text-muted-foreground" aria-hidden="true" />
                        <h2 className="text-lg font-semibold">No Quiz Questions Available</h2>
                        <p className="text-sm text-muted-foreground">
                            This section does not have sentences ready for quiz mode yet.
                        </p>
                        <Button
                            onClick={() => router.visit(section ? `/learn/${section.id}` : '/modules')}
                            className="mt-2"
                        >
                            Return to Learning
                        </Button>
                    </CardContent>
                </Card>
            </AppLayout>
        );
    }

    const currentQuestion = activeQuestions[currentIndex];
    const totalQuestions = activeQuestions.length;
    const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

    // Determine current effective question type
    const effectiveType: QuestionType =
        modeOverride === 'mixed' ? currentQuestion.question_type : modeOverride;

    const handleAnswerSubmitted = (isCorrect: boolean, selectedText: string, rating?: AssessmentRating) => {
        const points = isCorrect ? (rating === 'easy' ? 15 : 10) : 0;
        setScore((prev) => prev + points);

        setUserAnswers((prev) => ({
            ...prev,
            [currentQuestion.id]: {
                questionId: currentQuestion.id,
                sentenceId: currentQuestion.sentence_id,
                selected: selectedText,
                isCorrect,
                rating,
            },
        }));

        setCurrentAnswered(true);

        // For flashcard self-assessment, automatically step forward after brief pause
        if (effectiveType === 'flashcard') {
            setTimeout(() => {
                advanceToNext({
                    ...userAnswers,
                    [currentQuestion.id]: {
                        questionId: currentQuestion.id,
                        sentenceId: currentQuestion.sentence_id,
                        selected: selectedText,
                        isCorrect,
                        rating,
                    },
                });
            }, 300);
        }
    };

    const advanceToNext = (latestAnswers = userAnswers) => {
        if (currentIndex < totalQuestions - 1) {
            setCurrentIndex((prev) => prev + 1);
            setCurrentAnswered(false);
        } else {
            finishQuiz(latestAnswers);
        }
    };

    const finishQuiz = (finalAnswers: Record<number, UserAnswerRecord>) => {
        setIsCompleted(true);

        // Submit quiz results asynchronously to backend to update user_sentence_progress
        const resultsPayload = Object.values(finalAnswers).map((item) => ({
            sentence_id: item.sentenceId,
            is_correct: item.isCorrect,
            rating: item.rating,
        }));

        router.post(
            '/quiz/finish',
            {
                results: resultsPayload,
                score,
            },
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    const handleRetry = () => {
        setActiveQuestions(questions);
        setCurrentIndex(0);
        setScore(0);
        setUserAnswers({});
        setIsCompleted(false);
        setCurrentAnswered(false);
    };

    const handleReviewMistakes = () => {
        const mistakeSentenceIds = new Set(
            Object.values(userAnswers)
                .filter((ans) => !ans.isCorrect)
                .map((ans) => ans.sentenceId),
        );

        const mistakeQuestions = questions.filter((q) => mistakeSentenceIds.has(q.sentence_id));

        if (mistakeQuestions.length > 0) {
            setActiveQuestions(mistakeQuestions);
            setCurrentIndex(0);
            setScore(0);
            setUserAnswers({});
            setIsCompleted(false);
            setCurrentAnswered(false);
        }
    };

    return (
        <>
            <Head title={`Quiz: ${title}`} />
            <AppLayout
                title={title}
                description={section ? `Section Practice: ${section.title}` : 'Spanish Practice & Comprehension Quiz'}
            >
                {/* Back to section link */}
                <div className="flex items-center justify-between">
                    <Link
                        href={section ? `/learn/${section.id}` : '/modules'}
                        className="flex w-fit items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground sm:text-sm"
                    >
                        <ArrowLeftIcon className="size-4" aria-hidden="true" />
                        {section ? `Back to ${section.title}` : 'Back to Modules'}
                    </Link>

                    {/* Mode selector pills */}
                    {!isCompleted && (
                        <div className="flex items-center gap-1 rounded-lg border bg-muted/40 p-1 text-xs">
                            <button
                                type="button"
                                onClick={() => setModeOverride('mixed')}
                                className={`rounded px-2 py-1 font-medium transition-colors ${
                                    modeOverride === 'mixed'
                                        ? 'bg-background text-foreground shadow-xs'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Mixed
                            </button>
                            <button
                                type="button"
                                onClick={() => setModeOverride('multiple-choice')}
                                className={`rounded px-2 py-1 font-medium transition-colors ${
                                    modeOverride === 'multiple-choice'
                                        ? 'bg-background text-foreground shadow-xs'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Multiple Choice
                            </button>
                            <button
                                type="button"
                                onClick={() => setModeOverride('flashcard')}
                                className={`rounded px-2 py-1 font-medium transition-colors ${
                                    modeOverride === 'flashcard'
                                        ? 'bg-background text-foreground shadow-xs'
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Flashcards
                            </button>
                        </div>
                    )}
                </div>

                {isCompleted ? (
                    <QuizSummary
                        totalQuestions={totalQuestions}
                        score={score}
                        streak={currentStreak}
                        userAnswers={userAnswers}
                        section={section}
                        onRetry={handleRetry}
                        onReviewMistakes={handleReviewMistakes}
                    />
                ) : (
                    <div className="flex flex-col gap-6">
                        {/* Progress and status header */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span className="font-semibold text-foreground">
                                    Question {currentIndex + 1} of {totalQuestions}
                                </span>
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center gap-1 font-semibold text-orange-500">
                                        <FlameIcon className="size-3.5" aria-hidden="true" />
                                        {currentStreak}
                                    </span>
                                    <span className="flex items-center gap-1 font-semibold text-sky-600">
                                        <TrophyIcon className="size-3.5" aria-hidden="true" />
                                        {score} pts
                                    </span>
                                </div>
                            </div>
                            <Progress value={progressPercent} aria-label="Quiz progress" />
                        </div>

                        {/* Interactive Question Display */}
                        <div key={`${currentQuestion.id}-${currentIndex}`}>
                            {effectiveType === 'flashcard' ? (
                                <Flashcard
                                    question={currentQuestion}
                                    onAssess={(isCorrect, rating) =>
                                        handleAnswerSubmitted(isCorrect, rating, rating)
                                    }
                                />
                            ) : (
                                <MultipleChoiceQuiz
                                    question={currentQuestion}
                                    onSelectAnswer={(isCorrect, option) =>
                                        handleAnswerSubmitted(isCorrect, option)
                                    }
                                />
                            )}
                        </div>

                        {/* Navigation controls for Multiple Choice */}
                        {effectiveType === 'multiple-choice' && (
                            <div className="flex items-center justify-end">
                                <Button
                                    onClick={() => advanceToNext()}
                                    disabled={!currentAnswered}
                                    size="lg"
                                    className="gap-2"
                                >
                                    <span>{currentIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}</span>
                                    <ArrowRightIcon className="size-4" aria-hidden="true" />
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </AppLayout>
        </>
    );
}
