<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventRequest;
use App\Http\Resources\EventResource;
use App\Models\Event;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('event/form', [
            'event' => null,
        ]);
    }

    public function store(EventRequest $request): RedirectResponse
    {
        $user = $request->user();
        abort_unless($user, 403);

        $data = $request->validated();
        $image = $request->file('image');

        $event = $user->events()->create([
            'title' => $data['title'],
            'slug' => $this->uniqueSlug($data['title']),
            'starts_on' => $data['starts_on'],
            'date_label' => $this->dateLabel($data['starts_on']),
            'organizer' => $data['organizer'],
            'location' => $data['location'],
            'venue' => $data['venue'] ?? null,
            'time_label' => $data['time_label'] ?? null,
            'price_label' => $data['price_label'] ?? null,
            'description' => $data['description'] ?? null,
            'image' => $image instanceof UploadedFile
                ? Storage::disk('b2')->putFile('events', $image)
                : null,
        ]);

        Inertia::flash('success', 'Event berhasil dibuat.');

        return to_route('event.show', ['event' => $event->slug]);
    }

    public function edit(Request $request, Event $event): Response
    {
        $this->authorizeOwner($request, $event);

        return Inertia::render('event/form', [
            'event' => EventResource::make($event)->resolve(),
        ]);
    }

    public function update(EventRequest $request, Event $event): RedirectResponse
    {
        $this->authorizeOwner($request, $event);

        $data = $request->validated();
        $image = $request->file('image');

        if ($image instanceof UploadedFile) {
            if ($event->image) {
                Storage::disk('b2')->delete($event->image);
            }

            $data['image'] = Storage::disk('b2')->putFile('events', $image);
        } else {
            unset($data['image']);
        }

        $event->update([
            ...$data,
            'date_label' => $this->dateLabel($data['starts_on']),
        ]);

        Inertia::flash('success', 'Event berhasil diperbarui.');

        return to_route('event.show', ['event' => $event->slug]);
    }

    public function destroy(Request $request, Event $event): RedirectResponse
    {
        $this->authorizeOwner($request, $event);

        if ($event->image) {
            Storage::disk('b2')->delete($event->image);
        }

        $event->delete();

        Inertia::flash('success', 'Event berhasil dihapus.');

        return to_route('event');
    }

    private function authorizeOwner(Request $request, Event $event): void
    {
        abort_unless($event->user_id === $request->user()?->id, 403);
    }

    private function dateLabel(string $date): string
    {
        return Carbon::parse($date)->locale('id')->translatedFormat('d M Y');
    }

    private function uniqueSlug(string $title): string
    {
        $base = Str::slug($title) ?: 'event';
        $slug = $base;
        $urutan = 2;

        while (Event::query()->where('slug', $slug)->exists()) {
            $slug = $base.'-'.$urutan++;
        }

        return $slug;
    }
}
