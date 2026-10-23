/* eslint-disable react-refresh/only-export-components */
"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import {
  doc,
  getDoc
} from "firebase/firestore";
type UserProfile = {
  fullName?: string;
  designation?: string;
  email?: string;
};
type AuthContextType = {
  user: User | null;
  loading: boolean;
  profile: UserProfile | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] =
  useState<UserProfile | null>(null);

  useEffect(() => {
    let mounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!mounted) return;
      setUser(firebaseUser);

      try {
        if (firebaseUser) {
          const userRef = doc(db, "users", firebaseUser.uid);
          const userSnap = await getDoc(userRef);
          if (mounted) {
            setProfile(
              userSnap.exists()
                ? (userSnap.data() as UserProfile)
                : null
            );
          }
        } else if (mounted) {
          setProfile(null);
        }
      } catch (error) {
        console.error("Failed to load user profile:", error);
        if (mounted) setProfile(null);
      } finally {
        if (mounted) setLoading(false);
      }
    });

    // Browsers can restore a page from the back-forward cache without
    // remounting React. Reloading forces Firebase auth and route guards to
    // run again, so a page from before logout is never trusted as current.
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload();
      }
    };
    window.addEventListener("pageshow", handlePageShow);

    // Keep the existing 30-minute inactivity sign-out behavior.
    let timeout: ReturnType<typeof setTimeout>;
    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        try {
          await auth.signOut();
        } finally {
          window.location.replace("/login");
        }
      }, 30 * 60 * 1000);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("touchstart", resetTimer);
    resetTimer();

    return () => {
      mounted = false;
      unsubscribe();
      clearTimeout(timeout);
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
    };
  }, []);

  const requiresAuth =
    pathname === "/dashboard" ||
    pathname === "/profile" ||
    pathname === "/pact/new" ||
    pathname.startsWith("/pact/") ||
    pathname.startsWith("/agreement-builder/");

  useEffect(() => {
    if (requiresAuth && !loading && !user) {
      router.replace("/login");
    }
  }, [requiresAuth, loading, user, router]);


  return (
    <AuthContext.Provider
  value={{
    user,
    loading,
    profile
  }}
>
      {requiresAuth && (loading || !user) ? (
        <main className="status-page" role="status" aria-live="polite">
          <p>{loading ? "Checking your session..." : "Redirecting to login..."}</p>
        </main>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
