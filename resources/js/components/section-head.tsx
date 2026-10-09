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
      <h2 className="text-lg font-extrabold tracking-tight text-fg">{judul}</h2>
      {selengkapnyaHref ? (
        <Link
          href={selengkapnyaHref}
          className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-accent-text transition-colors hover:text-accent-hover"
        >
          Selengkapnya
          <ArrowRight size={14} />
        </Link>
      ) : null}
    </div>
  );
}
