import { Logo } from '@/components/logo';
import { UserMenu } from '@/components/user-menu';
import { Link, usePage } from '@inertiajs/react';
import clsx from 'clsx';
import { ArrowRight, Menu, X } from 'lucide-react';
import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Beranda', href: '/' },
  { label: 'Cari Kostum', href: '/katalog' },
  { label: 'List Cosrent', href: '/cosrent' },
  { label: 'Jadwal Event', href: '/event' },
  { label: 'Forum', href: '/forum' }
];

export function Navbar() {
  const { url } = usePage();
  const [menuTerbuka, setMenuTerbuka] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-nav backdrop-blur-lg">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 py-4">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigasi utama">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'rounded-lg px-3.5 py-2 text-[14px] font-semibold transition-colors duration-200',
                  url === link.href ? 'bg-chip text-fg' : 'text-muted hover:bg-chip hover:text-fg'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <UserMenu />

            <button
              type="button"
              onClick={() => setMenuTerbuka(open => !open)}
              aria-label={menuTerbuka ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              aria-expanded={menuTerbuka}
              className="grid h-9 w-9 place-items-center rounded-xl bg-chip text-fg ring-1 ring-line2 lg:hidden"
            >
              {menuTerbuka ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {menuTerbuka ? (
          <div className="mb-4 rounded-2xl bg-card p-3 ring-1 ring-line lg:hidden">
            <nav className="grid gap-1" aria-label="Navigasi seluler">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuTerbuka(false)}
                  className={clsx(
                    'flex items-center justify-between rounded-xl px-4 py-3 text-[14.5px] font-semibold transition-colors',
                    url === link.href ? 'bg-chip text-fg' : 'text-muted hover:bg-chip hover:text-fg'
                  )}
                >
                  {link.label}
                  <ArrowRight size={15} />
                </Link>
              ))}
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
