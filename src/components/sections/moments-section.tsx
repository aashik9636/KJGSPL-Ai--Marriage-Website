"use client";
import React from "react";
import {
  ArrowUpRight,
  SlidersHorizontal,
  Compass,
  MessageCircle,
  Eye,
  Check,
  Sparkles,
  Send,
} from "lucide-react";
import { MomentsTabKey } from "@/types/common.types";
import { momentsTabsData } from "@/data/moments.data";

interface MomentsSectionProps {
  momentsTab: MomentsTabKey;
  onSelectTab: (tab: MomentsTabKey) => void;
  onOpenJourney: () => void;
  onOpenQuiz?: () => void;
}

export const MomentsSection: React.FC<MomentsSectionProps> = ({
  momentsTab,
  onSelectTab,
  onOpenJourney,
  onOpenQuiz,
}) => {
  const [currentTime, setCurrentTime] = React.useState<string>("9:41");

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      setCurrentTime(`${formattedHours}:${formattedMinutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="moments-section" id="moments" aria-labelledby="moments-title">
      <div className="moments-container">
        {/* Left Column: Copy & Interactive Tabs */}
        <div className="moments-copy">
          <span className="eyebrow">REAL CONNECTION. REAL LIFE.</span>
          <h2 id="moments-title">
            Made for the
            <br />
            moments between
            <br />
            <em>everything else.</em>
          </h2>

          <div className="moments-nav-tabs" role="tablist" aria-label="Moments tabs">
            <button
              role="tab"
              aria-selected={momentsTab === "discover"}
              className={`moments-tab ${momentsTab === "discover" ? "active" : ""}`}
              onClick={() => onSelectTab("discover")}
            >
              Discover
              {momentsTab === "discover" && <span className="tab-indicator" />}
            </button>
            <button
              role="tab"
              aria-selected={momentsTab === "understand"}
              className={`moments-tab ${momentsTab === "understand" ? "active" : ""}`}
              onClick={() => onSelectTab("understand")}
            >
              Understand
              {momentsTab === "understand" && <span className="tab-indicator" />}
            </button>
            <button
              role="tab"
              aria-selected={momentsTab === "connect"}
              className={`moments-tab ${momentsTab === "connect" ? "active" : ""}`}
              onClick={() => onSelectTab("connect")}
            >
              Connect
              {momentsTab === "connect" && <span className="tab-indicator" />}
            </button>
          </div>

          <div className="moments-tab-body">
            <h3>{momentsTabsData[momentsTab].title}</h3>
            <p>{momentsTabsData[momentsTab].description}</p>
          </div>

          <button
            className="button button-dark moments-cta"
            onClick={() => {
              if (onOpenQuiz) onOpenQuiz();
              else onOpenJourney();
            }}
          >
            Check Your Relationship Dynamic <ArrowUpRight size={18} />
          </button>
        </div>

        {/* Right Column: Visual Stage with Floating Elements & Phone Mockup */}
        <div className="moments-visual-stage">
          {/* Soft warm backdrop shape */}
          <div className="moments-backdrop-glow" />

          {/* Floating Sticky Note: The Coffee Break */}
          <div className="floating-sticky-note">
            <span className="sticky-tag">THE COFFEE BREAK</span>
            <span className="sticky-time">10:24 am</span>
            <p className="sticky-desc">A flat white. A fresh possibility.</p>
          </div>

          {/* Central Phone Mockup */}
          <div className="moments-phone-frame">
            <div className="phone-device moments-phone-chassis">
              <div className="phone-island-bar">
                <span className="phone-time">{currentTime}</span>
                <div className="phone-island" />
                <div className="phone-status-icons">
                  <span className="signal-dot" />
                  <span className="signal-dot" />
                  <span className="signal-dot" />
                </div>
              </div>

              <div className="phone-screen phone-screen-discover">
                <div className="app-top-nav">
                  <span className="app-logo"><em>For a little more</em></span>
                  <SlidersHorizontal size={13} className="app-nav-icon" />
                </div>

                {momentsTab === "discover" && (
                  <div className="phone-discover-content">
                    <div className="discover-hero-text">
                      <h4>A new possibility.</h4>
                      <p>Chosen with intention</p>
                    </div>
                    <div className="discover-image-card">
                      <img src="/assets/arjun.png" alt="Arjun, 30" />
                      <div className="discover-image-overlay">
                        <div className="profile-name">Arjun, 30</div>
                        <div className="profile-role">Designer · Dubai</div>
                      </div>
                    </div>
                    <div className="discover-tags">
                      <span className="pill-tag">Good listener</span>
                      <span className="pill-tag">Family-oriented</span>
                    </div>
                    <div className="discover-quote-box">
                      <p>“Building a life that feels as good as a slow Sunday.”</p>
                    </div>
                  </div>
                )}

                {momentsTab === "understand" && (
                  <div className="phone-alignment-content">
                    <div className="dual-avatars-center">
                      <img src="/assets/mira.png" alt="Maya" className="dual-avatar left" />
                      <span className="dual-plus">+</span>
                      <img src="/assets/arjun.png" alt="Arjun" className="dual-avatar right" />
                    </div>
                    <div className="alignment-score-display">
                      <span className="score-big">89</span>
                      <span className="score-denom">/100</span>
                    </div>
                    <div className="alignment-titles">
                      <h4>Shared direction.</h4>
                      <p>Illustrative profile alignment</p>
                    </div>
                    <div className="alignment-checklist">
                      <div className="check-item">
                        <Check size={12} className="check-icon" />
                        <span>Similar marriage timelines</span>
                      </div>
                      <div className="check-item">
                        <Check size={12} className="check-icon" />
                        <span>A home in the same city</span>
                      </div>
                      <div className="check-item">
                        <Check size={12} className="check-icon" />
                        <span>Kind, direct communication</span>
                      </div>
                    </div>
                    <div className="individuality-card">
                      <div className="indiv-head">
                        <Sparkles size={12} />
                        <span>Room for individuality</span>
                      </div>
                      <p>Spontaneous or planned weekends? A lovely thing to talk about.</p>
                    </div>
                  </div>
                )}

                {momentsTab === "connect" && (
                  <div className="phone-chat-content">
                    <div className="chat-partner-row">
                      <img src="/assets/arjun.png" alt="Arjun" className="avatar-img" />
                      <div>
                        <h5>Arjun</h5>
                        <p>A connection worth exploring</p>
                      </div>
                    </div>
                    <div className="chat-eyebrow-divider">
                      <span>A LITTLE CURIOSITY GOES A LONG WAY</span>
                    </div>
                    <div className="chat-thread">
                      <div className="chat-bubble prompt-bubble">
                        <p>What does your perfect Sunday look like?</p>
                      </div>
                      <div className="chat-bubble green-bubble left">
                        <p>Coffee, a bookshop, and absolutely no alarms.</p>
                      </div>
                      <div className="chat-bubble white-bubble right">
                        <p>I’m in. But I’ll probably have a bookshop picked out already.</p>
                      </div>
                      <div className="chat-bubble green-bubble left">
                        <p>You plan. I’ll find the coffee. ☕</p>
                      </div>
                    </div>
                    <div className="chat-rhythm-badge">
                      <Sparkles size={10} />
                      <span>Different styles. A shared rhythm.</span>
                    </div>
                    <div className="chat-input-bar">
                      <span>A good place to begin…</span>
                      <Send size={12} className="send-icon" />
                    </div>
                  </div>
                )}

                <div className="phone-bottom-nav">
                  <div className="nav-item active"><Compass size={15} /><span className="nav-dot" /></div>
                  <div className="nav-item"><MessageCircle size={15} /></div>
                  <div className="nav-item"><Eye size={15} /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Circular Seal */}
          <div className="floating-circular-seal">
            <Sparkles size={16} className="seal-star" />
            <p>
              <em>Little moments.</em>
              <br />
              Lovely possibilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
