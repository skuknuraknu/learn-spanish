<?php

namespace App\Models;

use Database\Factories\WordBreakdownFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WordBreakdown extends Model
{
    /** @use HasFactory<WordBreakdownFactory> */
    use HasFactory;

    protected $guarded = [];

    public function sentence(): BelongsTo
    {
        return $this->belongsTo(Sentence::class);
    }
}
