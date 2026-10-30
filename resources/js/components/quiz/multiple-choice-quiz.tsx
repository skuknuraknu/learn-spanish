import { CheckCircle2Icon, HelpCircleIcon, Volume2Icon, XCircleIcon } from 'lucide-react';
import { useState } from 'react';

import { speak } from '@/components/learning/sentence-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { quizSound } from '@/lib/quiz-sound';
import { cn } from '@/lib/utils';
import type { QuizQuestion } from '@/types/quiz';

interface MultipleChoiceQuizProps {
    question: QuizQuestion;
    onSelectAnswer: (isCorrect: boolean, selectedOption: string) => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export function MultipleChoiceQuiz({ question, onSelectAnswer }: MultipleChoiceQuizProps) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [hasAnswered, setHasAnswered] = useState(false);

    const handleOptionClick = (option: string) => {
        if (hasAnswered) return;

        setSelectedOption(option);
        setHasAnswered(true);

        const isCorrect = option.trim().toLowerCase() === question.correct_answer.trim().toLowerCase();

        // Play random sound effect: correct -> (ding.mp3 / correct.mp3), wrong -> (error.mp3 / strings.mp3)
        if (isCorrect) {
            quizSound.playCorrect();
        } else {
            quizSound.playWrong();
        }

        onSelectAnswer(isCorrect, option);
    };

    return (
        <Card className="mx-auto w-full max-w-2xl border bg-card shadow-sm transition-all duration-300 animate-card-enter">
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
                                    className="shrink-0 text-muted-foreground transition-transform hover:scale-110 hover:text-foreground"
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

                {/* Prompt Banner with subtle glow */}
                <div className="flex flex-col gap-2 rounded-xl border border-border/50 bg-gradient-to-b from-muted/50 to-muted/20 p-5 text-center shadow-xs">
                    <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                        Select the correct translation
                    </span>
                    <p lang="es" className="font-heading text-xl font-bold leading-tight sm:text-2xl">
                        {question.spanish_text}
                    </p>
                </div>

                {/* 2x2 Options Grid with tactile hover & staggered entrance */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {question.options.map((option, idx) => {
                        const isSelected = selectedOption === option;
                        const isCorrectAnswer =
                            option.trim().toLowerCase() === question.correct_answer.trim().toLowerCase();

                        let stateStyles =
                            'border-border/80 bg-background text-foreground hover:-translate-y-0.5 hover:shadow-md hover:border-primary/50 hover:bg-muted/40';

                        if (hasAnswered) {
                            if (isSelected && isCorrectAnswer) {
                                stateStyles =
                                    'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/30 shadow-md animate-pop';
                            } else if (isSelected && !isCorrectAnswer) {
                                stateStyles =
                                    'border-rose-500 bg-rose-500/10 text-rose-700 dark:text-rose-300 ring-2 ring-rose-500/30 shadow-md animate-shake';
                            } else if (isCorrectAnswer) {
                                stateStyles =
                                    'border-emerald-500/70 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/30';
                            } else {
                                stateStyles = 'border-border/40 opacity-45 bg-background';
                            }
                        }

                        return (
                            <button
                                key={`${option}-${idx}`}
                                type="button"
                                disabled={hasAnswered}
                                onClick={() => handleOptionClick(option)}
                                style={{ animationDelay: `${idx * 45}ms` }}
                                className={cn(
                                    'group flex min-h-[72px] items-center justify-between gap-3 rounded-xl border p-4 text-left font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none animate-card-enter',
                                    stateStyles,
                                    !hasAnswered && 'cursor-pointer active:scale-[0.98]',
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className={cn(
                                            'flex size-7 shrink-0 items-center justify-center rounded-lg border text-xs font-bold transition-all duration-200',
                                            hasAnswered && isSelected && isCorrectAnswer
                                                ? 'border-emerald-500 bg-emerald-500 text-white'
                                                : hasAnswered && isSelected && !isCorrectAnswer
                                                  ? 'border-rose-500 bg-rose-500 text-white'
                                                  : 'border-muted-foreground/20 bg-muted/60 text-muted-foreground group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground',
                                        )}
                                    >
                                        {OPTION_LETTERS[idx] ?? idx + 1}
                                    </span>
                                    <span className="text-sm leading-snug sm:text-base">{option}</span>
                                </div>

                                {hasAnswered && isSelected && isCorrectAnswer && (
                                    <CheckCircle2Icon className="size-5 shrink-0 text-emerald-600 dark:text-emerald-400 animate-in zoom-in-50 duration-300" />
                                )}
                                {hasAnswered && isSelected && !isCorrectAnswer && (
                                    <XCircleIcon className="size-5 shrink-0 text-rose-600 dark:text-rose-400 animate-in zoom-in-50 duration-300" />
                                )}
                                {hasAnswered && !isSelected && isCorrectAnswer && (
                                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                                        Correct
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Instant Feedback Explanation Box with smooth slide down */}
                {hasAnswered && (
                    <div
                        role="region"
                        aria-live="polite"
                        className={cn(
                            'flex flex-col gap-2.5 rounded-xl border p-4 transition-all duration-300 animate-in fade-in-50 slide-in-from-top-2',
                            selectedOption?.trim().toLowerCase() === question.correct_answer.trim().toLowerCase()
                                ? 'border-emerald-500/30 bg-emerald-500/5'
                                : 'border-rose-500/30 bg-rose-500/5',
                        )}
                    >
                        <div className="flex items-center gap-2">
                            {selectedOption?.trim().toLowerCase() === question.correct_answer.trim().toLowerCase() ? (
                                <>
                                    <CheckCircle2Icon className="size-4.5 text-emerald-600 dark:text-emerald-400" />
                                    <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                                        ¡Excelente! Jawaban benar
                                    </span>
                                </>
                            ) : (
                                <>
                                    <XCircleIcon className="size-4.5 text-rose-600 dark:text-rose-400" />
                                    <span className="text-sm font-semibold text-rose-700 dark:text-rose-300">
                                        Kurang tepat
                                    </span>
                                </>
                            )}
                        </div>

                        <div className="text-xs text-muted-foreground">
                            <span className="font-semibold text-foreground">Artinya: </span>
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
