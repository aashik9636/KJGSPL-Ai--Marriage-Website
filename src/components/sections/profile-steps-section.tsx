"use client";
import React, { useState } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Award,
  Heart, 
  Play, 
  Mic, 
  Lock, 
  Compass, 
  SlidersHorizontal,
  Volume2,
  VolumeX,
  RotateCcw,
  ChevronDown,
  Send,
  MessageCircle
} from "lucide-react";

interface ProfileStepsSectionProps {
  onOpenJourney: () => void;
}

interface StepData {
  id: number;
  badge: string;
  title: string;
  description: string;
  points: string[];
}

const STEPS: StepData[] = [
  {
    id: 1,
    badge: "Step 1 • Profile Onboarding",
    title: "Create Your Profile",
    description: "Share your core background, lifestyle habits, intellectual interests, and lifelong marriage intentions with guided intelligent prompts.",
    points: [
      "Detailed value-based onboarding",
      "Smart AI prompt suggestions",
      "Verified identity & strict privacy controls"
    ],
  },
  {
    id: 2,
    badge: "Step 2 • Video Introduction",
    title: "Record Self Video Bio",
    description: "Upload or record a 45-second authentic video prompt. Express your genuine vibe, voice tone, and natural personality beyond static photos.",
    points: [
      "Guided natural prompt questions",
      "Authenticity & liveness verified",
      "Complete privacy & view permissions"
    ],
  },
  {
    id: 3,
    badge: "Step 3 • Priority Mapping",
    title: "Tell Us What Matters",
    description: "Define your non-negotiables, marriage timeline, family expectations, and communication frequency so matchmaking focuses on real alignment.",
    points: [
      "Nuanced life priorities & boundaries",
      "No superficial swipe algorithms",
      "Deep lifestyle & spiritual sync"
    ],
  },
  {
    id: 4,
    badge: "Step 4 • AI Compatibility Matrix",
    title: "Discover AI-Powered Insights",
    description: "Our proprietary compatibility engine analyzes complementary mindsets, emotional depth, and daily rhythm alignment before suggesting matches.",
    points: [
      "Multi-dimensional match scoring",
      "Detailed 'Why You Align' breakdown",
      "Growth & conflict style analysis"
    ],
  },
  {
    id: 5,
    badge: "Step 5 • Mutual Connection",
    title: "Connect with Confidence",
    description: "Conversations unlock only upon genuine mutual interest. Experience a calm, pressure-free environment with AI-suggested thoughtful icebreakers.",
    points: [
      "Strict double opt-in consent",
      "End-to-end encrypted messaging",
      "Context-rich first conversation topics"
    ],
  },
];

