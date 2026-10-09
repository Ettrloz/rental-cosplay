import clsx from 'clsx';
import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function Dropdown<T extends string>({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
}) {
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
    <div ref={rootRef} className="relative min-w-0 flex-1">
      <span className="sr-only">{label}</span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(prev => !prev)}
        className={clsx(
          'flex w-full items-center justify-between gap-2 rounded-xl border border-line bg-card py-3 pr-3 pl-3.5 text-left text-[13.5px] text-fg2 transition-colors focus:border-accent focus:outline-none',
          open && 'border-accent'
        )}
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          size={15}
          className={clsx(
            'shrink-0 text-fade transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-30 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-line2 bg-card p-1.5 shadow-xl shadow-black/40"
        >
          {options.map(option => (
            <li key={option}>
              <button
                type="button"
                role="option"
                aria-selected={option === value}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={clsx(
                  'flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-[13.5px] transition-colors',
                  option === value
                    ? 'bg-accent-soft text-fg'
                    : 'text-muted hover:bg-chip2 hover:text-fg'
                )}
              >
                <span className="truncate">{option}</span>
                {option === value && <Check size={14} className="shrink-0 text-accent-text" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
