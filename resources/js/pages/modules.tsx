import { Head, Link } from '@inertiajs/react';
import { CheckCircle2Icon, ChevronRightIcon, CircleIcon } from 'lucide-react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { ModuleWithSections, SectionOverview } from '@/types/learning';

function SectionLink({ section }: { section: SectionOverview }) {
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
    return (
        <>
            <Head title="Learning Modules" />
            <AppLayout title="Learning Modules" description="Pick a section to start studying.">
                {modules.length === 0 ? (
                    <p className="py-12 text-center text-sm text-muted-foreground">No modules available yet.</p>
                ) : (
                    <Card className="py-0">
                        <Accordion defaultValue={[modules[0].id]} className="px-4">
                            {modules.map((m) => (
                                <AccordionItem key={m.id} value={m.id}>
                                    <AccordionTrigger className="items-center">
                                        <span className="flex flex-1 flex-col gap-1.5 text-left">
                                            <span className="font-heading text-base font-semibold">{m.title}</span>
                                            <span className="flex flex-wrap items-center gap-2">
                                                <Badge variant="secondary" className="capitalize">
                                                    {m.difficulty}
                                                </Badge>
                                                <span className="text-xs font-normal text-muted-foreground">
                                                    {m.sections.length} {m.sections.length === 1 ? 'Section' : 'Sections'} · {m.completedSections} completed
                                                </span>
                                            </span>
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="flex flex-col gap-1">
                                            {m.sections.map((s) => (
                                                <li key={s.id}>
                                                    <SectionLink section={s} />
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </Card>
                )}
            </AppLayout>
        </>
    );
}
