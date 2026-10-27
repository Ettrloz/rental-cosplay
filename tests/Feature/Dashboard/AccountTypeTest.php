<?php

use App\Models\User;

test('guests are redirected to login from account page', function () {
    $this->get(route('dashboard.akun'))->assertRedirect(route('login'));
});

test('user can view the account page', function () {
    $user = User::factory()->create();

    $this->actingAs($user)->get(route('dashboard.akun'))->assertOk();
});

test('user biasa can upgrade to perental', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->put(route('dashboard.akun.jenis'), ['jenis_akun' => 'cosrent'])
        ->assertRedirect();

    expect($user->fresh()->role)->toBe('cosrent')
        ->and($user->fresh()->isPerental())->toBeTrue();

    $this->actingAs($user)->get(route('dashboard.kostum'))->assertOk();
});

test('perental without costumes can downgrade to user biasa', function () {
    $user = perental();

    $this->actingAs($user)
        ->put(route('dashboard.akun.jenis'), ['jenis_akun' => 'user'])
        ->assertRedirect();

    expect($user->fresh()->role)->toBe('user')
        ->and($user->fresh()->isPerental())->toBeFalse();
});

test('perental with costumes cannot downgrade', function () {
    $user = perental();
    buatCostume($user);

    $this->actingAs($user)
        ->put(route('dashboard.akun.jenis'), ['jenis_akun' => 'user'])
        ->assertSessionHasErrors('jenis_akun');

    expect($user->fresh()->role)->toBe('cosrent');
});

test('jenis akun must be valid', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->put(route('dashboard.akun.jenis'), ['jenis_akun' => 'admin'])
        ->assertSessionHasErrors('jenis_akun');
});
