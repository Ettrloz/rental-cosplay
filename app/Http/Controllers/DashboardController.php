<?php

namespace App\Http\Controllers;

use App\Http\Resources\CostumeResource;
use App\Models\Costume;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Show the authenticated user's dashboard.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $profile = $user->cosrentProfile;

        $myCostumes = Costume::query()
            ->when($profile, fn ($query) => $query->where('cosrent_profile_id', $profile->id))
            ->when(! $profile, fn ($query) => $query->whereRaw('1 = 0'));

        $favorites = Costume::query()
            ->whereHas('favorites', fn ($query) => $query->where('user_id', $user->id))
            ->with(['city.province', 'cosrentProfile.user', 'images'])
            ->orderByDesc('costumes.id')
            ->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'costumes' => (clone $myCostumes)->count(),
                'favorites' => $user->favorites()->count(),
                'views' => (int) (clone $myCostumes)->sum('views'),
            ],
            'favorites' => CostumeResource::collection($favorites)->resolve(),
        ]);
    }
}
