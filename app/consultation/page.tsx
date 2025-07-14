
import { Header } from "@/components/header";
import { ConsultationChat } from "@/components/consultation-chat";

export default function ConsultationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      <main className="pt-16">
        <ConsultationChat />
      </main>
    </div>
  );
}
