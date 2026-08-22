"use client";

import AppHeader from "@/components/AppHeader";
import AgreementTypesSection from "@/components/home/AgreementTypesSection";
import ComingSoonSection from "@/components/home/ComingSoonSection";
import ComparisonSection from "@/components/home/ComparisonSection";
import CTASection from "@/components/home/CTASection";
import FeaturesSection from "@/components/home/FeaturesSection";
import FooterSection from "@/components/home/FooterSection";
import HeroSection from "@/components/home/HeroSection";
import LifecycleSection from "@/components/home/LifecycleSection";
import ProblemSection from "@/components/home/ProblemSection";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="app">

      {/* NAVBAR */}

      <AppHeader
  rightContent={
    user ? (
      <button
        onClick={() => router.push("/dashboard")}
        className="btn btn-primary btn-sm"
      >
        Dashboard
      </button>
    ) : (
      <>
        <button
          onClick={() => router.push("/login")}
          className="btn btn-secondary btn-sm"
        >
          Login
        </button>

        <button
          onClick={() => router.push("/signup")}
          className="btn btn-primary btn-sm"
        >
          Sign Up
        </button>
      </>
    )
  }
/>
      <HeroSection />
      
      <ProblemSection />
    
      <LifecycleSection />
  
      <AgreementTypesSection />

      <ComparisonSection />

      <FeaturesSection />

      <ComingSoonSection />

      <CTASection />

      <FooterSection />
    </div>
  );
}