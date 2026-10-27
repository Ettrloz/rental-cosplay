<?php

namespace App\Models;

use App\Models\City;
use App\Models\CosrentProfile;
use App\Models\CostumeImage;
use App\Models\Favorite;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Costume extends Model
{
    protected $fillable = [
        'cosrent_profile_id',
        'city_id',
        'title',
        'slug',
        'price',
        'rental_days',
        'brand',
        'series',
        'character',
        'gender',
        'size',
        'chest',
        'waist',
        'description',
        'status',
        'views',
    ];

    public function cosrentProfile(): BelongsTo
    {
        return $this->belongsTo(CosrentProfile::class);
    }

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(CostumeImage::class)->orderBy('sort_order');
    }

    public function favorites(): HasMany
    {
        return $this->hasMany(Favorite::class);
    }
}
