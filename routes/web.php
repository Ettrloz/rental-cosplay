<?php

use App\Http\Controllers\Dashboard\AccountController;
use App\Http\Controllers\Dashboard\CosrentProfileController;
use App\Http\Controllers\Dashboard\CostumeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FavoriteController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'home')->name('home');
Route::inertia('/katalog', 'katalog')->name('katalog');
Route::inertia('/katalog/{kostum}', 'katalog/detail')->name('katalog.show');
Route::inertia('/cosrent', 'cosrent')->name('cosrent');
Route::inertia('/cosrent/{cosrent}', 'cosrent/detail')->name('cosrent.show');
Route::inertia('/event', 'event')->name('event');
Route::inertia('/event/{event}', 'event/detail')->name('event.show');
Route::inertia('/forum', 'forum')->name('forum');
Route::inertia('/forum/{topik}', 'forum/detail')->name('forum.show');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/dashboard/akun', [AccountController::class, 'edit'])->name('dashboard.akun');
    Route::put('/dashboard/akun/jenis', [AccountController::class, 'updateJenis'])->name('dashboard.akun.jenis');
    Route::post('/dashboard/akun/avatar', [AccountController::class, 'updateAvatar'])->name('dashboard.akun.avatar.update');
    Route::delete('/dashboard/akun/avatar', [AccountController::class, 'destroyAvatar'])->name('dashboard.akun.avatar.destroy');
    Route::delete('/dashboard/akun', [AccountController::class, 'destroy'])->name('dashboard.akun.destroy');

    Route::middleware('perental')->group(function () {
        Route::get('/dashboard/kostum', [CostumeController::class, 'index'])->name('dashboard.kostum');
        Route::get('/dashboard/kostum/tambah', [CostumeController::class, 'create'])->name('dashboard.kostum.create');
        Route::post('/dashboard/kostum', [CostumeController::class, 'store'])->name('dashboard.kostum.store');
        Route::get('/dashboard/kostum/{costume}/edit', [CostumeController::class, 'edit'])->name('dashboard.kostum.edit');
        Route::put('/dashboard/kostum/{costume}', [CostumeController::class, 'update'])->name('dashboard.kostum.update');
        Route::delete('/dashboard/kostum/{costume}', [CostumeController::class, 'destroy'])->name('dashboard.kostum.destroy');

        Route::get('/dashboard/profil', [CosrentProfileController::class, 'edit'])->name('dashboard.profil');
        Route::put('/dashboard/profil', [CosrentProfileController::class, 'update'])->name('dashboard.profil.update');
        Route::delete('/dashboard/profil/thumbnail', [CosrentProfileController::class, 'destroyThumbnail'])->name('dashboard.profil.thumbnail.destroy');
        Route::delete('/dashboard/profil/rental-rules-image', [CosrentProfileController::class, 'destroyRentalRulesImage'])->name('dashboard.profil.rental-rules-image.destroy');
    });

    Route::post('/favorites', [FavoriteController::class, 'store'])->name('favorites.store');
});
