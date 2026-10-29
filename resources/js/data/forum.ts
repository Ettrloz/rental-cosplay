export type KategoriForum =
  'Want to Rent' | 'Want to Sell' | 'Diskon' | 'Open Commission' | 'Lainnya';

export type Thread = {
  id: number;
  slug: string;
  judul: string;
  kategori: KategoriForum;
  isi: string;
  gambar: string | null;
  penulis: string;
  userId: number;
  waktu: string;
  dilihat: number;
  balasan: number;
  skor: number;
  vote: 1 | -1 | null;
  disimpan: boolean;
};

export type Komentar = {
  id: number;
  teks: string;
  penulis: string;
  userId: number;
  waktu: string;
  skor: number;
  vote: 1 | -1 | null;
};

export const KATEGORI_FORUM: KategoriForum[] = [
  'Want to Rent',
  'Want to Sell',
  'Diskon',
  'Open Commission',
  'Lainnya'
];

export const KATEGORI_LABEL: Record<KategoriForum, string> = {
  'Want to Rent': 'bg-[#0ea5e9]/12 text-[#38bdf8]',
  'Want to Sell': 'bg-[#10b981]/12 text-[#34d399]',
  Diskon: 'bg-[#f59e0b]/12 text-[#fbbf24]',
  'Open Commission': 'bg-[#8b5cf6]/12 text-[#c084fc]',
  Lainnya: 'bg-chip text-muted'
};
