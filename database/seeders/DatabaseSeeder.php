<?php

namespace Database\Seeders;

use App\Models\LearningModule;
use App\Models\LearningSection;
use App\Models\MotivationalQuote;
use App\Models\Sentence;
use App\Models\User;
use App\Models\UserSentenceProgress;
use Database\Seeders\Support\SpanishCatalog;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Marquee quotes: one row per curated quote.
        foreach (SpanishCatalog::quotes() as [$es, $en, $author]) {
            MotivationalQuote::factory()->create([
                'quote_spanish' => $es,
                'quote_translation' => $en,
                'author' => $author,
            ]);
        }

        // Modules → sections → sentences → word breakdowns.
        foreach (SpanishCatalog::modules() as $mi => $moduleData) {
            $module = LearningModule::factory()->create([
                'title' => $moduleData['title'],
                'description' => $moduleData['description'],
                'difficulty_level' => $moduleData['difficulty'],
                'order_index' => $mi + 1,
            ]);

            foreach ($moduleData['sections'] as $si => $sectionData) {
                $section = LearningSection::factory()->for($module, 'module')->create([
                    'title' => $sectionData['title'],
                    'description' => $sectionData['description'],
                    'order_index' => $si + 1,
                ]);

                foreach ($sectionData['sentences'] as $ni => [$es, $en]) {
                    Sentence::factory()->withBreakdown()->create([
                        'learning_section_id' => $section->id,
                        'spanish_text' => $es,
                        'translation' => $en,
                        'category' => $sectionData['category'],
                        'difficulty_level' => $moduleData['difficulty'],
                        'order_index' => $ni + 1,
                    ]);
                }
            }
        }

        // Modules 4-13 (upper beginner → advanced) with tricky quiz questions.
        $this->call(AdvancedModulesSeeder::class);

        // Demo progress: Modul 1 / Section 1 mastered, Section 2 in progress, reviewed 3 days in a row.
        $sentences = Sentence::orderBy('learning_section_id')->orderBy('order_index')->get();
        foreach ($sentences->take(8) as $i => $sentence) {
            UserSentenceProgress::create([
                'user_id' => $user->id,
                'sentence_id' => $sentence->id,
                'status' => $i < 6 ? 'mastered' : 'learning',
                'review_count' => $i < 6 ? 3 : 1,
                'last_reviewed_at' => now()->subDays($i % 3),
            ]);
        }
    }
}
