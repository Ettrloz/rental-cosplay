import { FILTER_AWAL, FilterBar, type FilterState } from '@/components/filter-bar';
import { KostumCard } from '@/components/kostum-card';
import { useKostumList } from '@/hooks/use-kostum';
import { AppLayout } from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, PackageOpen } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

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
  const [page, setPage] = useState(1);

  useEffect(() => {
    setFilter(filterFromUrl(url));
    setPage(1);
  }, [url]);

  const ubahFilter = (next: FilterState) => {
    setFilter(next);
    setPage(1);
  };

  const apiUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (kataKunci.trim()) params.set('q', kataKunci.trim());
    if (filter.provinsi !== FILTER_AWAL.provinsi) params.set('provinsi', filter.provinsi);
    if (filter.kota !== FILTER_AWAL.kota) params.set('kota', filter.kota);
    if (filter.gender !== 'Semua') params.set('gender', filter.gender);
    if (filter.ukuran !== 'Semua') params.set('ukuran', filter.ukuran);
    if (filter.urutan !== 'Terbaru') params.set('urutan', filter.urutan);
    if (page > 1) params.set('page', String(page));
    return `/api/costumes?${params.toString()}`;
  }, [filter, kataKunci, page]);

  const { items: hasil, loading, meta } = useKostumList(apiUrl);

  const totalHalaman = meta?.last_page ?? 1;
  const total = meta?.total ?? hasil.length;

  const pindahHalaman = (tujuan: number) => {
    setPage(Math.min(Math.max(tujuan, 1), totalHalaman));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
              {kataKunci ? <>Hasil untuk "{kataKunci}": </> : null}
              Menampilkan {hasil.length} dari {total} kostum yang tersedia. Filter berdasarkan
              provinsi, kota, ukuran, gender, dan urutan harga.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-panel">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <FilterBar value={filter} onChange={ubahFilter} />
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
          ) : loading ? (
            <p className="text-[14px] text-faint">Memuat data...</p>
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

          {totalHalaman > 1 ? (
            <nav
              className="mt-10 flex items-center justify-center gap-3"
              aria-label="Halaman kostum"
            >
              <button
                type="button"
                onClick={() => pindahHalaman(page - 1)}
                disabled={page <= 1 || loading}
                className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-card px-4 py-2.5 text-[13.5px] font-bold text-fg transition-colors hover:border-line2 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={16} />
                Sebelumnya
              </button>
              <span className="text-[13px] font-semibold text-faint tabular-nums">
                Halaman {page} dari {totalHalaman}
              </span>
              <button
                type="button"
                onClick={() => pindahHalaman(page + 1)}
                disabled={page >= totalHalaman || loading}
                className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-card px-4 py-2.5 text-[13.5px] font-bold text-fg transition-colors hover:border-line2 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Berikutnya
                <ChevronRight size={16} />
              </button>
            </nav>
          ) : null}
        </div>
      </section>
    </AppLayout>
  );
}
