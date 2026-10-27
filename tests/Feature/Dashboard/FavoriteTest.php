<?php

use App\Models\User;

test('guests cannot favorite a costume', function () {
    $owner = User::factory()->create();
    $costume = buatCostume($owner);

    $this->post(route('favorites.store'), ['costume_id' => $costume->id])
        ->assertRedirect(route('login'));
});

test('favoriting toggles the favorite record', function () {
    $user = User::factory()->create();
    $owner = User::factory()->create();
    $costume = buatCostume($owner);

    $this->actingAs($user)->post(route('favorites.store'), ['costume_id' => $costume->id]);
    expect($user->favorites()->where('costume_id', $costume->id)->exists())->toBeTrue();

    $this->actingAs($user)->post(route('favorites.store'), ['costume_id' => $costume->id]);
    expect($user->favorites()->where('costume_id', $costume->id)->exists())->toBeFalse();
});
