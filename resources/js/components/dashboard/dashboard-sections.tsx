import { Link } from '@inertiajs/react';
import {
    CheckCircle2Icon,
    CircleDashedIcon,
    FlameIcon,
    HandshakeIcon,
    HotelIcon,
    PlayIcon,
    SproutIcon,
    TargetIcon,
    TrophyIcon,
    UtensilsIcon,
    type LucideIcon,
} from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { CurrentSection, DashboardStats, ModuleOverview, ModuleStatus } from '@/types/dashboard';

const MODULE_ICONS: LucideIcon[] = [HandshakeIcon, UtensilsIcon, HotelIcon];

const STATUS: Record<ModuleStatus, { label: string; icon: LucideIcon; className: string }> = {
    completed: { label: 'Completed', icon: CheckCircle2Icon, className: 'text-emerald-600 dark:text-emerald-400' },
    in_progress: { label: 'In progress', icon: SproutIcon, className: 'text-amber-600 dark:text-amber-400' },
    not_started: { label: 'Not started', icon: CircleDashedIcon, className: 'text-muted-foreground' },
};

function initials(name: string) {
    return name
        .split(' ')
        .map((p) => p[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

export function WelcomeHeader({ userName, stats }: { userName: string; stats: DashboardStats }) {
    const items = [
        { label: 'Daily streak', value: `${stats.streak} ${stats.streak === 1 ? 'day' : 'days'}`, icon: FlameIcon, tone: 'text-orange-500' },
        { label: 'Mastered words', value: String(stats.masteredWords), icon: TrophyIcon, tone: 'text-amber-500' },
        { label: 'Overall progress', value: `${stats.overallProgress}%`, icon: TargetIcon, tone: 'text-sky-500' },
    ];

    return (
        <section aria-labelledby="welcome-title" className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <Avatar size="lg">
                    <AvatarFallback>{initials(userName)}</AvatarFallback>
                </Avatar>
                <div>
                    <h2 id="welcome-title" className="font-heading text-2xl font-semibold">
                        <span lang="es">¡Hola</span>, {userName}!
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        {stats.streak > 0 ? 'Keep your streak alive today.' : 'Start a lesson to begin your streak.'}
                    </p>
                </div>
            </div>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {items.map(({ label, value, icon: Icon, tone }) => (
                    <li key={label}>
                        <Card size="sm">
                            <CardContent className="flex items-center gap-3">
                                <span className="flex size-10 items-center justify-center rounded-lg bg-muted">
                                    <Icon className={cn('size-5', tone)} aria-hidden="true" />
                                </span>
                                <div>
                                    <p className="text-xl leading-tight font-semibold tabular-nums">{value}</p>
                                    <p className="text-xs text-muted-foreground">{label}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export function ContinueLearningCard({ current }: { current: CurrentSection | null }) {
    if (!current) {
        return (
            <Card>
                <CardContent className="flex flex-col items-center gap-2 py-6 text-center">
                    <TrophyIcon className="size-8 text-muted-foreground" aria-hidden="true" />
                    <p className="font-medium">Nothing to resume yet</p>
                    <p className="text-sm text-muted-foreground">Modules will appear here once they are available.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="bg-primary/5">
            <CardHeader>
                <CardDescription>{current.started ? 'Continue learning' : 'Start learning'}</CardDescription>
                <CardTitle className="text-lg sm:text-xl">{current.moduleTitle}</CardTitle>
                <p className="text-sm text-muted-foreground">{current.sectionTitle}</p>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-1 flex-col gap-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>
                            {current.completed} of {current.total} sentences mastered
                        </span>
                        <span className="tabular-nums">{current.progress}%</span>
                    </div>
                    <Progress value={current.progress} aria-label="Section progress" />
                </div>
                <Link href="/learn" className={cn(buttonVariants({ size: 'lg' }), 'w-full sm:w-auto')}>
                    <PlayIcon aria-hidden="true" />
                    Resume Learning
                </Link>
            </CardContent>
        </Card>
    );
}

export function ModulesGrid({ modules }: { modules: ModuleOverview[] }) {
    return (
        <section aria-labelledby="modules-title" className="flex flex-col gap-3">
            <h2 id="modules-title" className="font-heading text-lg font-semibold">
                Learning Modules
            </h2>
            {modules.length === 0 ? (
                <p className="text-sm text-muted-foreground">No modules available yet.</p>
            ) : (
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {modules.map((m, i) => {
                        const Icon = MODULE_ICONS[i % MODULE_ICONS.length];
                        const status = STATUS[m.status];
                        const StatusIcon = status.icon;
                        return (
                            <li key={m.id}>
                                <Card className="h-full">
                                    <CardHeader>
                                        <div className="flex items-start justify-between gap-2">
                                            <span className="flex size-10 items-center justify-center rounded-lg bg-muted">
                                                <Icon className="size-5" aria-hidden="true" />
                                            </span>
                                            <Badge variant="secondary" className="capitalize">
                                                {m.difficulty}
                                            </Badge>
                                        </div>
                                        <CardTitle>{m.title}</CardTitle>
                                        {m.description && <CardDescription>{m.description}</CardDescription>}
                                    </CardHeader>
                                    <CardContent className="mt-auto flex flex-col gap-3">
                                        <Progress value={m.progress} aria-label={`${m.title} progress`} />
                                        <div className="flex items-center justify-between text-xs">
                                            <span className={cn('flex items-center gap-1 font-medium', status.className)}>
                                                <StatusIcon className="size-3.5" aria-hidden="true" />
                                                {status.label}
                                            </span>
                                            <span className="text-muted-foreground">
                                                {m.sectionCount} sections · {m.sentenceCount} sentences
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
}
