import { Head } from '@inertiajs/react';
import { ConstructionIcon } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';

export default function ComingSoon({ title, description }: { title: string; description?: string }) {
    return (
        <>
            <Head title={title} />
            <AppLayout title={title} description={description}>
                <div className="flex flex-col items-center gap-2 py-16 text-center">
                    <ConstructionIcon className="size-8 text-muted-foreground" aria-hidden="true" />
                    <p className="font-medium">Coming soon</p>
                    <p className="text-sm text-muted-foreground">This section is under construction.</p>
                </div>
            </AppLayout>
        </>
    );
}
