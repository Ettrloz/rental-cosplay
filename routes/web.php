<?php

use App\Http\Controllers\Dashboard\AccountController;
use App\Http\Controllers\Dashboard\CosrentProfileController;
use App\Http\Controllers\Dashboard\CostumeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\ForumController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'home')->name('home');
Route::inertia('/katalog', 'katalog')->name('katalog');
Route::inertia('/katalog/{kostum}', 'katalog/detail')->name('katalog.show');
Route::inertia('/cosrent', 'cosrent')->name('cosrent');
Route::inertia('/cosrent/{cosrent}', 'cosrent/detail')->name('cosrent.show');

Route::inertia('/event', 'event')->name('event');
Route::get('/event/buat', [EventController::class, 'create'])
    ->middleware('auth')
    ->name('event.create');
Route::inertia('/event/{event}', 'event/detail')->name('event.show');

Route::get('/forum', [ForumController::class, 'index'])->name('forum');
Route::get('/forum/{thread:slug}', [ForumController::class, 'show'])->name('forum.show');

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
        Route::delete('/dashboard/kostum/{costume}/images', [CostumeController::class, 'destroyImage'])->name('dashboard.kostum.images.destroy');

        Route::get('/dashboard/profil', [CosrentProfileController::class, 'edit'])->name('dashboard.profil');
        Route::put('/dashboard/profil', [CosrentProfileController::class, 'update'])->name('dashboard.profil.update');
        Route::delete('/dashboard/profil/thumbnail', [CosrentProfileController::class, 'destroyThumbnail'])->name('dashboard.profil.thumbnail.destroy');
        Route::delete('/dashboard/profil/rental-rules-image', [CosrentProfileController::class, 'destroyRentalRulesImage'])->name('dashboard.profil.rental-rules-image.destroy');
    });

    Route::post('/favorites', [FavoriteController::class, 'store'])->name('favorites.store');

    Route::post('/event', [EventController::class, 'store'])->name('event.store');
    Route::get('/event/{event}/edit', [EventController::class, 'edit'])->name('event.edit');
    Route::put('/event/{event}', [EventController::class, 'update'])->name('event.update');
    Route::delete('/event/{event}', [EventController::class, 'destroy'])->name('event.destroy');

    Route::post('/forum', [ForumController::class, 'store'])->name('forum.store');
    Route::delete('/forum/{thread:slug}', [ForumController::class, 'destroy'])->name('forum.destroy');
    Route::post('/forum/{thread:slug}/komentar', [ForumController::class, 'storeComment'])->name('forum.comments.store');
    Route::post('/forum/{thread:slug}/vote', [ForumController::class, 'voteThread'])->name('forum.vote');
    Route::post('/forum/{thread:slug}/simpan', [ForumController::class, 'bookmark'])->name('forum.bookmark');
    Route::post('/forum/komentar/{comment}/vote', [ForumController::class, 'voteComment'])->name('forum.comments.vote');
});
