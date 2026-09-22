"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Heart,
  Sparkles,
  ShieldCheck,
  Compass,
  Scale,
  BrainCircuit,
  Lock,
  Flame,
  CheckCircle2,
  XCircle,
  Clock,
  Coffee,
  Building2,
  Users2,
  Gem,
  BookOpen,
  MessageCircleHeart,
  Layers,
  Sparkle,
  SlidersHorizontal
} from "lucide-react";
import "./beyond-spark.css";

// 5 Pillars Data - Visual-First Matrimonial Synergy Architecture
const PILLARS_DATA = [
  {
    id: "conflict",
    num: "01",
    tabLabel: "Emotional Safety",
    title: "Emotional Safety & Conflict Recovery",
    oneLiner: "How safely and gently you return to each other after tough moments.",
    icon: ShieldCheck,
    tag: "Repair Capacity",
    img: "/assets/pillar_couple_01.jpg",
    couple: "Arjun & Maya",
    city: "Mumbai · Married 2 Years",
    matchScore: "98% Emotional Sync",
    synergyScore: 98,
    metrics: [
      { label: "Conflict Recovery", value: "15 min", badge: "Fast Repair", detail: "Swift gentle recovery vs 3 days silent distance", pct: 98 },
      { label: "Vulnerability Trust", value: "100%", badge: "Zero Judgment", detail: "Safe haven where honest fears can be spoken freely", pct: 100 },
      { label: "Bedtime Closure", value: "100%", badge: "No Grudges", detail: "Differences resolved with warmth before sleeping", pct: 96 }
    ],
    scenario: {
      trigger: "When high work stress triggers a disagreement",
      regularDating: "Defensive reactions, misread tones & days of cold silent treatment.",
      aiMarriage: "Instant emotional safety, 15-minute de-escalation & peaceful reconnect."
    },
    quote: "“We learned that de-escalation takes 15 minutes of calm listening instead of 3 days of silence.”"
  },
  {
    id: "financial",
    num: "02",
    tabLabel: "Financial Cadence",
    title: "Wealth Harmony & Shared Ambition",
    oneLiner: "Aligning spending, wealth building, and enterprise risk without tension.",
    icon: Scale,
    tag: "Resource Philosophy",
    img: "/assets/pillar_couple_02.jpg",
    couple: "Vihaan & Kiara",
    city: "Delhi · Married 3 Years",
    matchScore: "96% Wealth Horizon",
    synergyScore: 96,
    metrics: [
      { label: "40-Year Horizon", value: "Unified", badge: "Shared Vision", detail: "Harmonized long-term domestic security & investment map", pct: 96 },
      { label: "Lifestyle Cadence", value: "Zero Guilt", badge: "Fluid Flow", detail: "Aligned spending, travel & family support without friction", pct: 94 },
      { label: "Career Partnership", value: "100%", badge: "True Allies", detail: "Championing each other's ambition with zero rivalry", pct: 98 }
    ],
    scenario: {
      trigger: "Making major life investments or career pivots",
      regularDating: "Hidden anxiety, conflicting spending habits & unspoken power struggles.",
      aiMarriage: "Exciting joint strategy sessions with total mutual transparency & trust."
    },
    quote: "“Talking about money became an exciting blueprint for our future instead of an unspoken stress.”"
  },
  {
    id: "cadence",
    num: "03",
    tabLabel: "Daily Rhythm",
    title: "Lifestyle Cadence & Domestic Peace",
    oneLiner: "Lifelong marriage thrives in Tuesday dinners and peaceful Sunday mornings.",
    icon: Coffee,
    tag: "Everyday Harmony",
    img: "/assets/pillar_couple_03.jpg",
    couple: "Dev & Ananya",
    city: "Bengaluru · Matched 2024",
    matchScore: "95% Daily Harmony",
    synergyScore: 95,
    metrics: [
      { label: "Morning & Night Pace", value: "In Sync", badge: "Natural Flow", detail: "Effortless tea, breakfast & bedtime winding-down rhythm", pct: 95 },
      { label: "Social Recharge", value: "Balanced", badge: "Zero Burnout", detail: "Harmonizing quiet personal space and warm social hosting", pct: 93 },
      { label: "Domestic Rituals", value: "Daily", badge: "Quiet Comfort", detail: "Cooking together & recharging side-by-side with ease", pct: 97 }
    ],
    scenario: {
      trigger: "Unwinding on a quiet weekend or hectic weekday",
      regularDating: "Clashing social batteries, domestic friction & feeling overwhelmed.",
      aiMarriage: "Organic balance of joyful companionship and restorative stillness."
    },
    quote: "“Our domestic rhythms clicked naturally—from making morning tea to recharging in silence.”"
  },
  {
    id: "family",
    num: "04",
    tabLabel: "Familial Grace",
    title: "Familial Grace & Sacred Boundaries",
    oneLiner: "Two lineages united with deep warmth while honoring couple privacy.",
    icon: Users2,
    tag: "Lineage & Culture",
    img: "/assets/pillar_couple_04.jpg",
    couple: "Siddharth & Meera",
    city: "Jaipur · Verified Union",
    matchScore: "97% Lineage Bond",
    synergyScore: 97,
    metrics: [
      { label: "Heritage Reverence", value: "Warmth", badge: "Deep Honor", detail: "Respecting elders and cultural roots with genuine affection", pct: 98 },
      { label: "Couple Sanctum", value: "Protected", badge: "Clear Sanctum", detail: "Major life choices remain sacred between husband & wife", pct: 96 },
      { label: "Next-Gen Values", value: "Aligned", badge: "Shared Ethics", detail: "Unified foundation for raising grounded future generations", pct: 97 }
    ],
    scenario: {
      trigger: "Navigating family traditions & key life decisions",
      regularDating: "In-law tension, feeling torn between partner and parental expectations.",
      aiMarriage: "Deep family reverence with clear, loving couple boundaries."
    },
    quote: "“Both families felt deeply cherished while our sacred couple bond remained fully protected.”"
  },
  {
    id: "vision",
    num: "05",
    tabLabel: "Shared Future",
    title: "Life Architecture & Shared North Star",
    oneLiner: "Looking outward in the same direction—an invincible lifelong team.",
    icon: Compass,
    tag: "Shared Horizon",
    img: "/assets/pillar_couple_05.jpg",
    couple: "Kabir & Rhea",
    city: "Dubai · Married 2 Years",
    matchScore: "99% Life Vector",
    synergyScore: 99,
    metrics: [
      { label: "30-Year Destination", value: "100%", badge: "Same Vector", detail: "Unified life vision, spiritual grounding & family dreams", pct: 99 },
      { label: "Living & Geography", value: "Agreed", badge: "Mutual Dream", detail: "Shared consensus on hometown roots vs global mobility", pct: 98 },
      { label: "Invincible Bond", value: "Resilient", badge: "Unshakable", detail: "Facing every life phase and challenge as an indivisible unit", pct: 100 }
    ],
    scenario: {
      trigger: "Planning life milestones over the next 10 to 30 years",
      regularDating: "Realizing divergent geographical or career priorities years too late.",
      aiMarriage: "Pre-verified vector ensuring every milestone builds toward one dream."
    },
    quote: "“We wake up every morning knowing our 30-year life vectors are pointing in the exact same direction.”"
  }
];

