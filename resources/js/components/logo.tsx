import { Link } from '@inertiajs/react';

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <img
        src="/android-chrome-192x192.png"
        alt=""
        className="h-10 w-10 shrink-0 rounded-xl object-contain transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      />
      <span className="text-[16px] font-extrabold tracking-tight text-fg">
        Lumisse<span className="text-accent"> Cosplay</span>
      </span>
    </Link>
  );
}
