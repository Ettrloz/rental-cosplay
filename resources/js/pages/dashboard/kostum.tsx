import { rupiah } from '@/data/katalog';
import type { KostumApi } from '@/hooks/use-kostum';
import { DashboardLayout } from '@/layouts/dashboard-layout';
import { Link, router } from '@inertiajs/react';
import clsx from 'clsx';
import { Eye, Package, Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function DashboardKostum({ costumes }: { costumes: KostumApi[] }) {
  const [hapusId, setHapusId] = useState<number | null>(null);

  const hapus = (id: number) => {
    if (!window.confirm('Hapus kostum ini? Tindakan tidak bisa dibatalkan.')) {
      return;
    }

    setHapusId(id);
    router.delete(`/dashboard/kostum/${id}`, {
      preserveScroll: true,
      onFinish: () => setHapusId(null)
    });
  };

  return (
    <DashboardLayout
      title="Kostum Saya"
      description="Daftar kostum yang kamu sewakan. Penyewa akan diarahkan ke kontak WhatsApp/Instagram milikmu."
    >
      <div className="mb-6 flex items-center justify-between gap-3">
        <p className="text-[13.5px] font-semibold text-dim">{costumes.length} kostum terdaftar</p>
        <Link
          href="/dashboard/kostum/tambah"
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-[13.5px] font-extrabold text-white transition-colors hover:bg-accent-hover"
        >
          <Plus size={15} />
          Tambah Kostum
        </Link>
      </div>

      {costumes.length > 0 ? (
        <div className="grid gap-4">
          {costumes.map(item => (
            <article
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border border-line bg-card p-4 sm:flex-row sm:items-center"
            >
              <div className="grid h-24 w-full shrink-0 place-items-center overflow-hidden rounded-xl bg-card2 sm:h-20 sm:w-28">
                {item.gambar?.[0] ? (
                  <img
                    src={item.gambar[0]}
                    alt={item.judul}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Package size={28} className="text-fade" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="line-clamp-1 text-[15px] font-extrabold text-fg">{item.judul}</h2>
                  <span
                    className={clsx(
                      'rounded-full px-2 py-0.5 text-[11px] font-extrabold',
                      item.status === 'available'
                        ? 'bg-[#34d399]/12 text-[#34d399]'
                        : 'bg-chip text-fade'
                    )}
                  >
                    {item.status === 'available' ? 'Tersedia' : 'Tidak tersedia'}
                  </span>
                </div>
                <p className="mt-1 text-[13.5px] font-extrabold text-accent-text">
                  {rupiah.format(item.harga)}
                  <span className="font-semibold text-faint"> / {item.rentalDays ?? 3} hari</span>
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] text-faint">
                  <span className="truncate">
                    {item.brand} · {item.karakter}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Eye size={12} />
                    {item.dilihat.toLocaleString('id-ID')}
                  </span>
                  <span className="truncate">{item.kota}</span>
                </div>
              </div>

              <div className="flex shrink-0 gap-2">
                <Link
                  href={`/dashboard/kostum/${item.id}/edit`}
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-chip px-4 py-2.5 text-[13px] font-extrabold text-fg transition-colors hover:border-line2"
                >
                  <Pencil size={14} />
                  Edit
                </Link>
                <button
                  type="button"
                  disabled={hapusId === item.id}
                  onClick={() => hapus(item.id as number)}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#f87171]/30 bg-[#f87171]/10 px-4 py-2.5 text-[13px] font-extrabold text-[#f87171] transition-colors hover:bg-[#f87171]/20 disabled:opacity-50"
                >
                  <Trash2 size={14} />
                  Hapus
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-line bg-card px-5 py-16 text-center">
          <Package size={28} className="mx-auto text-faint" />
          <p className="mt-3 text-[15px] font-bold text-fg">Belum ada kostum</p>
          <p className="mt-1 text-[13.5px] text-dim">
            Unggah kostum pertamamu untuk mulai disewa orang lain.
          </p>
          <Link
            href="/dashboard/kostum/tambah"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-[13.5px] font-extrabold text-white transition-colors hover:bg-accent-hover"
          >
            <Plus size={15} />
            Tambah Kostum
          </Link>
        </div>
      )}
    </DashboardLayout>
  );
}
