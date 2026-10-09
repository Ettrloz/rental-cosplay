import { AppLayout } from '@/layouts/app-layout';
import { cariKostum, deskripsiKostum, rupiah } from '@/data/katalog';
import { usePage, Link, Head } from '@inertiajs/react';
import {
  ArrowLeft,
  Eye,
  MapPin,
  MessageCircle,
  PackageOpen,
  Ruler,
  ShieldCheck,
  Star
} from 'lucide-react';
import type { ReactNode } from 'react';

function renderDeskripsi(teks: string): ReactNode {
  return teks
    .split('*')
    .map((bagian, i) => (i % 2 === 1 ? <strong key={i}>{bagian}</strong> : bagian));
}

export default function DetailKostum() {
  const { url } = usePage();
  const item = cariKostum(decodeURIComponent(url.split('/').pop() ?? ''));

  if (!item) {
    return (
      <AppLayout>
        <Head title="Kostum tidak ditemukan" />
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-chip text-fade">
            <PackageOpen size={28} />
          </div>
          <h1 className="mt-5 text-xl font-extrabold text-fg">Kostum tidak ditemukan</h1>
          <p className="mt-1.5 text-[13.5px] text-dim">
            Kostum yang kamu cari sudah tidak tersedia atau URL-nya salah.
          </p>
          <Link
            href="/katalog"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-[13.5px] font-extrabold text-white transition-colors hover:bg-accent-hover"
          >
            <ArrowLeft size={15} />
            Kembali ke katalog
          </Link>
        </div>
      </AppLayout>
    );
  }

  const Icon = item.icon;
  const spesifikasi: { label: string; nilai: string }[] = [
    { label: 'Brand', nilai: item.brand },
    { label: 'Series', nilai: item.series },
    { label: 'Karakter', nilai: item.karakter },
    { label: 'Ukuran', nilai: item.ukuran },
    { label: 'Lingkar Dada', nilai: `${item.ld} cm` },
    { label: 'Lingkar Pinggang', nilai: `${item.lp} cm` },
    { label: 'Gender', nilai: item.gender },
    { label: 'Kota', nilai: item.kota }
  ];

  return (
    <AppLayout>
      <Head title={item.judul} />
      <section className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <Link
          href="/katalog"
          className="inline-flex items-center gap-1.5 text-[13px] font-bold text-dim transition-colors hover:text-accent-text"
        >
          <ArrowLeft size={15} />
          Kembali ke katalog
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,34%)_minmax(0,66%)]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-3xl border border-line bg-card2">
              {item.bundle ? (
                <span className="absolute top-4 left-4 rounded-full bg-[#fbbf24] px-2.5 py-1 text-[11px] font-extrabold text-[#3b2606]">
                  Bundle
                </span>
              ) : null}
              <Icon
                size={72}
                strokeWidth={1.5}
                className="text-fade transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-line bg-card p-4">
                <dt className="flex items-center gap-1.5 text-[11px] font-bold tracking-wide text-fade uppercase">
                  <Ruler size={13} />
                  Ukuran
                </dt>
                <dd className="mt-1.5 text-lg font-extrabold text-fg">{item.ukuran}</dd>
              </div>
              <div className="rounded-2xl border border-line bg-card p-4">
                <dt className="flex items-center gap-1.5 text-[11px] font-bold tracking-wide text-fade uppercase">
                  <Eye size={13} />
                  Dilihat
                </dt>
                <dd className="mt-1.5 text-lg font-extrabold text-fg">
                  {item.dilihat.toLocaleString('id-ID')}
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-chip px-3 py-1 text-[12px] font-bold text-fg2">
              <span
                className="grid h-5 w-5 place-items-center rounded-full bg-accent-soft text-[9px] font-extrabold text-accent-text"
                aria-hidden="true"
              >
                {item.pemilik.charAt(0)}
              </span>
              @{item.username}
            </span>
            <h1 className="mt-3 text-2xl leading-snug font-extrabold tracking-tight text-fg sm:text-3xl">
              {item.judul}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-[13px] font-semibold text-dim">
              <MapPin size={14} />
              {item.pemilik} — {item.kota}
            </p>

            <div className="mt-4 flex items-baseline gap-2.5">
              <span className="text-[26px] font-extrabold text-accent-text">
                {rupiah.format(item.harga)}
              </span>
              <span className="text-[13.5px] font-semibold text-faint">/ 3 hari</span>
              {item.hargaCoret ? (
                <span className="text-[15px] font-medium text-fade line-through">
                  {rupiah.format(item.hargaCoret)}
                </span>
              ) : null}
            </div>

            <p className="mt-5 text-[14px] leading-relaxed text-fg2">
              {renderDeskripsi(deskripsiKostum(item))}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 min-w-40 text-[14.5px] font-extrabold text-white transition-colors duration-200 hover:bg-accent-hover"
              >
                <ShieldCheck size={16} />
                Sewa Sekarang
              </button>
              <button
                type="button"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-chip px-5 py-3 min-w-40 text-[14.5px] font-extrabold text-fg transition-colors duration-200 hover:border-line2"
              >
                <MessageCircle size={16} />
                Chat Pemilik
              </button>
            </div>

            <div className="mt-8">
              <h2 className="flex items-center gap-2 text-[12px] font-bold tracking-wider text-faint uppercase">
                <Star size={14} />
                Spesifikasi
              </h2>
              <dl className="mt-3 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
                {spesifikasi.map(row => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-4 bg-card px-4 py-3 text-[13.5px]"
                  >
                    <dt className="shrink-0 font-semibold text-fade">{row.label}</dt>
                    <dd className="truncate text-right font-bold text-fg">{row.nilai}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
