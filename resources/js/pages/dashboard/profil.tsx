import { Field, TextArea, TextInput, inputClass } from '@/components/form-field';
import { useToast } from '@/components/toast';
import { DashboardLayout } from '@/layouts/dashboard-layout';
import { waLink } from '@/lib/kontak';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Camera, ClipboardList, ImageIcon, MessageCircle, Save, Store, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Kota = { id: number; province_id: number; name: string };

type Props = {
  profile: {
    shop_name: string;
    city_id: number | null;
    bio: string | null;
    thumbnail: string | null;
    rental_rules: string | null;
    rental_rules_image: string | null;
    whatsapp: string | null;
    instagram: string | null;
  } | null;
  cities: Kota[];
  flash?: { success?: string };
};

export default function DashboardProfil({ profile, cities }: Props) {
  const { panggil, toast } = useToast();
  const { flash } = usePage<{ flash: { success?: string } }>().props;

  // Thumbnail
  const [thumbnailLoading, setThumbnailLoading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(profile?.thumbnail ?? null);
  const thumbnailRef = useRef<HTMLInputElement>(null);

  // Rental rules image
  const [rulesImgLoading, setRulesImgLoading] = useState(false);
  const [rulesImgPreview, setRulesImgPreview] = useState<string | null>(profile?.rental_rules_image ?? null);
  const rulesImgRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    shop_name: profile?.shop_name ?? '',
    city_id: profile?.city_id ? String(profile.city_id) : '',
    bio: profile?.bio ?? '',
    whatsapp: profile?.whatsapp ?? '',
    instagram: profile?.instagram ?? '',
    rental_rules: profile?.rental_rules ?? '',
    thumbnail: null as File | null,
    rental_rules_image: null as File | null,
  });

  useEffect(() => {
    if (flash?.success) panggil(flash.success);
  }, [flash?.success, panggil]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    form.put('/dashboard/profil', { preserveScroll: true, forceFormData: true });
  };

  // ── Thumbnail handlers ─────────────────────────────────────────
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    const reader = new FileReader();
    reader.onload = ev => setThumbnailPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
    form.setData('thumbnail', file);
  };

  const handleThumbnailDelete = () => {
    setThumbnailLoading(true);
    router.delete('/dashboard/profil/thumbnail', {
      preserveScroll: true,
      onSuccess: () => { setThumbnailPreview(null); form.setData('thumbnail', null); setThumbnailLoading(false); },
      onError: () => { setThumbnailLoading(false); panggil('Gagal menghapus thumbnail.'); },
    });
  };

  // ── Rental rules image handlers ────────────────────────────────
  const handleRulesImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    const reader = new FileReader();
    reader.onload = ev => setRulesImgPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
    form.setData('rental_rules_image', file);
  };

  const handleRulesImgDelete = () => {
    setRulesImgLoading(true);
    router.delete('/dashboard/profil/rental-rules-image', {
      preserveScroll: true,
      onSuccess: () => { setRulesImgPreview(null); form.setData('rental_rules_image', null); setRulesImgLoading(false); },
      onError: () => { setRulesImgLoading(false); panggil('Gagal menghapus gambar aturan sewa.'); },
    });
  };

  const contohTautan = waLink(
    form.data.whatsapp || null,
    'Halo, saya mau sewa kostum dari Lumisse Cosplay.'
  );

  return (
    <DashboardLayout
      title="Profil Toko"
      description="Isi data tokomu. WhatsApp/Instagram di sini menjadi tautan 'Sewa' pada setiap kostum yang kamu unggah."
    >
      <Head title="Profil Toko" />

      <form onSubmit={submit} className="grid gap-5">

        {/* ── Thumbnail Toko ─────────────────────────────────────── */}
        <div className="rounded-2xl border border-line bg-card">
          <div className="flex flex-col sm:flex-row">
            {/* Kiri */}
            <div className="flex shrink-0 flex-col items-center justify-center gap-3 border-b border-line p-6 sm:w-56 sm:border-b-0 sm:border-r">
              <div className="relative">
                {thumbnailPreview ? (
                  <img src={thumbnailPreview} alt="Thumbnail toko" className="h-28 w-44 rounded-xl border border-line object-cover" />
                ) : (
                  <div className="flex h-28 w-44 items-center justify-center rounded-xl border-2 border-dashed border-line bg-chip">
                    <ImageIcon size={28} className="text-faint" />
                  </div>
                )}
                {thumbnailLoading && <LoadingOverlay rounded="rounded-xl" />}
              </div>
              <span className="text-center text-[12px] font-semibold text-faint">Thumbnail Toko</span>
            </div>

            {/* Kanan */}
            <div className="min-w-0 flex-1 p-5">
              <h2 className="flex items-center gap-2 text-[13px] font-extrabold text-fg">
                <ImageIcon size={15} className="text-accent-text" />
                Thumbnail Toko
              </h2>
              <p className="mt-1 text-[12.5px] text-dim">
                Gambar utama tokomu yang tampil di halaman daftar cosrent. Maks 2 MB, JPG / PNG / WebP.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" disabled={thumbnailLoading} onClick={() => thumbnailRef.current?.click()}
                  className="inline-flex items-center gap-2 rounded-xl border border-line bg-chip px-3.5 py-2 text-[13px] font-bold text-fg transition-colors hover:border-line2 hover:bg-chip2 disabled:opacity-50">
                  <Camera size={14} />
                  {thumbnailPreview ? 'Ganti Thumbnail' : 'Unggah Thumbnail'}
                </button>
                {form.data.thumbnail ? (
                  <button type="button" onClick={() => { setThumbnailPreview(profile?.thumbnail ?? null); form.setData('thumbnail', null); }}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#f87171]/30 bg-[#f87171]/5 px-3.5 py-2 text-[13px] font-bold text-[#f87171] transition-colors hover:bg-[#f87171]/15">
                    <X size={14} /> Batalkan
                  </button>
                ) : thumbnailPreview ? (
                  <button type="button" disabled={thumbnailLoading} onClick={handleThumbnailDelete}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#f87171]/30 bg-[#f87171]/5 px-3.5 py-2 text-[13px] font-bold text-[#f87171] transition-colors hover:bg-[#f87171]/15 disabled:opacity-50">
                    <X size={14} /> Hapus
                  </button>
                ) : null}
              </div>
            </div>
          </div>
          <input ref={thumbnailRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleThumbnailChange} />
        </div>

        {/* ── Data Toko ──────────────────────────────────────────── */}
        <div className="rounded-2xl border border-line bg-card p-5">
          <h2 className="flex items-center gap-2 text-[13px] font-extrabold text-fg">
            <Store size={15} className="text-accent-text" />
            Data Toko
          </h2>
          <div className="mt-4 grid gap-4">
            <Field label="Nama toko" error={form.errors.shop_name}>
              <TextInput
                value={form.data.shop_name}
                onChange={e => form.setData('shop_name', e.target.value)}
                placeholder="Contoh: Ebi Cosrent"
                invalid={Boolean(form.errors.shop_name)}
              />
            </Field>

            <Field label="Kota" error={form.errors.city_id}>
              <select value={form.data.city_id} onChange={e => form.setData('city_id', e.target.value)} className={inputClass}>
                <option value="">Pilih kota</option>
                {cities.map(kota => (
                  <option key={kota.id} value={kota.id}>{kota.name}</option>
                ))}
              </select>
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="WhatsApp" error={form.errors.whatsapp} hint="Format bebas, mis. 0812xxxx atau 62812xxxx.">
                <TextInput value={form.data.whatsapp} onChange={e => form.setData('whatsapp', e.target.value)} placeholder="08123456789" invalid={Boolean(form.errors.whatsapp)} />
              </Field>
              <Field label="Instagram" error={form.errors.instagram} hint="Username tanpa @.">
                <TextInput value={form.data.instagram} onChange={e => form.setData('instagram', e.target.value)} placeholder="namatoko" invalid={Boolean(form.errors.instagram)} />
              </Field>
            </div>

            <Field label="Bio toko" error={form.errors.bio}>
              <TextArea value={form.data.bio} onChange={e => form.setData('bio', e.target.value)} placeholder="Ceritakan singkat tentang koleksi dan layanan sewamu." />
            </Field>
          </div>
        </div>

        {/* ── Aturan Sewa ────────────────────────────────────────── */}
        <div className="rounded-2xl border border-line bg-card">
          <div className="flex flex-col sm:flex-row">
            {/* Kiri — gambar aturan */}
            <div className="flex shrink-0 flex-col items-center justify-center gap-3 border-b border-line p-6 sm:w-56 sm:border-b-0 sm:border-r">
              <div className="relative">
                {rulesImgPreview ? (
                  <img src={rulesImgPreview} alt="Gambar aturan sewa" className="h-36 w-44 rounded-xl border border-line object-cover" />
                ) : (
                  <div className="flex h-36 w-44 items-center justify-center rounded-xl border-2 border-dashed border-line bg-chip">
                    <ClipboardList size={28} className="text-faint" />
                  </div>
                )}
                {rulesImgLoading && <LoadingOverlay rounded="rounded-xl" />}
              </div>
              <span className="text-center text-[12px] font-semibold text-faint">Gambar Aturan</span>
            </div>

            {/* Kanan — teks & tombol gambar */}
            <div className="min-w-0 flex-1 p-5">
              <h2 className="flex items-center gap-2 text-[13px] font-extrabold text-fg">
                <ClipboardList size={15} className="text-accent-text" />
                Aturan Sewa
              </h2>
              <p className="mt-1 text-[12.5px] text-dim">
                Aturan ini ditampilkan di setiap halaman detail kostummu. Bisa berupa teks, gambar, atau keduanya.
              </p>

              <div className="mt-4">
                <Field label="Teks aturan sewa" error={form.errors.rental_rules}>
                  <TextArea
                    value={form.data.rental_rules}
                    onChange={e => form.setData('rental_rules', e.target.value)}
                    placeholder={"Contoh:\n• Kostum dikembalikan dalam kondisi bersih\n• Deposit 50% saat pemesanan\n• Keterlambatan kena denda Rp10.000/hari"}
                    rows={5}
                  />
                </Field>
              </div>

              <div className="mt-3">
                <p className="mb-2 text-[12.5px] font-semibold text-fg2">Gambar aturan <span className="font-normal text-faint">(opsional)</span></p>
                <div className="flex flex-wrap gap-2">
                  <button type="button" disabled={rulesImgLoading} onClick={() => rulesImgRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-xl border border-line bg-chip px-3.5 py-2 text-[13px] font-bold text-fg transition-colors hover:border-line2 hover:bg-chip2 disabled:opacity-50">
                    <Camera size={14} />
                    {rulesImgPreview ? 'Ganti Gambar' : 'Unggah Gambar'}
                  </button>
                  {form.data.rental_rules_image ? (
                    <button type="button" onClick={() => { setRulesImgPreview(profile?.rental_rules_image ?? null); form.setData('rental_rules_image', null); }}
                      className="inline-flex items-center gap-2 rounded-xl border border-[#f87171]/30 bg-[#f87171]/5 px-3.5 py-2 text-[13px] font-bold text-[#f87171] transition-colors hover:bg-[#f87171]/15">
                      <X size={14} /> Batalkan
                    </button>
                  ) : rulesImgPreview ? (
                    <button type="button" disabled={rulesImgLoading} onClick={handleRulesImgDelete}
                      className="inline-flex items-center gap-2 rounded-xl border border-[#f87171]/30 bg-[#f87171]/5 px-3.5 py-2 text-[13px] font-bold text-[#f87171] transition-colors hover:bg-[#f87171]/15 disabled:opacity-50">
                      <X size={14} /> Hapus
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <input ref={rulesImgRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleRulesImgChange} />
        </div>

        {/* ── Pratinjau tautan sewa ──────────────────────────────── */}
        {contohTautan ? (
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-card p-4">
            <span className="inline-flex items-center gap-2 text-[13px] font-bold text-fg2">
              <MessageCircle size={15} className="text-accent-text" />
              Pratinjau tautan sewa
            </span>
            <a href={contohTautan} target="_blank" rel="noreferrer"
              className="truncate text-[12.5px] font-semibold text-accent-text hover:underline">
              {contohTautan}
            </a>
          </div>
        ) : null}

        <div>
          <button type="submit" disabled={form.processing}
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-[14px] font-extrabold text-white transition-colors hover:bg-accent-hover disabled:opacity-60">
            <Save size={16} />
            {form.processing ? 'Menyimpan...' : 'Simpan profil'}
          </button>
        </div>
      </form>

      {toast}
    </DashboardLayout>
  );
}

function LoadingOverlay({ rounded }: { rounded: string }) {
  return (
    <div className={`absolute inset-0 flex items-center justify-center bg-black/40 ${rounded}`}>
      <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
      </svg>
    </div>
  );
}
