import { useToast } from '@/components/toast';
import { KATEGORI_LABEL, type Thread } from '@/data/forum';
import type { Auth } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { ArrowDown, ArrowUp, Bookmark, Check, Eye, MessageCircle, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

const aksi =
  'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[12.5px] font-bold text-dim transition-colors hover:bg-chip hover:text-fg';

export function ForumPost({ thread }: { thread: Thread }) {
  const { auth } = usePage<{ auth: Auth }>().props;
  const [vote, setVote] = useState<1 | -1 | null>(thread.vote);
  const [skor, setSkor] = useState(thread.skor);
  const [disimpan, setDisimpan] = useState(thread.disimpan);
  const { panggil, toast } = useToast();

  useEffect(() => {
    setVote(thread.vote);
    setSkor(thread.skor);
    setDisimpan(thread.disimpan);
  }, [thread.vote, thread.skor, thread.disimpan]);

  const linkTopik = `/forum/${thread.slug}`;

  function pilihVote(arah: 1 | -1) {
    if (!auth.user) {
      panggil('Masuk untuk memberi vote');
      return;
    }

    const berikut = vote === arah ? null : arah;
    setVote(berikut);
    setSkor(thread.skor - (thread.vote ?? 0) + (berikut ?? 0));

    router.post(
      `/forum/${thread.slug}/vote`,
      { value: arah },
      { preserveScroll: true, preserveState: true }
    );
  }

  function toggleSimpan() {
    if (!auth.user) {
      panggil('Masuk untuk menyimpan topik');
      return;
    }

    setDisimpan(sebelumnya => !sebelumnya);
    router.post(`/forum/${thread.slug}/simpan`, {}, { preserveScroll: true, preserveState: true });
  }

  function bagikan() {
    const url = `${window.location.origin}${linkTopik}`;
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => panggil('Link topik disalin'))
        .catch(() => panggil('Salin link dari URL halaman'));
    } else {
      panggil('Salin link dari URL halaman');
    }
  }

  return (
    <article
      data-reveal
      className="flex overflow-hidden rounded-xl border border-line bg-card transition-colors duration-200 hover:border-line2"
    >
      <div className="flex shrink-0 flex-col items-center gap-0.5 border-r border-line bg-card2 px-2 py-3">
        <button
          type="button"
          aria-label="Upvote"
          aria-pressed={vote === 1}
          onClick={() => pilihVote(1)}
          className={clsx(
            'grid h-7 w-7 place-items-center rounded-md transition-colors hover:bg-chip',
            vote === 1 ? 'text-accent-text' : 'text-fade hover:text-accent-text'
          )}
        >
          <ArrowUp size={16} />
        </button>
        <span
          className={clsx(
            'min-w-8 text-center text-[13px] font-extrabold tabular-nums',
            vote ? 'text-accent-text' : 'text-fg'
          )}
        >
          {skor.toLocaleString('id-ID')}
        </span>
        <button
          type="button"
          aria-label="Downvote"
          aria-pressed={vote === -1}
          onClick={() => pilihVote(-1)}
          className={clsx(
            'grid h-7 w-7 place-items-center rounded-md transition-colors hover:bg-chip',
            vote === -1 ? 'text-accent-text' : 'text-fade hover:text-accent-text'
          )}
        >
          <ArrowDown size={16} />
        </button>
      </div>

      <div className="flex min-w-0 flex-1 gap-3 px-4 py-3">
        <div className="min-w-0 flex-1">
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
              r/LumisseCosplay
            </Link>
            <span aria-hidden="true">•</span>
            <span className="font-semibold text-muted">u/{thread.penulis}</span>
            <span aria-hidden="true">•</span>
            <span>{thread.waktu}</span>
            <span className="ml-auto flex shrink-0 items-center gap-1 text-faint tabular-nums">
              <Eye size={13} />
              {thread.dilihat.toLocaleString('id-ID')}
            </span>
          </div>

          <Link
            href={linkTopik}
            className="mt-1.5 block text-[16px] leading-snug font-bold text-fg transition-colors hover:text-accent-text sm:text-[17px]"
          >
            {thread.judul}
          </Link>

          <div className="mt-2.5 flex flex-wrap items-center gap-1 text-fade">
            <Link href={linkTopik} className={aksi}>
              <MessageCircle size={14} />
              {thread.balasan.toLocaleString('id-ID')} Komentar
            </Link>
            <button type="button" onClick={bagikan} className={aksi}>
              <Share2 size={14} />
              Bagikan
            </button>
            <button
              type="button"
              onClick={toggleSimpan}
              aria-pressed={disimpan}
              className={clsx(aksi, disimpan && 'text-accent-text hover:text-accent-text')}
            >
              {disimpan ? <Check size={14} /> : <Bookmark size={14} />}
              {disimpan ? 'Tersimpan' : 'Simpan'}
            </button>
          </div>
        </div>

        {thread.gambar ? (
          <Link
            href={linkTopik}
            className="hidden shrink-0 self-start sm:block"
            aria-label={`Buka ${thread.judul}`}
          >
            <img
              src={thread.gambar}
              alt=""
              loading="lazy"
              className="mt-2 h-16 w-24 rounded-lg border border-line object-cover transition-opacity hover:opacity-80"
            />
          </Link>
        ) : null}
      </div>

      {toast}
    </article>
  );
}
