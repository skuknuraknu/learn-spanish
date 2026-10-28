import { Head } from '@inertiajs/react';

import { ContinueLearningCard, ModulesGrid, WelcomeHeader } from '@/components/dashboard/dashboard-sections';
import AppLayout from '@/layouts/app-layout';
import type { DashboardPageProps } from '@/types/dashboard';

export default function Dashboard({ userName, stats, current, modules }: DashboardPageProps) {
    return (
        <>
            <Head title="Dashboard" />
            <AppLayout title="Dashboard" description="Your progress at a glance.">
                <WelcomeHeader userName={userName} stats={stats} />
                <ContinueLearningCard current={current} />
                <ModulesGrid modules={modules} />
            </AppLayout>
        </>
    );
}
