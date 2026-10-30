import { Head, Link } from '@inertiajs/react';
import { BookOpenIcon, CheckCircle2Icon, ChevronRightIcon, CircleIcon, LockIcon } from 'lucide-react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import type { ModuleWithSections, SectionOverview } from '@/types/learning';

function SectionLink({ section, isLocked }: { section: SectionOverview; isLocked?: boolean }) {
    if (isLocked) {
        return (
            <div
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 select-none opacity-60 cursor-not-allowed bg-muted/20 text-muted-foreground"
                aria-disabled="true"
            >
                <LockIcon className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                <span className="flex flex-1 flex-col">
                    <span className="text-sm font-medium">{section.title}</span>
                    {section.description && <span className="text-xs text-muted-foreground/80">{section.description}</span>}
                </span>
                <span className="text-xs text-muted-foreground tabular-nums">
                    0/{section.sentenceCount}
                </span>
                <Badge variant="outline" className="border-muted/50 text-[11px] text-muted-foreground font-normal">
                    Locked
                </Badge>
            </div>
        );
    }

    const Icon = section.completed ? CheckCircle2Icon : CircleIcon;
    return (
        <Link
            href={`/learn/${section.id}`}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
            <Icon
                className={section.completed ? 'size-5 shrink-0 text-emerald-600 dark:text-emerald-400' : 'size-5 shrink-0 text-muted-foreground'}
                aria-hidden="true"
            />
            <span className="flex flex-1 flex-col">
                <span className="text-sm font-medium">{section.title}</span>
                {section.description && <span className="text-xs text-muted-foreground">{section.description}</span>}
            </span>
            <span className="text-xs text-muted-foreground tabular-nums">
                {section.masteredCount}/{section.sentenceCount}
            </span>
            {section.completed && <span className="sr-only">Completed</span>}
            <ChevronRightIcon className="size-4 text-muted-foreground" aria-hidden="true" />
        </Link>
    );
}

export default function Modules({ modules }: { modules: ModuleWithSections[] }) {
    const activeModuleId = modules.find((m) => !m.isLocked && !m.isCompleted)?.id ?? modules[0]?.id;

    return (
        <>
            <Head title="Learning Modules" />
            <AppLayout title="Learning Modules" description="Pick a section to start studying.">
                {modules.length === 0 ? (
                    <p className="py-12 text-center text-sm text-muted-foreground">No modules available yet.</p>
                ) : (
                    <Card className="py-0">
                        <Accordion defaultValue={activeModuleId ? [activeModuleId] : undefined} className="px-4">
                            {modules.map((m, idx) => {
                                const isLocked = Boolean(m.isLocked);
                                const prevModule = idx > 0 ? modules[idx - 1] : null;

                                return (
                                    <AccordionItem key={m.id} value={m.id} className={cn(isLocked && 'opacity-85')}>
                                        <AccordionTrigger className={cn('items-center', isLocked && 'text-muted-foreground hover:no-underline')}>
                                            <div className="flex flex-1 items-start gap-3 text-left">
                                                <div
                                                    className={cn(
                                                        'flex size-9 shrink-0 items-center justify-center rounded-lg mt-0.5',
                                                        isLocked
                                                            ? 'bg-muted text-muted-foreground'
                                                            : m.isCompleted
                                                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                                              : 'bg-primary/10 text-primary',
                                                    )}
                                                >
                                                    {isLocked ? (
                                                        <LockIcon className="size-4" aria-hidden="true" />
                                                    ) : m.isCompleted ? (
                                                        <CheckCircle2Icon className="size-4" aria-hidden="true" />
                                                    ) : (
                                                        <BookOpenIcon className="size-4" aria-hidden="true" />
                                                    )}
                                                </div>
                                                <span className="flex flex-1 flex-col gap-1.5">
                                                    <span className="flex items-center gap-2">
                                                        <span className={cn('font-heading text-base font-semibold', isLocked && 'text-muted-foreground')}>
                                                            {m.title}
                                                        </span>
                                                        {isLocked && (
                                                            <Badge variant="outline" className="gap-1 border-muted-foreground/30 py-0 text-[11px] font-normal text-muted-foreground">
                                                                <LockIcon className="size-3" />
                                                                Locked
                                                            </Badge>
                                                        )}
                                                        {m.isCompleted && (
                                                            <Badge variant="outline" className="gap-1 border-emerald-500/30 py-0 text-[11px] font-normal text-emerald-600 dark:text-emerald-400">
                                                                <CheckCircle2Icon className="size-3" />
                                                                Completed
                                                            </Badge>
                                                        )}
                                                    </span>
                                                    <span className="flex flex-wrap items-center gap-2">
                                                        <Badge variant="secondary" className="capitalize text-xs">
                                                            {m.difficulty}
                                                        </Badge>
                                                        <span className="text-xs font-normal text-muted-foreground">
                                                            {isLocked ? (
                                                                <span>Complete previous module to unlock</span>
                                                            ) : (
                                                                `${m.sections.length} ${m.sections.length === 1 ? 'Section' : 'Sections'} · ${m.completedSections} completed`
                                                            )}
                                                        </span>
                                                    </span>
                                                </span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            {isLocked ? (
                                                <div className="flex flex-col gap-3 py-1">
                                                    <div className="flex items-center gap-2.5 rounded-lg border border-amber-500/20 bg-amber-500/10 px-3.5 py-2.5 text-xs text-amber-800 dark:text-amber-300">
                                                        <LockIcon className="size-4 shrink-0 text-amber-600 dark:text-amber-400" />
                                                        <span>
                                                            Modul ini terkunci. Selesaikan semua materi pada{' '}
                                                            <strong className="font-semibold">{prevModule?.title ?? 'modul sebelumnya'}</strong> untuk membuka modul ini.
                                                        </span>
                                                    </div>
                                                    <ul className="flex flex-col gap-1">
                                                        {m.sections.map((s) => (
                                                            <li key={s.id}>
                                                                <SectionLink section={s} isLocked={true} />
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ) : (
                                                <ul className="flex flex-col gap-1">
                                                    {m.sections.map((s) => (
                                                        <li key={s.id}>
                                                            <SectionLink section={s} isLocked={false} />
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </AccordionContent>
                                    </AccordionItem>
                                );
                            })}
                        </Accordion>
                    </Card>
                )}
            </AppLayout>
        </>
    );
}
