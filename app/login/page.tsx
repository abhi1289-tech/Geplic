"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

import AppHeader from "@/components/AppHeader";
import AuthCard from "@/components/AuthCard";
import AuthBrand from "@/components/auth/AuthBrand";
import AuthIntro from "@/components/auth/AuthIntro";
import AuthFooter from "@/components/auth/AuthFooter";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
      );

      router.push("/dashboard");
    } catch (err) {
      console.error(err);

      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AppHeader />

      <main className="auth-page">

        

            <AuthCard>

              <AuthBrand />

              <AuthIntro
                title="Welcome back"
                subtitle="Sign in to continue to Geplic"
              />

              <form
                onSubmit={handleLogin}
                className="form"
              >

                <div className="form-group">

                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    autoComplete="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                  />

                </div>

                <div className="form-group">

                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    autoComplete="current-password"
                    className="form-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                  />

                </div>

                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}

                <div className="form-actions">

                  <button
                    type="button"
                    className="auth-link"
                    onClick={
                      handleForgotPassword
                    }
                  >
                    Forgot Password?
                  </button>

                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-lg btn-block"
                >
                  {loading
                    ? "Logging in..."
                    : "Login"}
                </button>

              </form>

              <AuthFooter
                question="Don't have an account?"
                actionText="Sign up"
                href="/signup"
              />

            </AuthCard>

      </main>
    </>
  );
}