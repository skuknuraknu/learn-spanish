import { router } from '@inertiajs/react';
import {
    CheckCircle2Icon,
    ClockIcon,
    ExternalLinkIcon,
    MoreVerticalIcon,
    SparklesIcon,
    Volume2Icon,
} from 'lucide-react';

import { PartOfSpeechBadge } from '@/components/learning/part-of-speech-badge';
import { speak } from '@/components/learning/sentence-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { MasteryLevel, VocabularyItem } from '@/types/vocabulary';

interface VocabularyCardProps {
    item: VocabularyItem;
}

export function VocabularyCard({ item }: VocabularyCardProps) {
    const handleToggleMastery = () => {
        router.post(
            `/vocabulary/${item.id}/mastery`,
            {},
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    const statusBadge = (level: MasteryLevel) => {
        switch (level) {
            case 'mastered':
                return (
                    <Badge variant="outline" className="gap-1 border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2Icon className="size-3" />
                        Mastered
                    </Badge>
                );
            case 'learning':
                return (
                    <Badge variant="outline" className="gap-1 border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400">
                        <ClockIcon className="size-3" />
                        Learning
                    </Badge>
                );
            default:
                return (
                    <Badge variant="secondary" className="gap-1 text-muted-foreground">
                        New
                    </Badge>
                );
        }
    };

    return (
        <Card className="group flex flex-col justify-between border bg-card p-4 transition-all hover:border-foreground/20 hover:shadow-sm">
            <CardContent className="flex flex-1 flex-col justify-between p-0">
                {/* Header row: word, audio, badges & dropdown */}
                <div>
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex items-baseline gap-2">
                            <span lang="es" className="font-heading text-xl font-bold tracking-tight">
                                {item.word}
                            </span>
                            <Tooltip>
                                <TooltipTrigger
                                    render={
                                        <Button
                                            variant="ghost"
                                            size="icon-xs"
                                            className="text-muted-foreground hover:text-foreground"
                                            onClick={() => speak(item.word)}
                                            aria-label={`Listen to ${item.word}`}
                                        />
                                    }
                                >
                                    <Volume2Icon className="size-3.5" aria-hidden="true" />
                                </TooltipTrigger>
                                <TooltipContent>Listen to word</TooltipContent>
                            </Tooltip>
                        </div>

                        {/* Actions Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                render={
                                    <Button
                                        variant="ghost"
                                        size="icon-xs"
                                        className="size-7 text-muted-foreground hover:text-foreground"
                                        aria-label="Word options"
                                    />
                                }
                            >
                                <MoreVerticalIcon className="size-3.5" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={handleToggleMastery}>
                                    <CheckCircle2Icon className="mr-2 size-4 text-emerald-600" />
                                    {item.mastery_level === 'mastered' ? 'Mark as In Learning' : 'Mark as Mastered'}
                                </DropdownMenuItem>
                                {item.section_id && (
                                    <>
                                        <DropdownMenuItem onClick={() => router.visit(`/quiz/${item.section_id}`)}>
                                            <SparklesIcon className="mr-2 size-4 text-primary" />
                                            Practice in Quiz
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => router.visit(`/learn/${item.section_id}`)}>
                                            <ExternalLinkIcon className="mr-2 size-4" />
                                            Go to Lesson Section
                                        </DropdownMenuItem>
                                    </>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Metadata Badges */}
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        <PartOfSpeechBadge partOfSpeech={item.part_of_speech} className="text-xs" />
                        {statusBadge(item.mastery_level)}
                    </div>

                    {/* Translation */}
                    <div className="mt-3">
                        <span className="text-sm font-medium text-foreground">{item.literal_translation}</span>
                    </div>

                    {/* Grammar Notes */}
                    {item.grammar_notes && (
                        <p className="mt-1.5 text-xs text-muted-foreground">
                            {item.grammar_notes}
                        </p>
                    )}
                </div>

                {/* Sentence context container */}
                {item.sentence_context && (
                    <div className="mt-4 rounded-lg border bg-muted/30 p-2.5 text-xs">
                        <div className="flex items-center justify-between gap-1 text-muted-foreground">
                            <span className="font-semibold text-foreground/80">Example sentence:</span>
                            <button
                                type="button"
                                onClick={() => speak(item.sentence_context)}
                                className="cursor-pointer text-muted-foreground hover:text-foreground"
                                title="Listen to example sentence"
                            >
                                <Volume2Icon className="size-3" />
                            </button>
                        </div>
                        <p lang="es" className="mt-1 font-medium text-foreground italic">
                            &ldquo;{item.sentence_context}&rdquo;
                        </p>
                        {item.sentence_translation && (
                            <p className="text-muted-foreground">
                                {item.sentence_translation}
                            </p>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
