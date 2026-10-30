import { Link, usePage } from '@inertiajs/react';
import { AlertCircleIcon, BookOpenIcon, CheckCircle2Icon, LanguagesIcon, LayoutDashboardIcon, LibraryIcon, SettingsIcon, SparklesIcon } from 'lucide-react';
import type { PropsWithChildren } from 'react';

import { MotivationMarquee } from '@/components/motivation-marquee';
import { Separator } from '@/components/ui/separator';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarRail,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';

const NAV = [
    { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboardIcon },
    { title: 'Learning Modules', href: '/modules', icon: BookOpenIcon, match: ['/modules', '/learn'] },
    { title: 'Quiz & Practice', href: '/quiz', icon: SparklesIcon, match: ['/quiz'] },
    { title: 'Vocabulary', href: '/vocabulary', icon: LibraryIcon },
    { title: 'Settings', href: '/settings', icon: SettingsIcon },
];

interface AppLayoutProps extends PropsWithChildren {
    title: string;
    description?: string;
}

export default function AppLayout({ title, description, children }: AppLayoutProps) {
    const { url } = usePage();
    const path = url.split('?')[0];

    return (
        <TooltipProvider>
            <SidebarProvider>
                <Sidebar collapsible="icon">
                    <SidebarHeader>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton size="lg" render={<Link href="/dashboard" />} tooltip="Spanish">
                                    <LanguagesIcon aria-hidden="true" />
                                    <span className="font-heading font-semibold">Spanish</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>Navigate</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {NAV.map(({ title: label, href, icon: Icon, match }) => (
                                        <SidebarMenuItem key={href}>
                                            <SidebarMenuButton
                                                render={<Link href={href} />}
                                                isActive={(match ?? [href]).some((p) => path === p || path.startsWith(`${p}/`))}
                                                tooltip={label}
                                            >
                                                <Icon aria-hidden="true" />
                                                <span>{label}</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarRail />
                </Sidebar>
                <SidebarInset className="min-w-0 overflow-x-hidden">
                    <MotivationMarquee />
                    <header className="flex h-14 shrink-0 items-center gap-3 px-4 md:px-6">
                        <SidebarTrigger aria-label="Toggle sidebar" />
                        <Separator orientation="vertical" className="h-5" />
                        <div className="flex flex-col">
                            <h1 className="font-heading text-lg leading-tight font-semibold">{title}</h1>
                            {description && <p className="text-xs text-muted-foreground">{description}</p>}
                        </div>
                    </header>
                    <div className="mx-auto flex w-full min-w-0 max-w-4xl flex-1 flex-col gap-6 px-4 pt-2 pb-10 md:px-6">
                        {(() => {
                            const flash = (usePage().props as { flash?: { success?: string | null; error?: string | null } }).flash;
                            return (
                                <>
                                    {flash?.error && (
                                        <div className="flex items-center gap-2.5 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                                            <AlertCircleIcon className="size-4 shrink-0" />
                                            <span>{flash.error}</span>
                                        </div>
                                    )}
                                    {flash?.success && (
                                        <div className="flex items-center gap-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">
                                            <CheckCircle2Icon className="size-4 shrink-0" />
                                            <span>{flash.success}</span>
                                        </div>
                                    )}
                                </>
                            );
                        })()}
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </TooltipProvider>
    );
}
