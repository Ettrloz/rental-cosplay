import type { Cosrent } from '@/data/cosrent';
import { Link } from '@inertiajs/react';
import { BadgeCheck, MapPin, Star } from 'lucide-react';

export function CosrentCard({ item }: { item: Cosrent }) {
  return (
    <Link
      href={`/cosrent/${item.username}`}
      data-reveal
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card transition-all duration-300 hover:-translate-y-1 hover:border-line2 hover:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)]"
    >
      <div className="relative aspect-[5/3] overflow-hidden">
        <img
          src={item.foto}
          alt={item.nama}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-extrabold text-white backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#34d399]" />
          {item.online}
        </span>
        {item.terverifikasi ? (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-extrabold text-white backdrop-blur-sm">
            <BadgeCheck size={13} className="text-[#38bdf8]" />
            Terverifikasi
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-linear-to-br from-[#7c3aed] to-[#ec4899] text-[14px] font-extrabold text-white">
            {item.nama.charAt(0)}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-[14.5px] font-extrabold text-fg">{item.nama}</h3>
            <p className="truncate text-[12px] font-semibold text-dim">@{item.username}</p>
          </div>
        </div>

        <p className="mt-2.5 flex items-center gap-1.5 text-[12.5px] text-faint">
          <MapPin size={13} />
          {item.kota}
        </p>

        <div className="mt-auto flex items-center gap-4 border-t border-line pt-3 text-[12px] text-fade">
          <span className="tabular-nums">
            <strong className="font-extrabold text-fg">{item.post.toLocaleString('id-ID')}</strong>{' '}
            post
          </span>
          <span className="tabular-nums">
            <strong className="font-extrabold text-fg">
              {item.pengikut.toLocaleString('id-ID')}
            </strong>{' '}
            pengikut
          </span>
          <span className="ml-auto inline-flex items-center gap-1 font-extrabold text-fg tabular-nums">
            <Star size={13} className="text-[#fbbf24]" />
            {item.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
