import { useForm } from '@inertiajs/react';
import { CheckIcon, KeyRoundIcon, Loader2Icon, UserIcon } from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import type { UserProfile } from '@/types/settings';

interface ProfileTabProps {
    user: UserProfile;
}

export function ProfileTab({ user }: ProfileTabProps) {
    const [profileSaved, setProfileSaved] = useState(false);
    const [passwordSaved, setPasswordSaved] = useState(false);

    // Profile form
    const profileForm = useForm({
        name: user.name,
        email: user.email,
    });

    // Password form
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        profileForm.patch('/settings/profile', {
            preserveScroll: true,
            onSuccess: () => {
                setProfileSaved(true);
                setTimeout(() => setProfileSaved(false), 3000);
            },
        });
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        passwordForm.put('/settings/password', {
            preserveScroll: true,
            onSuccess: () => {
                setPasswordSaved(true);
                passwordForm.reset();
                setTimeout(() => setPasswordSaved(false), 3000);
            },
        });
    };

    const initials = user.name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase() || 'ES';

    return (
        <div className="flex flex-col gap-6">
            {/* Informasi Profil */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Informasi Profil</CardTitle>
                    <CardDescription>
                        Perbarui informasi nama dan alamat email akun Anda.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleProfileSubmit} className="flex flex-col gap-6">
                        {/* Header Avatar Preview */}
                        <div className="flex items-center gap-4">
                            <Avatar className="size-16 border-2 border-primary/20">
                                <AvatarFallback className="text-lg font-bold">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-heading text-base font-semibold">{user.name}</h3>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="profile-name">Nama Lengkap</Label>
                                <Input
                                    id="profile-name"
                                    type="text"
                                    value={profileForm.data.name}
                                    onChange={(e) => profileForm.setData('name', e.target.value)}
                                    placeholder="Masukkan nama lengkap"
                                    required
                                    disabled={profileForm.processing}
                                />
                                {profileForm.errors.name && (
                                    <p className="text-xs text-destructive">{profileForm.errors.name}</p>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="profile-email">Alamat Email</Label>
                                <Input
                                    id="profile-email"
                                    type="email"
                                    value={profileForm.data.email}
                                    onChange={(e) => profileForm.setData('email', e.target.value)}
                                    placeholder="nama@domain.com"
                                    required
                                    disabled={profileForm.processing}
                                />
                                {profileForm.errors.email && (
                                    <p className="text-xs text-destructive">{profileForm.errors.email}</p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2">
                            {profileSaved && (
                                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                    <CheckIcon className="size-4" />
                                    Profil berhasil disimpan
                                </span>
                            )}
                            <Button
                                type="submit"
                                disabled={profileForm.processing || !profileForm.isDirty}
                                className="min-w-32"
                            >
                                {profileForm.processing ? (
                                    <>
                                        <Loader2Icon className="mr-2 size-4 animate-spin" />
                                        Menyimpan...
                                    </>
                                ) : (
                                    'Simpan Perubahan'
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Keamanan & Ubah Kata Sandi */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <KeyRoundIcon className="size-5 text-muted-foreground" />
                        <CardTitle className="text-lg">Ubah Kata Sandi</CardTitle>
                    </div>
                    <CardDescription>
                        Pastikan akun Anda menggunakan kata sandi yang kuat dan aman.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="current_password">Kata Sandi Saat Ini</Label>
                            <Input
                                id="current_password"
                                type="password"
                                value={passwordForm.data.current_password}
                                onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                                placeholder="••••••••"
                                required
                                disabled={passwordForm.processing}
                            />
                            {passwordForm.errors.current_password && (
                                <p className="text-xs text-destructive">
                                    {passwordForm.errors.current_password}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="new_password">Kata Sandi Baru</Label>
                                <Input
                                    id="new_password"
                                    type="password"
                                    value={passwordForm.data.password}
                                    onChange={(e) => passwordForm.setData('password', e.target.value)}
                                    placeholder="Minimal 8 karakter"
                                    required
                                    disabled={passwordForm.processing}
                                />
                                {passwordForm.errors.password && (
                                    <p className="text-xs text-destructive">
                                        {passwordForm.errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="password_confirmation">Konfirmasi Kata Sandi Baru</Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    value={passwordForm.data.password_confirmation}
                                    onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                                    placeholder="Ulangi kata sandi baru"
                                    required
                                    disabled={passwordForm.processing}
                                />
                                {passwordForm.errors.password_confirmation && (
                                    <p className="text-xs text-destructive">
                                        {passwordForm.errors.password_confirmation}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2">
                            {passwordSaved && (
                                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                    <CheckIcon className="size-4" />
                                    Kata sandi diperbarui
                                </span>
                            )}
                            <Button
                                type="submit"
                                variant="outline"
                                disabled={passwordForm.processing || !passwordForm.data.password}
                            >
                                {passwordForm.processing ? (
                                    <>
                                        <Loader2Icon className="mr-2 size-4 animate-spin" />
                                        Memperbarui...
                                    </>
                                ) : (
                                    'Perbarui Kata Sandi'
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
