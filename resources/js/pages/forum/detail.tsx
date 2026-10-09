import { KomentarSection } from '@/components/komentar-section';
import { useToast } from '@/components/toast';
import { cariTopik, KATEGORI_LABEL } from '@/data/forum';
import { AppLayout } from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Bookmark,
  Check,
  Eye,
  MessageCircle,
  Share2
} from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

const aksi =
  'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-bold text-dim transition-colors hover:bg-chip hover:text-fg';

export default function DetailTopik() {
  const { url } = usePage();
  const thread = cariTopik(decodeURIComponent(url.split('/').pop() ?? ''));

  const [vote, setVote] = useState<'up' | 'down' | null>(null);
  const [tersimpan, setTersimpan] = useState(false);
  const { panggil, toast } = useToast();

  if (!thread) {
    return (
      <AppLayout>
        <Head title="Topik tidak ditemukan" />
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-chip text-fade">
            <MessageCircle size={28} />
          </div>
          <h1 className="mt-5 text-xl font-extrabold text-fg">Topik tidak ditemukan</h1>
          <p className="mt-1.5 text-[13.5px] text-dim">Topik sudah dihapus atau URL-nya salah.</p>
          <Link
            href="/forum"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-[13.5px] font-extrabold text-white transition-colors hover:bg-accent-hover"
          >
            <ArrowLeft size={15} />
            Kembali ke forum
          </Link>
        </div>
      </AppLayout>
    );
  }

  const skorTampil = thread.skor + (vote === 'up' ? 1 : 0) - (vote === 'down' ? 1 : 0);
  const linkTopik = `/forum/${url.split('/').pop()}`;

  function pilihVote(arah: 'up' | 'down') {
    setVote(v => (v === arah ? null : arah));
  }

  function bagikan() {
    const link = `${window.location.origin}${linkTopik}`;
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(link)
        .then(() => panggil('Link topik disalin'))
        .catch(() => panggil('Salin link dari URL halaman'));
    } else {
      panggil('Salin link dari URL halaman');
    }
  }

  return (
    <AppLayout>
      <Head title={thread.judul} />
      <section className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <Link
          href="/forum"
          className="inline-flex items-center gap-1.5 text-[13px] font-bold text-dim transition-colors hover:text-accent-text"
        >
          <ArrowLeft size={15} />
          Kembali ke forum
        </Link>

        <article data-reveal className="mt-5 rounded-2xl border border-line bg-card p-5 sm:p-7">
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[12.5px] text-fade">
            <span
              className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-bold ${KATEGORI_LABEL[thread.kategori]}`}
            >
              {thread.kategori}
            </span>
            <Link
              href="/forum"
              className="font-bold text-accent-text transition-colors hover:underline"
            >
              r/RentCosCosplay
            </Link>
            <span aria-hidden="true">•</span>
            <span className="font-semibold text-muted">u/{thread.penulis}</span>
            <span aria-hidden="true">•</span>
            <span>{thread.waktu}</span>
            <span className="ml-auto flex shrink-0 items-center gap-1 text-faint tabular-nums">
              <Eye size={13} />
              {thread.dilihat.toLocaleString('id-ID')} dilihat
            </span>
          </div>

          <h1 className="mt-3 text-2xl leading-tight font-extrabold tracking-tight text-fg">
            {thread.judul}
          </h1>

          <p className="mt-4 text-[14.5px] leading-relaxed text-fg2">{thread.isi}</p>

          <img
            src={thread.gambar}
            alt={thread.judul}
            loading="lazy"
            className="mt-5 aspect-video w-full rounded-xl border border-line object-cover"
          />

          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-4">
            <button
              type="button"
              onClick={() => pilihVote('up')}
              className={clsx(
                'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-bold transition-colors',
                vote === 'up'
                  ? 'bg-accent-soft text-accent-text'
                  : 'text-dim hover:bg-chip hover:text-fg'
              )}
            >
              <ArrowUp size={15} />
              {skorTampil.toLocaleString('id-ID')}
            </button>
            <button
              type="button"
              onClick={() => pilihVote('down')}
              className={clsx(
                'inline-flex items-center gap-1 rounded-lg px-2 py-2 text-dim transition-colors hover:bg-chip hover:text-fg',
                vote === 'down' ? 'text-accent-text' : ''
              )}
              aria-label="Downvote"
            >
              <ArrowDown size={15} />
            </button>
            <span className="mx-2 h-5 w-px bg-line2" aria-hidden="true" />
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
        </article>

        <div className="mt-8">
          <KomentarSection komentarAwal={thread.komentar} />
        </div>
      </section>

      {toast}
    </AppLayout>
  );
}
