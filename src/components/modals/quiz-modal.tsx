"use client";
import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Compass, 
  Map, 
  Anchor, 
  Flame, 
  Brain, 
  Zap, 
  ArrowRight, 
  RotateCcw,
  CheckCircle2,
  Heart
} from "lucide-react";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface QuizModalProps {
  onClose?: () => void;
}

interface Question {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  options: {
    id: string;
    label: string;
    desc: string;
    icon: React.ElementType;
    tag: string;
  }[];
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    category: "TEMPO & WEEKENDS",
    title: "How do you recharge on a free Saturday?",
    subtitle: "Select the rhythm that feels most authentic to you:",
    options: [
      {
        id: "explorer",
        label: "Spontaneous Discovery",
        desc: "Unplanned detours, new cafes, fresh stories & open roads.",
        icon: Compass,
        tag: "High Spontaneity"
      },
      {
        id: "planner",
        label: "Mindful Structure",
        desc: "Slow morning chai, organized routine, locked-in peace of mind.",
        icon: Map,
        tag: "Grounded Safety"
      }
    ]
  },
  {
    id: 2,
    category: "SOCIAL & HOME SANCTUARY",
    title: "What makes your home feel most alive?",
    subtitle: "Choose your primary emotional energy:",
    options: [
      {
        id: "spark",
        label: "Warm Vitality & Humor",
        desc: "Hosting dinners, shared laughter, cheerful optimism & social warmth.",
        icon: Flame,
        tag: "Social Vitality"
      },
      {
        id: "anchor",
        label: "Serene Sanctuary & Depth",
        desc: "Quiet reading corners, deep 1-on-1 talks, tranquil acoustic evenings.",
        icon: Anchor,
        tag: "Calm Depth"
      }
    ]
  },
  {
    id: 3,
    category: "DECISIONS & HORIZONS",
    title: "When family dreams are on the horizon, what’s your superpower?",
    subtitle: "Your natural decision-making style:",
    options: [
      {
        id: "doer",
        label: "Bold Action & Momentum",
        desc: "Taking brave initiatives, turning plans into reality without overthinking.",
        icon: Zap,
        tag: "Decisive Action"
      },
      {
        id: "thinker",
        label: "Reflective Wisdom & Care",
        desc: "Weighing every perspective, ensuring emotional and financial safety.",
        icon: Brain,
        tag: "Thoughtful Care"
      }
    ]
  }
];

interface ArchetypeResult {
  name: string;
  title: string;
  badge: string;
  desc: string;
  idealMatch: string;
  idealMatchDesc: string;
  strengths: string[];
}

const ARCHETYPES: Record<string, ArchetypeResult> = {
  "explorer-spark-doer": {
    name: "The Vibrant Trailblazer",
    title: "Spontaneous Energy & Bold Optimism",
    badge: "DYNAMIC ARCHETYPE 01",
    desc: "You bring contagious warmth, brave initiative, and joyful surprises into every room you enter.",
    idealMatch: "The Mindful Anchor",
    idealMatchDesc: "Someone who provides emotional stillness, structured safety, and wise reflection to ground your brilliant sparks.",
    strengths: ["Spontaneous Joy", "Decisive Drive", "Social Warmth"]
  },
  "planner-anchor-thinker": {
    name: "The Sacred Sanctuary Architect",
    title: "Calm Grounding & Deep Care",
    badge: "DYNAMIC ARCHETYPE 02",
    desc: "You are the peaceful bedrock of any home. Thoughtful, patient, and intensely reliable during life's storms.",
    idealMatch: "The Radiant Explorer",
    idealMatchDesc: "Someone who brings humor, spontaneous weekend adventures, and social optimism to keep life colorful and alive.",
    strengths: ["Emotional Stillness", "Long-term Security", "Quiet Wisdom"]
  },
  "explorer-anchor-thinker": {
    name: "The Reflective Explorer",
    title: "Curiosity Grounded in Quiet Depth",
    badge: "DYNAMIC ARCHETYPE 03",
    desc: "You love exploring ideas, books, and destinations with intentional depth and quiet reverence.",
    idealMatch: "The Decisive Spark",
    idealMatchDesc: "Someone who turns deep reflections into fun shared actions and fills the living room with lighthearted laughter.",
    strengths: ["Intellectual Depth", "Cultural Curiosity", "Serene Patience"]
  },
  "default": {
    name: "The Mindful Harmonizer",
    title: "Balanced Perspective & Intentional Living",
    badge: "DYNAMIC ARCHETYPE 04",
    desc: "You intuitively know when to plan and when to let go. You value deep family roots and authentic communication.",
    idealMatch: "The Passionate Visionary",
    idealMatchDesc: "Someone with strong personal passions and high emotional intelligence who shares your sacred family ethics.",
    strengths: ["Balanced Living", "High Empathy", "Sacred Values"]
  }
};

