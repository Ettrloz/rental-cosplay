import { FilterBar, FILTER_AWAL, type FilterState } from '@/components/filter-bar';
import { KostumCard } from '@/components/kostum-card';
import { MOCK_KOSTUM } from '@/data/katalog';
import { AppLayout } from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { PackageOpen } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

function splitKota(kota: string) {
  const [kabupaten, ...rest] = kota.split(', ');
  return { kota: kabupaten, provinsi: rest.join(', ') };
}

function filterFromUrl(url: string): FilterState {
  const params = new URLSearchParams(new URL(url, window.location.origin).search);
  const gender = params.get('gender');
  const urutan = params.get('urutan');

  return {
    provinsi: params.get('provinsi') ?? FILTER_AWAL.provinsi,
    kota: params.get('kota') ?? FILTER_AWAL.kota,
    gender: gender === 'Wanita' || gender === 'Pria' ? gender : 'Semua',
    ukuran: 'Semua',
    urutan:
      urutan === 'Harga Terendah' ||
      urutan === 'Harga Tertinggi' ||
      urutan === 'Paling Banyak Dilihat'
        ? urutan
        : 'Terbaru'
  };
}

export default function Katalog() {
  const { url } = usePage();
  const kataKunci = useMemo(
    () => new URL(url, window.location.origin).searchParams.get('q') ?? '',
    [url]
  );
  const [filter, setFilter] = useState(() => filterFromUrl(url));

  useEffect(() => {
    setFilter(filterFromUrl(url));
  }, [url]);

  const hasil = useMemo(() => {
    let items = MOCK_KOSTUM.filter(item => {
      const { provinsi, kota } = splitKota(item.kota);
      if (filter.provinsi !== 'Semua Provinsi' && provinsi !== filter.provinsi) return false;
      if (filter.kota !== 'Semua Kota' && kota !== filter.kota) return false;
      if (filter.gender !== 'Semua' && item.gender !== filter.gender) return false;
      if (filter.ukuran !== 'Semua') {
        const tokens = item.ukuran.split('-').map(part => part.trim());
        if (!tokens.includes(filter.ukuran)) return false;
      }
      if (kataKunci.trim()) {
        const q = kataKunci.trim().toLowerCase();
        const haystack = [
          item.judul,
          item.karakter,
          item.series,
          item.brand,
          item.pemilik,
          item.kota
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    switch (filter.urutan) {
      case 'Harga Terendah':
        items = [...items].sort((a, b) => a.harga - b.harga);
        break;
      case 'Harga Tertinggi':
        items = [...items].sort((a, b) => b.harga - a.harga);
        break;
      case 'Paling Banyak Dilihat':
        items = [...items].sort((a, b) => b.dilihat - a.dilihat);
        break;
      default:
        break;
    }

    return items;
  }, [filter, kataKunci]);

  return (
    <AppLayout>
      <Head title="Cari Kostum" />

      <section>
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div data-reveal className="max-w-2xl">
            <h1 className="text-3xl leading-[1.15] font-extrabold tracking-tight text-fg sm:text-4xl">
              Cari Kostum Cosplay & Rental
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-dim">
              {kataKunci ? (
                <>
                  Hasil untuk "{kataKunci}": {hasil.length} dari {MOCK_KOSTUM.length} kostum. Filter
                  berdasarkan provinsi, kota, ukuran, gender, dan urutan harga.
                </>
              ) : (
                <>
                  Tampilkan {hasil.length} dari {MOCK_KOSTUM.length} kostum yang tersedia. Filter
                  berdasarkan provinsi, kota, ukuran, gender, dan urutan harga.
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-panel">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <FilterBar value={filter} onChange={setFilter} />
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {hasil.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {hasil.map(item => (
                <KostumCard key={`${item.judul}-${item.username}`} item={item} />
              ))}
            </div>
          ) : (
            <div
              data-reveal
              className="rounded-2xl border border-line bg-card px-6 py-14 text-center"
            >
              <span
                className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-chip text-fade"
                aria-hidden="true"
              >
                <PackageOpen size={26} strokeWidth={1.6} />
              </span>
              <h2 className="mt-4 text-lg font-extrabold text-fg">Belum ada kostum cocok</h2>
              <p className="mx-auto mt-2 max-w-sm text-[14px] text-faint">
                Coba ubah filter provinsi, kota, ukuran, atau gender untuk melihat lebih banyak
                hasil.
              </p>
            </div>
          )}
        </div>
      </section>
    </AppLayout>
  );
}
