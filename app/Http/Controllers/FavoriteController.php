<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    /**
     * Toggle a costume in the authenticated user's favorites.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'costume_id' => ['required', 'integer', 'exists:costumes,id'],
        ]);

        $user = $request->user();

        $existing = $user->favorites()
            ->where('costume_id', $validated['costume_id'])
            ->first();

        if ($existing) {
            $existing->delete();
        } else {
            $user->favorites()->create(['costume_id' => $validated['costume_id']]);
        }

        return back();
    }
}
