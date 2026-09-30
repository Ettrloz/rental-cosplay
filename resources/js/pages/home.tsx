import { CosrentCard } from '@/components/cosrent-card';
import { Dropdown } from '@/components/dropdown';
import { EventCard } from '@/components/event-card';
import { FILTER_AWAL, getFilterOptions } from '@/components/filter-bar';
import { ForumRow } from '@/components/forum-row';
import { KostumCard } from '@/components/kostum-card';
import { SectionHead } from '@/components/section-head';
import { COSRENT } from '@/data/cosrent';
import { EVENT } from '@/data/event';
import { FORUM } from '@/data/forum';
import { BUNDLE, KATALOG, TRENDING } from '@/data/katalog';
import { AppLayout } from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

const GENDER_OPTIONS = ['Semua', 'Wanita', 'Pria'] as const;
const URUTAN_OPTIONS = [
  'Terbaru',
  'Harga Terendah',
  'Harga Tertinggi',
  'Paling Banyak Dilihat'
] as const;

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
  const { provinsi, kota } = useMemo(() => getFilterOptions(), []);
  const [kataKunci, setKataKunci] = useState('');
  const [filter, setFilter] = useState<HeroFilter>({
    provinsi: FILTER_AWAL.provinsi,
    kota: FILTER_AWAL.kota,
    gender: 'Semua',
    urutan: 'Terbaru'
  });

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
            <h1 className="text-4xl leading-[1.1] font-extrabold tracking-tight text-white sm:text-5xl">
              Platform Sewa Kostum Cosplay
            </h1>
          </div>

          <form
            data-reveal
            className="mx-auto mt-8 flex max-w-md items-center gap-3 rounded-xl bg-white/6 px-4 py-3.5 text-left ring-1 ring-white/10 transition-shadow focus-within:ring-2 focus-within:ring-[#7c3aed]"
            onSubmit={event => {
              event.preventDefault();
              router.visit(buildKatalogUrl(kataKunci, filter));
            }}
          >
            <Search size={18} className="shrink-0 text-[#6f6f85]" />
            <input
              type="text"
              value={kataKunci}
              onChange={event => setKataKunci(event.target.value)}
              placeholder="Cari karakter, judul kostum, atau series ..."
              className="w-full bg-transparent text-[14.5px] text-white placeholder:text-[#6f6f85] outline-none"
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
              onChange={nilai => pilihFilter({ provinsi: nilai })}
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
              <dt className="text-[12.5px] text-[#6f6f85]">Katalog</dt>
              <dd className="text-2xl font-extrabold text-white tabular-nums">13.280</dd>
            </div>
            <div>
              <dt className="text-[12.5px] text-[#6f6f85]">Cosrent</dt>
              <dd className="text-2xl font-extrabold text-white tabular-nums">587</dd>
            </div>
            <div>
              <dt className="text-[12.5px] text-[#6f6f85]">Kota</dt>
              <dd className="text-2xl font-extrabold text-white tabular-nums">34</dd>
            </div>
            <div>
              <dt className="text-[12.5px] text-[#6f6f85]">Rating</dt>
              <dd className="text-2xl font-extrabold text-white tabular-nums">4,9</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Trending */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHead judul="Trending" selengkapnyaHref="/katalog" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TRENDING.slice(0, 3).map(item => (
              <KostumCard key={item.judul} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Katalog Terbaru */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHead judul="Katalog Terbaru" selengkapnyaHref="/katalog" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {KATALOG.map(item => (
              <KostumCard key={item.judul} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Bundle */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHead judul="Bundle Terbaru" selengkapnyaHref="/katalog" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BUNDLE.map(item => (
              <KostumCard key={item.judul} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* List Cosrent */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHead judul="List Cosrent" selengkapnyaHref="/cosrent" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COSRENT.slice(0, 3).map(item => (
              <CosrentCard key={item.username} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Event */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHead judul="Event Cosplay" selengkapnyaHref="/event" />
          <div className="grid gap-4 sm:grid-cols-2">
            {EVENT.slice(0, 2).map(item => (
              <EventCard key={item.judul} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Forum */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHead judul="Forum" selengkapnyaHref="/forum" />
          <div className="overflow-hidden rounded-2xl border border-white/8">
            {FORUM.slice(0, 3).map(thread => (
              <ForumRow key={thread.judul} thread={thread} />
            ))}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