// Matrix Comparison Data: Other Matrimony Apps (Superficial Swiping) vs AI Marriage
const DATING_SWIPE_CARDS = [
  {
    id: "rohan",
    num: "01",
    name: "Rohan, 28",
    role: "Tech Lead · Mumbai",
    distance: "Filter Match: Salary ₹35L+",
    img: "/assets/pitfall-casual-intent.jpg",
    quote: "“Biodata looks perfect on paper, but zero clue about conflict resolution style.”",
    pitfallTitle: "Paper-Thin Biodata",
    pitfallDesc: "Matches surface checklist without emotional resonance",
    tag: "Checklist Sort"
  },
  {
    id: "kabir",
    num: "02",
    name: "Kabir, 29",
    role: "Finance VP · Delhi",
    distance: "100+ Profiles Swiped Today",
    img: "/assets/pitfall-speed-swipe.jpg",
    quote: "“Swiping through profiles like a shopping catalog, judging life partners in 3 seconds.”",
    pitfallTitle: "Superficial Photo Swiping",
    pitfallDesc: "Treats sacred marriage choice like an endless retail feed",
    tag: "Catalog Mode"
  },
  {
    id: "sameer",
    num: "03",
    name: "Sameer, 31",
    role: "Founder · Bengaluru",
    distance: "Horoscope & Caste Match",
    img: "/assets/pitfall-value-clash.jpg",
    quote: "“Families matched filters, but daily life rhythms and values clashed completely.”",
    pitfallTitle: "Hidden Values Clash",
    pitfallDesc: "Critical lifestyle & financial friction discovered after marriage",
    tag: "Surface Filter"
  },
  {
    id: "aryan",
    num: "04",
    name: "Aryan, 27",
    role: "Architect · Dubai",
    distance: "Public Directory Profile",
    img: "/assets/pitfall-privacy-worry.jpg",
    quote: "“Private contact details & family photos exposed to thousands of random strangers.”",
    pitfallTitle: "Zero Privacy Shield",
    pitfallDesc: "Personal photos & numbers circulated publicly without consent",
    tag: "Public Exposure"
  }
];

const SYNERGY_POINTS = [
  {
    id: "intent",
    num: "01",
    tabLabel: "01 Intent",
    img: "/assets/solution-verified-intent.jpg",
    coupleName: "Arjun & Maya",
    coupleTag: "✦ Verified Intent",
    title: "100% Matrimonial Intent",
    desc: "Pre-screened for marriage readiness & family values",
    highlight: "100% Verified Intent",
    score: "98% Intent Sync",
    quote: "“Both partners ready for lifelong commitment — zero casual ghosting”",
    vectors: [
      { icon: "🛡️", label: "Intent Readiness", score: "100%" },
      { icon: "💎", label: "Family Grace", score: "98%" },
      { icon: "🌿", label: "Commitment", score: "100%" }
    ]
  },
  {
    id: "alignment",
    num: "02",
    tabLabel: "02 Synergy",
    img: "/assets/complementary-home.jpg",
    coupleName: "Vihaan & Kiara",
    coupleTag: "✦ Lifelong Synergy",
    title: "Cognitive Synergy & Safety",
    desc: "Matched conflict recovery pace & emotional vulnerability",
    highlight: "96% Synergy Alignment",
    score: "96% Emotional Match",
    quote: "“Complementary de-escalation rhythm and mutual emotional respect”",
    vectors: [
      { icon: "🛡️", label: "Emotional Safety", score: "100%" },
      { icon: "⚡", label: "Conflict Repair", score: "15 Min" },
      { icon: "🌿", label: "Zero Grudges", score: "100%" }
    ]
  },
  {
    id: "realities",
    num: "03",
    tabLabel: "03 Realities",
    img: "/assets/solution-shared-horizon.jpg",
    coupleName: "Dev & Ananya",
    coupleTag: "✦ Horizon Sync",
    title: "Pre-Harmonized Realities",
    desc: "Aligned financial cadence, lifestyle & familial grace",
    highlight: "Shared 40-Year Horizon",
    score: "95% Life Horizon",
    quote: "“Unified wealth horizons, domestic pace & generational harmony”",
    vectors: [
      { icon: "💎", label: "Wealth Cadence", score: "96%" },
      { icon: "🏡", label: "Domestic Pace", score: "In Sync" },
      { icon: "🧭", label: "40-Yr Horizon", score: "100%" }
    ]
  },
  {
    id: "vault",
    num: "04",
    tabLabel: "04 Privacy",
    img: "/assets/complementary-travel.jpg",
    coupleName: "Siddharth & Meera",
    coupleTag: "✦ Vault Protected",
    title: "Vault-Grade Privacy Shield",
    desc: "Double-blind mutual consent before any profile reveal",
    highlight: "256-Bit Encrypted Vault",
    score: "100% Vault Safe",
    quote: "“Full photo & identity locked until both partners mutually consent”",
    vectors: [
      { icon: "🔒", label: "256-Bit Vault", score: "Active" },
      { icon: "👁️", label: "Public Search", score: "0%" },
      { icon: "🛡️", label: "Private Intro", score: "100%" }
    ]
  }
];

