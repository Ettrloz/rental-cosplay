<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Event extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'starts_on',
        'date_label',
        'organizer',
        'location',
        'venue',
        'time_label',
        'price_label',
        'description',
        'image',
    ];

    protected function casts(): array
    {
        return ['starts_on' => 'date'];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
