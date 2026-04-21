import { NextRequest, NextResponse } from "next/server";
import { diagnoseSymptoms, checkEmergency } from "@/lib/medical-data";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { symptoms, severity, duration, additionalInfo } = body;

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return NextResponse.json(
        { error: "Symptoms are required and must be a non-empty array" },
        { status: 400 }
      );
    }

    // Run diagnosis
    const results = diagnoseSymptoms(
      symptoms,
      severity || 5,
      duration || "today",
      additionalInfo || {}
    );

    // Check for emergency
    const emergency = checkEmergency(symptoms, severity || 5);

    return NextResponse.json({
      success: true,
      disclaimer:
        "This is not a medical diagnosis. The results are for informational purposes only. Always consult a healthcare professional for proper medical advice.",
      emergency,
      results: results.map((r) => ({
        id: r.disease.id,
        name: r.disease.name,
        description: r.disease.description,
        confidence: r.confidence,
        urgency: r.disease.urgency,
        matchedSymptoms: r.matchedSymptoms,
        totalDiseaseSymptoms: r.totalSymptoms,
        selfCare: r.disease.selfCare,
        medications: r.disease.medications,
        whenToSeeDoctor: r.disease.whenToSeeDoctor,
        specialistType: r.disease.specialistType,
      })),
      analyzedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Diagnosis error:", error);
    return NextResponse.json(
      { error: "Failed to process diagnosis" },
      { status: 500 }
    );
  }
}
