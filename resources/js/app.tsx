import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

const pages = import.meta.glob('./pages/**/*.tsx', { eager: false }) as Record<
    string,
    () => Promise<{ default: never }>
>;

createInertiaApp({
    title: (title) => (title ? `${title} - Spanish` : 'Spanish'),
    resolve: async (name) => {
        const loader = pages[`./pages/${name}.tsx`];
        if (!loader) {
            throw new Error(`Inertia page not found: ${name}`);
        }
        return (await loader()).default;
    },
    setup({ el, App, props }) {
        if (!el) return;
        createRoot(el).render(<App {...props} />);
    },
});
