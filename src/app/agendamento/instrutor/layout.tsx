import { AuthGate } from "@/components/booking/AuthGate";
import { InstructorBottomNav } from "@/components/booking/instructor/InstructorBottomNav";

export default function InstrutorLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate requireRole="instrutor">
      <div className="flex flex-1 flex-col pb-20">{children}</div>
      <InstructorBottomNav />
    </AuthGate>
  );
}
