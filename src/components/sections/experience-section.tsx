"use client";
import React from "react";
import {
  Heart,
  Sparkles,
  MessageCircle,
  Compass,
  ArrowUpRight,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { ProfileFixture, PairKey } from "@/types/profile.types";
import { StageType } from "@/types/common.types";

interface ExperienceSectionProps {
  pair: PairKey;
  person: ProfileFixture;
  stage: StageType;
  onSwitchPair: (p: PairKey) => void;
  onReveal: () => void;
  onSkipAnimation: () => void;
  onOpenDetails: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  pair,
  person,
  stage,
  onSwitchPair,
  onReveal,
  onSkipAnimation,
  onOpenDetails,
}) => {
  const isResult = stage === "result";

  return (
    <section
      className="experience"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="section-top">
        <div>
          <div className="eyebrow">01 / GO BEYOND THE PROFILE</div>
          <h2 id="experience-title">
            Same spark.
            <br />
            <em>A different story.</em>
          </h2>
        </div>
      </div>
      <div 
        className="pair-selector" 
        aria-label="Choose a comparison pair" 
        role="tablist"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          margin: "32px 0 24px",
          flexWrap: "wrap"
        }}
      >
        <button
          type="button"
          role="tab"
          aria-selected={pair === "arjun"}
          aria-pressed={pair === "arjun"}
          className={`pair-tab-item ${pair === "arjun" ? "active" : ""}`}
          onClick={() => onSwitchPair("arjun")}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "12px 24px",
            borderRadius: "14px",
            border: pair === "arjun" ? "2px solid #411c2b" : "1.5px solid #dfccc5",
            background: pair === "arjun" ? "#ffffff" : "#fbf5f2",
            boxShadow: pair === "arjun" ? "0 6px 20px rgba(65, 28, 43, 0.1)" : "0 2px 6px rgba(65, 28, 43, 0.02)",
            minWidth: "190px",
            cursor: "pointer",
            textAlign: "left",
            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          <span style={{ fontFamily: "Georgia, serif", fontSize: "16px", fontWeight: 700, color: "#411c2b", display: "block", lineHeight: 1.25 }}>
            Mira + Arjun
          </span>
          <span style={{ fontSize: "12px", color: pair === "arjun" ? "#be185d" : "#7c656b", fontWeight: pair === "arjun" ? 600 : 400, marginTop: "4px", display: "block" }}>
            First impressions
          </span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={pair === "dev"}
          aria-pressed={pair === "dev"}
          className={`pair-tab-item ${pair === "dev" ? "active" : ""}`}
          onClick={() => onSwitchPair("dev")}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "12px 24px",
            borderRadius: "14px",
            border: pair === "dev" ? "2px solid #411c2b" : "1.5px solid #dfccc5",
            background: pair === "dev" ? "#ffffff" : "#fbf5f2",
            boxShadow: pair === "dev" ? "0 6px 20px rgba(65, 28, 43, 0.1)" : "0 2px 6px rgba(65, 28, 43, 0.02)",
            minWidth: "190px",
            cursor: "pointer",
            textAlign: "left",
            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          <span style={{ fontFamily: "Georgia, serif", fontSize: "16px", fontWeight: 700, color: "#411c2b", display: "block", lineHeight: 1.25 }}>
            Mira + Dev
          </span>
          <span style={{ fontSize: "12px", color: pair === "dev" ? "#be185d" : "#7c656b", fontWeight: pair === "dev" ? 600 : 400, marginTop: "4px", display: "block" }}>
            Shared possibilities
          </span>
        </button>
      </div>
      <div className="match-layout">
        <div className="match-portraits">
          <div className="match-photo">
            <img src="/assets/mira.png" alt="Fictional profile Mira Sen" />
            <div>
              <h3>Mira, 29</h3>
              <p>Creative director · Dubai</p>
            </div>
          </div>
          <div className="match-photo" key={pair}>
            <img
              src={`/assets/${pair}.png`}
              alt={`Fictional profile ${person.full}`}
            />
            <div>
              <h3>
                {person.name}, {person.age}
              </h3>
              <p>{person.job} · Dubai</p>
            </div>
          </div>
          <span className="pair-heart">
            <Heart size={23} strokeWidth={1.3} />
          </span>
        </div>
        <div
          className={`alignment-panel ${isResult ? "result" : ""}`}
          aria-live="polite"
        >
          <div className="eyebrow">
            <Sparkles size={15} /> THE THINGS YOU DON’T SEE
          </div>
          {stage === "intro" ? (
            <>
              <h3>
                {pair === "arjun"
                  ? "A lovely first impression."
                  : "There’s more to discover."}
                <br />
                <em>What lies beneath?</em>
              </h3>
              <p>
                Explore how their self-described values, intentions and
                everyday lives align.
              </p>
              <div className="peek-factors">
                <span>
                  <Heart size={16} /> Values & intentions
                </span>
                <span>
                  <MessageCircle size={16} /> Communication
                </span>
                <span>
                  <Compass size={16} /> Future plans
                </span>
              </div>
              <button className="button button-light" onClick={onReveal}>
                Explore their alignment <Sparkles size={17} />
              </button>
            </>
          ) : stage === "scanning" ? (
            <div className="scan-state">
              <div className="scan-orbit">
                <Heart size={32} />
              </div>
              <h3>A little deeper…</h3>
              <p>Revealing their sample profile answers.</p>
              <div className="scan-progress" />
              <small>
                No photograph analysis. This is a scripted demo.
              </small>
              <button
                className="text-button light"
                onClick={onSkipAnimation}
              >
                Skip animation
              </button>
            </div>
          ) : (
            <>
              <div className="score-heading">
                <div>
                  <span className="score-number">
                    {person.score}
                    <small>/100</small>
                  </span>
                  <p>Illustrative profile alignment</p>
                </div>
                <span className="score-seal">
                  <Heart size={28} />
                </span>
              </div>
              <h3>
                {pair === "dev"
                  ? "Different faces. Shared direction."
                  : "Looks don’t define a perfect match."}
              </h3>
              <p>
                {pair === "dev"
                  ? "Their answers suggest shared intentions and a similar vision for everyday life. A conversation is the next step."
                  : "There’s curiosity here, alongside different priorities and timelines worth discussing."}
              </p>
              <button
                className="button button-light"
                onClick={onOpenDetails}
              >
                Understand the connection <ArrowUpRight size={18} />
              </button>
              {pair === "arjun" ? (
                <button
                  className="text-button light"
                  onClick={() => onSwitchPair("dev")}
                >
                  Now meet Dev <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  className="text-button light"
                  onClick={() => onSwitchPair("arjun")}
                >
                  <RotateCcw size={15} /> Replay this story
                </button>
              )}
            </>
          )}
          <div className="alignment-disclaimer">
            Fictional adults · Sample results · No prediction of
            relationship success
          </div>
        </div>
      </div>
      <div className="experience-footer">
        <span>
          <ShieldCheck size={18} /> Compatibility starts with what people
          choose to share.
        </span>
        <span>Photos are never used to infer compatibility.</span>
      </div>
    </section>
  );
};
