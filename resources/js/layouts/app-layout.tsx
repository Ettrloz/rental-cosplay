import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { useReveal } from '@/hooks/use-reveal';
import type { ReactNode } from 'react';

export function AppLayout({ children }: { children: ReactNode }) {
  const pageRef = useReveal<HTMLDivElement>();

  return (
    <div ref={pageRef} className="flex min-h-screen flex-col bg-page text-fg antialiased">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
