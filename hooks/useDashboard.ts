"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

import {
  getDashboardPacts,
  type Pact,
} from "@/services/dashboardService";

export default function useDashboard() {
  const router = useRouter();

  const {
    user,
    profile,
    loading,
  } = useAuth();

  const [pacts, setPacts] =
    useState<Pact[]>([]);

  const [pactsLoading, setPactsLoading] =
    useState(true);

  const [logoutLoading, setLogoutLoading] =
    useState(false);

  /* -------------------------------- */
  /* Redirect if not logged in */
  /* -------------------------------- */

  useEffect(() => {

    if (!loading && !user) {
      router.replace("/login");
    }

  }, [loading, user, router]);

  /* -------------------------------- */
  /* Load Dashboard Pacts */
  /* -------------------------------- */

  useEffect(() => {

    if (!user?.email) {

      setPactsLoading(false);

      return;

    }

    const uid = user.uid;
    const email = user.email;

    async function loadPacts() {

      try {

        setPactsLoading(true);

        const items =
          await getDashboardPacts(
            uid,
            email
          );

        setPacts(items);

      } catch (err) {

        console.error(err);

      } finally {

        setPactsLoading(false);

      }

    }

    loadPacts();

  }, [user]);

  /* -------------------------------- */
  /* Logout */
  /* -------------------------------- */

  async function logout() {

    if (logoutLoading) return;

    try {

      setLogoutLoading(true);

      await signOut(auth);

      router.replace("/login");

    } catch (err) {

      console.error(err);

    } finally {

      setLogoutLoading(false);

    }

  }

  /* -------------------------------- */
  /* Initials */
  /* -------------------------------- */

  const initials = useMemo(() => {

    return (
      profile?.fullName
        ?.split(" ")
        .map(name => name[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "U"
    );

  }, [profile]);

  /* -------------------------------- */
  /* Dashboard Stats */
  /* -------------------------------- */

  const stats = useMemo(() => {

    return {

      total: pacts.length,

      draft: pacts.filter(
        p => p.status === "draft"
      ).length,

      pending: pacts.filter(
        p => p.status === "pending"
      ).length,

      completed: pacts.filter(
        p =>
          p.status === "signed" ||
          p.status === "completed"
      ).length,

    };

  }, [pacts]);

  return {

    user,

    profile,

    loading,

    initials,

    pacts,

    pactsLoading,

    logoutLoading,

    logout,

    stats,

  };

}