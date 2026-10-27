<?php

namespace App\Http\Resources;

use App\Support\B2;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class CostumeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $city = $this->city;
        $province = $city?->province;
        $profile = $this->cosrentProfile;

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'judul' => $this->title,
            'harga' => $this->price,
            'rentalDays' => $this->rental_days,
            'brand' => $this->brand ?? '-',
            'series' => $this->series ?? '-',
            'karakter' => $this->character ?? '-',
            'ukuran' => $this->size ?? 'All Size',
            'ld' => $this->chest ?? '-',
            'lp' => $this->waist ?? '-',
            'gender' => ucfirst($this->gender),
            'deskripsi' => $this->description,
            'status' => $this->status,
            'kota' => $city ? $city->name.', '.($province?->name ?? '') : '',
            'cityId' => $this->city_id,
            'pemilik' => $profile?->shop_name ?? '-',
            'username' => $profile?->user?->username ?? '-',
            'whatsapp' => $profile?->whatsapp,
            'instagram' => $profile?->instagram,
            'dilihat' => $this->views,
            'gambar' => $this->images
                ->map(fn ($image) => B2::url($image->path))
                ->filter()
                ->values(),
            'rental_rules' => $profile?->rental_rules,
            'rental_rules_image' => $profile?->rental_rules_image
                ? Storage::disk('public')->url($profile->rental_rules_image)
                : null,
        ];
    }
}
