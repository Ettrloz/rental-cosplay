<?php

namespace App\Models;

use App\Models\Costume;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Favorite extends Model
{
    protected $fillable = [
        'user_id',
        'costume_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function costume(): BelongsTo
    {
        return $this->belongsTo(Costume::class);
    }
}
