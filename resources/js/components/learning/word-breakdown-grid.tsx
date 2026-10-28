import { InfoIcon } from 'lucide-react';

import { PartOfSpeechBadge } from '@/components/learning/part-of-speech-badge';
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from '@/components/ui/popover';
import type { WordBreakdown } from '@/types/learning';

function WordItem({ item }: { item: WordBreakdown }) {
    const hasDetails = Boolean(item.grammarNotes || item.root);

    const body = (
        <>
            <div className="flex w-full items-start justify-between gap-2">
                <span lang="es" className="text-lg font-bold">
                    {item.word}
                </span>
                {hasDetails && <InfoIcon className="size-4 text-muted-foreground" aria-hidden="true" />}
            </div>
            <PartOfSpeechBadge partOfSpeech={item.partOfSpeech} />
            <span className="text-sm text-muted-foreground">{item.translation}</span>
        </>
    );

    const classes =
        'flex h-full w-full flex-col items-start gap-2 rounded-xl bg-card p-3 text-left ring-1 ring-foreground/10 transition-colors';

    if (!hasDetails) {
        return <div className={classes}>{body}</div>;
    }

    return (
        <Popover>
            <PopoverTrigger
                className={`${classes} cursor-pointer hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none`}
                aria-label={`${item.word}: ${item.translation}. Show grammar details`}
            >
                {body}
            </PopoverTrigger>
            <PopoverContent>
                <PopoverHeader>
                    <PopoverTitle lang="es">{item.word}</PopoverTitle>
                    {item.root && (
                        <PopoverDescription>
                            Root form: <span lang="es" className="font-medium text-foreground">{item.root}</span>
                        </PopoverDescription>
                    )}
                </PopoverHeader>
                {item.grammarNotes && <p className="text-sm">{item.grammarNotes}</p>}
            </PopoverContent>
        </Popover>
    );
}

export function WordBreakdownGrid({ words }: { words: WordBreakdown[] }) {
    return (
        <section aria-labelledby="word-breakdown-title" className="flex flex-col gap-3">
            <div>
                <h2 id="word-breakdown-title" className="font-heading text-lg font-semibold">
                    Word Breakdown
                </h2>
                <p lang="es" className="text-sm text-muted-foreground">
                    Análisis de Palabras · tap a word for grammar details
                </p>
            </div>
            {words.length === 0 ? (
                <p className="text-sm text-muted-foreground">No word breakdown available.</p>
            ) : (
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {words.map((item, i) => (
                        <li key={`${item.word}-${i}`}>
                            <WordItem item={item} />
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
