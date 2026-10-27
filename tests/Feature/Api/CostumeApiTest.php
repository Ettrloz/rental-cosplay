<?php

use App\Models\CosrentProfile;
use App\Models\Costume;
use App\Models\User;

test('costume detail endpoint exposes rental contact', function () {
    $user = User::factory()->create();
    $profile = CosrentProfile::create([
        'user_id' => $user->id,
        'shop_name' => 'Ebi Cosrent',
        'whatsapp' => '08123456789',
        'instagram' => 'ebi',
    ]);

    Costume::create([
        'cosrent_profile_id' => $profile->id,
        'title' => 'Silver Wolf',
        'slug' => 'silver-wolf',
        'price' => 250000,
        'rental_days' => 3,
        'gender' => 'wanita',
        'status' => 'available',
    ]);

    $this->getJson('/api/costumes/silver-wolf')
        ->assertOk()
        ->assertJsonPath('data.slug', 'silver-wolf')
        ->assertJsonPath('data.whatsapp', '08123456789')
        ->assertJsonPath('data.instagram', 'ebi')
        ->assertJsonPath('data.pemilik', 'Ebi Cosrent');
});

test('costume detail endpoint returns 404 for unknown slug', function () {
    $this->getJson('/api/costumes/tidak-ada')->assertNotFound();
});
