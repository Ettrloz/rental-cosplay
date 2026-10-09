import { AuthField, AuthShell } from '@/components/auth-shell';
import { register } from '@/routes';
import { Head, Link } from '@inertiajs/react';
import { LogIn } from 'lucide-react';

export default function Login() {
  return (
    <>
      <Head title="Masuk" />
      <AuthShell
        judul="Masuk"
        deskripsi="Masuk pakai username atau email dan kata sandi."
        footer={
          <>
            Belum punya akun?{' '}
            <Link
              href={register.url()}
              className="font-bold text-accent-text transition-colors hover:text-accent-hover"
            >
              Buat akun
            </Link>
          </>
        }
      >
        <form className="space-y-4" onSubmit={event => event.preventDefault()}>
          <AuthField
            label="Username atau Email"
            autoComplete="username"
            placeholder="mis. joko.rent / joko@email.com"
          />
          <AuthField
            label="Kata Sandi"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
          />
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-[14.5px] font-extrabold text-white transition-colors duration-200 hover:bg-accent-hover"
          >
            <LogIn size={16} />
            Masuk
          </button>
        </form>
      </AuthShell>
    </>
  );
}
