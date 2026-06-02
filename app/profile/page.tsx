"use client";

import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage(){

  const { user } = useAuth();

  const [fullName,setFullName] = useState("");
  const [designation,setDesignation] = useState("");

  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);

  useEffect(()=>{

    async function loadProfile(){

      if(!user) return;

      const ref = doc(db,"users",user.uid);

      const snap = await getDoc(ref);

      if(snap.exists()){

        const data = snap.data();

        setFullName(data.fullName || "");
        setDesignation(data.designation || "");

      }

      setLoading(false);

    }

    loadProfile();

  },[user]);

  async function saveProfile(){

    if(!user) return;

    try{

      setSaving(true);

      await updateDoc(doc(db,"users",user.uid),{

        fullName,
        designation

      });

      alert("Profile updated");

    }catch(error){

      console.error(error);
      alert("Failed to update profile");

    }finally{

      setSaving(false);

    }

  }

  if(loading){

    return(

      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        Loading profile...
      </div>

    );

  }

  return(

    <div className="min-h-screen bg-black text-white">

      <main className="mx-auto max-w-3xl px-6 py-14">

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl">

          <div className="mb-10 flex items-center gap-5">

            <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-cyan-400/20 bg-cyan-400/10 text-3xl font-bold text-cyan-300">

              {fullName
                ? fullName
                    .split(" ")
                    .map((word)=>word[0])
                    .join("")
                    .slice(0,2)
                    .toUpperCase()
                : "U"}

            </div>

            <div>

              <h1 className="text-4xl font-bold">
                Your Profile
              </h1>

              <p className="mt-2 text-white/50">
                Manage your Geplic identity
              </p>

            </div>

          </div>

          <div className="space-y-6">

            <div className="space-y-2">

              <label className="text-sm text-white/60">
                Full Name
              </label>

              <input
                value={fullName}
                onChange={(e)=>setFullName(e.target.value)}
                placeholder="Your full name"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition-all duration-300 hover:border-cyan-400/30 focus:border-cyan-400/60"
              />

            </div>

            <div className="space-y-2">

              <label className="text-sm text-white/60">
                Designation
              </label>

              <input
                value={designation}
                onChange={(e)=>setDesignation(e.target.value)}
                placeholder="Your role or profession"
                className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition-all duration-300 hover:border-cyan-400/30 focus:border-cyan-400/60"
              />

            </div>

            <button
              onClick={saveProfile}
              disabled={saving}
              className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-violet-500 py-4 font-semibold text-black transition-all duration-300 hover:scale-[1.01]"
            >

              {saving
                ? "Saving..."
                : "Save Profile"}

            </button>

          </div>

        </div>

      </main>

    </div>

  );

}