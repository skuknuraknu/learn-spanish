<?php

namespace Database\Factories;

use App\Models\Sentence;
use Database\Seeders\Support\SpanishCatalog;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<Sentence> */
class SentenceFactory extends Factory
{
    public function definition(): array
    {
        [$es, $en, $category, $difficulty] = fake()->randomElement(SpanishCatalog::allSentences());

        return [
            'spanish_text' => $es,
            'translation' => $en,
            'difficulty_level' => $difficulty,
            'category' => $category,
            'audio_url' => null,
            'order_index' => 0,
        ];
    }

    /** Create the per-word breakdown rows from the lexicon after the sentence is created. */
    public function withBreakdown(): static
    {
        return $this->afterCreating(function (Sentence $sentence) {
            $sentence->words()->createMany(SpanishCatalog::breakdownFor($sentence->spanish_text));
        });
    }
}
