import { Link } from '@inertiajs/react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import type { PaginationLink } from '@/types/vocabulary';

interface VocabularyPaginationProps {
    links: PaginationLink[];
    from: number | null;
    to: number | null;
    total: number;
}

export function VocabularyPagination({ links, from, to, total }: VocabularyPaginationProps) {
    if (total <= 0 || links.length <= 3) return null;

    return (
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-xs text-muted-foreground">
                Showing <span className="font-medium text-foreground">{from ?? 0}</span> to{' '}
                <span className="font-medium text-foreground">{to ?? 0}</span> of{' '}
                <span className="font-medium text-foreground">{total}</span> words
            </p>

            <Pagination className="mx-0 w-auto">
                <PaginationContent>
                    {links.map((link, idx) => {
                        // Previous button
                        if (idx === 0) {
                            return (
                                <PaginationItem key={idx}>
                                    {link.url ? (
                                        <Link
                                            href={link.url}
                                            preserveScroll
                                            preserveState
                                            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'gap-1')}
                                        >
                                            <ChevronLeftIcon className="size-4" />
                                            <span className="hidden sm:inline">Previous</span>
                                        </Link>
                                    ) : (
                                        <span className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'gap-1 opacity-40 pointer-events-none')}>
                                            <ChevronLeftIcon className="size-4" />
                                            <span className="hidden sm:inline">Previous</span>
                                        </span>
                                    )}
                                </PaginationItem>
                            );
                        }

                        // Next button
                        if (idx === links.length - 1) {
                            return (
                                <PaginationItem key={idx}>
                                    {link.url ? (
                                        <Link
                                            href={link.url}
                                            preserveScroll
                                            preserveState
                                            className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'gap-1')}
                                        >
                                            <span className="hidden sm:inline">Next</span>
                                            <ChevronRightIcon className="size-4" />
                                        </Link>
                                    ) : (
                                        <span className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'gap-1 opacity-40 pointer-events-none')}>
                                            <span className="hidden sm:inline">Next</span>
                                            <ChevronRightIcon className="size-4" />
                                        </span>
                                    )}
                                </PaginationItem>
                            );
                        }

                        // Ellipsis
                        if (link.label.includes('...')) {
                            return (
                                <PaginationItem key={idx}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            );
                        }

                        // Page numbers
                        return (
                            <PaginationItem key={idx}>
                                {link.url ? (
                                    <Link
                                        href={link.url}
                                        preserveScroll
                                        preserveState
                                        className={cn(
                                            buttonVariants({
                                                variant: link.active ? 'outline' : 'ghost',
                                                size: 'icon-sm',
                                            }),
                                            link.active && 'pointer-events-none font-bold',
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                ) : (
                                    <span
                                        className={cn(
                                            buttonVariants({ variant: 'ghost', size: 'icon-sm' }),
                                            'opacity-50 pointer-events-none',
                                        )}
                                    >
                                        {link.label}
                                    </span>
                                )}
                            </PaginationItem>
                        );
                    })}
                </PaginationContent>
            </Pagination>
        </div>
    );
}
