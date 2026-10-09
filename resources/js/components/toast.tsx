import { useCallback, useRef, useState } from 'react';
import { Check } from 'lucide-react';

export function useToast() {
  const [pesan, setPesan] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const panggil = useCallback((teks: string) => {
    setPesan(teks);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setPesan(null), 2500);
  }, []);

  const toast = pesan ? (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-fg px-4 py-2 text-[13px] font-bold text-page shadow-2xl">
      <Check size={14} />
      {pesan}
    </div>
  ) : null;

  return { panggil, toast };
}
