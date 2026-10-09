import {
  Crown,
  Gem,
  Layers,
  ShieldCheck,
  Sparkles,
  Star,
  Wand2,
  Zap,
  type LucideIcon
} from 'lucide-react';

export const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0
});

export const UKURAN = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const;

export type Kostum = {
  judul: string;
  harga: number;
  hargaCoret?: number;
  brand: string;
  series: string;
  karakter: string;
  ukuran: string;
  ld: string;
  lp: string;
  gender: 'Wanita' | 'Pria';
  kota: string;
  pemilik: string;
  username: string;
  dilihat: number;
  icon: LucideIcon;
  bundle?: boolean;
};

export const TRENDING: Kostum[] = [
  {
    judul: 'Selena Gothic Cursed ver. (Elite skin)',
    harga: 80000,
    brand: 'Maker Lokal',
    series: 'Mobile Legends: Bang Bang',
    karakter: 'Selena',
    ukuran: 'M - L',
    ld: '90-94',
    lp: '78-80',
    gender: 'Wanita',
    kota: 'Surabaya, Jawa Timur',
    pemilik: 'Kmint Rent',
    username: 'kmint.rentsby',
    dilihat: 1240,
    icon: Sparkles
  },
  {
    judul: 'Rental Kostum Dazai Osamu',
    harga: 75000,
    brand: 'Wudu',
    series: 'Bungou Stray Dogs',
    karakter: 'Osamu Dazai',
    ukuran: 'M',
    ld: '88-92',
    lp: '74-78',
    gender: 'Pria',
    kota: 'Sidoarjo, Jawa Timur',
    pemilik: 'Mai Cosrent',
    username: 'mai.cosrent',
    dilihat: 980,
    icon: Wand2
  },
  {
    judul: 'Kostum Silk spider Marvel',
    harga: 100000,
    brand: 'No Brand / Freebrand',
    series: 'Marvel',
    karakter: 'Spider Woman',
    ukuran: 'XXL - XXXL',
    ld: '100-115',
    lp: '90-115',
    gender: 'Wanita',
    kota: 'Tangerang Selatan, Banten',
    pemilik: 'Howly.rent',
    username: 'howly.rent',
    dilihat: 860,
    icon: Zap
  },
  {
    judul: 'Kostum frieren',
    harga: 95000,
    brand: 'No Brand / Freebrand',
    series: 'Frieren Beyond Journey',
    karakter: 'Frieren',
    ukuran: 'S - M',
    ld: '84-88',
    lp: '70-74',
    gender: 'Wanita',
    kota: 'Bekasi, Jawa Barat',
    pemilik: 'Hayurentcos',
    username: 'hayurentcos',
    dilihat: 740,
    icon: Layers
  },
  {
    judul: 'LUFFY ONE PIECE EGGHEAD ARC',
    harga: 160000,
    brand: 'CosplayFM',
    series: 'One Piece',
    karakter: 'Monkey D. Luffy',
    ukuran: 'All Size',
    ld: '90-110',
    lp: '72-92',
    gender: 'Pria',
    kota: 'Jakarta Pusat, Jakarta',
    pemilik: 'Savoyurentcos',
    username: 'savoyurentcos',
    dilihat: 1950,
    icon: Crown
  },
  {
    judul: 'Chris Redfield RE8 Village',
    harga: 95000,
    brand: 'Maker Lokal',
    series: 'Resident Evil',
    karakter: 'Chris Redfield',
    ukuran: 'XXL',
    ld: '102-110',
    lp: '88-96',
    gender: 'Pria',
    kota: 'Sumedang, Jawa Barat',
    pemilik: 'Medh',
    username: 'meichi.rentcos',
    dilihat: 620,
    icon: Gem
  }
];

