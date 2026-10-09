import type { Komentar } from '@/data/forum';

export type JadwalEvent = {
  judul: string;
  tanggal: string;
  penyelenggara: string;
  lokasi: string;
  gambar: string;
  isi: string;
  venue: string;
  jam: string;
  harga: string;
  komentar: Komentar[];
};

export const EVENT: JadwalEvent[] = [
  {
    judul: 'Yogyakomtek x Neocon Cosplay Competition',
    tanggal: '26-30 Sep 2026',
    penyelenggara: 'Apkom Jogja x Neocon.id',
    lokasi: 'Bantul, Yogyakarta',
    gambar: 'https://picsum.photos/seed/yogyakomtek-neocon/640/360',
    isi: 'Gelaran cosplay competition gabungan Apkom Jogja dan Neocon.id. Ada stage battle, gathering komunitas, dan bazaar merchandise. Tempatnya luas, ber-AC, dan dekat dengan food court — nyaman buat walking-costume seharian.',
    venue: 'Jogja Expo Center, Bantul',
    jam: '09.00 – 21.00 WIB',
    harga: 'Gratis / pendaftaran kompetisi Rp 50.000',
    komentar: [
      {
        penulis: 'umi.cosrent',
        waktu: '1 minggu lalu',
        teks: 'Tahun lalu seru banget, stage-nya gede dan jurinya jelas ngeh di karakter.',
        skor: 34
      },
      {
        penulis: 'Admin',
        waktu: '3 hari lalu',
        teks: 'Info pendaftaran menyusul di forum, pantau terus ya!',
        skor: 9
      }
    ]
  },
  {
    judul: 'Indonesia Comic Con 2026',
    tanggal: '3-4 Okt 2026',
    penyelenggara: 'Panorama Media',
    lokasi: 'Jakarta Utara, Jakarta',
    gambar: 'https://picsum.photos/seed/indonesia-comic-con/640/360',
    isi: 'Konvensi pop culture terbesar di Indonesia. Booth official merchandise, guest star dari luar negeri, cosplay competition, dan area foto bertema. Wajib datang buat yang mau update koleksi terbaru.',
    venue: 'JIExpo Kemayoran Hall A-B',
    jam: '10.00 – 21.00 WIB',
    harga: 'Rp 150.000 / hari',
    komentar: [
      {
        penulis: 'savoyurentcos',
        waktu: '2 hari lalu',
        teks: 'Siapa yang ikut kompetisi? Gabung yuk biar ramai!',
        skor: 21
      }
    ]
  },
  {
    judul: 'Midori Festival 5',
    tanggal: '3-4 Okt 2026',
    penyelenggara: 'Shiawase Organizer',
    lokasi: 'Jakarta Pusat, Jakarta',
    gambar: 'https://picsum.photos/seed/midori-festival/640/360',
    isi: 'Festival ke-5 dari Shiawase Organizer dengan tema sakura season. Ada mini workshop wig styling, live band, dan zona pertukaran barang bekas kostum. Ramah buat pendatang baru.',
    venue: 'Balai Sarbini, Jakarta Selatan',
    jam: '09.00 – 18.00 WIB',
    harga: 'Rp 50.000',
    komentar: [
      {
        penulis: 'hana.cos',
        waktu: '1 hari lalu',
        teks: 'Workshop wig-nya recommended, langsung praktek sama masternya.',
        skor: 12
      }
    ]
  },
  {
    judul: 'Hikari No Hi',
    tanggal: '4 Okt 2026',
    penyelenggara: 'Hikari Team PLG',
    lokasi: 'Palembang, Sumatera Selatan',
    gambar: 'https://picsum.photos/seed/hikari-no-hi/640/360',
    isi: 'Event komunitas Palembang dengan theme light & festival. Ada cosplay stage, mini games, dan doorprize untuk semua yang hadir dengan kostum lengkap.',
    venue: 'Aula Palembang Square',
    jam: '10.00 – 17.00 WIB',
    harga: 'Gratis',
    komentar: [
      {
        penulis: 'dewi.mercos',
        waktu: '4 hari lalu',
        teks: 'Doorprize-nya beneran, pas saya datang langsung dapat pin eksklusif.',
        skor: 7
      }
    ]
  },
  {
    judul: 'AnimeFest Asia 2026',
    tanggal: '18-19 Okt 2026',
    penyelenggara: 'Asia Expo Nusantara',
    lokasi: 'Surabaya, Jawa Timur',
    gambar: 'https://picsum.photos/seed/animefest-asia/640/360',
    isi: 'Edisi keliling Asia Expo kali ini singgah di Surabaya. Area besar dengan zona trading cards, game corner, dan cosplay stage bertingkat. Cocok buat keluarga dengan area kids fun.',
    venue: 'Grand City Convex, Surabaya',
    jam: '10.00 – 19.00 WIB',
    harga: 'Rp 75.000',
    komentar: [
      {
        penulis: 'mei.photogen',
        waktu: '2 hari lalu',
        teks: 'Foto booth-nya banyak spot instagramable, siap-siap memory penuh!',
        skor: 15
      }
    ]
  },
  {
    judul: 'Cosplay Parade Kota Kembang',
    tanggal: '25 Okt 2026',
    penyelenggara: 'Bandung Coswalker',
    lokasi: 'Bandung, Jawa Barat',
    gambar: 'https://picsum.photos/seed/cosplay-parade-kota-kembang/640/360',
    isi: 'Parade jalan santai melewati kawasan heritage Dago. Siapa saja boleh ikut dengan kostum apa pun, dari karakter anime sampai makanan. Diakhiri gathering dan sesi foto bersama.',
    venue: 'Dago Heritage Walk',
    jam: '14.00 – 17.00 WIB',
    harga: 'Gratis',
    komentar: [
      {
        penulis: 'kana.makeup',
        waktu: '5 hari lalu',
        teks: 'Rutenya santai, aman buat kostum yang rumit sekalipun.',
        skor: 18
      }
    ]
  },
  {
    judul: 'Konnichiwa! Pop Culture Fest',
    tanggal: '1 Nov 2026',
    penyelenggara: 'Toko Pop Culture',
    lokasi: 'Medan, Sumatera Utara',
    gambar: 'https://picsum.photos/seed/konnichiwa-pop-culture/640/360',
    isi: 'Festival pop culture pertama di Medan tahun ini. Ada cosplay race, idol stage, dan selling area skala kecil tapi lengkap. Tempatnya indoor dengan pencahayaan bagus.',
    venue: 'Centre Point Mall, Medan',
    jam: '10.00 – 18.00 WIB',
    harga: 'Rp 40.000',
    komentar: [
      {
        penulis: 'niko.atelier',
        waktu: '1 hari lalu',
        teks: 'Booth-nya dapet di strategic zone, jualan ludes!',
        skor: 10
      }
    ]
  },
  {
    judul: 'Sakura Matsuri Makassar',
    tanggal: '7-8 Nov 2026',
    penyelenggara: 'Makassar Otaku Community',
    lokasi: 'Makassar, Sulawesi Selatan',
    gambar: 'https://picsum.photos/seed/sakura-matsuri-makassar/640/360',
    isi: 'Pesta rintik bunga sakura ala Makassar. Ada sesi hanami, pertunjukan taiko, dan lomba kostum bertema flora. Atmosfer outdoor dipadukan stand makanan khas.',
    venue: 'Trans Studio Makassar',
    jam: '09.00 – 18.00 WIB',
    harga: 'Rp 60.000',
    komentar: [
      {
        penulis: 'ryo.rental',
        waktu: '6 hari lalu',
        teks: 'Taiko-nya kencang banget, suasana langsung hidup.',
        skor: 13
      }
    ]
  },
  {
    judul: 'Samurai Expo Jakarta',
    tanggal: '15 Nov 2026',
    penyelenggara: 'Samurai House ID',
    lokasi: 'Jakarta Selatan, Jakarta',
    gambar: 'https://picsum.photos/seed/samurai-expo/640/360',
    isi: 'Ekspo bertema Jepang era samurai: pameran katana replika, workshop baju zirah, dan cosplay parade karakter sakura. Interior hall bergaya klasik jadi latar foto yang unik.',
    venue: 'Menara Mandiri Hall, Jakarta',
    jam: '10.00 – 19.00 WIB',
    harga: 'Rp 90.000',
    komentar: [
      {
        penulis: 'woro.workshop',
        waktu: '4 hari lalu',
        teks: 'Workshop zirah-nya seru, bisa coba pasang bantalan dada asli.',
        skor: 6
      }
    ]
  },
  {
    judul: 'Garuda Idol & Cosplay Festival',
    tanggal: '22 Nov 2026',
    penyelenggara: 'Garuda Cospreneur',
    lokasi: 'Depok, Jawa Barat',
    gambar: 'https://picsum.photos/seed/garuda-idol-cosplay/640/360',
    isi: 'Festival gabungan idol performance dan cosplay untuk kampus sekitar Depok-Jakarta. Ada battle crew, sesi pelatihan modeling, dan booth bazar dari cosrent lokal.',
    venue: 'Balairung Universitas Indonesia',
    jam: '09.00 – 18.00 WIB',
    harga: 'Gratis',
    komentar: [
      {
        penulis: 'hayurentcos',
        waktu: '3 hari lalu',
        teks: 'Ramai mahasiswa buat jalan-jalan, tempat ngumpul enak.',
        skor: 11
      }
    ]
  },
  {
    judul: 'Kemang Sakura Fair',
    tanggal: '29 Nov 2026',
    penyelenggara: 'Kemang Creative Hub',
    lokasi: 'Jakarta Selatan, Jakarta',
    gambar: 'https://picsum.photos/seed/kemang-sakura-fair/640/360',
    isi: 'Rangkaian pameran kreatif dengan nuansa sakura di area Kemang. Berisi pop-up shop, live sketch, dan cosplay session malam dengan pencahayaan neon.',
    venue: 'Kemang Village Ballroom',
    jam: '12.00 – 21.00 WIB',
    harga: 'Rp 55.000',
    komentar: [
      {
        penulis: 'rei.renter',
        waktu: '2 hari lalu',
        teks: 'Sesi malam-nya aesthetic banget, wajib coba buat foto.',
        skor: 8
      }
    ]
  },
  {
    judul: 'Winter Cosplay Gathering Solo',
    tanggal: '6 Des 2026',
    penyelenggara: 'Solo Cosplay Union',
    lokasi: 'Surakarta, Jawa Tengah',
    gambar: 'https://picsum.photos/seed/winter-cosplay-solo/640/360',
    isi: 'Gathering penutup tahun dari komunitas Solo. Tema winter, peserta bebas membawa pasangan karakter musiman. Ada juri khusus untuk kostum terlipek dan paling kreatif.',
    venue: 'The Park Mall Solo',
    jam: '10.00 – 17.00 WIB',
    harga: 'Gratis',
    komentar: [
      {
        penulis: 'mimi.cos',
        waktu: '1 hari lalu',
        teks: 'Kategori kostum terlipek baru tahun ini, penasaran peserta-nya!',
        skor: 5
      }
    ]
  }
];

export function slugifyEvent(judul: string): string {
  return judul
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-');
}

export function cariEvent(slug: string): JadwalEvent | undefined {
  return EVENT.find(item => slugifyEvent(item.judul) === slug);
}
