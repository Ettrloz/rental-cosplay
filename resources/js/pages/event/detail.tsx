import { KomentarSection } from '@/components/komentar-section';
import { useToast } from '@/components/toast';
import { cariEvent } from '@/data/event';
import { AppLayout } from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import {
  ArrowLeft,
  Bookmark,
  CalendarDays,
  Check,
  CircleDollarSign,
  Clock,
  MapPin,
  Share2,
  Ticket,
  Users
} from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

const aksi =
  'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-bold text-dim transition-colors hover:bg-chip hover:text-fg';

export default function DetailEvent() {
  const { url } = usePage();
  const item = cariEvent(decodeURIComponent(url.split('/').pop() ?? ''));

  const [tersimpan, setTersimpan] = useState(false);
  const { panggil, toast } = useToast();

  if (!item) {
    return (
      <AppLayout>
        <Head title="Event tidak ditemukan" />
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-chip text-fade">
            <CalendarDays size={28} />
          </div>
          <h1 className="mt-5 text-xl font-extrabold text-fg">Event tidak ditemukan</h1>
          <p className="mt-1.5 text-[13.5px] text-dim">Event sudah berakhir atau URL-nya salah.</p>
          <Link
            href="/event"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-[13.5px] font-extrabold text-white transition-colors hover:bg-accent-hover"
          >
            <ArrowLeft size={15} />
            Kembali ke jadwal event
          </Link>
        </div>
      </AppLayout>
    );
  }

  const linkEvent = `/event/${url.split('/').pop()}`;

  function bagikan() {
    const link = `${window.location.origin}${linkEvent}`;
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(link)
        .then(() => panggil('Link event disalin'))
        .catch(() => panggil('Salin link dari URL halaman'));
    } else {
      panggil('Salin link dari URL halaman');
    }
  }

  const spesifikasi = [
    { label: 'Tanggal', nilai: item.tanggal, ikon: CalendarDays },
    { label: 'Jam', nilai: item.jam, ikon: Clock },
    { label: 'Harga', nilai: item.harga, ikon: CircleDollarSign },
    { label: 'Tiket', nilai: 'On the spot / online', ikon: Ticket },
    { label: 'Venue', nilai: item.venue, ikon: MapPin },
    { label: 'Penyelenggara', nilai: item.penyelenggara, ikon: Users }
  ];

  return (
    <AppLayout>
      <Head title={item.judul} />
      <section className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
        <Link
          href="/event"
          className="inline-flex items-center gap-1.5 text-[13px] font-bold text-dim transition-colors hover:text-accent-text"
        >
          <ArrowLeft size={15} />
          Kembali ke jadwal event
        </Link>

        <article
          data-reveal
          className="mt-5 overflow-hidden rounded-3xl border border-line bg-card"
        >
          <div className="relative aspect-[16/7]">
            <img
              src={item.gambar}
              alt={item.judul}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <span className="absolute top-4 left-4 rounded-full bg-black/55 px-3 py-1.5 text-[12px] font-extrabold text-white backdrop-blur-sm">
              {item.tanggal}
            </span>
          </div>

          <div className="p-5 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h1 className="text-2xl leading-tight font-extrabold tracking-tight text-fg">
                  {item.judul}
                </h1>
                <p className="mt-1.5 flex items-center gap-1.5 text-[13px] font-semibold text-dim">
                  <MapPin size={14} />
                  {item.penyelenggara} — {item.lokasi}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button type="button" onClick={bagikan} className={aksi}>
                  <Share2 size={14} />
                  Bagikan
                </button>
                <button
                  type="button"
                  onClick={() => setTersimpan(disimpan => !disimpan)}
                  className={clsx(aksi, tersimpan && 'text-accent-text hover:text-accent-text')}
                >
                  {tersimpan ? <Check size={14} /> : <Bookmark size={14} />}
                  {tersimpan ? 'Tersimpan' : 'Simpan'}
                </button>
              </div>
            </div>

            <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {spesifikasi.map(row => {
                const Ikon = row.ikon;
                return (
                  <div key={row.label} className="flex items-center gap-3 bg-card px-4 py-3">
                    <Ikon size={16} className="shrink-0 text-accent-text" />
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold tracking-wide text-fade uppercase">
                        {row.label}
                      </p>
                      <p className="truncate text-[13.5px] font-bold text-fg">{row.nilai}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-5 text-[14.5px] leading-relaxed text-fg2">{item.isi}</p>

            <div className="mt-6">
              <button
                type="button"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-[14.5px] font-extrabold text-white transition-colors duration-200 hover:bg-accent-hover sm:w-auto sm:min-w-48"
              >
                <Ticket size={16} />
                Beli Tiket Sekarang
              </button>
            </div>
          </div>
        </article>

        <div className="mt-8">
          <KomentarSection komentarAwal={item.komentar} />
        </div>
      </section>

      {toast}
    </AppLayout>
  );
}
