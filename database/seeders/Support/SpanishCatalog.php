<?php

namespace Database\Seeders\Support;

/**
 * Curated Spanish content used by factories and seeders.
 * Faker cannot produce meaningful Spanish, so realistic data lives here.
 */
class SpanishCatalog
{
    /** word => [literal translation, part of speech, grammar notes] */
    public static function lexicon(): array
    {
        return [
            'mucho' => ['much / very', 'adverb', 'Used before "gusto" in the fixed greeting "mucho gusto".'],
            'gusto' => ['pleasure', 'noun', 'Masculine singular. Root: gusto (pleasure).'],
            'en' => ['in / at', 'preposition', 'Here "en" introduces what the pleasure is about.'],
            'conocerle' => ['to meet you (formal)', 'verb', 'Root: conocer. Infinitive + "le" (formal usted).'],
            'conocerlo' => ['to meet you (formal)', 'verb', 'Root: conocer. Infinitive + "lo", formal for a man.'],
            'conocerte' => ['to meet you (informal)', 'verb', 'Root: conocer. Infinitive + "te" (informal tú).'],
            'es' => ['is', 'verb', 'Root: ser. 3rd person singular present (él/ella/usted).'],
            'un' => ['a / an', 'article', 'Masculine singular indefinite article.'],
            'una' => ['a / an', 'article', 'Feminine singular indefinite article.'],
            'el' => ['the', 'article', 'Masculine singular definite article.'],
            'la' => ['the', 'article', 'Feminine singular definite article.'],
            'placer' => ['pleasure', 'noun', 'Masculine singular. Root: placer.'],
            'cómo' => ['how', 'adverb', 'Interrogative; carries a written accent.'],
            'se' => ['oneself', 'pronoun', 'Reflexive pronoun for usted: "se llama" = you are called.'],
            'llama' => ['calls (himself)', 'verb', 'Root: llamar(se). 3rd person singular present.'],
            'llamas' => ['call (yourself)', 'verb', 'Root: llamar(se). 2nd person singular (tú) present.'],
            'llamo' => ['call (myself)', 'verb', 'Root: llamar(se). 1st person singular present.'],
            'usted' => ['you (formal)', 'pronoun', 'Formal "you"; takes 3rd person verb forms.'],
            'de' => ['of / from', 'preposition', 'Indicates origin or possession.'],
            'dónde' => ['where', 'adverb', 'Interrogative; carries a written accent.'],
            'soy' => ['I am', 'verb', 'Root: ser. 1st person singular present.'],
            'eres' => ['you are', 'verb', 'Root: ser. 2nd person singular (tú) present.'],
            'indonesia' => ['Indonesia', 'noun', 'Proper noun; country names are capitalized.'],
            'me' => ['me / myself', 'pronoun', 'Reflexive/object pronoun, 1st person singular.'],
            'te' => ['you / yourself', 'pronoun', 'Reflexive/object pronoun, 2nd person singular.'],
            'ana' => ['Ana', 'noun', 'Feminine proper name.'],
            'hola' => ['hello', 'interjection', 'Common informal greeting. The "h" is silent.'],
            'cuántos' => ['how many', 'adjective', 'Masculine plural; agrees with "años".'],
            'años' => ['years', 'noun', 'Masculine plural of "año".'],
            'tienes' => ['you have', 'verb', 'Root: tener. 2nd person singular (tú) present.'],
            'tengo' => ['I have', 'verb', 'Root: tener. 1st person singular present (irregular).'],
            'veinte' => ['twenty', 'adjective', 'Number; invariable in gender.'],
            'encantado' => ['delighted', 'adjective', 'Masculine form; women say "encantada".'],
            'quisiera' => ['I would like', 'verb', 'Root: querer. Imperfect subjunctive; a polite request.'],
            'mesa' => ['table', 'noun', 'Feminine singular.'],
            'para' => ['for', 'preposition', 'Indicates purpose or recipient.'],
            'dos' => ['two', 'adjective', 'Number; invariable in gender.'],
            'qué' => ['what', 'pronoun', 'Interrogative; carries a written accent.'],
            'recomienda' => ['recommends', 'verb', 'Root: recomendar. 3rd person singular present (e→ie).'],
            'quiero' => ['I want', 'verb', 'Root: querer. 1st person singular present (e→ie).'],
            'café' => ['coffee', 'noun', 'Masculine singular.'],
            'con' => ['with', 'preposition', 'Indicates accompaniment.'],
            'leche' => ['milk', 'noun', 'Feminine singular.'],
            'carta' => ['menu', 'noun', 'Feminine singular; "la carta" is the restaurant menu.'],
            'por' => ['for / by', 'preposition', '"Por favor" = please.'],
            'favor' => ['favor', 'noun', 'Masculine singular; used in "por favor".'],
            'hambre' => ['hunger', 'noun', 'Feminine but takes "el" in the singular; "tener hambre" = to be hungry.'],
            'cuenta' => ['bill', 'noun', 'Feminine singular; "la cuenta" = the check.'],
            'cuánto' => ['how much', 'adverb', 'Interrogative; used for price and quantity.'],
            'cuesta' => ['costs', 'verb', 'Root: costar. 3rd person singular present (o→ue).'],
            'puedo' => ['I can', 'verb', 'Root: poder. 1st person singular present (o→ue).'],
            'pagar' => ['to pay', 'verb', 'Regular -ar infinitive.'],
            'tarjeta' => ['card', 'noun', 'Feminine singular.'],
            'todo' => ['everything', 'pronoun', 'Neuter-style pronoun meaning "all of it".'],
            'estuvo' => ['was', 'verb', 'Root: estar. 3rd person singular preterite.'],
            'delicioso' => ['delicious', 'adjective', 'Masculine singular; agrees with "todo".'],
            'gracias' => ['thank you', 'interjection', 'Plural noun used as a fixed phrase.'],
            'está' => ['is', 'verb', 'Root: estar. 3rd person singular present; used for states and location.'],
            'muy' => ['very', 'adverb', 'Intensifier placed before adjectives and adverbs.'],
            'rico' => ['tasty', 'adjective', 'Masculine singular; "rico" also means "rich".'],
            'estación' => ['station', 'noun', 'Feminine singular; plural "estaciones".'],
            'llego' => ['I arrive', 'verb', 'Root: llegar. 1st person singular present.'],
            'al' => ['to the', 'preposition', 'Contraction of "a" + "el".'],
            'aeropuerto' => ['airport', 'noun', 'Masculine singular.'],
            'gire' => ['turn', 'verb', 'Root: girar. Formal (usted) command.'],
            'a' => ['to', 'preposition', 'Indicates direction.'],
            'derecha' => ['right', 'noun', 'Feminine singular; "a la derecha" = to the right.'],
            'siga' => ['continue', 'verb', 'Root: seguir. Formal (usted) command.'],
            'recto' => ['straight', 'adverb', '"Todo recto" = straight ahead.'],
            'cerca' => ['near', 'adverb', 'Often followed by "de".'],
            'aquí' => ['here', 'adverb', 'Place adverb; carries a written accent.'],
            'reserva' => ['reservation', 'noun', 'Feminine singular.'],
            'hora' => ['time / hour', 'noun', 'Feminine singular.'],
            'desayuno' => ['breakfast', 'noun', 'Masculine singular.'],
            'necesito' => ['I need', 'verb', 'Root: necesitar. 1st person singular present.'],
            'habitación' => ['room', 'noun', 'Feminine singular; plural "habitaciones".'],
            'hay' => ['there is / are', 'verb', 'Root: haber. Impersonal form; singular and plural.'],
            'wifi' => ['Wi-Fi', 'noun', 'Loanword; masculine in common use.'],
            'gratis' => ['free', 'adjective', 'Invariable; can also act as an adverb.'],
            'mi' => ['my', 'adjective', 'Possessive; no accent when it means "my".'],
            'llave' => ['key', 'noun', 'Feminine singular.'],
            'no' => ['not / no', 'adverb', 'Placed directly before the verb to negate.'],
            'funciona' => ['works', 'verb', 'Root: funcionar. 3rd person singular present.'],
        ];
    }

