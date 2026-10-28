<?php

namespace Database\Factories;

use App\Models\MotivationalQuote;
use Database\Seeders\Support\SpanishCatalog;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<MotivationalQuote> */
class MotivationalQuoteFactory extends Factory
{
    public function definition(): array
    {
        [$es, $en, $author] = fake()->randomElement(SpanishCatalog::quotes());

        return [
            'quote_spanish' => $es,
            'quote_translation' => $en,
            'author' => $author,
            'is_active' => true,
        ];
    }

    public function inactive(): static
    {
        return $this->state(['is_active' => false]);
    }
}
