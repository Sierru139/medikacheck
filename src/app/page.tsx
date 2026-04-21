"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-5 flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 4v16M4 12h16" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-gray-800">MediCheck</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-5">
        <div className="max-w-md w-full text-center py-16">
          {/* Icon */}
          <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-6">
            <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-blue-500" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 4v16M4 12h16" strokeLinecap="round" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            How are you feeling today?
          </h1>

          <p className="text-base text-gray-500 mb-10 leading-relaxed max-w-sm mx-auto">
            Tell us your symptoms and we&apos;ll help you understand what might be going on. Quick, private, and free.
          </p>

          <Link
            href="/checker"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium rounded-2xl transition-colors active:scale-[0.98]"
          >
            Start Symptom Check
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

          <p className="text-xs text-gray-400 mt-6">Takes about 2 minutes · No sign-up needed</p>
        </div>
      </main>

      {/* Features */}
      <section className="border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-2xl mx-auto px-5 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">💬</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Easy Chat</h3>
              <p className="text-xs text-gray-400">Answer simple questions one at a time</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🔒</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Private</h3>
              <p className="text-xs text-gray-400">Your data is never stored or shared</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">⚡</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Instant</h3>
              <p className="text-xs text-gray-400">Get results in under 2 minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-5 py-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-100">
            <span className="text-lg mt-0.5">⚠️</span>
            <div>
              <p className="text-sm font-medium text-amber-800 mb-1">Not a medical diagnosis</p>
              <p className="text-xs text-amber-700/70 leading-relaxed">
                This tool gives general health information only. Always talk to a real doctor for proper medical advice. If you have a medical emergency, call emergency services right away.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-4">
        <div className="max-w-2xl mx-auto px-5">
          <p className="text-xs text-gray-300 text-center">
            MediCheck © {new Date().getFullYear()} · For information only
          </p>
        </div>
      </footer>
    </div>
  );
}
