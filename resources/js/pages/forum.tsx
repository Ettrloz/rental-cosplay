import { ForumPost } from '@/components/forum-post';
import { FORUM, type Thread } from '@/data/forum';
import { AppLayout } from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Clock, Eye, Flame, ShieldCheck } from 'lucide-react';
import { useMemo, useState } from 'react';
import clsx from 'clsx';

const ATURAN = [
  'Wajib memilih kategori pada setiap topik',
  'Dilarang spam iklan di luar topic Diskon',
  'Jujur dan jelas pada deskripsi barang/jasa',
  'Hormati sesama member, no toxic behavior'
];

type ModeSort = 'Terbaru' | 'Terpopuler' | 'Sering Dilihat';

const TAB_SORT: { mode: ModeSort; ikon: typeof Clock; label: string }[] = [
  { mode: 'Terbaru', ikon: Clock, label: 'Terbaru' },
  { mode: 'Terpopuler', ikon: Flame, label: 'Terpopuler' },
  { mode: 'Sering Dilihat', ikon: Eye, label: 'Sering Dilihat' }
];

export default function Forum() {
  const [sort, setSort] = useState<ModeSort>('Terbaru');

  const threads = useMemo(() => {
    const data = [...FORUM];
    if (sort === 'Terpopuler') {
      data.sort((a, b) => b.skor - a.skor);
    } else if (sort === 'Sering Dilihat') {
      data.sort((a, b) => b.dilihat - a.dilihat);
    }
    return data;
  }, [sort]);

  const totalDilihat = useMemo(() => FORUM.reduce((total, t) => total + t.dilihat, 0), []);
  const moderator = useMemo(() => [...new Set(threads.map((t: Thread) => t.penulis))], [threads]);

  return (
    <AppLayout>
      <Head title="Forum" />

      <section>
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div data-reveal className="max-w-2xl">
            <h1 className="text-3xl leading-[1.15] font-extrabold tracking-tight text-fg sm:text-4xl">
              Forum Cosplay
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-dim">
              Tanya ukuran kostum, jual-beli, diskon musiman, sampai blacklist customer bermasalah.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div>
              <div
                data-reveal
                className="flex flex-wrap items-center gap-2 rounded-xl border border-line bg-card px-3 py-2.5"
              >
                {TAB_SORT.map(({ mode, ikon: Ikon, label }) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setSort(mode)}
                    className={clsx(
                      'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-bold transition-colors',
                      sort === mode
                        ? 'bg-accent text-white'
                        : 'text-dim hover:bg-chip hover:text-fg'
                    )}
                  >
                    <Ikon size={14} />
                    {label}
                  </button>
                ))}
                <span className="ml-auto hidden text-[12.5px] font-semibold text-faint sm:block">
                  {threads.length} topik
                </span>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                {threads.length > 0 ? (
                  threads.map(thread => <ForumPost key={thread.judul} thread={thread} />)
                ) : (
                  <div className="rounded-2xl border border-line bg-card px-6 py-14 text-center">
                    <p className="text-[14.5px] font-bold text-fg">Belum ada topik</p>
                    <p className="mt-1 text-[13px] text-dim">
                      Topik dari anggota komunitas akan tampil di sini.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
              <div data-reveal className="overflow-hidden rounded-xl border border-line bg-card">
                <div className="flex flex-col items-center gap-3 border-b border-line px-5 py-5 text-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-linear-to-br from-[#7c3aed] to-[#ec4899] text-xl font-extrabold text-white">
                    R
                  </span>
                  <div>
                    <p className="text-[15px] font-extrabold text-fg">r/LumisseCosplay</p>
                    <p className="mt-0.5 text-[12.5px] font-semibold text-fade">
                      Komunitas cosplay & rental kostum Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex divide-x divide-line border-b border-line text-center">
                  <div className="flex-1 px-2 py-3">
                    <p className="text-[16px] font-extrabold tabular-nums text-fg">
                      {FORUM.length}
                    </p>
                    <p className="text-[11.5px] font-semibold text-fade">Topik</p>
                  </div>
                  <div className="flex-1 px-2 py-3">
                    <p className="text-[16px] font-extrabold tabular-nums text-fg">
                      {totalDilihat.toLocaleString('id-ID')}
                    </p>
                    <p className="text-[11.5px] font-semibold text-fade">Dilihat</p>
                  </div>
                  <div className="flex-1 px-2 py-3">
                    <p className="text-[16px] font-extrabold tabular-nums text-fg">9</p>
                    <p className="text-[11.5px] font-semibold text-fade">Member</p>
                  </div>
                </div>

                <div className="space-y-3 px-5 py-4">
                  <div>
                    <h2 className="text-[11px] font-extrabold tracking-wider text-faint uppercase">
                      Moderator
                    </h2>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {moderator.map(name => (
                        <span
                          key={name}
                          className="rounded-full bg-chip px-2.5 py-1 text-[11.5px] font-bold text-fg2"
                        >
                          u/{name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-[11px] font-extrabold tracking-wider text-faint uppercase">
                      Aturan
                    </h2>
                    <ul className="mt-2 space-y-1.5">
                      {ATURAN.map((aturan, i) => (
                        <li
                          key={aturan}
                          className="flex gap-2 text-[12.5px] leading-snug text-muted"
                        >
                          <ShieldCheck size={14} className="mt-0.5 shrink-0 text-accent-text" />
                          <span>
                            <span className="font-extrabold text-fg2">{i + 1}.</span> {aturan}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
