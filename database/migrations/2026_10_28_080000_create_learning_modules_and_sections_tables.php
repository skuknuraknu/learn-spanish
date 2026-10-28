<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('learning_modules', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // e.g. "Modul 1: Perkenalan dengan Orang Lain"
            $table->text('description')->nullable();
            $table->string('difficulty_level')->default('beginner');
            $table->unsignedInteger('order_index')->default(0);
            $table->timestamps();
        });

        Schema::create('learning_sections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('learning_module_id')->constrained('learning_modules')->cascadeOnDelete();
            $table->string('title'); // e.g. "Section 1: Berkenalan dengan orang lebih tua"
            $table->text('description')->nullable();
            $table->unsignedInteger('order_index')->default(0);
            $table->timestamps();
        });

        Schema::table('sentences', function (Blueprint $table) {
            $table->foreignId('learning_section_id')->nullable()->after('id')
                ->constrained('learning_sections')->nullOnDelete();
            $table->unsignedInteger('order_index')->default(0)->after('audio_url');
        });
    }

    public function down(): void
    {
        Schema::table('sentences', function (Blueprint $table) {
            $table->dropConstrainedForeignId('learning_section_id');
            $table->dropColumn('order_index');
        });

        Schema::dropIfExists('learning_sections');
        Schema::dropIfExists('learning_modules');
    }
};
