"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useEmotionAnalysis } from "@/hooks/use-emotion-analysis"
import { JournalStorage } from "@/lib/journal-storage"
import { EmotionDisplay } from "@/components/emotion-display"
import type { JournalEntry as JournalEntryType } from "@/lib/journal-storage"
import { Loader2, Sparkles, Heart } from "lucide-react"

interface JournalEntryProps {
  onSave: (entry: JournalEntryType) => void
}

export function JournalEntry({ onSave }: JournalEntryProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [savedEntry, setSavedEntry] = useState<JournalEntryType | null>(null)
  const { analyzeEmotion, isAnalyzing, error } = useEmotionAnalysis()

  const handleSave = async () => {
    if (!content.trim()) return

    // Save entry first
    const entry = JournalStorage.saveEntry({
      title: title.trim() || undefined,
      content: content.trim(),
    })

    // Analyze emotion
    const analysis = await analyzeEmotion(content)
    if (analysis) {
      const updatedEntry = { ...entry, emotionAnalysis: analysis }
      JournalStorage.updateEntry(entry.id, { emotionAnalysis: analysis })
      setSavedEntry(updatedEntry)
      onSave(updatedEntry)
    } else {
      setSavedEntry(entry)
      onSave(entry)
    }

    // Clear form
    setTitle("")
    setContent("")
  }

  const handleNewEntry = () => {
    setSavedEntry(null)
  }

  if (savedEntry) {
    return (
      <div className="space-y-6">
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <Heart className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-green-800">Entry Saved Successfully!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-green-700">
              Your thoughts have been captured and analyzed. Take a moment to reflect on the insights below.
            </p>
            <Button onClick={handleNewEntry} className="mt-4 bg-transparent" variant="outline">
              Write Another Entry
            </Button>
          </CardContent>
        </Card>

        {savedEntry.emotionAnalysis && <EmotionDisplay analysis={savedEntry.emotionAnalysis} />}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="border-amber-200 bg-white/60 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
            <Sparkles className="h-6 w-6 text-amber-600" />
          </div>
          <CardTitle className="text-amber-900">Welcome to Your Safe Space</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-amber-800/80">
            Express your thoughts freely. Our AI will gently analyze your emotions and offer supportive insights to help
            nurture your wellbeing.
          </p>
        </CardContent>
      </Card>

      {/* Entry Form */}
      <Card className="border-amber-200/50 bg-white/80 backdrop-blur-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-amber-900">Today's Entry</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-amber-800 mb-2">
              Title (optional)
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your entry a title..."
              className="border-amber-200 focus:border-amber-400 focus:ring-amber-400"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-amber-800 mb-2">
              How are you feeling today?
            </label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Pour your heart out... What's on your mind? How are you feeling? What happened today that made you happy, sad, or thoughtful?"
              className="min-h-[200px] border-amber-200 focus:border-amber-400 focus:ring-amber-400 resize-none"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <Button
            onClick={handleSave}
            disabled={!content.trim() || isAnalyzing}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing your emotions...
              </>
            ) : (
              "Save & Analyze Entry"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
