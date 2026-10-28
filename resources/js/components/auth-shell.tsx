import { Logo } from '@/components/logo';
import clsx from 'clsx';
import type { ChangeEvent, ReactNode } from 'react';

export function AuthShell({
  judul,
  deskripsi,
  children,
  footer,
  lebar = 'sm'
}: {
  judul: string;
  deskripsi?: string;
  children: ReactNode;
  footer?: ReactNode;
  lebar?: 'sm' | 'xl';
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-page px-4 py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-[#7c3aed]/30 via-[#ec4899]/15 to-transparent"
      />
      <div className={clsx('relative w-full', lebar === 'xl' ? 'max-w-4xl' : 'max-w-xl')}>
        <div className="rounded-3xl border border-line bg-card p-5 shadow-2xl shadow-black/10 sm:p-8 lg:p-10">
          <div className="flex flex-col items-center text-center">
            <Logo />
            <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-fg">{judul}</h1>
            {deskripsi ? (
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-dim">{deskripsi}</p>
            ) : null}
          </div>
          <div className="mt-6">{children}</div>
        </div>
        {footer ? <div className="mt-4 text-center text-[13px] text-faint">{footer}</div> : null}
      </div>
    </div>
  );
}

export function AuthField({
  label,
  name,
  type = 'text',
  autoComplete,
  placeholder,
  value,
  onChange,
  error,
  required
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-semibold text-fg2">{label}</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={clsx(
          'w-full rounded-xl border bg-chip px-4 py-3 text-[14px] text-fg placeholder:text-faint focus:outline-none',
          error ? 'border-red-500/70 focus:border-red-500' : 'border-line focus:border-accent'
        )}
      />
      {error ? (
        <span className="mt-1 block text-[12px] font-medium text-red-500">{error}</span>
      ) : null}
    </label>
  );
}
