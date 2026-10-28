import { Volume2Icon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { SentenceLearningProps } from '@/types/learning';

export function speak(text: string) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
}

type Props = Pick<SentenceLearningProps, 'sentence' | 'translation' | 'difficulty' | 'grammarCategory'>;

export function SentenceCard({ sentence, translation, difficulty, grammarCategory }: Props) {
    return (
        <Card className="bg-primary/5">
            <CardContent className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="capitalize">
                        {difficulty}
                    </Badge>
                    {grammarCategory && <Badge variant="outline">{grammarCategory}</Badge>}
                </div>
                <div className="flex items-start justify-between gap-3">
                    <p lang="es" className="font-heading text-2xl leading-tight font-semibold text-balance sm:text-4xl">
                        {sentence}
                    </p>
                    <Tooltip>
                        <TooltipTrigger
                            render={
                                <Button
                                    variant="outline"
                                    size="icon-lg"
                                    className="shrink-0"
                                    aria-label="Listen to sentence"
                                    onClick={() => speak(sentence)}
                                />
                            }
                        >
                            <Volume2Icon aria-hidden="true" />
                        </TooltipTrigger>
                        <TooltipContent>Listen</TooltipContent>
                    </Tooltip>
                </div>
                <p className="text-base text-muted-foreground sm:text-lg">{translation}</p>
            </CardContent>
        </Card>
    );
}
