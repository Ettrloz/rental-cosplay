<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class ForumComment extends Model
{
    protected $fillable = [
        'forum_thread_id',
        'user_id',
        'body',
    ];

    public function thread(): BelongsTo
    {
        return $this->belongsTo(ForumThread::class, 'forum_thread_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function votes(): MorphMany
    {
        return $this->morphMany(ForumVote::class, 'votable');
    }
}
