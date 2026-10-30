/**
 * Interactive Sound Effects Manager for Quiz & Flashcards.
 *
 * Requirements:
 * - Wrong answer: randomly pick between error.mp3 and strings.mp3
 * - Correct answer: randomly pick between ding.mp3 and correct.mp3
 * - Card interactions: whoosh.mp3 for card flipping, mouse-click.mp3 for buttons
 */

const CORRECT_SOUNDS = [
    '/assets/sound-effects/ding.mp3',
    '/assets/sound-effects/correct.mp3',
];

const WRONG_SOUNDS = [
    '/assets/sound-effects/error.mp3',
    '/assets/sound-effects/strings.mp3',
];

const FLIP_SOUND = '/assets/sound-effects/whoosh.mp3';
const CLICK_SOUND = '/assets/sound-effects/mouse-click.mp3';

const STORAGE_KEY = 'spanish_sound_effects_enabled';

class QuizSoundManager {
    private enabled: boolean = true;
    private audioCache: Map<string, HTMLAudioElement> = new Map();

    constructor() {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem(STORAGE_KEY);
            this.enabled = saved !== null ? saved === 'true' : true;
            this.preload();
        }
    }

    private preload() {
        if (typeof window === 'undefined') return;
        const allSounds = [...CORRECT_SOUNDS, ...WRONG_SOUNDS, FLIP_SOUND, CLICK_SOUND];
        for (const src of allSounds) {
            try {
                const audio = new Audio(src);
                audio.preload = 'auto';
                this.audioCache.set(src, audio);
            } catch {
                // Ignore preload issues in SSR or restricted environments
            }
        }
    }

    public isEnabled(): boolean {
        return this.enabled;
    }

    public setEnabled(val: boolean) {
        this.enabled = val;
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, String(val));
        }
    }

    public toggle(): boolean {
        const next = !this.enabled;
        this.setEnabled(next);
        return next;
    }

    private play(src: string, volume: number = 0.6) {
        if (!this.enabled || typeof window === 'undefined') return;

        try {
            let audio = this.audioCache.get(src);
            if (!audio) {
                audio = new Audio(src);
                this.audioCache.set(src, audio);
            }
            audio.currentTime = 0;
            audio.volume = Math.max(0, Math.min(1, volume));
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Handled browser autoplay restrictions silently
                });
            }
        } catch {
            // Silently ignore audio playback errors
        }
    }

    /**
     * Randomly plays either ding.mp3 or correct.mp3 for correct answers.
     */
    public playCorrect() {
        const idx = Math.floor(Math.random() * CORRECT_SOUNDS.length);
        this.play(CORRECT_SOUNDS[idx], 0.65);
    }

    /**
     * Randomly plays either error.mp3 or strings.mp3 for wrong answers.
     */
    public playWrong() {
        const idx = Math.floor(Math.random() * WRONG_SOUNDS.length);
        this.play(WRONG_SOUNDS[idx], 0.6);
    }

    /**
     * Plays whoosh.mp3 on card flip or smooth slide.
     */
    public playFlip() {
        this.play(FLIP_SOUND, 0.45);
    }

    /**
     * Plays tactile click sound on option/button select.
     */
    public playClick() {
        this.play(CLICK_SOUND, 0.35);
    }
}

export const quizSound = new QuizSoundManager();
