'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  School,
  Users,
  BarChart3,
  Settings,
  Zap,
  ChevronLeft,
  ChevronRight,
  Orbit,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/providers/sidebar-provider';

const navItems = [
  { label: 'Dashboard', href: '/teacher/dashboard', icon: Home },
  { label: 'Classrooms', href: '/teacher/classrooms', icon: School },
  { label: 'Students', href: '/teacher/students', icon: Users },
  { label: 'Analytics', href: '/teacher/analytics', icon: BarChart3 },
];

const bottomNavItems = [
  { label: 'Settings', href: '/teacher/settings', icon: Settings },
];

export function TeacherSidebar() {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebar();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col fixed left-0 top-0 h-full border-r border-border bg-card backdrop-blur-xl z-40 transition-all duration-300 shadow-[var(--shadow-card)]',
        collapsed ? 'w-[72px]' : 'w-[260px]',
      )}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 h-16 px-4 border-b border-border hover:bg-foreground/5 transition-colors shrink-0 group">
        <div className="w-8 h-8 rounded-xl bg-gradient-brand flex items-center justify-center shrink-0 shadow-lg shadow-primary/20 group-hover:scale-105 group-hover:rotate-12 transition-all duration-500">
          <Orbit className="w-4 h-4 text-primary-foreground group-hover:animate-spin-slow" />
        </div>
        {!collapsed && (
          <div>
            <span className="font-display text-lg font-bold">Nexus</span>
            <span className="text-xs text-muted-foreground ml-2">Teacher</span>
          </div>
        )}
      </Link>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                    active
                      ? 'bg-foreground/10 text-foreground border border-border shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5',
                    collapsed && 'justify-center px-2',
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className={cn('shrink-0 w-5 h-5', active ? 'text-primary' : '')} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Teacher badge */}
      {!collapsed && (
        <div className="px-4 pb-3">
          <div className="p-2 rounded-lg bg-primary/10 border border-border text-xs text-primary text-center font-semibold">
            👩‍🏫 Teacher Mode
          </div>
        </div>
      )}

      {/* Bottom nav */}
      <div className="p-3 border-t border-border space-y-1">
        {bottomNavItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                active
                  ? 'bg-primary/10 text-primary border border-border'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
                collapsed && 'justify-center px-2',
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className={cn('shrink-0 w-5 h-5', active ? 'text-primary' : '')} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-12 border-t border-border text-muted-foreground hover:text-foreground transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
}
