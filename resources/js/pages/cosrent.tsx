import { CosrentCard } from '@/components/cosrent-card';
import { COSRENT } from '@/data/cosrent';
import { AppLayout } from '@/layouts/app-layout';
import { register } from '@/routes';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Users } from 'lucide-react';

export default function Cosrent() {
  return (
    <AppLayout>
      <Head title="List Cosrent" />

      <section>
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <div data-reveal className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-1.5 text-[12px] font-semibold text-[#c4b5fd] ring-1 ring-white/10">
              <Users size={13} />
              {COSRENT.length} cosrent aktif se-Indonesia
            </span>
            <h1 className="mt-5 text-3xl leading-[1.15] font-extrabold tracking-tight text-white sm:text-4xl">
              List Cosrent
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-[#8a8a9c]">
              Temukan penyewa kostum terpercaya di kotamu. Setiap cosrent sudah terverifikasi dengan
              riwayat ulasan dari penyewa sebelumnya.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COSRENT.map(item => (
              <CosrentCard key={item.username} item={item} />
            ))}
          </div>

          <div
            data-reveal
            className="mt-10 rounded-3xl border border-white/10 bg-[#18181f] px-6 py-10 text-center"
          >
            <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
              Buka kosrent-mu sendiri
            </h2>
            <p className="mx-auto mt-2 max-w-md text-[14.5px] text-[#8a8a9c]">
              Gratis daftar, tanpa biaya listing. Unggah kostummu dan mulai dapat penghasilan
              tambahan.
            </p>
            <Link
              href={register.url()}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#7c3aed] px-6 py-3.5 text-[14.5px] font-extrabold text-white transition-colors duration-200 hover:bg-[#6d28d9]"
            >
              Daftar Jadi Cosrent
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
