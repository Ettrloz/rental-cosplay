import { AuthField, AuthShell } from '@/components/auth-shell';
import { login, register } from '@/routes';
import { Head, Link, useForm } from '@inertiajs/react';
import { LogIn } from 'lucide-react';

export default function Login() {
  const form = useForm({ email: '', password: '' });

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
        <form
          className="space-y-4"
          onSubmit={event => {
            event.preventDefault();
            form.post(login.url(), { onFinish: () => form.reset('password') });
          }}
        >
          <AuthField
            label="Username atau Email"
            name="email"
            autoComplete="username"
            placeholder="mis. joko.rent / joko@email.com"
            value={form.data.email}
            onChange={event => form.setData('email', event.target.value)}
            error={form.errors.email}
            required
          />
          <AuthField
            label="Kata Sandi"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={form.data.password}
            onChange={event => form.setData('password', event.target.value)}
            error={form.errors.password}
            required
          />
          <button
            type="submit"
            disabled={form.processing}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-[14.5px] font-extrabold text-white transition-colors duration-200 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogIn size={16} />
            Masuk
          </button>
        </form>
      </AuthShell>
    </>
  );
}
