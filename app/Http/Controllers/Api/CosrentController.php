<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CosrentResource;
use App\Models\CosrentProfile;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CosrentController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $profiles = CosrentProfile::query()
            ->with(['user', 'city.province'])
            ->withCount('costumes')
            ->orderByDesc('costumes_count')
            ->when($request->query('limit'), fn ($query, $limit) => $query->limit((int) $limit))
            ->get();

        return CosrentResource::collection($profiles);
    }

    public function show(string $username): CosrentResource
    {
        $profile = CosrentProfile::query()
            ->whereHas('user', fn ($query) => $query->where('username', $username))
            ->with(['user', 'city.province'])
            ->withCount('costumes')
            ->firstOrFail();

        return new CosrentResource($profile);
    }
}
