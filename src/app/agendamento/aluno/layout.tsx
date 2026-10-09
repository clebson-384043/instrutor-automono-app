import { AuthGate } from "@/components/booking/AuthGate";
import { StudentBottomNav } from "@/components/booking/student/StudentBottomNav";

export default function AlunoLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate requireRole="aluno">
      <div className="flex flex-1 flex-col pb-20">{children}</div>
      <StudentBottomNav />
    </AuthGate>
  );
}
