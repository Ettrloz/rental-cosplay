import { ImageGallery } from '@/components/image-gallery';
import { useToast } from '@/components/toast';
import { deskripsiKostum, rupiah } from '@/data/katalog';
import { useKostumDetail } from '@/hooks/use-kostum';
import { igLink, waLink } from '@/lib/kontak';
import { AppLayout } from '@/layouts/app-layout';
import type { Auth } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
  ArrowLeft,
  AtSign,
  ClipboardList,
  Eye,
  MapPin,
  MessageCircle,
  PackageOpen,
  Pencil,
  ShieldCheck,
} from 'lucide-react';
import type { ReactNode } from 'react';

function renderDeskripsi(teks: string): ReactNode {
  return teks
    .split('*')
    .map((bagian, i) => (i % 2 === 1 ? <strong key={i}>{bagian}</strong> : bagian));
}

export default function DetailKostum() {
  const { url, props } = usePage<{ auth: Auth }>();
  const auth = props.auth;
  const slug = decodeURIComponent(url.split('/').pop() ?? '');
  const { item, loading } = useKostumDetail(slug);
  const { panggil, toast } = useToast();

  if (loading) {
    return (
      <AppLayout>
        <Head title="Memuat kostum..." />
        <div className="mx-auto max-w-3xl px-4 py-24 text-center text-[13.5px] text-dim">
          Memuat kostum...
        </div>
      </AppLayout>
    );
  }

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

  const foto = item.gambar ?? [];
  const tautanWa = waLink(
    item.whatsapp,
    `Halo ${item.pemilik}, saya tertarik menyewa kostum "${item.judul}" (${rupiah.format(
      item.harga
    )}) di Lumisse Cosplay. Apakah masih tersedia?`
  );
  const tautanIg = igLink(item.instagram);

  const chat = () => {
    if (tautanIg) {
      window.open(tautanIg, '_blank', 'noopener');
      return;
    }
    if (tautanWa) {
      window.open(tautanWa, '_blank', 'noopener');
      return;
    }
    panggil('Pemilik belum mencantumkan kontak');
  };

  // Edit hanya muncul jika user login dan username cocok dengan pemilik
  const isPemilik =
    auth.user !== null &&
    auth.user.username === item.username &&
    item.id !== undefined;

  // Chips spesifikasi ringkas — hilangkan duplikat brand/series
  const chips = [
    item.brand,
    item.series !== item.brand ? item.series : null,
    item.karakter,
    item.ukuran,
    item.gender,
    `LD ${item.ld}`,
    `LP ${item.lp}`,
  ].filter(Boolean) as string[];

  return (
    <AppLayout>
      <Head title={item.judul} />
      <section className="mx-auto max-w-5xl px-4 py-10 sm:py-14">

        {/* Navigasi atas */}
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/katalog"
            className="inline-flex items-center gap-1.5 text-[13px] font-bold text-dim transition-colors hover:text-accent-text"
          >
            <ArrowLeft size={15} />
            Kembali ke katalog
          </Link>

          {isPemilik ? (
            <Link
              href={`/dashboard/kostum/${item.id}/edit`}
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-chip px-4 py-2 text-[13px] font-extrabold text-fg transition-colors hover:border-line2 hover:bg-chip2"
            >
              <Pencil size={14} />
              Edit Kostum
            </Link>
          ) : null}
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,34%)_minmax(0,66%)]">

          {/* ── Kolom kiri: galeri ── */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ImageGallery
              gambar={foto}
              judul={item.judul}
              placeholder={<item.icon size={72} strokeWidth={1.5} className="text-fade" />}
            />
          </div>

          {/* ── Kolom kanan: info ── */}
          <div>
            {/* Badge pemilik */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-chip px-3 py-1 text-[12px] font-bold text-fg2">
              <span
                className="grid h-5 w-5 place-items-center rounded-full bg-accent-soft text-[9px] font-extrabold text-accent-text"
                aria-hidden="true"
              >
                {item.pemilik.charAt(0)}
              </span>
              @{item.username}
            </span>

            {/* Judul */}
            <h1 className="mt-3 text-2xl leading-snug font-extrabold tracking-tight text-fg sm:text-3xl">
              {item.judul}
            </h1>

            {/* Lokasi */}
            <p className="mt-2 flex items-center gap-1.5 text-[13px] font-semibold text-dim">
              <MapPin size={14} />
              {item.pemilik} — {item.kota}
            </p>

            {/* Harga */}
            <div className="mt-4 flex items-baseline gap-2.5">
              <span className="text-[26px] font-extrabold text-accent-text">
                {rupiah.format(item.harga)}
              </span>
              <span className="text-[13.5px] font-semibold text-faint">
                / {item.rentalDays ?? 3} hari
              </span>
            </div>

            {/* Chips spesifikasi ringkas */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {chips.map(chip => (
                <span
                  key={chip}
                  className="rounded-lg bg-chip px-2.5 py-1 text-[12px] font-bold text-fg2"
                >
                  {chip}
                </span>
              ))}
              <span className="flex items-center gap-1 rounded-lg bg-chip px-2.5 py-1 text-[12px] font-bold text-fg2">
                <Eye size={11} className="text-faint" />
                {item.dilihat.toLocaleString('id-ID')}
              </span>
            </div>

            {/* Deskripsi */}
            <p className="mt-5 text-[14px] leading-relaxed text-fg2">
              {renderDeskripsi(item.deskripsi || deskripsiKostum(item))}
            </p>

            {/* Tombol aksi */}
            <div className="mt-6 flex flex-wrap gap-3">
              {tautanWa ? (
                <a
                  href={tautanWa}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-w-40 flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-[14.5px] font-extrabold text-white transition-colors duration-200 hover:bg-accent-hover"
                >
                  <ShieldCheck size={16} />
                  Sewa via WhatsApp
                </a>
              ) : (
                <button
                  type="button"
                  onClick={chat}
                  className="inline-flex min-w-40 flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-[14.5px] font-extrabold text-white transition-colors duration-200 hover:bg-accent-hover"
                >
                  <ShieldCheck size={16} />
                  Hubungi Pemilik
                </button>
              )}
              <button
                type="button"
                onClick={chat}
                className="inline-flex min-w-40 flex-1 items-center justify-center gap-2 rounded-xl border border-line bg-chip px-5 py-3 text-[14.5px] font-extrabold text-fg transition-colors duration-200 hover:border-line2"
              >
                {tautanIg ? <AtSign size={16} /> : <MessageCircle size={16} />}
                {tautanIg ? 'Instagram' : 'Chat Pemilik'}
              </button>
            </div>
          </div>
        </div>

        {/* ── Aturan Sewa ─────────────────────────────────────────── */}
        {(item.rental_rules || item.rental_rules_image) ? (
          <div className="mt-10 rounded-2xl border border-line bg-card overflow-hidden">
            <div className="flex items-center gap-2 border-b border-line px-5 py-4">
              <ClipboardList size={15} className="text-accent-text" />
              <h2 className="text-[13.5px] font-extrabold text-fg">Aturan Sewa</h2>
              <span className="text-[12px] text-faint">dari {item.pemilik}</span>
            </div>
            <div className="flex flex-col gap-6 p-5 sm:flex-row">
              {item.rental_rules_image ? (
                <div className="shrink-0">
                  <img
                    src={item.rental_rules_image}
                    alt="Aturan sewa"
                    className="w-full rounded-xl border border-line object-cover sm:w-56"
                  />
                </div>
              ) : null}
              {item.rental_rules ? (
                <div className="min-w-0 flex-1">
                  <p className="whitespace-pre-line text-[13.5px] leading-relaxed text-fg2">
                    {item.rental_rules}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </section>

      {toast}
    </AppLayout>
  );
}
