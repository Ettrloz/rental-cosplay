<?php

use App\Models\CosrentProfile;
use App\Models\Costume;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

function buatCostume(User $owner, array $attributes = []): Costume
{
    $profile = $owner->cosrentProfile ?? CosrentProfile::create([
        'user_id' => $owner->id,
        'shop_name' => 'Toko '.$owner->id,
    ]);

    return Costume::create(array_merge([
        'cosrent_profile_id' => $profile->id,
        'title' => 'Kostum Contoh',
        'slug' => 'kostum-contoh-'.$owner->id,
        'price' => 120000,
        'rental_days' => 3,
        'gender' => 'wanita',
        'status' => 'available',
    ], $attributes));
}

function perental(array $attributes = []): User
{
    return User::factory()->create(['role' => 'cosrent', ...$attributes]);
}

test('guests are redirected to login from costume management', function () {
    $this->get(route('dashboard.kostum'))->assertRedirect(route('login'));
});

test('user biasa is redirected to account page from costume management', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('dashboard.kostum'))
        ->assertRedirect(route('dashboard.akun'));
});

test('a perental can view their costume list', function () {
    $user = perental();

    $this->actingAs($user)->get(route('dashboard.kostum'))->assertOk();
});

test('creating a costume provisions a cosrent profile', function () {
    $user = perental(['name' => 'Toko Uji']);

    $response = $this->actingAs($user)->post(route('dashboard.kostum.store'), [
        'title' => 'Kostum Uji Coba',
        'price' => 150000,
        'rental_days' => 3,
        'gender' => 'wanita',
        'status' => 'available',
    ]);

    $response->assertRedirect(route('dashboard.kostum'));

    $profile = CosrentProfile::where('user_id', $user->id)->first();
    $costume = Costume::where('title', 'Kostum Uji Coba')->first();

    expect($profile)->not->toBeNull()
        ->and($costume)->not->toBeNull()
        ->and($costume->cosrent_profile_id)->toBe($profile->id)
        ->and($costume->slug)->toBe('kostum-uji-coba')
        ->and($user->fresh()->role)->toBe('cosrent');
});

test('costume validation rejects incomplete data', function () {
    $user = perental();

    $this->actingAs($user)
        ->post(route('dashboard.kostum.store'), [])
        ->assertSessionHasErrors(['title', 'price', 'rental_days', 'gender', 'status']);
});

test('costume images are uploaded to the b2 disk', function () {
    Storage::fake('b2');

    $user = perental();

    $this->actingAs($user)->post(route('dashboard.kostum.store'), [
        'title' => 'Kostum Berfoto',
        'price' => 150000,
        'rental_days' => 3,
        'gender' => 'pria',
        'status' => 'available',
        'images' => [UploadedFile::fake()->createWithContent('foto.png', base64_decode(
            'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
        ))],
    ])->assertRedirect(route('dashboard.kostum'));

    $costume = Costume::where('title', 'Kostum Berfoto')->first();

    expect($costume)->not->toBeNull()
        ->and($costume->images)->toHaveCount(1);

    Storage::disk('b2')->assertExists($costume->images->first()->path);
});

test('a perental can update their own costume', function () {
    $user = perental();
    $costume = buatCostume($user);

    $this->actingAs($user)
        ->put(route('dashboard.kostum.update', $costume), [
            'title' => 'Judul Baru',
            'price' => 200000,
            'rental_days' => 7,
            'gender' => 'wanita',
            'status' => 'unavailable',
        ])
        ->assertRedirect(route('dashboard.kostum.edit', $costume))
        ->assertSessionHas('inertia.flash_data', ['success' => 'Kostum berhasil diperbarui.']);

    expect($costume->fresh())
        ->title->toBe('Judul Baru')
        ->price->toBe(200000)
        ->status->toBe('unavailable');
});

test('a perental cannot update another perental costume', function () {
    $owner = perental();
    $other = perental();
    $costume = buatCostume($owner);

    $this->actingAs($other)->put(route('dashboard.kostum.update', $costume), [
        'title' => 'Judul Baru',
        'price' => 200000,
        'rental_days' => 7,
        'gender' => 'wanita',
        'status' => 'unavailable',
    ])->assertForbidden();
});

test('a perental can delete their own costume', function () {
    $user = perental();
    $costume = buatCostume($user);

    $this->actingAs($user)
        ->delete(route('dashboard.kostum.destroy', $costume))
        ->assertRedirect(route('dashboard.kostum'));

    expect(Costume::find($costume->id))->toBeNull();
});

test('a perental cannot delete another perental costume', function () {
    $owner = perental();
    $other = perental();
    $costume = buatCostume($owner);

    $this->actingAs($other)
        ->delete(route('dashboard.kostum.destroy', $costume))
        ->assertForbidden();

    expect(Costume::find($costume->id))->not->toBeNull();
});
