"use client";
import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  HeartHandshake, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  X, 
  Layers, 
  Compass, 
  Coffee, 
  Brain
} from "lucide-react";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface MatchmakingModalProps {
  onClose?: () => void;
  onOpenJourney: () => void;
}

export const MatchmakingModal: React.FC<MatchmakingModalProps> = ({
  onClose,
  onOpenJourney,
}) => {
  const [activeTab, setActiveTab] = useState<"layers" | "trust" | "steps">("layers");

  return (
    <div 
      className="matchmaking-modal-container"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        color: "#411c2b",
        fontFamily: "inherit"
      }}
    >
      {/* Top Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "6px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", color: "#be185d", textTransform: "uppercase" }}>
          <Sparkles size={13} style={{ color: "#be185d" }} />
          <span>EVIDENCE-BASED RELATIONSHIP INTELLIGENCE</span>
        </div>
        <DialogTitle 
          className="dialog-display"
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "28px",
            fontWeight: 400,
            color: "#411c2b",
            lineHeight: 1.15,
            margin: 0
          }}
        >
          How our matchmaking <em style={{ fontStyle: "italic", color: "#9d174d" }}>actually works.</em>
        </DialogTitle>
        <DialogDescription 
          style={{
            fontSize: "13.5px",
            color: "#6b535d",
            lineHeight: 1.5,
            margin: 0
          }}
        >
          Transparent, explainable, and value-grounded. We combine modern behavioral science with intelligent semantic alignment.
        </DialogDescription>
      </div>

      {/* Tab Switcher Pills */}
      <div style={{ display: "flex", gap: "8px", margin: "6px 0 10px", flexWrap: "wrap" }} role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "layers"}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            padding: "8px 16px",
            background: activeTab === "layers" ? "#411c2b" : "#ffffff",
            borderColor: activeTab === "layers" ? "#411c2b" : "#dfccc5",
            borderWidth: "1.5px",
            borderStyle: "solid",
            borderRadius: "999px",
            fontSize: "12.5px",
            fontWeight: 600,
            color: activeTab === "layers" ? "#fff9f2" : "#5c414b",
            cursor: "pointer",
            boxShadow: activeTab === "layers" ? "0 4px 12px rgba(65, 28, 43, 0.2)" : "none"
          }}
          onClick={() => setActiveTab("layers")}
        >
          <Layers size={14} />
          <span>The 3-Layer Formula</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "trust"}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            padding: "8px 16px",
            background: activeTab === "trust" ? "#411c2b" : "#ffffff",
            borderColor: activeTab === "trust" ? "#411c2b" : "#dfccc5",
            borderWidth: "1.5px",
            borderStyle: "solid",
            borderRadius: "999px",
            fontSize: "12.5px",
            fontWeight: 600,
            color: activeTab === "trust" ? "#fff9f2" : "#5c414b",
            cursor: "pointer",
            boxShadow: activeTab === "trust" ? "0 4px 12px rgba(65, 28, 43, 0.2)" : "none"
          }}
          onClick={() => setActiveTab("trust")}
        >
          <ShieldCheck size={14} />
          <span>AI Ethics &amp; Boundaries</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "steps"}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            padding: "8px 16px",
            background: activeTab === "steps" ? "#411c2b" : "#ffffff",
            borderColor: activeTab === "steps" ? "#411c2b" : "#dfccc5",
            borderWidth: "1.5px",
            borderStyle: "solid",
            borderRadius: "999px",
            fontSize: "12.5px",
            fontWeight: 600,
            color: activeTab === "steps" ? "#fff9f2" : "#5c414b",
            cursor: "pointer",
            boxShadow: activeTab === "steps" ? "0 4px 12px rgba(65, 28, 43, 0.2)" : "none"
          }}
          onClick={() => setActiveTab("steps")}
        >
          <Brain size={14} />
          <span>4-Step Process</span>
        </button>
      </div>

      <style>{`
        @keyframes tabFadeIn {
          from {
            opacity: 0;
            transform: translateY(3px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .matchmaking-tab-body {
          animation: tabFadeIn 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Tab Panel Container with Fixed Stable Min-Height */}
      <div 
        className="matchmaking-tab-panel-container"
        style={{
          minHeight: "305px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start"
        }}
      >
        {/* Tab Content 1: The 3-Layer Formula */}
        {activeTab === "layers" && (
          <div className="matchmaking-tab-body" style={{ display: "flex", flexDirection: "column", gap: "12px", height: "100%" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
              {/* Layer 1 */}
              <div style={{ background: "#ffffff", border: "1.5px solid #ebd8d4", borderRadius: "16px", padding: "16px 14px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "9.5px", fontWeight: 800, letterSpacing: "0.08em", padding: "3px 8px", borderRadius: "999px", background: "#fce7f3", color: "#9d174d", width: "fit-content" }}>
                  <HeartHandshake size={14} />
                  <span>40% WEIGHTAGE</span>
                </div>
                <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#411c2b", margin: 0 }}>01. Core Values &amp; Heritage</h4>
                <p style={{ fontSize: "11.5px", color: "#6b535d", lineHeight: 1.5, margin: 0 }}>Family dynamics, emotional maturity, moral principles, and cultural roots that anchor sacred lifelong trust.</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "auto", paddingTop: "6px" }}>
                  <span style={{ fontSize: "9.5px", fontWeight: 600, padding: "2.5px 7px", borderRadius: "6px", background: "#faf4f0", color: "#5c3846", border: "1px solid #ebdcd5" }}>Family Roots</span>
                  <span style={{ fontSize: "9.5px", fontWeight: 600, padding: "2.5px 7px", borderRadius: "6px", background: "#faf4f0", color: "#5c3846", border: "1px solid #ebdcd5" }}>Moral Integrity</span>
                  <span style={{ fontSize: "9.5px", fontWeight: 600, padding: "2.5px 7px", borderRadius: "6px", background: "#faf4f0", color: "#5c3846", border: "1px solid #ebdcd5" }}>Spiritual Anchor</span>
                </div>
              </div>

              {/* Layer 2 */}
              <div style={{ background: "#ffffff", border: "1.5px solid #ebd8d4", borderRadius: "16px", padding: "16px 14px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "9.5px", fontWeight: 800, letterSpacing: "0.08em", padding: "3px 8px", borderRadius: "999px", background: "#fef3c7", color: "#92400e", width: "fit-content" }}>
                  <Coffee size={14} />
                  <span>35% WEIGHTAGE</span>
                </div>
                <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#411c2b", margin: 0 }}>02. Everyday Lifestyle &amp; Rhythm</h4>
                <p style={{ fontSize: "11.5px", color: "#6b535d", lineHeight: 1.5, margin: 0 }}>Communication pacing, conflict resolution styles, work-life balance, spontaneous vs planned weekends.</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "auto", paddingTop: "6px" }}>
                  <span style={{ fontSize: "9.5px", fontWeight: 600, padding: "2.5px 7px", borderRadius: "6px", background: "#faf4f0", color: "#5c3846", border: "1px solid #ebdcd5" }}>Communication</span>
                  <span style={{ fontSize: "9.5px", fontWeight: 600, padding: "2.5px 7px", borderRadius: "6px", background: "#faf4f0", color: "#5c3846", border: "1px solid #ebdcd5" }}>Daily Habits</span>
                  <span style={{ fontSize: "9.5px", fontWeight: 600, padding: "2.5px 7px", borderRadius: "6px", background: "#faf4f0", color: "#5c3846", border: "1px solid #ebdcd5" }}>Emotional Tone</span>
                </div>
              </div>

              {/* Layer 3 */}
              <div style={{ background: "#ffffff", border: "1.5px solid #ebd8d4", borderRadius: "16px", padding: "16px 14px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "9.5px", fontWeight: 800, letterSpacing: "0.08em", padding: "3px 8px", borderRadius: "999px", background: "#ecfdf5", color: "#065f46", width: "fit-content" }}>
                  <Compass size={14} />
                  <span>25% WEIGHTAGE</span>
                </div>
                <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#411c2b", margin: 0 }}>03. Lifelong Vision &amp; Growth</h4>
                <p style={{ fontSize: "11.5px", color: "#6b535d", lineHeight: 1.5, margin: 0 }}>Career trajectories, parenting visions, financial philosophy, and mutual personal aspirations for the next 10+ years.</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "auto", paddingTop: "6px" }}>
                  <span style={{ fontSize: "9.5px", fontWeight: 600, padding: "2.5px 7px", borderRadius: "6px", background: "#faf4f0", color: "#5c3846", border: "1px solid #ebdcd5" }}>10-Year Horizon</span>
                  <span style={{ fontSize: "9.5px", fontWeight: 600, padding: "2.5px 7px", borderRadius: "6px", background: "#faf4f0", color: "#5c3846", border: "1px solid #ebdcd5" }}>Finance Philosophy</span>
                  <span style={{ fontSize: "9.5px", fontWeight: 600, padding: "2.5px 7px", borderRadius: "6px", background: "#faf4f0", color: "#5c3846", border: "1px solid #ebdcd5" }}>Parenting Vision</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "auto", background: "#f7ede8", border: "1px solid #e7d4ce", borderRadius: "12px", padding: "11px 14px", fontSize: "12px", color: "#411c2b", display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkles size={15} style={{ color: "#c59b6d", flexShrink: 0 }} />
              <span>
                <strong>The Golden Principle:</strong> We match individuals on direction and mutual resonance, while celebrating individuality and healthy differences.
              </span>
            </div>
          </div>
        )}

        {/* Tab Content 2: What AI Does vs Never Does */}
        {activeTab === "trust" && (
          <div className="matchmaking-tab-body" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "14px", height: "100%" }}>
            {/* What AI Does */}
            <div style={{ background: "linear-gradient(180deg, #ffffff 0%, #f7fdf9 100%)", border: "1.5px solid #bbf7d0", borderRadius: "16px", padding: "16px 18px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "13.5px", fontWeight: 700, color: "#15803d" }}>
                <Check size={16} />
                <span>What Our AI Does</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "12px", color: "#432e36" }}>
                  <span style={{ color: "#16a34a", fontWeight: 800 }}>✓</span>
                  <div><strong>Semantic Deep Compatibility:</strong> Compares self-described life priorities and deep values.</div>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "12px", color: "#432e36" }}>
                  <span style={{ color: "#16a34a", fontWeight: 800 }}>✓</span>
                  <div><strong>Explainable Alignment:</strong> Breaks down exactly why you two align and highlights healthy differences.</div>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "12px", color: "#432e36" }}>
                  <span style={{ color: "#16a34a", fontWeight: 800 }}>✓</span>
                  <div><strong>Curated Introductions:</strong> Introduces up to 10 high-relevance matches daily instead of endless swiping.</div>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "12px", color: "#432e36" }}>
                  <span style={{ color: "#16a34a", fontWeight: 800 }}>✓</span>
                  <div><strong>Double-Blind Consent:</strong> Conversation unlocks only when both parties express genuine mutual interest.</div>
                </li>
              </ul>
            </div>

            {/* What AI Never Does */}
            <div style={{ background: "linear-gradient(180deg, #ffffff 0%, #fff7f8 100%)", border: "1.5px solid #fecdd3", borderRadius: "16px", padding: "16px 18px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "13.5px", fontWeight: 700, color: "#be185d" }}>
                <X size={16} />
                <span>What Our AI Never Does</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "12px", color: "#432e36" }}>
                  <span style={{ color: "#dc2626", fontWeight: 800 }}>✕</span>
                  <div><strong>No Facial Beauty Scoring:</strong> Photos are never analyzed or scored for physical attractiveness.</div>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "12px", color: "#432e36" }}>
                  <span style={{ color: "#dc2626", fontWeight: 800 }}>✕</span>
                  <div><strong>No Public Photo Browsing:</strong> No public swiping catalogues or unconsented profile distribution.</div>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "12px", color: "#432e36" }}>
                  <span style={{ color: "#dc2626", fontWeight: 800 }}>✕</span>
                  <div><strong>No Fake Bots or Ghost Activity:</strong> Every member is real and verified via identity checks.</div>
                </li>
                <li style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "12px", color: "#432e36" }}>
                  <span style={{ color: "#dc2626", fontWeight: 800 }}>✕</span>
                  <div><strong>Zero Data Selling:</strong> Your private questionnaire answers are encrypted and strictly protected.</div>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab Content 3: 4-Step Process */}
        {activeTab === "steps" && (
          <div className="matchmaking-tab-body" style={{ display: "flex", flexDirection: "column", gap: "8px", height: "100%" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", background: "#ffffff", border: "1.5px solid #ebdcd7", borderRadius: "14px", padding: "10px 16px" }}>
              <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#411c2b", color: "#fff", fontSize: "10.5px", fontWeight: 800, display: "grid", placeItems: "center", flexShrink: 0, marginTop: "2px" }}>01</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#411c2b", margin: 0 }}>Mindful Onboarding</h4>
                <p style={{ fontSize: "11.5px", color: "#6b535d", lineHeight: 1.4, margin: 0 }}>Complete 15-20 guided value questions and upload an optional authentic 45-second video bio.</p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", background: "#ffffff", border: "1.5px solid #ebdcd7", borderRadius: "14px", padding: "10px 16px" }}>
              <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#411c2b", color: "#fff", fontSize: "10.5px", fontWeight: 800, display: "grid", placeItems: "center", flexShrink: 0, marginTop: "2px" }}>02</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#411c2b", margin: 0 }}>Intelligent Alignment Analysis</h4>
                <p style={{ fontSize: "11.5px", color: "#6b535d", lineHeight: 1.4, margin: 0 }}>Our semantic models map your core non-negotiables, lifestyle tempo, and future goals across our 3-Layer formula.</p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", background: "#ffffff", border: "1.5px solid #ebdcd7", borderRadius: "14px", padding: "10px 16px" }}>
              <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#411c2b", color: "#fff", fontSize: "10.5px", fontWeight: 800, display: "grid", placeItems: "center", flexShrink: 0, marginTop: "2px" }}>03</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#411c2b", margin: 0 }}>Explainable Compatibility Dossier</h4>
                <p style={{ fontSize: "11.5px", color: "#6b535d", lineHeight: 1.4, margin: 0 }}>You receive an insightful compatibility breakdown paired with clear explanations of shared alignment and individuality.</p>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", background: "#ffffff", border: "1.5px solid #ebdcd7", borderRadius: "14px", padding: "10px 16px" }}>
              <span style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#411c2b", color: "#fff", fontSize: "10.5px", fontWeight: 800, display: "grid", placeItems: "center", flexShrink: 0, marginTop: "2px" }}>04</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <h4 style={{ fontSize: "13px", fontWeight: 700, color: "#411c2b", margin: 0 }}>Intentional Connection</h4>
                <p style={{ fontSize: "11.5px", color: "#6b535d", lineHeight: 1.4, margin: 0 }}>When mutual curiosity is confirmed, explore curated icebreakers and begin a conversation at your own comfort.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div 
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "6px",
          paddingTop: "14px",
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
          className="button button-dark"
          onClick={() => onClose && onClose()}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 24px",
            fontSize: "13.5px",
            fontWeight: 700,
            borderRadius: "10px",
            marginLeft: "auto",
            background: "#411c2b",
            color: "#fff"
          }}
        >
          <span>Begin Your Profile Story</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};
