"use client";

import { useState } from "react";
import type { QuestionNode } from "@/lib/medical-data";
import { type ChatMessage as ChatMessageType } from "@/lib/store";

interface ChatMessageProps {
  message: ChatMessageType;
  onOptionSelect?: (questionId: string, value: string | string[]) => void;
  onScaleSelect?: (questionId: string, value: number) => void;
  onTextSubmit?: (questionId: string, value: string) => void;
  isLatest?: boolean;
}

export default function ChatMessage({
  message,
  onOptionSelect,
  onScaleSelect,
  onTextSubmit,
  isLatest = false,
}: ChatMessageProps) {
  // User message
  if (message.type === "user") {
    return (
      <div className="flex justify-end mb-3 px-4 animate-in">
        <div className="bubble-user px-4 py-2.5 max-w-[80%]">
          <p className="text-sm">{message.content}</p>
        </div>
      </div>
    );
  }

  // System message
  if (message.type === "system") {
    return (
      <div className="flex justify-center mb-3 px-4 animate-in">
        <div className="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs text-center">
          {message.content}
        </div>
      </div>
    );
  }

  // Bot message
  return (
    <div className="flex justify-start mb-3 px-4 animate-in">
      <div className="flex gap-2.5 max-w-[90%]">
        {/* Avatar */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mt-0.5">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 4v16M4 12h16" strokeLinecap="round" />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <div className="bubble-bot px-4 py-3">
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>

          {/* Show interactive options for latest message only */}
          {isLatest && message.questionNode && (
            <QuestionOptions
              questionNode={message.questionNode}
              onOptionSelect={onOptionSelect}
              onScaleSelect={onScaleSelect}
              onTextSubmit={onTextSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// Question Options — Large, tappable buttons
// ============================================

function QuestionOptions({
  questionNode,
  onOptionSelect,
  onScaleSelect,
  onTextSubmit,
}: {
  questionNode: QuestionNode;
  onOptionSelect?: (questionId: string, value: string | string[]) => void;
  onScaleSelect?: (questionId: string, value: number) => void;
  onTextSubmit?: (questionId: string, value: string) => void;
}) {
  const [selectedMultiple, setSelectedMultiple] = useState<string[]>([]);
  const [scaleValue, setScaleValue] = useState(5);
  const [textValue, setTextValue] = useState("");

  // Single select — big buttons
  if (questionNode.type === "single" && questionNode.options) {
    return (
      <div className="mt-3 flex flex-wrap gap-2">
        {questionNode.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onOptionSelect?.(questionNode.id, opt.value)}
            className="px-4 py-3 rounded-xl bg-white border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-sm text-gray-700 transition-colors active:scale-[0.97] flex items-center gap-2"
          >
            {opt.icon && <span>{opt.icon}</span>}
            <span>{opt.label}</span>
          </button>
        ))}
      </div>
    );
  }

  // Multiple select — checkable buttons
  if (questionNode.type === "multiple" && questionNode.options) {
    return (
      <div className="mt-3">
        <div className="flex flex-wrap gap-2 mb-3">
          {questionNode.options.map((opt) => {
            const isSelected = selectedMultiple.includes(opt.value);
            return (
              <button
                key={opt.value}
                onClick={() => {
                  if (opt.value === "none") {
                    setSelectedMultiple(["none"]);
                  } else {
                    setSelectedMultiple((prev) => {
                      const filtered = prev.filter((v) => v !== "none");
                      return isSelected
                        ? filtered.filter((v) => v !== opt.value)
                        : [...filtered, opt.value];
                    });
                  }
                }}
                className={`px-4 py-3 rounded-xl border-2 text-sm transition-colors active:scale-[0.97] flex items-center gap-2 ${
                  isSelected
                    ? "bg-blue-50 border-blue-400 text-blue-700"
                    : "bg-white border-gray-200 text-gray-700 hover:border-blue-300"
                }`}
              >
                {opt.icon && <span>{opt.icon}</span>}
                <span>{opt.label}</span>
                {isSelected && <span className="text-blue-500 font-bold">✓</span>}
              </button>
            );
          })}
        </div>
        {selectedMultiple.length > 0 && (
          <button
            onClick={() => onOptionSelect?.(questionNode.id, selectedMultiple)}
            className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors active:scale-[0.98]"
          >
            Continue ({selectedMultiple.length} selected)
          </button>
        )}
      </div>
    );
  }

  // Scale 1-10
  if (questionNode.type === "scale") {
    return (
      <div className="mt-3 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-xs text-green-600 font-medium">Mild</span>
          <input
            type="range"
            min={1}
            max={10}
            value={scaleValue}
            onChange={(e) => setScaleValue(parseInt(e.target.value))}
            className="flex-1 h-2 rounded-full appearance-none bg-gray-200 cursor-pointer accent-blue-500"
          />
          <span className="text-xs text-red-500 font-medium">Severe</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-800">{scaleValue}/10</span>
          <button
            onClick={() => onScaleSelect?.(questionNode.id, scaleValue)}
            className="px-6 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors active:scale-[0.98]"
          >
            Confirm
          </button>
        </div>
      </div>
    );
  }

  // Yes / No
  if (questionNode.type === "yesno") {
    return (
      <div className="mt-3 flex gap-3">
        <button
          onClick={() => onOptionSelect?.(questionNode.id, "yes")}
          className="flex-1 py-3 rounded-xl bg-white border-2 border-green-200 hover:bg-green-50 hover:border-green-400 text-green-700 text-sm font-medium transition-colors active:scale-[0.97]"
        >
          Yes
        </button>
        <button
          onClick={() => onOptionSelect?.(questionNode.id, "no")}
          className="flex-1 py-3 rounded-xl bg-white border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-400 text-gray-700 text-sm font-medium transition-colors active:scale-[0.97]"
        >
          No
        </button>
      </div>
    );
  }

  // Free text
  if (questionNode.type === "text") {
    return (
      <div className="mt-3 flex gap-2">
        <input
          type="text"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          placeholder="Type here..."
          className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
          onKeyDown={(e) => {
            if (e.key === "Enter" && textValue.trim()) {
              onTextSubmit?.(questionNode.id, textValue);
            }
          }}
        />
        <button
          onClick={() => {
            if (textValue.trim()) onTextSubmit?.(questionNode.id, textValue);
          }}
          className="px-4 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition-colors active:scale-[0.97]"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    );
  }

  return null;
}

// ============================================
// Typing Indicator — Simple dots
// ============================================

export function TypingIndicator() {
  return (
    <div className="flex justify-start mb-3 px-4 animate-in">
      <div className="flex gap-2.5">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 4v16M4 12h16" strokeLinecap="round" />
          </svg>
        </div>
        <div className="bubble-bot px-4 py-3">
          <div className="typing-dots">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}
