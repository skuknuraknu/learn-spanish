import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const POS_STYLES: Record<string, string> = {
    noun: 'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300',
    verb: 'border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-300',
    pronoun: 'border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300',
    adjective: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
    adverb: 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300',
    preposition: 'border-orange-500/30 bg-orange-500/10 text-orange-700 dark:text-orange-300',
    article: 'border-teal-500/30 bg-teal-500/10 text-teal-700 dark:text-teal-300',
    conjunction: 'border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300',
};

export function PartOfSpeechBadge({ partOfSpeech, className }: { partOfSpeech: string; className?: string }) {
    const style = POS_STYLES[partOfSpeech.trim().toLowerCase()];
    return (
        <Badge variant="outline" className={cn('capitalize', style, className)}>
            {partOfSpeech}
        </Badge>
    );
}
