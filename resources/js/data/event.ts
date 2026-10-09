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

export const EVENT: JadwalEvent[] = [];

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
