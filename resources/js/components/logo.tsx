import { Link } from '@inertiajs/react';
import { Sparkles } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <span
        className="grid h-9 w-9 place-items-center rounded-xl bg-linear-to-br from-[#7c3aed] to-[#ec4899] text-white shadow-[0_8px_24px_-8px_rgba(124,58,237,0.9)] transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        <Sparkles size={18} strokeWidth={2.2} />
      </span>
      <span className="text-[16px] font-extrabold tracking-tight text-white">
        Rent<span className="text-[#a78bfa]">Cos</span>
      </span>
    </Link>
  );
}
