export type EmotionType =
  | "joy"
  | "sadness"
  | "anger"
  | "fear"
  | "surprise"
  | "disgust"
  | "neutral"
  | "love"
  | "excitement"
  | "anxiety"
  | "contentment"
  | "frustration"

export interface EmotionAnalysis {
  primaryEmotion: EmotionType
  confidence: number
  secondaryEmotions: Array<{
    emotion: EmotionType
    confidence: number
  }>
  sentiment: "positive" | "negative" | "neutral"
  intensity: "low" | "medium" | "high"
  suggestions: Array<string | { text: string; category?: string }>
}

export const emotionColors: Record<EmotionType, string> = {
  joy: "bg-yellow-100 text-yellow-800 border-yellow-200",
  sadness: "bg-blue-100 text-blue-800 border-blue-200",
  anger: "bg-red-100 text-red-800 border-red-200",
  fear: "bg-purple-100 text-purple-800 border-purple-200",
  surprise: "bg-orange-100 text-orange-800 border-orange-200",
  disgust: "bg-green-100 text-green-800 border-green-200",
  neutral: "bg-gray-100 text-gray-800 border-gray-200",
  love: "bg-pink-100 text-pink-800 border-pink-200",
  excitement: "bg-amber-100 text-amber-800 border-amber-200",
  anxiety: "bg-indigo-100 text-indigo-800 border-indigo-200",
  contentment: "bg-emerald-100 text-emerald-800 border-emerald-200",
  frustration: "bg-rose-100 text-rose-800 border-rose-200",
}

export const emotionEmojis: Record<EmotionType, string> = {
  joy: "😊",
  sadness: "😢",
  anger: "😠",
  fear: "😨",
  surprise: "😲",
  disgust: "🤢",
  neutral: "😐",
  love: "❤️",
  excitement: "🤩",
  anxiety: "😰",
  contentment: "😌",
  frustration: "😤",
}
