import type { Cosrent } from '@/data/cosrent';

export function CosrentCard({ item }: { item: Cosrent }) {
  return (
    <div
      data-reveal
      className="flex items-center gap-3.5 rounded-2xl border border-white/8 bg-[#12121a] p-4 transition-colors duration-300 hover:border-white/15"
    >
      <span
        className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#26262f] text-[15px] font-extrabold text-white/85"
        aria-hidden="true"
      >
        {item.nama.charAt(0)}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14.5px] font-extrabold text-white">{item.nama}</p>
        <p className="truncate text-[12.5px] text-[#6f6f85]">{item.kota}</p>
        <p className="truncate text-[12px] font-semibold text-[#8a8a9c]">{item.username}</p>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-[13px] font-bold text-[#c9c9d8] tabular-nums">{item.post} post</p>
        <p className="mt-1 inline-flex items-center gap-1.5 text-[11.5px] text-[#34d399]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#34d399]" />
          {item.online.replace('Online ', '')}
        </p>
      </div>
    </div>
  );
}
