<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Tabel Sentences (Kalimat Utama Pembelajaran)
        Schema::create('sentences', function (Blueprint $table) {
            $table->id();
            $table->text('spanish_text');
            $table->text('translation');
            $table->string('difficulty_level')->default('beginner'); // beginner, intermediate, advanced
            $table->string('category')->nullable(); // Grammar, Travel, Daily, etc.
            $table->string('audio_url')->nullable();
            $table->timestamps();
        });

        // 2. Tabel Word Breakdowns (Breakdown Per Kata dari Kalimat)
        Schema::create('word_breakdowns', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sentence_id')->constrained('sentences')->onDelete('cascade');
            $table->string('word');
            $table->string('literal_translation');
            $table->string('part_of_speech'); // noun, verb, adjective, preposition, pronoun, etc.
            $table->text('grammar_notes')->nullable(); // Penjelasan konjugasi, gender, atau akar kata
            $table->integer('order_index')->default(0); // Posisi urutan kata dalam kalimat
            $table->timestamps();
        });

        // 3. Tabel Motivational Quotes (Untuk Marquee di Bagian Atas)
        Schema::create('motivational_quotes', function (Blueprint $table) {
            $table->id();
            $table->text('quote_spanish');
            $table->text('quote_translation');
            $table->string('author')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 4. Tabel User Progress (Opsional: Melacak status belajar kalimat per user)
        Schema::create('user_sentence_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('sentence_id')->constrained('sentences')->onDelete('cascade');
            $table->enum('status', ['new', 'learning', 'mastered'])->default('new');
            $table->integer('review_count')->default(0);
            $table->timestamp('last_reviewed_at')->nullable();
            $table->timestamps();

            // Mencegah duplikasi data progress per user & kalimat yang sama
            $table->unique(['user_id', 'sentence_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_sentence_progress');
        Schema::dropIfExists('motivational_quotes');
        Schema::dropIfExists('word_breakdowns');
        Schema::dropIfExists('sentences');
    }
};
