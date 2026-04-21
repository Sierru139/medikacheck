"use client";

import { useState } from "react";
import Link from "next/link";
import type { DiagnosisResult } from "@/lib/medical-data";

interface ResultsDashboardProps {
  results: DiagnosisResult[];
  emergencyAlert: { isEmergency: boolean; message: string } | null;
  onReset: () => void;
}

export default function ResultsDashboard({
  results,
  emergencyAlert,
  onReset,
}: ResultsDashboardProps) {
  const [activeTab, setActiveTab] = useState<"results" | "map">("results");
  const topResult = results[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-white" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 4v16M4 12h16" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-700">MediCheck</span>
          </Link>
          <button
            onClick={onReset}
            className="text-sm text-blue-500 hover:text-blue-600 font-medium transition-colors"
          >
            Check Again
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Emergency */}
        {emergencyAlert?.isEmergency && (
          <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 animate-in">
            <div className="flex items-start gap-3">
              <span className="text-xl">🚨</span>
              <div>
                <p className="text-sm font-semibold text-red-700">Please seek help right away</p>
                <p className="text-xs text-red-600 mt-1">{emergencyAlert.message}</p>
                <a
                  href="tel:911"
                  className="inline-flex items-center gap-1.5 mt-2 px-4 py-2 rounded-lg bg-red-500 text-white text-xs font-medium hover:bg-red-600 transition-colors"
                >
                  📞 Call Emergency
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Page title */}
        <div className="mb-5 animate-in">
          <h1 className="text-xl font-bold text-gray-900">Your Results</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Based on the symptoms you described
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mb-5 p-3 rounded-xl bg-amber-50 border border-amber-100 animate-in">
          <p className="text-xs text-amber-600">
            ⚠️ These results are for information only — they are{" "}
            <strong>not</strong> a medical diagnosis. Please see a doctor for proper advice.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-5 p-1 rounded-xl bg-gray-100 animate-in">
          <button
            onClick={() => setActiveTab("results")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "results"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            📋 Results
          </button>
          <button
            onClick={() => setActiveTab("map")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "map"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            📍 Find Care
          </button>
        </div>

        {/* Results Tab */}
        {activeTab === "results" && (
          <div className="space-y-4">
            {/* No results */}
            {!topResult && (
              <div className="text-center py-12 animate-in">
                <p className="text-3xl mb-3">🤔</p>
                <p className="text-sm text-gray-500">
                  We couldn&apos;t find a strong match. Please see a doctor for a checkup.
                </p>
              </div>
            )}

            {/* Condition cards */}
            {results.map((result, i) => (
              <ConditionCard key={result.disease.id} result={result} rank={i + 1} />
            ))}

            {/* General advice */}
            {topResult && (
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 animate-in">
                <div className="flex items-start gap-2.5">
                  <span className="text-lg">👨‍⚕️</span>
                  <div>
                    <p className="text-sm font-medium text-blue-800 mb-1">When to see a doctor</p>
                    <p className="text-xs text-blue-700/70 leading-relaxed">
                      {topResult.disease.whenToSeeDoctor}
                    </p>
                    <p className="text-xs text-blue-600 mt-2">
                      Specialist: <strong>{topResult.disease.specialistType}</strong>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Map Tab */}
        {activeTab === "map" && <MapSection topResult={topResult} />}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 py-4 mt-8">
        <p className="text-[11px] text-gray-300 text-center">
          MediCheck © {new Date().getFullYear()} · Not a medical device
        </p>
      </div>
    </div>
  );
}

// ============================================
// Condition Card — Simple and clear
// ============================================

function ConditionCard({
  result,
  rank,
}: {
  result: DiagnosisResult;
  rank: number;
}) {
  const [expanded, setExpanded] = useState(rank === 1);

  const urgencyConfig: Record<string, { label: string; color: string; bg: string; recommendation: string }> = {
    low: {
      label: "Low",
      color: "text-green-700",
      bg: "bg-green-50 border-green-200",
      recommendation: "🏠 You can likely manage this at home with rest and self-care.",
    },
    medium: {
      label: "Medium",
      color: "text-amber-700",
      bg: "bg-amber-50 border-amber-200",
      recommendation: "📅 Consider seeing a doctor if symptoms don't improve in a few days.",
    },
    high: {
      label: "High",
      color: "text-red-600",
      bg: "bg-red-50 border-red-200",
      recommendation: "🏥 Please see a doctor soon. Don't delay.",
    },
    emergency: {
      label: "Urgent",
      color: "text-red-700",
      bg: "bg-red-50 border-red-200",
      recommendation: "🚨 Seek immediate medical attention. Call emergency services if needed.",
    },
  };

  const urg = urgencyConfig[result.disease.urgency] || urgencyConfig.low;

  // Confidence label
  let confLabel = "Low";
  let confColor = "bg-gray-300";
  if (result.confidence >= 60) {
    confLabel = "High";
    confColor = "bg-green-400";
  } else if (result.confidence >= 35) {
    confLabel = "Medium";
    confColor = "bg-amber-400";
  }

  return (
    <div className={`rounded-xl bg-white border border-gray-200 overflow-hidden animate-in`}>
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500">
            {rank}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-800 truncate">
              {result.disease.name}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-xs font-medium ${urg.color}`}>
                {urg.label} urgency
              </span>
              <span className="text-gray-300">·</span>
              <span className="text-xs text-gray-400">
                {confLabel} match
              </span>
            </div>
          </div>
        </div>
        <svg
          className={`w-4 h-4 text-gray-400 transition-transform ${expanded ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded details */}
      {expanded && (
        <div className="px-4 pb-4 pt-0 space-y-3 animate-in">
          {/* Confidence bar */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-400">Match confidence</span>
              <span className="font-medium text-gray-600">{result.confidence}%</span>
            </div>
            <div className="conf-bar">
              <div className={`conf-fill ${confColor}`} style={{ width: `${result.confidence}%` }} />
            </div>
          </div>

          {/* Description */}
          <p className="text-xs text-gray-500 leading-relaxed">
            {result.disease.description}
          </p>

          {/* Recommendation */}
          <div className={`p-3 rounded-lg border ${urg.bg}`}>
            <p className={`text-xs font-medium ${urg.color}`}>
              {urg.recommendation}
            </p>
          </div>

          {/* Matched symptoms */}
          <div>
            <p className="text-xs text-gray-400 mb-1.5">Matching symptoms:</p>
            <div className="flex flex-wrap gap-1.5">
              {result.matchedSymptoms.map((s) => (
                <span key={s} className="px-2 py-1 rounded-md bg-blue-50 text-xs text-blue-600">
                  {s.replace(/_/g, " ")}
                </span>
              ))}
            </div>
          </div>

          {/* Self-care */}
          <div>
            <p className="text-xs text-gray-400 mb-1.5">Self-care tips:</p>
            <ul className="space-y-1">
              {result.disease.selfCare.slice(0, 4).map((tip, i) => (
                <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Medications */}
          <div>
            <p className="text-xs text-gray-400 mb-1.5">Common medications:</p>
            <ul className="space-y-1">
              {result.disease.medications.slice(0, 3).map((med, i) => (
                <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                  <span>💊</span>
                  <span>{med}</span>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-gray-400 mt-1.5 italic">
              Always check with a doctor or pharmacist before taking any medication.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// Map Section — Find nearby care
// ============================================

function MapSection({ topResult }: { topResult: DiagnosisResult | undefined }) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLocate = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Your browser doesn't support location. Try searching manually.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLoading(false);
      },
      () => {
        setError("Could not get your location. Please enable location access.");
        setLoading(false);
      }
    );
  };

  const facilities = [
    { type: "hospital", label: "Hospitals", icon: "🏥", desc: "Emergency rooms and general hospitals" },
    { type: "clinic", label: "Clinics", icon: "🏨", desc: "Walk-in clinics and medical offices" },
    { type: "pharmacy", label: "Pharmacies", icon: "💊", desc: "Drug stores and pharmacies" },
  ];

  return (
    <div className="space-y-4 animate-in">
      {/* Specialist suggestion */}
      {topResult && (
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
          <div className="flex items-center gap-2">
            <span className="text-lg">👨‍⚕️</span>
            <div>
              <p className="text-xs text-blue-500">Recommended specialist</p>
              <p className="text-sm font-medium text-blue-800">{topResult.disease.specialistType}</p>
            </div>
          </div>
        </div>
      )}

      {/* Location button */}
      {!location ? (
        <div className="p-6 rounded-xl bg-white border border-gray-200 text-center">
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">📍</span>
          </div>
          <h3 className="text-sm font-semibold text-gray-800 mb-1">Find care near you</h3>
          <p className="text-xs text-gray-400 mb-4">
            We&apos;ll use your location to find nearby hospitals, clinics, and pharmacies.
          </p>
          <button
            onClick={handleLocate}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors disabled:opacity-50 active:scale-[0.98]"
          >
            {loading ? "Finding your location..." : "📍 Share My Location"}
          </button>
          {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-gray-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
            Location found
          </p>

          {facilities.map((f) => {
            const url = `https://www.google.com/maps/search/${f.type}+near+me/@${location.lat},${location.lng},14z`;
            return (
              <a
                key={f.type}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-colors"
              >
                <span className="text-2xl">{f.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{f.label}</p>
                  <p className="text-xs text-gray-400">{f.desc}</p>
                </div>
                <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            );
          })}

          <button
            onClick={() => setLocation(null)}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            ↻ Reset location
          </button>
        </div>
      )}
    </div>
  );
}
