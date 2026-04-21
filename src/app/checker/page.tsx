"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSymptomCheckerStore } from "@/lib/store";
import ChatMessage, { TypingIndicator } from "@/components/chat/ChatMessage";
import ResultsDashboard from "@/components/results/ResultsDashboard";

export default function CheckerPage() {
  const {
    messages,
    isTyping,
    isComplete,
    diagnosisResults,
    emergencyAlert,
    initChat,
    submitAnswer,
    resetChat,
  } = useSymptomCheckerStore();

  const chatEndRef = useRef<HTMLDivElement>(null);
  const [showResults, setShowResults] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      initChat();
      setInitialized(true);
    }
  }, [initChat, initialized]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isComplete && diagnosisResults) {
      setTimeout(() => setShowResults(true), 500);
    }
  }, [isComplete, diagnosisResults]);

  const handleOptionSelect = (questionId: string, value: string | string[]) => {
    submitAnswer(questionId, value);
    if (questionId === "complete" && value === "show_results") {
      setShowResults(true);
    }
  };

  const handleScaleSelect = (questionId: string, value: number) => {
    submitAnswer(questionId, value);
  };

  const handleTextSubmit = (questionId: string, value: string) => {
    submitAnswer(questionId, value);
  };

  const handleReset = () => {
    setShowResults(false);
    setInitialized(false);
    resetChat();
  };

  if (showResults && diagnosisResults) {
    return (
      <ResultsDashboard
        results={diagnosisResults}
        emergencyAlert={emergencyAlert}
        onReset={handleReset}
      />
    );
  }

  // Count progress
  const { responses } = useSymptomCheckerStore.getState();
  const totalSteps = 11;
  const progress = Math.min(
    Math.round((Object.keys(responses).length / totalSteps) * 100),
    100
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
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
            onClick={handleReset}
            className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            Start over
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-100">
          <div
            className="h-full bg-blue-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Emergency Alert */}
      {emergencyAlert?.isEmergency && (
        <div className="mx-4 mt-3 p-3 rounded-xl bg-red-50 border border-red-100 animate-in">
          <div className="flex items-start gap-2">
            <span className="text-base">🚨</span>
            <div>
              <p className="text-sm font-medium text-red-700">Please seek help now</p>
              <p className="text-xs text-red-600/80 mt-0.5">{emergencyAlert.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto py-4">
        <div className="max-w-2xl mx-auto">
          {/* Disclaimer */}
          <div className="mx-4 mb-4 p-2.5 rounded-lg bg-amber-50 border border-amber-100">
            <p className="text-[11px] text-amber-600 text-center">
              ⚠️ This is not a medical diagnosis. Always see a real doctor.
            </p>
          </div>

          {/* Messages */}
          {messages.map((msg, i) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              isLatest={i === messages.length - 1 && !isTyping}
              onOptionSelect={handleOptionSelect}
              onScaleSelect={handleScaleSelect}
              onTextSubmit={handleTextSubmit}
            />
          ))}

          {isTyping && <TypingIndicator />}

          <div ref={chatEndRef} />
        </div>
      </div>
    </div>
  );
}
