<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\CostumeRequest;
use App\Http\Resources\CostumeResource;
use App\Models\City;
use App\Models\CosrentProfile;
use App\Models\Costume;
use App\Models\CostumeImage;
use App\Support\B2;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CostumeController extends Controller
{
    public function index(Request $request): Response
    {
        $profile = $request->user()->cosrentProfile;

        $costumes = $profile
            ? Costume::query()
                ->where('cosrent_profile_id', $profile->id)
                ->with(['city.province', 'cosrentProfile.user', 'images'])
                ->orderByDesc('id')
                ->get()
            : collect();

        return Inertia::render('dashboard/kostum', [
            'costumes' => CostumeResource::collection($costumes)->resolve(),
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('dashboard/kostum-form', [
            'costume' => null,
            'cities' => $this->cities(),
            'profile' => $this->profilePayload($request),
        ]);
    }

    public function store(CostumeRequest $request): RedirectResponse
    {
        $profile = $this->ensureProfile($request);

        $costume = $profile->costumes()->create([
            ...$request->safe()->except(['images', 'deleted_images']),
            'slug' => $this->uniqueSlug($request->string('title')->toString()),
        ]);

        $this->syncImages($costume, $request);

        return to_route('dashboard.kostum')->with('success', 'Kostum berhasil ditambahkan.');
    }

    public function edit(Request $request, Costume $costume): Response
    {
        $this->authorizeOwner($request, $costume);

        return Inertia::render('dashboard/kostum-form', [
            'costume' => CostumeResource::make(
                $costume->load(['city.province', 'cosrentProfile.user', 'images'])
            )->resolve(),
            'cities' => $this->cities(),
            'profile' => $this->profilePayload($request),
        ]);
    }

    public function update(CostumeRequest $request, Costume $costume): RedirectResponse
    {
        $this->authorizeOwner($request, $costume);

        $costume->update($request->safe()->except(['images', 'deleted_images']));

        $this->deleteImages($costume, $request->validated('deleted_images', []));

        $this->syncImages($costume, $request);

        Inertia::flash('success', 'Kostum berhasil diperbarui.');

        return to_route('dashboard.kostum.edit', $costume);
    }

    public function destroy(Request $request, Costume $costume): RedirectResponse
    {
        $this->authorizeOwner($request, $costume);

        foreach ($costume->images as $image) {
            Storage::disk('b2')->delete($image->path);
        }

        $costume->delete();

        return to_route('dashboard.kostum')->with('success', 'Kostum berhasil dihapus.');
    }

    public function destroyImage(Request $request, Costume $costume): RedirectResponse
    {
        $this->authorizeOwner($request, $costume);

        $url = $request->input('url');

        if (! is_string($url) || $url === '') {
            return back();
        }

        $image = $costume->images()->get()->first(function (CostumeImage $image) use ($url) {
            $imageUrl = method_exists($image, 'getUrlAttribute') ? $image->url : null;

            if (is_string($imageUrl) && $imageUrl === $url) {
                return true;
            }

            if (is_string($image->path) && str_ends_with($url, $image->path)) {
                return true;
            }

            return false;
        });

        if (! $image) {
            return back();
        }

        Storage::disk('b2')->delete($image->path);
        $image->delete();

        return back();
    }

    private function ensureProfile(Request $request): CosrentProfile
    {
        $user = $request->user();

        if ($user->cosrentProfile) {
            return $user->cosrentProfile;
        }

        if ($user->role !== 'cosrent') {
            $user->role = 'cosrent';
            $user->save();
        }

        return $user->cosrentProfile()->create([
            'shop_name' => $user->name ?: ($user->username ?: 'Cosrent'),
        ]);
    }

    private function authorizeOwner(Request $request, Costume $costume): void
    {
        abort_unless($costume->cosrentProfile?->user_id === $request->user()->id, 403);
    }

    private function uniqueSlug(string $title): string
    {
        $base = Str::slug($title) ?: 'kostum';
        $slug = $base;
        $urutan = 2;

        while (Costume::query()->where('slug', $slug)->exists()) {
            $slug = $base.'-'.$urutan++;
        }

        return $slug;
    }

    private function syncImages(Costume $costume, CostumeRequest $request): void
    {
        $files = $request->file('images') ?? [];

        if (! is_array($files)) {
            $files = [$files];
        }

        if (empty($files)) {
            return;
        }

        $start = (int) $costume->images()->max('sort_order');

        foreach ($files as $index => $file) {
            $path = Storage::disk('b2')->putFile('costumes', $file);

            if ($path) {
                $costume->images()->create([
                    'path' => $path,
                    'sort_order' => $start + $index + 1,
                ]);
            }
        }
    }

    /**
     * Delete images only after the edit form has been submitted successfully.
     *
     * @param array<int, string> $urls
     */
    private function deleteImages(Costume $costume, array $urls): void
    {
        if ($urls === []) {
            return;
        }

        foreach ($costume->images as $image) {
            $matches = collect($urls)->contains(function (string $url) use ($image): bool {
                if (is_string($image->path) && str_ends_with($url, $image->path)) {
                    return true;
                }

                try {
                    return B2::url($image->path) === $url;
                } catch (\Throwable) {
                    return false;
                }
            });

            if (! $matches) {
                continue;
            }

            Storage::disk('b2')->delete($image->path);
            $image->delete();
        }
    }

    private function cities(): Collection
    {
        return City::query()->orderBy('name')->get(['id', 'province_id', 'name']);
    }

    /**
     * @return array<string, mixed>|null
     */
    private function profilePayload(Request $request): ?array
    {
        $profile = $request->user()->cosrentProfile;

        if (! $profile) {
            return null;
        }

        return [
            'shop_name' => $profile->shop_name,
            'whatsapp' => $profile->whatsapp,
            'instagram' => $profile->instagram,
        ];
    }
}
