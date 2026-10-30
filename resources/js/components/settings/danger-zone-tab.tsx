import { router } from '@inertiajs/react';
import { AlertTriangleIcon, Loader2Icon, RotateCcwIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export function DangerZoneTab() {
    const [isResetting, setIsResetting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [confirmDeleteText, setConfirmDeleteText] = useState('');
    const [resetDialogOpen, setResetDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleResetProgress = () => {
        setIsResetting(true);
        router.post(
            '/settings/reset-progress',
            {},
            {
                preserveScroll: true,
                onFinish: () => {
                    setIsResetting(false);
                    setResetDialogOpen(false);
                },
            },
        );
    };

    const handleDeleteAccount = () => {
        if (confirmDeleteText !== 'HAPUS') return;

        setIsDeleting(true);
        router.delete('/settings/account', {
            onFinish: () => {
                setIsDeleting(false);
                setDeleteDialogOpen(false);
            },
        });
    };

    return (
        <div className="flex flex-col gap-6">
            <Card className="border-destructive/40 bg-destructive/5">
                <CardHeader>
                    <div className="flex items-center gap-2 text-destructive">
                        <AlertTriangleIcon className="size-5" />
                        <CardTitle className="text-lg text-destructive">Zona Bahaya (Danger Zone)</CardTitle>
                    </div>
                    <CardDescription>
                        Tindakan di bagian ini bersifat permanen dan berdampak langsung pada data progres serta akun Anda.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    {/* Aksi 1: Reset Progres Belajar */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h4 className="font-heading text-sm font-semibold text-foreground">
                                Reset Seluruh Progres Belajar
                            </h4>
                            <p className="text-xs text-muted-foreground">
                                Menghapus status kalimat yang dikuasai, kosakata yang dihafal, dan nilai kuis. Akun Anda tetap aktif.
                            </p>
                        </div>

                        {/* Modal Dialog Reset */}
                        <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
                            <DialogTrigger
                                render={
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="shrink-0 border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                                    />
                                }
                            >
                                <RotateCcwIcon className="mr-1.5 size-3.5" />
                                Reset Progres
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <div className="flex items-center gap-2 text-destructive">
                                        <AlertTriangleIcon className="size-5" />
                                        <DialogTitle>Konfirmasi Reset Progres</DialogTitle>
                                    </div>
                                    <DialogDescription className="pt-2 text-xs leading-relaxed text-muted-foreground">
                                        Apakah Anda yakin ingin mereset seluruh progres pembelajaran? Seluruh kata yang telah ditandai sebagai dikuasai akan dikembalikan ke status awal.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="gap-2 sm:gap-0">
                                    <DialogClose
                                        render={
                                            <Button variant="outline" size="sm">
                                                Batal
                                            </Button>
                                        }
                                    />
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={handleResetProgress}
                                        disabled={isResetting}
                                    >
                                        {isResetting ? (
                                            <>
                                                <Loader2Icon className="mr-2 size-4 animate-spin" />
                                                Mereset...
                                            </>
                                        ) : (
                                            'Ya, Reset Progres'
                                        )}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <Separator className="bg-destructive/20" />

                    {/* Aksi 2: Hapus Akun Pengguna */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h4 className="font-heading text-sm font-semibold text-destructive">
                                Hapus Akun Secara Permanen
                            </h4>
                            <p className="text-xs text-muted-foreground">
                                Menghapus profil, email, riwayat belajar, dan seluruh data akun dari sistem.
                            </p>
                        </div>

                        {/* Modal Dialog Hapus Akun */}
                        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                            <DialogTrigger
                                render={
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="shrink-0"
                                    />
                                }
                            >
                                <Trash2Icon className="mr-1.5 size-3.5" />
                                Hapus Akun
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <div className="flex items-center gap-2 text-destructive">
                                        <AlertTriangleIcon className="size-5" />
                                        <DialogTitle>Hapus Akun Pengguna</DialogTitle>
                                    </div>
                                    <DialogDescription className="pt-2 text-xs leading-relaxed text-muted-foreground">
                                        Peringatan: Tindakan ini tidak dapat dibatalkan. Semua statistik, riwayat streak, dan preferensi akun Anda akan dihapus secara permanen.
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="flex flex-col gap-2 py-2">
                                    <Label htmlFor="confirm-delete" className="text-xs font-medium">
                                        Ketik <span className="font-bold text-destructive">HAPUS</span> untuk mengonfirmasi:
                                    </Label>
                                    <Input
                                        id="confirm-delete"
                                        type="text"
                                        placeholder="HAPUS"
                                        value={confirmDeleteText}
                                        onChange={(e) => setConfirmDeleteText(e.target.value)}
                                        className="h-8 text-xs font-mono"
                                        autoComplete="off"
                                    />
                                </div>

                                <DialogFooter className="gap-2 sm:gap-0">
                                    <DialogClose
                                        render={
                                            <Button variant="outline" size="sm">
                                                Batal
                                            </Button>
                                        }
                                    />
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={handleDeleteAccount}
                                        disabled={isDeleting || confirmDeleteText !== 'HAPUS'}
                                    >
                                        {isDeleting ? (
                                            <>
                                                <Loader2Icon className="mr-2 size-4 animate-spin" />
                                                Menghapus...
                                            </>
                                        ) : (
                                            'Hapus Akun Saya'
                                        )}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
