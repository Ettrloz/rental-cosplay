export type Komentar = {
  penulis: string;
  waktu: string;
  teks: string;
  skor: number;
};

export type Thread = {
  judul: string;
  kategori: 'Want to Rent' | 'Want to Sell' | 'Diskon' | 'Open Commission' | 'Lainnya';
  penulis: string;
  waktu: string;
  dilihat: number;
  balasan: number;
  skor: number;
  isi: string;
  gambar: string;
  komentar: Komentar[];
};

export const FORUM: Thread[] = [
  {
    judul: 'Lagi cari rental kostum apa?',
    kategori: 'Want to Rent',
    penulis: 'Admin',
    waktu: '1 bulan lalu',
    dilihat: 1670,
    balasan: 3,
    skor: 412,
    isi: 'Halo semuanya! Menjelang musim event, banyak yang cari kostum rental untuk berbagai karakter. Ceritakan di sini kostum apa yang sedang kamu incar dan sertakan budget-nya, biar pemilik cosrent di kotamu bisa mempertimbangkan menambah koleksi. Yang rajin, yang ramai!',
    gambar: 'https://picsum.photos/seed/lagi-cari-rental-kostum-apa/640/360',
    komentar: [
      {
        penulis: 'Admin',
        waktu: '1 bulan lalu',
        teks: 'Contoh: lagi nyari Megurine Luka ukuran S, budget maksimal 150rb.',
        skor: 118
      },
      {
        penulis: 'hana.cos',
        waktu: '3 minggu lalu',
        teks: 'Nyari Venti ukuran L, plus minta opsi jasa rawat + setrika juga boleh.',
        skor: 27
      },
      {
        penulis: 'rei.renter',
        waktu: '2 minggu lalu',
        teks: '+1 buat Luka, kalau ada yang punya sekalian gedein aja jadi bundle.',
        skor: 5
      }
    ]
  },
  {
    judul: 'PAYDAY SALE LUMIERE SUDAH MULAI!',
    kategori: 'Diskon',
    penulis: 'Lumiere.cos.galeria',
    waktu: '4 hari lalu',
    dilihat: 46,
    balasan: 2,
    skor: 12,
    isi: 'Lumiere Cos Galeria payday sale tahun ini sudah mulai! Diskon sampai 25% untuk semua kostum yang ada di katalog. Periode hanya 3 hari ke depan. Gratis ongkir untuk area Jawa Barat. Cek katalog kami sebelum stok ukuran favoritmu habis, jangan sampai kelewat ya!',
    gambar: 'https://picsum.photos/seed/payday-sale-lumiere/640/360',
    komentar: [
      {
        penulis: 'ngopi.dulu',
        waktu: '3 hari lalu',
        teks: 'Savvv, udah nyobain wig-nya belom? Bahan sintetisnya enak gak buat diatur?',
        skor: 3
      },
      {
        penulis: 'Lumiere.cos.galeria',
        waktu: '3 hari lalu',
        teks: '@ngopi.dulu wig masih bersih, sudah disterilkan tiap selesai pemakaian hehe.',
        skor: 2
      }
    ]
  },
  {
    judul: 'JASA EDIT FOTO COSPLAY',
    kategori: 'Open Commission',
    penulis: 'Shie Gallery Edit',
    waktu: '3 minggu lalu',
    dilihat: 87,
    balasan: 3,
    skor: 31,
    isi: 'Buka slot jasa edit foto cosplay: background swap, color grading, retouch skin, sampai compositing sederhana. Mulai 25rb per foto. Lama pengerjaan 2-3 hari tergantung kerumitan. DM untuk portofolio dan daftar harga lengkap!',
    gambar: 'https://picsum.photos/seed/jasa-edit-foto-cosplay/640/360',
    komentar: [
      {
        penulis: 'mei.photogen',
        waktu: '2 minggu lalu',
        teks: 'Backlog sekarang mulainya berapa lama? Butuh buat deadline babak final.',
        skor: 4
      },
      {
        penulis: 'Shie Gallery Edit',
        waktu: '2 minggu lalu',
        teks: '@mei.photogen saat ini masih 5 hari dari slot terakhir~',
        skor: 2
      },
      {
        penulis: 'kana.makeup',
        waktu: '1 minggu lalu',
        teks: 'Rekomended banget, hasilnya rapi dan cara kerja sama senangnya.',
        skor: 9
      }
    ]
  },
  {
    judul: 'Blacklist Customer/Seller Bermasalah',
    kategori: 'Lainnya',
    penulis: 'Admin',
    waktu: '2 bulan lalu',
    dilihat: 1675,
    balasan: 3,
    skor: 243,
    isi: 'Diskusi ini jadi ruang aman untuk berbagi pengalaman dengan customer atau seller bermasalah, dari pembayaran mundur terus, kostum balik dalam keadaan kotor, sampai akun ghosting. Tulis kronologis singkat tanpa doxing nama asli. Aturan: satir boleh, fitnah tidak. Laporkan juga ke DM admin ya.',
    gambar: 'https://picsum.photos/seed/blacklist-customer-seller/640/360',
    komentar: [
      {
        penulis: 'mimi.cos',
        waktu: '6 minggu lalu',
        teks: 'Sempat kena customer yang bilang baju hilang padahal sudah dikirim, untung ada resi.',
        skor: 54
      },
      {
        penulis: 'Admin',
        waktu: '6 minggu lalu',
        teks: '@mimi.cos selalu simpan video packing ya, itu penyelamat dalam kasus begini.',
        skor: 21
      },
      {
        penulis: 'niko.atelier',
        waktu: '5 minggu lalu',
        teks: 'Setuju, dokumentasi packing itu wajib sekarang. Biar aman dua sisi.',
        skor: 8
      }
    ]
  },
  {
    judul: 'Cari partner cosplay untuk event tahun ini',
    kategori: 'Want to Rent',
    penulis: 'hana.cos',
    waktu: '2 hari lalu',
    dilihat: 212,
    balasan: 2,
    skor: 64,
    isi: 'Halo, ada yang mau jadi partner cosplay buat event tahun ini? Rencananya ngambil seri action, bisa duet di stage maupun sekadar walking kasual. Aku biasanya pakai ukuran S-M, siap berbagi biaya sewa dua-duanya. DM aja biar kita diskusi karakter dan jadwal yang cocok!',
    gambar: 'https://picsum.photos/seed/cari-partner-cosplay/640/360',
    komentar: [
      {
        penulis: 'ryo.rental',
        waktu: '2 hari lalu',
        teks: 'Tertarik! Biasanya main di ukuran L, jadwal lo flexible gak?',
        skor: 12
      },
      {
        penulis: 'hana.cos',
        waktu: '1 hari lalu',
        teks: '@ryo.rental flexible, weekend aku selalu tersedia~',
        skor: 4
      }
    ]
  },
  {
    judul: 'Jual velcro murah, sisa stock bahan kostum',
    kategori: 'Want to Sell',
    penulis: 'niko.atelier',
    waktu: '1 minggu lalu',
    dilihat: 156,
    balasan: 2,
    skor: 0,
    isi: 'Sisa stok velcro dari produksi kostum kemarin, masih banyak dan harga murah. Lebar 2cm dan 4cm, warna hitam dan putih. Minat langsung DM, dikirim ke seluruh Indonesia via cargo. Cocok buat yang suka bikin aksesoris atau benerin kostum sendiri.',
    gambar: 'https://picsum.photos/seed/jual-velcro-murah/640/360',
    komentar: [
      {
        penulis: 'woro.workshop',
        waktu: '6 hari lalu',
        teks: 'Ada yang lebar 5cm warna hijau? Lagi cari buat proyek lanyard.',
        skor: 1
      },
      {
        penulis: 'niko.atelier',
        waktu: '6 hari lalu',
        teks: '@woro.workshop belum ada stock, bisa pre-order 1 minggu.',
        skor: 0
      }
    ]
  },
  {
    judul: 'Review kostum JKT48: worth atau skip?',
    kategori: 'Lainnya',
    penulis: 'rei.renter',
    waktu: '5 hari lalu',
    dilihat: 430,
    balasan: 2,
    skor: 118,
    isi: 'Baru selesai nyewa kostum JKT48 buat event kemarin. Ringkas: bahan lumayan tebal, jahitan rapi, tapi rompi-nya pas di pundak. Sewa 3 hari 150rb sudah termasuk wig setting. Worth untuk yang butuh cepat; buat yang nyari referensi, tanya-tanya aja di bawah.',
    gambar: 'https://picsum.photos/seed/review-kostum-jkt48/640/360',
    komentar: [
      {
        penulis: 'hayurentcos',
        waktu: '4 hari lalu',
        teks: 'Setuju, koleksi JKT48 kami juga paling sering disewa buat konser~',
        skor: 30
      },
      {
        penulis: 'rei.renter',
        waktu: '4 hari lalu',
        teks: 'Catatan: warna rok mulai memudar setelah cucian ke-4. Jangan setrika panas.',
        skor: 9
      }
    ]
  },
  {
    judul: 'Buka jasa make up + wig setting di Jakarta',
    kategori: 'Open Commission',
    penulis: 'kana.makeup',
    waktu: '3 hari lalu',
    dilihat: 98,
    balasan: 2,
    skor: 22,
    isi: 'Buka jasa make up dan wig setting untuk event di area Jakarta. Make up karakter mulai 100rb, wig setting mulai 80rb. Bisa datang ke studio atau on location (biaya transport terpisah). Slot event weekend cepat penuh, jadi book dari sekarang ya!',
    gambar: 'https://picsum.photos/seed/jasa-makeup-wig-jakarta/640/360',
    komentar: [
      {
        penulis: 'hana.cos',
        waktu: '2 hari lalu',
        teks: 'Udah pernah pakai, hasil makep-nya tahan lama. 10/10!',
        skor: 6
      },
      {
        penulis: 'kana.makeup',
        waktu: '2 hari lalu',
        teks: '@hana.cos makasih ya kak, sampai ketemu di event!',
        skor: 2
      }
    ]
  },
  {
    judul: 'Diskon 20% semua kostum seri Fate/Stay Night',
    kategori: 'Diskon',
    penulis: 'sabar.rental',
    waktu: '1 hari lalu',
    dilihat: 134,
    balasan: 2,
    skor: 9,
    isi: 'Khusus minggu ini, semua kostum seri Fate/Stay Night diskon 20%. Sengaja biar yang mau nyelesaiin koleksi Saber atau Archer sebelum event. Berlaku untuk pemesanan sebelum akhir bulan ya. Gas before terlambat!',
    gambar: 'https://picsum.photos/seed/diskon-kostum-fate/640/360',
    komentar: [
      {
        penulis: 'rin.lection',
        waktu: '1 hari lalu',
        teks: 'Masih ada ukuran M untuk Saber Alter?',
        skor: 3
      },
      {
        penulis: 'sabar.rental',
        waktu: '1 hari lalu',
        teks: '@rin.lection masih ada 1 slot, langsung chat aja~',
        skor: 1
      }
    ]
  }
];

export const KATEGORI_LABEL: Record<Thread['kategori'], string> = {
  'Want to Rent': 'bg-[#0ea5e9]/12 text-[#38bdf8]',
  'Want to Sell': 'bg-[#10b981]/12 text-[#34d399]',
  Diskon: 'bg-[#f59e0b]/12 text-[#fbbf24]',
  'Open Commission': 'bg-[#8b5cf6]/12 text-[#c084fc]',
  Lainnya: 'bg-chip text-muted'
};

export function slugifyTopik(judul: string): string {
  return judul
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-');
}

export function cariTopik(slug: string): Thread | undefined {
  return FORUM.find(thread => slugifyTopik(thread.judul) === slug);
}
