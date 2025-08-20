"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EmotionDisplay } from "@/components/emotion-display"
import type { JournalEntry } from "@/lib/journal-storage"
import { emotionColors, emotionEmojis } from "@/lib/emotions"
import { Calendar, TrendingUp, Eye, EyeOff } from "lucide-react"

interface JournalHistoryProps {
  entries: JournalEntry[]
  onUpdateEntry: (id: string, updates: Partial<JournalEntry>) => void
}

export function JournalHistory({ entries, onUpdateEntry }: JournalHistoryProps) {
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "analyzed" | "unanalyzed">("all")

  const filteredEntries = entries.filter((entry) => {
    if (filter === "analyzed") return entry.emotionAnalysis
    if (filter === "unanalyzed") return !entry.emotionAnalysis
    return true
  })

  const toggleExpanded = (entryId: string) => {
    setExpandedEntry(expandedEntry === entryId ? null : entryId)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  if (entries.length === 0) {
    return (
      <Card className="border-amber-200 bg-white/60 backdrop-blur-sm">
        <CardContent className="py-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
            <Calendar className="h-8 w-8 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-amber-900 mb-2">No entries yet</h3>
          <p className="text-amber-700/80">Start writing your first journal entry to begin your emotional journey.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-blue-900">Your Journey Overview</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-900">{entries.length}</div>
              <div className="text-sm text-blue-700">Total Entries</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-900">{entries.filter((e) => e.emotionAnalysis).length}</div>
              <div className="text-sm text-blue-700">Analyzed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-900">
                {entries.filter((e) => e.emotionAnalysis?.sentiment === "positive").length}
              </div>
              <div className="text-sm text-blue-700">Positive Days</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter Controls */}
      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
          className={filter === "all" ? "bg-amber-600 hover:bg-amber-700" : ""}
        >
          All ({entries.length})
        </Button>
        <Button
          variant={filter === "analyzed" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("analyzed")}
          className={filter === "analyzed" ? "bg-amber-600 hover:bg-amber-700" : ""}
        >
          Analyzed ({entries.filter((e) => e.emotionAnalysis).length})
        </Button>
        <Button
          variant={filter === "unanalyzed" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("unanalyzed")}
          className={filter === "unanalyzed" ? "bg-amber-600 hover:bg-amber-700" : ""}
        >
          Unanalyzed ({entries.filter((e) => !e.emotionAnalysis).length})
        </Button>
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        {filteredEntries.map((entry) => (
          <Card key={entry.id} className="border-amber-200/50 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {entry.title && <CardTitle className="text-lg text-amber-900">{entry.title}</CardTitle>}
                    {entry.emotionAnalysis && (
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{emotionEmojis[entry.emotionAnalysis.primaryEmotion]}</span>
                        <Badge className={emotionColors[entry.emotionAnalysis.primaryEmotion]}>
                          {entry.emotionAnalysis.primaryEmotion}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-amber-700">{formatDate(entry.createdAt)}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleExpanded(entry.id)}
                  className="text-amber-700 hover:text-amber-900"
                >
                  {expandedEntry === entry.id ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Entry Preview */}
                <div className="rounded-lg bg-amber-50/50 p-3 border border-amber-200">
                  <p className="text-sm text-amber-800 leading-relaxed">
                    {expandedEntry === entry.id
                      ? entry.content
                      : `${entry.content.slice(0, 150)}${entry.content.length > 150 ? "..." : ""}`}
                  </p>
                </div>

                {/* Emotion Analysis */}
                {expandedEntry === entry.id && entry.emotionAnalysis && (
                  <EmotionDisplay analysis={entry.emotionAnalysis} />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEntries.length === 0 && (
        <Card className="border-amber-200 bg-white/60 backdrop-blur-sm">
          <CardContent className="py-8 text-center">
            <p className="text-amber-700">No entries match the current filter.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
