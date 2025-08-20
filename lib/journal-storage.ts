import type { EmotionAnalysis } from "./emotions"

export interface JournalEntry {
  id: string
  content: string
  createdAt: Date
  emotionAnalysis?: EmotionAnalysis
  title?: string
}

export class JournalStorage {
  private static readonly STORAGE_KEY = "emotion-journal-entries"

  static getEntries(): JournalEntry[] {
    if (typeof window === "undefined") return []

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      if (!stored) return []

      const entries = JSON.parse(stored)
      return entries.map((entry: any) => ({
        ...entry,
        createdAt: new Date(entry.createdAt),
      }))
    } catch (error) {
      console.error("Error loading journal entries:", error)
      return []
    }
  }

  static saveEntry(entry: Omit<JournalEntry, "id" | "createdAt">): JournalEntry {
    const newEntry: JournalEntry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    }

    const entries = this.getEntries()
    entries.unshift(newEntry)

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(entries))
    } catch (error) {
      console.error("Error saving journal entry:", error)
    }

    return newEntry
  }

  static updateEntry(id: string, updates: Partial<JournalEntry>): void {
    const entries = this.getEntries()
    const index = entries.findIndex((entry) => entry.id === id)

    if (index !== -1) {
      entries[index] = { ...entries[index], ...updates }
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(entries))
      } catch (error) {
        console.error("Error updating journal entry:", error)
      }
    }
  }

  static deleteEntry(id: string): void {
    const entries = this.getEntries()
    const filtered = entries.filter((entry) => entry.id !== id)

    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered))
    } catch (error) {
      console.error("Error deleting journal entry:", error)
    }
  }
}
