import type { JadwalEvent } from '@/data/event';
import { CalendarDays, MapPin } from 'lucide-react';

export function EventCard({ item }: { item: JadwalEvent }) {
  return (
    <div
      data-reveal
      className="flex items-center gap-4 rounded-2xl border border-white/8 bg-[#12121a] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15"
    >
      <span
        className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[#17171c] text-[#5a5a6b]"
        aria-hidden="true"
      >
        <CalendarDays size={24} strokeWidth={1.7} />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-[15px] font-extrabold text-white">{item.judul}</h3>
        <p className="mt-1 text-[13px] font-bold text-[#c084fc]">{item.tanggal}</p>
        <p className="mt-0.5 truncate text-[12.5px] text-[#6f6f85]">{item.penyelenggara}</p>
      </div>
      <div className="shrink-0 text-right">
        <p className="flex items-center justify-end gap-1 text-[12.5px] text-[#6f6f85]">
          <MapPin size={12} />
          {item.lokasi}
        </p>
      </div>
    </div>
  );
}
