<?php

namespace App\Models;
use App\Models\Costume;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CostumeImage extends Model
{
    protected $fillable = [
        'costume_id',
        'path',
        'sort_order',
    ];

    public function costume(): BelongsTo
    {
        return $this->belongsTo(Costume::class);
    }
}
