import { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export function ConnectionToast() {
  const [pesan, setPesan] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setPesan('Koneksi bermasalah — coba lagi.');
    window.addEventListener('inertia:error', handler);
    return () => window.removeEventListener('inertia:error', handler);
  }, []);

  useEffect(() => {
    if (!pesan) return;
    const timer = window.setTimeout(() => setPesan(null), 3500);
    return () => window.clearTimeout(timer);
  }, [pesan]);

  if (!pesan) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-[13px] font-bold text-white shadow-2xl">
      <WifiOff size={14} />
      {pesan}
    </div>
  );
}
