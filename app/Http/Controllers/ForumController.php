<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreForumCommentRequest;
use App\Http\Requests\StoreForumThreadRequest;
use App\Http\Resources\ForumCommentResource;
use App\Http\Resources\ForumThreadResource;
use App\Models\ForumComment;
use App\Models\ForumThread;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ForumController extends Controller
{
    public function index(): Response
    {
        $threads = ForumThread::query()
            ->with('user')
            ->withCount('comments')
            ->withSum('votes', 'value')
            ->latest()
            ->limit(50)
            ->get();

        return Inertia::render('forum', [
            'threads' => ForumThreadResource::collection($threads)->resolve(),
            'stats' => [
                'threads' => ForumThread::query()->count(),
                'views' => (int) ForumThread::query()->sum('views'),
                'members' => ForumThread::query()->distinct()->count('user_id'),
            ],
        ]);
    }

    public function show(Request $request, ForumThread $thread): Response
    {
        $viewKey = "forum_thread_viewed_{$thread->id}";

        if (! $request->session()->has($viewKey)) {
            $thread->increment('views');
            $request->session()->put($viewKey, true);
        }

        $thread->load('user')->loadCount('comments')->loadSum('votes', 'value');

        $komentar = $thread->comments()
            ->with('user')
            ->withSum('votes', 'value')
            ->oldest()
            ->get();

        return Inertia::render('forum/detail', [
            'thread' => ForumThreadResource::make($thread)->resolve(),
            'komentar' => ForumCommentResource::collection($komentar)->resolve(),
        ]);
    }

    public function store(StoreForumThreadRequest $request): RedirectResponse
    {
        $user = $request->user();
        abort_unless($user, 403);

        $data = $request->validated();
        $image = $request->file('image');

        $thread = $user->forumThreads()->create([
            'category' => $data['category'],
            'title' => $data['title'],
            'slug' => $this->uniqueSlug($data['title']),
            'body' => $data['body'],
            'image' => $image instanceof UploadedFile
                ? Storage::disk('b2')->putFile('forum', $image)
                : null,
        ]);

        Inertia::flash('success', 'Topik berhasil dibuat.');

        return to_route('forum.show', $thread);
    }

    public function destroy(Request $request, ForumThread $thread): RedirectResponse
    {
        abort_unless($thread->user_id === $request->user()?->id, 403);

        if ($thread->image) {
            Storage::disk('b2')->delete($thread->image);
        }

        $thread->delete();

        Inertia::flash('success', 'Topik berhasil dihapus.');

        return to_route('forum');
    }

    public function storeComment(StoreForumCommentRequest $request, ForumThread $thread): RedirectResponse
    {
        $user = $request->user();
        abort_unless($user, 403);

        $thread->comments()->create([
            'user_id' => $user->id,
            'body' => $request->validated('body'),
        ]);

        Inertia::flash('success', 'Komentar ditambahkan.');

        return back();
    }

    public function voteThread(Request $request, ForumThread $thread): RedirectResponse
    {
        $this->toggleVote($request, $thread);

        return back();
    }

    public function voteComment(Request $request, ForumComment $comment): RedirectResponse
    {
        $this->toggleVote($request, $comment);

        return back();
    }

    public function bookmark(Request $request, ForumThread $thread): RedirectResponse
    {
        $user = $request->user();
        abort_unless($user, 403);

        $bookmark = $thread->bookmarks()->where('user_id', $user->id)->first();

        if ($bookmark) {
            $bookmark->delete();
        } else {
            $thread->bookmarks()->create(['user_id' => $user->id]);
        }

        return back();
    }

    private function toggleVote(Request $request, ForumThread|ForumComment $votable): void
    {
        $user = $request->user();
        abort_unless($user, 403);

        $data = $request->validate([
            'value' => ['required', 'integer', Rule::in([-1, 1])],
        ]);

        $vote = $votable->votes()->where('user_id', $user->id)->first();

        if ($vote && (int) $vote->value === (int) $data['value']) {
            $vote->delete();

            return;
        }

        if ($vote) {
            $vote->update(['value' => $data['value']]);

            return;
        }

        $votable->votes()->create([
            'user_id' => $user->id,
            'value' => $data['value'],
        ]);
    }

    private function uniqueSlug(string $title): string
    {
        $base = Str::slug($title) ?: 'topik';
        $slug = $base;
        $urutan = 2;

        while (ForumThread::query()->where('slug', $slug)->exists()) {
            $slug = $base.'-'.$urutan++;
        }

        return $slug;
    }
}
