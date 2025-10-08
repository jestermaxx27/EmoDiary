"use client"

import { useState } from "react"
import { JournalEntry } from "@/components/journal-entry"
import { JournalHistory } from "@/components/journal-history"
import { EmotionTrends } from "@/components/emotion-trends"
import { Dashboard } from "@/components/dashboard"
import { JournalStorage } from "@/lib/journal-storage"
import type { JournalEntry as JournalEntryType } from "@/lib/journal-storage"

export default function Page() {
  const [entries, setEntries] = useState<JournalEntryType[]>(() => JournalStorage.getEntries())
  const [activeView, setActiveView] = useState<"dashboard" | "write" | "history" | "trends">("dashboard")
  const [userName, setUserName] = useState<string>("");
  const [showEntryPage, setShowEntryPage] = useState(true);
  const [entryFadeOut, setEntryFadeOut] = useState(false);
  const [dashboardFadeIn, setDashboardFadeIn] = useState(false);

  const handleNewEntry = (entry: JournalEntryType) => {
    setEntries((prev) => [entry, ...prev])
  }

  const handleUpdateEntry = (id: string, updates: Partial<JournalEntryType>) => {
    JournalStorage.updateEntry(id, updates)
    setEntries((prev) => prev.map((entry) => (entry.id === id ? { ...entry, ...updates } : entry)))
  }

  const handleDeleteEntry = (id: string) => {
    JournalStorage.deleteEntry(id)
    setEntries((prev) => prev.filter((entry) => entry.id !== id))
  }

  const handleNavigate = (view: "write" | "history" | "trends") => {
    setActiveView(view)
  }

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      setEntryFadeOut(true);
      setTimeout(() => {
        setShowEntryPage(false);
        setDashboardFadeIn(true);
      }, 600); // match animation duration
    }
  };

  if (showEntryPage) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-200 transition-all duration-700 ${entryFadeOut ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
        <div className="mb-10 transition-all duration-700 ease-out opacity-100 scale-100">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-lg font-serif animate-fade-in">
            EmoDiary
          </h1>
          <p className="mt-2 text-lg text-gray-600 font-medium text-center animate-fade-in delay-200">
            Your personal emotional journal
          </p>
        </div>
        <form
          onSubmit={handleNameSubmit}
          className="w-full max-w-sm bg-white/80 rounded-xl shadow-xl p-8 flex flex-col items-center gap-6 animate-fade-in-up"
        >
          <label htmlFor="name" className="text-xl font-semibold text-gray-700 mb-2">
            What's your name?
          </label>
          <input
            id="name"
            type="text"
            value={userName}
            onChange={e => setUserName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg transition-all duration-200"
            placeholder="Enter your name..."
            autoFocus
          />
          <button
            type="submit"
            className="w-full py-2 px-6 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold text-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            Go
          </button>
        </form>
        <style jsx>{`
          .animate-fade-in {
            animation: fadeIn 1s ease forwards;
          }
          .animate-fade-in-up {
            animation: fadeInUp 1s 0.3s ease forwards;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 transition-all duration-700 ${dashboardFadeIn ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
      {/* Header */}
      <header className="border-b border-amber-200/50 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-amber-900">EmoDiary</h1>
              <p className="text-amber-700/80">Discover your emotions, nurture your wellbeing</p>
            </div>
            <nav className="flex gap-2">
              <button
                onClick={() => setActiveView("dashboard")}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                  activeView === "dashboard"
                    ? "bg-amber-200 text-amber-900 shadow-sm"
                    : "text-amber-700 hover:bg-amber-100"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveView("write")}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                  activeView === "write" ? "bg-amber-200 text-amber-900 shadow-sm" : "text-amber-700 hover:bg-amber-100"
                }`}
              >
                Write Entry
              </button>
              <button
                onClick={() => setActiveView("history")}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                  activeView === "history"
                    ? "bg-amber-200 text-amber-900 shadow-sm"
                    : "text-amber-700 hover:bg-amber-100"
                }`}
              >
                My Entries ({entries.length})
              </button>
              <button
                onClick={() => setActiveView("trends")}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                  activeView === "trends"
                    ? "bg-amber-200 text-amber-900 shadow-sm"
                    : "text-amber-700 hover:bg-amber-100"
                }`}
              >
                Trends
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-8">
  {activeView === "dashboard" && <Dashboard entries={entries} onNavigate={handleNavigate} userName={userName} />}
        {activeView === "write" && <JournalEntry onSave={handleNewEntry} />}
        {activeView === "history" && (
          <JournalHistory
            entries={entries}
            onUpdateEntry={handleUpdateEntry}
            onDeleteEntry={handleDeleteEntry}
          />
        )}
        {activeView === "trends" && <EmotionTrends entries={entries} />}
      </main>
    </div>
  )
}
