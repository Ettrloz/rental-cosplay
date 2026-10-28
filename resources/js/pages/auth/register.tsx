import { AuthField, AuthShell } from '@/components/auth-shell';
import { login, register } from '@/routes';
import { Head, Link, useForm } from '@inertiajs/react';
import clsx from 'clsx';
import { ImagePlus, Store, User, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';

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
    jenis_akun: 'user',
    shop_name: '',
    whatsapp: '',
    instagram: '',
    city_id: '',
    bio: '',
    avatar: null as File | null
  });
  const [cities, setCities] = useState<{ id: number; name: string }[]>([]);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    if (form.data.jenis_akun !== 'cosrent' || cities.length > 0) return;
    fetch('/api/cities', { headers: { Accept: 'application/json' } })
      .then(response => (response.ok ? response.json() : null))
      .then(payload => setCities(payload?.data ?? []))
      .catch(() => setCities([]));
  }, [form.data.jenis_akun, cities.length]);

  return (
    <>
      <Head title="Buat Akun" />
      <AuthShell
        judul="Buat Akun"
        deskripsi="Daftar gratis untuk menyewa atau menyewakan kostum."
        lebar={form.data.jenis_akun === 'cosrent' ? 'xl' : 'sm'}
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
          className={clsx(
            'grid gap-6',
            form.data.jenis_akun === 'cosrent' ? 'lg:grid-cols-2' : 'grid-cols-1'
          )}
          onSubmit={event => {
            event.preventDefault();
            form.post(register.url(), {
              onFinish: () => form.reset('password', 'password_confirmation')
            });
          }}
        >
          <div className={form.data.jenis_akun === 'cosrent' ? 'lg:col-span-2' : undefined}>
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

          <div className="grid gap-4 rounded-2xl border border-line bg-chip/40 p-4">
            <h2 className="text-sm font-extrabold text-fg">Data akun</h2>
            <div className="flex items-center gap-4">
              <label className="relative grid h-20 w-20 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-full border-2 border-dashed border-line2 bg-chip2 transition-colors hover:border-accent">
                {avatarPreview ? <img src={avatarPreview} alt="Pratinjau avatar" className="h-full w-full object-cover" /> : <ImagePlus size={22} className="text-faint" />}
                <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={event => { const file = event.target.files?.[0]; if (!file) return; form.setData('avatar', file); setAvatarPreview(URL.createObjectURL(file)); }} />
              </label>
              <div><p className="text-[13px] font-bold text-fg2">Foto profil</p><p className="mt-1 text-xs leading-relaxed text-dim">Opsional. JPG, PNG, atau WebP maksimal 2 MB.</p></div>
            </div>
            <AuthField label="Username" name="username" autoComplete="username" placeholder="mis. joko.rent" value={form.data.username} onChange={event => form.setData('username', event.target.value)} error={form.errors.username} required />
            <AuthField label="Email" name="email" type="email" autoComplete="email" placeholder="mis. joko@email.com" value={form.data.email} onChange={event => form.setData('email', event.target.value)} error={form.errors.email} required />
            <div className="grid gap-4 sm:grid-cols-2">
              <AuthField label="Kata Sandi" name="password" type="password" autoComplete="new-password" placeholder="••••••••" value={form.data.password} onChange={event => form.setData('password', event.target.value)} error={form.errors.password} required />
              <AuthField label="Konfirmasi Kata Sandi" name="password_confirmation" type="password" autoComplete="new-password" placeholder="••••••••" value={form.data.password_confirmation} onChange={event => form.setData('password_confirmation', event.target.value)} error={form.errors.password_confirmation} required />
            </div>
          </div>
          {form.data.jenis_akun === 'cosrent' ? (
            <div className="grid gap-4 rounded-2xl border border-accent/30 bg-accent/5 p-4">
              <div>
                <h2 className="text-sm font-extrabold text-fg">Data toko</h2>
                <p className="mt-1 text-xs text-dim">Lengkapi data ini agar toko langsung siap digunakan.</p>
              </div>
              <AuthField label="Nama toko" name="shop_name" placeholder="mis. Moonlight Costume" value={form.data.shop_name} onChange={event => form.setData('shop_name', event.target.value)} error={form.errors.shop_name} required />
              <AuthField label="WhatsApp" name="whatsapp" placeholder="08xxxxxxxxxx" value={form.data.whatsapp} onChange={event => form.setData('whatsapp', event.target.value)} error={form.errors.whatsapp} required />
              <AuthField label="Instagram (opsional)" name="instagram" placeholder="@nama_toko" value={form.data.instagram} onChange={event => form.setData('instagram', event.target.value)} error={form.errors.instagram} />
              <label className="block"><span className="mb-1.5 block text-[13px] font-semibold text-fg2">Kota toko</span><select value={form.data.city_id} onChange={event => form.setData('city_id', event.target.value)} className="w-full rounded-xl border border-line bg-chip px-4 py-3 text-sm text-fg" required><option value="">Pilih kota</option>{cities.map(city => <option key={city.id} value={city.id}>{city.name}</option>)}</select>{form.errors.city_id ? <span className="mt-1 block text-xs text-red-500">{form.errors.city_id}</span> : null}</label>
              <label className="block"><span className="mb-1.5 block text-[13px] font-semibold text-fg2">Deskripsi toko (opsional)</span><textarea value={form.data.bio} onChange={event => form.setData('bio', event.target.value)} rows={3} className="w-full resize-y rounded-xl border border-line bg-chip px-4 py-3 text-sm text-fg placeholder:text-faint focus:border-accent focus:outline-none" placeholder="Ceritakan singkat tentang toko kamu" /></label>
            </div>
          ) : null}
          <button
            type="submit"
            className={clsx(
              'inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-[14.5px] font-extrabold text-white transition-colors duration-200 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60',
              form.data.jenis_akun === 'cosrent' && 'lg:col-span-2'
            )}
            disabled={form.processing}
          >
            <UserPlus size={16} />
            Buat Akun
          </button>
        </form>
      </AuthShell>
    </>
  );
}
