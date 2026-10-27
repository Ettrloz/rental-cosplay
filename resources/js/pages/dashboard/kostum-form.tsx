import { Field, TextArea, TextInput, inputClass } from '@/components/form-field';
import type { KostumApi } from '@/hooks/use-kostum';
import { DashboardLayout } from '@/layouts/dashboard-layout';
import { router, useForm } from '@inertiajs/react';
import { ArrowLeft, ImagePlus, Save, X } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';

type Kota = { id: number; province_id: number; name: string };

type Props = {
  costume: KostumApi | null;
  cities: Kota[];
  profile: { shop_name: string; whatsapp: string | null; instagram: string | null } | null;
};

const GENDER = [
  { value: 'wanita', label: 'Wanita' },
  { value: 'pria', label: 'Pria' },
  { value: 'unisex', label: 'Unisex' }
];

const STATUS = [
  { value: 'available', label: 'Tersedia' },
  { value: 'unavailable', label: 'Tidak tersedia' }
];

export default function DashboardKostumForm({ costume, cities, profile }: Props) {
  const edit = Boolean(costume?.id);

  const form = useForm({
    title: costume?.judul ?? '',
    price: costume ? String(costume.harga) : '',
    rental_days: costume ? String(costume.rentalDays ?? 3) : '3',
    brand: costume?.brand && costume.brand !== '-' ? costume.brand : '',
    series: costume?.series && costume.series !== '-' ? costume.series : '',
    character: costume?.karakter && costume.karakter !== '-' ? costume.karakter : '',
    gender: (costume?.gender ?? 'wanita').toLowerCase(),
    size: costume?.ukuran && costume.ukuran !== 'All Size' ? costume.ukuran : '',
    chest: costume?.ld && costume.ld !== '-' ? costume.ld : '',
    waist: costume?.lp && costume.lp !== '-' ? costume.lp : '',
    description: costume?.deskripsi ?? '',
    city_id: costume?.cityId ? String(costume.cityId) : '',
    status: costume?.status ?? 'available',
    images: [] as File[]
  });

  // Gambar lama dari server
  const [gambarAda, setGambarAda] = useState<string[]>(costume?.gambar ?? []);
  // Preview gambar baru yang dipilih {file, url}
  const [previews, setPreviews] = useState<{ file: File; url: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: File[]) => {
    const fileList = Array.from(files ?? []);
    if (!fileList.length) return;

    const sisaSlot = 8 - gambarAda.length - previews.length;
    if (sisaSlot <= 0) return;

    const fileBaru = fileList
      .filter(file => file.type.startsWith('image/'))
      .slice(0, sisaSlot);

    if (!fileBaru.length) return;

    const newPreviews = fileBaru.map(file => ({
      file,
      url: URL.createObjectURL(file),
    }));

    const updatedPreviews = [...previews, ...newPreviews];
    setPreviews(updatedPreviews);
    form.setData('images', updatedPreviews.map(p => p.file));
  };

  const tambahGambar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    e.target.value = '';
    handleFiles(files);
  };

  const [dragActive, setDragActive] = useState(false);
  const dragCounter = useRef(0);

  const handleDragEnter = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragActive(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) {
      setDragActive(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    dragCounter.current = 0;

    if (totalGambar >= 8) return;

    const files = Array.from(e.dataTransfer.files ?? []);
    handleFiles(files);
  };

  const hapusPreview = (index: number) => {
    URL.revokeObjectURL(previews[index].url);
    const updated = previews.filter((_, i) => i !== index);
    setPreviews(updated);
    form.setData('images', updated.map(p => p.file));
  };

  const hapusGambarAda = (src: string) => {
    if (!costume?.id) return;
    // Optimistic UI — hapus langsung dari tampilan
    setGambarAda(prev => prev.filter(s => s !== src));
    // Kirim request hapus gambar ke server via URL gambar
    router.delete(`/dashboard/kostum/${costume.id}/images`, {
      data: { url: src },
      preserveScroll: true,
      onError: () => {
        // Kembalikan jika gagal
        setGambarAda(prev => [...prev, src]);
      },
    });
  };

  const totalGambar = gambarAda.length + previews.length;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (edit) {
      form.put(`/dashboard/kostum/${costume?.id}`, { forceFormData: true });
    } else {
      form.post('/dashboard/kostum', { forceFormData: true });
    }
  };

  return (
    <DashboardLayout
      title={edit ? 'Edit Kostum' : 'Tambah Kostum'}
      description="Lengkapi data kostum. Penyewa akan menghubungimu lewat WhatsApp/Instagram yang diatur di profil toko."
    >
      <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="grid gap-5 rounded-2xl border border-line bg-card p-5">
          <Field label="Judul kostum" error={form.errors.title}>
            <TextInput
              value={form.data.title}
              onChange={e => form.setData('title', e.target.value)}
              placeholder="Contoh: Silver Wolf Lv.999 Honkai Star Rail"
              invalid={Boolean(form.errors.title)}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Harga sewa (Rp)" error={form.errors.price}>
              <TextInput
                type="number"
                min={0}
                value={form.data.price}
                onChange={e => form.setData('price', e.target.value)}
                placeholder="250000"
                invalid={Boolean(form.errors.price)}
              />
            </Field>
            <Field label="Durasi sewa (hari)" error={form.errors.rental_days}>
              <TextInput
                type="number"
                min={1}
                max={30}
                value={form.data.rental_days}
                onChange={e => form.setData('rental_days', e.target.value)}
                invalid={Boolean(form.errors.rental_days)}
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Brand" error={form.errors.brand}>
              <TextInput
                value={form.data.brand}
                onChange={e => form.setData('brand', e.target.value)}
              />
            </Field>
            <Field label="Series" error={form.errors.series}>
              <TextInput
                value={form.data.series}
                onChange={e => form.setData('series', e.target.value)}
              />
            </Field>
            <Field label="Karakter" error={form.errors.character}>
              <TextInput
                value={form.data.character}
                onChange={e => form.setData('character', e.target.value)}
              />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-4">
            <Field label="Gender" error={form.errors.gender}>
              <select
                value={form.data.gender}
                onChange={e => form.setData('gender', e.target.value)}
                className={inputClass}
              >
                {GENDER.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Ukuran" error={form.errors.size}>
              <TextInput
                value={form.data.size}
                onChange={e => form.setData('size', e.target.value)}
                placeholder="M - L"
              />
            </Field>
            <Field label="Lingkar dada (cm)" error={form.errors.chest}>
              <TextInput
                value={form.data.chest}
                onChange={e => form.setData('chest', e.target.value)}
                placeholder="88-92"
              />
            </Field>
            <Field label="Lingkar pinggang (cm)" error={form.errors.waist}>
              <TextInput
                value={form.data.waist}
                onChange={e => form.setData('waist', e.target.value)}
                placeholder="70-74"
              />
            </Field>
          </div>

          <Field label="Deskripsi" error={form.errors.description}>
            <TextArea
              value={form.data.description}
              onChange={e => form.setData('description', e.target.value)}
              placeholder="Kondisi kostum, kelengkapan, catatan lain..."
            />
          </Field>
        </div>

        <div className="grid gap-5 self-start">
          <div className="grid gap-5 rounded-2xl border border-line bg-card p-5">
            <Field label="Kota" error={form.errors.city_id}>
              <select
                value={form.data.city_id}
                onChange={e => form.setData('city_id', e.target.value)}
                className={inputClass}
              >
                <option value="">— Pilih kota —</option>
                {cities.map(kota => (
                  <option key={kota.id} value={kota.id}>
                    {kota.name}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Status" error={form.errors.status}>
              <select
                value={form.data.status}
                onChange={e => form.setData('status', e.target.value)}
                className={inputClass}
              >
                {STATUS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid gap-3 rounded-2xl border border-line bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] font-bold text-fg2">Foto kostum</span>
              <span className="text-[12px] text-faint">{totalGambar}/8</span>
            </div>

            {/* Grid preview — gambar lama + baru */}
            {(gambarAda.length > 0 || previews.length > 0) ? (
              <div className="grid grid-cols-3 gap-2">
                {/* Gambar lama dari server */}
                {gambarAda.map((src, i) => (
                  <div key={src} className="group relative aspect-square">
                    <img
                      src={src}
                      alt={`Foto ${i + 1}`}
                      className="h-full w-full rounded-lg object-cover"
                    />
                    {edit ? (
                      <button
                        type="button"
                        onClick={() => hapusGambarAda(src)}
                        className="absolute top-1 right-1 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-[#f87171]"
                        aria-label="Hapus foto"
                      >
                        <X size={12} />
                      </button>
                    ) : null}
                  </div>
                ))}

                {/* Preview gambar baru (belum disimpan) */}
                {previews.map((p, i) => (
                  <div key={p.url} className="group relative aspect-square">
                    <img
                      src={p.url}
                      alt={`Preview ${i + 1}`}
                      className="h-full w-full rounded-lg object-cover ring-2 ring-accent/50"
                    />
                    <button
                      type="button"
                      onClick={() => hapusPreview(i)}
                      className="absolute top-1 right-1 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-[#f87171]"
                      aria-label="Batalkan foto ini"
                    >
                      <X size={12} />
                    </button>
                    {/* Badge "baru" */}
                    <span className="absolute bottom-1 left-1 rounded-md bg-accent px-1.5 py-0.5 text-[10px] font-extrabold text-white">
                      Baru
                    </span>
                  </div>
                ))}
              </div>
            ) : null}

            {/* Dropzone tambah foto */}
            {totalGambar < 8 ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-5 text-[13px] font-bold transition-colors ${
                  dragActive
                    ? 'border-accent bg-accent/10 text-fg'
                    : 'border-line2 bg-chip text-dim hover:border-accent hover:text-fg'
                }`}
              >
                <ImagePlus size={16} />
                {dragActive
                  ? 'Lepaskan foto di sini'
                  : `Tambah atau seret foto (${8 - totalGambar} slot tersisa)`}
              </button>
            ) : (
              <p className="text-center text-[12px] text-faint">Maksimal 8 foto tercapai</p>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={tambahGambar}
            />

            <p className="text-[12px] text-faint">
              {edit
                ? 'Hover foto lama lalu klik × untuk menghapus. Foto baru (biru) ditambahkan saat simpan.'
                : 'Format JPG/PNG/WebP, maks 5 MB per foto.'}
            </p>

            {form.errors.images ? (
              <span className="text-[12px] font-semibold text-[#f87171]">{form.errors.images}</span>
            ) : null}
          </div>

          {!profile ? (
            <p className="rounded-2xl border border-line bg-card px-4 py-3 text-[12.5px] text-dim">
              Tips: atur WhatsApp/Instagram di{' '}
              <a href="/dashboard/profil" className="font-bold text-accent-text">
                Profil Toko
              </a>{' '}
              agar penyewa bisa menghubungimu.
            </p>
          ) : null}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={form.processing}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-[14px] font-extrabold text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
            >
              <Save size={16} />
              {form.processing ? 'Menyimpan...' : edit ? 'Simpan perubahan' : 'Unggah kostum'}
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-chip px-4 py-3 text-[14px] font-extrabold text-fg transition-colors hover:border-line2"
            >
              <ArrowLeft size={16} />
            </button>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
}
