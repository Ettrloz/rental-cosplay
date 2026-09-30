export type JadwalEvent = {
  judul: string;
  tanggal: string;
  penyelenggara: string;
  lokasi: string;
};

export const EVENT: JadwalEvent[] = [
  {
    judul: 'Yogyakomtek x Neocon Cosplay Competition',
    tanggal: '26-30 Sep 2026',
    penyelenggara: 'Apkom Jogja x Neocon.id',
    lokasi: 'Bantul, Yogyakarta'
  },
  {
    judul: 'Indonesia Comic Con 2026',
    tanggal: '3-4 Okt 2026',
    penyelenggara: 'Panorama Media',
    lokasi: 'Jakarta Utara, Jakarta'
  },
  {
    judul: 'Midori Festival 5',
    tanggal: '3-4 Okt 2026',
    penyelenggara: 'Shiawase Organizer',
    lokasi: 'Jakarta Pusat, Jakarta'
  },
  {
    judul: 'Hikari No Hi',
    tanggal: '4 Okt 2026',
    penyelenggara: 'Hikari Team PLG',
    lokasi: 'Palembang, Sumatera Selatan'
  }
];
