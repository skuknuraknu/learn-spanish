<?php

namespace App\Models;

use Database\Factories\LearningSectionFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LearningSection extends Model
{
    /** @use HasFactory<LearningSectionFactory> */
    use HasFactory;

    protected $guarded = [];

    public function module(): BelongsTo
    {
        return $this->belongsTo(LearningModule::class, 'learning_module_id');
    }

    public function sentences(): HasMany
    {
        return $this->hasMany(Sentence::class)->orderBy('order_index');
    }

    public function quizQuestions(): HasMany
    {
        return $this->hasMany(QuizQuestion::class)->orderBy('order_index');
    }
}
