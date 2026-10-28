<?php

namespace Database\Factories;

use App\Models\LearningModule;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<LearningModule> */
class LearningModuleFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => 'Modul '.fake()->numberBetween(1, 20).': '.fake()->words(3, true),
            'description' => fake()->sentence(),
            'difficulty_level' => fake()->randomElement(['beginner', 'intermediate', 'advanced']),
            'order_index' => 0,
        ];
    }
}
