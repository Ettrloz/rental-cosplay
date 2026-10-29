import { useToast } from '@/components/toast';
import type { Komentar } from '@/data/forum';
import type { Auth } from '@/types';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { ArrowDown, ArrowUp, MessageCircle, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

function KomentarCard({ komentar }: { komentar: Komentar }) {
  const { auth } = usePage<{ auth: Auth }>().props;
  const [vote, setVote] = useState<1 | -1 | null>(komentar.vote);
  const [skor, setSkor] = useState(komentar.skor);
  const { panggil, toast } = useToast();

  useEffect(() => {
    setVote(komentar.vote);
    setSkor(komentar.skor);
  }, [komentar.vote, komentar.skor]);

  function pilihVote(arah: 1 | -1) {
    if (!auth.user) {
      panggil('Masuk untuk memberi vote');
      return;
    }

    const berikut = vote === arah ? null : arah;
    setVote(berikut);
    setSkor(komentar.skor - (komentar.vote ?? 0) + (berikut ?? 0));

    router.post(
      `/forum/komentar/${komentar.id}/vote`,
      { value: arah },
      { preserveScroll: true, preserveState: true }
    );
  }

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
            onClick={() => pilihVote(1)}
            aria-label="Upvote"
            aria-pressed={vote === 1}
            className={clsx(
              'grid h-6 w-6 place-items-center rounded-md transition-colors hover:bg-chip',
              vote === 1 ? 'text-accent-text' : 'text-fade hover:text-accent-text'
            )}
          >
            <ArrowUp size={13} />
          </button>
          <span
            className={clsx(
              'text-[12.5px] font-extrabold tabular-nums',
              vote ? 'text-accent-text' : 'text-fg'
            )}
          >
            {skor.toLocaleString('id-ID')}
          </span>
          <button
            type="button"
            onClick={() => pilihVote(-1)}
            aria-label="Downvote"
            aria-pressed={vote === -1}
            className={clsx(
              'grid h-6 w-6 place-items-center rounded-md transition-colors hover:bg-chip',
              vote === -1 ? 'text-accent-text' : 'text-fade hover:text-accent-text'
            )}
          >
            <ArrowDown size={13} />
          </button>
        </div>
      </div>
      {toast}
    </div>
  );
}

export function ForumComments({
  komentar,
  threadSlug
}: {
  komentar: Komentar[];
  threadSlug: string;
}) {
  const { auth } = usePage<{ auth: Auth }>().props;
  const form = useForm({ body: '' });

  function kirimKomentar(event: React.FormEvent) {
    event.preventDefault();
    form.post(`/forum/${threadSlug}/komentar`, {
      preserveScroll: true,
      onSuccess: () => form.reset()
    });
  }

  return (
    <section>
      <h2 className="flex items-center gap-2 text-[13px] font-extrabold text-fg">
        <MessageCircle size={16} className="text-accent-text" />
        {komentar.length.toLocaleString('id-ID')} Komentar
      </h2>

      {auth.user ? (
        <form onSubmit={kirimKomentar} className="mt-4 flex items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-[13px] font-extrabold text-white">
            {(auth.user.username ?? auth.user.name).charAt(0).toUpperCase()}
          </span>
          <input
            type="text"
            value={form.data.body}
            onChange={event => form.setData('body', event.target.value)}
            placeholder={`Tulis komentar sebagai u/${auth.user.username ?? auth.user.name}...`}
            className="min-w-0 flex-1 rounded-xl border border-line bg-chip px-4 py-2.5 text-[13.5px] text-fg placeholder:text-faint focus:border-accent focus:outline-none"
          />
          <button
            type="submit"
            disabled={form.processing || !form.data.body.trim()}
            className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2.5 text-[13px] font-extrabold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send size={14} />
            Kirim
          </button>
        </form>
      ) : (
        <p className="mt-4 rounded-xl border border-line bg-card px-4 py-3 text-[13px] text-dim">
          <Link href="/login" className="font-bold text-accent-text hover:underline">
            Masuk
          </Link>{' '}
          untuk ikut berkomentar.
        </p>
      )}

      {form.errors.body ? (
        <p className="mt-2 text-[12px] font-semibold text-[#f87171]">{form.errors.body}</p>
      ) : null}

      <div className="mt-4 flex flex-col gap-3">
        {komentar.map(k => (
          <KomentarCard key={k.id} komentar={k} />
        ))}
        {komentar.length === 0 ? (
          <p className="rounded-xl border border-line bg-card px-4 py-8 text-center text-[13px] text-dim">
            Belum ada komentar. Jadilah yang pertama!
          </p>
        ) : null}
      </div>
    </section>
  );
}
