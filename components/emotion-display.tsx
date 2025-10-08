"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MoodImprovementToolkit } from "@/components/mood-improvement-toolkit"
import type { EmotionAnalysis } from "@/lib/emotions"
import { emotionColors, emotionEmojis } from "@/lib/emotions"
import { Heart, TrendingUp, Lightbulb } from "lucide-react"

interface EmotionDisplayProps {
  analysis: EmotionAnalysis
}

export function EmotionDisplay({ analysis }: EmotionDisplayProps) {
  console.log('EmotionDisplay analysis:', analysis);
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600 bg-green-50 border-green-200"
      case "negative":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      default:
        return "bg-green-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* Primary Emotion */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-blue-900">Your Primary Emotion</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{emotionEmojis[analysis.primaryEmotion]}</span>
              <div>
                <h3 className="text-xl font-semibold capitalize text-blue-900">{analysis.primaryEmotion}</h3>
                <p className="text-sm text-blue-700">Confidence: {Math.round(analysis.confidence * 100)}%</p>
              </div>
            </div>
            <Badge className={emotionColors[analysis.primaryEmotion]}>{analysis.primaryEmotion}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Emotion Details */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4" />
              Sentiment & Intensity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Overall Sentiment</span>
                <Badge className={getSentimentColor(analysis.sentiment)}>{analysis.sentiment}</Badge>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Emotional Intensity</span>
                <span className="text-sm capitalize">{analysis.intensity}</span>
              </div>
              <Progress
                value={analysis.intensity === "high" ? 100 : analysis.intensity === "medium" ? 60 : 30}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        {analysis.secondaryEmotions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Secondary Emotions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {analysis.secondaryEmotions.map((emotion, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{emotionEmojis[emotion.emotion]}</span>
                      <span className="text-sm capitalize">{emotion.emotion}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{Math.round(emotion.confidence * 100)}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* AI Suggestions */}
      <Card className="border-green-200 bg-green-50/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-green-600" />
            <CardTitle className="text-green-900">AI Insights & Suggestions</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analysis.suggestions.map((suggestion, index) => {
              // suggestions may be strings or objects like { text, category }
              const text = typeof suggestion === "string" ? suggestion : suggestion?.text ?? JSON.stringify(suggestion)
              const category = typeof suggestion === "object" ? (suggestion as any)?.category : undefined

              return (
                <div key={index} className="flex gap-3 rounded-lg bg-white/60 p-3 border border-green-200">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs font-medium text-green-700">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-green-800">{text}</p>
                    {category && (
                      <div className="mt-2">
                        <Badge className="uppercase text-xs">{category}</Badge>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Interactive Wellness Toolkit */}
      <MoodImprovementToolkit
        primaryEmotion={analysis.primaryEmotion}
        sentiment={analysis.sentiment}
        intensity={analysis.intensity}
      />
    </div>
  )
}
