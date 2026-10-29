<?php

namespace App\Http\Resources;

use App\Support\B2;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ForumThreadResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $user = $request->user();

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'judul' => $this->title,
            'kategori' => $this->category,
            'isi' => $this->body,
            'gambar' => $this->image ? B2::url($this->image) : null,
            'penulis' => $this->user?->username ?: ($this->user?->name ?? 'Anonim'),
            'userId' => $this->user_id,
            'waktu' => $this->created_at?->locale('id')->diffForHumans(short: true),
            'dilihat' => (int) $this->views,
            'balasan' => (int) ($this->comments_count ?? 0),
            'skor' => (int) ($this->votes_sum_value ?? 0),
            'vote' => $user
                ? ((int) $this->votes()->where('user_id', $user->id)->value('value') ?: null)
                : null,
            'disimpan' => $user
                ? $this->bookmarks()->where('user_id', $user->id)->exists()
                : false,
        ];
    }
}
