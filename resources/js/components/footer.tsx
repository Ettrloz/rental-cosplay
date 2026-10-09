import { Clock, Package, Ruler, Truck, Users } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-line bg-panel">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-[13px] text-faint">
            Platform Sewa Kostum Cosplay © {new Date().getFullYear()}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-faint">
            <span className="inline-flex items-center gap-1.5">
              <Package size={14} />
              13.280 katalog
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users size={14} />
              587 cosrent
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Truck size={14} />
              Kirim se-Indonesia
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} />
              CS 08.00-22.00
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Ruler size={14} />
              Panduan LD/LP
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
