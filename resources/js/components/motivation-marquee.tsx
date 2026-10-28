import { QuoteIcon } from 'lucide-react';

const QUOTES = [
    { es: 'Poco a poco se va lejos.', en: 'Little by little, one goes far.' },
    { es: 'Quien la sigue, la consigue.', en: 'Whoever keeps at it, gets it.' },
    { es: 'Querer es poder.', en: 'Where there is a will, there is a way.' },
    { es: 'Al mal tiempo, buena cara.', en: 'Face hard times with a smile.' },
    { es: 'La práctica hace al maestro.', en: 'Practice makes the master.' },
    { es: 'Nunca es tarde para aprender.', en: 'It is never too late to learn.' },
];

function QuoteList({ hidden = false }: { hidden?: boolean }) {
    return (
        <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
            {QUOTES.map((q) => (
                <li key={q.es} className="flex items-center gap-2 px-6 text-sm whitespace-nowrap">
                    <QuoteIcon className="size-3.5 text-primary" aria-hidden="true" />
                    <span lang="es" className="font-medium">{q.es}</span>
                    <span className="text-muted-foreground">· {q.en}</span>
                </li>
            ))}
        </ul>
    );
}

/** Full-width infinite marquee of Spanish motivational quotes. Pauses on hover; static when reduced motion is preferred. */
export function MotivationMarquee() {
    return (
        <div
            role="region"
            aria-label="Motivational quotes"
            className="group relative flex h-9 w-full shrink-0 items-center overflow-hidden border-b bg-muted/60 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
        >
            <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
                <QuoteList />
                <QuoteList hidden />
            </div>
        </div>
    );
}
