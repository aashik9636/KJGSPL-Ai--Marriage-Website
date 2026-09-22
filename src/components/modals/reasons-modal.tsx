"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Sparkles, 
  Compass, 
  Map, 
  Anchor, 
  Flame, 
  Brain, 
  Zap, 
  Palette, 
  Heart, 
  ArrowRight,
  CheckCircle2,
  Plus
} from "lucide-react";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface ReasonsModalProps {
  onClose?: () => void;
  onOpenJourney: () => void;
}

const VISUAL_STORIES = [
  {
    id: "travel",
    title: "The Planner + The Explorer",
    subtitle: "Mindful Structure • Spontaneous Joy",
    badge: "TRAVEL & ADVENTURE",
    image: "/assets/complementary-travel.jpg",
    icon1: Map,
    icon2: Compass,
    quote: "One partner ensures flights, schedules, and financial safety are locked in. The other brings spontaneous detours, joyful surprises, and unforgettable memories.",
    highlights: ["Safety & Freedom", "Spontaneous Joy", "Balanced Decisions"]
  },
  {
    id: "home",
    title: "The Anchor + The Spark",
    subtitle: "Grounding Serenity • Warm Vitality",
    badge: "HOME & SANCTUARY",
    image: "/assets/complementary-home.jpg",
    icon1: Anchor,
    icon2: Flame,
    quote: "During stressful days, one brings calm stillness and patience. The other fills the home with laughter, culinary warmth, and energetic optimism.",
    highlights: ["Quiet Resilience", "Emotional Warmth", "Calm Strength"]
  }
];

const MINI_DYNAMICS = [
  {
    icon: Brain,
    title: "Thinker + Doer",
    detail: "Deep reflection meets decisive family action."
  },
  {
    icon: Palette,
    title: "Passions + Shared Space",
    detail: "Unique individual hobbies enrich evening conversations."
  }
];

