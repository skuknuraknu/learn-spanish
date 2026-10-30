<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // Curated multiple-choice questions with deliberately similar ("tricky") options.
        Schema::create('quiz_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('learning_section_id')->constrained('learning_sections')->cascadeOnDelete();
            // The sentence this question exercises, so quiz results can update user_sentence_progress.
            $table->foreignId('sentence_id')->constrained('sentences')->cascadeOnDelete();
            $table->string('prompt');              // e.g. "Choose the correct verb form."
            $table->text('question_text');         // the stem, e.g. "Yo ___ a las siete."
            $table->json('choices');               // array of option strings (similar on purpose)
            $table->string('correct_answer');      // must equal one of the choices
            $table->text('explanation')->nullable();
            $table->unsignedInteger('order_index')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quiz_questions');
    }
};
