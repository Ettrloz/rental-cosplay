import { EventCard } from '@/components/event-card';
import { EVENT } from '@/data/event';
import { AppLayout } from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { CalendarDays } from 'lucide-react';

export default function Event() {
  return (
    <AppLayout>
      <Head title="Jadwal Event Cosplay" />

      <section>
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div data-reveal className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1.5 text-[12px] font-semibold text-[#c4b5fd] ring-1 ring-white/10">
              <CalendarDays size={13} />
              Kompetisi, konvensi, dan festival cosplay
            </span>
            <h1 className="mt-5 text-3xl leading-[1.15] font-extrabold tracking-tight text-white sm:text-4xl">
              Jadwal Event Cosplay
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-[#8a8a9c]">
              Pantau jadwal event cosplay terdekat, ikut kompetisi, atau sekadar ketemu teman
              cosplayer.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {EVENT.map(item => (
              <EventCard key={item.judul} item={item} />
            ))}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
