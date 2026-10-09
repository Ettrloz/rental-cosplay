import { RotateCcw, WifiOff } from 'lucide-react';

type ErrorStateProps = {
  judul?: string;
  pesan?: string;
  onRetry?: () => void;
};

export function ErrorState({
  judul = 'Gagal memuat data',
  pesan = 'Koneksi bermasalah atau data belum tersedia. Silakan coba lagi sebentar lagi.',
  onRetry
}: ErrorStateProps) {
  const retry = onRetry ?? (() => window.location.reload());

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-fg/20 px-6 py-12 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-fg/10 text-fg">
        <WifiOff size={22} />
      </span>
      <div>
        <p className="text-sm font-bold">{judul}</p>
        <p className="mt-1 text-[13px] opacity-70">{pesan}</p>
      </div>
      <button
        type="button"
        onClick={retry}
        className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2 text-[13px] font-bold text-page transition hover:opacity-80"
      >
        <RotateCcw size={14} />
        Coba Lagi
      </button>
    </div>
  );
}
