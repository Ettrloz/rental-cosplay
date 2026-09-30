import { Logo } from '@/components/logo';
import { login, register } from '@/routes';
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
    <header className="sticky top-0 z-50 w-full border-b border-white/8 bg-[#0a0a0f]/85 backdrop-blur-lg">
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
                  url === link.href
                    ? 'bg-white/6 text-white'
                    : 'text-[#a1a1b5] hover:bg-white/5 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href={login.url()}
              className="hidden rounded-xl px-3.5 py-2 text-[14px] font-bold text-[#a1a1b5] transition-colors hover:bg-white/5 hover:text-white sm:block"
            >
              Masuk
            </Link>
            <Link
              href={register.url()}
              className="hidden items-center gap-1.5 rounded-xl bg-[#7c3aed] px-4 py-2 text-[14px] font-bold text-white transition-colors duration-200 hover:bg-[#6d28d9] sm:inline-flex"
            >
              Buat Akun
            </Link>

            <button
              type="button"
              onClick={() => setMenuTerbuka(open => !open)}
              aria-label={menuTerbuka ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              aria-expanded={menuTerbuka}
              className="grid h-9 w-9 place-items-center rounded-xl bg-white/6 text-white ring-1 ring-white/10 lg:hidden"
            >
              {menuTerbuka ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {menuTerbuka ? (
          <div className="mb-4 rounded-2xl bg-[#12121a] p-3 ring-1 ring-white/8 lg:hidden">
            <nav className="grid gap-1" aria-label="Navigasi seluler">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuTerbuka(false)}
                  className={clsx(
                    'flex items-center justify-between rounded-xl px-4 py-3 text-[14.5px] font-semibold transition-colors',
                    url === link.href
                      ? 'bg-white/6 text-white'
                      : 'text-[#a1a1b5] hover:bg-white/5 hover:text-white'
                  )}
                >
                  {link.label}
                  <ArrowRight size={15} />
                </Link>
              ))}
            </nav>
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/8 pt-3">
              <Link
                href={login.url()}
                className="rounded-xl bg-white/6 px-4 py-3 text-center text-[14px] font-bold text-white"
              >
                Masuk
              </Link>
              <Link
                href={register.url()}
                className="rounded-xl bg-[#7c3aed] px-4 py-3 text-center text-[14px] font-bold text-white"
              >
                Daftar
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
