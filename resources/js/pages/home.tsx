import { CosrentCard } from '@/components/cosrent-card';
import { Dropdown } from '@/components/dropdown';
import { EventCard } from '@/components/event-card';
import { FILTER_AWAL, useLokasiOptions } from '@/components/filter-bar';
import { ForumPost } from '@/components/forum-post';
import { KostumCard } from '@/components/kostum-card';
import { SectionHead } from '@/components/section-head';
import { EVENT } from '@/data/event';
import { FORUM } from '@/data/forum';
import { BUNDLE } from '@/data/katalog';
import { useCosrentList } from '@/hooks/use-cosrent';
import { useKostumList, useStats } from '@/hooks/use-kostum';
import { AppLayout } from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useState } from 'react';

const GENDER_OPTIONS = ['Semua', 'Wanita', 'Pria'] as const;
const URUTAN_OPTIONS = [
  'Terbaru',
  'Harga Terendah',
  'Harga Tertinggi',
  'Paling Banyak Dilihat'
] as const;

const angka = new Intl.NumberFormat('id-ID');

type HeroFilter = {
  provinsi: string;
  kota: string;
  gender: string;
  urutan: string;
};

function buildKatalogUrl(kataKunci: string, filter: HeroFilter) {
  const params = new URLSearchParams();
  if (kataKunci.trim()) params.set('q', kataKunci.trim());
  if (filter.provinsi !== FILTER_AWAL.provinsi) params.set('provinsi', filter.provinsi);
  if (filter.kota !== FILTER_AWAL.kota) params.set('kota', filter.kota);
  if (filter.gender !== 'Semua') params.set('gender', filter.gender);
  if (filter.urutan !== 'Terbaru') params.set('urutan', filter.urutan);
  const query = params.toString();
  return `/katalog${query ? `?${query}` : ''}`;
}

