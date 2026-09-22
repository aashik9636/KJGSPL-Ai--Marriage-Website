"use client";
import React, { useState, useEffect, useRef } from "react";
import { 
  Heart, 
  HeartHandshake,
  Check, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Coffee,
  Compass, 
  ArrowLeft,
  BookOpen,
  Utensils,
  Palmtree,
  Home,
  MessageCircleHeart,
  Flame,
  Brain,
  Play,
  Pause,
  Send,
  MapPin,
  CheckCircle2
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

const RHYTHM_OPTIONS = [
  {
    id: "slow-coffee",
    title: "Slow Coffee & Deep Conversations",
    subtitle: "Artisanal cafes, bookstore wandering, and thoughtful morning chats.",
    icon: Coffee,
    tag: "COZY & GROUNDED",
    matchTarget: "dev"
  },
  {
    id: "arts-design",
    title: "Design, Architecture & Art Walks",
    subtitle: "Gallery openings, aesthetic spaces, exploring city corners together.",
    icon: BookOpen,
    tag: "CREATIVE & CURIOUS",
    matchTarget: "maya"
  },
  {
    id: "culinary-hosting",
    title: "Sunday Cooking & Intimate Dinners",
    subtitle: "Testing new recipes, farmers markets, and tables full of close friends.",
    icon: Utensils,
    tag: "WARMTH & HOSPITALITY",
    matchTarget: "dev"
  },
  {
    id: "travel-nature",
    title: "Spontaneous Getaways & Nature Trails",
    subtitle: "Sunset drives, coastal walks, and packing light for weekend escapes.",
    icon: Palmtree,
    tag: "ADVENTURE & WANDERLUST",
    matchTarget: "mira"
  }
];

const VALUES_OPTIONS = [
  {
    id: "family-grounded",
    title: "Family Roots & Grounded Life",
    subtitle: "A warm, welcoming home close to loved ones, built with deep mutual respect.",
    icon: Home,
    stat: "98% Synergy Pillar"
  },
  {
    id: "intellect-wit",
    title: "Intellectual Spark & Effortless Banter",
    subtitle: "Playful humor that easily transitions into 2 AM heartfelt discussions.",
    icon: Brain,
    stat: "96% Synergy Pillar"
  },
  {
    id: "shared-ambition",
    title: "Ambitious Dreams with Emotional Balance",
    subtitle: "Cheering each other's career milestones while treasuring slow, quiet evenings.",
    icon: Flame,
    stat: "95% Synergy Pillar"
  },
  {
    id: "open-communication",
    title: "Vulnerability & Honest Communication",
    subtitle: "Zero guessing games; addressing differences with grace, empathy, and care.",
    icon: MessageCircleHeart,
    stat: "99% Synergy Pillar"
  }
];

export const JourneyModal: React.FC<JourneyModalProps> = ({
  journeyStep,
  answer,
  onSetJourneyStep,
  onSetAnswer,
  onClose,
  onExploreDev,
}) => {
  const [selectedRhythm, setSelectedRhythm] = useState<string>("slow-coffee");
  const [selectedValue, setSelectedValue] = useState<string>("family-grounded");
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthProgress, setSynthProgress] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [sentNote, setSentNote] = useState(false);
  const [noteText, setNoteText] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const audio = new Audio(`/assets/dev-voice.mp3?v=${Date.now()}`);
      const bgMusic = new Audio("/assets/soothing-music.wav");
      
      audio.volume = 1.0;
      bgMusic.volume = 0.20; // Soft soothing background volume
      bgMusic.loop = true;

      audioRef.current = audio;
      bgMusicRef.current = bgMusic;

      const handleStop = () => {
        setIsPlayingAudio(false);
        if (bgMusicRef.current) {
          bgMusicRef.current.pause();
          bgMusicRef.current.currentTime = 0;
        }
      };

      audio.addEventListener("ended", handleStop);
      audio.addEventListener("pause", handleStop);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleToggleVoice = () => {
    const audio = audioRef.current;
    const bgMusic = bgMusicRef.current;

    if (isPlayingAudio) {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      if (bgMusic) {
        bgMusic.pause();
        bgMusic.currentTime = 0;
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingAudio(false);
    } else {
      if (audio) {
        audio.currentTime = 0;
        if (bgMusic) {
          bgMusic.currentTime = 0;
          bgMusic.play().catch(() => {});
        }
        audio
          .play()
          .then(() => setIsPlayingAudio(true))
          .catch(() => {
            // SpeechSynthesis fallback for male voice
            if (typeof window !== "undefined" && "speechSynthesis" in window) {
              window.speechSynthesis.cancel();
              const utterance = new SpeechSynthesisUtterance(
                "Hi, I am Dev. For me, life is about thoughtful architecture, slow Sunday coffees, and building a genuine partnership together."
              );
              const voices = window.speechSynthesis.getVoices();
              const maleVoice =
                voices.find(
                  (v) =>
                    (v.lang.includes("IN") ||
                      v.name.toLowerCase().includes("india") ||
                      v.lang.startsWith("en")) &&
                    (v.name.toLowerCase().includes("male") ||
                      v.name.toLowerCase().includes("david") ||
                      v.name.toLowerCase().includes("ravi") ||
                      v.name.toLowerCase().includes("matthew") ||
                      v.name.toLowerCase().includes("george"))
                ) || voices.find((v) => v.lang.startsWith("en"));

              if (maleVoice) utterance.voice = maleVoice;
              utterance.pitch = 0.95;
              utterance.rate = 0.92;
              utterance.onstart = () => {
                setIsPlayingAudio(true);
                if (bgMusic) {
                  bgMusic.currentTime = 0;
                  bgMusic.play().catch(() => {});
                }
              };
              utterance.onend = () => {
                setIsPlayingAudio(false);
                if (bgMusic) {
                  bgMusic.pause();
                  bgMusic.currentTime = 0;
                }
              };
              utterance.onerror = () => {
                setIsPlayingAudio(false);
                if (bgMusic) {
                  bgMusic.pause();
                  bgMusic.currentTime = 0;
                }
              };
              window.speechSynthesis.speak(utterance);
            }
          });
      }
    }
  };

  const handleProceedToMatch = () => {
    setIsSynthesizing(true);
    setSynthProgress(0);
    onSetJourneyStep(2);

    let current = 0;
    const interval = setInterval(() => {
      current += 20;
      setSynthProgress(Math.min(current, 100));
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsSynthesizing(false);
        }, 400);
      }
    }, 180);
  };

  const activeRhythmObj = RHYTHM_OPTIONS.find((r) => r.id === selectedRhythm) || RHYTHM_OPTIONS[0];
  const activeValueObj = VALUES_OPTIONS.find((v) => v.id === selectedValue) || VALUES_OPTIONS[0];

  return (
    <div className="journey-interactive-experience">
      {/* Visual Top Step Indicator */}
      <div className="journey-stepper-header">
        <div className="stepper-track">
          <div
            className="stepper-progress-fill"
            style={{
              width: journeyStep === 0 ? "33%" : journeyStep === 1 ? "66%" : "100%",
            }}
          />
        </div>
        <div className="stepper-pills-row">
          <div className={`step-pill-indicator ${journeyStep >= 0 ? "active" : ""}`}>
            <span className="step-num">01</span>
            <span className="step-name">Your Rhythm</span>
          </div>
          <div className={`step-pill-indicator ${journeyStep >= 1 ? "active" : ""}`}>
            <span className="step-num">02</span>
            <span className="step-name">Core Values</span>
          </div>
          <div className={`step-pill-indicator ${journeyStep >= 2 ? "active" : ""}`}>
            <span className="step-num">03</span>
            <span className="step-name">AI Match Revelation</span>
          </div>
        </div>
      </div>

      {/* STEP 0: Life Rhythm & Energy */}
      {journeyStep === 0 && (
        <div className="journey-step-container animate-fade-in">
          <div className="journey-headline-block">
            <div className="journey-eyebrow-tag">
              <Sparkles size={13} />
              <span>STEP 01 OF 03 · YOUR LIFE RHYTHM</span>
            </div>
            <DialogTitle className="dialog-display journey-main-title">
              How do you like to spend <br />
              <em>your favorite days?</em>
            </DialogTitle>
            <DialogDescription className="journey-sub-title">
              Select the energy that best represents your everyday joy and lifestyle rhythm.
            </DialogDescription>
          </div>

          <div className="journey-options-grid">
            {RHYTHM_OPTIONS.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedRhythm === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  className={`journey-choice-card ${isSelected ? "is-selected" : ""}`}
                  onClick={() => setSelectedRhythm(item.id)}
                >
                  <div className="choice-card-top">
                    <div className="choice-icon-box">
                      <Icon size={18} />
                    </div>
                    <span className="choice-tag">{item.tag}</span>
                    <div className="choice-radio-circle">
                      {isSelected && <Check size={12} />}
                    </div>
                  </div>
                  <h4 className="choice-title">{item.title}</h4>
                  <p className="choice-desc">{item.subtitle}</p>
                </button>
              );
            })}
          </div>

          <div className="journey-bottom-action-bar">
            <div className="journey-action-note">
              <ShieldCheck size={14} className="shield-icon-subtle" />
              <span>Personalized matching demo · No account or payment required</span>
            </div>
            <button
              type="button"
              className="journey-continue-btn"
              onClick={() => onSetJourneyStep(1)}
            >
              <span>Next: Non-Negotiable Values</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 1: Non-Negotiables & Core Values */}
      {journeyStep === 1 && (
        <div className="journey-step-container animate-fade-in">
          <div className="journey-headline-block">
            <div className="journey-eyebrow-tag">
              <HeartHandshake size={13} />
              <span>STEP 02 OF 03 · YOUR COMPATIBILITY COMPASS</span>
            </div>
            <DialogTitle className="dialog-display journey-main-title">
              What creates lasting <br />
              <em>chemistry for you?</em>
            </DialogTitle>
            <DialogDescription className="journey-sub-title">
              Beyond the initial spark, choose the foundation that matters most for long-term alignment.
            </DialogDescription>
          </div>

          <div className="journey-options-grid">
            {VALUES_OPTIONS.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedValue === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  className={`journey-choice-card ${isSelected ? "is-selected" : ""}`}
                  onClick={() => setSelectedValue(item.id)}
                >
                  <div className="choice-card-top">
                    <div className="choice-icon-box">
                      <Icon size={18} />
                    </div>
                    <span className="choice-tag values-tag">{item.stat}</span>
                    <div className="choice-radio-circle">
                      {isSelected && <Check size={12} />}
                    </div>
                  </div>
                  <h4 className="choice-title">{item.title}</h4>
                  <p className="choice-desc">{item.subtitle}</p>
                </button>
              );
            })}
          </div>

          <div className="journey-bottom-action-bar">
            <button
              type="button"
              className="journey-back-btn"
              onClick={() => onSetJourneyStep(0)}
            >
              <ArrowLeft size={14} /> Back
            </button>
            <button
              type="button"
              className="journey-continue-btn"
              onClick={handleProceedToMatch}
            >
              <span>Synthesize &amp; Reveal My Match</span>
              <Sparkles size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Live AI Match Synthesis & Revelation */}
      {journeyStep === 2 && (
        <div className="journey-step-container animate-fade-in">
          {isSynthesizing ? (
            <div className="ai-synthesis-loader-view">
              <div className="synthesis-radar-orbit">
                <div className="synthesis-core-pulse" />
                <Sparkles size={24} className="radar-sparkle-center" />
              </div>
              <h3 className="synthesis-heading">
                Synthesizing Compatibility Matrix...
              </h3>
              <p className="synthesis-sub">
                Matching &ldquo;{activeRhythmObj.title}&rdquo; &amp; &ldquo;{activeValueObj.title}&rdquo; across 4,800+ curated profiles.
              </p>
              <div className="synthesis-progress-track">
                <div
                  className="synthesis-progress-bar"
                  style={{ width: `${synthProgress}%` }}
                />
              </div>
              <span className="synthesis-percent">{synthProgress}% Complete</span>
            </div>
          ) : (
            <div className="match-reveal-view">
              {/* Match Highlight Header Banner */}
              <div className="match-success-badge-row">
                <div className="match-score-badge">
                  <Sparkles size={14} className="match-score-sparkle" />
                  <span>96% AI VALUES COMPATIBILITY MATCH</span>
                </div>
                <span className="match-city-tag">
                  <MapPin size={12} /> Dubai · DIFC &amp; Downtown
                </span>
              </div>

              {/* Match Card Split View */}
              <div className="revealed-match-card">
                {/* Left: Persona Photo & Voice Note */}
                <div className="match-persona-side">
                  <div className="match-avatar-frame">
                    <img
                      src="/assets/dev.png"
                      alt="Dev Shah"
                      className="match-avatar-img"
                    />
                    <div className="match-verified-floating-badge">
                      <CheckCircle2 size={12} /> Verified Member
                    </div>
                  </div>

                  <div className="match-details-box">
                    <h3 className="match-name">Dev Shah, 31</h3>
                    <p className="match-role">Architectural Consultant &amp; Bibliophile · Dubai</p>
                  </div>

                  {/* Interactive Voice Player */}
                  <div
                    className={`match-voice-player-bar ${isPlayingAudio ? "playing" : ""}`}
                    onClick={handleToggleVoice}
                    role="button"
                    tabIndex={0}
                  >
                    <button
                      type="button"
                      className="match-voice-btn"
                      aria-label="Play Dev's voice note"
                    >
                      {isPlayingAudio ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: "2px" }} />}
                    </button>
                    <div className="match-voice-waveform">
                      <span /><span /><span /><span /><span /><span /><span /><span />
                    </div>
                    <span className="match-voice-label">
                      {isPlayingAudio ? "Playing (0:06)" : "Listen to Dev's Voice Note"}
                    </span>
                  </div>
                </div>

                {/* Right: Compatibility Synergy Matrix & First Step */}
                <div className="match-synergy-side">
                  <span className="synergy-eyebrow">WHY YOU TWO CONNECT</span>
                  <div className="synergy-points-list">
                    <div className="synergy-point-item">
                      <div className="synergy-icon-wrap">
                        <Coffee size={14} />
                      </div>
                      <div>
                        <strong>Shared Sunday Rhythm</strong>
                        <p>Both value slow mornings, bookstores, and uninterrupted thoughtful dialogue.</p>
                      </div>
                    </div>

                    <div className="synergy-point-item">
                      <div className="synergy-icon-wrap">
                        <Home size={14} />
                      </div>
                      <div>
                        <strong>Aligned Life Philosophy</strong>
                        <p>Family-first mindset with room for continuous personal growth and creativity.</p>
                      </div>
                    </div>

                    <div className="synergy-point-item">
                      <div className="synergy-icon-wrap">
                        <MessageCircleHeart size={14} />
                      </div>
                      <div>
                        <strong>Curated Chemistry</strong>
                        <p>High conversational depth index (8.9/10 based on prompt responses).</p>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Send Note Box */}
                  <div className="match-interactive-note-box">
                    <span className="note-box-title">✦ Send a Thoughtful First Note</span>
                    {sentNote ? (
                      <div className="note-sent-success animate-fade-in">
                        <CheckCircle2 size={16} color="#059669" />
                        <span>Intro note sent to Dev! Double opt-in active.</span>
                      </div>
                    ) : (
                      <div className="note-input-row">
                        <input
                          type="text"
                          className="note-text-input"
                          placeholder="e.g., What's your absolute favorite bookstore in Dubai?"
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && noteText.trim()) {
                              setSentNote(true);
                            }
                          }}
                        />
                        <button
                          type="button"
                          className="send-note-submit-btn"
                          disabled={!noteText.trim()}
                          onClick={() => setSentNote(true)}
                          aria-label="Send note"
                        >
                          <Send size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Action CTAs */}
              <div className="match-reveal-footer">
                <button
                  type="button"
                  className="journey-back-btn"
                  onClick={() => onSetJourneyStep(1)}
                >
                  <ArrowLeft size={14} /> Adjust Filters
                </button>
                <button
                  type="button"
                  className="journey-primary-cta"
                  onClick={onExploreDev}
                >
                  <span>Explore Dev &amp; Match Experience</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
