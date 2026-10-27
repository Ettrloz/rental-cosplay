<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $cities = City::query()
            ->when($request->query('province_id'), fn ($query, $provinceId) => $query->where('province_id', $provinceId))
            ->orderBy('name')
            ->get(['id', 'province_id', 'name']);

        return response()->json(['data' => $cities]);
    }
}
