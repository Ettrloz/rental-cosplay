import type { Komentar } from '@/data/forum';
import { ArrowDown, ArrowUp, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import clsx from 'clsx';

export function KomentarCard({ komentar }: { komentar: Komentar }) {
  const [vote, setVote] = useState<'up' | 'down' | null>(null);

  return (
    <div className="flex gap-3 rounded-xl border border-line bg-card2 px-4 py-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent-soft text-[13px] font-extrabold text-accent-text">
        {komentar.penulis.charAt(0).toUpperCase()}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[12.5px] font-semibold text-fade">
          <span className="font-bold text-muted">u/{komentar.penulis}</span>
          <span className="mx-1" aria-hidden="true">
            •
          </span>
          {komentar.waktu}
        </p>
        <p className="mt-1 text-[13.5px] leading-relaxed text-fg2">{komentar.teks}</p>
        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setVote(v => (v === 'up' ? null : 'up'))}
            aria-label="Upvote"
            className={clsx(
              'grid h-6 w-6 place-items-center rounded-md transition-colors hover:bg-chip',
              vote === 'up' ? 'text-accent-text' : 'text-fade hover:text-accent-text'
            )}
          >
            <ArrowUp size={13} />
          </button>
          <span
            className={clsx(
              'text-[12.5px] font-extrabold tabular-nums',
              vote === 'up' ? 'text-accent-text' : 'text-fg'
            )}
          >
            {(komentar.skor + (vote === 'up' ? 1 : 0)).toLocaleString('id-ID')}
          </span>
          <button
            type="button"
            onClick={() => setVote(v => (v === 'down' ? null : 'down'))}
            aria-label="Downvote"
            className={clsx(
              'grid h-6 w-6 place-items-center rounded-md transition-colors hover:bg-chip',
              vote === 'down' ? 'text-accent-text' : 'text-fade hover:text-accent-text'
            )}
          >
            <ArrowDown size={13} />
          </button>
          <span className="ml-2 text-[12px] font-bold text-faint underline-offset-2 hover:underline">
            Balas
          </span>
        </div>
      </div>
    </div>
  );
}

export function KomentarSection({
  komentarAwal,
  judul = 'Komentar'
}: {
  komentarAwal: Komentar[];
  judul?: string;
}) {
  const [komentar, setKomentar] = useState<Komentar[]>(() => [...komentarAwal]);
  const [isiBaru, setIsiBaru] = useState('');

  function kirimKomentar(event: FormEvent) {
    event.preventDefault();
    const teks = isiBaru.trim();
    if (!teks) return;
    const baru: Komentar = { penulis: 'Kamu', waktu: 'Baru saja', teks, skor: 1 };
    setKomentar(list => [baru, ...list]);
    setIsiBaru('');
  }

  return (
    <section>
      <h2 className="flex items-center gap-2 text-[13px] font-extrabold text-fg">
        <MessageCircle size={16} className="text-accent-text" />
        {komentar.length.toLocaleString('id-ID')} {judul}
      </h2>

      <form onSubmit={kirimKomentar} className="mt-4 flex items-center gap-2">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-[13px] font-extrabold text-white">
          K
        </span>
        <input
          type="text"
          value={isiBaru}
          onChange={event => setIsiBaru(event.target.value)}
          placeholder={`Tulis ${judul.toLowerCase()} sebagai u/Kamu...`}
          className="min-w-0 flex-1 rounded-xl border border-line bg-chip px-4 py-2.5 text-[13.5px] text-fg placeholder:text-faint focus:border-accent focus:outline-none"
        />
        <button
          type="submit"
          disabled={!isiBaru.trim()}
          className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2.5 text-[13px] font-extrabold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Send size={14} />
          Kirim
        </button>
      </form>

      <div className="mt-4 flex flex-col gap-3">
        {komentar.map(k => (
          <KomentarCard key={`${k.penulis}-${k.teks}`} komentar={k} />
        ))}
      </div>
    </section>
  );
}
