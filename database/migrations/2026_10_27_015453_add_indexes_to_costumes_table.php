<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('costumes', function (Blueprint $table) {
            $table->index(['status', 'size'], 'costumes_status_size_index');
            $table->index(['status', 'gender'], 'costumes_status_gender_index');
            $table->index(['status', 'views'], 'costumes_status_views_index');
            $table->index(['status', 'price'], 'costumes_status_price_index');
            $table->index(['status', 'id'], 'costumes_status_id_index');
            $table->index(['cosrent_profile_id', 'status'], 'costumes_cosrent_profile_id_status_index');
            $table->index(['city_id', 'status'], 'costumes_city_id_status_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('costumes', function (Blueprint $table) {
            $table->dropIndex('costumes_status_size_index');
            $table->dropIndex('costumes_status_gender_index');
            $table->dropIndex('costumes_status_views_index');
            $table->dropIndex('costumes_status_price_index');
            $table->dropIndex('costumes_status_id_index');
            $table->dropIndex('costumes_cosrent_profile_id_status_index');
            $table->dropIndex('costumes_city_id_status_index');
        });
    }
};
