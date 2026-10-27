<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class EnsurePerental
{
    /**
     * Pastikan pengguna berjenis akun "Perental" sebelum mengelola kostum.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user()?->isPerental()) {
            Inertia::flash('perlu_perental', true);

            return to_route('dashboard.akun');
        }

        return $next($request);
    }
}
