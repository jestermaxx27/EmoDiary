"use client"

import { useState } from "react"
import { JournalEntry } from "@/components/journal-entry"
import { JournalHistory } from "@/components/journal-history"
import { EmotionTrends } from "@/components/emotion-trends"
import { Dashboard } from "@/components/dashboard"
import { JournalStorage } from "@/lib/journal-storage"
import type { JournalEntry as JournalEntryType } from "@/lib/journal-storage"

export default function HomePage() {
  const [entries, setEntries] = useState<JournalEntryType[]>(() => JournalStorage.getEntries())
  const [activeView, setActiveView] = useState<"dashboard" | "write" | "history" | "trends">("dashboard")

  const handleNewEntry = (entry: JournalEntryType) => {
    setEntries((prev) => [entry, ...prev])
  }

  const handleUpdateEntry = (id: string, updates: Partial<JournalEntryType>) => {
    JournalStorage.updateEntry(id, updates)
    setEntries((prev) => prev.map((entry) => (entry.id === id ? { ...entry, ...updates } : entry)))
  }

  const handleNavigate = (view: "write" | "history" | "trends") => {
    setActiveView(view)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Header */}
      <header className="border-b border-amber-200/50 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-amber-900">My Emotional Journal</h1>
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
        {activeView === "dashboard" && <Dashboard entries={entries} onNavigate={handleNavigate} />}
        {activeView === "write" && <JournalEntry onSave={handleNewEntry} />}
        {activeView === "history" && <JournalHistory entries={entries} onUpdateEntry={handleUpdateEntry} />}
        {activeView === "trends" && <EmotionTrends entries={entries} />}
      </main>
    </div>
  )
}
