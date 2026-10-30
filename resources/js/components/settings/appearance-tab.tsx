import { CheckIcon, LaptopIcon, MoonIcon, SunIcon, Volume2Icon, VolumeXIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { useTheme, type Theme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';

interface AppearanceTabProps {
    soundEffects: boolean;
    onToggleSoundEffects?: (enabled: boolean) => void;
}

export function AppearanceTab({ soundEffects, onToggleSoundEffects }: AppearanceTabProps) {
    const { theme, setTheme } = useTheme();
    const [soundEnabled, setSoundEnabled] = useState(soundEffects);
    const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

    const handleSoundToggle = (checked: boolean) => {
        setSoundEnabled(checked);
        onToggleSoundEffects?.(checked);
    };

    const themeOptions: { id: Theme; title: string; desc: string; icon: typeof SunIcon }[] = [
        {
            id: 'light',
            title: 'Terang (Light)',
            desc: 'Tampilan bersih dengan latar belakang putih.',
            icon: SunIcon,
        },
        {
            id: 'dark',
            title: 'Gelap (Dark)',
            desc: 'Nyaman untuk mata saat belajar di malam hari.',
            icon: MoonIcon,
        },
        {
            id: 'system',
            title: 'Sistem (System)',
            desc: 'Mengikuti pengaturan tema bawaan perangkat Anda.',
            icon: LaptopIcon,
        },
    ];

    return (
        <div className="flex flex-col gap-6">
            {/* Card Pilihan Tema */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Tema Antarmuka</CardTitle>
                    <CardDescription>
                        Pilih mode tampilan yang paling nyaman untuk kegiatan belajar Anda.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {themeOptions.map((opt) => {
                            const Icon = opt.icon;
                            const isSelected = theme === opt.id;
                            return (
                                <button
                                    key={opt.id}
                                    type="button"
                                    onClick={() => setTheme(opt.id)}
                                    className={cn(
                                        'group relative flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-all outline-none select-none',
                                        isSelected
                                            ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                                            : 'border-border/70 hover:border-foreground/30 hover:bg-muted/40',
                                    )}
                                >
                                    <div className="flex w-full items-center justify-between">
                                        <div
                                            className={cn(
                                                'flex size-9 items-center justify-center rounded-lg border transition-colors',
                                                isSelected
                                                    ? 'border-primary/30 bg-primary/10 text-primary'
                                                    : 'border-border bg-muted text-muted-foreground',
                                            )}
                                        >
                                            <Icon className="size-4.5" />
                                        </div>
                                        {isSelected && (
                                            <span className="flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                                <CheckIcon className="size-3 stroke-[3]" />
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-heading text-sm font-semibold text-foreground">
                                            {opt.title}
                                        </p>
                                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                                            {opt.desc}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Card Pengaturan Kenyamanan Membaca & Audio */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Kenyamanan Membaca & Audio</CardTitle>
                    <CardDescription>
                        Sesuaikan preferensi ukuran teks dan audio interaktif dalam aplikasi.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    {/* Ukuran Teks */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <Label className="text-sm font-medium">Ukuran Teks Kalimat</Label>
                            <p className="text-xs text-muted-foreground">
                                Menyesuaikan keterbacaan teks bahasa Spanyol di layar belajar.
                            </p>
                        </div>
                        <div className="flex items-center rounded-lg border bg-muted/40 p-1">
                            <Button
                                type="button"
                                variant={fontSize === 'normal' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setFontSize('normal')}
                                className="h-7 text-xs"
                            >
                                Standar
                            </Button>
                            <Button
                                type="button"
                                variant={fontSize === 'large' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setFontSize('large')}
                                className="h-7 text-xs"
                            >
                                Lebih Besar
                            </Button>
                        </div>
                    </div>

                    <div className="border-t pt-4">
                        {/* Efek Audio / Sound */}
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 flex size-8 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
                                    {soundEnabled ? (
                                        <Volume2Icon className="size-4 text-primary" />
                                    ) : (
                                        <VolumeXIcon className="size-4" />
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="sound-effects" className="text-sm font-medium cursor-pointer">
                                        Efek Suara Interaktif
                                    </Label>
                                    <p className="text-xs text-muted-foreground">
                                        Putar suara umpan balik saat menjawab kuis dan membalik flashcard.
                                    </p>
                                </div>
                            </div>
                            <Switch
                                id="sound-effects"
                                checked={soundEnabled}
                                onCheckedChange={handleSoundToggle}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
