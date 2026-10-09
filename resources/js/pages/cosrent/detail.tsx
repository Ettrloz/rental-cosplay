import { KostumCard } from '@/components/kostum-card';
import { KomentarSection } from '@/components/komentar-section';
import { useToast } from '@/components/toast';
import { cariCosrent } from '@/data/cosrent';
import { MOCK_KOSTUM } from '@/data/katalog';
import { AppLayout } from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Clock,
  MapPin,
  MessageCircle,
  PackageOpen,
  ShieldCheck,
  Star,
  UserPlus,
  Users
} from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

export default function DetailCosrent() {
  const { url } = usePage();
  const item = cariCosrent(decodeURIComponent(url.split('/').pop() ?? ''));

  const [diikuti, setDiikuti] = useState(false);
  const { panggil, toast } = useToast();

  if (!item) {
    return (
      <AppLayout>
        <Head title="Cosrent tidak ditemukan" />
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-chip text-fade">
            <Users size={28} />
          </div>
          <h1 className="mt-5 text-xl font-extrabold text-fg">Cosrent tidak ditemukan</h1>
          <p className="mt-1.5 text-[13.5px] text-dim">Profil sudah dihapus atau URL-nya salah.</p>
          <Link
            href="/cosrent"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-[13.5px] font-extrabold text-white transition-colors hover:bg-accent-hover"
          >
            <ArrowLeft size={15} />
            Kembali ke list cosrent
          </Link>
        </div>
      </AppLayout>
    );
  }

  const kostumSaya = MOCK_KOSTUM.filter(kostum => kostum.username === item.username);

  return (
    <AppLayout>
      <Head title={item.nama} />
      <section className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
        <Link
          href="/cosrent"
          className="inline-flex items-center gap-1.5 text-[13px] font-bold text-dim transition-colors hover:text-accent-text"
        >
          <ArrowLeft size={15} />
          Kembali ke list cosrent
        </Link>

        <article
          data-reveal
          className="mt-5 overflow-hidden rounded-3xl border border-line bg-card"
        >
          <div className="relative aspect-[6/2]">
            <img
              src={item.foto}
              alt={item.nama}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[11.5px] font-extrabold text-white backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#34d399]" />
              {item.online}
            </span>
          </div>

          <div className="p-5 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-linear-to-br from-[#7c3aed] to-[#ec4899] text-[22px] font-extrabold text-white ring-4 ring-card">
                  {item.nama.charAt(0)}
                </span>
                <div className="min-w-0">
                  <h1 className="flex flex-wrap items-center gap-2 text-2xl font-extrabold tracking-tight text-fg">
                    {item.nama}
                    {item.terverifikasi ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#38bdf8]/12 px-2 py-0.5 text-[11px] font-extrabold text-[#38bdf8]">
                        <BadgeCheck size={13} />
                        Terverifikasi
                      </span>
                    ) : null}
                  </h1>
                  <p className="mt-0.5 text-[13px] font-semibold text-dim">@{item.username}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-[12.5px] text-faint">
                    <MapPin size={13} />
                    {item.kota}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => setDiikuti(diok => !diok)}
                  className={clsx(
                    'inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13.5px] font-extrabold transition-colors duration-200',
                    diikuti
                      ? 'border border-line bg-chip text-fg hover:border-line2'
                      : 'bg-accent text-white hover:bg-accent-hover'
                  )}
                >
                  <UserPlus size={15} />
                  {diikuti ? 'Diikuti' : 'Ikuti'}
                </button>
                <button
                  type="button"
                  onClick={() => panggil('Fitur segera hadir')}
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-chip px-4 py-2.5 text-[13.5px] font-extrabold text-fg transition-colors duration-200 hover:border-line2"
                >
                  <MessageCircle size={15} />
                  Chat
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:max-w-md">
              <div className="bg-card px-4 py-3 text-center">
                <p className="text-lg font-extrabold tabular-nums text-fg">
                  {item.post.toLocaleString('id-ID')}
                </p>
                <p className="text-[11.5px] font-semibold text-fade">Post kostum</p>
              </div>
              <div className="bg-card px-4 py-3 text-center">
                <p className="text-lg font-extrabold tabular-nums text-fg">
                  {item.pengikut.toLocaleString('id-ID')}
                </p>
                <p className="text-[11.5px] font-semibold text-fade">Pengikut</p>
              </div>
              <div className="bg-card px-4 py-3 text-center">
                <p className="flex items-center justify-center gap-1 text-lg font-extrabold tabular-nums text-fg">
                  <Star size={15} className="text-[#fbbf24]" />
                  {item.rating}
                </p>
                <p className="text-[11.5px] font-semibold text-fade">
                  {item.ulasanCount.toLocaleString('id-ID')} ulasan
                </p>
              </div>
            </div>

            <p className="mt-5 text-[14.5px] leading-relaxed text-fg2">{item.deskripsi}</p>

            <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 sm:max-w-lg">
              <div className="flex items-center gap-3 bg-card px-4 py-3">
                <CalendarDays size={16} className="shrink-0 text-accent-text" />
                <div>
                  <p className="text-[11px] font-bold tracking-wide text-fade uppercase">
                    Toko dibuka
                  </p>
                  <p className="text-[13.5px] font-bold text-fg">{item.tokoDibuka}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-card px-4 py-3">
                <Clock size={16} className="shrink-0 text-accent-text" />
                <div>
                  <p className="text-[11px] font-bold tracking-wide text-fade uppercase">
                    Jam operasional
                  </p>
                  <p className="text-[13.5px] font-bold text-fg">{item.jamOperasional}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-card px-4 py-3">
                <MapPin size={16} className="shrink-0 text-accent-text" />
                <div>
                  <p className="text-[11px] font-bold tracking-wide text-fade uppercase">Lokasi</p>
                  <p className="text-[13.5px] font-bold text-fg">{item.kota}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-card px-4 py-3">
                <ShieldCheck size={16} className="shrink-0 text-accent-text" />
                <div>
                  <p className="text-[11px] font-bold tracking-wide text-fade uppercase">Status</p>
                  <p className="text-[13.5px] font-bold text-fg">
                    {item.terverifikasi ? 'Terverifikasi' : 'Belum terverifikasi'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-[13px] font-extrabold text-fg">
            <PackageOpen size={16} className="text-accent-text" />
            Kostum dari {item.nama}
          </h2>
          {kostumSaya.length > 0 ? (
            <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {kostumSaya.map(kostum => (
                <KostumCard key={kostum.judul} item={kostum} />
              ))}
            </div>
          ) : (
            <p className="mt-4 rounded-2xl border border-line bg-card px-5 py-8 text-center text-[13.5px] text-dim">
              Belum ada kostum terdaftar dari {item.nama}.
            </p>
          )}
        </section>

        <div className="mt-10">
          <KomentarSection komentarAwal={item.review} judul="Ulasan" />
        </div>
      </section>

      {toast}
    </AppLayout>
  );
}
