import type { Auth } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import clsx from 'clsx';
import { LayoutDashboard, Package, Store, UserRound, type LucideIcon } from 'lucide-react';

type Item = {
  label: string;
  href: string;
  icon: LucideIcon;
  perentalSaja?: boolean;
};

const ITEMS: Item[] = [
  { label: 'Ringkasan', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Kostum Saya', href: '/dashboard/kostum', icon: Package, perentalSaja: true },
  { label: 'Profil Toko', href: '/dashboard/profil', icon: Store, perentalSaja: true },
  { label: 'Akun', href: '/dashboard/akun', icon: UserRound }
];

export function DashboardNav() {
  const { url, props } = usePage<{ auth: Auth }>();
  const path = url.split('?')[0];
  const perental = props.auth?.user?.role === 'cosrent';

  return (
    <nav className="flex gap-1 overflow-x-auto rounded-2xl border border-line bg-card p-1.5">
      {ITEMS.filter(item => !item.perentalSaja || perental).map(({ label, href, icon: Icon }) => {
        const aktif = href === '/dashboard' ? path === href : path.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={clsx(
              'inline-flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-[13.5px] font-bold transition-colors',
              aktif ? 'bg-accent text-white' : 'text-muted hover:bg-chip hover:text-fg'
            )}
          >
            <Icon size={15} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
