"use client";

import AuthCard from "@/components/AuthCard";
import { sendPasswordResetEmail } from "firebase/auth";
import BrandLogo from "@/components/BrandLogo";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleForgotPassword() {

  if (!email.trim()) {

    alert("Please enter your email first.");
    return;

  }

  try {

    await sendPasswordResetEmail(
      auth,
      email.trim().toLowerCase()
    );

    alert("Password reset email sent.");

  } catch (error) {

    console.error(error);

    alert("Failed to send password reset email.");

  }

}
useEffect(() => {

  if (
    searchParams?.get("reason") ===
    "session-expired"
  ) {

    alert(
      "Session expired due to inactivity. Please sign in again."
    );

  }

}, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // ⚔️ Prevent double submit
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      // ⚔️ Normalize email
      const normalizedEmail = email.trim().toLowerCase();

      await signInWithEmailAndPassword(
        auth,
        normalizedEmail,
        password
      );

      router.push("/dashboard");

    } catch (err: any) {

      console.error("Login Error:", err);

      // ⚔️ Generic error for security
      setError("Invalid email or password");

    } finally {
      setLoading(false);
    }
     
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">

      <AuthCard title="">

        <div className="mb-8 flex flex-col items-center">
          <BrandLogo />

          <p className="mt-4 text-sm text-white/50">
            Digital agreements built on trust
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-4xl font-bold tracking-tight text-white leading-tight">
            Welcome back
          </h2>

          <p className="mt-2 text-sm text-white/40">
            Sign in to continue to Geplic
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder:text-white/25 transition-all duration-300 outline-none hover:border-cyan-400/20 focus:border-cyan-400/40 focus:bg-black/60"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder:text-white/25 transition-all duration-300 outline-none hover:border-cyan-400/20 focus:border-cyan-400/40 focus:bg-black/60"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-sm text-red-400">
              {error}
            </p>
          )}
          <div className="text-right">

  <button
    type="button"
    onClick={handleForgotPassword}
    className="text-sm text-cyan-400 transition-colors hover:text-cyan-300"
  >
    Forgot Password?
  </button>

</div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 py-4 font-semibold text-black transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(0,200,255,0.15)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-white/50">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-cyan-400 transition-colors hover:text-cyan-300"
            >
              Sign up
            </Link>
          </p>
            <div className="mt-8 text-center text-xs text-white/40">

  <Link href="/privacy">
    Privacy Policy
  </Link>

  {" • "}

  <Link href="/terms">
    Terms of Service
  </Link>

</div>
        </form>
          
      </AuthCard>

    </div>
  );
}