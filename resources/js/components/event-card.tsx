import { slugifyEvent, type JadwalEvent } from '@/data/event';
import { Link } from '@inertiajs/react';
import { CalendarDays, MapPin } from 'lucide-react';

export function EventCard({ item }: { item: JadwalEvent }) {
  return (
    <Link
      href={`/event/${slugifyEvent(item.judul)}`}
      data-reveal
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card transition-all duration-300 hover:-translate-y-1 hover:border-line2 hover:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)]"
    >
      <div className="relative aspect-video overflow-hidden">
        {item.gambar ? (
          <img
            src={item.gambar}
            alt={item.judul}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-card2 text-fade">
            <CalendarDays size={40} strokeWidth={1.3} />
          </div>
        )}
        <span className="absolute top-3 left-3 rounded-full bg-black/55 px-2.5 py-1 text-[11.5px] font-extrabold text-white backdrop-blur-sm">
          {item.tanggal}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-[15px] leading-snug font-extrabold text-fg">
          {item.judul}
        </h3>
        <p className="mt-1.5 text-[12.5px] font-semibold text-dim">{item.penyelenggara}</p>
        <p className="mt-auto flex items-center gap-1.5 pt-3 text-[12.5px] text-faint">
          <MapPin size={13} />
          {item.lokasi}
        </p>
      </div>
    </Link>
  );
}
