<?php

namespace App\Models;

use Database\Factories\MotivationalQuoteFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MotivationalQuote extends Model
{
    /** @use HasFactory<MotivationalQuoteFactory> */
    use HasFactory;

    protected $guarded = [];

    protected function casts(): array
    {
        return ['is_active' => 'boolean'];
    }
}