    /** Learning structure: modules → sections → [spanish, english] sentences. */
    public static function modules(): array
    {
        return [
            [
                'title' => 'Modul 1: Perkenalan dengan Orang Lain',
                'description' => 'Belajar memperkenalkan diri dan bertanya nama, asal, serta umur.',
                'difficulty' => 'beginner',
                'sections' => [
                    [
                        'title' => 'Section 1: Berkenalan dengan orang lebih tua',
                        'description' => 'Bahasa formal dengan "usted".',
                        'category' => 'Presentaciones formales',
                        'sentences' => [
                            ['Mucho gusto en conocerle.', 'Nice to meet you.'],
                            ['¿Cómo se llama usted?', 'What is your name?'],
                            ['Me llamo Ana.', 'My name is Ana.'],
                            ['Es un placer conocerlo.', 'It is a pleasure to meet you.'],
                            ['¿De dónde es usted?', 'Where are you from?'],
                            ['Soy de Indonesia.', 'I am from Indonesia.'],
                        ],
                    ],
                    [
                        'title' => 'Section 2: Berkenalan dengan orang lebih muda',
                        'description' => 'Bahasa santai dengan "tú".',
                        'category' => 'Presentaciones informales',
                        'sentences' => [
                            ['¡Hola! ¿Cómo te llamas?', 'Hi! What is your name?'],
                            ['¿Cuántos años tienes?', 'How old are you?'],
                            ['Tengo veinte años.', 'I am twenty years old.'],
                            ['¿De dónde eres?', 'Where are you from?'],
                            ['Encantado de conocerte.', 'Delighted to meet you.'],
                        ],
                    ],
                ],
            ],
            [
                'title' => 'Modul 2: Di Restoran dan Kafe',
                'description' => 'Memesan makanan dan membayar di restoran.',
                'difficulty' => 'beginner',
                'sections' => [
                    [
                        'title' => 'Section 1: Memesan makanan dan minuman',
                        'description' => 'Frasa sopan untuk memesan.',
                        'category' => 'Restaurante',
                        'sentences' => [
                            ['Quisiera una mesa para dos.', 'I would like a table for two.'],
                            ['¿Qué me recomienda?', 'What do you recommend?'],
                            ['Quiero un café con leche.', 'I want a coffee with milk.'],
                            ['La carta, por favor.', 'The menu, please.'],
                            ['Tengo hambre.', 'I am hungry.'],
                        ],
                    ],
                    [
                        'title' => 'Section 2: Membayar tagihan',
                        'description' => 'Menanyakan harga dan membayar.',
                        'category' => 'Pagos',
                        'sentences' => [
                            ['La cuenta, por favor.', 'The check, please.'],
                            ['¿Cuánto cuesta?', 'How much does it cost?'],
                            ['¿Puedo pagar con tarjeta?', 'Can I pay by card?'],
                            ['Todo estuvo delicioso.', 'Everything was delicious.'],
                            ['Gracias, está muy rico.', 'Thank you, it is very tasty.'],
                        ],
                    ],
                ],
            ],
            [
                'title' => 'Modul 3: Bepergian dan Menginap',
                'description' => 'Bertanya arah dan berkomunikasi di hotel.',
                'difficulty' => 'intermediate',
                'sections' => [
                    [
                        'title' => 'Section 1: Bertanya arah',
                        'description' => 'Menemukan tempat di kota.',
                        'category' => 'Direcciones',
                        'sentences' => [
                            ['¿Dónde está la estación?', 'Where is the station?'],
                            ['¿Cómo llego al aeropuerto?', 'How do I get to the airport?'],
                            ['Gire a la derecha.', 'Turn right.'],
                            ['Siga todo recto.', 'Keep going straight.'],
                            ['Está cerca de aquí.', 'It is near here.'],
                        ],
                    ],
                    [
                        'title' => 'Section 2: Di hotel',
                        'description' => 'Check-in dan kebutuhan selama menginap.',
                        'category' => 'Hotel',
                        'sentences' => [
                            ['Tengo una reserva.', 'I have a reservation.'],
                            ['¿A qué hora es el desayuno?', 'What time is breakfast?'],
                            ['Necesito una habitación.', 'I need a room.'],
                            ['¿Hay wifi gratis?', 'Is there free Wi-Fi?'],
                            ['Mi llave no funciona.', 'My key does not work.'],
                        ],
                    ],
                ],
            ],
        ];
    }

