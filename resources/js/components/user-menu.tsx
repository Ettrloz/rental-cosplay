import { useAppearance, type Appearance } from '@/hooks/use-appearance';
import { login, logout, register } from '@/routes';
import type { Auth } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import clsx from 'clsx';
import {
  Check,
  ChevronDown,
  LayoutDashboard,
  LogIn,
  LogOut,
  Monitor,
  Moon,
  Sun,
  User,
  UserPlus,
} from 'lucide-react';
import { type LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const THEME_OPTIONS: { mode: Appearance; label: string; icon: LucideIcon }[] = [
  { mode: 'light', label: 'Terang', icon: Sun },
  { mode: 'dark', label: 'Gelap', icon: Moon },
  { mode: 'system', label: 'Otomatis', icon: Monitor },
];

export function UserMenu() {
  const { appearance, updateAppearance } = useAppearance();
  const { auth } = usePage<{ auth: Auth }>().props;
  const user = auth?.user ?? null;
  const nama = user?.name || user?.username || 'Akun';
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(prev => !prev)}
        className="inline-flex items-center gap-2.5 rounded-2xl border border-line bg-card py-1.5 pr-3 pl-1.5 transition-colors hover:bg-chip"
      >
        <span className="grid h-7 w-7 place-items-center overflow-hidden rounded-xl bg-accent text-white">
          {user?.avatar ? (
            <img
              src={`/storage/${user.avatar}`}
              alt={nama}
              className="h-7 w-7 object-cover"
            />
          ) : (
            <User size={15} strokeWidth={2.2} />
          )}
        </span>
        <span className="hidden max-w-[8rem] truncate text-[13.5px] font-bold text-fg sm:block">
          {user ? nama : 'Masuk / Buat'}
        </span>
        <ChevronDown
          size={15}
          className={clsx('text-fade transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-60 rounded-2xl border border-line2 bg-card p-1.5 shadow-xl shadow-black/40"
        >
          <div className="px-3 pt-2 pb-1.5">
            {user ? (
              <>
                <p className="truncate text-[13px] font-bold text-fg">{nama}</p>
                <p className="truncate text-[12px] text-faint">{user.email}</p>
              </>
            ) : (
              <>
                <p className="text-[13px] font-bold text-fg">Akun</p>
                <p className="text-[12px] text-faint">Masuk untuk mulai sewa & upload kostum.</p>
              </>
            )}
          </div>

          {user ? (
            <>
              <Link
                href="/dashboard"
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13.5px] font-semibold text-fg hover:bg-chip"
              >
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent-soft text-accent-text">
                  <LayoutDashboard size={14} />
                </span>
                Dashboard
              </Link>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setOpen(false);
                  router.post(logout.url());
                }}
                className="mb-1 flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[13.5px] font-semibold text-fg hover:bg-chip"
              >
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-chip2">
                  <LogOut size={14} />
                </span>
                Keluar
              </button>
            </>
          ) : (
            <>
              <Link
                href={login.url()}
                role="menuitem"
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13.5px] font-semibold text-fg hover:bg-chip"
              >
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-chip2">
                  <LogIn size={14} />
                </span>
                Masuk
              </Link>
              <Link
                href={register.url()}
                role="menuitem"
                className="mb-1 flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13.5px] font-semibold text-fg hover:bg-chip"
              >
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-accent-soft text-accent-text">
                  <UserPlus size={14} />
                </span>
                Buat Akun
              </Link>
            </>
          )}

          <div className="my-1 border-t border-line" />

          <p className="px-3 pt-1 pb-2 text-[12px] font-bold text-faint tracking-wide uppercase">
            Mode tampilan
          </p>
          <div className="grid grid-cols-3 gap-1 p-1">
            {THEME_OPTIONS.map(({ mode, label, icon: Icon }) => (
              <button
                key={mode}
                type="button"
                onClick={() => {
                  updateAppearance(mode);
                  setOpen(false);
                }}
                className={clsx(
                  'flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11.5px] font-bold transition-colors',
                  appearance === mode
                    ? 'bg-accent-soft text-accent-text'
                    : 'text-faint hover:bg-chip',
                )}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>

          <div className="mt-1 flex items-center justify-between gap-2 border-t border-line px-3 py-2.5">
            <span className="text-[12px] font-semibold text-faint">Otomatis</span>
            <span className="inline-flex items-center gap-1 text-[11.5px] font-bold text-accent-text">
              <Check size={13} />
              Default
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
