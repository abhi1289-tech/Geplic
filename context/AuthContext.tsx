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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] =
  useState<UserProfile | null>(null);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(
    auth,
    async (firebaseUser) => {

      setUser(firebaseUser);

      if (firebaseUser) {

        const userRef = doc(
          db,
          "users",
          firebaseUser.uid
        );

        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setProfile(
            userSnap.data() as UserProfile
          );
        }

      } else {

        setProfile(null);

      }

      setLoading(false);

    }
  );

  let timeout: NodeJS.Timeout;

  const resetTimer = () => {

    clearTimeout(timeout);

    timeout = setTimeout(async () => {

  await auth.signOut();

  window.location.href = "/login";

}, 30 * 60 * 1000);//30 minutes
  };

  window.addEventListener(
    "mousemove",
    resetTimer
  );

  window.addEventListener(
    "keydown",
    resetTimer
  );

  window.addEventListener(
    "click",
    resetTimer
  );

  window.addEventListener(
    "touchstart",
    resetTimer
  );

  resetTimer();

  return () => {

    unsubscribe();

    clearTimeout(timeout);

    window.removeEventListener(
      "mousemove",
      resetTimer
    );

    window.removeEventListener(
      "keydown",
      resetTimer
    );

    window.removeEventListener(
      "click",
      resetTimer
    );

    window.removeEventListener(
      "touchstart",
      resetTimer
    );

  };

}, []);

  return (
    <AuthContext.Provider
  value={{
    user,
    loading,
    profile
  }}
>
      {children}
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
