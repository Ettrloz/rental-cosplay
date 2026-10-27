<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('cosrent_profiles', function (Blueprint $table) {
            $table->text('rental_rules')->nullable()->after('thumbnail');
            $table->string('rental_rules_image')->nullable()->after('rental_rules');
        });
    }

    public function down(): void
    {
        Schema::table('cosrent_profiles', function (Blueprint $table) {
            $table->dropColumn(['rental_rules', 'rental_rules_image']);
        });
    }
};
