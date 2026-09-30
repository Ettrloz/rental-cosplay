import { rupiah, type Kostum } from '@/data/katalog';
import { Heart, MapPin } from 'lucide-react';

export function KostumCard({ item }: { item: Kostum }) {
  return (
    <article
      data-reveal
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#12121a] transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)]"
    >
      <div className="relative">
        <div className="grid aspect-4/3 place-items-center bg-[#17171c] transition-transform duration-500 group-hover:scale-[1.02]">
          <item.icon
            size={52}
            className="text-[#45454f] transition-colors duration-300 group-hover:text-[#8f7ef0]"
            strokeWidth={1.2}
          />
        </div>
        {item.bundle ? (
          <span className="absolute top-3 left-3 rounded-full bg-[#fbbf24] px-2.5 py-1 text-[11px] font-extrabold text-[#3b2606]">
            Bundle
          </span>
        ) : null}
        <button
          type="button"
          aria-label={`Simpan ${item.judul} ke favorit`}
          className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-black/45 text-white/80 backdrop-blur-sm transition-colors hover:text-[#f472b6]"
        >
          <Heart size={15} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2">
          <span
            className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#26262f] text-[10px] font-extrabold text-white/85"
            aria-hidden="true"
          >
            {item.pemilik.charAt(0)}
          </span>
          <span className="truncate text-[12px] font-semibold text-[#a1a1b5]">{item.username}</span>
        </div>

        <h3 className="mt-2.5 line-clamp-2 text-[14.5px] leading-snug font-bold text-white">
          {item.judul}
        </h3>

        <p className="mt-2 text-[13.5px] font-extrabold text-[#c084fc]">
          {rupiah.format(item.harga)}
          <span className="font-semibold text-[#6f6f85]"> / 3 hari</span>
          {item.hargaCoret ? (
            <span className="ml-2 text-[12.5px] font-medium text-[#5a5a6b] line-through">
              {rupiah.format(item.hargaCoret)}
            </span>
          ) : null}
        </p>

        <dl className="mt-3 space-y-1.5 text-[12.5px]">
          <div className="flex gap-2">
            <dt className="w-14 shrink-0 text-[#5a5a6b]">Brand</dt>
            <dd className="truncate text-[#a1a1b5]">{item.brand}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-14 shrink-0 text-[#5a5a6b]">Asal</dt>
            <dd className="truncate text-[#a1a1b5]">{item.series}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-14 shrink-0 text-[#5a5a6b]">Karakter</dt>
            <dd className="truncate text-[#a1a1b5]">{item.karakter}</dd>
          </div>
        </dl>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="rounded-md bg-white/6 px-2 py-1 text-[11px] font-bold text-[#c9c9d8]">
            {item.ukuran}
          </span>
          <span className="rounded-md bg-white/6 px-2 py-1 text-[11px] font-bold text-[#c9c9d8]">
            LD: {item.ld}
          </span>
          <span className="rounded-md bg-white/6 px-2 py-1 text-[11px] font-bold text-[#c9c9d8]">
            LP: {item.lp}
          </span>
          <span className="rounded-md bg-white/6 px-2 py-1 text-[11px] font-bold text-[#c9c9d8]">
            {item.gender}
          </span>
        </div>

        <p className="mt-3 flex items-center gap-1.5 text-[12.5px] text-[#6f6f85]">
          <MapPin size={13} />
          {item.kota}
        </p>
      </div>
    </article>
  );
}
