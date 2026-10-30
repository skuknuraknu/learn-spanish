<?php

namespace Database\Seeders;

use App\Models\LearningModule;
use App\Models\LearningSection;
use App\Models\QuizQuestion;
use App\Models\Sentence;
use App\Models\WordBreakdown;
use Database\Seeders\Support\AdvancedCatalog;
use Database\Seeders\Support\SpanishCatalog;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use RuntimeException;

/**
 * Seeds modules 4-13 (upper beginner → advanced) with sections, sentences,
 * word breakdowns and tricky multiple-choice questions.
 *
 * Idempotent: safe to run on an existing database without touching modules 1-3
 *   php artisan db:seed --class=AdvancedModulesSeeder
 */
class AdvancedModulesSeeder extends Seeder
{
    private const FIRST_ORDER = 4;

    public function run(): void
    {
        DB::transaction(function () {
            foreach (AdvancedCatalog::modules() as $mi => $moduleData) {
                $module = LearningModule::firstOrCreate(
                    ['title' => $moduleData['title']],
                    [
                        'description' => $moduleData['description'],
                        'difficulty_level' => $moduleData['difficulty'],
                        'order_index' => self::FIRST_ORDER + $mi,
                    ],
                );

                foreach ($moduleData['sections'] as $si => $sectionData) {
                    $section = LearningSection::firstOrCreate(
                        ['learning_module_id' => $module->id, 'title' => $sectionData['title']],
                        ['description' => $sectionData['description'], 'order_index' => $si + 1],
                    );

                    $sentences = $this->seedSentences($section, $sectionData, $moduleData['difficulty']);
                    $this->seedQuestions($section, $sectionData, $sentences);
                }
            }
        });
    }

    /** @return array<int, Sentence> indexed like the catalog's sentence list */
    private function seedSentences(LearningSection $section, array $sectionData, string $difficulty): array
    {
        $result = [];

        foreach ($sectionData['sentences'] as $ni => [$es, $en]) {
            $sentence = Sentence::firstOrCreate(
                ['learning_section_id' => $section->id, 'spanish_text' => $es],
                [
                    'translation' => $en,
                    'difficulty_level' => $difficulty,
                    'category' => $sectionData['category'],
                    'order_index' => $ni + 1,
                ],
            );

            if ($sentence->wasRecentlyCreated) {
                foreach (SpanishCatalog::breakdownFor($es) as $row) {
                    WordBreakdown::create($row + ['sentence_id' => $sentence->id]);
                }
            }

            $result[$ni] = $sentence;
        }

        return $result;
    }

    private function seedQuestions(LearningSection $section, array $sectionData, array $sentences): void
    {
        foreach ($sectionData['questions'] as $qi => [$sentenceIndex, $prompt, $stem, $choices, $correct, $explanation]) {
            if (! in_array($correct, $choices, true)) {
                throw new RuntimeException("Correct answer \"{$correct}\" is not among the choices for: {$stem}");
            }

            QuizQuestion::firstOrCreate(
                ['learning_section_id' => $section->id, 'question_text' => $stem],
                [
                    'sentence_id' => $sentences[$sentenceIndex]->id,
                    'prompt' => $prompt,
                    'choices' => $choices,
                    'correct_answer' => $correct,
                    'explanation' => $explanation,
                    'order_index' => $qi + 1,
                ],
            );
        }
    }
}