// -------------------------------------------------------------
// -------------------------------------------------------------
// COORDINATED PHONE COMPARISON MATRIX (6-SEC LOOP + FLYING TRANSFORMATION)
// -------------------------------------------------------------
function PhoneMatrixShowcase({
  currentIndex,
  onIndexChange,
}: {
  currentIndex: number;
  onIndexChange: (idx: number) => void;
}) {
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | "up" | null>(null);
  const [isFlying, setIsFlying] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [flyingCard, setFlyingCard] = useState(DATING_SWIPE_CARDS[0]);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Trigger full flying transition from Left Phone to Right Phone
  const triggerTransition = (targetIndex: number, direction: "right" | "left" = "right") => {
    const swipedCard = DATING_SWIPE_CARDS[currentIndex];
    setFlyingCard(swipedCard);
    setSwipeDirection(direction);
    setIsFlying(true); // Launch flight simultaneously as left card swipes out

    // 1. Flying card travels across with motion blur and slides behind right phone
    setTimeout(() => {
      setIsFlying(false);
      setSwipeDirection(null);
    }, 850);

    // 2. Wait 1 full second (1000ms pause) behind the right phone before laser scan begins
    setTimeout(() => {
      onIndexChange(targetIndex);
      setIsScanning(true);
    }, 1850);

    // 3. Complete laser scanning on right phone and reveal deep synergy match
    setTimeout(() => {
      setIsScanning(false);
    }, 3100);
  };

  // 6-Second Auto-Looping Animation
  useEffect(() => {
    timerRef.current = setInterval(() => {
      const nextIdx = (currentIndex + 1) % DATING_SWIPE_CARDS.length;
      triggerTransition(nextIdx, "right");
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex]);

  const handleManualNext = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const nextIdx = (currentIndex + 1) % DATING_SWIPE_CARDS.length;
    triggerTransition(nextIdx, "right");
  };

  const handleManualPrev = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const prevIdx = (currentIndex - 1 + DATING_SWIPE_CARDS.length) % DATING_SWIPE_CARDS.length;
    triggerTransition(prevIdx, "left");
  };

  const handleTabClick = (idx: number) => {
    if (idx === currentIndex) return;
    if (timerRef.current) clearInterval(timerRef.current);
    triggerTransition(idx, "right");
  };

  // Touch & Mouse Drag Handlers for Left Phone
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (swipeDirection || isFlying) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    isDraggingRef.current = true;
    startPos.current = { x: e.clientX, y: e.clientY };
    setDragOffset({ x: 0, y: 0 });
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || swipeDirection || isFlying) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    setDragOffset({ x: dx, y: dy });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    const dx = e.clientX - startPos.current.x;
    if (dx > 40) {
      handleManualNext();
    } else if (dx < -40) {
      handleManualPrev();
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const currentLeftCard = DATING_SWIPE_CARDS[currentIndex];
  const cardLayer1 = DATING_SWIPE_CARDS[(currentIndex + 1) % DATING_SWIPE_CARDS.length];
  const cardLayer2 = DATING_SWIPE_CARDS[(currentIndex + 2) % DATING_SWIPE_CARDS.length];
  const cardLayer3 = DATING_SWIPE_CARDS[(currentIndex + 3) % DATING_SWIPE_CARDS.length];
  const currentRightPoint = SYNERGY_POINTS[currentIndex];

  const isDraggingActive = dragOffset.x !== 0 || dragOffset.y !== 0;
  const dragLikeOpacity = !swipeDirection && dragOffset.x > 15 ? Math.min(1, dragOffset.x / 50) : 0;
  const dragNopeOpacity = !swipeDirection && dragOffset.x < -15 ? Math.min(1, -dragOffset.x / 50) : 0;

  const cardStyle: React.CSSProperties | undefined = isDraggingActive && !swipeDirection
    ? {
        transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) rotate(${dragOffset.x * 0.08}deg)`,
        transition: "none",
        cursor: "grabbing",
        willChange: "transform"
      }
    : undefined;

  return (
    <div className="bts-phone-matrix-showcase">
      {/* Central Ethereal Flying Card Bridge Overlay */}
      {isFlying && (
        <div className="bts-flying-bridge-container">
          <div className="bts-flying-card-particle-aura" />
          <div className="bts-flying-card-body">
            <img src={flyingCard.img} alt={flyingCard.name} className="bts-flying-photo" />
            <div className="bts-flying-scan-badge">
              <Sparkles size={11} className="animate-spin text-amber-300" />
              <span>AI Transforming to Deep Synergy...</span>
            </div>
          </div>
          {/* Glowing particle trail sparkles */}
          <span className="bts-particle p1">✧</span>
          <span className="bts-particle p2">✦</span>
          <span className="bts-particle p3">✨</span>
        </div>
      )}

      {/* LEFT PHONE: SUPERFICIAL FILTER SWIPING */}
      <div className="bts-phone-column">
        <div className="bts-phone-pill-tag swipe-pill">
          <XCircle size={14} /> Superficial Browsing (Other Matrimony Apps)
        </div>

        <div className="bts-phone-device phone-swipe-theme">
          <div className="bts-phone-notch-bar">
            <span className="bts-phone-time">5:15</span>
            <div className="bts-phone-island" />
            <div className="bts-phone-status-icons">
              <span className="bts-signal-bar" />
              <span className="bts-battery-icon" />
            </div>
          </div>

          <div className="bts-phone-app-header swipe-app-header">
            <span className="bts-app-sub">Swipe &amp; Filter · Surface Biodata</span>
            <span className="bts-swipe-counter-badge">{currentIndex + 1} / {DATING_SWIPE_CARDS.length}</span>
          </div>

          <div className="bts-phone-screen-content bts-single-card-deck-screen">
            <div className="bts-card-stack-viewport">
              {/* Layer 3 */}
              <div className="bts-deck-stack-card bts-deck-layer-3">
                <div className="bts-card-image-wrap">
                  <img src={cardLayer3.img} alt={cardLayer3.name} className="bts-card-photo" draggable={false} />
                </div>
                <div className="bts-card-info-pane">
                  <div className="bts-swipe-profile-header">
                    <h4>{cardLayer3.name}</h4>
                    <span className="bts-swipe-role-tag">{cardLayer3.role}</span>
                  </div>
                </div>
              </div>

              {/* Layer 2 */}
              <div className="bts-deck-stack-card bts-deck-layer-2">
                <div className="bts-card-image-wrap">
                  <img src={cardLayer2.img} alt={cardLayer2.name} className="bts-card-photo" draggable={false} />
                </div>
                <div className="bts-card-info-pane">
                  <div className="bts-swipe-profile-header">
                    <h4>{cardLayer2.name}</h4>
                    <span className="bts-swipe-role-tag">{cardLayer2.role}</span>
                  </div>
                </div>
              </div>

              {/* Layer 1 */}
              <div className="bts-deck-stack-card bts-deck-layer-1">
                <div className="bts-card-image-wrap">
                  <img src={cardLayer1.img} alt={cardLayer1.name} className="bts-card-photo" draggable={false} />
                  <div className="bts-swipe-card-badge">
                    <span>{cardLayer1.distance}</span>
                  </div>
                </div>
                <div className="bts-card-info-pane">
                  <div className="bts-swipe-profile-header">
                    <h4>{cardLayer1.name}</h4>
                    <span className="bts-swipe-role-tag">{cardLayer1.role}</span>
                  </div>
                  <p className="bts-swipe-bio-quote">{cardLayer1.quote}</p>
                </div>
              </div>

              {/* Layer 0: Active Top Card with Swipe Out animation */}
              <div
                className={`bts-deck-top-card ${
                  swipeDirection === "left"
                    ? "fly-out-left"
                    : swipeDirection === "right"
                    ? "fly-out-right"
                    : ""
                }`}
                style={cardStyle}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                title="Drag or use buttons to swipe"
              >
                <div className="bts-card-image-wrap">
                  <img src={currentLeftCard.img} alt={currentLeftCard.name} className="bts-card-photo" draggable={false} />
                  
                  <div className="bts-swipe-card-badge">
                    <span>{currentLeftCard.distance}</span>
                  </div>

                  {(swipeDirection === "right" || dragLikeOpacity > 0) && (
                    <div className="bts-swipe-stamp stamp-like" style={{ opacity: swipeDirection === "right" ? 1 : dragLikeOpacity }}>
                      LIKE
                    </div>
                  )}
                  {(swipeDirection === "left" || dragNopeOpacity > 0) && (
                    <div className="bts-swipe-stamp stamp-nope" style={{ opacity: swipeDirection === "left" ? 1 : dragNopeOpacity }}>
                      PASS
                    </div>
                  )}
                </div>

                <div className="bts-card-info-pane">
                  <div className="bts-swipe-profile-header">
                    <div className="bts-profile-name-row">
                      <h4>{currentLeftCard.name}</h4>
                      <span className="bts-casual-chip">{currentLeftCard.tag || "Casual Match"}</span>
                    </div>
                    <span className="bts-swipe-role-tag">📍 {currentLeftCard.role}</span>
                  </div>

                  <div className="bts-bio-quote-container">
                    <p className="bts-swipe-bio-quote">{currentLeftCard.quote}</p>
                  </div>

                  <div className="bts-card-pitfall-alert">
                    <div className="bts-pitfall-alert-head">
                      <XCircle size={12} className="text-rose-600 shrink-0" />
                      <strong>{currentLeftCard.pitfallTitle}</strong>
                    </div>
                    <span>{currentLeftCard.pitfallDesc}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls with Loop Cue */}
            <div className="bts-swipe-nav-row">
              <button
                type="button"
                className="bts-swipe-nav-btn bts-swipe-prev-btn"
                onClick={handleManualPrev}
                disabled={swipeDirection !== null || isFlying}
                title="Previous Profile"
              >
                <ArrowLeft size={12} />
                <span>Prev</span>
              </button>

              <div className="bts-swipe-deck-indicator">
                <span>{currentIndex + 1} / {DATING_SWIPE_CARDS.length}</span>
                <span className="bts-swipe-cue-text">Auto 6s ↻</span>
              </div>

              <button
                type="button"
                className="bts-swipe-nav-btn bts-swipe-next-btn"
                onClick={handleManualNext}
                disabled={swipeDirection !== null || isFlying}
                title="Next Profile (Swipe &amp; Transform)"
              >
                <span>Next</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>

          <div className="bts-phone-bottom-indicator" />
        </div>

        <div className="bts-phone-caption-summary">
          <h4>Designed for Endless Scrolling</h4>
          <p>Generic filters and photo-swiping loops that keep you searching without ever uncovering real emotional compatibility.</p>
        </div>
      </div>

      {/* RIGHT PHONE: AI COMPATIBILITY & LASER SCANNING */}
      <div className="bts-phone-column">
        <div className="bts-phone-pill-tag synergy-pill">
          <CheckCircle2 size={14} /> Deep Resonance (AI Marriage)
        </div>

        <div className="bts-phone-device phone-synergy-theme">
          <div className="bts-phone-notch-bar">
            <span className="bts-phone-time">5:15</span>
            <div className="bts-phone-island" />
            <div className="bts-phone-status-icons">
              <span className="bts-signal-bar" />
              <span className="bts-battery-icon" />
            </div>
          </div>

          <div className="bts-phone-app-header synergy-app-header">
            <span className="bts-app-sub">Synergy AI · 40-Year Harmony Matrix</span>
            <span className="bts-swipe-counter-badge">{currentIndex + 1} / {SYNERGY_POINTS.length}</span>
          </div>

          <div className="bts-phone-screen-content bts-synergy-deck-screen">
            <div className="bts-card-stack-viewport">
              <div
                key={currentIndex}
                className={`bts-synergy-feature-card ${isScanning ? "bts-card-landing" : "bts-synergy-fade-in"}`}
                onClick={handleManualNext}
                title="Click to advance synergy profile"
              >
                <div className="bts-card-image-wrap">
                  <img
                    src={currentRightPoint.img}
                    alt={currentRightPoint.title}
                    className={`bts-card-photo ${isScanning ? "scanning-photo" : ""}`}
                    draggable={false}
                  />

                  {/* AI Laser Scanning Beam & Holographic Overlay */}
                  {isScanning && (
                    <div className="bts-ai-scan-laser-overlay">
                      <div className="bts-ai-laser-line" />
                      <div className="bts-ai-scanning-pill">
                        <Sparkles size={11} className="animate-spin text-amber-300" />
                        <span>AI Decoding 40-Yr Synergy...</span>
                      </div>
                    </div>
                  )}

                  <div className={`bts-synergy-badge-top-left ${isScanning ? "opacity-0" : ""}`}>
                    <Sparkles size={10} className="text-amber-300" />
                    <span>{currentRightPoint.score}</span>
                  </div>
                  <div className={`bts-synergy-badge-top-right ${isScanning ? "opacity-0" : ""}`}>
                    <span>🛡️ Verified Match</span>
                  </div>
                </div>

                <div className="bts-card-info-pane synergy-info-pane">
                  <div className="bts-swipe-profile-header">
                    <div className="bts-profile-name-row">
                      <h4>{currentRightPoint.coupleName}</h4>
                      <span className="bts-synergy-verified-chip">{currentRightPoint.coupleTag}</span>
                    </div>
                    <span className="bts-swipe-role-tag synergy-role-tag">{currentRightPoint.highlight}</span>
                  </div>

                  {currentRightPoint.vectors && (
                    <div className="bts-ai-vectors-grid">
                      {currentRightPoint.vectors.map((vec, vIdx) => (
                        <div key={vIdx} className="bts-ai-vector-badge">
                          <span className="vector-icon">{vec.icon}</span>
                          <span className="vector-label">{vec.label}</span>
                          <span className="vector-score">{vec.score}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="bts-bio-quote-container synergy-quote-container">
                    <p className="bts-swipe-bio-quote synergy-bio-quote">{currentRightPoint.quote}</p>
                  </div>

                  <div className="bts-card-solution-alert">
                    <div className="bts-solution-alert-head">
                      <CheckCircle2 size={12} className="text-emerald-600 shrink-0" />
                      <strong>{currentRightPoint.title}</strong>
                    </div>
                    <span>{currentRightPoint.desc}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Interactive Synergy Selection Tabs */}
            <div className="bts-synergy-tabs-row">
              {SYNERGY_POINTS.map((item, idx) => (
                <button
                  key={item.id}
                  className={`bts-synergy-tab-btn ${currentIndex === idx ? "active-tab" : ""}`}
                  onClick={() => handleTabClick(idx)}
                  title={item.title}
                >
                  {item.tabLabel}
                </button>
              ))}
            </div>

            <div className="bts-aim-action-wrap">
              <Link href="/register/step-1" className="bts-aim-phone-btn">
                <Lock size={12} />
                <span>Begin Private Dialogue</span>
                <ArrowRight size={12} />
              </Link>
              <span className="bts-aim-secure-note">🛡️ Protected by 256-bit Encrypted Vault</span>
            </div>
          </div>

          <div className="bts-phone-bottom-indicator" />
        </div>

        <div className="bts-phone-caption-summary">
          <h4>Engineered for Lifelong Synergy</h4>
          <p>Scientific alignment across 14 emotional, lifestyle, and financial vectors to ensure permanent marital harmony.</p>
        </div>
      </div>
    </div>
  );
}

// Realistic Braided Sacred Wedding Rope (Shadi Ki Dori) SVG Component
function SacredRopeBridge({ id }: { id: string }) {
  return (
    <div className="bts-sacred-rope-bridge">
      <svg
        width="60"
        height="36"
        viewBox="0 0 60 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="bts-sacred-rope-svg"
      >
        <defs>
          <linearGradient id={`goldGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="35%" stopColor="#f59e0b" />
            <stop offset="75%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <linearGradient id={`redSilk-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#881337" />
            <stop offset="30%" stopColor="#be123c" />
            <stop offset="50%" stopColor="#e11d48" />
            <stop offset="70%" stopColor="#be123c" />
            <stop offset="100%" stopColor="#881337" />
          </linearGradient>
          <filter id={`ropeGlow-${id}`} x="-20%" y="-20%" width="140%" height="160%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#4c0519" floodOpacity="0.38" />
          </filter>
        </defs>

        <g filter={`url(#ropeGlow-${id})`}>
          {/* Base Red Silk Thick Twisted Cord with natural sag curve */}
          <path
            d="M 0 16 C 18 22, 42 22, 60 16"
            stroke={`url(#redSilk-${id})`}
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* Braided Golden Zari Ribbon Twisted Around the Cord */}
          <path
            d="M 0 16 C 18 22, 42 22, 60 16"
            stroke={`url(#goldGrad-${id})`}
            strokeWidth="4.5"
            strokeDasharray="5 5"
            strokeLinecap="round"
          />
          {/* Shimmer Highlight Filament */}
          <path
            d="M 0 15 C 18 21, 42 21, 60 15"
            stroke="#fffbeb"
            strokeWidth="1.8"
            strokeDasharray="3 7"
            strokeLinecap="round"
          />
        </g>

        {/* Center Auspicious Golden Granthi / Knot Ring */}
        <circle cx="30" cy="19" r="7.5" fill={`url(#goldGrad-${id})`} stroke="#78350f" strokeWidth="1" />
        <circle cx="30" cy="19" r="3.2" fill="#fffbeb" />
        {/* Dangling Golden Tassel beneath Knot */}
        <path d="M 30 26.5 L 30 33 M 27 33 L 33 33" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

