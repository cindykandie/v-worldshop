"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/admin",
    });

    setIsLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/admin");
  }

  return (
    <div className="w-full max-w-sm font-ui">
      {/* Brand mark */}
      <div className="mb-8 text-center">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-vw-hot-pink/15 border border-vw-hot-pink/25 mb-4">
          <span className="text-vw-hot-pink text-lg font-bold">V</span>
        </div>
        <h1 className="text-xl font-semibold text-white tracking-tight">Admin Portal</h1>
        <p className="mt-1 text-sm text-white/50">Vagina Worldshop</p>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.5)] backdrop-blur">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="block text-xs font-medium uppercase tracking-[0.15em] text-white/50">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-vw-hot-pink/50 focus:outline-none focus:ring-1 focus:ring-vw-hot-pink/20 transition"
              placeholder="admin@vaginaworldshop.com"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium uppercase tracking-[0.15em] text-white/50">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-vw-hot-pink/50 focus:outline-none focus:ring-1 focus:ring-vw-hot-pink/20 transition"
              placeholder="••••••••"
              required
            />
          </div>

          {error ? (
            <div className="rounded-lg border border-rose-400/20 bg-rose-500/10 px-4 py-2.5">
              <p className="text-sm text-rose-300">{error}</p>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-vw-hot-pink px-4 py-2.5 text-sm font-semibold text-black transition hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
