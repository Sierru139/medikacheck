// MediCheck AI - Medical Knowledge Base
// This is a simplified medical dataset for MVP purposes
// In production, this would connect to a proper medical database

export interface Symptom {
  id: string;
  name: string;
  category: string;
  description: string;
  bodyPart: string;
  followUpQuestions: string[];
}

export interface Disease {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  urgency: "low" | "medium" | "high" | "emergency";
  selfCare: string[];
  medications: string[];
  whenToSeeDoctor: string;
  specialistType: string;
}

export interface QuestionNode {
  id: string;
  text: string;
  type: "single" | "multiple" | "scale" | "text" | "yesno" | "bodypart";
  options?: { label: string; value: string; icon?: string }[];
  nextQuestionId?: string | null;
  conditionalNext?: { [value: string]: string };
  category: string;
}

// ============================================
// Symptom Database
// ============================================

export const symptoms: Symptom[] = [
  {
    id: "headache",
    name: "Headache",
    category: "neurological",
    description: "Pain in the head or upper neck",
    bodyPart: "head",
    followUpQuestions: [
      "headache_severity",
      "headache_location",
      "headache_duration",
    ],
  },
  {
    id: "fever",
    name: "Fever",
    category: "general",
    description: "Elevated body temperature above 38°C (100.4°F)",
    bodyPart: "whole_body",
    followUpQuestions: ["fever_degree", "fever_duration"],
  },
  {
    id: "cough",
    name: "Cough",
    category: "respiratory",
    description: "Persistent cough, dry or productive",
    bodyPart: "chest",
    followUpQuestions: ["cough_type", "cough_duration"],
  },
  {
    id: "sore_throat",
    name: "Sore Throat",
    category: "respiratory",
    description: "Pain or irritation in the throat",
    bodyPart: "throat",
    followUpQuestions: ["throat_severity", "throat_swallowing"],
  },
  {
    id: "fatigue",
    name: "Fatigue",
    category: "general",
    description: "Persistent tiredness and lack of energy",
    bodyPart: "whole_body",
    followUpQuestions: ["fatigue_duration", "fatigue_sleep"],
  },
  {
    id: "nausea",
    name: "Nausea",
    category: "gastrointestinal",
    description: "Feeling of sickness with an urge to vomit",
    bodyPart: "stomach",
    followUpQuestions: ["nausea_vomiting", "nausea_trigger"],
  },
  {
    id: "chest_pain",
    name: "Chest Pain",
    category: "cardiovascular",
    description: "Pain or discomfort in the chest area",
    bodyPart: "chest",
    followUpQuestions: ["chest_pain_type", "chest_pain_severity"],
  },
  {
    id: "shortness_of_breath",
    name: "Shortness of Breath",
    category: "respiratory",
    description: "Difficulty breathing or feeling breathless",
    bodyPart: "chest",
    followUpQuestions: ["breath_onset", "breath_exercise"],
  },
  {
    id: "runny_nose",
    name: "Runny or Stuffy Nose",
    category: "respiratory",
    description: "Nasal congestion or discharge",
    bodyPart: "nose",
    followUpQuestions: ["nose_discharge_color"],
  },
  {
    id: "body_aches",
    name: "Body Aches",
    category: "musculoskeletal",
    description: "General muscle or body pain",
    bodyPart: "whole_body",
    followUpQuestions: ["aches_location", "aches_severity"],
  },
  {
    id: "dizziness",
    name: "Dizziness",
    category: "neurological",
    description: "Feeling lightheaded or unsteady",
    bodyPart: "head",
    followUpQuestions: ["dizziness_type", "dizziness_trigger"],
  },
  {
    id: "stomach_pain",
    name: "Stomach Pain",
    category: "gastrointestinal",
    description: "Pain or cramping in the abdominal area",
    bodyPart: "stomach",
    followUpQuestions: ["stomach_location", "stomach_severity"],
  },
  {
    id: "diarrhea",
    name: "Diarrhea",
    category: "gastrointestinal",
    description: "Loose, watery bowel movements",
    bodyPart: "stomach",
    followUpQuestions: ["diarrhea_frequency", "diarrhea_blood"],
  },
  {
    id: "skin_rash",
    name: "Skin Rash",
    category: "dermatological",
    description: "Abnormal change in skin color or texture",
    bodyPart: "skin",
    followUpQuestions: ["rash_location", "rash_itching"],
  },
  {
    id: "joint_pain",
    name: "Joint Pain",
    category: "musculoskeletal",
    description: "Pain or stiffness in joints",
    bodyPart: "joints",
    followUpQuestions: ["joint_location", "joint_swelling"],
  },
  {
    id: "back_pain",
    name: "Back Pain",
    category: "musculoskeletal",
    description: "Pain in the upper or lower back",
    bodyPart: "back",
    followUpQuestions: ["back_location", "back_radiation"],
  },
  {
    id: "eye_pain",
    name: "Eye Pain or Irritation",
    category: "ophthalmological",
    description: "Pain, redness, or irritation in the eye(s)",
    bodyPart: "eyes",
    followUpQuestions: ["eye_redness", "eye_vision"],
  },
  {
    id: "ear_pain",
    name: "Ear Pain",
    category: "otological",
    description: "Pain in or around the ear",
    bodyPart: "ears",
    followUpQuestions: ["ear_discharge", "ear_hearing"],
  },
  {
    id: "anxiety",
    name: "Anxiety / Nervousness",
    category: "psychological",
    description: "Feeling of worry, nervousness, or unease",
    bodyPart: "mind",
    followUpQuestions: ["anxiety_sleep", "anxiety_duration"],
  },
  {
    id: "insomnia",
    name: "Difficulty Sleeping",
    category: "psychological",
    description: "Trouble falling or staying asleep",
    bodyPart: "mind",
    followUpQuestions: ["insomnia_duration", "insomnia_pattern"],
  },
];

