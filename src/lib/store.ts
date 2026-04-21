import { create } from 'zustand';
import { questionFlow, diagnoseSymptoms, checkEmergency, type DiagnosisResult, type QuestionNode } from '@/lib/medical-data';

export interface ChatMessage {
  id: string;
  type: 'bot' | 'user' | 'system';
  content: string;
  timestamp: Date;
  questionId?: string;
  questionNode?: QuestionNode;
  selectedOptions?: string[];
}

interface SymptomCheckerState {
  // Chat state
  messages: ChatMessage[];
  currentQuestionIndex: number;
  currentQuestionId: string;
  isTyping: boolean;
  isComplete: boolean;

  // User responses
  responses: Record<string, string | string[] | number>;
  selectedSymptoms: string[];
  severity: number;
  duration: string;

  // Results
  diagnosisResults: DiagnosisResult[] | null;
  emergencyAlert: { isEmergency: boolean; message: string } | null;

  // Actions
  initChat: () => void;
  addBotMessage: (content: string, questionNode?: QuestionNode) => void;
  addUserMessage: (content: string) => void;
  submitAnswer: (questionId: string, answer: string | string[] | number) => void;
  generateDiagnosis: () => void;
  resetChat: () => void;
}

let messageCounter = 0;

const generateId = () => {
  messageCounter++;
  return `msg-${messageCounter}-${Date.now()}`;
};

export const useSymptomCheckerStore = create<SymptomCheckerState>((set, get) => ({
  messages: [],
  currentQuestionIndex: 0,
  currentQuestionId: 'welcome',
  isTyping: false,
  isComplete: false,
  responses: {},
  selectedSymptoms: [],
  severity: 5,
  duration: '',
  diagnosisResults: null,
  emergencyAlert: null,

  initChat: () => {
    const firstQuestion = questionFlow[0];
    set({
      messages: [
        {
          id: generateId(),
          type: 'bot',
          content: firstQuestion.text,
          timestamp: new Date(),
          questionId: firstQuestion.id,
          questionNode: firstQuestion,
        },
      ],
      currentQuestionId: firstQuestion.id,
      currentQuestionIndex: 0,
    });
  },

  addBotMessage: (content: string, questionNode?: QuestionNode) => {
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: generateId(),
          type: 'bot',
          content,
          timestamp: new Date(),
          questionId: questionNode?.id,
          questionNode,
        },
      ],
    }));
  },

  addUserMessage: (content: string) => {
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: generateId(),
          type: 'user',
          content,
          timestamp: new Date(),
        },
      ],
    }));
  },

  submitAnswer: (questionId: string, answer: string | string[] | number) => {
    const state = get();
    const currentQuestion = questionFlow.find((q) => q.id === questionId);
    if (!currentQuestion) return;

    // Format user message
    let userMessageContent = '';
    if (Array.isArray(answer)) {
      const labels = answer.map((v) => {
        const opt = currentQuestion.options?.find((o) => o.value === v);
        return opt?.label || v;
      });
      userMessageContent = labels.join(', ');
    } else if (typeof answer === 'number') {
      userMessageContent = `${answer} out of 10`;
    } else {
      const opt = currentQuestion.options?.find((o) => o.value === answer);
      userMessageContent = opt?.label || answer;
    }

    // Add user message
    get().addUserMessage(userMessageContent);

    // Store response
    const newResponses = { ...state.responses, [questionId]: answer };
    let newSelectedSymptoms = [...state.selectedSymptoms];
    let newSeverity = state.severity;
    let newDuration = state.duration;

    // Track specific responses
    if (questionId === 'main_symptom' && Array.isArray(answer)) {
      newSelectedSymptoms = answer;

      // Check for emergency
      const emergency = checkEmergency(answer, state.severity);
      if (emergency.isEmergency) {
        set({ emergencyAlert: emergency });
      }
    }
    if (questionId === 'severity' && typeof answer === 'number') {
      newSeverity = answer;
    }
    if (questionId === 'duration' && typeof answer === 'string') {
      newDuration = answer;
    }

    set({
      responses: newResponses,
      selectedSymptoms: newSelectedSymptoms,
      severity: newSeverity,
      duration: newDuration,
    });

    // Determine next question
    let nextQuestionId: string | null = null;

    if (currentQuestion.conditionalNext && typeof answer === 'string') {
      nextQuestionId = currentQuestion.conditionalNext[answer] || null;
    } else {
      nextQuestionId = currentQuestion.nextQuestionId || null;
    }

    if (!nextQuestionId) {
      // End of questionnaire
      set({ isComplete: true });
      get().generateDiagnosis();
      return;
    }

    const nextQuestion = questionFlow.find((q) => q.id === nextQuestionId);
    if (!nextQuestion) {
      set({ isComplete: true });
      get().generateDiagnosis();
      return;
    }

    // Show typing indicator then next question
    set({ isTyping: true });
    setTimeout(() => {
      set({ isTyping: false, currentQuestionId: nextQuestionId! });
      get().addBotMessage(nextQuestion.text, nextQuestion);
    }, 800 + Math.random() * 600);
  },

  generateDiagnosis: () => {
    const state = get();
    const results = diagnoseSymptoms(
      state.selectedSymptoms,
      state.severity,
      state.duration,
      state.responses as Record<string, string>
    );

    // Re-check emergency with all data
    const emergency = checkEmergency(state.selectedSymptoms, state.severity);

    set({
      diagnosisResults: results,
      emergencyAlert: emergency,
    });
  },

  resetChat: () => {
    messageCounter = 0;
    set({
      messages: [],
      currentQuestionIndex: 0,
      currentQuestionId: 'welcome',
      isTyping: false,
      isComplete: false,
      responses: {},
      selectedSymptoms: [],
      severity: 5,
      duration: '',
      diagnosisResults: null,
      emergencyAlert: null,
    });
    // Re-init after reset
    setTimeout(() => get().initChat(), 100);
  },
}));
