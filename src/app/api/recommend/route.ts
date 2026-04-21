import { NextRequest, NextResponse } from "next/server";
import { diseases, symptoms } from "@/lib/medical-data";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { diseaseIds } = body;

    if (!diseaseIds || !Array.isArray(diseaseIds)) {
      return NextResponse.json(
        { error: "diseaseIds array is required" },
        { status: 400 }
      );
    }

    const recommendations = diseaseIds
      .map((id: string) => {
        const disease = diseases.find((d) => d.id === id);
        if (!disease) return null;

        return {
          diseaseId: disease.id,
          diseaseName: disease.name,
          urgency: disease.urgency,
          selfCare: disease.selfCare,
          medications: disease.medications,
          whenToSeeDoctor: disease.whenToSeeDoctor,
          specialistType: disease.specialistType,
          relatedSymptoms: disease.symptoms
            .map((sId) => {
              const symptom = symptoms.find((s) => s.id === sId);
              return symptom
                ? { id: symptom.id, name: symptom.name, category: symptom.category }
                : null;
            })
            .filter(Boolean),
        };
      })
      .filter(Boolean);

    return NextResponse.json({
      success: true,
      disclaimer:
        "These recommendations are for informational purposes only. Always consult a healthcare professional before starting any treatment.",
      recommendations,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Recommendation error:", error);
    return NextResponse.json(
      { error: "Failed to generate recommendations" },
      { status: 500 }
    );
  }
}
