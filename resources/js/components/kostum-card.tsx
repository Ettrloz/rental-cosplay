import { rupiah, slugifyKostum, type Kostum } from '@/data/katalog';
import type { Auth } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import clsx from 'clsx';
import { Heart, MapPin } from 'lucide-react';
import { useState } from 'react';

export function KostumCard({ item }: { item: Kostum }) {
  const foto = item.gambar?.[0];
  const { auth } = usePage<{ auth: Auth }>().props;
  const userId = auth.user?.id ?? null;
  const [disimpan, setDisimpan] = useState(
    item.id ? (auth.favoriteIds ?? []).includes(item.id) : false
  );

  const toggleFavorit = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (!item.id) return;

    if (!userId) {
      router.visit('/login');
      return;
    }

    const berikutnya = !disimpan;
    setDisimpan(berikutnya);
    router.post(
      '/favorites',
      { costume_id: item.id },
      {
        preserveScroll: true,
        preserveState: true,
        onError: () => setDisimpan(!berikutnya)
      }
    );
  };

  return (
    <Link
      href={`/katalog/${item.slug ?? slugifyKostum(item.judul)}`}
      data-reveal
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-card transition-all duration-300 hover:-translate-y-1 hover:border-line2 hover:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.9)]"
    >
      <div className="relative overflow-hidden">
        {foto ? (
          <img
            src={foto}
            alt={item.judul}
            loading="lazy"
            className="aspect-4/3 w-full bg-card2 object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="grid aspect-4/3 place-items-center bg-card2 transition-transform duration-500 group-hover:scale-[1.02]">
            <item.icon
              size={52}
              className="text-fade transition-colors duration-300 group-hover:text-[#8f7ef0]"
              strokeWidth={1.2}
            />
          </div>
        )}
        {item.bundle ? (
          <span className="absolute top-3 left-3 rounded-full bg-[#fbbf24] px-2.5 py-1 text-[11px] font-extrabold text-[#3b2606]">
            Bundle
          </span>
        ) : null}
        <button
          type="button"
          aria-label={`Simpan ${item.judul} ke favorit`}
          aria-pressed={disimpan}
          onClick={toggleFavorit}
          className={clsx(
            'absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-black/45 backdrop-blur-sm transition-colors hover:text-[#f472b6]',
            disimpan ? 'text-[#f472b6]' : 'text-white/80'
          )}
        >
          <Heart size={15} fill={disimpan ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2">
          <span
            className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-chip2 text-[10px] font-extrabold text-fg"
            aria-hidden="true"
          >
            {item.pemilik.charAt(0)}
          </span>
          <span className="truncate text-[12px] font-semibold text-muted">{item.username}</span>
        </div>

        <h3 className="mt-2.5 line-clamp-2 text-[14.5px] leading-snug font-bold text-fg">
          {item.judul}
        </h3>

        <p className="mt-2 text-[13.5px] font-extrabold text-accent-text">
          {rupiah.format(item.harga)}
          <span className="font-semibold text-faint"> / 3 hari</span>
          {item.hargaCoret ? (
            <span className="ml-2 text-[12.5px] font-medium text-fade line-through">
              {rupiah.format(item.hargaCoret)}
            </span>
          ) : null}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="rounded-md bg-chip px-2 py-1 text-[11px] font-bold text-fg2">
            {item.ukuran}
          </span>
          <span className="rounded-md bg-chip px-2 py-1 text-[11px] font-bold text-fg2">
            LD: {item.ld}
          </span>
          <span className="rounded-md bg-chip px-2 py-1 text-[11px] font-bold text-fg2">
            LP: {item.lp}
          </span>
        </div>

        <dl className="mt-3 space-y-1.5 text-[12.5px]">
          <div className="flex gap-2">
            <dt className="w-14 shrink-0 text-fade">Brand</dt>
            <dd className="truncate text-muted">{item.brand}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-14 shrink-0 text-fade">Asal</dt>
            <dd className="truncate text-muted">{item.series}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-14 shrink-0 text-fade">Karakter</dt>
            <dd className="truncate text-muted">{item.karakter}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-14 shrink-0 text-fade">Gender</dt>
            <dd className="truncate text-muted">{item.gender}</dd>
          </div>
        </dl>

        <p className="mt-3 flex items-center gap-1.5 text-[12.5px] text-faint">
          <MapPin size={13} />
          {item.kota}
        </p>
      </div>
    </Link>
  );
}
