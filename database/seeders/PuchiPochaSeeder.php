<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\CosrentProfile;
use App\Models\Costume;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PuchiPochaSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('username', 'puchipocharent')->first();

        if (! $user) {
            return;
        }

        $jakbar = City::where('name', 'Jakarta Barat')->value('id');
        $jaksel = City::where('name', 'Jakarta Selatan')->value('id');

        $profile = CosrentProfile::updateOrCreate(
            ['user_id' => $user->id],
            [
                'city_id' => $jakbar,
                'shop_name' => 'PuchiPochaRent',
                'bio' => 'Puchi Pocha Cosplay Rental adalah rentalan cosplay untuk kamu yang punya size yang susah dicari XS-S dan XL-XXXL!',
                'instagram' => 'puchipocharent',
                'is_verified' => true,
            ]
        );

        // Versi lama dari seeder awal, diganti dengan data asli di bawah.
        Costume::where('slug', 'anaxagoras-honkai-star-rail')->delete();

        $hsr = 'Honkai: Star Rail';
        $gi = 'Genshin Impact';
        $zzz = 'Zenless Zone Zero';
        $lnd = 'Love and Deepspace';
        $ps = 'Panty and Stocking with Garterbelt';

        // [judul, harga, brand, series, karakter, gender, ukuran, LD, LP, kota]
        $rows = [
            ['Flins', 250000, 'Creative Production', $gi, 'Flins', 'pria', 'L - XXL', '106', '94'],
            ['Columbina / "The Damselette"', 170000, 'Manwu', $gi, 'Columbina Hyposelenia', 'wanita', 'XS - S', '81-84', '63-66'],
            ['Hatsune Miku: Rabbit Hole', 140000, 'Uwowo', 'Vocaloid', 'Hatsune Miku', 'wanita', 'XS - L', '80-94', '58-76'],
            ['Cyrene (Demiurge)', 235000, 'Wudu Upgrade', $hsr, 'Cyrene', 'wanita', 'XS - S', '81-84', '60-63'],
            ['Iuno', 185000, 'White Deer', 'Wuthering Waves', 'Iuno', 'wanita', 'XS - S', '81-84', '60-63'],
            ['Cartethyia', 165000, 'White Deer', 'Wuthering Waves', 'Cartethyia', 'wanita', 'XS - S', '81-84', '60-63'],
            ['Dan Heng Permansor Terrae', 190000, 'Manwu', $hsr, 'Dan Heng • Permansor Terrae', 'pria', 'XL - XXXL', '104-108', '94-98'],
            ['Hugo Vlad', 175000, 'Monenjoy', $zzz, 'Hugo Vlad', 'pria', 'XL - XXXL', '100-105', '85-90'],
            ['Ifa', 160000, 'Iyungtoo', $gi, 'Ifa', 'wanita', 'L - XXL', '101-104', '80-85'],
            ['Panty Anarchy', 110000, 'Bomgu', $ps, 'Panty Anarchy', 'wanita', 'L - XL', '100-106', '80-86'],
            ['Stocking Anarchy', 110000, 'Bomgu', $ps, 'Stocking Anarchy', 'wanita', 'S - M', '81-86', '63-70'],
            ['Higurashi Kagome', 60000, 'Maker Lokal', 'Inuyasha', 'Kagome Higurashi', 'wanita', 'XS - M', '81-88', '60-67'],
            ['Kinomoto Sakura (Clear Card Arc ver.)', 140000, 'Maker Lokal', 'Cardcaptor Sakura', 'Sakura Kinomoto', 'wanita', 'XS - S', '81-84', '60-63'],
            ['Li Syaoran (CCS)', 110000, 'Iyungtoo', 'Cardcaptor Sakura', 'Syaoran Li', 'pria', 'XXXL', '101-104', '79-82'],
            ['Yuna FFX', 290000, 'Maker Lokal', 'Final Fantasy', 'Yuna', 'wanita', 'XS - S', '77-84', '56-63'],
            ['Evernight / March 7th SP', 165000, 'Wudu Upgrade', $hsr, 'Evernight', 'wanita', 'XS - S', '81-84', '60-63'],
            ['Anaxagoras', 210000, 'Monenjoy', $hsr, 'Anaxa', 'pria', 'XS - M', '86', null],
            ['Gallagher', 150000, 'Herocos', $hsr, 'Gallagher', 'pria', 'XL - XXXL', '106-110', '92-96'],
            ['Moze', 165000, 'Creative Production', $hsr, 'Moze', 'pria', 'L - XXXL', '98-102', '84-90'],
            ['Jade', 190000, 'Gimeng', $hsr, 'Jade', 'wanita', 'XL - XXXL', '100-104', '80-84'],
            ['Hyacine', 170000, 'Monenjoy', $hsr, 'Hyacine', 'wanita', 'XL - XXL', '96-100', '79-83'],
            ['Aglaea', 150000, 'Wudu Upgrade', $hsr, 'Aglaea', 'wanita', 'XL - XXXL', '101-104', '79-82'],
            ['Tribbie', 195000, 'Monenjoy', $hsr, 'Tribbie', 'wanita', 'XS - S', '78-82', '62-66'],
            ['Saber: HSR Collab ver.', 115000, 'Manwu', $hsr, 'Artoria Pendragon (Saber H:SR)', 'wanita', 'XS - S', '84', '64-74'],
            ['Caesar King 3XL', 210000, 'Monenjoy', $zzz, 'Caesar King', 'pria', 'XL - XXXL', '98-101', '82-85'],
            ['Mydei 2XL', 375000, 'Ichiyo', $hsr, 'Mydei', 'pria', 'XL - XXXL', '100-104', '86-90'],
            ['2B Wudu 3XL', 100000, 'Wudu', 'Nier Automata', '2B', 'wanita', 'XL - XXXL', '101-104', '80-85'],
            ['MC LND : Cascading Breeze (S)', 200000, 'Mouxiong', $lnd, 'MC • Cascading Breeze', 'wanita', 'XS - M', '81-84', '63-66'],
            ['Zayne : Master of Fate', 250000, 'Mouxiong', $lnd, 'Zayne', 'pria', 'XL - XXL', '96-104', '78-82'],
            ['THE Herta', 210000, 'Wudu Upgrade', $hsr, 'The Herta', 'wanita', 'XS - S', '77-80', '56-59'],
            ['Tsubakino Tasuku Windbreaker', 120000, 'No Brand / Freebrand', 'Wind Breaker', 'Tasuku Tsubakino', 'pria', 'XL - XXXL', '96-102', '76-80'],
            ['Anby Demara ZZZ', 130000, 'Wudu', $zzz, 'Anby Demara', 'wanita', 'XL - XXXL', '101-104', '80-82'],
            ['Citlali', 180000, 'Wudu Upgrade', $gi, 'Citlali', 'wanita', 'S', '81-84', '60-63'],
            ['Sunday (NPC ver.)', 145000, 'Wudu Upgrade', $hsr, 'Sunday', 'pria', 'XL - XXXL', '101-104', '79-82'],
            ['Xilonen', 165000, 'Wudu', $gi, 'Xilonen', 'wanita', 'XXXL', '101-104', '79-82'],
            ['Jinx Arcane', 180000, 'CosplayFM', 'League of Legends', 'Jinx', 'wanita', 'XS - S', '81-84', '63-66'],
            ['Mualani', 170000, 'Wudu Upgrade', $gi, 'Mualani', 'wanita', 'S', '81-84', '60-63'],
            ['Jane Doe', 170000, 'Wudu Upgrade', $zzz, 'Jane Doe', 'wanita', 'XS - S', '81-84', '60-63'],
            ['Neuvillette', 190000, 'Mangu', $gi, 'Neuvillette', 'pria', 'XL - XXXL', '108-112', '92-96'],
            ['Zayne: Midnight Silence', 190000, 'Creative Production', $lnd, 'Zayne', 'pria', 'XL', null, null],
            ['Sushang', 160000, 'Lardoo', $hsr, 'Sushang', 'wanita', 'XL - XXL', '100-105', '83-88'],
            ['Ganyu Animate', 100000, 'Wudu', $gi, 'Ganyu • Animate', 'wanita', 'S', null, null, 'Jakarta Selatan'],
            ['Yelan Pizza Hut', 90000, 'Mengxiao', $gi, 'Yelan', 'wanita', 'S', null, null],
            ['Ganyu Hey Tea', 110000, 'Wudu', $gi, 'Ganyu • HeyTea', 'wanita', 'S', '81-84', '63-66'],
            ['Shenhe Hey Tea', 130000, 'Lardoo', $gi, 'Shenhe • HeyTea', 'wanita', 'XXL', '100-105', '83-88'],
            ['MC Love & Deepspace Default (S & 3XL)', 110000, 'Wudu', $lnd, 'MC • Hunter Uniform', 'wanita', 'S - XXXL', null, null],
            ['Sylus: No Defense Zone 2XL', 170000, 'Bomgu', $lnd, 'Sylus', 'pria', 'XXL', null, null],
            ['Sebastian Michaelis Public School Arc ver. 2XL', 190000, 'Creative Production', 'Black Butler', 'Sebastian Michaelis', 'pria', 'XL - XXL', null, null],
            ['Ciel Phantomhive Public School Arc ver. S', 160000, 'Creative Production', 'Black Butler', 'Ciel Phantomhive', 'pria', 'S', null, null],
            ['Ellen Joe 3XL', 250000, 'Uwowo', $zzz, 'Ellen Joe', 'wanita', 'XXXL', '98-112', '80-94'],
            ['Sigewinne S', 165000, 'Wudu', $gi, 'Sigewinne', 'wanita', 'S', null, null],
            ['Nicole Demara S-M', 175000, 'Wudu', $zzz, 'Nicole Demara', 'wanita', 'S - M', null, null],
            ['Sparkle / Hanabi M', 145000, 'Wudu', $hsr, 'Sparkle', 'wanita', 'S - M', null, null],
            ['Hoshimi Miyabi 3XL', 175000, 'Wudu', $zzz, 'Hoshimi Miyabi', 'wanita', 'XXXL', null, null],
            ['Luna by Astrum Design XL/2XL', 140000, 'Idealism', 'Astrum Design', 'Luna', 'wanita', 'XL - XXL', null, null],
            ['Ayato Heytea ver. 2XL', 100000, 'Wudu', $gi, 'Kamisato Ayato', 'pria', 'XXL', null, null],
            ['Clorinde 3XL', 190000, 'Mangu', $gi, 'Clorinde', 'wanita', 'XXXL', null, null],
            ['Kamisato Ayato XL', 175000, 'Idealism', $gi, 'Kamisato Ayato', 'pria', 'XL', null, null],
            ['March 7th (Hunt)', 180000, 'Wudu Upgrade', $hsr, 'March 7th • The Hunt', 'wanita', 'XS', null, null],
            ['Wise Mengxiao 3XL', 175000, 'Mengxiao', $zzz, 'Wise', 'pria', 'XL - XXXL', null, null],
            ['Rafayel : Whitesand Phantom ver. Bomgu 2XL', 145000, 'Bomgu', $lnd, 'Rafayel', 'pria', 'XL - XXL', null, null],
            ['Kaveh Mangu 3XL', 170000, 'Mangu', $gi, 'Kaveh', 'pria', 'XL - XXXL', null, null],
            ['Aventurine Mangu 3XL', 265000, 'Mangu', $hsr, 'Aventurine', 'pria', 'XL - XXXL', null, null],
            ['Xavier : Fluffy Trap Bomgu 2XL', 160000, 'Bomgu', $lnd, 'Xavier', 'pria', 'XL - XXXL', null, null],
            ['Furina Ouisia', 145000, 'Wetrose', $gi, 'Furina', 'wanita', 'XS - S', null, null],
            ['Momobami Kirari', 120000, 'Rolecos', 'Kakegurui', 'Kirari Momobami', 'wanita', 'XL', null, null],
            ['Jabami Yumeko', 90000, 'Wetrose', 'Kakegurui', 'Jabami Yumeko', 'wanita', 'S', null, null],
            ['Lynette', 135000, 'Wudu', $gi, 'Lynette', 'wanita', 'S', null, null],
            ['Robin', 145000, 'Wudu Upgrade', $hsr, 'Robin', 'wanita', 'S', null, null],
            ['Herta + Weapon', 100000, 'Wudu', $hsr, 'Herta', 'wanita', 'S', null, null],
            ['Arlecchino 2XL', 150000, 'Lardoo', $gi, 'Arlecchino', 'wanita', 'XL - XXL', null, null],
            ['Klee Skin', 110000, 'Wudu', $gi, 'Klee', 'wanita', 'S', null, null],
            ['Blade XL', 175000, 'Idealism', $hsr, 'Blade', 'pria', 'XL', null, null],
            ['Ganyu Skin', 180000, 'Lardoo', $gi, 'Ganyu • Twilight Blossom', 'wanita', 'S', null, null],
            ['Dan Heng 2XL', 160000, 'Idealism', $hsr, 'Dan Heng', 'pria', 'XL - XXL', null, null],
            ['Silver Wolf', 190000, 'Lardoo', $hsr, 'Silver Wolf', 'wanita', 'S', null, null],
            ['March 7th Freebrand S', 95000, 'No Brand / Freebrand', $hsr, 'March 7th', 'wanita', 'XS', null, null],
            ['Belle Wetrose S', 155000, 'Wetrose', $zzz, 'Belle', 'wanita', 'S', null, null],
            ['Nilou Swimsuit', 120000, 'No Brand / Freebrand', $gi, 'Nilou', 'wanita', 'S', null, null],
            ['Lisa Skin', 170000, 'Gimeng', $gi, 'Lisa Minci', 'wanita', 'XXL', null, null],
            ['Lumine Bride Version', 400000, 'Uwowo', $gi, 'Lumine', 'wanita', 'All Size', null, null],
            ['Firefly Wudu S & XXXL', 145000, 'Wudu Upgrade', $hsr, 'Firefly', 'wanita', 'S - XXXL', null, null],
            ['MC Love And Deepspace : Light Seeker ver. (Xavier Pair)', 150000, 'HSIU', $lnd, 'MC • Lightseeker', 'wanita', 'XS - S', null, null],
        ];

        foreach ($rows as $i => $row) {
            [$title, $price, $brand, $series, $character, $gender, $size, $ld, $lp, $kota] = array_pad($row, 10, null);

            Costume::firstOrCreate(
                ['slug' => Str::slug($title)],
                [
                    'cosrent_profile_id' => $profile->id,
                    'city_id' => $kota === 'Jakarta Selatan' ? $jaksel : $jakbar,
                    'title' => $title,
                    'price' => $price,
                    'rental_days' => 3,
                    'brand' => $brand,
                    'series' => $series,
                    'character' => $character,
                    'gender' => $gender,
                    'size' => $size,
                    'chest' => $ld,
                    'waist' => $lp,
                    'status' => 'available',
                    'views' => max(10, 400 - $i * 4),
                ]
            );
        }
    }
}
