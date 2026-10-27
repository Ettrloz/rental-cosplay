<?php

namespace Database\Seeders;

use App\Models\CosrentProfile;
use App\Models\Costume;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CostumeSeeder extends Seeder
{
    public function run(): void
    {
        $costumes = [
            ['shop' => 'ebi.cosrent', 'title' => 'Silver Wolf Lv.999 Honkai Star Rail', 'price' => 250000, 'brand' => 'Monenjoy', 'series' => 'Honkai: Star Rail', 'character' => 'Silver Wolf', 'gender' => 'wanita', 'size' => 'S', 'chest' => '80-85', 'waist' => '75', 'views' => 320],
            ['shop' => 'bluevcos', 'title' => 'Rental Cosplay Ren Amamiya Persona 5', 'price' => 135000, 'brand' => 'Holoun', 'series' => 'Persona', 'character' => 'Ren Amamiya', 'gender' => 'pria', 'size' => 'S - M', 'chest' => '87-90', 'waist' => '71-74', 'views' => 280],
            ['shop' => 'howly.rent', 'title' => 'Kostum Black Cat Marvel Felicia Hardy', 'price' => 85000, 'brand' => 'Maker Lokal', 'series' => 'Marvel', 'character' => 'Felicia Hardy', 'gender' => 'wanita', 'size' => 'XL - XXL', 'chest' => '96-104', 'waist' => '84-91', 'views' => 210],
            ['shop' => 'howly.rent', 'title' => 'Kostum Silk Spider Marvel', 'price' => 100000, 'brand' => 'No Brand / Freebrand', 'series' => 'Marvel', 'character' => 'Spider Woman', 'gender' => 'wanita', 'size' => 'M - L', 'chest' => '88-92', 'waist' => '70-74', 'views' => 190],
            ['shop' => 'ebi.cosrent', 'title' => 'Rental Kostum Dazai Osamu', 'price' => 75000, 'brand' => 'Wudu', 'series' => 'Bungou Stray Dogs', 'character' => 'Osamu Dazai', 'gender' => 'pria', 'size' => 'M', 'chest' => '90-94', 'waist' => '74-78', 'views' => 170],
            ['shop' => 'bluevcos', 'title' => 'Selena Gothic Cursed ver. Elite Skin', 'price' => 80000, 'brand' => 'Maker Lokal', 'series' => 'Mobile Legends: Bang Bang', 'character' => 'Selena', 'gender' => 'wanita', 'size' => 'S - M', 'chest' => '82-88', 'waist' => '66-72', 'views' => 150],
        ];

        foreach ($costumes as $item) {
            $profile = CosrentProfile::whereHas('user', fn ($q) => $q->where('username', $item['shop']))->first();

            if (! $profile) {
                continue;
            }

            Costume::firstOrCreate(
                ['slug' => Str::slug($item['title'])],
                [
                    'cosrent_profile_id' => $profile->id,
                    'city_id' => $profile->city_id,
                    'title' => $item['title'],
                    'price' => $item['price'],
                    'rental_days' => 3,
                    'brand' => $item['brand'],
                    'series' => $item['series'],
                    'character' => $item['character'],
                    'gender' => $item['gender'],
                    'size' => $item['size'],
                    'chest' => $item['chest'],
                    'waist' => $item['waist'],
                    'status' => 'available',
                    'views' => $item['views'],
                ]
            );
        }
    }
}
