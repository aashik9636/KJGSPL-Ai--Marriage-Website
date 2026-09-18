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

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[step];

  const handleSelectOption = (optionId: string) => {
    const updated = { ...answers, [step]: optionId };
    setAnswers(updated);

    if (step < totalQuestions - 1) {
      setStep(step + 1);
    } else {
      setIsCalculating(true);
      setTimeout(() => {
        setIsCalculating(false);
        setStep(totalQuestions); // Results view
      }, 1000);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setStep(0);
    setIsCalculating(false);
  };

  const getResult = (): ArchetypeResult => {
    const key = `${answers[0] || "explorer"}-${answers[1] || "anchor"}-${answers[2] || "thinker"}`;
    return ARCHETYPES[key] || ARCHETYPES["default"];
  };

  // Loading Calculation screen
  if (isCalculating) {
    return (
      <div 
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          padding: "40px 20px",
          minHeight: "340px",
          textAlign: "center"
        }}
      >
        <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "#fce7f3", display: "grid", placeItems: "center", color: "#be185d" }}>
          <Sparkles size={28} />
        </div>
        <h3 style={{ fontFamily: "Georgia, serif", fontSize: "22px", color: "#411c2b", margin: 0 }}>
          Synthesizing Your Relationship Dynamic...
        </h3>
        <p style={{ fontSize: "13.5px", color: "#6b535d", maxWidth: "420px", margin: 0 }}>
          Mapping your tempo, sanctuary energy, and decision preferences across our complementary compatibility model.
        </p>
      </div>
    );
  }

  // Result Screen
  if (step === totalQuestions) {
    const result = getResult();
    return (
      <div 
        className="quiz-result-view"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          color: "#411c2b",
          fontFamily: "Arial, Helvetica, sans-serif"
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", textAlign: "center", alignItems: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", color: "#9d174d", background: "#fce7f3", padding: "4px 12px", borderRadius: "999px" }}>
            <Sparkles size={13} style={{ color: "#be185d" }} />
            <span>{result.badge}</span>
          </div>

          <DialogTitle 
            className="dialog-display"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "28px",
              fontWeight: 400,
              color: "#411c2b",
              lineHeight: 1.2,
              margin: "6px 0 0"
            }}
          >
            You are <em style={{ fontStyle: "italic", color: "#be185d" }}>{result.name}</em>
          </DialogTitle>

          <DialogDescription 
            style={{
              fontSize: "13.5px",
              color: "#6b535d",
              lineHeight: 1.45,
              margin: 0
            }}
          >
            {result.title}
          </DialogDescription>
        </div>

        {/* Dynamic Profile Card */}
        <div 
          style={{
            background: "#ffffff",
            border: "1.5px solid #ebd8d4",
            borderRadius: "18px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            boxShadow: "0 6px 20px rgba(65, 28, 43, 0.04)"
          }}
        >
          <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#4a323c", margin: 0 }}>
            {result.desc}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {result.strengths.map((st, sIdx) => (
              <span key={sIdx} style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "10.5px", fontWeight: 700, color: "#9d174d", background: "#fff5f8", border: "1px solid #fbcfe8", padding: "3px 9px", borderRadius: "6px" }}>
                <CheckCircle2 size={11} style={{ color: "#16a34a" }} />
                <span>{st}</span>
              </span>
            ))}
          </div>

          {/* Complementary Match Insight */}
          <div 
            style={{
              background: "linear-gradient(135deg, #fffbf7 0%, #fef3ec 100%)",
              border: "1px solid #ebd4cb",
              borderRadius: "14px",
              padding: "12px 16px",
              marginTop: "4px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
              <Heart size={14} style={{ color: "#be185d" }} />
              <strong style={{ fontSize: "12.5px", color: "#411c2b" }}>
                Your Ideal Complementary Partner: {result.idealMatch}
              </strong>
            </div>
            <p style={{ fontSize: "12px", color: "#6b535d", lineHeight: 1.45, margin: 0 }}>
              {result.idealMatchDesc}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "6px", borderTop: "1px solid #ebdcd9", gap: "12px" }}>
          <button
            type="button"
            onClick={handleReset}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "none",
              border: "none",
              fontSize: "12.5px",
              fontWeight: 600,
              color: "#7c656b",
              cursor: "pointer"
            }}
          >
            <RotateCcw size={13} />
            <span>Retake Quiz</span>
          </button>

          <Link
            href="/register/step-1"
            onClick={() => onClose && onClose()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              fontSize: "13.5px",
              fontWeight: 700,
              borderRadius: "10px",
              background: "#411c2b",
              color: "#fff",
              textDecoration: "none",
              marginLeft: "auto",
              boxShadow: "0 6px 18px rgba(65, 28, 43, 0.15)"
            }}
          >
            <span>Find Value-Aligned Matches</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  // Active Question View
  return (
    <div 
      className="quiz-modal-container"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        color: "#411c2b",
        fontFamily: "Arial, Helvetica, sans-serif"
      }}
    >
      {/* Progress Bar & Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 800, letterSpacing: "0.1em", color: "#be185d", textTransform: "uppercase" }}>
            <Sparkles size={13} style={{ color: "#be185d" }} />
            <span>QUESTION {step + 1} OF {totalQuestions} • {currentQuestion.category}</span>
          </div>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#7c656b" }}>
            {Math.round(((step) / totalQuestions) * 100)}% Completed
          </span>
        </div>

        {/* Progress Track */}
        <div style={{ width: "100%", height: "4px", background: "#ebdcd5", borderRadius: "999px", overflow: "hidden" }}>
          <div 
            style={{
              width: `${((step + 1) / totalQuestions) * 100}%`,
              height: "100%",
              background: "linear-gradient(90deg, #be185d 0%, #9d174d 100%)",
              transition: "width 0.3s ease"
            }}
          />
        </div>

        <DialogTitle 
          className="dialog-display"
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "24px",
            fontWeight: 400,
            color: "#411c2b",
            lineHeight: 1.25,
            margin: "4px 0 0"
          }}
        >
          {currentQuestion.title}
        </DialogTitle>
        <DialogDescription style={{ fontSize: "13px", color: "#6b535d", margin: 0 }}>
          {currentQuestion.subtitle}
        </DialogDescription>
      </div>

      {/* 2 Interactive Tap Options */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px", marginTop: "4px" }}>
        {currentQuestion.options.map((opt) => {
          const OptionIcon = opt.icon;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelectOption(opt.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
                background: "#ffffff",
                border: "1.5px solid #ebd8d4",
                borderRadius: "16px",
                padding: "18px",
                textAlign: "left",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(65, 28, 43, 0.03)",
                transition: "all 0.18s ease"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                <span style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#fdf2f4", color: "#9d174d", display: "grid", placeItems: "center" }}>
                  <OptionIcon size={18} />
                </span>
                <span style={{ fontSize: "9.5px", fontWeight: 700, color: "#9d174d", background: "#fce7f3", padding: "2.5px 8px", borderRadius: "999px" }}>
                  {opt.tag}
                </span>
              </div>

              <strong style={{ fontFamily: "Georgia, serif", fontSize: "16px", color: "#411c2b", margin: 0 }}>
                {opt.label}
              </strong>

              <p style={{ fontSize: "12px", color: "#624b54", lineHeight: 1.5, margin: 0 }}>
                {opt.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Footer Cancel / Step Back */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "10px", borderTop: "1px solid #ebdcd9" }}>
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            style={{ background: "none", border: "none", fontSize: "12.5px", fontWeight: 600, color: "#7c656b", cursor: "pointer" }}
          >
            ← Previous Question
          </button>
        ) : (
          <span style={{ fontSize: "11.5px", color: "#9c828b" }}>2-minute quick assessment</span>
        )}

        <button
          type="button"
          onClick={() => onClose && onClose()}
          style={{ background: "none", border: "none", fontSize: "12.5px", fontWeight: 600, color: "#7c656b", cursor: "pointer" }}
        >
          Close
        </button>
      </div>
    </div>
  );
};