export default function Home() {
  const [kataKunci, setKataKunci] = useState('');
  const [filter, setFilter] = useState<HeroFilter>({
    provinsi: FILTER_AWAL.provinsi,
    kota: FILTER_AWAL.kota,
    gender: 'Semua',
    urutan: 'Terbaru'
  });
  const { provinsi, kota } = useLokasiOptions(filter.provinsi);
  const stats = useStats();
  const trending = useKostumList('/api/costumes/trending');
  const katalog = useKostumList('/api/costumes/latest');
  const cosrent = useCosrentList();

  const pilihFilter = (patch: Partial<HeroFilter>) => {
    const next = { ...filter, ...patch };
    setFilter(next);
    router.visit(buildKatalogUrl(kataKunci, next));
  };

  return (
    <AppLayout>
      <Head title="Platform Sewa Kostum Cosplay" />

      {/* Hero */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6 sm:py-20">
          <div data-reveal className="mx-auto max-w-2xl">
            <h1 className="text-4xl leading-[1.1] font-extrabold tracking-tight text-fg sm:text-5xl">
              Platform Sewa Kostum Cosplay
            </h1>
          </div>

          <form
            data-reveal
            className="mx-auto mt-8 flex max-w-md items-center gap-3 rounded-xl bg-chip px-4 py-3.5 text-left ring-1 ring-line2 transition-shadow focus-within:ring-2 focus-within:ring-accent"
            onSubmit={event => {
              event.preventDefault();
              router.visit(buildKatalogUrl(kataKunci, filter));
            }}
          >
            <Search size={18} className="shrink-0 text-faint" />
            <input
              type="text"
              value={kataKunci}
              onChange={event => setKataKunci(event.target.value)}
              placeholder="Cari karakter, judul kostum, atau series ..."
              className="w-full bg-transparent text-[14.5px] text-fg placeholder:text-faint outline-none"
            />
          </form>

          <div
            data-reveal
            className="mx-auto mt-4 grid max-w-3xl gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            <Dropdown
              label="Provinsi"
              value={filter.provinsi}
              options={[FILTER_AWAL.provinsi, ...provinsi]}
              onChange={nilai => pilihFilter({ provinsi: nilai, kota: FILTER_AWAL.kota })}
            />
            <Dropdown
              label="Kota"
              value={filter.kota}
              options={[FILTER_AWAL.kota, ...kota]}
              onChange={nilai => pilihFilter({ kota: nilai })}
            />
            <Dropdown
              label="Gender"
              value={filter.gender}
              options={GENDER_OPTIONS}
              onChange={nilai => pilihFilter({ gender: nilai })}
            />
            <Dropdown
              label="Urutan"
              value={filter.urutan}
              options={URUTAN_OPTIONS}
              onChange={nilai => pilihFilter({ urutan: nilai })}
            />
          </div>

          <dl className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-4" data-reveal>
            <div>
              <dt className="text-[12.5px] text-faint">Katalog</dt>
              <dd className="text-2xl font-extrabold text-fg tabular-nums">
                {stats ? angka.format(stats.costumes) : '-'}
              </dd>
            </div>
            <div>
              <dt className="text-[12.5px] text-faint">Cosrent</dt>
              <dd className="text-2xl font-extrabold text-fg tabular-nums">
                {stats ? angka.format(stats.cosrents) : '-'}
              </dd>
            </div>
            <div>
              <dt className="text-[12.5px] text-faint">Kota</dt>
              <dd className="text-2xl font-extrabold text-fg tabular-nums">
                {stats ? angka.format(stats.cities) : '-'}
              </dd>
            </div>
            <div>
              <dt className="text-[12.5px] text-faint">Rating</dt>
              <dd className="text-2xl font-extrabold text-fg tabular-nums">
                {stats?.rating != null ? String(stats.rating).replace('.', ',') : '-'}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Trending */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHead judul="Trending" selengkapnyaHref="/katalog" />
          {trending.items.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {trending.items.slice(0, 3).map(item => (
                <KostumCard key={item.judul} item={item} />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-[13px] text-faint">
              {trending.loading ? 'Memuat data...' : 'Belum ada data yang tersedia.'}
            </p>
          )}
        </div>
      </section>

      {/* Katalog Terbaru */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHead judul="Katalog Terbaru" selengkapnyaHref="/katalog" />
          {katalog.items.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {katalog.items.map(item => (
                <KostumCard key={item.judul} item={item} />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-[13px] text-faint">
              {katalog.loading ? 'Memuat data...' : 'Belum ada data yang tersedia.'}
            </p>
          )}
        </div>
      </section>

      {/* Bundle */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHead judul="Bundle Terbaru" selengkapnyaHref="/katalog" />
          {BUNDLE.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {BUNDLE.map(item => (
                <KostumCard key={item.judul} item={item} />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-[13px] text-faint">Belum ada data yang tersedia.</p>
          )}
        </div>
      </section>

      {/* List Cosrent */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHead judul="List Cosrent" selengkapnyaHref="/cosrent" />
          {cosrent.items.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cosrent.items.slice(0, 3).map(item => (
                <CosrentCard key={item.username} item={item} />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-[13px] text-faint">
              {cosrent.loading ? 'Memuat data...' : 'Belum ada data yang tersedia.'}
            </p>
          )}
        </div>
      </section>

      {/* Event */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHead judul="Event Cosplay" selengkapnyaHref="/event" />
          {EVENT.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {EVENT.slice(0, 2).map(item => (
                <EventCard key={item.judul} item={item} />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-[13px] text-faint">Belum ada data yang tersedia.</p>
          )}
        </div>
      </section>

      {/* Forum */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHead judul="Forum" selengkapnyaHref="/forum" />
          {FORUM.length > 0 ? (
            <div className="flex flex-col gap-3">
              {FORUM.slice(0, 3).map(thread => (
                <ForumPost key={thread.judul} thread={thread} />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-[13px] text-faint">Belum ada data yang tersedia.</p>
          )}
        </div>
      </section>
    </AppLayout>
  );
}
