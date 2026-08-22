"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

import AppHeader from "@/components/AppHeader";
import AuthCard from "@/components/AuthCard";
import AuthBrand from "@/components/auth/AuthBrand";
import AuthIntro from "@/components/auth/AuthIntro";
import AuthFooter from "@/components/auth/AuthFooter";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [designation, setDesignation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const normalizedEmail = email
        .trim()
        .toLowerCase();

      const trimmedFullName =
        fullName.trim();

      const trimmedDesignation =
        designation.trim();

      if (trimmedFullName.length < 2) {
        setError(
          "Please enter your full name."
        );
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError(
          "Password must be at least 6 characters long."
        );
        setLoading(false);
        return;
      }

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          normalizedEmail,
          password
        );

      await setDoc(
        doc(
          db,
          "users",
          userCredential.user.uid
        ),
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
      console.error(
        "Signup Error:",
        err
      );

      if (
        err.code ===
        "auth/email-already-in-use"
      ) {
        setError(
          "An account with this email already exists. Please sign in."
        );
      } else if (
        err.code === "auth/weak-password"
      ) {
        setError(
          "Password should be at least 6 characters long."
        );
      } else if (
        err.code === "auth/invalid-email"
      ) {
        setError(
          "Please enter a valid email address."
        );
      } else {
        setError(
          "Something went wrong. Please try again."
        );
      }
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
                title="Create account"
                subtitle="Start creating secure digital agreements"
              />

              <form
                onSubmit={handleSignup}
                className="form"
              >

                <div className="form-group">
                  <label className="form-label">
                    Full Name
                  </label>

                  <input
                    type="text"
                    autoComplete="name"
                    className="form-input"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) =>
                      setFullName(
                        e.target.value
                      )
                    }
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Designation (Optional)
                  </label>

                  <input
                    type="text"
                    autoComplete="organization-title"
                    className="form-input"
                    placeholder="Manager, Developer, Student..."
                    value={designation}
                    onChange={(e) =>
                      setDesignation(
                        e.target.value
                      )
                    }
                  />
                </div>

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
                      setEmail(
                        e.target.value
                      )
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
                    autoComplete="new-password"
                    className="form-input"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    required
                  />
                </div>

                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-lg btn-block"
                >
                  {loading
                    ? "Creating Account..."
                    : "Create Account"}
                </button>

              </form>

              <AuthFooter
                question="Already have an account?"
                actionText="Sign in"
                href="/login"
              />

            </AuthCard>

          </main>
    </>
  );
}