<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserSentenceProgress extends Model
{
    protected $table = 'user_sentence_progress';

    protected $guarded = [];

    protected function casts(): array
    {
        return ['last_reviewed_at' => 'datetime'];
    }

    public function sentence(): BelongsTo
    {
        return $this->belongsTo(Sentence::class);
    }
}
