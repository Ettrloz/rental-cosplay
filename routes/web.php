<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'home')->name('home');
Route::inertia('/katalog', 'katalog')->name('katalog');
Route::inertia('/cosrent', 'cosrent')->name('cosrent');
Route::inertia('/event', 'event')->name('event');
Route::inertia('/forum', 'forum')->name('forum');