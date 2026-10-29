import { Field, TextArea, TextInput } from '@/components/form-field';
import { AppLayout } from '@/layouts/app-layout';
import { useToast } from '@/components/toast';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { ArrowLeft, ImagePlus, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type EventPayload = {
  id?: number;
  slug?: string;
  ownerId?: number | null;
  judul: string;
  tanggal: string;
  mulai: string;
  penyelenggara: string;
  lokasi: string;
  venue?: string | null;
  jam?: string | null;
  harga?: string | null;
  isi?: string | null;
  gambar?: string | null;
  komentar?: unknown[];
};

export default function EventForm() {
  const { props } = usePage<{ event: EventPayload | null }>();
  const event = props.event;
  const sedangEdit = Boolean(event?.id);
  const { panggil, toast } = useToast();
  const flash = usePage().flash as { success?: string };
  const fileRef = useRef<HTMLInputElement>(null);
  const [gambarTerpilih, setGambarTerpilih] = useState<File | null>(null);

  const form = useForm<{
    title: string;
    starts_on: string;
    organizer: string;
    location: string;
    venue: string;
    time_label: string;
    price_label: string;
    description: string;
    image: File | null;
  }>({
    title: event?.judul ?? '',
    starts_on: event?.mulai ?? '',
    organizer: event?.penyelenggara ?? '',
    location: event?.lokasi ?? '',
    venue: event?.venue && event.venue !== '-' ? event.venue : '',
    time_label: event?.jam && event.jam !== '-' ? event.jam : '',
    price_label: event?.harga && event.harga !== '-' ? event.harga : '',
    description: event?.isi ?? '',
    image: null
  });

  useEffect(() => {
    if (flash?.success) panggil(flash.success);
  }, [flash?.success, panggil]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    if (sedangEdit) {
      form.put(`/event/${event?.id}`, {
        forceFormData: true,
        preserveScroll: true,
        preserveState: false
      });
    } else {
      form.post('/event', { forceFormData: true });
    }
  };

  const pilihGambar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setGambarTerpilih(file);
    form.setData('image', file);
  };

  const hapusGambar = () => {
    setGambarTerpilih(null);
    form.setData('image', null);
  };

  return (
    <AppLayout>
      <Head title={sedangEdit ? 'Edit Event' : 'Buat Event'} />

      <section className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        <Link
          href="/event"
          className="inline-flex items-center gap-1.5 text-[13px] font-bold text-dim transition-colors hover:text-accent-text"
        >
          <ArrowLeft size={15} />
          Kembali ke jadwal event
        </Link>

        <div className="mt-5 overflow-hidden rounded-3xl border border-line bg-card p-5 sm:p-7">
          <h1 className="text-2xl font-extrabold tracking-tight text-fg">
            {sedangEdit ? 'Edit Event' : 'Buat Event'}
          </h1>
          <p className="mt-2 text-[13.5px] leading-relaxed text-dim">
            {sedangEdit
              ? 'Perbarui detail event yang kamu buat.'
              : 'Jadwalkan event cosplay pertama kamu.'}
          </p>

          <form onSubmit={submit} className="mt-6 grid gap-5">
            <Field label="Judul event" error={form.errors.title}>
              <TextInput
                value={form.data.title}
                onChange={e => form.setData('title', e.target.value)}
                placeholder="Contoh: Gathering Cosplay Malam"
                invalid={Boolean(form.errors.title)}
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Tanggal mulai" error={form.errors.starts_on}>
                <TextInput
                  type="date"
                  value={form.data.starts_on}
                  onChange={e => form.setData('starts_on', e.target.value)}
                  invalid={Boolean(form.errors.starts_on)}
                />
              </Field>

              <Field label="Penyelenggara" error={form.errors.organizer}>
                <TextInput
                  value={form.data.organizer}
                  onChange={e => form.setData('organizer', e.target.value)}
                  placeholder="Nama komunitas / cosplayer"
                  invalid={Boolean(form.errors.organizer)}
                />
              </Field>
            </div>

            <Field label="Lokasi" error={form.errors.location}>
              <TextInput
                value={form.data.location}
                onChange={e => form.setData('location', e.target.value)}
                placeholder="Kota / wilayah"
                invalid={Boolean(form.errors.location)}
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Venue" error={form.errors.venue}>
                <TextInput
                  value={form.data.venue}
                  onChange={e => form.setData('venue', e.target.value)}
                  placeholder="Optional"
                  invalid={Boolean(form.errors.venue)}
                />
              </Field>

              <Field label="Jam" error={form.errors.time_label}>
                <TextInput
                  value={form.data.time_label}
                  onChange={e => form.setData('time_label', e.target.value)}
                  placeholder="Optional"
                  invalid={Boolean(form.errors.time_label)}
                />
              </Field>
            </div>

            <Field label="Harga" error={form.errors.price_label}>
              <TextInput
                value={form.data.price_label}
                onChange={e => form.setData('price_label', e.target.value)}
                placeholder="Optional"
                invalid={Boolean(form.errors.price_label)}
              />
            </Field>

            <Field label="Deskripsi" error={form.errors.description}>
              <TextArea
                value={form.data.description}
                onChange={e => form.setData('description', e.target.value)}
                placeholder="Ceritakan detail acara, peserta, atau aturan event..."
                invalid={Boolean(form.errors.description)}
              />
            </Field>

            <div>
              <Field label="Gambar event" error={form.errors.image}>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={pilihGambar}
                />
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="inline-flex items-center gap-2 rounded-xl border border-line bg-chip px-4 py-2.5 text-[13px] font-bold text-fg transition-colors hover:border-line2"
                  >
                    <ImagePlus size={15} />
                    {gambarTerpilih ? gambarTerpilih.name : 'Unggah gambar (opsional)'}
                  </button>
                  {sedangEdit && event?.gambar && !gambarTerpilih ? (
                    <img
                      src={event.gambar}
                      alt="Gambar event"
                      className="h-16 w-24 rounded-lg border border-line object-cover"
                    />
                  ) : null}
                  {gambarTerpilih ? (
                    <button
                      type="button"
                      onClick={hapusGambar}
                      className="inline-flex items-center gap-2"
                    >
                      <X size={15} />
                      Batalkan pilihan
                    </button>
                  ) : null}
                </div>
              </Field>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={form.processing}
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-[14px] font-extrabold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
              >
                {form.processing
                  ? 'Menyimpan...'
                  : sedangEdit
                    ? 'Simpan Perubahan'
                    : 'Publikasikan Event'}
              </button>
              <Link
                href="/event"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-chip px-5 py-3 text-[14px] font-extrabold text-fg transition-colors"
              >
                Batal
              </Link>
            </div>
          </form>
        </div>
      </section>

      {toast}
    </AppLayout>
  );
}
