import { KATEGORI_LABEL, slugifyTopik, type Thread } from '@/data/forum';
import { useToast } from '@/components/toast';
import { Link } from '@inertiajs/react';
import { ArrowDown, ArrowUp, Bookmark, Check, Eye, MessageCircle, Share2 } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

const aksi =
  'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[12.5px] font-bold text-dim transition-colors hover:bg-chip hover:text-fg';

export function ForumPost({ thread }: { thread: Thread }) {
  const [vote, setVote] = useState<'up' | 'down' | null>(null);
  const [tersimpan, setTersimpan] = useState(false);
  const { panggil, toast } = useToast();

  const skorTampil = thread.skor + (vote === 'up' ? 1 : 0) - (vote === 'down' ? 1 : 0);
  const linkTopik = `/forum/${slugifyTopik(thread.judul)}`;

  function pilihVote(arah: 'up' | 'down') {
    setVote(v => (v === arah ? null : arah));
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
          onClick={() => pilihVote('up')}
          className={clsx(
            'grid h-7 w-7 place-items-center rounded-md transition-colors hover:bg-chip',
            vote === 'up' ? 'text-accent-text' : 'text-fade hover:text-accent-text'
          )}
        >
          <ArrowUp size={16} />
        </button>
        <span
          className={clsx(
            'min-w-8 text-center text-[13px] font-extrabold tabular-nums',
            vote === 'up' ? 'text-accent-text' : vote === 'down' ? 'text-accent-text' : 'text-fg'
          )}
        >
          {skorTampil.toLocaleString('id-ID')}
        </span>
        <button
          type="button"
          aria-label="Downvote"
          onClick={() => pilihVote('down')}
          className={clsx(
            'grid h-7 w-7 place-items-center rounded-md transition-colors hover:bg-chip',
            vote === 'down' ? 'text-accent-text' : 'text-fade hover:text-accent-text'
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
              onClick={() => setTersimpan(disimpan => !disimpan)}
              className={clsx(aksi, tersimpan && 'text-accent-text hover:text-accent-text')}
            >
              {tersimpan ? <Check size={14} /> : <Bookmark size={14} />}
              {tersimpan ? 'Tersimpan' : 'Simpan'}
            </button>
          </div>
        </div>

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
      </div>

      {toast}
    </article>
  );
}
