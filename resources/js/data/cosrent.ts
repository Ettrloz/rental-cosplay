import type { Komentar } from '@/data/forum';

export type Cosrent = {
  id?: number;
  nama: string;
  username: string;
  kota: string;
  cityId?: number | null;
  instagram?: string | null;
  whatsapp?: string | null;
  post: number;
  online: string;
  foto: string;
  thumbnail?: string | null;
  bio?: string | null;
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
