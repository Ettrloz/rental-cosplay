<?php

namespace Database\Seeders;

use App\Models\Costume;
use Illuminate\Database\Seeder;

class CostumeImageSeeder extends Seeder
{
    public function run(): void
    {
        foreach (Costume::all() as $costume) {
            foreach ([0, 1, 2] as $order) {
                $costume->images()->firstOrCreate(
                    ['sort_order' => $order],
                    ['path' => 'costumes/' . $costume->slug . '-' . ($order + 1) . '.webp']
                );
            }
        }
    }
}
