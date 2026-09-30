import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

export function SectionHead({
  judul,
  selengkapnyaHref
}: {
  judul: string;
  selengkapnyaHref?: string;
}) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4" data-reveal>
      <h2 className="text-lg font-extrabold tracking-tight text-white">{judul}</h2>
      {selengkapnyaHref ? (
        <Link
          href={selengkapnyaHref}
          className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#a78bfa] transition-colors hover:text-[#c084fc]"
        >
          Selengkapnya
          <ArrowRight size={14} />
        </Link>
      ) : null}
    </div>
  );
}
