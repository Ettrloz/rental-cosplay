import { Field, TextInput } from '@/components/form-field';
import { useToast } from '@/components/toast';
import { DashboardLayout } from '@/layouts/dashboard-layout';
import type { Auth } from '@/types';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import clsx from 'clsx';
import {
  AlertTriangle,
  Camera,
  Check,
  Store,
  Trash2,
  User,
  UserRound,
  X,
  type LucideIcon,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type JenisAkun = 'user' | 'cosrent';

type Props = {
  jenisAktif: JenisAkun;
  punyaKostum: boolean;
  auth: Auth;
  flash?: { success?: string; perlu_perental?: boolean };
};

const OPSI: { value: JenisAkun; label: string; deskripsi: string; icon: LucideIcon }[] = [
  {
    value: 'user',
    label: 'User Biasa',
    deskripsi: 'Cari & sewa kostum favorit.',
    icon: User,
  },
  {
    value: 'cosrent',
    label: 'Perental',
    deskripsi: 'Sewakan kostummu ke orang lain.',
    icon: Store,
  },
];

export default function DashboardAkun({ jenisAktif, punyaKostum }: Props) {
  const { auth, flash } = usePage<{ auth: Auth; flash?: Props['flash'] }>().props;
  const { panggil, toast } = useToast();

  const [konfirmasiHapus, setKonfirmasiHapus] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const jenisForm = useForm<{ jenis_akun: JenisAkun }>({ jenis_akun: jenisAktif });
  const hapusForm = useForm({ password: '' });

  useEffect(() => {
    if (flash?.success) {
      panggil(flash.success);
    }
  }, [flash?.success, panggil]);

  const user = auth?.user;
  const avatarUrl = user?.avatar ? `/storage/${user.avatar}` : null;

  const badges: Record<JenisAkun, string> = {
    user: 'User Biasa',
    cosrent: 'Perental',
  };

  const simpanJenis = (value: JenisAkun) => {
    jenisForm.setData('jenis_akun', value);
    jenisForm.put('/dashboard/akun/jenis', { preserveScroll: true });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    e.target.value = '';

    const formData = new FormData();
    formData.append('avatar', file);

    setAvatarLoading(true);

    router.post('/dashboard/akun/avatar', formData, {
      preserveScroll: true,
      forceFormData: true,
      onSuccess: () => setAvatarLoading(false),
      onError: () => {
        setAvatarLoading(false);
        panggil('Gagal mengunggah foto. Pastikan ukuran file tidak lebih dari 2 MB.');
      },
    });
  };

  const handleAvatarDelete = () => {
    setAvatarLoading(true);

    router.delete('/dashboard/akun/avatar', {
      preserveScroll: true,
      onSuccess: () => setAvatarLoading(false),
      onError: () => {
        setAvatarLoading(false);
        panggil('Gagal menghapus foto profil.');
      },
    });
  };

  return (
    <DashboardLayout
      title="Akun"
      description="Kelola jenis akunmu dan pengaturan keamanan."
    >
      <Head title="Akun" />

      {/* ── Foto Profil ──────────────────────────────────────────── */}
      <div className="rounded-2xl border border-line bg-card">
        <div className="flex flex-col sm:flex-row">
          {/* Kiri — foto */}
          <div className="flex shrink-0 flex-col items-center justify-center gap-3 border-b border-line p-6 sm:w-48 sm:border-b-0 sm:border-r">
            <div className="relative">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={user?.name ?? 'Foto profil'}
                  className="h-28 w-28 rounded-2xl border-2 border-line object-cover"
                />
              ) : (
                <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-dashed border-line bg-chip">
                  <UserRound size={36} className="text-faint" />
                </div>
              )}
              {avatarLoading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/40">
                  <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                  </svg>
                </div>
              )}
            </div>
            <span className="text-center text-[12px] font-semibold text-faint">Foto Profil</span>
          </div>

          {/* Kanan — info & tombol */}
          <div className="min-w-0 flex-1 p-5">
            <h2 className="flex items-center gap-2 text-[13px] font-extrabold text-fg">
              <Camera size={15} className="text-accent-text" />
              Foto Profil
            </h2>
            <p className="mt-1 text-[12.5px] text-dim">
              Ditampilkan di navbar dan profil. Maks 2 MB, JPG / PNG / WebP.
            </p>

            <div className="mt-4 space-y-1.5">
              <p className="text-[15px] font-extrabold text-fg">{user?.name || '-'}</p>
              <p className="text-[13px] text-dim">@{user?.username || '-'}</p>
              <p className="text-[12.5px] text-faint">{user?.email || '-'}</p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-[12px] font-extrabold text-accent-text">
                <Check size={12} />
                {badges[jenisAktif]}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                disabled={avatarLoading}
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-chip px-3.5 py-2 text-[13px] font-bold text-fg transition-colors hover:border-line2 hover:bg-chip2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Camera size={14} />
                {avatarUrl ? 'Ganti Foto' : 'Unggah Foto'}
              </button>
              {avatarUrl ? (
                <button
                  type="button"
                  disabled={avatarLoading}
                  onClick={handleAvatarDelete}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#f87171]/30 bg-[#f87171]/5 px-3.5 py-2 text-[13px] font-bold text-[#f87171] transition-colors hover:bg-[#f87171]/15 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <X size={14} />
                  Hapus
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleAvatarChange}
        />
      </div>

      {/* ── Jenis Akun ───────────────────────────────────────────── */}
      <section className="mt-5 rounded-2xl border border-line bg-card p-5">
        <h2 className="flex items-center gap-2 text-[13px] font-extrabold text-fg">
          <Store size={15} className="text-accent-text" />
          Jenis Akun
        </h2>
        <p className="mt-2 text-[13px] text-dim">
          Pilih cara kamu memakai Lumisse Cosplay. Kamu bisa menggantinya kapan saja.
        </p>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {OPSI.map(({ value, label, deskripsi, icon: Icon }) => {
            const aktif = jenisAktif === value;
            const terkunci = value === 'user' && punyaKostum;

            return (
              <button
                key={value}
                type="button"
                disabled={jenisForm.processing || aktif || terkunci}
                onClick={() => simpanJenis(value)}
                className={clsx(
                  'flex flex-col gap-1.5 rounded-xl border p-3 text-left transition-colors disabled:cursor-not-allowed',
                  aktif
                    ? 'border-accent bg-accent-soft'
                    : terkunci
                      ? 'border-line bg-chip opacity-60'
                      : 'border-line bg-chip hover:border-line2',
                )}
              >
                <span
                  className={clsx(
                    'grid h-8 w-8 place-items-center rounded-lg',
                    aktif ? 'bg-accent text-white' : 'bg-chip2 text-faint',
                  )}
                >
                  <Icon size={16} />
                </span>
                <span className="text-[13.5px] font-extrabold text-fg">{label}</span>
                <span className="text-[11.5px] leading-snug text-dim">{deskripsi}</span>
                {aktif ? (
                  <span className="text-[11.5px] font-bold text-accent-text">Jenis aktif</span>
                ) : null}
              </button>
            );
          })}
        </div>

        {punyaKostum ? (
          <p className="mt-3 text-[12px] text-faint">
            Kamu masih punya kostum terdaftar. Hapus semua kostum dulu untuk beralih ke User Biasa.
          </p>
        ) : null}

        {jenisForm.errors.jenis_akun ? (
          <p className="mt-2 text-[12px] font-semibold text-[#f87171]">
            {jenisForm.errors.jenis_akun}
          </p>
        ) : null}
      </section>

      {/* ── Zona Berbahaya ──────────────────────────────────────── */}
      <section className="mt-5 rounded-2xl border border-[#f87171]/30 bg-[#f87171]/5 p-5">
        <h2 className="flex items-center gap-2 text-[13px] font-extrabold text-[#f87171]">
          <AlertTriangle size={15} />
          Zona Berbahaya
        </h2>
        <p className="mt-2 text-[13px] text-dim">
          Menghapus akun akan menghapus profil toko, semua kostum, dan favoritmu secara permanen.
          Tindakan ini tidak bisa dibatalkan.
        </p>

        {konfirmasiHapus ? (
          <form
            className="mt-4 grid max-w-sm gap-3"
            onSubmit={event => {
              event.preventDefault();
              hapusForm.delete('/dashboard/akun', { preserveScroll: true });
            }}
          >
            <Field
              label="Konfirmasi kata sandi"
              error={hapusForm.errors.password}
              hint="Masukkan kata sandi akunmu untuk melanjutkan."
            >
              <TextInput
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={hapusForm.data.password}
                onChange={event => hapusForm.setData('password', event.target.value)}
                invalid={Boolean(hapusForm.errors.password)}
              />
            </Field>
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={hapusForm.processing}
                className="inline-flex items-center gap-2 rounded-xl bg-[#f87171] px-5 py-2.5 text-[13.5px] font-extrabold text-white transition-colors hover:bg-[#f87171]/90 disabled:opacity-60"
              >
                <Trash2 size={15} />
                {hapusForm.processing ? 'Menghapus...' : 'Ya, hapus permanen'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setKonfirmasiHapus(false);
                  hapusForm.reset();
                }}
                className="inline-flex items-center rounded-xl border border-line bg-chip px-5 py-2.5 text-[13.5px] font-extrabold text-fg transition-colors hover:border-line2"
              >
                Batal
              </button>
            </div>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setKonfirmasiHapus(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[#f87171]/40 bg-[#f87171]/10 px-5 py-2.5 text-[13.5px] font-extrabold text-[#f87171] transition-colors hover:bg-[#f87171]/20"
          >
            <Trash2 size={15} />
            Hapus Akun
          </button>
        )}
      </section>

      {toast}
    </DashboardLayout>
  );
}
