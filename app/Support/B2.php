<?php

namespace App\Support;

use Carbon\CarbonInterface;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

final class B2
{
    public const TTL_HOURS = 12;

    /**
     * URL presigned untuk file di bucket private B2, di-cache selama masa berlaku
     * agar browser tetap bisa menampilkan file tanpa membuka bucket secara publik.
     */
    public static function url(string $path, ?CarbonInterface $expires = null): ?string
    {
        $expires ??= now()->addHours(self::TTL_HOURS);
        $key = 'b2:url:'.hash('sha256', $path);
        $ttl = max(now()->diffInSeconds($expires), self::TTL_HOURS * 3600);

        try {
            return Cache::remember($key, $ttl, fn () => Storage::disk('b2')->temporaryUrl($path, $expires));
        } catch (\Throwable) {
            try {
                return Storage::disk('b2')->temporaryUrl($path, $expires);
            } catch (\Throwable) {
                return null;
            }
        }
    }
}
