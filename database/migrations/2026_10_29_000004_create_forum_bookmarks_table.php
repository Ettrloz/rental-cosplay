<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('forum_bookmarks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('forum_thread_id')->constrained()->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['user_id', 'forum_thread_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('forum_bookmarks');
    }
};
