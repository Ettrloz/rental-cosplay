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

export const COSRENT: Cosrent[] = [];

export function cariCosrent(username: string): Cosrent | undefined {
  return COSRENT.find(item => item.username === username);
}
