"use client";
import React, { useState, useEffect } from "react";
import {
  SlidersHorizontal,
  Check,
  Sparkles,
  Send,
  Home as HomeIcon,
} from "lucide-react";
import { mockupSteps } from "@/data/showcase.data";

interface ShowcaseSectionProps {
  activeStep: number;
  onSelectStep: (stepId: number) => void;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({
  activeStep,
  onSelectStep,
}) => {
  const [currentTime, setCurrentTime] = useState<string>("9:41");

  useEffect(() => {
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

  return (
    <section
      className="product-showcase-section"
      id="preview"
      aria-labelledby="showcase-title"
    >
      {/* Section Header */}
      <div className="showcase-header">
        <div className="eyebrow">03 / INTERACTIVE APP PREVIEW</div>
        <h2>
          Designed with intention.
          <br />
          <em>Built for meaningful connection.</em>
        </h2>
        <p>
          Experience how our intuitive interface turns values, shared timelines, and mutual curiosity into genuine lifelong conversations.
        </p>
      </div>

      {/* Step Navigation Tabs */}
      <div className="showcase-tabs-container">
        <div className="showcase-tabs" role="tablist" aria-label="Product preview steps">
          {mockupSteps.map((step) => (
            <button
              key={step.id}
              role="tab"
              aria-selected={activeStep === step.id}
              className={`showcase-tab ${activeStep === step.id ? "active" : ""}`}
              onClick={() => onSelectStep(step.id)}
            >
              <span className="tab-num">{step.num}</span>
              <span className="tab-label">{step.label}</span>
              {activeStep === step.id && <span className="tab-indicator" />}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Phone Mockups Grid */}
      <div className="phones-grid-wrapper">
        <div className="phones-grid">
          {/* Phone 1: 01 Discover */}
          <div
            className={`phone-card ${activeStep === 0 ? "phone-active" : ""}`}
            onClick={() => onSelectStep(0)}
          >
            <div className="phone-device">
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
              </div>
            </div>
          </div>

          {/* Phone 2: 02 Get to know */}
          <div
            className={`phone-card ${activeStep === 1 ? "phone-active" : ""}`}
            onClick={() => onSelectStep(1)}
          >
            <div className="phone-device">
              <div className="phone-island-bar">
                <span className="phone-time">{currentTime}</span>
                <div className="phone-island" />
                <div className="phone-status-icons">
                  <span className="signal-dot" />
                  <span className="signal-dot" />
                  <span className="signal-dot" />
                </div>
              </div>
              <div className="phone-screen phone-screen-profile">
                <div className="app-top-nav">
                  <span className="app-logo"><em>For a little more</em></span>
                  <SlidersHorizontal size={13} className="app-nav-icon" />
                </div>
                <div className="phone-profile-content">
                  <div className="profile-header-row">
                    <img src="/assets/mira.png" alt="Maya avatar" className="avatar-img" />
                    <div>
                      <h5>Maya, 29</h5>
                      <p>Architect · Dubai</p>
                    </div>
                  </div>
                  <div className="profile-section-label">A LITTLE ABOUT ME</div>
                  <div className="profile-editorial-headline">
                    <h3>Big dreams.<br />Small joys.<br /><em>Room for two.</em></h3>
                  </div>
                  <p className="profile-bio-text">
                    I design spaces for a living. My favorite place? A table full of people I love.
                  </p>
                  <div className="profile-tags-row">
                    <span>Architecture</span>
                    <span>Long walks</span>
                    <span>Sunday cooking</span>
                  </div>
                  <div className="profile-highlight-box">
                    <div className="highlight-header">
                      <HomeIcon size={13} />
                      <span>A life I’d love</span>
                    </div>
                    <p>A home in Dubai, close to family.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phone 3: 03 Understand */}
          <div
            className={`phone-card ${activeStep === 2 ? "phone-active" : ""}`}
            onClick={() => onSelectStep(2)}
          >
            <div className="phone-device">
              <div className="phone-island-bar">
                <span className="phone-time">{currentTime}</span>
                <div className="phone-island" />
                <div className="phone-status-icons">
                  <span className="signal-dot" />
                  <span className="signal-dot" />
                  <span className="signal-dot" />
                </div>
              </div>
              <div className="phone-screen phone-screen-alignment">
                <div className="app-top-nav">
                  <span className="app-logo"><em>A closer look</em></span>
                  <SlidersHorizontal size={13} className="app-nav-icon" />
                </div>
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
              </div>
            </div>
          </div>

          {/* Phone 4: 04 Connect */}
          <div
            className={`phone-card ${activeStep === 3 ? "phone-active" : ""}`}
            onClick={() => onSelectStep(3)}
          >
            <div className="phone-device">
              <div className="phone-island-bar">
                <span className="phone-time">{currentTime}</span>
                <div className="phone-island" />
                <div className="phone-status-icons">
                  <span className="signal-dot" />
                  <span className="signal-dot" />
                  <span className="signal-dot" />
                </div>
              </div>
              <div className="phone-screen phone-screen-chat">
                <div className="app-top-nav">
                  <span className="app-logo"><em>Your conversation</em></span>
                  <SlidersHorizontal size={13} className="app-nav-icon" />
                </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
