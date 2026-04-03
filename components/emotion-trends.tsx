"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { JournalEntry } from "@/lib/journal-storage"
import type { EmotionType } from "@/lib/emotions"
import { emotionColors, emotionEmojis } from "@/lib/emotions"
import { BarChart3, Calendar, Heart } from "lucide-react"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface EmotionTrendsProps {
  entries: JournalEntry[]
}

export function EmotionTrends({ entries }: EmotionTrendsProps) {
  const analyzedEntries = entries.filter((entry) => entry.emotionAnalysis)

  const emotionStats = useMemo(() => {
    const stats: Record<EmotionType, number> = {
      joy: 0,
      sadness: 0,
      anger: 0,
      fear: 0,
      surprise: 0,
      disgust: 0,
      neutral: 0,
      love: 0,
      excitement: 0,
      anxiety: 0,
      contentment: 0,
      frustration: 0,
    }

    analyzedEntries.forEach((entry) => {
      if (entry.emotionAnalysis) {
        stats[entry.emotionAnalysis.primaryEmotion]++
      }
    })

    return Object.entries(stats)
      .filter(([, count]) => count > 0)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
  }, [analyzedEntries])

  const sentimentStats = useMemo(() => {
    const stats = { positive: 0, negative: 0, neutral: 0 }
    analyzedEntries.forEach((entry) => {
      if (entry.emotionAnalysis) {
        stats[entry.emotionAnalysis.sentiment]++
      }
    })
    return stats
  }, [analyzedEntries])

  const recentTrend = useMemo(() => {
    const recent = analyzedEntries.slice(0, 5)
    const positiveCount = recent.filter((entry) => entry.emotionAnalysis?.sentiment === "positive").length
    const total = recent.length
    return total > 0 ? Math.round((positiveCount / total) * 100) : 0
  }, [analyzedEntries])

  const emotionChartData = useMemo(() => {
    return emotionStats.map(([emotion, count]) => ({
      name: emotion.charAt(0).toUpperCase() + emotion.slice(1),
      count,
      emotion: emotion as EmotionType,
    }))
  }, [emotionStats])

  const sentimentChartData = useMemo(() => {
    return [
      { name: "Positive", value: sentimentStats.positive, color: "#22c55e" },
      { name: "Neutral", value: sentimentStats.neutral, color: "#9ca3af" },
      { name: "Negative", value: sentimentStats.negative, color: "#ef4444" },
    ].filter((item) => item.value > 0)
  }, [sentimentStats])

  const timelineData = useMemo(() => {
    const data: Array<{ date: string; positive: number; negative: number; neutral: number }> = []
    const sortedEntries = [...analyzedEntries].reverse()

    sortedEntries.forEach((entry, index) => {
      if (entry.emotionAnalysis) {
        const date = new Date(entry.timestamp).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })

        const existing = data.find((d) => d.date === date)

        if (existing) {
          if (entry.emotionAnalysis.sentiment === "positive") existing.positive++
          else if (entry.emotionAnalysis.sentiment === "negative") existing.negative++
          else existing.neutral++
        } else {
          data.push({
            date,
            positive: entry.emotionAnalysis.sentiment === "positive" ? 1 : 0,
            negative: entry.emotionAnalysis.sentiment === "negative" ? 1 : 0,
            neutral: entry.emotionAnalysis.sentiment === "neutral" ? 1 : 0,
          })
        }
      }
    })

    return data.slice(-7)
  }, [analyzedEntries])

  if (analyzedEntries.length === 0) {
    return (
      <Card className="border-amber-200 bg-white/60 backdrop-blur-sm">
        <CardContent className="py-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
            <BarChart3 className="h-6 w-6 text-amber-600" />
          </div>
          <p className="text-amber-700">Write and analyze more entries to see your emotional trends.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Recent Trend */}
      <Card className="border-green-200 bg-green-50/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-green-600" />
            <CardTitle className="text-green-900">Recent Wellbeing</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-900 mb-1">{recentTrend}%</div>
            <p className="text-sm text-green-700">Positive sentiment in your last 5 entries</p>
          </div>
        </CardContent>
      </Card>

      {/* Top Emotions */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-blue-900">Your Most Common Emotions</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {emotionStats.map(([emotion, count]) => {
              const emotionType = emotion as EmotionType
              const percentage = Math.round((count / analyzedEntries.length) * 100)
              return (
                <div key={emotion} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{emotionEmojis[emotionType]}</span>
                    <span className="capitalize font-medium">{emotion}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-muted-foreground">
                      {count} times ({percentage}%)
                    </div>
                    <Badge className={emotionColors[emotionType]}>{count}</Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Emotion Distribution Bar Chart */}
      {emotionChartData.length > 0 && (
        <Card className="border-indigo-200 bg-indigo-50/50">
          <CardHeader>
            <CardTitle className="text-indigo-900">Emotion Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={emotionChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e0e7ff",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Sentiment Timeline */}
      {timelineData.length > 0 && (
        <Card className="border-cyan-200 bg-cyan-50/50">
          <CardHeader>
            <CardTitle className="text-cyan-900">Sentiment Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cffafe" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #cffafe",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="positive" stroke="#22c55e" strokeWidth={2} name="Positive" />
                <Line type="monotone" dataKey="neutral" stroke="#9ca3af" strokeWidth={2} name="Neutral" />
                <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2} name="Negative" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Sentiment Distribution */}
      <Card className="border-purple-200 bg-purple-50/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            <CardTitle className="text-purple-900">Overall Sentiment</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="rounded-lg bg-green-100 p-3">
              <div className="text-2xl font-bold text-green-800">{sentimentStats.positive}</div>
              <div className="text-sm text-green-700">Positive</div>
            </div>
            <div className="rounded-lg bg-gray-100 p-3">
              <div className="text-2xl font-bold text-gray-800">{sentimentStats.neutral}</div>
              <div className="text-sm text-gray-700">Neutral</div>
            </div>
            <div className="rounded-lg bg-red-100 p-3">
              <div className="text-2xl font-bold text-red-800">{sentimentStats.negative}</div>
              <div className="text-sm text-red-700">Negative</div>
            </div>
          </div>

          {sentimentChartData.length > 0 && (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={sentimentChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sentimentChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
