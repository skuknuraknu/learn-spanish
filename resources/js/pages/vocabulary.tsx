import { Head, Link, router } from '@inertiajs/react';
import {
    BookOpenIcon,
    CheckCircle2Icon,
    ClockIcon,
    LibraryIcon,
    SparklesIcon,
} from 'lucide-react';
import { useState } from 'react';

import { VocabularyCard } from '@/components/vocabulary/vocabulary-card';
import { VocabularyControls } from '@/components/vocabulary/vocabulary-controls';
import { VocabularyPagination } from '@/components/vocabulary/vocabulary-pagination';
import { VocabularyTable } from '@/components/vocabulary/vocabulary-table';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import type { VocabularyPageProps } from '@/types/vocabulary';

export default function Vocabulary({ items, filters, partsOfSpeech, stats }: VocabularyPageProps) {
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

    const hasActiveFilters = Boolean(
        filters.search ||
        (filters.partOfSpeech && filters.partOfSpeech !== 'all') ||
        (filters.masteryStatus && filters.masteryStatus !== 'all'),
    );

    const statCards = [
        {
            label: 'Total Vocabulary',
            value: stats.totalWords,
            icon: LibraryIcon,
            tone: 'text-primary',
            bgTone: 'bg-primary/10',
        },
        {
            label: 'Mastered Words',
            value: stats.masteredWords,
            icon: CheckCircle2Icon,
            tone: 'text-emerald-600',
            bgTone: 'bg-emerald-500/10',
        },
        {
            label: 'In Learning',
            value: stats.learningWords,
            icon: ClockIcon,
            tone: 'text-amber-500',
            bgTone: 'bg-amber-500/10',
        },
    ];

    return (
        <>
            <Head title="Mi Vocabulario - Spanish Words" />
            <AppLayout
                title="Mi Vocabulario"
                description="Explore all Spanish words you have collected from lessons, study grammar notes, and monitor mastery."
            >
                {/* Stats Summary Bar */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {statCards.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={stat.label} size="sm">
                                <CardContent className="flex items-center gap-3">
                                    <div className={cn('flex size-10 items-center justify-center rounded-lg', stat.bgTone)}>
                                        <Icon className={cn('size-5', stat.tone)} aria-hidden="true" />
                                    </div>
                                    <div>
                                        <p className="text-xl leading-tight font-bold tabular-nums">
                                            {stat.value}
                                        </p>
                                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Controls & Filter Bar */}
                <VocabularyControls
                    filters={filters}
                    partsOfSpeech={partsOfSpeech}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                />

                {/* Main Content Area */}
                {items.data.length === 0 ? (
                    <Card className="border-dashed bg-muted/20">
                        <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                            <div className="flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                                <BookOpenIcon className="size-6" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h3 className="font-heading text-lg font-semibold">
                                    {hasActiveFilters ? 'No matching words found' : 'No vocabulary words collected yet'}
                                </h3>
                                <p className="max-w-md text-xs text-muted-foreground">
                                    {hasActiveFilters
                                        ? 'Try adjusting your search query, selecting another part of speech, or clearing your active filters.'
                                        : 'Complete lessons and sentence breakdowns to automatically expand your Spanish vocabulary collection.'}
                                </p>
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                                {hasActiveFilters ? (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            router.get(
                                                '/vocabulary',
                                                {},
                                                { preserveState: true, preserveScroll: true, replace: true },
                                            )
                                        }
                                    >
                                        Clear All Filters
                                    </Button>
                                ) : (
                                    <Link
                                        href="/modules"
                                        className={cn(buttonVariants({ size: 'sm' }), 'gap-1.5')}
                                    >
                                        <SparklesIcon className="size-3.5" />
                                        Explore Learning Modules
                                    </Link>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="flex flex-col gap-6">
                        {/* Grid or Table representation */}
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                                {items.data.map((item) => (
                                    <VocabularyCard key={item.id} item={item} />
                                ))}
                            </div>
                        ) : (
                            <VocabularyTable items={items.data} />
                        )}

                        {/* Pagination */}
                        <VocabularyPagination
                            links={items.links}
                            from={items.from}
                            to={items.to}
                            total={items.total}
                        />
                    </div>
                )}
            </AppLayout>
        </>
    );
}
