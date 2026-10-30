import { useForm } from '@inertiajs/react';
import { BellIcon, CheckIcon, ClockIcon, FlameIcon, Loader2Icon, TargetIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import type { LearningPreferences } from '@/types/settings';

interface LearningPreferencesTabProps {
    preferences: LearningPreferences;
}

export function LearningPreferencesTab({ preferences }: LearningPreferencesTabProps) {
    const [saved, setSaved] = useState(false);

    const form = useForm({
        dailyGoalMinutes: preferences.dailyGoalMinutes ?? 15,
        dailyWordsGoal: preferences.dailyWordsGoal ?? 10,
        reminderEnabled: preferences.reminderEnabled ?? true,
        reminderTime: preferences.reminderTime ?? '19:00',
        soundEffects: preferences.soundEffects ?? true,
        weeklyReport: preferences.weeklyReport ?? true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/settings/preferences', {
            preserveScroll: true,
            onSuccess: () => {
                setSaved(true);
                setTimeout(() => setSaved(false), 3000);
            },
        });
    };

    const minutesOptions = [
        { value: 5, label: '5 Menit', level: 'Santai' },
        { value: 10, label: '10 Menit', level: 'Reguler' },
        { value: 15, label: '15 Menit', level: 'Direkomendasikan' },
        { value: 30, label: '30 Menit', level: 'Intensif' },
    ];

    const wordsOptions = [5, 10, 15, 20];

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Target Belajar Harian */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <TargetIcon className="size-5 text-primary" />
                        <CardTitle className="text-lg">Target Belajar Harian (Daily Goal)</CardTitle>
                    </div>
                    <CardDescription>
                        Tentukan target waktu dan jumlah kosakata yang ingin Anda kuasai setiap hari.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    {/* Pilihan Waktu Harian */}
                    <div className="flex flex-col gap-3">
                        <Label className="text-sm font-medium">Durasi Belajar per Hari</Label>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {minutesOptions.map((opt) => {
                                const isSelected = form.data.dailyGoalMinutes === opt.value;
                                return (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => form.setData('dailyGoalMinutes', opt.value)}
                                        className={cn(
                                            'flex flex-col items-center justify-center gap-1 rounded-xl border p-3.5 text-center transition-all outline-none',
                                            isSelected
                                                ? 'border-primary bg-primary/10 text-primary font-semibold ring-2 ring-primary/20'
                                                : 'border-border/70 hover:border-foreground/30 hover:bg-muted/40 text-foreground',
                                        )}
                                    >
                                        <div className="flex items-center gap-1 text-sm font-bold">
                                            <ClockIcon className="size-3.5" />
                                            <span>{opt.label}</span>
                                        </div>
                                        <span className="text-[11px] text-muted-foreground font-normal">
                                            {opt.level}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <Separator />

                    {/* Target Jumlah Kosakata per Hari */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <Label className="text-sm font-medium">Target Kosakata Harian</Label>
                                <p className="text-xs text-muted-foreground">
                                    Jumlah kata baru yang ditargetkan untuk dihafal per sesi.
                                </p>
                            </div>
                            <span className="font-heading text-sm font-bold text-primary">
                                {form.data.dailyWordsGoal} Kata / Hari
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            {wordsOptions.map((count) => {
                                const isSelected = form.data.dailyWordsGoal === count;
                                return (
                                    <Button
                                        key={count}
                                        type="button"
                                        variant={isSelected ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => form.setData('dailyWordsGoal', count)}
                                        className="flex-1"
                                    >
                                        {count} Kata
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Notifikasi & Pengingat */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <BellIcon className="size-5 text-primary" />
                        <CardTitle className="text-lg">Pengingat & Notifikasi</CardTitle>
                    </div>
                    <CardDescription>
                        Atur pengingat agar Anda tidak kehilangan streak dan rutinitas belajar.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    {/* Pengingat Harian */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex size-8 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                                <FlameIcon className="size-4 text-orange-500" />
                            </div>
                            <div>
                                <Label htmlFor="reminder-toggle" className="text-sm font-medium cursor-pointer">
                                    Pengingat Streak Harian
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                    Dapatkan notifikasi sebelum streak belajar Anda berakhir.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {form.data.reminderEnabled && (
                                <Input
                                    type="time"
                                    value={form.data.reminderTime}
                                    onChange={(e) => form.setData('reminderTime', e.target.value)}
                                    className="w-28 text-xs h-8"
                                    aria-label="Waktu pengingat"
                                />
                            )}
                            <Switch
                                id="reminder-toggle"
                                checked={form.data.reminderEnabled}
                                onCheckedChange={(checked) => form.setData('reminderEnabled', checked)}
                            />
                        </div>
                    </div>

                    <Separator />

                    {/* Laporan Mingguan */}
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <div className="mt-0.5 flex size-8 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                                <BellIcon className="size-4" />
                            </div>
                            <div>
                                <Label htmlFor="weekly-report" className="text-sm font-medium cursor-pointer">
                                    Laporan Progres Mingguan
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                    Kirim ringkasan kosakata baru dan akurasi kuis ke email Anda setiap akhir pekan.
                                </p>
                            </div>
                        </div>
                        <Switch
                            id="weekly-report"
                            checked={form.data.weeklyReport}
                            onCheckedChange={(checked) => form.setData('weeklyReport', checked)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Simpan Preferensi */}
            <div className="flex items-center justify-end gap-3">
                {saved && (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        <CheckIcon className="size-4" />
                        Preferensi berhasil disimpan
                    </span>
                )}
                <Button type="submit" disabled={form.processing} size="lg" className="min-w-40">
                    {form.processing ? (
                        <>
                            <Loader2Icon className="mr-2 size-4 animate-spin" />
                            Menyimpan...
                        </>
                    ) : (
                        'Simpan Preferensi'
                    )}
                </Button>
            </div>
        </form>
    );
}
