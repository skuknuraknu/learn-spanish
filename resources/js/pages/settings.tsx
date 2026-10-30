import { Head, usePage } from '@inertiajs/react';
import { AlertTriangleIcon, CheckCircle2Icon, PaletteIcon, SlidersIcon, UserIcon, XCircleIcon } from 'lucide-react';
import { useState } from 'react';

import { AppearanceTab } from '@/components/settings/appearance-tab';
import { DangerZoneTab } from '@/components/settings/danger-zone-tab';
import { LearningPreferencesTab } from '@/components/settings/learning-preferences-tab';
import { ProfileTab } from '@/components/settings/profile-tab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import type { SettingsPageProps } from '@/types/settings';

export default function Settings({ user, preferences }: SettingsPageProps) {
    const { flash } = usePage<{ flash?: { success?: string | null; error?: string | null } }>().props;
    const [activeTab, setActiveTab] = useState('appearance');

    return (
        <>
            <Head title="Pengaturan - Spanish" />
            <AppLayout
                title="Pengaturan"
                description="Kelola preferensi akun, tampilan antarmuka, dan target belajar harian Anda."
            >
                <div className="flex flex-col gap-6">
                    {/* Global Flash Alerts */}
                    {flash?.success && (
                        <div
                            role="alert"
                            className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-800 dark:text-emerald-300"
                        >
                            <CheckCircle2Icon className="size-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                            <span>{flash.success}</span>
                        </div>
                    )}

                    {flash?.error && (
                        <div
                            role="alert"
                            className="flex items-center gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-800 dark:text-rose-300"
                        >
                            <XCircleIcon className="size-5 shrink-0 text-rose-600 dark:text-rose-400" />
                            <span>{flash.error}</span>
                        </div>
                    )}

                    {/* Tabs Navigation & Panels */}
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="w-full gap-6"
                    >
                        {/* Horizontal scrollable tab list for mobile */}
                        <div className="overflow-x-auto pb-1">
                            <TabsList className="h-10 w-full justify-start sm:w-fit">
                                <TabsTrigger value="appearance" className="gap-2 px-3 py-1.5 text-xs sm:text-sm">
                                    <PaletteIcon className="size-4" />
                                    <span>Tampilan</span>
                                </TabsTrigger>

                                <TabsTrigger value="profile" className="gap-2 px-3 py-1.5 text-xs sm:text-sm">
                                    <UserIcon className="size-4" />
                                    <span>Profil & Akun</span>
                                </TabsTrigger>

                                <TabsTrigger value="learning" className="gap-2 px-3 py-1.5 text-xs sm:text-sm">
                                    <SlidersIcon className="size-4" />
                                    <span>Preferensi Belajar</span>
                                </TabsTrigger>

                                <TabsTrigger
                                    value="danger"
                                    className="gap-2 px-3 py-1.5 text-xs text-destructive data-active:text-destructive sm:text-sm"
                                >
                                    <AlertTriangleIcon className="size-4 text-destructive" />
                                    <span>Zona Bahaya</span>
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        {/* Tab Content 1: Tampilan */}
                        <TabsContent value="appearance">
                            <AppearanceTab soundEffects={preferences?.soundEffects ?? true} />
                        </TabsContent>

                        {/* Tab Content 2: Profil & Akun */}
                        <TabsContent value="profile">
                            <ProfileTab user={user} />
                        </TabsContent>

                        {/* Tab Content 3: Preferensi Belajar */}
                        <TabsContent value="learning">
                            <LearningPreferencesTab preferences={preferences} />
                        </TabsContent>

                        {/* Tab Content 4: Zona Bahaya */}
                        <TabsContent value="danger">
                            <DangerZoneTab />
                        </TabsContent>
                    </Tabs>
                </div>
            </AppLayout>
        </>
    );
}
