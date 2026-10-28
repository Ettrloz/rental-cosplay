import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

// ─── Lightbox ────────────────────────────────────────────────────────────────

type LightboxProps = {
  gambar: string[];
  awal: number;
  judul: string;
  onTutup: () => void;
};

function Lightbox({ gambar, awal, judul, onTutup }: LightboxProps) {
  const [aktif, setAktif] = useState(awal);

  const prev = useCallback(() => {
    setAktif(i => (i - 1 + gambar.length) % gambar.length);
  }, [gambar.length]);

  const next = useCallback(() => {
    setAktif(i => (i + 1) % gambar.length);
  }, [gambar.length]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onTutup();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onTutup, prev, next]);

  // Tutup scroll body saat lightbox terbuka
  useEffect(() => {
    const sebelumnya = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = sebelumnya;
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Galeri foto ${judul}`}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onTutup}
    >
      {/* Tombol tutup */}
      <button
        type="button"
        aria-label="Tutup galeri"
        onClick={onTutup}
        className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X size={20} />
      </button>

      {/* Counter */}
      <span className="absolute top-5 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-[12px] font-bold text-white/80 tabular-nums">
        {aktif + 1} / {gambar.length}
      </span>

      {/* Panah kiri */}
      {gambar.length > 1 ? (
        <button
          type="button"
          aria-label="Foto sebelumnya"
          onClick={e => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
        >
          <ChevronLeft size={24} />
        </button>
      ) : null}

      {/* Foto utama */}
      <div
        className="flex h-full w-full items-center justify-center p-14 sm:p-20"
        onClick={e => {
          if (e.target === e.currentTarget) onTutup();
        }}
      >
        <img
          src={gambar[aktif]}
          alt={`${judul} — foto ${aktif + 1}`}
          className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl"
          draggable={false}
        />
      </div>

      {/* Panah kanan */}
      {gambar.length > 1 ? (
        <button
          type="button"
          aria-label="Foto berikutnya"
          onClick={e => {
            e.stopPropagation();
            next();
          }}
          className="absolute right-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
        >
          <ChevronRight size={24} />
        </button>
      ) : null}

      {/* Thumbnail strip bawah */}
      {gambar.length > 1 ? (
        <div
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 overflow-x-auto px-4 pb-1"
          onClick={e => e.stopPropagation()}
        >
          {gambar.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Lihat foto ${i + 1}`}
              onClick={() => setAktif(i)}
              className={`shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                i === aktif
                  ? 'border-white opacity-100 ring-1 ring-white/40'
                  : 'border-white/20 opacity-50 hover:opacity-80'
              }`}
            >
              <img
                src={src}
                alt={`Thumbnail ${i + 1}`}
                className="h-12 w-12 object-cover sm:h-14 sm:w-14"
                draggable={false}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

// ─── ImageGallery ─────────────────────────────────────────────────────────────

type ImageGalleryProps = {
  gambar: string[];
  judul: string;
  placeholder?: React.ReactNode;
};

export function ImageGallery({ gambar, judul, placeholder }: ImageGalleryProps) {
  const [aktif, setAktif] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAktif(i => (i - 1 + gambar.length) % gambar.length);
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAktif(i => (i + 1) % gambar.length);
  };

  if (gambar.length === 0) {
    return (
      <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-3xl border border-line bg-card2">
        {placeholder}
      </div>
    );
  }

  return (
    <>
      {/* ── Foto utama ── */}
      <div
        role="button"
        tabIndex={0}
        aria-label={`Lihat foto ${judul} lebih besar`}
        onClick={() => setLightbox(aktif)}
        onKeyDown={e => e.key === 'Enter' && setLightbox(aktif)}
        className="group relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-3xl border border-line bg-card2"
      >
        <img
          src={gambar[aktif]}
          alt={`${judul} — foto ${aktif + 1}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />

        {/* Hint klik untuk fullscreen */}
        <span className="absolute bottom-3 right-3 rounded-lg bg-black/50 px-2.5 py-1 text-[11px] font-bold text-white/80 opacity-0 transition-opacity group-hover:opacity-100">
          Klik untuk perbesar
        </span>

        {/* Panah kiri */}
        {gambar.length > 1 ? (
          <button
            type="button"
            aria-label="Foto sebelumnya"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100"
          >
            <ChevronLeft size={20} />
          </button>
        ) : null}

        {/* Panah kanan */}
        {gambar.length > 1 ? (
          <button
            type="button"
            aria-label="Foto berikutnya"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100"
          >
            <ChevronRight size={20} />
          </button>
        ) : null}

        {/* Dots indikator */}
        {gambar.length > 1 ? (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {gambar.map((_, i) => (
              <span
                key={i}
                className={`block rounded-full transition-all ${
                  i === aktif
                    ? 'h-1.5 w-4 bg-white'
                    : 'h-1.5 w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>

      {/* ── Thumbnail strip ── */}
      {gambar.length > 1 ? (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {gambar.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Lihat foto ${i + 1} lebih besar`}
              onClick={() => setLightbox(i)}
              className={`shrink-0 overflow-hidden rounded-xl border-2 transition-all hover:opacity-90 ${
                i === aktif
                  ? 'border-accent opacity-100'
                  : 'border-line opacity-70 hover:border-line2'
              }`}
            >
              <img
                src={src}
                alt={`${judul} thumbnail ${i + 1}`}
                loading="lazy"
                className="h-16 w-16 object-cover sm:h-[72px] sm:w-[72px]"
              />
            </button>
          ))}
        </div>
      ) : null}

      {/* ── Lightbox ── */}
      {lightbox !== null ? (
        <Lightbox
          gambar={gambar}
          awal={lightbox}
          judul={judul}
          onTutup={() => setLightbox(null)}
        />
      ) : null}
    </>
  );
}