// ============================================
// Disease Database
// ============================================

export const diseases: Disease[] = [
  {
    id: "common_cold",
    name: "Common Cold",
    description:
      "A viral infection of the upper respiratory tract causing mild symptoms.",
    symptoms: [
      "cough",
      "runny_nose",
      "sore_throat",
      "headache",
      "fatigue",
      "body_aches",
    ],
    urgency: "low",
    selfCare: [
      "Get plenty of rest",
      "Stay hydrated with water and warm fluids",
      "Use saline nasal drops for congestion",
      "Gargle with warm salt water for sore throat",
      "Use a humidifier in your room",
    ],
    medications: [
      "Acetaminophen (Tylenol) for fever/pain",
      "Ibuprofen for inflammation",
      "Pseudoephedrine nasal decongestant",
      "Dextromethorphan cough suppressant",
    ],
    whenToSeeDoctor:
      "See a doctor if symptoms persist for more than 10 days, if fever is above 39°C (103°F), or if symptoms worsen after initial improvement.",
    specialistType: "General Practitioner",
  },
  {
    id: "influenza",
    name: "Influenza (Flu)",
    description:
      "A contagious respiratory illness caused by influenza viruses, typically more severe than a cold.",
    symptoms: [
      "fever",
      "cough",
      "body_aches",
      "headache",
      "fatigue",
      "sore_throat",
      "runny_nose",
    ],
    urgency: "medium",
    selfCare: [
      "Stay home and get plenty of rest",
      "Drink clear fluids to prevent dehydration",
      "Apply warm compresses for body aches",
      "Take warm baths to reduce fever",
    ],
    medications: [
      "Acetaminophen or Ibuprofen for fever and pain",
      "Antiviral medications may be prescribed by doctor",
      "Cough suppressant as needed",
    ],
    whenToSeeDoctor:
      "See a doctor immediately if you have difficulty breathing, persistent chest pain, confusion, severe vomiting, or if you are in a high-risk group (elderly, pregnant, immunocompromised).",
    specialistType: "General Practitioner / Internal Medicine",
  },
  {
    id: "tension_headache",
    name: "Tension Headache",
    description:
      "The most common type of headache, often described as a band-like pressure around the head.",
    symptoms: ["headache", "fatigue", "anxiety", "insomnia"],
    urgency: "low",
    selfCare: [
      "Apply a warm or cold compress to the forehead",
      "Practice relaxation techniques",
      "Maintain good posture",
      "Take regular breaks from screen time",
      "Stay hydrated",
    ],
    medications: ["Acetaminophen (Tylenol)", "Ibuprofen (Advil)", "Aspirin"],
    whenToSeeDoctor:
      "See a doctor if headaches are severe, occur more than 15 days a month, require frequent pain medication, or are accompanied by vision changes, confusion, or stiff neck.",
    specialistType: "General Practitioner / Neurologist",
  },
  {
    id: "migraine",
    name: "Migraine",
    description:
      "A neurological condition that causes intense, debilitating headaches often with nausea and sensitivity to light.",
    symptoms: ["headache", "nausea", "dizziness", "fatigue", "eye_pain"],
    urgency: "medium",
    selfCare: [
      "Rest in a quiet, dark room",
      "Apply cold compresses to your forehead",
      "Stay hydrated",
      "Try relaxation techniques like deep breathing",
      "Keep a headache diary to identify triggers",
    ],
    medications: [
      "Acetaminophen or Ibuprofen (mild migraines)",
      "Triptans may be prescribed by a doctor",
      "Anti-nausea medications",
    ],
    whenToSeeDoctor:
      "See a doctor if migraines significantly affect your daily life, occur frequently, or if you experience the worst headache of your life, sudden severe headache, or headache with fever and stiff neck.",
    specialistType: "Neurologist",
  },
  {
    id: "gastroenteritis",
    name: "Gastroenteritis (Stomach Flu)",
    description:
      "An intestinal infection causing nausea, vomiting, diarrhea, and abdominal cramps.",
    symptoms: [
      "nausea",
      "diarrhea",
      "stomach_pain",
      "fever",
      "body_aches",
      "fatigue",
    ],
    urgency: "medium",
    selfCare: [
      "Drink plenty of fluids to prevent dehydration",
      "Use oral rehydration solutions (ORS)",
      "Eat bland foods (BRAT diet: bananas, rice, applesauce, toast)",
      "Avoid dairy, caffeine, and fatty foods",
      "Rest as much as possible",
    ],
    medications: [
      "Oral rehydration salts (ORS)",
      "Loperamide (Imodium) for diarrhea in adults",
      "Bismuth subsalicylate (Pepto-Bismol)",
      "Acetaminophen for fever",
    ],
    whenToSeeDoctor:
      "See a doctor if you have bloody diarrhea, cannot keep fluids down for 24 hours, have high fever (above 40°C/104°F), or show signs of dehydration.",
    specialistType: "General Practitioner / Gastroenterologist",
  },
  {
    id: "allergic_rhinitis",
    name: "Allergic Rhinitis (Hay Fever)",
    description:
      "An allergic response causing cold-like symptoms such as sneezing, congestion, and runny nose.",
    symptoms: ["runny_nose", "headache", "eye_pain", "fatigue", "sore_throat"],
    urgency: "low",
    selfCare: [
      "Avoid known allergens when possible",
      "Keep windows closed during high pollen counts",
      "Use HEPA air purifiers",
      "Rinse nasal passages with saline solution",
      "Shower and change clothes after being outdoors",
    ],
    medications: [
      "Cetirizine (Zyrtec) antihistamine",
      "Loratadine (Claritin) antihistamine",
      "Fluticasone nasal spray",
      "Eye drops for itchy eyes",
    ],
    whenToSeeDoctor:
      "See a doctor if over-the-counter medications are not effective, symptoms significantly impact quality of life, or if you develop sinus infections frequently.",
    specialistType: "Allergist / Immunologist",
  },
  {
    id: "acute_bronchitis",
    name: "Acute Bronchitis",
    description:
      "Inflammation of the bronchial tubes, usually following a cold or respiratory infection.",
    symptoms: [
      "cough",
      "chest_pain",
      "fatigue",
      "shortness_of_breath",
      "sore_throat",
      "body_aches",
    ],
    urgency: "medium",
    selfCare: [
      "Get plenty of rest",
      "Drink lots of fluids",
      "Use a humidifier",
      "Avoid smoking and secondhand smoke",
      "Consider honey for cough relief",
    ],
    medications: [
      "Ibuprofen for pain and inflammation",
      "Cough suppressant (if dry cough is keeping you awake)",
      "Expectorant (if productive cough)",
    ],
    whenToSeeDoctor:
      "See a doctor if cough lasts more than 3 weeks, produces blood, is accompanied by high fever, or if you have shortness of breath at rest.",
    specialistType: "General Practitioner / Pulmonologist",
  },
  {
    id: "anxiety_disorder",
    name: "Generalized Anxiety Disorder",
    description:
      "Persistent and excessive worry about various aspects of daily life that is difficult to control.",
    symptoms: [
      "anxiety",
      "insomnia",
      "fatigue",
      "headache",
      "nausea",
      "dizziness",
      "body_aches",
    ],
    urgency: "medium",
    selfCare: [
      "Practice deep breathing exercises",
      "Engage in regular physical activity",
      "Limit caffeine and alcohol intake",
      "Practice mindfulness meditation",
      "Maintain a consistent sleep schedule",
      "Talk to someone you trust about your feelings",
    ],
    medications: [
      "Consult a healthcare provider for prescription options",
      "Some herbal supplements like chamomile may help (consult doctor first)",
    ],
    whenToSeeDoctor:
      "See a doctor if anxiety significantly interferes with daily activities, relationships, or work. Seek immediate help if you have thoughts of self-harm.",
    specialistType: "Psychiatrist / Psychologist",
  },
  {
    id: "urinary_tract_infection",
    name: "Urinary Tract Infection (UTI)",
    description:
      "A bacterial infection in any part of the urinary system, commonly the bladder.",
    symptoms: ["stomach_pain", "fever", "back_pain", "nausea", "fatigue"],
    urgency: "medium",
    selfCare: [
      "Drink plenty of water to flush bacteria",
      "Avoid coffee, alcohol, and citrus juices",
      "Use a heating pad on your abdomen",
      "Urinate frequently - don't hold it in",
    ],
    medications: [
      "Requires prescription antibiotics from a doctor",
      "Phenazopyridine (Azo) for symptom relief while waiting for antibiotics",
      "Acetaminophen for pain",
    ],
    whenToSeeDoctor:
      "See a doctor as soon as possible - UTIs require antibiotics. Seek emergency care for high fever, severe back/side pain, nausea/vomiting, or blood in urine.",
    specialistType: "General Practitioner / Urologist",
  },
  {
    id: "hypertension_signs",
    name: "Signs of High Blood Pressure",
    description:
      'Elevated blood pressure that may present with headaches and other symptoms. Often called the "silent killer" as it may have no symptoms.',
    symptoms: [
      "headache",
      "dizziness",
      "shortness_of_breath",
      "chest_pain",
      "eye_pain",
    ],
    urgency: "high",
    selfCare: [
      "Reduce sodium intake",
      "Exercise regularly (at least 150 min/week)",
      "Maintain a healthy weight",
      "Limit alcohol consumption",
      "Manage stress through relaxation techniques",
      "Monitor blood pressure regularly",
    ],
    medications: [
      "Requires prescription from a doctor",
      "Do not self-medicate for blood pressure",
    ],
    whenToSeeDoctor:
      "See a doctor soon for blood pressure evaluation. Seek emergency care if blood pressure is extremely high (above 180/120), especially with chest pain, vision changes, difficulty breathing, or severe headache.",
    specialistType: "Cardiologist / Internal Medicine",
  },
  {
    id: "dermatitis",
    name: "Contact Dermatitis",
    description:
      "A skin rash caused by contact with a specific substance that irritates the skin or triggers an allergic reaction.",
    symptoms: ["skin_rash", "fatigue"],
    urgency: "low",
    selfCare: [
      "Identify and avoid the irritant/allergen",
      "Apply cool, wet compresses to affected areas",
      "Avoid scratching the rash",
      "Wear loose-fitting cotton clothing",
      "Use gentle, fragrance-free soaps and moisturizers",
    ],
    medications: [
      "Hydrocortisone cream (1%)",
      "Calamine lotion",
      "Antihistamines like diphenhydramine for itching",
      "Moisturizing creams",
    ],
    whenToSeeDoctor:
      "See a doctor if the rash is severe, covers a large area, is on your face or genitals, doesn't improve with home treatment, or shows signs of infection (warmth, pus, increasing pain).",
    specialistType: "Dermatologist",
  },
  {
    id: "ear_infection",
    name: "Ear Infection (Otitis Media)",
    description:
      "An infection of the middle ear, common in children but can also affect adults.",
    symptoms: ["ear_pain", "fever", "headache", "dizziness", "fatigue"],
    urgency: "medium",
    selfCare: [
      "Apply a warm compress to the affected ear",
      "Rest in an upright position to reduce pressure",
      "Stay hydrated",
    ],
    medications: [
      "Acetaminophen or Ibuprofen for pain relief",
      "May require prescription antibiotics from a doctor",
      "Ear drops may be prescribed",
    ],
    whenToSeeDoctor:
      "See a doctor if symptoms last more than 2-3 days, if there is fluid draining from the ear, if hearing loss occurs, or if fever is above 39°C (102.2°F).",
    specialistType: "General Practitioner / ENT Specialist",
  },
];

