<?php

use App\Models\User;
use Laravel\Fortify\Features;

beforeEach(function () {
    $this->skipUnlessFortifyHas(Features::registration());
});

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertOk();
});

test('new users can register as a regular user by default', function () {
    $response = $this->post(route('register.store'), [
        'username' => 'testuser',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'jenis_akun' => 'user',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('home', absolute: false));

    expect(User::where('username', 'testuser')->first()->role)->toBe('user');
});

test('new users can register as a perental', function () {
    $this->post(route('register.store'), [
        'username' => 'tokouji',
        'email' => 'toko@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'jenis_akun' => 'cosrent',
    ]);

    $this->assertAuthenticated();

    expect(User::where('username', 'tokouji')->first()->role)->toBe('cosrent');
});

test('jenis akun must be valid', function () {
    $this->post(route('register.store'), [
        'username' => 'testuser',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'jenis_akun' => 'admin',
    ])->assertSessionHasErrors('jenis_akun');

    $this->assertGuest();
});
