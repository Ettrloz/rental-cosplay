<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class EventController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return EventResource::collection(
            Event::query()->orderBy('starts_on')->orderBy('id')->get()
        );
    }

    public function show(string $slug): EventResource
    {
        return new EventResource(Event::where('slug', $slug)->firstOrFail());
    }
}
