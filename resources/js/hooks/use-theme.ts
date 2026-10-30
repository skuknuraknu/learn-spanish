import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
    const [theme, setThemeState] = useState<Theme>(() => {
        if (typeof window === 'undefined') return 'system';
        return (localStorage.getItem('theme') as Theme) || 'system';
    });

    const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const root = document.documentElement;

        const applyTheme = (current: Theme) => {
            const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const isDark = current === 'dark' || (current === 'system' && systemDark);

            if (isDark) {
                root.classList.add('dark');
                setResolvedTheme('dark');
            } else {
                root.classList.remove('dark');
                setResolvedTheme('light');
            }
        };

        applyTheme(theme);

        // Listen for system changes if system mode is selected
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (theme === 'system') {
                applyTheme('system');
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        try {
            localStorage.setItem('theme', newTheme);
        } catch {
            // ignore
        }
    };

    return { theme, setTheme, resolvedTheme };
}