// ============================================
// Adaptive Question Flow
// ============================================

export const questionFlow: QuestionNode[] = [
  {
    id: "welcome",
    text: "Hi there! 👋 I'm here to help you understand your symptoms. Let's start with a quick question — how old are you?",
    type: "single",
    options: [
      { label: "18-25", value: "18-25", icon: "👤" },
      { label: "26-35", value: "26-35", icon: "👤" },
      { label: "36-45", value: "36-45", icon: "👤" },
      { label: "46-55", value: "46-55", icon: "👤" },
      { label: "56-65", value: "56-65", icon: "👤" },
      { label: "65+", value: "65+", icon: "👤" },
    ],
    nextQuestionId: "gender",
    category: "demographics",
  },
  {
    id: "gender",
    text: "Are you male or female? This helps me give better suggestions.",
    type: "single",
    options: [
      { label: "Male", value: "male", icon: "♂️" },
      { label: "Female", value: "female", icon: "♀️" },
      { label: "Prefer not to say", value: "other", icon: "🔒" },
    ],
    nextQuestionId: "main_symptom",
    category: "demographics",
  },
  {
    id: "main_symptom",
    text: "What's bothering you? Pick everything that applies.",
    type: "multiple",
    options: [
      { label: "Headache", value: "headache", icon: "🤕" },
      { label: "Fever", value: "fever", icon: "🌡️" },
      { label: "Cough", value: "cough", icon: "😷" },
      { label: "Sore Throat", value: "sore_throat", icon: "😣" },
      { label: "Fatigue", value: "fatigue", icon: "😴" },
      { label: "Nausea", value: "nausea", icon: "🤢" },
      { label: "Chest Pain", value: "chest_pain", icon: "💔" },
      {
        label: "Shortness of Breath",
        value: "shortness_of_breath",
        icon: "😮‍💨",
      },
      { label: "Runny/Stuffy Nose", value: "runny_nose", icon: "🤧" },
      { label: "Body Aches", value: "body_aches", icon: "💪" },
      { label: "Dizziness", value: "dizziness", icon: "😵‍💫" },
      { label: "Stomach Pain", value: "stomach_pain", icon: "🤮" },
      { label: "Diarrhea", value: "diarrhea", icon: "🚽" },
      { label: "Skin Rash", value: "skin_rash", icon: "🔴" },
      { label: "Joint Pain", value: "joint_pain", icon: "🦴" },
      { label: "Back Pain", value: "back_pain", icon: "🔙" },
      { label: "Eye Pain", value: "eye_pain", icon: "👁️" },
      { label: "Ear Pain", value: "ear_pain", icon: "👂" },
      { label: "Anxiety", value: "anxiety", icon: "😰" },
      { label: "Difficulty Sleeping", value: "insomnia", icon: "🌙" },
    ],
    nextQuestionId: "severity",
    category: "symptoms",
  },
  {
    id: "severity",
    text: "How bad does it feel right now? (1 = barely noticeable, 10 = really bad)",
    type: "scale",
    nextQuestionId: "duration",
    category: "assessment",
  },
  {
    id: "duration",
    text: "How long have you been feeling this way?",
    type: "single",
    options: [
      { label: "Just started today", value: "today", icon: "📅" },
      { label: "2-3 days", value: "2-3_days", icon: "📅" },
      { label: "4-7 days (about a week)", value: "1_week", icon: "📅" },
      { label: "1-2 weeks", value: "2_weeks", icon: "📅" },
      { label: "More than 2 weeks", value: "more_2_weeks", icon: "📅" },
      { label: "More than a month", value: "month_plus", icon: "📅" },
    ],
    nextQuestionId: "additional_symptoms",
    category: "assessment",
  },
  {
    id: "additional_symptoms",
    text: "Do you also have any of these?",
    type: "multiple",
    options: [
      { label: "Loss of appetite", value: "loss_appetite", icon: "🍽️" },
      { label: "Weight changes", value: "weight_changes", icon: "⚖️" },
      { label: "Night sweats", value: "night_sweats", icon: "💦" },
      { label: "Chills", value: "chills", icon: "🥶" },
      { label: "Swollen lymph nodes", value: "swollen_lymph", icon: "😤" },
      { label: "Difficulty concentrating", value: "concentration", icon: "🧠" },
      { label: "None of these", value: "none", icon: "✅" },
    ],
    nextQuestionId: "medical_history",
    category: "symptoms",
  },
  {
    id: "medical_history",
    text: "Do you have any ongoing health conditions?",
    type: "multiple",
    options: [
      { label: "Diabetes", value: "diabetes", icon: "💉" },
      { label: "High Blood Pressure", value: "hypertension", icon: "❤️" },
      { label: "Asthma", value: "asthma", icon: "🫁" },
      { label: "Heart Disease", value: "heart_disease", icon: "❤️‍🩹" },
      { label: "Allergies", value: "allergies", icon: "🤧" },
      { label: "None", value: "none", icon: "✅" },
    ],
    nextQuestionId: "medications_current",
    category: "history",
  },
  {
    id: "medications_current",
    text: "Are you taking any medicines right now?",
    type: "yesno",
    conditionalNext: {
      yes: "medications_detail",
      no: "lifestyle",
    },
    category: "history",
  },
  {
    id: "medications_detail",
    text: "What medicines are you taking? (just a short answer is fine)",
    type: "text",
    nextQuestionId: "lifestyle",
    category: "history",
  },
  {
    id: "lifestyle",
    text: "Almost done! Do you smoke?",
    type: "yesno",
    nextQuestionId: "exercise",
    category: "lifestyle",
  },
  {
    id: "exercise",
    text: "How often do you exercise or stay active?",
    type: "single",
    options: [
      { label: "Daily", value: "daily", icon: "🏃" },
      { label: "3-5 times a week", value: "regular", icon: "🚴" },
      { label: "1-2 times a week", value: "occasional", icon: "🚶" },
      { label: "Rarely or never", value: "rarely", icon: "🛋️" },
    ],
    nextQuestionId: "complete",
    category: "lifestyle",
  },
  {
    id: "complete",
    text: "All done! ✅ I've looked at your answers and prepared some results. Remember — this is not a real doctor's diagnosis.",
    type: "single",
    options: [{ label: "Show my results", value: "show_results", icon: "📊" }],
    nextQuestionId: null,
    category: "complete",
  },
];

