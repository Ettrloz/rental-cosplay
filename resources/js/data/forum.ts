export type Thread = {
  judul: string;
  kategori: 'Want to Rent' | 'Want to Sell' | 'Diskon' | 'Open Commission' | 'Lainnya';
  penulis: string;
  waktu: string;
  dilihat: number;
  balasan: number;
};

export const FORUM: Thread[] = [
  {
    judul: 'Lagi cari rental kostum apa?',
    kategori: 'Want to Rent',
    penulis: 'Admin',
    waktu: '1 bulan lalu',
    dilihat: 1670,
    balasan: 198
  },
  {
    judul: 'PAYDAY SALE LUMIERE SUDAH MULAI!',
    kategori: 'Diskon',
    penulis: 'Lumiere.cos.galeria',
    waktu: '4 hari lalu',
    dilihat: 46,
    balasan: 0
  },
  {
    judul: 'JASA EDIT FOTO COSPLAY',
    kategori: 'Open Commission',
    penulis: 'Shie Gallery Edit',
    waktu: '3 minggu lalu',
    dilihat: 87,
    balasan: 12
  },
  {
    judul: 'Blacklist Customer/Seller Bermasalah',
    kategori: 'Lainnya',
    penulis: 'Admin',
    waktu: '2 bulan lalu',
    dilihat: 1675,
    balasan: 46
  }
];

export const KATEGORI_LABEL: Record<Thread['kategori'], string> = {
  'Want to Rent': 'bg-[#0ea5e9]/12 text-[#38bdf8]',
  'Want to Sell': 'bg-[#10b981]/12 text-[#34d399]',
  Diskon: 'bg-[#f59e0b]/12 text-[#fbbf24]',
  'Open Commission': 'bg-[#8b5cf6]/12 text-[#c084fc]',
  Lainnya: 'bg-white/6 text-[#a1a1b5]'
};
