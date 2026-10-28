<?php

namespace App\Http\Resources;

use App\Support\B2;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $gambar = $this->image;

        if ($gambar && ! str_starts_with($gambar, 'http')) {
            $gambar = B2::url($gambar) ?? '';
        }

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'judul' => $this->title,
            'tanggal' => $this->date_label,
            'penyelenggara' => $this->organizer,
            'lokasi' => $this->location,
            'venue' => $this->venue ?? '-',
            'jam' => $this->time_label ?? '-',
            'harga' => $this->price_label ?? '-',
            'isi' => $this->description ?? '',
            'gambar' => $gambar ?? '',
            'komentar' => [],
        ];
    }
}
