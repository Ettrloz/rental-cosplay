import type { LucideIcon } from 'lucide-react';

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

export const TRENDING: Kostum[] = [];

export const KATALOG: Kostum[] = [];

export const BUNDLE: Kostum[] = [];

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
