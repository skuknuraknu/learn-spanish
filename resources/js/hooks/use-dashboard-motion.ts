import type { RefObject } from 'react';

import { gsap, MOTION, ScrollTrigger, useGSAP } from '@/lib/gsap';

/**
 * Dashboard motion:
 *  1. Entrance timeline: greeting → stat cards (staggered) → continue-learning card.
 *  2. ScrollTrigger: module cards reveal bottom-to-top as they enter the viewport.
 *
 * Elements are targeted by data attributes, scoped to `scope` so selectors can't leak.
 * Everything created inside useGSAP is reverted automatically on unmount, so Inertia
 * page changes leave no tweens or ScrollTriggers behind. gsap.matchMedia skips all of it
 * (content just renders in place) when the user prefers reduced motion.
 */
export function useDashboardMotion(scope: RefObject<HTMLElement | null>, dependencies: unknown[] = []) {
    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add('(prefers-reduced-motion: no-preference)', () => {
                const { ease, duration, stagger, distance } = MOTION;

                // 1. Entrance (plays once on mount)
                gsap.timeline({ defaults: { ease, duration } })
                    .from('[data-motion="greeting"]', { autoAlpha: 0, y: distance })
                    .from('[data-motion="stat"]', { autoAlpha: 0, y: distance, stagger }, '-=0.3')
                    .from('[data-motion="continue"]', { autoAlpha: 0, y: distance }, '-=0.25');

                // 2. Scroll reveal for module cards
                gsap.set('[data-motion="module"]', { autoAlpha: 0, y: distance * 2 });

                ScrollTrigger.batch('[data-motion="module"]', {
                    start: 'top 90%',
                    once: true,
                    onEnter: (batch) =>
                        gsap.to(batch, {
                            autoAlpha: 1,
                            y: 0,
                            duration,
                            ease,
                            stagger,
                            overwrite: true,
                        }),
                });

                // Layout can shift after fonts/images; make sure trigger positions are right.
                ScrollTrigger.refresh();
            });

            // matchMedia reverts its own animations; useGSAP also reverts the context on unmount.
            return () => mm.revert();
        },
        { scope, dependencies, revertOnUpdate: true },
    );
}
