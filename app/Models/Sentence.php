<?php

namespace App\Models;

use Database\Factories\SentenceFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Sentence extends Model
{
    /** @use HasFactory<SentenceFactory> */
    use HasFactory;

    protected $guarded = [];

    public function section(): BelongsTo
    {
        return $this->belongsTo(LearningSection::class, 'learning_section_id');
    }

    public function words(): HasMany
    {
        return $this->hasMany(WordBreakdown::class)->orderBy('order_index');
    }
}
