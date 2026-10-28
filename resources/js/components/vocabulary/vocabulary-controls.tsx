import { router } from '@inertiajs/react';
import { LayoutGridIcon, ListIcon, RotateCcwIcon, SearchIcon, XIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { VocabularyFilters } from '@/types/vocabulary';

interface VocabularyControlsProps {
    filters: VocabularyFilters;
    partsOfSpeech: string[];
    viewMode: 'grid' | 'table';
    onViewModeChange: (mode: 'grid' | 'table') => void;
}

export function VocabularyControls({
    filters,
    partsOfSpeech,
    viewMode,
    onViewModeChange,
}: VocabularyControlsProps) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [selectedPos, setSelectedPos] = useState(filters.partOfSpeech ?? 'all');
    const [selectedStatus, setSelectedStatus] = useState(filters.masteryStatus ?? 'all');

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== (filters.search ?? '')) {
                applyFilters({ search });
            }
        }, 350);

        return () => clearTimeout(timer);
    }, [search]);

    const applyFilters = (updated: Partial<VocabularyFilters>) => {
        const currentParams = {
            search: updated.search !== undefined ? updated.search : search,
            part_of_speech: updated.partOfSpeech !== undefined ? updated.partOfSpeech : selectedPos,
            status: updated.masteryStatus !== undefined ? updated.masteryStatus : selectedStatus,
        };

        const cleanParams: Record<string, string> = {};
        if (currentParams.search) cleanParams.search = currentParams.search;
        if (currentParams.part_of_speech && currentParams.part_of_speech !== 'all') {
            cleanParams.part_of_speech = currentParams.part_of_speech;
        }
        if (currentParams.status && currentParams.status !== 'all') {
            cleanParams.status = currentParams.status;
        }

        router.get('/vocabulary', cleanParams, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    };

    const handlePosChange = (val: string | null) => {
        const next = val ?? 'all';
        setSelectedPos(next);
        applyFilters({ partOfSpeech: next });
    };

    const handleStatusClick = (status: string) => {
        const next = selectedStatus === status ? 'all' : status;
        setSelectedStatus(next);
        applyFilters({ masteryStatus: next });
    };

    const resetFilters = () => {
        setSearch('');
        setSelectedPos('all');
        setSelectedStatus('all');
        router.get('/vocabulary', {}, { preserveState: true, preserveScroll: true, replace: true });
    };

    const hasActiveFilters = Boolean(search || selectedPos !== 'all' || selectedStatus !== 'all');

    return (
        <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 shadow-2xs">
            {/* Top row: Search input + View mode toggle */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1">
                    <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search Spanish words, meanings, or notes..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pr-9 pl-9"
                    />
                    {search && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearch('');
                                applyFilters({ search: '' });
                            }}
                            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            aria-label="Clear search"
                        >
                            <XIcon className="size-4" />
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    {/* Part of Speech select dropdown */}
                    <div className="w-44">
                        <Select value={selectedPos} onValueChange={handlePosChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Part of Speech" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Parts of Speech</SelectItem>
                                {partsOfSpeech.map((pos) => (
                                    <SelectItem key={pos} value={pos} className="capitalize">
                                        {pos}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* View Switcher buttons */}
                    <div className="flex items-center rounded-lg border bg-muted/40 p-0.5">
                        <Button
                            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                            size="icon-sm"
                            onClick={() => onViewModeChange('grid')}
                            aria-label="Grid view"
                            title="Grid view"
                        >
                            <LayoutGridIcon className="size-4" />
                        </Button>
                        <Button
                            variant={viewMode === 'table' ? 'secondary' : 'ghost'}
                            size="icon-sm"
                            onClick={() => onViewModeChange('table')}
                            aria-label="Table view"
                            title="Table view"
                        >
                            <ListIcon className="size-4" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Bottom row: Mastery Status Pills & Reset */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-3">
                <div className="flex flex-wrap items-center gap-1.5">
                    <span className="mr-1 text-xs font-medium text-muted-foreground">Status:</span>
                    <Badge
                        variant={selectedStatus === 'all' ? 'default' : 'outline'}
                        className="cursor-pointer select-none transition-all"
                        onClick={() => handleStatusClick('all')}
                    >
                        All
                    </Badge>
                    <Badge
                        variant={selectedStatus === 'mastered' ? 'default' : 'outline'}
                        className="cursor-pointer select-none transition-all hover:border-emerald-500/50"
                        onClick={() => handleStatusClick('mastered')}
                    >
                        Mastered
                    </Badge>
                    <Badge
                        variant={selectedStatus === 'learning' ? 'default' : 'outline'}
                        className="cursor-pointer select-none transition-all hover:border-amber-500/50"
                        onClick={() => handleStatusClick('learning')}
                    >
                        Learning
                    </Badge>
                    <Badge
                        variant={selectedStatus === 'new' ? 'default' : 'outline'}
                        className="cursor-pointer select-none transition-all hover:border-sky-500/50"
                        onClick={() => handleStatusClick('new')}
                    >
                        New
                    </Badge>
                </div>

                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="xs"
                        onClick={resetFilters}
                        className="gap-1 text-xs text-muted-foreground hover:text-foreground"
                    >
                        <RotateCcwIcon className="size-3" />
                        Reset filters
                    </Button>
                )}
            </div>
        </div>
    );
}
