<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class ForumThread extends Model
{
    protected $fillable = [
        'user_id',
        'category',
        'title',
        'slug',
        'body',
        'image',
        'views',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(ForumComment::class);
    }

    public function votes(): MorphMany
    {
        return $this->morphMany(ForumVote::class, 'votable');
    }

    public function bookmarks(): HasMany
    {
        return $this->hasMany(ForumBookmark::class);
    }
}
