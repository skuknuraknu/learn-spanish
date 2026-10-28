<?php

namespace App\Models;

use Database\Factories\LearningModuleFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LearningModule extends Model
{
    /** @use HasFactory<LearningModuleFactory> */
    use HasFactory;

    protected $guarded = [];

    public function sections(): HasMany
    {
        return $this->hasMany(LearningSection::class)->orderBy('order_index');
    }
}