const HERO_VIDEOS = [
  {
    id: "dubai",
    title: "Dubai",
    src: "/assets/heroPart.mp4",
  },
  {
    id: "traditional",
    title: "India",
    src: "/assets/hero-wedding.mp4",
  },
];

export default function BeyondTheSparkPage() {
  const [activeHeroVideo, setActiveHeroVideo] = useState<"dubai" | "traditional">("dubai");
  const [activePillar, setActivePillar] = useState(0);
  const [pillarViewMode, setPillarViewMode] = useState<"metrics" | "scenario">("metrics");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [matrixIndex, setMatrixIndex] = useState(0);

  // Smooth Touch & Mouse Swipe Carousel for 5 Pillars (2 Full Cards + 2 Halves)
  const [pillarsEmblaRef, pillarsEmblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
    dragFree: false,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const scrollPillars = (direction: "left" | "right") => {
    if (pillarsEmblaApi) {
      if (direction === "left") {
        pillarsEmblaApi.scrollPrev();
      } else {
        pillarsEmblaApi.scrollNext();
      }
    }
  };

  return (
    <div className="beyond-spark-page">
      {/* 1. TOP EDITORIAL NAVIGATION */}
      <header className="bts-nav-header">
        <div className="bts-nav-container">
          <Link href="/" className="bts-back-btn">
            <ArrowLeft size={16} />
            <span>Return to AI Marriage</span>
          </Link>
          <div className="bts-brand-center">
            <Heart size={16} className="bts-brand-heart" />
            <span className="bts-brand-name">
              ai marriage<span className="brand-dot">.</span>
            </span>
          </div>
          <Link href="/register/step-1" className="bts-nav-cta">
            Begin Journey <ArrowUpRight size={14} />
          </Link>
        </div>
      </header>

      {/* 2. HERO SECTION: WIDESCREEN CINEMA ON TOP + EDITORIAL BELOW */}
      <section className="bts-hero-section" id="hero">
        <div className="bts-hero-ambient-glow" />
        <div className="bts-hero-container">
          {/* Top: Full-Width Cinematic Wedding Video with Heading at Bottom */}
          <div className="bts-hero-cinema-top">
            <div className="bts-cinema-frame">
              {/* Interactive Video Switcher (Dubai vs Royal) */}
              <div className="bts-video-switcher-wrap">
                {HERO_VIDEOS.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    className={`bts-video-switcher-btn ${activeHeroVideo === v.id ? "active" : ""}`}
                    onClick={() => setActiveHeroVideo(v.id as "dubai" | "traditional")}
                  >
                    <span>{v.title}</span>
                  </button>
                ))}
              </div>

              <video
                key={activeHeroVideo}
                className="bts-showcase-video"
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
                disableRemotePlayback
                controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
              >
                <source
                  src={HERO_VIDEOS.find((v) => v.id === activeHeroVideo)?.src || "/assets/heroPart.mp4"}
                  type="video/mp4"
                />
              </video>
              <div className="bts-video-vignette-overlay" />
              <div className="bts-video-bottom-heading">
                <h1 className="bts-hero-title">
                  A spark ignites a room.
                  <br />
                  <em>Shared values build a lifetime.</em>
                </h1>
              </div>
            </div>
          </div>

          {/* Below: Editorial Story & Actions */}
          <div className="bts-hero-text-col">
            <p className="bts-hero-lead">
              In modern dating, spark is often mistaken for compatibility. But chemistry
              attracts people in moments—it is emotional safety, conflict architecture,
              and shared life cadence that keep two souls thriving through decades.
            </p>
            <div className="bts-hero-actions">
              <Link href="/register/step-1" className="bts-primary-btn">
                Start Your Private Profile <ArrowRight size={16} />
              </Link>
              <a href="#matrix" className="bts-secondary-btn">
                Explore The Synergy Matrix
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION: THE MATRIX (MOBILE PHONE COMPARISON FORMAT) */}
      <section className="bts-section" id="matrix">
        <div className="bts-container">
          <div className="bts-section-header">
            <span className="bts-section-num">01 / THE MATRIMONIAL PARADOX</span>
            <h2 className="bts-section-title">
              While <em>other matrimony apps stop at swiping</em>, AI Marriage builds lifelong unions
            </h2>
            <p className="bts-section-desc">
              Conventional matrimonial platforms reduce sacred choices to superficial biodata and endless scrolling.
              AI Marriage decodes emotional safety, shared financial cadence, and 40-year lifelong synergy.
            </p>
          </div>

          {/* 2 Comparative Phone Mockups Display with Cinematic Interactive Simulations */}
          <PhoneMatrixShowcase
            currentIndex={matrixIndex}
            onIndexChange={setMatrixIndex}
          />
        </div>
      </section>

      {/* 4. SECTION: THE 5 SACRED PILLARS OF LIFELONG HARMONY (HORIZONTAL SCROLL CAROUSEL) */}
      <section className="bts-section bts-pillars-bg" id="pillars">
        <div className="bts-container">
          
          {/* SECTION HEADER WITH SCROLL ARROWS */}
          <div className="bts-ref-cards-header-row">
            <div className="bts-ref-header-text">
              <span className="bts-ref-eyebrow">02 / SACRED FOUNDATIONS</span>
              <h2 className="bts-ref-cards-title">
                The <em>5 Pillars</em> of Lifelong Synergy
              </h2>
              <p className="bts-ref-cards-subtitle">
                Verified couples who discovered lifelong harmony through multi-dimensional compatibility.
              </p>
            </div>

            {/* Left / Right Scroll Navigation Arrows */}
            <div className="bts-ref-scroll-arrows">
              <button
                type="button"
                className="bts-ref-arrow-btn"
                onClick={() => scrollPillars("left")}
                aria-label="Scroll Left"
                title="Scroll Left"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                className="bts-ref-arrow-btn"
                onClick={() => scrollPillars("right")}
                aria-label="Scroll Right"
                title="Scroll Right"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* HORIZONTAL SCROLL CAROUSEL TRACK (POWERED BY EMBLA SWIPE/DRAG - 100% PRESERVED UI) */}
          <div className="bts-ref-carousel-wrapper" ref={pillarsEmblaRef}>
            <div className="bts-ref-circle-cards-track">
              {PILLARS_DATA.map((pillar) => {
                return (
                  <div 
                    key={pillar.id} 
                    className="bts-ref-circle-slide"
                  >
                    <div className="bts-ref-circle-card">
                      {/* Realistic Braided Sacred Wedding Rope SVG Bridge between Cards */}
                      <SacredRopeBridge id={pillar.id} />

                      {/* Protruding Circular Avatar Tied with Sacred Kalawa/Mauli Ring */}
                      <div className="bts-ref-avatar-wrapper">
                        <div className="bts-avatar-sacred-ring" />
                        <div className="bts-avatar-sacred-knot-top">✧</div>
                        <img
                          src={pillar.img}
                          alt={pillar.couple}
                          className="bts-ref-avatar-img"
                        />
                        <span className="bts-ref-avatar-num">{pillar.num}</span>
                      </div>

                      {/* Card Body */}
                      <div className="bts-ref-card-body">
                        {/* Top Badges Row */}
                        <div className="bts-ref-card-badge-row">
                          <span className="bts-ref-card-tag">{pillar.tag}</span>
                          <span className="bts-ref-card-score">
                            <Sparkles size={11} className="text-amber-500 shrink-0" />
                            {pillar.matchScore}
                          </span>
                        </div>

                        {/* Title & Subtitle */}
                        <div className="bts-ref-title-wrap">
                          <h4 className="bts-ref-card-title">{pillar.title}</h4>
                          <p className="bts-ref-card-oneliner">{pillar.oneLiner}</p>
                        </div>

                        {/* Beautified Dimension Metrics Box */}
                        <div className="bts-ref-metrics-list">
                          {pillar.metrics.map((m, idx) => (
                            <div key={idx} className="bts-ref-metric-item">
                              <div className="bts-ref-metric-left">
                                <span className="bts-ref-bullet">✦</span>
                                <span className="bts-ref-metric-label">{m.label}</span>
                              </div>
                              <span className="bts-ref-metric-pill">{m.badge}</span>
                            </div>
                          ))}
                        </div>

                        {/* Beautified Verified Couple Testimonial Card */}
                        <div className="bts-ref-couple-chip">
                          <div className="bts-ref-couple-chip-header">
                            <span className="bts-ref-chip-dot" />
                            <strong className="bts-ref-couple-name">{pillar.couple}</strong>
                            <span className="bts-ref-chip-city">({pillar.city})</span>
                          </div>
                          <p className="bts-ref-chip-quote">{pillar.quote}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 5. SECTION: TIMELESS HARMONY & PLATFORM PRAISE */}
      <section className="bts-section bts-timeless-harmony-section" id="stories">
        <div className="bts-container">
          <div className="bts-section-header">
            <span className="bts-section-num">03 / TIMELESS HARMONY</span>
            <h2 className="bts-section-title">
              Compatibility built for <em>lasting peace</em>
            </h2>
            <p className="bts-section-desc">
              Matching two lives on emotional safety, shared values, and long-term harmony.
            </p>
          </div>

          {/* GRAND LUXURY COUPLE SHOWCASE WITH 3 TILTED CONNECTED CARDS */}
          <div className="bts-grand-showcase">
            <div className="bts-tilted-cluster-col">
              <div className="bts-tilted-cluster">
                {/* Card 1: Top Left (Hindu Varmala Ceremony) */}
                <div className="bts-tilted-card bts-card-left">
                  <img 
                    src="/assets/hindu_varmala_couple.jpg" 
                    alt="Traditional Sacred Union" 
                    className="bts-tilted-img"
                  />
                </div>

                {/* Card 2: Top Right (Modern Dubai Skyline Union) */}
                <div className="bts-tilted-card bts-card-right">
                  <img 
                    src="/assets/dubai_modern_couple.jpg" 
                    alt="Modern Global Partnership" 
                    className="bts-tilted-img"
                  />
                </div>

                {/* Card 3: Bottom Center (Flagship Synergy Couple) */}
                <div className="bts-tilted-card bts-card-bottom-center">
                  <img 
                    src="/assets/couple_image.png" 
                    alt="40-Year Synergy Alignment" 
                    className="bts-tilted-img"
                  />
                </div>
              </div>
            </div>

            <div className="bts-grand-editorial">
              <h3 className="bts-grand-headline">
                Built for couples who value profound understanding over superficial algorithms.
              </h3>

              <blockquote className="bts-grand-quote">
                “Finding a life partner isn’t about matching biodata checklists. AI Marriage understood our emotional rhythms, our shared domestic quietude, and our long-term dreams before we even spoke our first words.”
              </blockquote>

              <div className="bts-grand-features">
                <div className="bts-grand-feat-item">
                  <div className="bts-feat-icon">💎</div>
                  <div className="bts-feat-text">
                    <strong>Deep Dimensional Resonance</strong>
                    <span>Evaluates 14+ subtle relational layers including conflict repair rhythm &amp; family philosophy.</span>
                  </div>
                </div>

                <div className="bts-grand-feat-item">
                  <div className="bts-feat-icon">🔒</div>
                  <div className="bts-feat-text">
                    <strong>Uncompromising Privacy &amp; Dignity</strong>
                    <span>Zero public browsing. Encrypted vault introductions with mutual double-blind consent.</span>
                  </div>
                </div>

                <div className="bts-grand-feat-item">
                  <div className="bts-feat-icon">🌿</div>
                  <div className="bts-feat-text">
                    <strong>Lifetime Architecture</strong>
                    <span>Designed exclusively for individuals ready for a grounded, conscious, enduring marriage.</span>
                  </div>
                </div>
              </div>

              <div className="bts-grand-footer">
                <Link href="/register/step-1" className="bts-primary-btn bts-grand-cta">
                  <span>Experience AI Marriage</span>
                  <ArrowRight size={16} />
                </Link>
                <div className="bts-grand-meta">
                  <span className="bts-meta-stars">★★★★★</span>
                  <span className="bts-meta-caption">Trusted by high-intent professionals globally</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECTION: FREQUENTLY ASKED PHILOSOPHICAL QUESTIONS */}
      <section className="bts-section">
        <div className="bts-container bts-narrow-container">
          <div className="bts-section-header">
            <span className="bts-section-num">04 / CLARITY &amp; INQUIRY</span>
            <h2 className="bts-section-title">
              Frequently Asked <em>Questions</em>
            </h2>
          </div>

          <div className="bts-faq-list">
            {[
              {
                q: "Does matching on values mean sacrificing romantic chemistry?",
                a: "Never. Chemical spark and physical attraction are essential, but they are the beginning, not the structure. When you meet someone whose values, communication style, and life pace are already harmonious, romance deepens effortlessly without the constant anxiety of mismatched futures."
              },
              {
                q: "How does AI Marriage prevent photos from dominating matching?",
                a: "Photos remain private or gracefully blurred until both members express mutual interest in each other's cognitive profile, voice notes, and values breakdown. This eliminates superficial swiping and honors the genuine human being."
              },
              {
                q: "What makes your algorithm different from personality quizzes?",
                a: "Standard quizzes measure static adjectives ('outgoing', 'creative'). Our system evaluates interactive behavioral dynamics: how you de-escalate tension, your financial risk threshold, family integration philosophies, and your unspoken domestic pace."
              },
              {
                q: "How is my family's privacy and my own identity protected?",
                a: "We operate with strict Zero-Data-Selling protocols. Your contact details, phone numbers, and full name are stored in an encrypted vault and are never revealed without explicit, double-blind consent."
              }
            ].map((faq, i) => (
              <div
                key={i}
                className={`bts-faq-item ${activeFaq === i ? "open" : ""}`}
                onClick={() => toggleFaq(i)}
              >
                <div className="bts-faq-q">
                  <span>{faq.q}</span>
                  <span className="bts-faq-toggle">{activeFaq === i ? "−" : "+"}</span>
                </div>
                {activeFaq === i && <p className="bts-faq-a">{faq.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PRE-FOOTER CTA INVITATION */}
      <section className="bts-cta-section">
        <div className="bts-cta-card">
          <div className="bts-cta-glow" />
          <span className="bts-eyebrow-badge white-badge">
            <Sparkles size={13} />
            <span>YOUR DELIBERATE CHAPTER BEGINS</span>
          </span>
          <h2 className="bts-cta-heading">
            Stop leaving the most important decision of your life to
            <br />
            <em>chance algorithms and 2-second swipes.</em>
          </h2>
          <p className="bts-cta-p">
            Join the verified platform where modern professionals meet for lifelong alignment,
            uncompromising safety, and deep mutual reverence.
          </p>
          <div className="bts-cta-btn-row">
            <Link href="/register/step-1" className="bts-cta-primary-btn">
              Create Your Private Profile <ArrowRight size={16} />
            </Link>
            <Link href="/" className="bts-cta-secondary-btn">
              Return to Main Experience
            </Link>
          </div>
        </div>
      </section>

      {/* 9. LUXURY FOOTER */}
      <footer className="bts-page-footer">
        <div className="bts-footer-container">
          <div className="bts-footer-left">
            <div className="brand footer-logo">
              <span className="brand-symbol">
                <Heart size={18} strokeWidth={1.6} />
              </span>
              <span>
                ai marriage<span className="brand-dot">.</span>
              </span>
            </div>
            <p className="bts-footer-copy">
              © {new Date().getFullYear()} AI Marriage. A Product of KayJay Global Solutions. Engineered for lifelong resonance.
            </p>
          </div>
          <div className="bts-footer-right">
            <Link href="/register/step-1">Register</Link>
            <Link href="/#story">Philosophy</Link>
            <Link href="/#membership">Pricing</Link>
            <Link href="/">Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
