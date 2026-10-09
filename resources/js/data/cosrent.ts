import type { Komentar } from '@/data/forum';

export type Cosrent = {
  nama: string;
  username: string;
  kota: string;
  post: number;
  online: string;
  foto: string;
  deskripsi: string;
  rating: number;
  ulasanCount: number;
  pengikut: number;
  tokoDibuka: string;
  jamOperasional: string;
  terverifikasi: boolean;
  review: Komentar[];
};

export const COSRENT: Cosrent[] = [
  {
    nama: 'Medh',
    username: 'meichi.rentcos',
    kota: 'Sumedang, Jawa Barat',
    post: 67,
    online: 'Online 29 menit lalu',
    foto: 'https://picsum.photos/seed/meichi-rentcos/640/360',
    deskripsi:
      'Spesialis kostum media action dan Resident Evil. Semua kostum lolos QC panjang, jahitan diperkuat, dan wangi setelah dicuci. Buka pelayanan pengiriman se-Jawa Barat tanpa minimum.',
    rating: 4.9,
    ulasanCount: 42,
    pengikut: 840,
    tokoDibuka: '2023',
    jamOperasional: '09.00 – 21.00 WIB',
    terverifikasi: true,
    review: [
      {
        penulis: 'syaira.cos',
        waktu: '2 minggu lalu',
        teks: 'Kostumnya rapi banget, resleting gampang, dan penjelasan pemiliknya detail.',
        skor: 8
      },
      {
        penulis: 'Admin',
        waktu: '1 bulan lalu',
        teks: 'Sudah melewati verifikasi jahitan dan kebersihan, recommended.',
        skor: 12
      }
    ]
  },
  {
    nama: 'Kisaghin_rentcos',
    username: 'kisaghin_rentcos',
    kota: 'Cilacap, Jawa Tengah',
    post: 49,
    online: 'Online 1 jam lalu',
    foto: 'https://picsum.photos/seed/kisaghin-rentcos/640/360',
    deskripsi:
      'Rental kostum keluarga dengan koleksi ukuran anak sampai dewasa. Cocok buat event sekolah dan perayaan. Wajib DP di awal, sisanya lunas saat kostum diambil.',
    rating: 4.8,
    ulasanCount: 23,
    pengikut: 512,
    tokoDibuka: '2022',
    jamOperasional: '08.00 – 20.00 WIB',
    terverifikasi: true,
    review: [
      {
        penulis: 'bima.fam',
        waktu: '3 hari lalu',
        teks: 'Ukuran anak-anak lengkap, anak saya happy pakai cosplay nadaku.',
        skor: 6
      }
    ]
  },
  {
    nama: 'Yuvierent',
    username: 'yuvierent',
    kota: 'Jakarta Barat, Jakarta',
    post: 30,
    online: 'Online 1 jam lalu',
    foto: 'https://picsum.photos/seed/yuvierent/640/360',
    deskripsi:
      'Koleksi kostum idol dan girlband. Free wig setting untuk sewa minimal 3 hari. Fast response dan bisa COD area Jakarta Barat.',
    rating: 4.7,
    ulasanCount: 18,
    pengikut: 403,
    tokoDibuka: '2024',
    jamOperasional: '10.00 – 22.00 WIB',
    terverifikasi: true,
    review: [
      {
        penulis: 'hana.cos',
        waktu: '1 minggu lalu',
        teks: 'Wig setting-nya rapi, nyampe cepet banget. Top!',
        skor: 5
      }
    ]
  },
  {
    nama: 'Mochiicosrent',
    username: 'mochiicosrent',
    kota: 'Kuningan, Jawa Barat',
    post: 20,
    online: 'Online 1 jam lalu',
    foto: 'https://picsum.photos/seed/mochiicosrent/640/360',
    deskripsi:
      'Rental kostum cakep dengan dominan karakter cute. Buka titip jual cosplay second juga.',
    rating: 4.9,
    ulasanCount: 9,
    pengikut: 188,
    tokoDibuka: '2024',
    jamOperasional: '09.00 – 18.00 WIB',
    terverifikasi: false,
    review: [
      {
        penulis: 'uni.chan',
        waktu: '5 hari lalu',
        teks: 'Barangnya bersih, chat dibalas cepat sekali. Recommended!',
        skor: 4
      }
    ]
  },
  {
    nama: 'Noir',
    username: 'noir.cosrent',
    kota: 'Malang, Jawa Timur',
    post: 20,
    online: 'Online 1 jam lalu',
    foto: 'https://picsum.photos/seed/noir-cosrent/640/360',
    deskripsi:
      'Spesialis kostum dark theme dan villain. Koleksi aksesorisnya lengkap dari sword sampai helmet. Pengiriman seluruh Indonesia via cargo terpercaya.',
    rating: 4.6,
    ulasanCount: 15,
    pengikut: 356,
    tokoDibuka: '2023',
    jamOperasional: '11.00 – 20.00 WIB',
    terverifikasi: true,
    review: [
      {
        penulis: 'grimoire',
        waktu: '2 minggu lalu',
        teks: 'Helmet-nya gagah banget, sayang harus dikirim balik wkwk.',
        skor: 7
      }
    ]
  },
  {
    nama: 'Lilasaki Rent Cosplay',
    username: 'lilasaki.rent',
    kota: 'Magetan, Jawa Timur',
    post: 359,
    online: 'Online 4 jam lalu',
    foto: 'https://picsum.photos/seed/lilasaki-rent/640/360',
    deskripsi:
      'Toko kosplay terbesar di area Magetan dengan 300+ koleksi. Ada jasa jahit custom, perbaikan kostum, dan isi ulang wig. Buka reseller untuk kota sekitar Madiun.',
    rating: 4.9,
    ulasanCount: 87,
    pengikut: 1240,
    tokoDibuka: '2021',
    jamOperasional: '08.00 – 21.00 WIB',
    terverifikasi: true,
    review: [
      {
        penulis: 'miko.cos',
        waktu: '6 hari lalu',
        teks: 'Koleksinya gede banget, jahit custom juga rapi. Langganan di sini.',
        skor: 15
      },
      {
        penulis: 'pasopati',
        waktu: '1 bulan lalu',
        teks: 'Slot rame banget, pesan jauh-jauh hari kalau mau event buat.',
        skor: 9
      }
    ]
  },
  {
    nama: 'Beecosrent',
    username: 'beecosrent',
    kota: 'Jakarta Barat, Jakarta',
    post: 128,
    online: 'Online 2 jam lalu',
    foto: 'https://picsum.photos/seed/beecosrent/640/360',
    deskripsi:
      'Koleksi gacha dan wuthering waves terbesar di Jakarta. Tiap kostum punya photo card ukuran yang boleh dibawa pulang sebagai kenang-kenangan.',
    rating: 4.8,
    ulasanCount: 61,
    pengikut: 905,
    tokoDibuka: '2022',
    jamOperasional: '10.00 – 21.00 WIB',
    terverifikasi: true,
    review: [
      {
        penulis: 'rene.chan',
        waktu: '4 hari lalu',
        teks: 'Photo card lucunya bikin mood naik, kostumnya juga bersih.',
        skor: 10
      }
    ]
  },
  {
    nama: 'Savoyurentcos',
    username: 'savoyurentcos',
    kota: 'Jakarta Pusat, Jakarta',
    post: 76,
    online: 'Online 3 jam lalu',
    foto: 'https://picsum.photos/seed/savoyurentcos/640/360',
    deskripsi:
      'Pemegang stok terbesar karakter One Piece. Sewa paket lengkap dengan prop sword dan gomu-gomu. Bisa pick up langsung di area Senen.',
    rating: 4.8,
    ulasanCount: 33,
    pengikut: 710,
    tokoDibuka: '2023',
    jamOperasional: '08.00 – 20.00 WIB',
    terverifikasi: true,
    review: [
      {
        penulis: 'luffy.fan',
        waktu: '1 pekan lalu',
        teks: 'Propunya gede dan kokoh, sesi foto jadi mantap.',
        skor: 6
      }
    ]
  },
  {
    nama: 'Hayurentcos',
    username: 'hayurentcos',
    kota: 'Bekasi, Jawa Barat',
    post: 41,
    online: 'Online 1 jam lalu',
    foto: 'https://picsum.photos/seed/hayurentcos/640/360',
    deskripsi:
      'Fokus koleksi karakter perempuan dari anime populer seperti Frieren. Harga sewa ramah kantong dengan diskon bundle 2 kostum.',
    rating: 4.7,
    ulasanCount: 19,
    pengikut: 468,
    tokoDibuka: '2023',
    jamOperasional: '09.00 – 19.00 WIB',
    terverifikasi: true,
    review: [
      {
        penulis: 'ami.cos',
        waktu: '3 hari lalu',
        teks: 'Harga ramah dan kostum Frieren-nya pas banget di badan saya.',
        skor: 5
      }
    ]
  },
  {
    nama: 'Kyowan.cosrent',
    username: 'kyowan.cosrent',
    kota: 'Depok, Jawa Barat',
    post: 33,
    online: 'Online 1 jam lalu',
    foto: 'https://picsum.photos/seed/kyowan-cosrent/640/360',
    deskripsi:
      'Rental bundle karakter ganda favorit cosplayer. Spesialis Reverse:1999 dan game mobile ternama. Ada opsi antar jemput area Depok-Jakarta.',
    rating: 4.9,
    ulasanCount: 22,
    pengikut: 389,
    tokoDibuka: '2024',
    jamOperasional: '10.00 – 21.00 WIB',
    terverifikasi: true,
    review: [
      {
        penulis: 'rion.cw',
        waktu: '2 hari lalu',
        teks: 'Bundle-nya jelas, potongan dan penjahitannya konsisten.',
        skor: 6
      }
    ]
  },
  {
    nama: 'MinXin',
    username: 'xinxin.cosurent',
    kota: 'Bogor, Jawa Barat',
    post: 58,
    online: 'Online 2 jam lalu',
    foto: 'https://picsum.photos/seed/xinxin-cosurent/640/360',
    deskripsi:
      'Toko kosplay duo dan trio. Banyak set bundle beberapa karakter sekaligus dengan harga hemat. Cocok buat acara komunitas dan pertunjukan sekolah.',
    rating: 4.8,
    ulasanCount: 37,
    pengikut: 621,
    tokoDibuka: '2023',
    jamOperasional: '09.00 – 20.00 WIB',
    terverifikasi: true,
    review: [
      {
        penulis: 'tita.grp',
        waktu: '1 minggu lalu',
        teks: 'Sewa 3 set sekaligus untuk tampil, semua pas dan rapi.',
        skor: 8
      }
    ]
  },
  {
    nama: 'Howly.rent',
    username: 'howly.rent',
    kota: 'Tangerang Selatan, Banten',
    post: 26,
    online: 'Online 4 jam lalu',
    foto: 'https://picsum.photos/seed/howly-rent/640/360',
    deskripsi:
      'Koleksi kostum marvel dan DC, dari yang simple sampai full armor. Kontrak multiplayer seperti jubah atau cape tersedia satuan.',
    rating: 4.6,
    ulasanCount: 12,
    pengikut: 277,
    tokoDibuka: '2024',
    jamOperasional: '10.00 – 20.00 WIB',
    terverifikasi: true,
    review: [
      {
        penulis: 'spidey.wa',
        waktu: '2 minggu lalu',
        teks: 'Jubahnya jatuh cantik, bahannya adem. Recommended!',
        skor: 4
      }
    ]
  },
  {
    nama: 'Mai Cosrent',
    username: 'mai.cosrent',
    kota: 'Sidoarjo, Jawa Timur',
    post: 44,
    online: 'Online 5 jam lalu',
    foto: 'https://picsum.photos/seed/mai-cosrent/640/360',
    deskripsi:
      'Rental kostum seri bungou dan anime sejenisnya. Free konsultasi ukuran via chat dan bimbingan cara pakai untuk pemula.',
    rating: 4.8,
    ulasanCount: 28,
    pengikut: 534,
    tokoDibuka: '2023',
    jamOperasional: '09.00 – 18.00 WIB',
    terverifikasi: true,
    review: [
      {
        penulis: 'yuhua.cos',
        waktu: '5 hari lalu',
        teks: 'Pemiliknya sabar diajak konsultasi ukuran, hasilnya pas.',
        skor: 7
      }
    ]
  }
];

export function cariCosrent(username: string): Cosrent | undefined {
  return COSRENT.find(item => item.username === username);
}
