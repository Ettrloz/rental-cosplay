import { EventCard } from '@/components/event-card';
import { useToast } from '@/components/toast';
import { EVENT } from '@/data/event';
import { AppLayout } from '@/layouts/app-layout';
import { router, usePage, Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';

export default function Event() {
  const { auth } = usePage<{ auth?: { user?: unknown } }>().props;
  const { panggil, toast } = useToast();

  function buatEvent() {
    if (auth?.user) {
      panggil('Fitur segera hadir');
    } else {
      router.visit('/login');
    }
  }

  return (
    <AppLayout>
      <Head title="Jadwal Event Cosplay" />

      <section>
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h1 className="text-3xl leading-[1.15] font-extrabold tracking-tight text-fg sm:text-4xl">
                Jadwal Event Cosplay
              </h1>
              <p className="mt-3 text-[15px] leading-relaxed text-dim">
                Pantau jadwal event cosplay terdekat, ikut kompetisi, atau sekadar ketemu teman
                cosplayer.
              </p>
            </div>
            <button
              type="button"
              onClick={buatEvent}
              className="mb-1 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-[14px] font-bold text-white transition-colors duration-200 hover:bg-accent-hover"
            >
              <Plus size={16} />
              Buat Event
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {EVENT.map(item => (
              <EventCard key={item.judul} item={item} />
            ))}
          </div>
        </div>
      </section>

      {toast}
    </AppLayout>
  );
}
