import * as React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export function Breadcrumbs({ items, showHome = true, className }: BreadcrumbsProps) {
  const allItems = showHome
    ? [{ label: 'Home', href: '/student/dashboard' }, ...items]
    : items;

  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center', className)}>
      <ol className="flex items-center gap-1 text-sm text-muted-foreground">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          return (
            <li key={index} className="flex items-center gap-1">
              {index === 0 && showHome ? (
                <Home className="w-3.5 h-3.5" />
              ) : null}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={cn(isLast && 'text-foreground font-medium')}>
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight className="w-3.5 h-3.5 opacity-50" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
