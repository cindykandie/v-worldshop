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
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.45)] backdrop-blur">
      <h1 className="text-2xl font-semibold tracking-wide text-white">Admin Login</h1>
      <p className="mt-2 text-sm text-white/70">
        Sign in to manage workshops and community content.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.2em] text-white/60">Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-vw-hot-pink/60 focus:outline-none"
            placeholder="admin@vaginaworldshop.com"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.2em] text-white/60">Password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-vw-hot-pink/60 focus:outline-none"
            placeholder="Enter your password"
            required
          />
        </div>

        {error ? <p className="text-sm text-rose-300">{error}</p> : null}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-vw-hot-pink px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
