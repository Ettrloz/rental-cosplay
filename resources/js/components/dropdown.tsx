import clsx from 'clsx';
import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';

export type DropdownOption<T extends string> = T | { value: T; label: string };

type DropdownProps<T extends string> = {
  label: string;
  value: T | '';
  options: readonly DropdownOption<T>[];
  onChange: (value: T) => void;
  placeholder?: string;
  invalid?: boolean;
  disabled?: boolean;
  variant?: 'filter' | 'field';
  className?: string;
};

export function Dropdown<T extends string>({
  label,
  value,
  options,
  onChange,
  placeholder,
  invalid,
  disabled,
  variant = 'filter',
  className
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const items = options.map(option =>
    typeof option === 'string' ? { value: option, label: option } : option
  );
  const selectedIndex = items.findIndex(item => item.value === value);
  const selected = selectedIndex >= 0 ? items[selectedIndex] : null;

  useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', onPointerDown);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setActiveIndex(-1);
      return;
    }

    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }, [open, selectedIndex]);

  const buka = () => {
    if (!disabled) setOpen(true);
  };

  const tutup = () => setOpen(false);

  const pilih = (item: { value: T; label: string }) => {
    onChange(item.value);
    tutup();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) {
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();

      if (!open) {
        buka();
        return;
      }

      const arah = event.key === 'ArrowDown' ? 1 : -1;
      setActiveIndex(prev => (prev + arah + items.length) % items.length);
      return;
    }

    if (event.key === 'Home' && open) {
      event.preventDefault();
      setActiveIndex(0);
      return;
    }

    if (event.key === 'End' && open) {
      event.preventDefault();
      setActiveIndex(items.length - 1);
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();

      if (open && activeIndex >= 0 && items[activeIndex]) {
        pilih(items[activeIndex]);
        return;
      }

      if (!open) buka();
      return;
    }

    if (event.key === 'Escape' && open) {
      event.preventDefault();
      tutup();
      return;
    }

    if (event.key === 'Tab') {
      tutup();
    }
  };

  const field = variant === 'field';

  return (
    <div ref={rootRef} className={clsx('relative min-w-0', field ? 'w-full' : 'flex-1', className)}>
      <span className="sr-only">{label}</span>
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={invalid || undefined}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={open && activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
        onClick={() => (open ? tutup() : buka())}
        onKeyDown={onKeyDown}
        className={clsx(
          'flex w-full items-center justify-between gap-2 rounded-xl border bg-card text-left text-[13.5px] text-fg2 transition-colors focus:border-accent focus:outline-none disabled:cursor-not-allowed disabled:opacity-60',
          field ? 'px-3.5 py-2.5' : 'py-3 pr-3 pl-3.5',
          open ? 'border-accent' : invalid ? 'border-[#f87171]' : 'border-line'
        )}
      >
        <span className={clsx('truncate', !selected && 'text-faint')}>
          {selected?.label ?? placeholder ?? ''}
        </span>
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
          id={listId}
          role="listbox"
          aria-label={label}
          className="absolute z-30 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-line2 bg-card p-1.5 shadow-xl shadow-black/40"
        >
          {items.map((item, index) => (
            <li key={item.value}>
              <button
                id={`${listId}-${index}`}
                type="button"
                role="option"
                aria-selected={item.value === value}
                tabIndex={-1}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => pilih(item)}
                className={clsx(
                  'flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-[13.5px] transition-colors',
                  item.value === value
                    ? 'bg-accent-soft text-fg'
                    : 'text-muted hover:bg-chip2 hover:text-fg',
                  activeIndex === index && item.value !== value && 'bg-chip2 text-fg'
                )}
              >
                <span className="truncate">{item.label}</span>
                {item.value === value && <Check size={14} className="shrink-0 text-accent-text" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
