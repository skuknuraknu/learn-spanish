<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QuizQuestion extends Model
{
    protected $guarded = [];

    protected function casts(): array
    {
        return ['choices' => 'array'];
    }

    public function section(): BelongsTo
    {
        return $this->belongsTo(LearningSection::class, 'learning_section_id');
    }

    public function sentence(): BelongsTo
    {
        return $this->belongsTo(Sentence::class);
    }
}
