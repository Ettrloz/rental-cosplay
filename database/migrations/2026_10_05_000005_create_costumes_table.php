<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('costumes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cosrent_profile_id')->constrained()->cascadeOnDelete();
            $table->foreignId('city_id')->nullable()->constrained()->nullOnDelete();

            $table->string('title');
            $table->string('slug')->unique();
            $table->unsignedInteger('price');
            $table->unsignedTinyInteger('rental_days')->default(3);

            $table->string('brand')->nullable();
            $table->string('series')->nullable()->index();
            $table->string('character')->nullable()->index();
            $table->string('gender')->default('unisex');
            $table->string('size')->nullable();
            $table->string('chest')->nullable();
            $table->string('waist')->nullable();

            $table->text('description')->nullable();
            $table->string('status')->default('available');
            $table->unsignedInteger('views')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('costumes');
    }
};
