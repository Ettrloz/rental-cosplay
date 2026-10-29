<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CostumeResource;
use App\Models\Costume;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class CostumeController extends Controller
{
    private const CACHE_SECONDS = 30;

    private const URUTAN_UKURAN = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

    private function baseQuery(): Builder
    {
        return Costume::query()
            ->with(['city.province', 'cosrentProfile.user', 'images'])
            ->where('status', 'available');
    }

    /**
     * Daftar nilai kolom `size` yang mencakup ukuran yang dipilih.
     * Contoh: memilih M cocok dengan "M", "S - M", "XS - L", dan "All Size".
     *
     * @return array<int, string>
     */
    private function ukuranYangCocok(string $dipilih): array
    {
        $target = array_search(strtoupper(trim($dipilih)), self::URUTAN_UKURAN, true);

        if ($target === false) {
            return [];
        }

        $sizes = Cache::remember('costumes.distinct_sizes', 3600, function () {
            return Costume::query()
                ->whereNotNull('size')
                ->distinct()
                ->pluck('size')
                ->map(fn ($size) => (string) $size)
                ->all();
        });

        return array_values(array_filter($sizes, function (string $size) use ($target) {
            if (strcasecmp(trim($size), 'All Size') === 0) {
                return true;
            }

            $posisi = array_filter(
                array_map(
                    fn (string $bagian) => array_search(strtoupper(trim($bagian)), self::URUTAN_UKURAN, true),
                    explode('-', $size)
                ),
                fn ($index) => $index !== false
            );

            if (empty($posisi)) {
                return false;
            }

            return $target >= min($posisi) && $target <= max($posisi);
        }));
    }

    public function index(Request $request): JsonResponse
    {
        $request->attributes->set('costume_preview', true);

        $cacheKey = 'api:costumes:index:'.sha1($request->fullUrl());

        $payload = Cache::remember($cacheKey, self::CACHE_SECONDS, function () use ($request) {
            $query = $this->baseQuery()
                ->when($request->query('cosrent'), fn ($q, $nilai) => $q->whereHas(
                    'cosrentProfile.user', fn ($u) => $u->where('username', $nilai)
                ))
                ->when($request->query('provinsi'), fn ($q, $nilai) => $q->whereHas(
                    'city.province', fn ($p) => $p->where('name', $nilai)
                ))
                ->when($request->query('kota'), fn ($q, $nilai) => $q->whereHas(
                    'city', fn ($c) => $c->where('name', $nilai)
                ))
                ->when($request->query('gender'), fn ($q, $nilai) => $q->where('gender', strtolower($nilai)))
                ->when($request->query('ukuran'), fn ($q, $nilai) => $nilai === 'Semua'
                    ? $q
                    : $q->whereIn('size', $this->ukuranYangCocok($nilai)))
                ->when($request->query('q'), function ($q, $kata) {
                    $q->where(function ($w) use ($kata) {
                        $w->where('title', 'like', "%{$kata}%")
                            ->orWhere('character', 'like', "%{$kata}%")
                            ->orWhere('series', 'like', "%{$kata}%")
                            ->orWhere('brand', 'like', "%{$kata}%")
                            ->orWhereHas('cosrentProfile', fn ($c) => $c->where('shop_name', 'like', "%{$kata}%"));
                    });
                });

            match ($request->query('urutan')) {
                'Harga Terendah' => $query->orderBy('price'),
                'Harga Tertinggi' => $query->orderByDesc('price'),
                'Paling Banyak Dilihat' => $query->orderByDesc('views'),
                default => $query->orderByDesc('id'),
            };

            return CostumeResource::collection($query->paginate(12)->withQueryString())
                ->response()
                ->getData(true);
        });

        return response()->json($payload);
    }

    public function show(string $slug): JsonResponse
    {
        $costume = $this->baseQuery()
            ->with(['city.province', 'cosrentProfile.user', 'images'])
            ->where('slug', $slug)
            ->firstOrFail();

        $costume->increment('views');
        $costume->refresh()->load(['city.province', 'cosrentProfile.user', 'images']);

        return response()->json((new CostumeResource($costume))->response()->getData(true));
    }

    public function trending(): JsonResponse
    {
        request()->attributes->set('costume_preview', true);

        return response()->json(Cache::remember('api:costumes:trending', self::CACHE_SECONDS, fn () =>
            CostumeResource::collection($this->baseQuery()->orderByDesc('views')->limit(6)->get())
                ->response()->getData(true)
        ));
    }

    public function latest(): JsonResponse
    {
        request()->attributes->set('costume_preview', true);

        return response()->json(Cache::remember('api:costumes:latest', self::CACHE_SECONDS, fn () =>
            CostumeResource::collection($this->baseQuery()->orderByDesc('id')->limit(8)->get())
                ->response()->getData(true)
        ));
    }
}
