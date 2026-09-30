import { ForumRow } from '@/components/forum-row';
import { FORUM } from '@/data/forum';
import { AppLayout } from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { MessageCircle, PenLine } from 'lucide-react';

export default function Forum() {
  return (
    <AppLayout>
      <Head title="Forum" />

      <section>
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div data-reveal className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1.5 text-[12px] font-semibold text-[#c4b5fd] ring-1 ring-white/10">
              <MessageCircle size={13} />
              Tanya-jawab, diskon, dan komunitas
            </span>
            <h1 className="mt-5 text-3xl leading-[1.15] font-extrabold tracking-tight text-white sm:text-4xl">
              Forum Cosplay
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-[#8a8a9c]">
              Tanya ukuran kostum, jual-beli, diskon musiman, sampai blacklist customer bermasalah.
            </p>
            <button
              type="button"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#7c3aed] px-5 py-3 text-[14px] font-bold text-white transition-colors duration-200 hover:bg-[#6d28d9]"
            >
              <PenLine size={16} />
              Tulis Topik Baru
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-2xl border border-white/8">
            {FORUM.map(thread => (
              <ForumRow key={thread.judul} thread={thread} />
            ))}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
