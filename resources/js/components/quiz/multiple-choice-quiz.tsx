import { CheckCircle2Icon, HelpCircleIcon, Volume2Icon, XCircleIcon } from 'lucide-react';
import { useState } from 'react';

import { speak } from '@/components/learning/sentence-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { QuizQuestion } from '@/types/quiz';

interface MultipleChoiceQuizProps {
    question: QuizQuestion;
    onSelectAnswer: (isCorrect: boolean, selectedOption: string) => void;
}

export function MultipleChoiceQuiz({ question, onSelectAnswer }: MultipleChoiceQuizProps) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [hasAnswered, setHasAnswered] = useState(false);

    const handleOptionClick = (option: string) => {
        if (hasAnswered) return;

        setSelectedOption(option);
        setHasAnswered(true);

        const isCorrect = option.trim().toLowerCase() === question.correct_answer.trim().toLowerCase();
        onSelectAnswer(isCorrect, option);
    };

    return (
        <Card className="mx-auto w-full max-w-2xl border bg-card shadow-sm">
            <CardContent className="flex flex-col gap-6 p-6 sm:p-8">
                {/* Meta Header */}
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
                                    className="shrink-0 text-muted-foreground hover:text-foreground"
                                    onClick={() => speak(question.spanish_text)}
                                    aria-label="Listen to pronunciation"
                                />
                            }
                        >
                            <Volume2Icon className="size-4" aria-hidden="true" />
                        </TooltipTrigger>
                        <TooltipContent>Listen in Spanish</TooltipContent>
                    </Tooltip>
                </div>

                {/* Prompt Banner */}
                <div className="flex flex-col gap-2 rounded-xl bg-muted/40 p-4 text-center">
                    <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                        Select the correct translation
                    </span>
                    <p lang="es" className="font-heading text-xl font-bold leading-tight sm:text-2xl">
                        {question.spanish_text}
                    </p>
                </div>

                {/* 2x2 Options Grid */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {question.options.map((option, idx) => {
                        const isSelected = selectedOption === option;
                        const isCorrectAnswer =
                            option.trim().toLowerCase() === question.correct_answer.trim().toLowerCase();

                        let stateStyles =
                            'border-border/80 bg-background hover:bg-muted/60 hover:border-foreground/20 text-foreground';

                        if (hasAnswered) {
                            if (isSelected && isCorrectAnswer) {
                                stateStyles =
                                    'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20';
                            } else if (isSelected && !isCorrectAnswer) {
                                stateStyles =
                                    'border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300 ring-2 ring-rose-500/20 animate-shake';
                            } else if (isCorrectAnswer) {
                                stateStyles =
                                    'border-emerald-500/60 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300';
                            } else {
                                stateStyles = 'border-border/40 opacity-50 bg-background';
                            }
                        }

                        return (
                            <button
                                key={`${option}-${idx}`}
                                type="button"
                                disabled={hasAnswered}
                                onClick={() => handleOptionClick(option)}
                                className={cn(
                                    'group flex min-h-[72px] items-center justify-between rounded-xl border p-4 text-left font-medium transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
                                    stateStyles,
                                    !hasAnswered && 'cursor-pointer active:scale-[0.98]',
                                )}
                            >
                                <span className="text-sm leading-snug sm:text-base">{option}</span>
                                {hasAnswered && isSelected && isCorrectAnswer && (
                                    <CheckCircle2Icon className="size-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                )}
                                {hasAnswered && isSelected && !isCorrectAnswer && (
                                    <XCircleIcon className="size-5 shrink-0 text-rose-600 dark:text-rose-400" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Instant Feedback Explanation Box */}
                {hasAnswered && (
                    <div
                        role="region"
                        aria-live="polite"
                        className={cn(
                            'flex flex-col gap-2 rounded-xl border p-4 transition-all',
                            selectedOption?.trim().toLowerCase() === question.correct_answer.trim().toLowerCase()
                                ? 'border-emerald-500/30 bg-emerald-500/5'
                                : 'border-rose-500/30 bg-rose-500/5',
                        )}
                    >
                        <div className="flex items-center gap-2">
                            {selectedOption?.trim().toLowerCase() === question.correct_answer.trim().toLowerCase() ? (
                                <>
                                    <CheckCircle2Icon className="size-4 text-emerald-600 dark:text-emerald-400" />
                                    <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                                        ¡Excelente! Correct answer
                                    </span>
                                </>
                            ) : (
                                <>
                                    <XCircleIcon className="size-4 text-rose-600 dark:text-rose-400" />
                                    <span className="text-sm font-semibold text-rose-700 dark:text-rose-300">
                                        Not quite right
                                    </span>
                                </>
                            )}
                        </div>

                        <div className="text-xs text-muted-foreground">
                            <span className="font-semibold text-foreground">Meaning: </span>
                            {question.correct_answer}
                        </div>

                        {(question.word_breakdown_hint || question.explanation) && (
                            <div className="flex items-start gap-2 pt-1 text-xs text-muted-foreground">
                                <HelpCircleIcon className="mt-0.5 size-3.5 shrink-0 text-primary" />
                                <p>{question.word_breakdown_hint || question.explanation}</p>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
