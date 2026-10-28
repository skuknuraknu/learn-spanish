import { Deferred, Head, Link, router } from '@inertiajs/react';
import { ArrowLeftIcon, ArrowRightIcon, BookOpenIcon, CheckCircle2Icon, CheckIcon, SparklesIcon } from 'lucide-react';
import { useState } from 'react';

import { SentenceCard } from '@/components/learning/sentence-card';
import { WordBreakdownGrid } from '@/components/learning/word-breakdown-grid';
import { Button, buttonVariants } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import type { LearningPageProps, SentenceLearningProps } from '@/types/learning';

function LearningSkeleton() {
    return (
        <div className="flex flex-col gap-6" role="status" aria-live="polite" aria-busy="true">
            <span className="sr-only">Loading sentences…</span>
            <Skeleton className="h-44 w-full rounded-xl" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-28 w-full rounded-xl" />
                ))}
            </div>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center gap-2 py-12 text-center">
            <BookOpenIcon className="size-8 text-muted-foreground" aria-hidden="true" />
            <p className="font-medium">No sentences in this section yet</p>
            <Link href="/modules" className={cn(buttonVariants({ variant: 'outline' }), 'mt-2')}>
                Back to modules
            </Link>
        </div>
    );
}

function SectionPlayer({ sentences }: { sentences: SentenceLearningProps[] }) {
    const [index, setIndex] = useState(0);
    const [saving, setSaving] = useState(false);

    if (sentences.length === 0) return <EmptyState />;

    const current = sentences[index];
    const isLast = index === sentences.length - 1;

    const next = () => !isLast && setIndex((i) => i + 1);

    const markMastered = () => {
        if (current.mastered || current.id === undefined) return next();
        setSaving(true);
        router.post(
            `/sentences/${current.id}/mastered`,
            {},
            {
                preserveScroll: true,
                preserveState: true,
                onFinish: () => {
                    setSaving(false);
                    next();
                },
            },
        );
    };

    return (
        <>
            <p className="text-sm text-muted-foreground" aria-live="polite">
                Sentence {index + 1} of {sentences.length}
            </p>
            <SentenceCard
                sentence={current.sentence}
                translation={current.translation}
                difficulty={current.difficulty}
                grammarCategory={current.grammarCategory}
            />
            <WordBreakdownGrid words={current.words} />
            <div className="flex flex-wrap items-center justify-between gap-3">
                <Button variant="outline" onClick={() => setIndex((i) => i - 1)} disabled={index === 0}>
                    <ArrowLeftIcon aria-hidden="true" />
                    Previous
                </Button>
                <div className="flex items-center gap-2">
                    <Button variant={current.mastered ? 'secondary' : 'default'} onClick={markMastered} disabled={saving}>
                        {current.mastered ? <CheckCircle2Icon aria-hidden="true" /> : <CheckIcon aria-hidden="true" />}
                        {current.mastered ? 'Mastered' : 'I know this'}
                    </Button>
                    <Button variant="outline" onClick={next} disabled={isLast}>
                        Next
                        <ArrowRightIcon aria-hidden="true" />
                    </Button>
                </div>
            </div>
        </>
    );
}

export default function Learn({ section, learning }: LearningPageProps) {
    return (
        <>
            <Head title={section.title} />
            <AppLayout title={section.title} description={section.moduleTitle}>
                <div className="flex items-center justify-between">
                    <Link href="/modules" className="flex w-fit items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                        <ArrowLeftIcon className="size-4" aria-hidden="true" />
                        All modules
                    </Link>
                    <Link
                        href={`/quiz/${section.id}`}
                        className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'gap-1.5 text-xs sm:text-sm')}
                    >
                        <SparklesIcon className="size-3.5 text-primary" aria-hidden="true" />
                        Practice Quiz & Flashcards
                    </Link>
                </div>
                <Deferred data="learning" fallback={<LearningSkeleton />}>
                    <SectionPlayer key={section.id} sentences={learning ?? []} />
                </Deferred>
            </AppLayout>
        </>
    );
}
