import { BookOpenIcon, RotateCwIcon, Volume2Icon } from 'lucide-react';
import { useState } from 'react';

import { speak } from '@/components/learning/sentence-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { quizSound } from '@/lib/quiz-sound';
import { cn } from '@/lib/utils';
import type { AssessmentRating, QuizQuestion } from '@/types/quiz';

interface FlashcardProps {
    question: QuizQuestion;
    onAssess: (isCorrect: boolean, rating: AssessmentRating) => void;
}

export function Flashcard({ question, onAssess }: FlashcardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    const toggleFlip = () => {
        quizSound.playFlip();
        setIsFlipped((prev) => !prev);
    };

    const handleRating = (isCorrect: boolean, rating: AssessmentRating) => {
        if (isCorrect) {
            quizSound.playCorrect();
        } else {
            quizSound.playWrong();
        }
        onAssess(isCorrect, rating);
    };

    return (
        <div className="perspective-1000 mx-auto w-full max-w-xl transition-all duration-300 animate-card-enter">
            <div
                className={cn(
                    'transform-style-3d relative min-h-[380px] w-full transition-transform duration-500 ease-in-out',
                    isFlipped && 'rotate-y-180',
                )}
            >
                {/* Front Side */}
                <Card
                    onClick={toggleFlip}
                    tabIndex={0}
                    role="button"
                    aria-label="Spanish flashcard front. Click to reveal translation."
                    onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            e.preventDefault();
                            toggleFlip();
                        }
                    }}
                    className={cn(
                        'backface-hidden group absolute inset-0 flex cursor-pointer flex-col justify-between border-2 border-border/80 bg-gradient-to-b from-card via-card to-muted/30 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:p-8',
                        isFlipped && 'pointer-events-none',
                    )}
                >
                    <CardContent className="flex flex-1 flex-col justify-between p-0">
                        {/* Top Meta Bar */}
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                                {question.difficulty && (
                                    <Badge variant="secondary" className="capitalize">
                                        {question.difficulty}
                                    </Badge>
                                )}
                                {question.category && (
                                    <Badge variant="outline" className="text-xs">
                                        {question.category}
                                    </Badge>
                                )}
                            </div>
                            <Tooltip>
                                <TooltipTrigger
                                    render={
                                        <Button
                                            variant="ghost"
                                            size="icon-sm"
                                            className="shrink-0 text-muted-foreground transition-transform hover:scale-110 hover:text-foreground"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                speak(question.spanish_text);
                                            }}
                                            aria-label="Listen to pronunciation"
                                        />
                                    }
                                >
                                    <Volume2Icon className="size-4" aria-hidden="true" />
                                </TooltipTrigger>
                                <TooltipContent>Listen in Spanish</TooltipContent>
                            </Tooltip>
                        </div>

                        {/* Middle Content */}
                        <div className="my-8 flex flex-col items-center justify-center text-center">
                            <span className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                Spanish
                            </span>
                            <p lang="es" className="font-heading text-2xl font-bold leading-snug tracking-tight transition-transform duration-200 group-hover:scale-[1.02] sm:text-3xl">
                                {question.spanish_text}
                            </p>
                        </div>

                        {/* Bottom Helper with subtle pulse */}
                        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground transition-colors group-hover:text-primary">
                            <RotateCwIcon className="size-3.5 transition-transform duration-300 group-hover:rotate-180" aria-hidden="true" />
                            <span>Click or press Space to reveal translation</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Back Side */}
                <Card
                    className={cn(
                        'backface-hidden rotate-y-180 absolute inset-0 flex flex-col justify-between border-2 border-primary/30 bg-gradient-to-b from-card to-primary/5 p-6 shadow-lg sm:p-8',
                        !isFlipped && 'pointer-events-none',
                    )}
                >
                    <CardContent className="flex flex-1 flex-col justify-between p-0">
                        {/* Top Bar */}
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                English Translation
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="group h-7 gap-1.5 px-2.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFlip();
                                }}
                            >
                                <RotateCwIcon className="size-3 transition-transform duration-300 group-hover:-rotate-180" aria-hidden="true" />
                                Flip Back
                            </Button>
                        </div>

                        {/* Middle Translation & Notes */}
                        <div className="my-4 flex flex-col items-center justify-center text-center">
                            <p className="font-heading text-xl font-bold text-foreground sm:text-2xl">
                                {question.correct_answer}
                            </p>
                            <p lang="es" className="mt-1 text-sm text-muted-foreground italic">
                                &ldquo;{question.spanish_text}&rdquo;
                            </p>

                            {/* Word Breakdown & Grammar Hint */}
                            {(question.word_breakdown_hint || question.explanation) && (
                                <div className="mt-4 flex w-full max-w-md items-start gap-2.5 rounded-lg border bg-muted/40 p-3 text-left shadow-xs">
                                    <BookOpenIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                                    <div className="flex flex-col gap-0.5 text-xs">
                                        <span className="font-semibold text-foreground">Grammar & Breakdown:</span>
                                        <p className="text-muted-foreground">
                                            {question.word_breakdown_hint || question.explanation}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Self-Assessment Buttons with tactile animations */}
                        <div className="flex flex-col gap-2 pt-2">
                            <p className="text-center text-xs font-medium text-muted-foreground">
                                How well did you know this?
                            </p>
                            <div className="grid grid-cols-3 gap-2.5">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-rose-500/30 text-rose-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-rose-500 hover:bg-rose-500/15 hover:text-rose-700 hover:shadow-sm active:scale-95 dark:text-rose-400"
                                    onClick={() => handleRating(false, 'hard')}
                                >
                                    Hard
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-sky-500/30 text-sky-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-500 hover:bg-sky-500/15 hover:text-sky-700 hover:shadow-sm active:scale-95 dark:text-sky-400"
                                    onClick={() => handleRating(true, 'good')}
                                >
                                    Good
                                </Button>
                                <Button
                                    variant="default"
                                    size="sm"
                                    className="bg-emerald-600 text-white shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-md hover:shadow-emerald-500/20 active:scale-95 dark:bg-emerald-600"
                                    onClick={() => handleRating(true, 'easy')}
                                >
                                    Easy
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
