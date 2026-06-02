"use client";

import AuthCard from "@/components/AuthCard";
import BrandLogo from "@/components/BrandLogo";
import Link from "next/link";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import {
  doc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [designation, setDesignation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    try {
      // ⚔️ Clean inputs before sending
      const normalizedEmail = email.trim().toLowerCase();
      const trimmedFullName = fullName.trim();
      const trimmedDesignation = designation.trim();

      // ⚔️ Basic validation
      if (trimmedFullName.length < 2) {
        setError("Please enter your full name.");
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        setLoading(false);
        return;
      }

      // ⚔️ Firebase signup
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          normalizedEmail,
          password
        );

      // ⚔️ Firestore user profile
      await setDoc(
        doc(db, "users", userCredential.user.uid),
        {
          uid: userCredential.user.uid,
          email: normalizedEmail,
          fullName: trimmedFullName,
          designation: trimmedDesignation,
          createdAt: serverTimestamp(),
        }
      );

      router.push("/dashboard");

    } catch (err: any) {

      console.error("Signup Error:", err);

      // ⚔️ Human-friendly error handling
      if (err.code === "auth/email-already-in-use") {
        setError("An account with this email already exists. Please sign in.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters long.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError("Something went wrong. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6">

      <AuthCard title="">

        <div className="mb-8 text-center">
          <div className="flex justify-center">
            <BrandLogo />
          </div>

          <p className="mt-4 text-sm text-white/50">
            Digital agreements built on trust
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-4xl font-bold tracking-tight text-white leading-tight">
            Create account
          </h2>

          <p className="mt-2 text-white/40">
            Continue with secure digital agreements
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">

          <input
            type="text"
            placeholder="Full Name"
            autoComplete="name"
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder:text-white/25 transition-all duration-300 outline-none hover:border-cyan-400/30 focus:border-cyan-400/50"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Designation / Title (Optional)"
            autoComplete="organization-title"
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder:text-white/25 transition-all duration-300 outline-none hover:border-cyan-400/30 focus:border-cyan-400/50"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder:text-white/25 transition-all duration-300 outline-none hover:border-cyan-400/30 focus:border-cyan-400/50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white placeholder:text-white/25 transition-all duration-300 outline-none hover:border-cyan-400/30 focus:border-cyan-400/50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 py-4 font-semibold text-black transition-all duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          <p className="text-center text-sm text-white/50">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-cyan-400 hover:text-cyan-300"
            >
              Sign in
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