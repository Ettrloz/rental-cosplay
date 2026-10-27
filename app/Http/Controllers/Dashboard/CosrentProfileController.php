<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\CosrentProfileRequest;
use App\Models\City;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class CosrentProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        $profile = $request->user()->cosrentProfile;

        return Inertia::render('dashboard/profil', [
            'profile' => $profile ? [
                'shop_name'           => $profile->shop_name,
                'city_id'             => $profile->city_id,
                'bio'                 => $profile->bio,
                'thumbnail'           => $profile->thumbnail ? Storage::disk('public')->url($profile->thumbnail) : null,
                'rental_rules'        => $profile->rental_rules,
                'rental_rules_image'  => $profile->rental_rules_image ? Storage::disk('public')->url($profile->rental_rules_image) : null,
                'whatsapp'            => $profile->whatsapp,
                'instagram'           => $profile->instagram,
            ] : null,
            'cities' => City::query()->orderBy('name')->get(['id', 'province_id', 'name']),
        ]);
    }

    public function update(CosrentProfileRequest $request): RedirectResponse
    {
        $user    = $request->user();
        $profile = $user->cosrentProfile;

        if (! $profile) {
            if ($user->role !== 'cosrent') {
                $user->role = 'cosrent';
                $user->save();
            }

            $profile = $user->cosrentProfile()->create([
                'shop_name' => $request->string('shop_name')->toString(),
            ]);
        }

        $data = $request->safe()->except(['thumbnail', 'rental_rules_image']);

        // Handle thumbnail upload
        if ($request->hasFile('thumbnail')) {
            if ($profile->thumbnail && Storage::disk('public')->exists($profile->thumbnail)) {
                Storage::disk('public')->delete($profile->thumbnail);
            }
            $data['thumbnail'] = $request->file('thumbnail')->store('thumbnails', 'public');
        }

        // Handle rental_rules_image upload
        if ($request->hasFile('rental_rules_image')) {
            if ($profile->rental_rules_image && Storage::disk('public')->exists($profile->rental_rules_image)) {
                Storage::disk('public')->delete($profile->rental_rules_image);
            }
            $data['rental_rules_image'] = $request->file('rental_rules_image')->store('rental-rules', 'public');
        }

        $profile->update($data);

        Inertia::flash('success', 'Profil toko berhasil disimpan.');

        return back();
    }

    public function destroyThumbnail(Request $request): RedirectResponse
    {
        $profile = $request->user()->cosrentProfile;

        if ($profile && $profile->thumbnail && Storage::disk('public')->exists($profile->thumbnail)) {
            Storage::disk('public')->delete($profile->thumbnail);
            $profile->update(['thumbnail' => null]);
        }

        Inertia::flash('success', 'Thumbnail toko berhasil dihapus.');

        return back();
    }

    public function destroyRentalRulesImage(Request $request): RedirectResponse
    {
        $profile = $request->user()->cosrentProfile;

        if ($profile && $profile->rental_rules_image && Storage::disk('public')->exists($profile->rental_rules_image)) {
            Storage::disk('public')->delete($profile->rental_rules_image);
            $profile->update(['rental_rules_image' => null]);
        }

        Inertia::flash('success', 'Gambar aturan sewa berhasil dihapus.');

        return back();
    }
}
