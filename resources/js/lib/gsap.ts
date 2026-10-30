import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register once, at module load. Safe to import from any component.
gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Shared motion tokens: ease-out only for entrances, short durations (see skills/ui/improve-animations.md). */
export const MOTION = {
    ease: 'power3.out',
    duration: 0.5,
    stagger: 0.08,
    distance: 16,
} as const;

export { gsap, ScrollTrigger, useGSAP };
