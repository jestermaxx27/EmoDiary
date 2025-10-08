"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <div className="max-w-md w-full p-8 rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-amber-900 mb-4 drop-shadow-lg font-['Inter','Segoe UI','Roboto','Helvetica Neue',Arial,sans-serif']">Welcome!</h1>
          <p className="text-lg text-amber-700/80 mb-6 font-medium text-center">Please enter your name to continue</p>
          <form
            className="w-full flex flex-col gap-4"
            onSubmit={e => {
              e.preventDefault();
              if (name.trim()) setSubmitted(true);
            }}
          >
            <input
              type="text"
              className="rounded-lg border border-amber-200 px-4 py-3 text-lg shadow focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
              placeholder="Your Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-amber-400 text-white font-bold py-2 px-6 rounded-lg shadow hover:bg-amber-500 transition-all text-lg"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <div className="max-w-2xl w-full p-10 rounded-2xl shadow-2xl bg-white/90 backdrop-blur-md flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-amber-900 mb-4 drop-shadow-lg font-['Inter','Segoe UI','Roboto','Helvetica Neue',Arial,sans-serif']">
          Welcome, {name}!
        </h2>
        <p className="text-lg text-amber-700/80 mb-6 font-medium text-center">
          This is your dashboard. Enjoy your experience!
        </p>
        {/* Add your dashboard content here */}
      </div>
    </div>
  );
}
