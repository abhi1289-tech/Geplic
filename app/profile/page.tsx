"use client";

import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import AppHeader from "@/components/AppHeader";
import { useRouter } from "next/navigation";
import StatusPage from "@/components/StatusPage";
import ProfileForm from "@/components/profile/ProfileForm";
import ProfileLayout from "@/components/profile/ProfileLayout";

export default function ProfilePage(){

  const { user } = useAuth();
  const router = useRouter();

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

      <StatusPage 
        message = "Loading profile..."
      />

    );

  }

  return(

    <div className="profile-page">
      {/* HEADER */}
      
          <AppHeader
        rightContent={
          <button
            onClick={() => router.push("/dashboard")}
      className="btn btn-secondary btn-sm">
            Dashboard
          </button>
        }
      />
      
          {/* CONTENT */}

<ProfileLayout>

  <ProfileForm
    fullName={fullName}
    setFullName={setFullName}
    designation={designation}
    setDesignation={setDesignation}
    saving={saving}
    onSave={saveProfile}
  />

</ProfileLayout>

    </div>

  );

}