    /** [spanish, english, author] */
    public static function quotes(): array
    {
        return [
            ['Poco a poco se va lejos.', 'Little by little, one goes far.', 'Proverbio'],
            ['Quien la sigue, la consigue.', 'Whoever keeps at it, gets it.', 'Proverbio'],
            ['Querer es poder.', 'Where there is a will, there is a way.', 'Proverbio'],
            ['Al mal tiempo, buena cara.', 'Face hard times with a smile.', 'Proverbio'],
            ['La práctica hace al maestro.', 'Practice makes the master.', 'Proverbio'],
            ['Nunca es tarde para aprender.', 'It is never too late to learn.', null],
            ['Caminante, no hay camino, se hace camino al andar.', 'Traveler, there is no path; the path is made by walking.', 'Antonio Machado'],
            ['Lo que no te mata, te hace más fuerte.', 'What does not kill you makes you stronger.', null],
            ['Más vale tarde que nunca.', 'Better late than never.', 'Proverbio'],
            ['El que persevera, alcanza.', 'He who perseveres, achieves.', 'Proverbio'],
        ];
    }

    /** Flattened [spanish, english, category, difficulty] for random factory picks. */
    public static function allSentences(): array
    {
        $out = [];
        foreach (self::modules() as $module) {
            foreach ($module['sections'] as $section) {
                foreach ($section['sentences'] as [$es, $en]) {
                    $out[] = [$es, $en, $section['category'], $module['difficulty']];
                }
            }
        }

        return $out;
    }

    /**
     * Build ordered word breakdown rows for a Spanish sentence using the lexicon.
     *
     * @return array<int, array<string, mixed>>
     */
    public static function breakdownFor(string $sentence): array
    {
        $lexicon = self::lexicon();
        $rows = [];
        $tokens = preg_split('/[\s,.;:!?¿¡]+/u', $sentence, -1, PREG_SPLIT_NO_EMPTY);

        foreach ($tokens as $i => $token) {
            $entry = $lexicon[mb_strtolower($token)]
                ?? throw new \RuntimeException("Word \"{$token}\" is missing from the SpanishCatalog lexicon.");

            $rows[] = [
                'word' => $token,
                'literal_translation' => $entry[0],
                'part_of_speech' => $entry[1],
                'grammar_notes' => $entry[2],
                'order_index' => $i,
            ];
        }

        return $rows;
    }
}
