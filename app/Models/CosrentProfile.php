<?php

namespace App\Models;

use App\Models\Costume;
use App\Models\City;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CosrentProfile extends Model
{
    protected $fillable = [
        'user_id',
        'city_id',
        'shop_name',
        'bio',
        'thumbnail',
        'rental_rules',
        'rental_rules_image',
        'instagram',
        'whatsapp',
        'is_verified',
    ];

    protected function casts(): array
    {
        return [
            'is_verified' => 'boolean',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function costumes(): HasMany
    {
        return $this->hasMany(Costume::class);
    }
}
