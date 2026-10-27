<?php

namespace App\Http\Resources;

use App\Support\B2;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CosrentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $city = $this->city;
        $province = $city?->province;
        $avatar = $this->user?->avatar;

        return [
            'id' => $this->id,
            'nama' => $this->shop_name,
            'username' => $this->user?->username ?? '-',
            'kota' => $city ? $city->name . ', ' . ($province?->name ?? '') : '',
            'cityId' => $this->city_id,
            'post' => $this->costumes_count ?? $this->costumes()->count(),
            'online' => 'Online',
            'foto' => $avatar ? (B2::url($avatar) ?? '') : '',
            'deskripsi' => $this->bio ?? '',
            'rating' => 0,
            'ulasanCount' => 0,
            'pengikut' => 0,
            'tokoDibuka' => $this->created_at?->format('m/Y') ?? '-',
            'jamOperasional' => '-',
            'terverifikasi' => (bool) $this->is_verified,
            'instagram' => $this->instagram,
            'whatsapp' => $this->whatsapp,
            'review' => [],
        ];
    }
}
