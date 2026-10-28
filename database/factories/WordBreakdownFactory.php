<?php

namespace Database\Factories;

use App\Models\Sentence;
use App\Models\WordBreakdown;
use Database\Seeders\Support\SpanishCatalog;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<WordBreakdown> */
class WordBreakdownFactory extends Factory
{
    public function definition(): array
    {
        $word = fake()->randomElement(array_keys(SpanishCatalog::lexicon()));
        [$literal, $pos, $notes] = SpanishCatalog::lexicon()[$word];

        return [
            'sentence_id' => Sentence::factory(),
            'word' => $word,
            'literal_translation' => $literal,
            'part_of_speech' => $pos,
            'grammar_notes' => $notes,
            'order_index' => 0,
        ];
    }
}
