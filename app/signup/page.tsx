"use client";

import AuthCard from "@/components/AuthCard";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      // 🔥 Human-friendly error handling
      if (err.code === "auth/email-already-in-use") {
        setError("An account with this email already exists. Please sign in.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters long.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <AuthCard title="Create your Geplic account">
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-md border border-white/20 bg-black px-3 py-2 text-white placeholder-white/50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-md border border-white/20 bg-black px-3 py-2 text-white placeholder-white/50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-white py-2 font-medium text-black"
          >
            Sign up
          </button>

          <p className="text-center text-sm text-white/60">
            Already have an account?{" "}
            <a href="/login" className="underline text-white">
              Sign in
            </a>
          </p>
        </form>
      </AuthCard>
    </div>
  );
}
