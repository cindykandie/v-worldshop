import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import LoginForm from "./LoginForm";

export default async function AdminLoginPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/admin");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-vw-obsidian text-white">
      <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_top,rgba(255,74,209,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0)_35%)]" />
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <LoginForm />
      </div>
    </div>
  );
}
