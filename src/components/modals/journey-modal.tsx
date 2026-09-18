"use client";
import React from "react";
import { 
  Heart, 
  Check, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  HeartHandshake, 
  MessageCircleHeart, 
  Compass, 
  ArrowLeft
} from "lucide-react";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface JourneyModalProps {
  journeyStep: number;
  answer: string;
  onSetJourneyStep: (step: number) => void;
  onSetAnswer: (answer: string) => void;
  onClose: () => void;
  onExploreDev: () => void;
}

const STEP_OPTIONS = [
  { id: "Shared values", label: "Shared Values & Beliefs", icon: HeartHandshake, desc: "Foundational life principles & mutual respect" },
  { id: "Honest communication", label: "Honest Communication", icon: MessageCircleHeart, desc: "Open, vulnerable & thoughtful dialogue" },
  { id: "A similar future", label: "A Similar Future Vision", icon: Compass, desc: "Life goals, timeline & shared aspiration" },
  { id: "A little of everything", label: "A Harmonious Blend", icon: Sparkles, desc: "Balanced compatibility across all pillars" },
];

export const JourneyModal: React.FC<JourneyModalProps> = ({
  journeyStep,
  answer,
  onSetJourneyStep,
  onSetAnswer,
  onClose,
  onExploreDev,
}) => {
  return (
    <div className="journey-modal-content">
      {/* Top Eyebrow Tag */}
      <div className="journey-modal-badge">
        <span className="badge-sparkle">✦</span>
        <span>
          {journeyStep === 0
            ? "ADULT DEMO VERIFICATION • 18+"
            : journeyStep === 1
              ? "INTERACTIVE ONBOARDING • STEP 1 OF 2"
              : "WELCOME TO THE PREVIEW"}
        </span>
      </div>

      <DialogTitle className="dialog-display journey-title">
        {journeyStep === 0 ? (
          <>
            Something meaningful <br />
            <em>starts with you.</em>
          </>
        ) : journeyStep === 1 ? (
          <>
            What matters <br />
            <em>most to you?</em>
          </>
        ) : (
          <>
            A thoughtful <br />
            <em>beginning.</em>
          </>
        )}
      </DialogTitle>

      <DialogDescription className="journey-desc">
        {journeyStep === 0
          ? "An interactive, adults-only fictional product preview. No account or payment required."
          : journeyStep === 1
            ? "Choose your primary compatibility foundation to personalize this preview."
            : "Your compatibility preferences have been saved for this session."}
      </DialogDescription>

      {journeyStep === 0 ? (
        <div className="journey-step-0-body">
          {/* Philosophy Card */}
          <div className="journey-quote-card">
            <div className="quote-badge">
              <Sparkles size={13} className="sparkle-icon" />
              <span>CORE PHILOSOPHY</span>
            </div>
            <p>&ldquo;Beyond the spark. Towards something truly meaningful.&rdquo;</p>
          </div>

          {/* Action CTAs */}
          <div className="journey-actions-stack">
            <button
              className="journey-primary-cta"
              onClick={() => onSetJourneyStep(1)}
            >
              <span>I&apos;m 18 or older · Explore the demo</span>
              <ArrowRight size={16} />
            </button>
            <a
              className="journey-secondary-link"
              href="#how-it-works"
              onClick={onClose}
            >
              See the step-by-step profile creation first ↓
            </a>
          </div>

          <div className="journey-trust-bar">
            <ShieldCheck size={13} className="trust-icon" />
            <span>100% Privacy Preserved • Fictional Demonstration Prototype</span>
          </div>
        </div>
      ) : journeyStep === 1 ? (
        <div className="journey-step-1-body">
          <div className="answer-options-grid">
            {STEP_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const isSelected = answer === opt.id;
              return (
                <button
                  type="button"
                  key={opt.id}
                  className={`answer-option-card ${isSelected ? "selected" : ""}`}
                  onClick={() => onSetAnswer(opt.id)}
                >
                  <div className="option-icon-box">
                    <Icon size={18} />
                  </div>
                  <div className="option-text-box">
                    <strong>{opt.label}</strong>
                    <small>{opt.desc}</small>
                  </div>
                  <div className="option-check-circle">
                    {isSelected && <Check size={13} />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="journey-step-actions">
            <button
              type="button"
              className="journey-back-btn"
              onClick={() => onSetJourneyStep(0)}
            >
              <ArrowLeft size={14} /> Back
            </button>
            <button
              type="button"
              className="journey-primary-cta flex-1"
              disabled={!answer}
              onClick={() => onSetJourneyStep(2)}
            >
              <span>Continue</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div className="journey-step-2-body">
          <div className="journey-result-card">
            <div className="heart-circle">
              <Heart size={26} className="heart-icon-pulse" />
            </div>
            <h4>You chose &ldquo;{answer}&rdquo;</h4>
            <p>That&apos;s the perfect foundation to build deep, intentional connection.</p>
          </div>

          <div className="journey-features-list">
            <div className="feat-item">
              <Check size={14} className="feat-check" />
              <span>AI Personality &amp; Values Mapping</span>
            </div>
            <div className="feat-item">
              <Check size={14} className="feat-check" />
              <span>45-Second Natural Video Bios</span>
            </div>
            <div className="feat-item">
              <Check size={14} className="feat-check" />
              <span>Mutual Double Opt-In Connection</span>
            </div>
          </div>

          <button
            className="journey-primary-cta w-full"
            onClick={onExploreDev}
          >
            <span>Explore Mira &amp; Match Profile</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
