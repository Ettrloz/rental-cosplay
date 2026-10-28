<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = [
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
}
