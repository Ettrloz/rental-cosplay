import { AuthField, AuthShell } from '@/components/auth-shell';
import { login, register } from '@/routes';
import { Head, Link, useForm } from '@inertiajs/react';
import clsx from 'clsx';
import { Store, User, UserPlus } from 'lucide-react';

const JENIS_AKUN = [
  {
    value: 'user',
    label: 'User Biasa',
    deskripsi: 'Cari & sewa kostum favorit.',
    icon: User
  },
  {
    value: 'cosrent',
    label: 'Perental',
    deskripsi: 'Sewakan kostummu ke orang lain.',
    icon: Store
  }
] as const;

export default function Register() {
  const form = useForm({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    jenis_akun: 'user'
  });

  return (
    <>
      <Head title="Buat Akun" />
      <AuthShell
        judul="Buat Akun"
        deskripsi="Daftar gratis untuk menyewa atau menyewakan kostum."
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
        <form
          className="space-y-4"
          onSubmit={event => {
            event.preventDefault();
            form.post(register.url(), {
              onFinish: () => form.reset('password', 'password_confirmation')
            });
          }}
        >
          <div>
            <span className="mb-1.5 block text-[13px] font-bold text-fg2">Jenis Akun</span>
            <div className="grid grid-cols-2 gap-2">
              {JENIS_AKUN.map(({ value, label, deskripsi, icon: Icon }) => {
                const aktif = form.data.jenis_akun === value;

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => form.setData('jenis_akun', value)}
                    className={clsx(
                      'flex flex-col gap-1.5 rounded-xl border p-3 text-left transition-colors',
                      aktif
                        ? 'border-accent bg-accent-soft'
                        : 'border-line bg-chip hover:border-line2'
                    )}
                  >
                    <span
                      className={clsx(
                        'grid h-8 w-8 place-items-center rounded-lg',
                        aktif ? 'bg-accent text-white' : 'bg-chip2 text-faint'
                      )}
                    >
                      <Icon size={16} />
                    </span>
                    <span className="text-[13.5px] font-extrabold text-fg">{label}</span>
                    <span className="text-[11.5px] leading-snug text-dim">{deskripsi}</span>
                  </button>
                );
              })}
            </div>
            {form.errors.jenis_akun ? (
              <span className="mt-1 block text-[12px] font-medium text-red-500">
                {form.errors.jenis_akun}
              </span>
            ) : null}
          </div>

          <AuthField
            label="Username"
            name="username"
            autoComplete="username"
            placeholder="mis. joko.rent"
            value={form.data.username}
            onChange={event => form.setData('username', event.target.value)}
            error={form.errors.username}
            required
          />
          <AuthField
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="mis. joko@email.com"
            value={form.data.email}
            onChange={event => form.setData('email', event.target.value)}
            error={form.errors.email}
            required
          />
          <AuthField
            label="Kata Sandi"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            value={form.data.password}
            onChange={event => form.setData('password', event.target.value)}
            error={form.errors.password}
            required
          />
          <AuthField
            label="Konfirmasi Kata Sandi"
            name="password_confirmation"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            value={form.data.password_confirmation}
            onChange={event => form.setData('password_confirmation', event.target.value)}
            error={form.errors.password_confirmation}
            required
          />
          <button
            type="submit"
            disabled={form.processing}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-[14.5px] font-extrabold text-white transition-colors duration-200 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            <UserPlus size={16} />
            Buat Akun
          </button>
        </form>
      </AuthShell>
    </>
  );
}