export const ProfileStepsSection: React.FC<ProfileStepsSectionProps> = ({ onOpenJourney }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>("12:34");
  const [matchingPhase, setMatchingPhase] = useState<"scanning" | "matched">("scanning");
  const [scanScore, setScanScore] = useState<number>(0);
  const [scanText, setScanText] = useState<string>("Scanning 340+ compatibility dimensions...");
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      setCurrentTime(`${formattedHours}:${formattedMinutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleAudio = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsAudioMuted(nextMuted);
      if (!nextMuted) {
        videoRef.current.play().catch(() => {});
      }
    } else {
      setIsAudioMuted((prev) => !prev);
    }
  };

  const handleReplay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsVideoEnded(false);
    }
  };

  const startMatchingScan = React.useCallback(() => {
    setMatchingPhase("scanning");
    setScanScore(0);
    setScanText("Scanning 340+ compatibility dimensions...");

    const startTime = performance.now();
    const duration = 2000;

    let animFrame: number;
    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(eased * 94);
      setScanScore(currentVal);

      if (currentVal < 28) {
        setScanText("Analyzing emotional depth & communication...");
      } else if (currentVal < 60) {
        setScanText("Evaluating life vision, timeline & priorities...");
      } else if (currentVal < 88) {
        setScanText("Synthesizing daily rhythms & lifestyle harmony...");
      } else {
        setScanText("High Compatibility Match Confirmed: 94% ✨");
      }

      if (progress < 1) {
        animFrame = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setMatchingPhase("matched");
        }, 400);
      }
    };

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  React.useEffect(() => {
    if (activeStep === 1 && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsVideoEnded(false);
    }
    if (activeStep === 3) {
      const cleanup = startMatchingScan();
      return cleanup;
    }
  }, [activeStep, startMatchingScan]);

  return (
    <section className="profile-steps-section" id="how-it-works">
      <div className="profile-steps-container">
        {/* Section Header */}
        <div className="profile-steps-header">
          <div className="eyebrow">04 / STEP-BY-STEP ONBOARDING</div>
          <h2>
            A thoughtful journey from
            <br />
            <em>who you are to who you meet.</em>
          </h2>
          <p>
            Experience how our evidence-based, video-enhanced onboarding builds genuine compatibility before the very first conversation.
          </p>
        </div>

        {/* 2-Column Interactive Layout */}
        <div className="profile-steps-grid">
          {/* Left Column: Interactive 3D Titanium iPhone Mockup */}
          <div className="phone-mockup-wrapper">
            <div className="phone-device-frame phone-3d-chassis">
              {/* Inner Clipped Bezel */}
              <div className="phone-inner-bezel">
                {/* Phone Speaker & Dynamic Island */}
                <div className="phone-island">
                  <div className="island-camera" />
                  <div className="island-sensor" />
                </div>

                {/* Status Bar */}
                <div className="phone-status-bar">
                  <span>{currentTime}</span>
                  <div className="phone-status-icons">
                    <span className="status-bolt">⚡</span>
                    <span className="status-signal">5G</span>
                  </div>
                </div>

                {/* Phone Screen Display (Dynamic based on activeStep) */}
                <div className="phone-screen-content">
                  {/* STEP 1 SCREEN: Profile Onboarding */}
                  {activeStep === 0 && (
                    <div className="screen-step screen-step-1 animate-screen-fade">
                      <div className="screen-user-header">
                        <div className="user-avatar-image-box">
                          <img src="/assets/mira.png" alt="Mira Desai" className="user-avatar-img" />
                        </div>
                        <div className="user-header-info">
                          <div className="user-name-badge">
                            <h4>Mira Desai</h4>
                            <span className="verified-check-pill">✓</span>
                          </div>
                          <p>Creative Designer • Dubai</p>
                        </div>
                        <span className="screen-gear-icon">⚙</span>
                      </div>

                      <div className="profile-progress-banner">
                        <div className="progress-bar-card">
                          <div className="progress-top-row">
                            <span className="progress-num">85%</span>
                            <span className="progress-trend">↗</span>
                          </div>
                          <span className="progress-label">Profile Completed</span>
                        </div>

                        <div className="verified-status-card">
                          <div className="verified-card-top">
                            <Award size={15} className="verified-shield-icon" />
                            <span className="verified-mini-pill">Verified</span>
                          </div>
                          <span className="verified-label">ID &amp; Photo Approved</span>
                        </div>
                      </div>

                      <div className="profile-highlights-block">
                        <span className="screen-section-label">PROFILE HIGHLIGHTS</span>

                        <div className="highlight-item-card">
                          <div className="highlight-icon-box bg-green">🌱</div>
                          <div className="highlight-text">
                            <h5>Lifestyle &amp; Diet</h5>
                            <p>Vegetarian • Yoga &amp; Travel</p>
                          </div>
                          <span className="highlight-badge badge-green">Active</span>
                        </div>

                        <div className="highlight-item-card">
                          <div className="highlight-icon-box bg-purple">🎓</div>
                          <div className="highlight-text">
                            <h5>Education &amp; Career</h5>
                            <p>M.Des • Creative Design Lead</p>
                          </div>
                          <span className="highlight-badge badge-blue">Verified</span>
                        </div>

                        <div className="highlight-item-card">
                          <div className="highlight-icon-box bg-rose">💍</div>
                          <div className="highlight-text">
                            <h5>Marriage Timeline</h5>
                            <p>Seeking marriage within 1-2 years</p>
                          </div>
                          <span className="highlight-badge badge-rose">Serious</span>
                        </div>
                      </div>

                      <button className="screen-cta-button" onClick={() => setActiveStep(1)}>
                        Save &amp; Proceed to Video Bio →
                      </button>
                    </div>
                  )}

                  {/* STEP 2 SCREEN: Video Introduction */}
                  {activeStep === 1 && (
                    <div className="screen-step screen-step-2 animate-screen-fade">
                      <div className="video-screen-header">
                        <div className="video-record-tag">
                          <span className="record-red-dot" />
                          <span>VIDEO BIO • 45s</span>
                        </div>
                        <span className="ai-badge-pill">✦ AI Verified</span>
                      </div>

                      {/* Real Video Bio Frame */}
                      <div 
                        className="video-player-frame cursor-pointer"
                        onClick={isVideoEnded ? handleReplay : toggleAudio}
                        title={isVideoEnded ? "Click to replay video" : "Click to toggle sound"}
                      >
                        <video
                          ref={videoRef}
                          src="/assets/mira_video.mp4"
                          autoPlay
                          muted={isAudioMuted}
                          playsInline
                          onEnded={() => setIsVideoEnded(true)}
                          onPlay={() => setIsVideoEnded(false)}
                          className="video-bio-media"
                        />
                        <div className="video-overlay-gradient" />

                        {/* Replay Overlay when video finishes */}
                        {isVideoEnded && (
                          <div className="video-replay-overlay animate-screen-fade">
                            <button 
                              type="button" 
                              className="video-replay-btn"
                              onClick={handleReplay}
                              title="Replay Video"
                            >
                              <RotateCcw size={15} className="replay-icon" />
                              <span>Replay</span>
                            </button>
                          </div>
                        )}

                        <div className="video-bottom-controls">
                          <div className="video-audio-wave">
                            <Mic size={14} className="mic-icon" />
                            <div className={`wave-bars ${!isAudioMuted && !isVideoEnded ? "bars-active" : ""}`}>
                              <span /><span /><span /><span /><span /><span />
                            </div>
                            <span className="video-timer">{isVideoEnded ? "0:45 / 0:45" : "0:32 / 0:45"}</span>
                          </div>

                          <button 
                            type="button" 
                            className={`video-audio-toggle-chip ${!isAudioMuted ? "active" : ""}`}
                            onClick={toggleAudio}
                            title={!isAudioMuted ? "Mute sound" : "Unmute sound"}
                            aria-label={!isAudioMuted ? "Mute sound" : "Unmute sound"}
                          >
                            {!isAudioMuted ? <Volume2 size={13} /> : <VolumeX size={13} />}
                          </button>
                        </div>
                      </div>

                      {/* Guided Prompt Card Below Video */}
                      <div className="video-prompt-below">
                        <div className="prompt-label-badge">
                          <Sparkles size={11} className="prompt-sparkle" />
                          <span>GUIDED PROMPT</span>
                        </div>
                        <p>&ldquo;Building a life that feels as good as a slow Sunday.&rdquo;</p>
                      </div>

                      <div className="video-trust-note">
                        <ShieldCheck size={14} />
                        <span>Natural video bio builds 4x higher mutual trust before first chat.</span>
                      </div>

                      <button className="screen-cta-button" onClick={() => setActiveStep(2)}>
                        Confirm Video &amp; Set Values →
                      </button>
                    </div>
                  )}

                  {/* STEP 3 SCREEN: Priority Mapping */}
                  {activeStep === 2 && (
                    <div className="screen-step screen-step-3 animate-screen-fade">
                      <div className="screen-mini-header">
                        <SlidersHorizontal size={18} className="screen-header-icon" />
                        <div>
                          <h4>Core Values &amp; Priorities</h4>
                          <p>Your non-negotiables &amp; rhythm</p>
                        </div>
                      </div>

                      <div className="priority-cards-container">
                        <div className="priority-slider-card">
                          <div className="priority-row">
                            <span className="p-title">Communication Flow</span>
                            <span className="p-val">Daily Thoughtful</span>
                          </div>
                          <div className="mock-track"><div className="mock-fill w-85" /></div>
                        </div>

                        <div className="priority-slider-card">
                          <div className="priority-row">
                            <span className="p-title">Family Integration</span>
                            <span className="p-val">High Priority</span>
                          </div>
                          <div className="mock-track"><div className="mock-fill w-90" /></div>
                        </div>

                        <div className="priority-tags-block">
                          <span className="screen-section-label">KEY PRINCIPLES</span>
                          <div className="priority-chips-grid">
                            <span className="priority-chip selected">✦ Intellectual Curiosity</span>
                            <span className="priority-chip selected">✦ Shared Financial Goals</span>
                            <span className="priority-chip selected">✦ Weekend Outdoors</span>
                            <span className="priority-chip">✦ Calm Temperament</span>
                          </div>
                        </div>
                      </div>

                      <button className="screen-cta-button" onClick={() => setActiveStep(3)}>
                        Generate AI Matrix →
                      </button>
                    </div>
                  )}

                  {/* STEP 4 SCREEN: AI Compatibility Matrix */}
                  {activeStep === 3 && (
                    <div className="screen-step screen-step-4 animate-screen-fade">
                      {matchingPhase === "scanning" ? (
                        <div className="scanner-main-card animate-screen-fade">
                          <div className="scanner-badge-pill">
                            <span className="scanner-live-dot" />
                            <Sparkles size={11} className="scanner-sparkle-icon" />
                            <span>AI NEURAL COMPATIBILITY SCAN</span>
                          </div>

                          {/* Mira & Arjun Avatars with Pulsing Energy Stage */}
                          <div className="scanner-match-stage">
                            <div className="scanner-avatar-col">
                              <div className="scanner-avatar-ring">
                                <div className="scanner-pulse-wave wave-1" />
                                <div className="scanner-pulse-wave wave-2" />
                                <div className="scanner-avatar-circle">
                                  <img src="/assets/mira.png" alt="Mira Desai" className="scanner-avatar-img" />
                                </div>
                              </div>
                              <span className="scanner-avatar-label">Mira Desai</span>
                              <span className="scanner-avatar-sub">Creative Lead</span>
                            </div>

                            <div className="scanner-bridge-col">
                              <div className="scanner-bridge-line" />
                              <div className="scanner-bridge-glow" />
                              <div className="scanner-bridge-heart">
                                <Heart size={15} fill="#e11d48" color="#e11d48" className="scanner-beating-heart" />
                              </div>
                            </div>

                            <div className="scanner-avatar-col">
                              <div className="scanner-avatar-ring">
                                <div className="scanner-pulse-wave wave-1" />
                                <div className="scanner-pulse-wave wave-2" />
                                <div className="scanner-avatar-circle">
                                  <img src="/assets/arjun.png" alt="Arjun Kapoor" className="scanner-avatar-img" />
                                </div>
                              </div>
                              <span className="scanner-avatar-label">Arjun Kapoor</span>
                              <span className="scanner-avatar-sub">Architect</span>
                            </div>
                          </div>

                          {/* Compatibility Live Counter Card */}
                          <div className="scanner-score-box">
                            <div className="scanner-score-head">
                              <span className="scanner-score-title">SYNTHESIZING COMPATIBILITY</span>
                              <span className="scanner-live-score">{scanScore}%</span>
                            </div>
                            <div className="scanner-meter-track">
                              <div
                                className="scanner-meter-fill"
                                style={{ width: `${(scanScore / 94) * 100}%` }}
                              />
                            </div>
                            <div className="scanner-live-status-row">
                              <span className="scanner-status-spinner" />
                              <p className="scanner-live-status">{scanText}</p>
                            </div>
                          </div>

                          {/* Dimension Chips Preview */}
                          <div className="scanner-chips-preview">
                            <div className={`scanner-chip-item ${scanScore >= 28 ? "active" : ""}`}>
                              <span className="chip-bullet">{scanScore >= 28 ? "✓" : "◌"}</span>
                              <span>Emotional Depth</span>
                            </div>
                            <div className={`scanner-chip-item ${scanScore >= 60 ? "active" : ""}`}>
                              <span className="chip-bullet">{scanScore >= 60 ? "✓" : "◌"}</span>
                              <span>Life Vision</span>
                            </div>
                            <div className={`scanner-chip-item ${scanScore >= 88 ? "active" : ""}`}>
                              <span className="chip-bullet">{scanScore >= 88 ? "✓" : "◌"}</span>
                              <span>Core Values</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="matrix-match-header animate-screen-fade">
                            <div className="matrix-pair-avatars">
                              <div className="avatar-chip-img-box avatar-left">
                                <img src="/assets/mira.png" alt="Mira" className="avatar-match-img" />
                              </div>
                              <div className="avatar-chip-img-box avatar-right">
                                <img src="/assets/arjun.png" alt="Arjun" className="avatar-match-img" />
                              </div>
                            </div>
                            <div className="match-score-badge">
                              <div className="score-badge-inner">
                                <span className="score-num">94%</span>
                                <span className="score-sub">COMPATIBILITY</span>
                              </div>
                              <button
                                type="button"
                                className="matrix-rescan-btn"
                                onClick={startMatchingScan}
                                title="Re-run AI Analysis"
                                aria-label="Re-run AI Analysis"
                              >
                                <RotateCcw size={10} color="#b45309" />
                                <span className="replay-btn-text">Replay</span>
                              </button>
                            </div>
                          </div>

                          <div className="matrix-breakdown-card animate-screen-fade">
                            <span className="screen-section-label">AI DIMENSION ALIGNMENT</span>
                            
                            <div className="matrix-floating-heart">
                              <Heart size={14} fill="#e0a3b0" color="#e0a3b0" />
                            </div>

                            <div className="matrix-bar-item">
                              <div className="matrix-bar-top">
                                <span>Emotional &amp; Communic...</span>
                                <strong>96%</strong>
                              </div>
                              <div className="matrix-track">
                                <div className="matrix-fill" style={{ width: "96%" }} />
                              </div>
                            </div>

                            <div className="matrix-bar-item">
                              <div className="matrix-bar-top">
                                <span>Life Vision &amp; Timeline</span>
                                <strong>94%</strong>
                              </div>
                              <div className="matrix-track">
                                <div className="matrix-fill" style={{ width: "94%" }} />
                              </div>
                            </div>

                            <div className="matrix-bar-item">
                              <div className="matrix-bar-top">
                                <span>Lifestyle Habits &amp; Routines</span>
                                <strong>91%</strong>
                              </div>
                              <div className="matrix-track">
                                <div className="matrix-fill" style={{ width: "91%" }} />
                              </div>
                            </div>
                          </div>

                          <div className="ai-insight-box animate-screen-fade">
                            <Sparkles size={16} className="sparkle-icon" />
                            <p>&ldquo;Both share a grounded, creative life vision and values around mutual respect &amp; growth.&rdquo;</p>
                          </div>

                          <button className="screen-cta-button animate-screen-fade" onClick={() => setActiveStep(4)}>
                            Proceed to Connection →
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  {/* STEP 5 SCREEN: Mutual Connection & Interactive Chat */}
                  {activeStep === 4 && (
                    <div className="screen-step screen-step-5 animate-screen-fade">
                      {/* Partner Chat Header */}
                      <div className="chat-box-header">
                        <div className="chat-header-user">
                          <div className="chat-avatar-wrapper">
                            <img src="/assets/arjun.png" alt="Arjun" className="chat-avatar-img" />
                            <span className="chat-online-dot" />
                          </div>
                          <div className="chat-header-info">
                            <div className="chat-header-name-row">
                              <h5>Arjun</h5>
                              <span className="chat-verified-badge">✓ 94% Match</span>
                            </div>
                            <p className="chat-header-status">Active now · Online</p>
                          </div>
                        </div>
                        <div className="chat-header-lock">
                          <ShieldCheck size={11} color="#047857" />
                          <span>Private</span>
                        </div>
                      </div>

                      {/* Date Divider */}
                      <div className="chat-date-pill">
                        <span>Today</span>
                      </div>

                      {/* Simulated Chat Thread */}
                      <div className="chat-box-thread">
                        {/* Arjun Left Bubble */}
                        <div className="chat-msg chat-msg-left">
                          <div className="msg-bubble-content left-bubble">
                            <p>Hey Mira! Loved reading through your profile.</p>
                            <span className="msg-time">10:40 AM</span>
                          </div>
                        </div>

                        {/* Mira Right Bubble */}
                        <div className="chat-msg chat-msg-right">
                          <div className="msg-bubble-content right-bubble">
                            <p>Hey Arjun! Thanks, your architecture work in Dubai looks amazing.</p>
                            <span className="msg-time">10:42 AM · Read ✓✓</span>
                          </div>
                        </div>

                        {/* Arjun Left Bubble */}
                        <div className="chat-msg chat-msg-left">
                          <div className="msg-bubble-content left-bubble">
                            <p>Coffee, a quiet bookshop, and no alarms on Sundays?</p>
                            <span className="msg-time">10:43 AM</span>
                          </div>
                        </div>

                        {/* Mira Right Bubble */}
                        <div className="chat-msg chat-msg-right">
                          <div className="msg-bubble-content right-bubble">
                            <p>I’m in! But I’ll probably have a bookshop picked out already 📚</p>
                            <span className="msg-time">10:44 AM · Read ✓✓</span>
                          </div>
                        </div>

                        {/* Arjun Left Bubble */}
                        <div className="chat-msg chat-msg-left">
                          <div className="msg-bubble-content left-bubble">
                            <p>You plan. I’ll find the coffee. ☕✨</p>
                            <span className="msg-time">10:45 AM</span>
                          </div>
                        </div>

                        {/* Arjun Typing Indicator (Classic 3 dots) */}
                        <div className="chat-msg chat-msg-left animate-screen-fade">
                          <div className="msg-bubble-content left-bubble typing-bubble">
                            <span className="typing-dots">
                              <span className="typing-dot" />
                              <span className="typing-dot" />
                              <span className="typing-dot" />
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Simulated Chat Input Bar */}
                      <div className="chat-box-input-row" onClick={onOpenJourney}>
                        <span className="chat-mock-placeholder">Type a thoughtful reply…</span>
                        <button type="button" className="chat-send-btn" aria-label="Send message">
                          <Send size={11} color="#ffffff" />
                        </button>
                      </div>

                      {/* Direct CTA */}
                      <button className="screen-cta-button chat-connect-cta" onClick={onOpenJourney}>
                        <MessageCircle size={13} className="btn-chat-icon" />
                        <span>Start Safe Conversation</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Bottom Home Indicator */}
                <div className="phone-home-indicator" />
              </div>
            </div>
          </div>

          {/* Right Column: Step-by-Step Accordion Cards */}
          <div className="steps-list-wrapper">
            {STEPS.map((step, idx) => {
              const isExpanded = expandedStep === idx;
              const isSelected = activeStep === idx;

              return (
                <div
                  key={step.id}
                  className={`step-interactive-card ${isExpanded ? "active" : ""}`}
                  onClick={() => {
                    const next = expandedStep === idx ? null : idx;
                    setExpandedStep(next);
                    setActiveStep(idx);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isExpanded}
                >
                  {/* Top Row: Title, Badge & Chevron */}
                  <div className="step-card-header">
                    <div className="step-title-group">
                      <span className="step-number-dot">{step.id}</span>
                      <h3 className="step-main-title">{step.title}</h3>
                    </div>
                    <div className="step-header-right">
                      <span className="step-badge-tag">{step.badge}</span>
                      <ChevronDown 
                        size={16} 
                        className={`step-chevron-icon ${isExpanded ? "rotated" : ""}`} 
                      />
                    </div>
                  </div>

                  {/* Expanded Content for Active Step */}
                  {isExpanded && (
                    <div className="step-card-body animate-accordion-down">
                      <p className="step-description">{step.description}</p>
                      
                      <div className="step-points-grid">
                        {step.points.map((point, pIdx) => (
                          <div key={pIdx} className="step-point-item">
                            <CheckCircle2 size={16} className="step-check-icon" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bottom Actions */}
            <div className="profile-steps-actions">
              <Link 
                href="/register/step-1"
                className="profile-steps-cta-btn" 
              >
                <span>Begin Your Profile Creation</span>
                <ArrowRight size={18} className="cta-arrow-icon" />
              </Link>
              <div className="steps-trust-badge">
                <span className="trust-sparkle">✦</span>
                <span>100% verified profiles · No public photo swiping · Thoughtful matching</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