export const QuizModal: React.FC<QuizModalProps> = ({ onClose }) => {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [calcPercent, setCalcPercent] = useState(0);
  const [calcPhase, setCalcPhase] = useState("Initializing dynamic synthesis...");

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[step];

  const handleSelectOption = (optionId: string) => {
    const updated = { ...answers, [step]: optionId };
    setAnswers(updated);

    if (step < totalQuestions - 1) {
      setStep(step + 1);
    } else {
      // Start multi-phase animated calculation
      setIsCalculating(true);
      setCalcPercent(0);
      setCalcPhase("Analyzing tempo & recharge rhythms...");

      const startTime = Date.now();
      const duration = 2400; // 2.4s smooth animation

      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(1, elapsed / duration);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentPct = Math.round(eased * 100);
        setCalcPercent(currentPct);

        if (progress < 0.28) {
          setCalcPhase("Analyzing tempo & recharge rhythms...");
        } else if (progress < 0.60) {
          setCalcPhase("Mapping sanctuary energy & social depth...");
        } else if (progress < 0.88) {
          setCalcPhase("Synthesizing decision & horizon superpower...");
        } else {
          setCalcPhase("Unlocking your core relationship archetype ✨");
        }

        if (progress >= 1) {
          clearInterval(interval);
          setTimeout(() => {
            setIsCalculating(false);
            setStep(totalQuestions); // Results view
          }, 350);
        }
      }, 35);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setStep(0);
    setIsCalculating(false);
    setCalcPercent(0);
  };

  const getResult = (): ArchetypeResult => {
    const key = `${answers[0] || "explorer"}-${answers[1] || "anchor"}-${answers[2] || "thinker"}`;
    return ARCHETYPES[key] || ARCHETYPES["default"];
  };

  // 1. Loading / Multi-stage AI Calculation Screen
  if (isCalculating) {
    return (
      <div className="quiz-calc-stage animate-screen-fade">
        {/* Animated Radar Halo Stage */}
        <div className="quiz-calc-visual">
          <div className="quiz-calc-halo ring-1" />
          <div className="quiz-calc-halo ring-2" />
          <div className="quiz-calc-center-icon">
            <Sparkles size={28} className="calc-sparkle-pulse" />
          </div>
        </div>

        {/* Live Percent & Title */}
        <div className="quiz-calc-header">
          <span className="quiz-calc-number">{calcPercent}%</span>
          <h3 className="quiz-calc-title">
            Synthesizing Your Relationship Dynamic
          </h3>
          <p className="quiz-calc-desc">
            Mapping your tempo, sanctuary energy, and decision preferences across our multi-dimensional compatibility formula.
          </p>
        </div>

        {/* Progress Bar & Phase Ticker */}
        <div className="quiz-calc-bar-box">
          <div className="quiz-calc-progress-track">
            <div 
              className="quiz-calc-progress-fill" 
              style={{ width: `${calcPercent}%` }}
            />
          </div>
          <div className="quiz-calc-phase-text">
            <span className="quiz-live-pulse-dot" />
            <span>{calcPhase}</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. Final Result Summary Screen
  if (step === totalQuestions) {
    const result = getResult();
    return (
      <div className="quiz-result-view animate-screen-fade">
        {/* Header Badge */}
        <div className="quiz-result-header">
          <div className="quiz-badge-pill">
            <Sparkles size={12} className="quiz-sparkle-badge-icon" />
            <span>{result.badge}</span>
          </div>

          <DialogTitle className="dialog-display quiz-result-title">
            You are <em>{result.name}</em>
          </DialogTitle>

          <DialogDescription className="quiz-result-subtitle">
            {result.title}
          </DialogDescription>
        </div>

        {/* Dynamic Profile Card */}
        <div className="quiz-profile-card">
          <p className="quiz-profile-desc">
            {result.desc}
          </p>

          <div className="quiz-strengths-grid">
            {result.strengths.map((st, sIdx) => (
              <span key={sIdx} className="quiz-strength-chip">
                <CheckCircle2 size={12} className="chip-check-icon" />
                <span>{st}</span>
              </span>
            ))}
          </div>

          {/* Complementary Match Insight */}
          <div className="quiz-complementary-card">
            <div className="quiz-comp-header">
              <div className="comp-heart-icon-box">
                <Heart size={14} fill="#e11d48" color="#e11d48" />
              </div>
              <strong className="comp-title">
                Your Ideal Complementary Partner: {result.idealMatch}
              </strong>
            </div>
            <p className="comp-desc">
              {result.idealMatchDesc}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="quiz-modal-footer">
          <button
            type="button"
            onClick={handleReset}
            className="quiz-retake-btn"
          >
            <RotateCcw size={13} />
            <span>Retake Assessment</span>
          </button>

          <Link
            href="/register/step-1"
            onClick={() => onClose && onClose()}
            className="quiz-primary-cta"
          >
            <span>Find Value-Aligned Matches</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    );
  }

  // 3. Active Question View
  return (
    <div className="quiz-modal-container animate-screen-fade">
      {/* Progress Bar & Header */}
      <div className="quiz-header-block">
        <div className="quiz-top-bar">
          <div className="quiz-category-pill">
            <Sparkles size={12} />
            <span>QUESTION {step + 1} OF {totalQuestions} • {currentQuestion.category}</span>
          </div>
          <span className="quiz-progress-pct">
            {Math.round(((step) / totalQuestions) * 100)}% Completed
          </span>
        </div>

        {/* Progress Track */}
        <div className="quiz-step-progress-track">
          <div 
            className="quiz-step-progress-fill"
            style={{ width: `${((step + 1) / totalQuestions) * 100}%` }}
          />
        </div>

        <DialogTitle className="dialog-display quiz-question-title">
          {currentQuestion.title}
        </DialogTitle>
        <DialogDescription className="quiz-question-subtitle">
          {currentQuestion.subtitle}
        </DialogDescription>
      </div>

      {/* 2 Interactive Tap Options */}
      <div className="quiz-options-grid">
        {currentQuestion.options.map((opt) => {
          const OptionIcon = opt.icon;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelectOption(opt.id)}
              className="quiz-option-card"
            >
              <div className="quiz-option-top">
                <span className="quiz-option-icon-box">
                  <OptionIcon size={18} />
                </span>
                <span className="quiz-option-tag">
                  {opt.tag}
                </span>
              </div>

              <strong className="quiz-option-label">
                {opt.label}
              </strong>

              <p className="quiz-option-desc">
                {opt.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="quiz-nav-footer">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="quiz-back-btn"
          >
            ← Previous Question
          </button>
        ) : (
          <span className="quiz-assessment-tag">2-minute quick assessment</span>
        )}

        <button
          type="button"
          onClick={() => onClose && onClose()}
          className="quiz-close-btn"
        >
          Close
        </button>
      </div>
    </div>
  );
};
