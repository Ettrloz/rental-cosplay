<?php

use App\Models\CosrentProfile;
use App\Models\Costume;
use App\Models\User;

test('guests cannot delete an account', function () {
    $this->delete(route('dashboard.akun.destroy'), ['password' => 'password'])
        ->assertRedirect(route('login'));
});

test('account is not deleted when the password is wrong', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->delete(route('dashboard.akun.destroy'), ['password' => 'salah'])
        ->assertSessionHasErrors('password');

    expect($user->fresh())->not->toBeNull();
});

test('account and its related records are deleted with the correct password', function () {
    $user = perental();
    $costume = buatCostume($user);
    $profileId = $costume->cosrent_profile_id;

    $this->actingAs($user)
        ->delete(route('dashboard.akun.destroy'), ['password' => 'password'])
        ->assertRedirect('/');

    $this->assertGuest();

    expect(User::find($user->id))->toBeNull()
        ->and(CosrentProfile::find($profileId))->toBeNull()
        ->and(Costume::find($costume->id))->toBeNull();
});