export const KATALOG: Kostum[] = [
  {
    judul: 'Leon Scott Kennedy as Nightwing',
    harga: 100000,
    brand: 'Maker Lokal',
    series: 'Resident Evil',
    karakter: 'Leon Scott Kennedy',
    ukuran: 'XL',
    ld: '96-104',
    lp: '82-90',
    gender: 'Pria',
    kota: 'Sumedang, Jawa Barat',
    pemilik: 'Medh',
    username: 'meichi.rentcos',
    dilihat: 510,
    icon: ShieldCheck
  },
  {
    judul: 'Luuk herssen Wuthering Waves',
    harga: 175000,
    brand: 'No Brand / Freebrand',
    series: 'Wuthering Waves',
    karakter: 'Luuk Herssen',
    ukuran: 'L',
    ld: '94-100',
    lp: '78-84',
    gender: 'Pria',
    kota: 'Demak, Jawa Tengah',
    pemilik: 'Beecosrent',
    username: 'beecosrent',
    dilihat: 445,
    icon: Wand2
  },
  {
    judul: 'Hatsune Miku onmyoji',
    harga: 95000,
    brand: 'Kakacat',
    series: 'Onmyoji',
    karakter: 'Hatsune Miku',
    ukuran: 'S',
    ld: '80-84',
    lp: '66-70',
    gender: 'Wanita',
    kota: 'Jakarta Barat, Jakarta',
    pemilik: 'Beecosrent',
    username: 'beecosrent',
    dilihat: 390,
    icon: Sparkles
  },
  {
    judul: 'March 7th Honkai Star Rail The Hunt',
    harga: 85000,
    brand: 'Wudu',
    series: 'Honkai: Star Rail',
    karakter: 'March 7th',
    ukuran: 'M',
    ld: '86-90',
    lp: '72-76',
    gender: 'Wanita',
    kota: 'Jakarta Barat, Jakarta',
    pemilik: 'Beecosrent',
    username: 'beecosrent',
    dilihat: 610,
    icon: Star
  }
];

export const BUNDLE: Kostum[] = [
  {
    judul: 'Sonetto dan Matilda',
    harga: 170000,
    hargaCoret: 180000,
    brand: 'No Brand / Freebrand',
    series: 'Reverse: 1999',
    karakter: 'Matilda & Sonetto',
    ukuran: 'S - M',
    ld: '84-90',
    lp: '70-76',
    gender: 'Wanita',
    kota: 'Depok, Jawa Barat',
    pemilik: 'Kyowan.cosrent',
    username: 'kyowan.cosrent',
    dilihat: 705,
    icon: Layers,
    bundle: true
  },
  {
    judul: 'Set Bundle Caitvi Caitlyn Vi Arcane',
    harga: 245000,
    hargaCoret: 255000,
    brand: 'No Brand / Freebrand',
    series: 'League of Legends',
    karakter: 'Caitlyn & Vi',
    ukuran: 'M - L',
    ld: '88-96',
    lp: '74-82',
    gender: 'Wanita',
    kota: 'Bogor, Jawa Barat',
    pemilik: 'MinXin',
    username: 'xinxin.cosurent',
    dilihat: 830,
    icon: Crown,
    bundle: true
  },
  {
    judul: 'Set Bundle Harumichi Sailor Uranus Neptunus',
    harga: 224000,
    hargaCoret: 240000,
    brand: 'No Brand / Freebrand',
    series: 'Sailor Moon',
    karakter: 'Haruka Tenou & Michiru Kaiou',
    ukuran: 'M - L',
    ld: '88-94',
    lp: '72-80',
    gender: 'Wanita',
    kota: 'Bogor, Jawa Barat',
    pemilik: 'MinXin',
    username: 'xinxin.cosurent',
    dilihat: 540,
    icon: Gem,
    bundle: true
  }
];

export const MOCK_KOSTUM: Kostum[] = [...TRENDING, ...KATALOG, ...BUNDLE];

export function slugifyKostum(judul: string): string {
  return judul
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/[\s-]+/g, '-');
}

export function cariKostum(slug: string): Kostum | undefined {
  return MOCK_KOSTUM.find(item => slugifyKostum(item.judul) === slug);
}

export function deskripsiKostum(item: Kostum): string {
  const seri = item.series !== item.karakter ? ` dari seri *${item.series}*` : '';
  const ukuran = item.ukuran !== 'All Size' ? `${item.ukuran}` : 'semua ukuran';
  const bagian = [
    `Sewa kostum *${item.karakter}*${seri} dengan brand ${item.brand}.`,
    `Tersedia ukuran ${ukuran} (LD ${item.ld} cm, LP ${item.lp} cm) dan cocok untuk gender ${item.gender}.`,
    item.bundle
      ? 'Ini adalah paket bundle: satu harga sudah termasuk beberapa karakter dalam satu set lengkap.'
      : 'Penyewaan per 3 hari, tanpa minimum, dengan pengembalian gratis.',
    `Kostum dikelola oleh ${item.pemilik} (@${item.username}) dari ${item.kota}.`
  ];

  return bagian.join(' ');
}
