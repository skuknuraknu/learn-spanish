import { router } from '@inertiajs/react';
import {
    ArrowLeftIcon,
    CheckCircle2Icon,
    FlameIcon,
    RotateCcwIcon,
    TargetIcon,
    TrophyIcon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { quizSound } from '@/lib/quiz-sound';
import type { QuizSectionContext, UserAnswerRecord } from '@/types/quiz';

interface QuizSummaryProps {
    totalQuestions: number;
    score: number;
    streak: number;
    userAnswers: Record<number, UserAnswerRecord>;
    section?: QuizSectionContext | null;
    onRetry: () => void;
    onReviewMistakes?: () => void;
}

export function QuizSummary({
    totalQuestions,
    score,
    streak,
    userAnswers,
    section,
    onRetry,
    onReviewMistakes,
}: QuizSummaryProps) {
    const answeredCount = Object.keys(userAnswers).length;
    const correctCount = Object.values(userAnswers).filter((a) => a.isCorrect).length;
    const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const mistakeCount = totalQuestions - correctCount;

    let banner = {
        title: '¡Fantástico! Luar Biasa!',
        subtitle: 'Kamu menunjukkan pemahaman yang sangat baik terhadap kalimat bahasa Spanyol ini.',
        color: 'text-emerald-600 dark:text-emerald-400',
    };

    if (accuracy < 60) {
        banner = {
            title: '¡Sigue practicando! Tetap Semangat!',
            subtitle: 'Setiap kesalahan adalah langkah menuju kelancaran berbahasa Spanyol.',
            color: 'text-amber-600 dark:text-amber-400',
        };
    } else if (accuracy < 85) {
        banner = {
            title: '¡Buen trabajo! Kerja Bagus!',
            subtitle: 'Kamu membuat kemajuan yang konsisten dalam perjalanan belajar bahasa Spanyol.',
            color: 'text-sky-600 dark:text-sky-400',
        };
    }

    return (
        <Card className="mx-auto w-full max-w-xl border bg-card shadow-sm transition-all duration-300 animate-card-enter">
            <CardHeader className="text-center">
                <div className="mx-auto mb-2 flex size-14 items-center justify-center rounded-2xl bg-primary/10 transition-transform duration-300 hover:scale-110">
                    <TrophyIcon className="size-7 text-primary animate-pop" aria-hidden="true" />
                </div>
                <CardTitle className={`font-heading text-2xl font-bold sm:text-3xl ${banner.color}`}>
                    {banner.title}
                </CardTitle>
                <CardDescription className="text-sm">{banner.subtitle}</CardDescription>
            </CardHeader>

            <Separator />

            <CardContent className="flex flex-col gap-6 p-6 sm:p-8">
                {/* Accuracy Bar with smooth progress */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between text-sm font-medium">
                        <span>Akurasi</span>
                        <span className="font-bold tabular-nums text-foreground">{accuracy}%</span>
                    </div>
                    <Progress value={accuracy} aria-label="Quiz accuracy" />
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col items-center justify-center rounded-xl border bg-muted/40 p-3 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs">
                        <CheckCircle2Icon className="mb-1 size-5 text-emerald-600" aria-hidden="true" />
                        <span className="text-xl font-bold tabular-nums">
                            {correctCount}/{totalQuestions}
                        </span>
                        <span className="text-xs text-muted-foreground">Benar</span>
                    </div>

                    <div className="flex flex-col items-center justify-center rounded-xl border bg-muted/40 p-3 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs">
                        <TargetIcon className="mb-1 size-5 text-sky-600" aria-hidden="true" />
                        <span className="text-xl font-bold tabular-nums">{score}</span>
                        <span className="text-xs text-muted-foreground">Poin</span>
                    </div>

                    <div className="flex flex-col items-center justify-center rounded-xl border bg-muted/40 p-3 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs">
                        <FlameIcon className="mb-1 size-5 text-orange-500 animate-pulse-subtle" aria-hidden="true" />
                        <span className="text-xl font-bold tabular-nums">{streak}</span>
                        <span className="text-xs text-muted-foreground">Hari Streak</span>
                    </div>
                </div>

                {/* Action Buttons with tactile hover & press */}
                <div className="flex flex-col gap-2.5 pt-2">
                    <Button
                        onClick={() => {
                            quizSound.playClick();
                            onRetry();
                        }}
                        size="lg"
                        className="w-full gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
                    >
                        <RotateCcwIcon className="size-4" aria-hidden="true" />
                        Coba Lagi
                    </Button>

                    {mistakeCount > 0 && onReviewMistakes && (
                        <Button
                            onClick={() => {
                                quizSound.playClick();
                                onReviewMistakes();
                            }}
                            variant="secondary"
                            size="lg"
                            className="w-full gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs active:scale-95"
                        >
                            Ulas Jawaban Salah ({mistakeCount})
                        </Button>
                    )}

                    <Button
                        onClick={() => {
                            quizSound.playClick();
                            if (section) {
                                router.visit(`/learn/${section.id}`);
                            } else {
                                router.visit('/modules');
                            }
                        }}
                        variant="outline"
                        size="lg"
                        className="w-full gap-2 transition-all duration-200 hover:-translate-y-0.5 hover:bg-muted active:scale-95"
                    >
                        <ArrowLeftIcon className="size-4" aria-hidden="true" />
                        {section ? 'Kembali ke Section' : 'Kembali ke Modul'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
