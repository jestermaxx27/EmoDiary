import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required and must be a string" }, { status: 400 })
    }

    const { text: response } = await generateText({
      model: groq("llama3-70b-8192"),
      prompt: `Analyze the emotional content of this journal entry and provide detailed insights in JSON format:

"${text}"

Please respond with a valid JSON object containing:
1. primaryEmotion: one of ["joy", "sadness", "anger", "fear", "surprise", "disgust", "neutral", "love", "excitement", "anxiety", "contentment", "frustration"]
2. confidence: number between 0 and 1
3. secondaryEmotions: array of up to 3 objects with emotion and confidence
4. sentiment: one of ["positive", "negative", "neutral"]
5. intensity: one of ["low", "medium", "high"]
6. suggestions: array of 2-4 personalized suggestions for mood improvement

Be empathetic and supportive in your suggestions. Focus on actionable advice.

Respond only with valid JSON, no additional text:`,
    })

    try {
      const parsedResponse = JSON.parse(response)
      return NextResponse.json(parsedResponse)
    } catch (parseError) {
      console.error("Failed to parse AI response:", response)
      return NextResponse.json({
        primaryEmotion: "neutral",
        confidence: 0.5,
        secondaryEmotions: [],
        sentiment: "neutral",
        intensity: "medium",
        suggestions: [
          "Take a moment to reflect on your feelings",
          "Consider writing more about what you're experiencing",
          "Practice deep breathing or mindfulness",
          "Reach out to someone you trust if you need support",
        ],
      })
    }
  } catch (error) {
    console.error("Error analyzing emotion:", error)
    return NextResponse.json({ error: "Failed to analyze emotion" }, { status: 500 })
  }
}
