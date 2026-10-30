import { Head } from '@inertiajs/react';
import { useRef } from 'react';

import { ContinueLearningCard, ModulesGrid, WelcomeHeader } from '@/components/dashboard/dashboard-sections';
import { useDashboardMotion } from '@/hooks/use-dashboard-motion';
import AppLayout from '@/layouts/app-layout';
import type { DashboardPageProps } from '@/types/dashboard';

export default function Dashboard({ userName, stats, current, modules }: DashboardPageProps) {
    const container = useRef<HTMLDivElement>(null);

    // Re-run (reverting first) only if the number of module cards changes.
    useDashboardMotion(container, [modules.length]);

    return (
        <>
            <Head title="Dashboard" />
            <AppLayout title="Dashboard" description="Your progress at a glance.">
                <div ref={container} className="flex flex-col gap-6">
                    <WelcomeHeader userName={userName} stats={stats} />
                    <ContinueLearningCard current={current} />
                    <ModulesGrid modules={modules} />
                </div>
            </AppLayout>
        </>
    );
}
