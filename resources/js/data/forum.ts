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

export const FORUM: Thread[] = [];

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
