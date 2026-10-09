import { CosrentCard } from '@/components/cosrent-card';
import { COSRENT } from '@/data/cosrent';
import { AppLayout } from '@/layouts/app-layout';
import { register } from '@/routes';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function Cosrent() {
  const [kata, setKata] = useState('');

  const hasil = useMemo(() => {
    const cari = kata.trim().toLowerCase();
    if (!cari) return COSRENT;
    return COSRENT.filter(
      item => item.nama.toLowerCase().includes(cari) || item.kota.toLowerCase().includes(cari)
    );
  }, [kata]);

  return (
    <AppLayout>
      <Head title="List Cosrent" />

      <section>
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div data-reveal className="max-w-2xl">
            <h1 className="text-3xl leading-[1.15] font-extrabold tracking-tight text-fg sm:text-4xl">
              List Cosrent
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-dim">
              Temukan penyewa kostum terpercaya di kotamu. Setiap cosrent sudah terverifikasi dengan
              riwayat ulasan dari penyewa sebelumnya.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div data-reveal className="flex items-center gap-3">
            <div className="relative min-w-0 flex-1 sm:max-w-md">
              <Search
                size={16}
                className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-faint"
              />
              <input
                type="text"
                value={kata}
                onChange={event => setKata(event.target.value)}
                placeholder="Cari nama atau kota cosrent..."
                className="w-full rounded-xl border border-line bg-card py-2.5 pr-4 pl-10 text-[13.5px] text-fg placeholder:text-faint focus:border-accent focus:outline-none"
              />
            </div>
            <span className="ml-auto shrink-0 text-[12.5px] font-semibold text-faint">
              {hasil.length} dari {COSRENT.length} cosrent
            </span>
          </div>

          {hasil.length > 0 ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {hasil.map(item => (
                <CosrentCard key={item.username} item={item} />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-line bg-card px-5 py-14 text-center">
              <Search size={28} className="mx-auto text-faint" />
              <p className="mt-3 text-[14.5px] font-bold text-fg">Cosrent tidak ditemukan</p>
              <p className="mt-1 text-[13px] text-dim">
                Coba kata kunci lain untuk nama atau kota.
              </p>
            </div>
          )}

          <div
            data-reveal
            className="mt-10 rounded-3xl border border-line2 bg-raised px-6 py-10 text-center"
          >
            <h2 className="text-xl font-extrabold tracking-tight text-fg sm:text-2xl">
              Buka kosrent-mu sendiri
            </h2>
            <p className="mx-auto mt-2 max-w-md text-[14.5px] text-dim">
              Gratis daftar, tanpa biaya listing. Unggah kostummu dan mulai dapat penghasilan
              tambahan.
            </p>
            <Link
              href={register.url()}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-[14.5px] font-extrabold text-white transition-colors duration-200 hover:bg-accent-hover"
            >
              Daftar Jadi Cosrent
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
