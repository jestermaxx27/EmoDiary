"use client"

import { useState } from "react"
import type { EmotionAnalysis } from "@/lib/emotions"

export function useEmotionAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const analyzeEmotion = async (text: string): Promise<EmotionAnalysis | null> => {
    if (!text.trim()) {
      setError("Please enter some text to analyze")
      return null
    }

    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await fetch("/api/analyze-emotion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze emotion")
      }

      const analysis = await response.json()
      return analysis
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
      return null
    } finally {
      setIsAnalyzing(false)
    }
  }

  return {
    analyzeEmotion,
    isAnalyzing,
    error,
  }
}
