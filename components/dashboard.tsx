"use client"

import React, { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { JournalEntry } from "@/lib/journal-storage"
import { emotionColors, emotionEmojis, type EmotionType } from "@/lib/emotions"
import { Calendar, TrendingUp, Heart, PenTool, BarChart3, Smile, Target, Clock, Zap } from "lucide-react"

interface DashboardProps {
  entries: JournalEntry[]
  onNavigate: (view: "write" | "history" | "trends") => void
  userName?: string
}

export function Dashboard({ entries, onNavigate, userName }: DashboardProps) {
  const stats = useMemo(() => {
    const analyzedEntries = entries.filter((entry) => entry.emotionAnalysis)
    const recentEntries = entries.slice(0, 7) // Last 7 entries
    const recentAnalyzed = recentEntries.filter((entry) => entry.emotionAnalysis)

    // Calculate streaks
    let currentStreak = 0
    const today = new Date()
    for (let i = 0; i < entries.length; i++) {
      const entryDate = new Date(entries[i].createdAt)
      const daysDiff = Math.floor((today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24))
      if (daysDiff === i) {
        currentStreak++
      } else {
        break
      }
    }

    // Emotion distribution
    const emotionCounts: Record<string, number> = {}
    analyzedEntries.forEach((entry) => {
      if (entry.emotionAnalysis) {
        const emotion = entry.emotionAnalysis.primaryEmotion
        emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1
      }
    })

    const topEmotion = Object.entries(emotionCounts).sort(([, a], [, b]) => b - a)[0]

    // Sentiment trends
    const positiveDays = recentAnalyzed.filter((entry) => entry.emotionAnalysis?.sentiment === "positive").length
    const wellbeingScore = recentAnalyzed.length > 0 ? Math.round((positiveDays / recentAnalyzed.length) * 100) : 0

    return {
      totalEntries: entries.length,
      analyzedEntries: analyzedEntries.length,
      currentStreak,
      topEmotion: topEmotion ? { emotion: topEmotion[0] as EmotionType, count: topEmotion[1] } : null,
      wellbeingScore,
      recentEntries: recentEntries.slice(0, 3),
    }
  }, [entries])

  const getWellbeingMessage = (score: number) => {
    if (score >= 80) return { message: "You're doing amazing!", color: "text-green-600" }
    if (score >= 60) return { message: "You're on a good path", color: "text-blue-600" }
    if (score >= 40) return { message: "Keep nurturing yourself", color: "text-yellow-600" }
    return { message: "Stay calm and composed.", color: "text-orange-600" }
  }

  const wellbeingMessage = getWellbeingMessage(stats.wellbeingScore)

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <Card className="border-gradient-to-r from-amber-200 to-orange-200 bg-gradient-to-r from-amber-50 to-orange-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-amber-900 mb-2">
                Welcome back to your journey{userName ? `, ${userName}` : ""}!
              </h2>
              <p className="text-amber-700">
                {stats.totalEntries === 0
                  ? "How are we feeling today?"
                  : `You've written ${stats.totalEntries} entries and analyzed ${stats.analyzedEntries} of them.`}
              </p>
            </div>
            <Button
              onClick={() => onNavigate("write")}
              className="bg-amber-600 hover:bg-amber-700 text-white"
              size="lg"
            >
              <PenTool className="mr-2 h-4 w-4" />
              Write Entry
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Entries</p>
                <p className="text-2xl font-bold text-blue-900">{stats.totalEntries}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Writing Streak</p>
                <p className="text-2xl font-bold text-green-900">{stats.currentStreak} days</p>
              </div>
              <Zap className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Wellbeing Score</p>
                <p className={`text-2xl font-bold ${wellbeingMessage.color}`}>{stats.wellbeingScore}%</p>
              </div>
              <Heart className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Analyzed</p>
                <p className="text-2xl font-bold text-orange-900">{stats.analyzedEntries}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Wellbeing Overview */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-indigo-200 bg-indigo-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-900">
              <Target className="h-5 w-5" />
              Your Wellbeing Journey
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-indigo-700">Recent Positivity</span>
                <span className={`text-sm font-medium ${wellbeingMessage.color}`}>{stats.wellbeingScore}%</span>
              </div>
              <Progress value={stats.wellbeingScore} className="h-3" />
              <p className={`text-sm mt-2 ${wellbeingMessage.color}`}>{wellbeingMessage.message}</p>
            </div>

            {stats.topEmotion && (
              <div className="rounded-lg bg-white/60 p-3 border border-indigo-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{emotionEmojis[stats.topEmotion.emotion]}</span>
                  <span className="font-medium capitalize text-indigo-900">{stats.topEmotion.emotion}</span>
                </div>
                <p className="text-sm text-indigo-700">Your most common emotion ({stats.topEmotion.count} times)</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-rose-200 bg-rose-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-rose-900">
              <Clock className="h-5 w-5" />
              Recent Entries
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recentEntries.length > 0 ? (
              <div className="space-y-3">
                {stats.recentEntries.map((entry) => (
                  <div key={entry.id} className="rounded-lg bg-white/60 p-3 border border-rose-200">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex-1">
                        {entry.title && <h4 className="font-medium text-sm text-rose-900">{entry.title}</h4>}
                        <p className="text-xs text-rose-700">{new Date(entry.createdAt).toLocaleDateString()}</p>
                      </div>
                      {entry.emotionAnalysis && (
                        <div className="flex items-center gap-1">
                          <span className="text-sm">{emotionEmojis[entry.emotionAnalysis.primaryEmotion]}</span>
                          <Badge className={emotionColors[entry.emotionAnalysis.primaryEmotion]} variant="outline">
                            {entry.emotionAnalysis.primaryEmotion}
                          </Badge>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-rose-600 leading-relaxed">
                      {entry.content.slice(0, 80)}
                      {entry.content.length > 80 ? "..." : ""}
                    </p>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate("history")}
                  className="w-full text-rose-700 border-rose-300 hover:bg-rose-100"
                >
                  View All Entries
                </Button>
              </div>
            ) : (
              <div className="text-center py-4">
                <Smile className="h-8 w-8 text-rose-400 mx-auto mb-2" />
                <p className="text-sm text-rose-600">No entries yet. Start writing to see them here!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-teal-200 bg-teal-50/50">
        <CardHeader>
          <CardTitle className="text-teal-900">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            <Button
              onClick={() => onNavigate("write")}
              className="bg-teal-600 hover:bg-teal-700 text-white justify-start"
            >
              <PenTool className="mr-2 h-4 w-4" />
              Write New Entry
            </Button>
            <Button
              onClick={() => onNavigate("trends")}
              variant="outline"
              className="border-teal-300 text-teal-700 hover:bg-teal-100 justify-start"
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              View Trends
            </Button>
            <Button
              onClick={() => onNavigate("history")}
              variant="outline"
              className="border-teal-300 text-teal-700 hover:bg-teal-100 justify-start"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Browse History
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
