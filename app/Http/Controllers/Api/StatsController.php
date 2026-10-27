<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\City;
use App\Models\CosrentProfile;
use App\Models\Costume;
use Illuminate\Http\JsonResponse;

class StatsController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => [
                'costumes' => Costume::where('status', 'available')->count(),
                'cosrents' => CosrentProfile::count(),
                'cities' => City::count(),
                'rating' => null,
            ],
        ]);
    }
}
