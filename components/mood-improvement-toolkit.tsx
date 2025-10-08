"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { EmotionType } from "@/lib/emotions"
import { Heart, Brain, Activity, Music, Book, Coffee, Sun, Moon, Users, Smile } from "lucide-react"

interface MoodImprovementToolkitProps {
  primaryEmotion: EmotionType
  sentiment: "positive" | "negative" | "neutral"
  intensity: "low" | "medium" | "high"
}

const activities = [
  {
    id: "breathing",
    title: "Deep Breathing Exercise",
    description: "Take 5 minutes to practice deep, mindful breathing to calm your mind and body.",
    duration: "5 min",
    category: "mindfulness",
    icon: <Heart className="h-4 w-4" />,
    emotions: ["anxiety", "anger", "fear", "sadness"],
  },
  {
    id: "gratitude",
    title: "Gratitude Practice",
    description: "Write down 3 things you're grateful for today, no matter how small.",
    duration: "10 min",
    category: "mindfulness",
    icon: <Smile className="h-4 w-4" />,
    emotions: ["sadness", "neutral", "frustration"],
  },
  {
    id: "walk",
    title: "Nature Walk",
    description: "Take a gentle walk outside, focusing on the sights and sounds around you.",
    duration: "15-30 min",
    category: "physical",
    icon: <Sun className="h-4 w-4" />,
    emotions: ["sadness", "anxiety", "anger", "neutral"],
  },
  {
    id: "music",
    title: "Listen to Uplifting Music",
    description: "Play your favorite upbeat songs or discover new music that lifts your spirits.",
    duration: "15-20 min",
    category: "creative",
    icon: <Music className="h-4 w-4" />,
    emotions: ["sadness", "neutral", "frustration"],
  },
  {
    id: "journal",
    title: "Stream of Consciousness Writing",
    description: "Write continuously for 10 minutes without stopping or editing your thoughts.",
    duration: "10 min",
    category: "creative",
    icon: <Book className="h-4 w-4" />,
    emotions: ["anxiety", "anger", "frustration", "sadness"],
  },
  {
    id: "tea",
    title: "Mindful Tea/Coffee Break",
    description: "Prepare and enjoy a warm beverage mindfully, savoring each sip.",
    duration: "10-15 min",
    category: "self-care",
    icon: <Coffee className="h-4 w-4" />,
    emotions: ["anxiety", "neutral", "sadness"],
  },
  {
    id: "connect",
    title: "Reach Out to Someone",
    description: "Send a message or call someone you care about. Connection heals.",
    duration: "10-30 min",
    category: "social",
    icon: <Users className="h-4 w-4" />,
    emotions: ["sadness", "anxiety", "neutral"],
  },
  {
    id: "meditation",
    title: "Guided Meditation",
    description: "Follow a short guided meditation to center yourself and find peace.",
    duration: "10-20 min",
    category: "mindfulness",
    icon: <Brain className="h-4 w-4" />,
    emotions: ["anxiety", "anger", "fear", "sadness"],
  },
  {
    id: "exercise",
    title: "Quick Exercise",
    description: "Do some jumping jacks, push-ups, or stretches to release tension.",
    duration: "5-15 min",
    category: "physical",
    icon: <Activity className="h-4 w-4" />,
    emotions: ["anger", "frustration", "anxiety", "sadness"],
  },
  {
    id: "sleep",
    title: "Rest & Recharge",
    description: "Take a short nap or simply lie down and rest your mind and body.",
    duration: "20-30 min",
    category: "self-care",
    icon: <Moon className="h-4 w-4" />,
    emotions: ["anxiety", "sadness", "frustration"],
  },
]

const categoryColors = {
  mindfulness: "bg-purple-100 text-purple-800 border-purple-200",
  physical: "bg-green-100 text-green-800 border-green-200",
  creative: "bg-orange-100 text-orange-800 border-orange-200",
  social: "bg-blue-100 text-blue-800 border-blue-200",
  "self-care": "bg-pink-100 text-pink-800 border-pink-200",
}

type CategoryType = keyof typeof categoryColors

export function MoodImprovementToolkit({ primaryEmotion, sentiment, intensity }: MoodImprovementToolkitProps) {
  const [completedActivities, setCompletedActivities] = useState<Set<string>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null)

  // Filter activities based on emotion and sentiment
  const recommendedActivities = activities.filter((activity) => {
    if (sentiment === "positive") {
      // For positive emotions, suggest activities that maintain or enhance the mood
      return (
        ["joy", "love", "excitement", "contentment"].includes(primaryEmotion) ||
        activity.emotions.includes(primaryEmotion)
      )
    }
    return activity.emotions.includes(primaryEmotion)
  })

  const filteredActivities = selectedCategory
    ? recommendedActivities.filter((activity) => activity.category === selectedCategory)
    : recommendedActivities

  const handleCompleteActivity = (activityId: string) => {
    setCompletedActivities((prev) => new Set([...prev, activityId]))
  }

  const categories: CategoryType[] = Array.from(new Set(recommendedActivities.map((activity) => activity.category))) as CategoryType[]

  return (
    <Card className="border-indigo-200 bg-indigo-50/50">
      <CardHeader>
        <CardTitle className="text-indigo-900 flex items-center gap-2">
          <Heart className="h-5 w-5" />
          Wellness Toolkit
        </CardTitle>
        <p className="text-sm text-indigo-700">
          Personalized activities to help you feel better based on your current emotional state.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className={selectedCategory === null ? "bg-indigo-600 hover:bg-indigo-700" : ""}
          >
            All ({recommendedActivities.length})
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-indigo-600 hover:bg-indigo-700" : ""}
            >
              {category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")} (
              {recommendedActivities.filter((a) => a.category === category).length})
            </Button>
          ))}
        </div>

        {/* Activities Grid */}
        <div className="grid gap-3 md:grid-cols-2">
          {filteredActivities.map((activity) => {
            const isCompleted = completedActivities.has(activity.id)
            return (
              <Card
                key={activity.id}
                className={`transition-all ${
                  isCompleted
                    ? "bg-green-50 border-green-200 opacity-75"
                    : "bg-white/80 border-gray-200 hover:shadow-md"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {activity.icon}
                      <h4 className="font-medium text-sm">{activity.title}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={categoryColors[activity.category as CategoryType]} variant="outline">
                        {activity.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{activity.duration}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{activity.description}</p>
                  <Button
                    size="sm"
                    variant={isCompleted ? "outline" : "default"}
                    onClick={() => handleCompleteActivity(activity.id)}
                    disabled={isCompleted}
                    className={`w-full text-xs ${
                      isCompleted ? "bg-green-100 text-green-800 border-green-300" : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
                  >
                    {isCompleted ? "Completed ✓" : "Try This Activity"}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-8">
            <p className="text-indigo-700">No activities found for the selected category.</p>
          </div>
        )}

        {/* Progress Summary */}
        {completedActivities.size > 0 && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800">Great Progress!</span>
              </div>
              <p className="text-sm text-green-700">
                You've completed {completedActivities.size} wellness activity
                {completedActivities.size === 1 ? "" : "ies"} today. Keep nurturing your wellbeing!
              </p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}