// ============================================
// Diagnosis Engine
// ============================================

export interface DiagnosisResult {
  disease: Disease;
  confidence: number;
  matchedSymptoms: string[];
  totalSymptoms: number;
}

export function diagnoseSymptoms(
  selectedSymptoms: string[],
  severity: number,
  duration: string,
  additionalInfo: Record<string, string>,
): DiagnosisResult[] {
  const results: DiagnosisResult[] = [];

  for (const disease of diseases) {
    const matchedSymptoms = disease.symptoms.filter((s) =>
      selectedSymptoms.includes(s),
    );

    if (matchedSymptoms.length === 0) continue;

    // Calculate base confidence from symptom match
    let confidence = (matchedSymptoms.length / disease.symptoms.length) * 100;

    // Adjust confidence based on severity
    if (severity >= 7 && disease.urgency !== "low") {
      confidence += 5;
    } else if (severity <= 3 && disease.urgency === "low") {
      confidence += 5;
    }

    // Adjust based on duration
    if (duration === "today" || duration === "2-3_days") {
      if (
        ["common_cold", "influenza", "gastroenteritis"].includes(disease.id)
      ) {
        confidence += 5;
      }
    } else if (duration === "more_2_weeks" || duration === "month_plus") {
      if (
        ["tension_headache", "anxiety_disorder", "allergic_rhinitis"].includes(
          disease.id,
        )
      ) {
        confidence += 8;
      }
    }

    // Cap confidence at 95% to always leave room for uncertainty
    confidence = Math.min(confidence, 95);

    // Round to nearest integer
    confidence = Math.round(confidence);

    if (confidence >= 20) {
      results.push({
        disease,
        confidence,
        matchedSymptoms,
        totalSymptoms: disease.symptoms.length,
      });
    }
  }

  // Sort by confidence descending
  results.sort((a, b) => b.confidence - a.confidence);

  // Return top 5
  return results.slice(0, 5);
}

// ============================================
// Emergency Detection
// ============================================

export function checkEmergency(
  symptoms: string[],
  severity: number,
): {
  isEmergency: boolean;
  message: string;
} {
  const emergencySymptoms = ["chest_pain", "shortness_of_breath"];
  const hasEmergencySymptom = emergencySymptoms.some((s) =>
    symptoms.includes(s),
  );

  if (hasEmergencySymptom && severity >= 8) {
    return {
      isEmergency: true,
      message:
        "⚠️ Based on your symptoms (chest pain/difficulty breathing with high severity), please consider seeking emergency medical attention immediately. Call your local emergency number if symptoms are acute.",
    };
  }

  if (severity >= 9) {
    return {
      isEmergency: true,
      message:
        "⚠️ Your symptom severity is very high. If you feel this is a medical emergency, please call your local emergency number immediately.",
    };
  }

  return {
    isEmergency: false,
    message: "",
  };
}
