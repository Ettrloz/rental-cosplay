import type { LucideIcon } from 'lucide-react';

export function StatCard({
  label,
  value,
  icon: Icon
}: {
  label: string;
  value: number;
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-2xl border border-line bg-card p-5">
      <div className="flex items-center gap-2 text-[11.5px] font-bold tracking-wide text-fade uppercase">
        <Icon size={14} />
        {label}
      </div>
      <p className="mt-2 text-2xl font-extrabold text-fg tabular-nums">
        {value.toLocaleString('id-ID')}
      </p>
    </div>
  );
}
