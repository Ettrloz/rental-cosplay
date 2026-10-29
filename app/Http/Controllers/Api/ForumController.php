<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ForumThreadResource;
use App\Models\ForumThread;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ForumController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $limit = min(max((int) $request->query('limit', 15), 1), 50);

        $threads = ForumThread::query()
            ->with('user')
            ->withCount('comments')
            ->withSum('votes', 'value')
            ->latest()
            ->limit($limit)
            ->get();

        return ForumThreadResource::collection($threads);
    }

    public function show(string $slug): ForumThreadResource
    {
        $thread = ForumThread::query()
            ->with('user')
            ->withCount('comments')
            ->withSum('votes', 'value')
            ->where('slug', $slug)
            ->firstOrFail();

        return new ForumThreadResource($thread);
    }
}
