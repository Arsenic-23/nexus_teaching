import { StudentSidebar } from '@/components/layout/student-sidebar';
import { TopBar } from '@/components/layout/topbar';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-page">
      <StudentSidebar />
      <TopBar streak={12} xp={2450} level={8} unreadNotifications={3} />
      <main className="lg:pl-[260px] pt-16 min-h-screen">
        <div className="p-6 max-w-content mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
