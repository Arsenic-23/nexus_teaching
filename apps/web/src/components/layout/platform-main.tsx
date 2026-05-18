'use client';

import { useSidebar } from '@/providers/sidebar-provider';
import { cn } from '@/lib/utils';

export function PlatformMain({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();
  return (
    <main
      className={cn(
        'pt-16 min-h-screen transition-all duration-300',
        collapsed ? 'lg:pl-[72px]' : 'lg:pl-[260px]',
      )}
    >
      <div className="p-6 max-w-content mx-auto">
        {children}
      </div>
    </main>
  );
}
