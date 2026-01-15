"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function CreatePactPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [category, setCategory] = useState("personal_loan"); // 🆕
  const [counterpartyEmail, setCounterpartyEmail] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);


  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    await addDoc(collection(db, "pacts"), {
  category, // ✅ USE STATE, NOT HARDCODED
  title,
  amount: Number(amount),
  description,
  creatorId: user.uid,
  creatorEmail: user.email,
  counterpartyEmail: counterpartyEmail.trim().toLowerCase(),
  counterpartyStatus: "pending",
  status: "draft",
  counterpartyId: null,

  creatorConsented: false,
  creatorConsentedAt: null,
  counterpartyConsented: false,
  counterpartyConsentedAt: null,

  createdAt: serverTimestamp(),
});


    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <form
        onSubmit={handleCreate}
        className="w-full max-w-md space-y-4 rounded-xl border border-white/10 p-6"
      >
        <h1 className="text-xl font-semibold">Create Pact</h1>

        {/* 🆕 CATEGORY DROPDOWN */}
        <div>
          <label className="block text-sm mb-1 text-white/70">
            Agreement Type
          </label>
          <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full rounded-md border border-white/20 bg-black px-3 py-2"
>
  <option value="personal_loan">Personal Loan</option>
  <option value="freelance_service">Freelance / Service</option>
  <option value="general_promise">General Promise</option>
</select>

        </div>

        <input
          placeholder="Pact title"
          className="w-full rounded-md border border-white/20 bg-black px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Amount"
          className="w-full rounded-md border border-white/20 bg-black px-3 py-2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full rounded-md border border-white/20 bg-black px-3 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />

        <input
          type="email"
          placeholder="Other party's email"
          className="w-full rounded-md border border-white/20 bg-black px-3 py-2"
          value={counterpartyEmail}
          onChange={(e) => setCounterpartyEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-white py-2 font-medium text-black disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Pact"}
        </button>
      </form>
    </div>
  );
}
