import { DashboardNav } from '@/components/dashboard-nav';
import { AppLayout } from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';

export function DashboardLayout({
  title,
  description,
  children
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <AppLayout>
      <Head title={title} />
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div>
          <h1 className="text-3xl leading-[1.15] font-extrabold tracking-tight text-fg">{title}</h1>
          {description ? (
            <p className="mt-3 text-[15px] leading-relaxed text-dim">{description}</p>
          ) : null}
        </div>

        <div className="mt-6">
          <DashboardNav />
        </div>

        <div className="mt-8">{children}</div>
      </section>
    </AppLayout>
  );
}
