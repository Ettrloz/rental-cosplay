<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ForumCommentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $user = $request->user();

        return [
            'id' => $this->id,
            'teks' => $this->body,
            'penulis' => $this->user?->username ?: ($this->user?->name ?? 'Anonim'),
            'userId' => $this->user_id,
            'waktu' => $this->created_at?->locale('id')->diffForHumans(short: true),
            'skor' => (int) ($this->votes_sum_value ?? 0),
            'vote' => $user
                ? ((int) $this->votes()->where('user_id', $user->id)->value('value') ?: null)
                : null,
        ];
    }
}
