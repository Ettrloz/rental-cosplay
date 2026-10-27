<?php

use App\Models\User;

test('guests are redirected to login from shop profile', function () {
    $this->get(route('dashboard.profil'))->assertRedirect(route('login'));
});

test('user biasa is redirected to account page from shop profile', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('dashboard.profil'))
        ->assertRedirect(route('dashboard.akun'));
});

test('updating shop profile creates a cosrent profile', function () {
    $user = perental();

    $this->actingAs($user)->put(route('dashboard.profil.update'), [
        'shop_name' => 'Ebi Cosrent',
        'whatsapp' => '08123456789',
        'instagram' => '@ebicosrent',
    ])->assertRedirect();

    $profile = $user->fresh()->cosrentProfile;

    expect($profile)->not->toBeNull()
        ->and($profile->shop_name)->toBe('Ebi Cosrent')
        ->and($profile->whatsapp)->toBe('08123456789')
        ->and($profile->instagram)->toBe('@ebicosrent')
        ->and($user->fresh()->role)->toBe('cosrent');
});

test('shop name is required', function () {
    $user = perental();

    $this->actingAs($user)
        ->put(route('dashboard.profil.update'), ['shop_name' => ''])
        ->assertSessionHasErrors('shop_name');
});
