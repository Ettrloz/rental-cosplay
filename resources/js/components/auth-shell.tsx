import { Logo } from '@/components/logo';
import type { ReactNode } from 'react';

export function AuthShell({
  judul,
  deskripsi,
  children,
  footer
}: {
  judul: string;
  deskripsi?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-page px-4 py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-[#7c3aed]/30 via-[#ec4899]/15 to-transparent"
      />
      <div className="relative w-full max-w-sm">
        <div className="rounded-3xl border border-line bg-card p-6 shadow-2xl shadow-black/10 sm:p-8">
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
  type = 'text',
  autoComplete,
  placeholder
}: {
  label: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-semibold text-fg2">{label}</span>
      <input
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full rounded-xl border border-line bg-chip px-4 py-3 text-[14px] text-fg placeholder:text-faint focus:border-accent focus:outline-none"
      />
    </label>
  );
}
