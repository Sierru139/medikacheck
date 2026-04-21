import { NextRequest, NextResponse } from "next/server";
import { questionFlow } from "@/lib/medical-data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const questionId = searchParams.get("id");

  if (questionId) {
    const question = questionFlow.find((q) => q.id === questionId);
    if (!question) {
      return NextResponse.json(
        { error: "Question not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ question });
  }

  // Return entire flow structure (without full data for privacy)
  return NextResponse.json({
    totalQuestions: questionFlow.length,
    flow: questionFlow.map((q) => ({
      id: q.id,
      type: q.type,
      category: q.category,
      hasOptions: !!q.options,
      optionCount: q.options?.length || 0,
    })),
  });
}
