import { KATEGORI_LABEL, type Thread } from '@/data/forum';
import { MessageCircle, Users } from 'lucide-react';
import clsx from 'clsx';

export function ForumRow({ thread }: { thread: Thread }) {
  return (
    <div
      data-reveal
      className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-white/8 px-4 py-3.5 transition-colors last:border-b-0 hover:bg-white/4 sm:flex-nowrap sm:px-5"
    >
      <span
        className={clsx(
          'shrink-0 rounded-md px-2 py-1 text-[11px] font-bold',
          KATEGORI_LABEL[thread.kategori]
        )}
      >
        {thread.kategori}
      </span>
      <span className="min-w-0 flex-1 truncate text-[14px] font-bold text-white">
        {thread.judul}
      </span>
      <span className="shrink-0 text-[12.5px] text-[#6f6f85]">{thread.penulis}</span>
      <span className="shrink-0 text-[12.5px] text-[#5a5a6b]">{thread.waktu}</span>
      <span className="flex shrink-0 items-center gap-3 text-[12.5px] text-[#6f6f85] tabular-nums">
        <span className="inline-flex items-center gap-1">
          <Users size={13} />
          {thread.dilihat.toLocaleString('id-ID')}
        </span>
        <span className="inline-flex items-center gap-1">
          <MessageCircle size={13} />
          {thread.balasan}
        </span>
      </span>
    </div>
  );
}
