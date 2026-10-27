import { KostumCard } from '@/components/kostum-card';
import { StatCard } from '@/components/stat-card';
import { toKostum, type KostumApi } from '@/hooks/use-kostum';
import { DashboardLayout } from '@/layouts/dashboard-layout';
import type { Auth } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Eye, Heart, Package, Plus, Store } from 'lucide-react';
import { useMemo } from 'react';

type Props = {
  stats: { costumes: number; favorites: number; views: number };
  favorites: KostumApi[];
  auth: Auth;
};

export default function Dashboard() {
  const { stats, favorites, auth } = usePage<Props>().props;

  const daftarFavorit = useMemo(() => favorites.map(toKostum), [favorites]);
  const nama = auth.user?.name || auth.user?.username || 'Pengguna';
  const perental = auth.user?.role === 'cosrent';

  return (
    <DashboardLayout
      title={`Halo, ${nama}`}
      description="Kelola kostum yang kamu sewakan dan simpan kostum favorit untuk disewa kemudian. Tautan sewa diarahkan langsung ke WhatsApp atau Instagram penyewa kostum."
    >
      <Head title="Dashboard" />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Kostum saya" value={stats.costumes} icon={Package} />
        <StatCard label="Favorit" value={stats.favorites} icon={Heart} />
        <StatCard label="Total dilihat" value={stats.views} icon={Eye} />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {perental ? (
          <>
            <Link
              href="/dashboard/kostum/tambah"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-[14px] font-extrabold text-white transition-colors hover:bg-accent-hover"
            >
              <Plus size={16} />
              Tambah Kostum
            </Link>
            <Link
              href="/dashboard/profil"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-chip px-5 py-3 text-[14px] font-extrabold text-fg transition-colors hover:border-line2"
            >
              <Store size={16} />
              Atur Kontak Sewa
            </Link>
          </>
        ) : (
          <Link
            href="/dashboard/akun"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-[14px] font-extrabold text-white transition-colors hover:bg-accent-hover"
          >
            <Store size={16} />
            Jadi Perental
          </Link>
        )}
      </div>

      <section className="mt-10">
        <div className="flex items-center gap-2">
          <Heart size={16} className="text-accent-text" />
          <h2 className="text-[15px] font-extrabold text-fg">Kostum Favorit</h2>
        </div>

        {daftarFavorit.length > 0 ? (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {daftarFavorit.map(item => (
              <KostumCard key={item.id ?? item.judul} item={item} />
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-line bg-card px-5 py-12 text-center">
            <Heart size={26} className="mx-auto text-faint" />
            <p className="mt-3 text-[14.5px] font-bold text-fg">Belum ada kostum favorit</p>
            <p className="mt-1 text-[13px] text-dim">
              Tekan ikon hati pada kartu kostum untuk menyimpannya di sini.
            </p>
            <Link
              href="/katalog"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-[13.5px] font-extrabold text-white transition-colors hover:bg-accent-hover"
            >
              Jelajahi katalog
            </Link>
          </div>
        )}
      </section>

      <div className="mt-8 rounded-2xl border border-line bg-card p-5">
        <h2 className="flex items-center gap-2 text-[13px] font-extrabold text-fg">
          <Store size={15} className="text-accent-text" />
          {perental ? 'Sewakan kostummu' : 'Mulai sewakan kostummu'}
        </h2>
        <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-dim">
          {perental
            ? 'Lumisse Cosplay hanya menghubungkan pemilik kostum dengan penyewa — tanpa transaksi di dalam aplikasi. Atur WhatsApp/Instagram di profil toko, lalu setiap kostum yang kamu unggah otomatis punya tombol tautan untuk menghubungimu.'
            : 'Ubah jenis akunmu menjadi Perental untuk mulai mengunggah kostum. Lumisse Cosplay hanya menghubungkan pemilik kostum dengan penyewa — tanpa transaksi di dalam aplikasi.'}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {perental ? (
            <>
              <Link
                href="/dashboard/kostum/tambah"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-[13.5px] font-extrabold text-white transition-colors hover:bg-accent-hover"
              >
                <Plus size={15} />
                Unggah kostum
              </Link>
              <Link
                href="/dashboard/profil"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-chip px-5 py-2.5 text-[13.5px] font-extrabold text-fg transition-colors hover:border-line2"
              >
                Atur kontak sewa
              </Link>
            </>
          ) : (
            <Link
              href="/dashboard/akun"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-[13.5px] font-extrabold text-white transition-colors hover:bg-accent-hover"
            >
              <Store size={15} />
              Ubah ke Perental
            </Link>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
