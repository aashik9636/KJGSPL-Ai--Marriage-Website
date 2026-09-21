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
          transition: all 0.2s ease;
        }
        .visual-switch-btn:hover {
          background: #f7ece8 !important;
          border-color: #dcaea5 !important;
        }
        .reasons-cta-btn:hover {
          background: #5a273b !important;
          transform: translateY(-1px);
        }
        .visual-story-split-card {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          border-radius: 18px;
          overflow: hidden;
          border: 1.5px solid #ebd8d4;
          background: #ffffff;
          box-shadow: 0 6px 22px rgba(65, 28, 43, 0.05);
          min-height: 250px;
        }
        @media (max-width: 720px) {
          .visual-story-split-card {
            grid-template-columns: 1fr;
          }
          .visual-story-image-wrap {
            height: 210px !important;
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
        {VISUAL_STORIES.map((story, idx) => (
          <button
            key={story.id}
            type="button"
            className="visual-switch-btn"
            onClick={() => setSelectedStory(idx)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              padding: "7px 14px",
              background: selectedStory === idx ? "#411c2b" : "#ffffff",
              borderColor: selectedStory === idx ? "#411c2b" : "#dfccc5",
              borderWidth: "1.5px",
              borderStyle: "solid",
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: 600,
              color: selectedStory === idx ? "#fff9f2" : "#5c414b",
              cursor: "pointer",
              boxShadow: selectedStory === idx ? "0 4px 12px rgba(65, 28, 43, 0.2)" : "none"
            }}
          >
            <span>{story.title}</span>
          </button>
        ))}
      </div>

      {/* Main Visual Showcase Card: Side-by-Side (Image Left, Story Right) */}
      <div className="visual-story-split-card">
        {/* Left Side: Photo */}
        <div 
          className="visual-story-image-wrap"
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            minHeight: "240px",
            overflow: "hidden",
            background: "#220e18"
          }}
        >
          <img 
            src={activeStory.image} 
            alt={activeStory.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 30%",
              display: "block"
            }}
          />
        </div>

        {/* Right Side: Story Details */}
        <div 
          style={{
            padding: "20px 22px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "10px",
            background: "#ffffff"
          }}
        >
          {/* Top Row: Badge & Dynamics Tag */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "6px" }}>
            <span 
              style={{
                fontSize: "9.5px",
                fontWeight: 800,
                letterSpacing: "0.08em",
                color: "#9d174d",
                background: "#fce7f3",
                padding: "3px 9px",
                borderRadius: "999px"
              }}
            >
              {activeStory.badge}
            </span>

            <div style={{ display: "flex", alignItems: "center", gap: "4px", background: "#f8ece7", padding: "3.5px 9px", borderRadius: "999px", border: "1px solid #ebdcd5" }}>
              <Icon1 size={12} style={{ color: "#724752" }} />
              <Plus size={9} style={{ color: "#c59b6d" }} />
              <Icon2 size={12} style={{ color: "#724752" }} />
              <span style={{ fontSize: "10.5px", fontWeight: 700, color: "#411c2b", marginLeft: "2px" }}>
                {activeStory.subtitle}
              </span>
            </div>
          </div>

          {/* Story Heading */}
          <h4 style={{ fontFamily: "Georgia, serif", fontSize: "17px", fontWeight: 700, color: "#411c2b", margin: 0, lineHeight: 1.25 }}>
            {activeStory.title}
          </h4>

          {/* Story Quote */}
          <p style={{ fontSize: "12.5px", lineHeight: 1.55, color: "#4a323c", margin: 0 }}>
            &ldquo;{activeStory.quote}&rdquo;
          </p>

          {/* Highlights Tag List */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", paddingTop: "2px" }}>
            {activeStory.highlights.map((item, hIdx) => (
              <span 
                key={hIdx}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "#4a323c",
                  background: "#faf4f0",
                  padding: "3px 8px",
                  borderRadius: "6px",
                  border: "1px solid #ebdcd5"
                }}
              >
                <CheckCircle2 size={11} style={{ color: "#16a34a" }} />
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
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "#ffffff",
                border: "1.5px solid #ebd8d4",
                borderRadius: "12px",
                padding: "10px 14px",
                boxShadow: "0 2px 8px rgba(65, 28, 43, 0.03)"
              }}
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
