<?php

namespace Database\Factories;

use App\Models\LearningModule;
use App\Models\LearningSection;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<LearningSection> */
class LearningSectionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'learning_module_id' => LearningModule::factory(),
            'title' => 'Section '.fake()->numberBetween(1, 5).': '.fake()->words(3, true),
            'description' => fake()->sentence(),
            'order_index' => 0,
        ];
    }
}
