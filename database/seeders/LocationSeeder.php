<?php

namespace Database\Seeders;

use App\Models\Province;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            'Banten' => ['Tangerang', 'Tangerang Selatan', 'Serang'],
            'Jakarta' => ['Jakarta Barat', 'Jakarta Pusat', 'Jakarta Selatan', 'Jakarta Timur', 'Jakarta Utara'],
            'Jawa Barat' => ['Bandung', 'Bekasi', 'Bogor', 'Depok'],
            'Jawa Tengah' => ['Semarang', 'Solo', 'Magelang'],
            'Jawa Timur' => ['Surabaya', 'Malang', 'Sidoarjo', 'Madiun'],
        ];

        foreach ($data as $provinceName => $cities) {
            $province = Province::firstOrCreate(['name' => $provinceName]);

            foreach ($cities as $cityName) {
                $province->cities()->firstOrCreate(['name' => $cityName]);
            }
        }
    }
}
