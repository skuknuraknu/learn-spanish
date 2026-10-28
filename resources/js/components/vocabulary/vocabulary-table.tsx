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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import type { MasteryLevel, VocabularyItem } from '@/types/vocabulary';

interface VocabularyTableProps {
    items: VocabularyItem[];
}

export function VocabularyTable({ items }: VocabularyTableProps) {
    const handleToggleMastery = (id: number) => {
        router.post(
            `/vocabulary/${id}/mastery`,
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
        <div className="overflow-hidden rounded-xl border bg-card">
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="w-[180px]">Word</TableHead>
                        <TableHead className="w-[180px]">Translation</TableHead>
                        <TableHead className="w-[120px]">Part of Speech</TableHead>
                        <TableHead className="w-[120px]">Status</TableHead>
                        <TableHead className="min-w-[200px]">Notes & Example</TableHead>
                        <TableHead className="w-[70px] text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.id} className="transition-colors hover:bg-muted/40">
                            {/* Word & Audio */}
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-1.5">
                                    <span lang="es" className="font-heading text-base font-bold">
                                        {item.word}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="icon-xs"
                                        onClick={() => speak(item.word)}
                                        className="size-6 text-muted-foreground hover:text-foreground"
                                        title={`Listen to ${item.word}`}
                                    >
                                        <Volume2Icon className="size-3" />
                                    </Button>
                                </div>
                            </TableCell>

                            {/* Translation */}
                            <TableCell className="text-sm font-medium">
                                {item.literal_translation}
                            </TableCell>

                            {/* Part of Speech */}
                            <TableCell>
                                <PartOfSpeechBadge partOfSpeech={item.part_of_speech} className="text-xs" />
                            </TableCell>

                            {/* Status */}
                            <TableCell>
                                {statusBadge(item.mastery_level)}
                            </TableCell>

                            {/* Grammar Notes & Example */}
                            <TableCell className="text-xs text-muted-foreground">
                                <div className="flex flex-col gap-1">
                                    {item.grammar_notes && (
                                        <p className="text-foreground/90">{item.grammar_notes}</p>
                                    )}
                                    {item.sentence_context && (
                                        <div className="flex items-center gap-1 text-[11px] italic">
                                            <span>&ldquo;{item.sentence_context}&rdquo;</span>
                                            <button
                                                type="button"
                                                onClick={() => speak(item.sentence_context)}
                                                className="cursor-pointer text-muted-foreground hover:text-foreground"
                                                title="Listen"
                                            >
                                                <Volume2Icon className="size-2.5" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </TableCell>

                            {/* Actions Dropdown */}
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger
                                        render={
                                            <Button
                                                variant="ghost"
                                                size="icon-xs"
                                                className="size-7 text-muted-foreground hover:text-foreground"
                                                aria-label="Actions"
                                            />
                                        }
                                    >
                                        <MoreVerticalIcon className="size-3.5" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleToggleMastery(item.id)}>
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
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
