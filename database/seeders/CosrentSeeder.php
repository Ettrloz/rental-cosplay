<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\CosrentProfile;
use App\Models\User;
use Illuminate\Database\Seeder;

class CosrentSeeder extends Seeder
{
    public function run(): void
    {
        $shops = [
            ['username' => 'ebi.cosrent', 'shop_name' => 'Ebi Cosplay Rental', 'city' => 'Bogor', 'instagram' => 'ebi.cosrent'],
            ['username' => 'bluevcos', 'shop_name' => 'Bluevcos', 'city' => 'Surabaya', 'instagram' => 'bluevcos'],
            ['username' => 'puchipocharent', 'shop_name' => 'PuchiPochaRent', 'city' => 'Jakarta Barat', 'instagram' => 'puchipocharent'],
            ['username' => 'howly.rent', 'shop_name' => 'Howly Rent', 'city' => 'Tangerang Selatan', 'instagram' => 'howly.rent'],
        ];

        foreach ($shops as $shop) {
            $user = User::firstOrCreate(
                ['email' => $shop['username'] . '@example.com'],
                [
                    'name' => $shop['shop_name'],
                    'username' => $shop['username'],
                    'password' => 'password',
                    'role' => 'cosrent',
                ]
            );

            CosrentProfile::firstOrCreate(
                ['user_id' => $user->id],
                [
                    'city_id' => City::where('name', $shop['city'])->value('id'),
                    'shop_name' => $shop['shop_name'],
                    'instagram' => $shop['instagram'],
                    'is_verified' => true,
                ]
            );
        }
    }
}