export const ReasonsModal: React.FC<ReasonsModalProps> = ({
  onClose,
  onOpenJourney,
}) => {
  const [selectedStory, setSelectedStory] = useState(0);
  const activeStory = VISUAL_STORIES[selectedStory];
  const Icon1 = activeStory.icon1;
  const Icon2 = activeStory.icon2;

  return (
    <div 
      className="reasons-modal-wrapper"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        color: "#411c2b",
        fontFamily: "Arial, Helvetica, sans-serif"
      }}
    >
      <style>{`
        .visual-switch-btn {
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .visual-switch-btn:hover {
          background: #fdf2f4 !important;
          border-color: #be185d !important;
          transform: translateY(-1px);
        }
        .visual-switch-btn.active {
          background: #411c2b !important;
          border-color: #411c2b !important;
          color: #fffaf6 !important;
          box-shadow: 0 4px 14px rgba(65, 28, 43, 0.25) !important;
        }
        .reasons-cta-btn:hover {
          background: #5a273b !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(65, 28, 43, 0.25);
        }
        .visual-story-split-card {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          border-radius: 22px;
          overflow: hidden;
          border: 1px solid rgba(65, 28, 43, 0.12);
          background: linear-gradient(135deg, #ffffff 0%, #fdf8f6 100%);
          box-shadow: 0 10px 30px rgba(65, 28, 43, 0.06), 0 1px 3px rgba(0,0,0,0.02);
          min-height: 255px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .visual-story-split-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 36px rgba(65, 28, 43, 0.1);
          border-color: rgba(190, 24, 93, 0.22);
        }
        .visual-story-image-wrap {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          margin: 8px;
          background: #220e18;
        }
        .visual-story-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
          display: block;
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .visual-story-split-card:hover .visual-story-img {
          transform: scale(1.04);
        }
        .floating-photo-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 20px;
          padding: 3px 9px;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #9d174d;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          z-index: 2;
        }
        .floating-synergy-pill {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background: rgba(43, 17, 28, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          padding: 3.5px 10px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #fff9f2;
          font-size: 9.5px;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 2;
        }
        .floating-pulse-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 6px #10b981;
        }
        .modern-highlight-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 10.5px;
          font-weight: 600;
          color: #4a323c;
          background: #ffffff;
          padding: 4px 10px;
          border-radius: 8px;
          border: 1px solid #ebdcd5;
          box-shadow: 0 1px 3px rgba(65, 28, 43, 0.03);
          transition: all 0.2s ease;
        }
        .modern-highlight-pill:hover {
          background: #fff8f6;
          border-color: #be185d;
          color: #832646;
          transform: translateY(-1px);
        }
        .mini-dynamic-card {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #ffffff;
          border: 1px solid rgba(65, 28, 43, 0.1);
          border-radius: 14px;
          padding: 10px 14px;
          box-shadow: 0 2px 8px rgba(65, 28, 43, 0.03);
          transition: all 0.22s ease;
        }
        .mini-dynamic-card:hover {
          transform: translateY(-2px);
          border-color: #be185d;
          box-shadow: 0 6px 16px rgba(190, 24, 93, 0.08);
        }
        @media (max-width: 720px) {
          .visual-story-split-card {
            grid-template-columns: 1fr;
          }
          .visual-story-image-wrap {
            height: 220px !important;
            margin: 6px;
          }
        }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "#be185d", textTransform: "uppercase" }}>
          <Sparkles size={13} style={{ color: "#be185d" }} />
          <span>COMPLEMENTARY RELATIONSHIP DYNAMICS</span>
        </div>
        <DialogTitle 
          className="dialog-display"
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "26px",
            fontWeight: 400,
            color: "#411c2b",
            lineHeight: 1.2,
            margin: 0
          }}
        >
          Room to be <em style={{ fontStyle: "italic", color: "#9d174d" }}>beautifully different.</em>
        </DialogTitle>
        <DialogDescription 
          style={{
            fontSize: "13px",
            color: "#6b535d",
            lineHeight: 1.45,
            margin: 0
          }}
        >
          True compatibility isn’t being identical clones. It’s sharing the same sacred destination while balancing each other’s unique strengths.
        </DialogDescription>
      </div>

      {/* Visual Story Selector Tabs */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {VISUAL_STORIES.map((story, idx) => {
          const isSelected = selectedStory === idx;
          return (
            <button
              key={story.id}
              type="button"
              className={`visual-switch-btn ${isSelected ? "active" : ""}`}
              onClick={() => setSelectedStory(idx)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "7px",
                padding: "7px 15px",
                background: isSelected ? "#411c2b" : "#ffffff",
                borderColor: isSelected ? "#411c2b" : "#dfccc5",
                borderWidth: "1.5px",
                borderStyle: "solid",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: 600,
                color: isSelected ? "#fff9f2" : "#5c414b",
                cursor: "pointer",
              }}
            >
              <span>{story.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Visual Showcase Card: Side-by-Side (Modern Inset Bento) */}
      <div className="visual-story-split-card" key={`story-card-${activeStory.id}`}>
        {/* Left Side: Modern Inset Photo Frame */}
        <div className="visual-story-image-wrap">
          <img 
            src={activeStory.image} 
            alt={activeStory.title}
            className="visual-story-img"
          />
          <div className="floating-photo-badge">
            {activeStory.badge}
          </div>
          <div className="floating-synergy-pill">
            <span className="floating-pulse-dot" />
            <span>98% Complementary Synergy</span>
          </div>
        </div>

        {/* Right Side: Modern Story Details */}
        <div 
          style={{
            padding: "18px 20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          {/* Top Dynamics Tag */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "6px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", background: "#f8ece7", padding: "4px 10px", borderRadius: "999px", border: "1px solid #ebdcd5" }}>
              <Icon1 size={12} style={{ color: "#724752" }} />
              <Plus size={9} style={{ color: "#c59b6d" }} />
              <Icon2 size={12} style={{ color: "#724752" }} />
              <span style={{ fontSize: "10.5px", fontWeight: 700, color: "#411c2b", marginLeft: "2px" }}>
                {activeStory.subtitle}
              </span>
            </div>
          </div>

          {/* Story Heading */}
          <h4 style={{ fontFamily: "Georgia, serif", fontSize: "18px", fontWeight: 700, color: "#411c2b", margin: 0, lineHeight: 1.25 }}>
            {activeStory.title}
          </h4>

          {/* Story Quote */}
          <p style={{ fontSize: "12.5px", lineHeight: 1.55, color: "#4a323c", margin: 0, fontStyle: "italic" }}>
            &ldquo;{activeStory.quote}&rdquo;
          </p>

          {/* Highlights Tag List */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", paddingTop: "2px" }}>
            {activeStory.highlights.map((item, hIdx) => (
              <span 
                key={hIdx}
                className="modern-highlight-pill"
              >
                <CheckCircle2 size={12} style={{ color: "#16a34a" }} />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2 Quick Dynamic Highlights Below Image */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "10px" }}>
        {MINI_DYNAMICS.map((item, mIdx) => {
          const MIcon = item.icon;
          return (
            <div 
              key={mIdx}
              className="mini-dynamic-card"
            >
              <span style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#fdf2f4", color: "#9d174d", display: "grid", placeItems: "center", flexShrink: 0 }}>
                <MIcon size={16} />
              </span>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <strong style={{ fontSize: "12px", fontWeight: 700, color: "#411c2b" }}>{item.title}</strong>
                <span style={{ fontSize: "11px", color: "#6e525d", lineHeight: 1.35 }}>{item.detail}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* The 80/20 Alignment Banner */}
      <div 
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "linear-gradient(135deg, #fffbf7 0%, #fef3ec 100%)",
          border: "1px solid #ebd4cb",
          borderRadius: "12px",
          padding: "10px 16px"
        }}
      >
        <div style={{ fontSize: "16px", color: "#c59b6d", flexShrink: 0 }}>✦</div>
        <div style={{ fontSize: "12px", color: "#411c2b", lineHeight: 1.4 }}>
          <strong style={{ color: "#411c2b", fontWeight: 800, marginRight: "4px" }}>The 80/20 Alignment Rule:</strong>
          <span style={{ color: "#6b535d" }}>80% Shared Core Values &amp; Family Ethics + 20% Unique Passions &amp; Pace = A Sacred Lifelong Bond.</span>
        </div>
      </div>

      {/* Modal Actions Footer */}
      <div 
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "10px",
          borderTop: "1px solid #ebdcd9",
          gap: "12px"
        }}
      >
        <button
          type="button"
          className="text-button"
          onClick={() => onClose && onClose()}
          style={{ cursor: "pointer", background: "none", border: "none", fontSize: "13px", fontWeight: 600, color: "#7c656b" }}
        >
          Close
        </button>

        <Link
          href="/register/step-1"
          className="reasons-cta-btn"
          onClick={() => onClose && onClose()}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "11px 22px",
            fontSize: "13.5px",
            fontWeight: 700,
            borderRadius: "10px",
            marginLeft: "auto",
            background: "#411c2b",
            color: "#fff",
            textDecoration: "none",
            transition: "all 0.18s ease"
          }}
        >
          <span>Find Your Value-Aligned Match</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};
