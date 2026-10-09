<?php

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