<?php

use App\Http\Controllers\Api\CityController;
use App\Http\Controllers\Api\CosrentController;
use App\Http\Controllers\Api\CostumeController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\ForumController;
use App\Http\Controllers\Api\ProvinceController;
use App\Http\Controllers\Api\StatsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/provinces', [ProvinceController::class, 'index']);
Route::get('/cities', [CityController::class, 'index']);
Route::get('/stats', [StatsController::class, 'index']);

Route::get('/costumes/trending', [CostumeController::class, 'trending']);
Route::get('/costumes/latest', [CostumeController::class, 'latest']);
Route::get('/costumes', [CostumeController::class, 'index']);
Route::get('/costumes/{slug}', [CostumeController::class, 'show']);

Route::get('/cosrents', [CosrentController::class, 'index']);
Route::get('/cosrents/{username}', [CosrentController::class, 'show']);

Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{slug}', [EventController::class, 'show']);

Route::get('/forum/threads', [ForumController::class, 'index']);
Route::get('/forum/threads/{slug}', [ForumController::class, 'show']);

Route::middleware('auth:sanctum')->post('/user/avatar', function (Request $request) {
    $request->validate([
        'avatar' => 'required|image|max:2048', // max 2MB
    ]);

    $user = $request->user();

    $path = $request->file('avatar')->store('avatars', 'public');

    $user->update(['avatar' => $path]);

    return response()->json(['avatar' => $user->avatar]);
});
