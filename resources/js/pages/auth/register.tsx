import { AuthField, AuthShell } from '@/components/auth-shell';
import { login } from '@/routes';
import { Head, Link } from '@inertiajs/react';
import { UserPlus } from 'lucide-react';

export default function Register() {
  return (
    <>
      <Head title="Buat Akun" />
      <AuthShell
        judul="Buat Akun"
        deskripsi="Daftar gratis untuk mulai sewa atau upload kostum."
        footer={
          <>
            Sudah punya akun?{' '}
            <Link
              href={login.url()}
              className="font-bold text-accent-text transition-colors hover:text-accent-hover"
            >
              Masuk
            </Link>
          </>
        }
      >
        <form className="space-y-4" onSubmit={event => event.preventDefault()}>
          <AuthField label="Username" autoComplete="username" placeholder="mis. joko.rent" />
          <AuthField
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="mis. joko@email.com"
          />
          <AuthField
            label="Kata Sandi"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
          />
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-[14.5px] font-extrabold text-white transition-colors duration-200 hover:bg-accent-hover"
          >
            <UserPlus size={16} />
            Buat Akun
          </button>
        </form>
      </AuthShell>
    </>
  );
}
