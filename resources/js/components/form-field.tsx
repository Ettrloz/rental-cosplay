import clsx from 'clsx';
import type { ReactNode } from 'react';

export const inputClass =
  'w-full rounded-xl border border-line bg-card px-3.5 py-2.5 text-[13.5px] text-fg placeholder:text-faint transition-colors focus:border-accent focus:outline-none';

export function Field({
  label,
  error,
  hint,
  children
}: {
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12.5px] font-bold text-fg2">{label}</span>
      {children}
      {error ? (
        <span className="mt-1 block text-[12px] font-semibold text-[#f87171]">{error}</span>
      ) : hint ? (
        <span className="mt-1 block text-[12px] text-faint">{hint}</span>
      ) : null}
    </label>
  );
}

export function TextInput({
  invalid,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input {...props} className={clsx(inputClass, invalid && 'border-[#f87171]', className)} />
  );
}

export function TextArea({
  invalid,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  return (
    <textarea
      {...props}
      className={clsx(inputClass, 'min-h-28 resize-y', invalid && 'border-[#f87171]', className)}
    />
  );
}
