"use client";
import React, { useState } from "react";
import { 
  HeartHandshake, 
  Coffee, 
  Compass, 
  Heart,
  Plus
} from "lucide-react";

interface PillarData {
  id: string;
  stepNum: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: React.ElementType;
  chips: string[];
}

const PILLARS: PillarData[] = [
  {
    id: "values",
    stepNum: "CARD 01",
    category: "CORE FOUNDATION",
    title: "Your Values",
    subtitle: "What grounds you at your core",
    description: "Deep integrity, emotional maturity, mutual respect, and family roots that anchor a lifetime of sacred trust.",
    image: "/assets/Your_values.jpg",
    icon: HeartHandshake,
    chips: ["Family Roots", "Emotional Depth", "Sacred Trust"],
  },
  {
    id: "everyday",
    stepNum: "CARD 02",
    category: "DAILY HARMONY",
    title: "Your Everyday",
    subtitle: "How you live & laugh together",
    description: "Daily coffee rituals, communication rhythms, shared laughter, and calm, mindful companionship.",
    image: "/assets/Your_everyday.jpg",
    icon: Coffee,
    chips: ["Morning Coffee", "Quality Time", "Gentle Talks"],
  },
  {
    id: "tomorrow",
    stepNum: "CARD 03",
    category: "SHARED DESTINY",
    title: "Your Tomorrow",
    subtitle: "Where you are building together",
    description: "Shared ambitions, parenting visions, financial harmony, and lifelong personal and mutual growth.",
    image: "/assets/Your_tommorow.jpg",
    icon: Compass,
    chips: ["Shared Vision", "Family Future", "Lifelong Bond"],
  },
];

/* Clean Plus Connector between cards (No Circle) */
const PlusConnectorNode: React.FC = () => (
  <div className="pillar-plus-node" aria-hidden="true">
    <Plus size={30} className="pure-plus-icon" strokeWidth={2.4} />
  </div>
);

export const PhilosophySection: React.FC = () => {
  const [activePillar, setActivePillar] = useState<string>("everyday");

  return (
    <section 
      className="philosophy-section" 
      id="story"
      style={{
        background: "linear-gradient(180deg, #faf5f0 0%, #eee4d8 15%, #e6d8c7 50%, #eee4d8 85%, #faf5f0 100%)",
        border: "none"
      }}
    >
      {/* Background Glow */}
      <div className="philosophy-ambient-glow" />

      {/* Header Container */}
      <div className="philosophy-header">
        <h2 className="philosophy-title">
          Attraction opens the door.
          <br />
          <em>Understanding invites you in.</em>
        </h2>
        <p className="philosophy-desc">
          A photograph can say hello. It can’t tell you how someone
          communicates, what family means to them, or the life they hope to
          build together.
        </p>
      </div>

      {/* 3 Royal Shadi Wedding Cards Container */}
      <div className="philosophy-pillars-container">
        <div className="shadi-cards-container">
          {PILLARS.map((pillar, idx) => {
            return (
              <React.Fragment key={pillar.id}>
                {/* Royal Wedding Card */}
                <article
                  className={`wedding-card ${pillar.id === "everyday" ? "wedding-card-compact" : ""}`}
                >
                  {/* Top Header Bar */}
                  <div className="wedding-card-top-bar">
                    <span className="wedding-step-badge">{pillar.stepNum}</span>
                    <span className="wedding-gold-bullet">✦</span>
                    <span className="wedding-category-text">{pillar.category}</span>
                  </div>

                  {/* Arched Photo Frame */}
                  <div className="wedding-arch-wrapper">
                    <div className="wedding-arch-frame">
                      <img 
                        src={pillar.image} 
                        alt={pillar.title} 
                        className="wedding-arch-image" 
                        loading="lazy"
                      />
                      <div className="wedding-arch-inner-line" />
                    </div>
                  </div>

                  {/* Wedding Card Body */}
                  <div className="wedding-card-content">
                    <div className="wedding-card-titles">
                      <h3 className="wedding-title-heading">{pillar.title}</h3>
                      <span className="wedding-subtitle-text">{pillar.subtitle}</span>
                    </div>

                    <p className="wedding-description-text">{pillar.description}</p>

                    {/* Gold Foil Chips */}
                    <div className="wedding-chips-container">
                      {pillar.chips.map((chip, cIdx) => (
                        <span key={cIdx} className="wedding-chip-pill">
                          <span className="chip-gold-star">✦</span> {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>

                {/* Plus Sign Between Cards */}
                {idx < PILLARS.length - 1 && (
                  <PlusConnectorNode />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Philosophy Principle Formula Banner */}
      <div className="philosophy-formula-banner">
        <div className="formula-icon-wrap">
          <Heart size={16} />
        </div>
        <div className="formula-text-wrap">
          <strong>The AI Marriage Alignment Principle:</strong>
          <span>Core Values + Everyday Harmony + Lifelong Vision = A Sacred Bond Built to Last.</span>
        </div>
      </div>
    </section>
  );
};

