"use client"

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

  const [form, setForm] = useState({ email: "", code: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const email = searchParams.get("email") || "";
    setForm(f => ({ ...f, email }));
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const res = await fetch("/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Verification failed");
    } else {
      setSuccess(data.message);
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-8 rounded-2xl shadow-xl bg-white/80 backdrop-blur-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Verify Your Email</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          required
          readOnly={!!form.email}
        />
        <Input
          type="text"
          placeholder="Verification Code"
          value={form.code}
          onChange={e => setForm(f => ({ ...f, code: e.target.value }))}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </Button>
        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
        {success && <div className="text-green-600 text-sm mt-2">{success} You can now log in.</div>}
      </form>
    </div>
  );
}
