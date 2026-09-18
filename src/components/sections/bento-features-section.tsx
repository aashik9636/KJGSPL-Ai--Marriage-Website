"use client";
import React from "react";
import {
  MessageSquare,
  ArrowUpRight,
  MapPin,
  Coffee,
  Headphones,
  MessageCircle,
  Compass,
  Eye,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface BentoFeaturesSectionProps {
  selectedIcebreaker: string;
  onSelectIcebreaker: (icebreaker: string) => void;
  voicePlaying: boolean;
  onToggleVoice: () => void;
  profileHidden: boolean;
  onToggleProfileHidden: (hidden: boolean) => void;
  onOpenJourney: () => void;
  onOpenReasons?: () => void;
}

export const BentoFeaturesSection: React.FC<BentoFeaturesSectionProps> = ({
  selectedIcebreaker,
  onSelectIcebreaker,
  voicePlaying,
  onToggleVoice,
  profileHidden,
  onToggleProfileHidden,
  onOpenJourney,
  onOpenReasons,
}) => {
  const [activeCity, setActiveCity] = React.useState<"london" | "dubai" | "mumbai">("dubai");

  const CITY_EVENTS = {
    dubai: {
      city: "Dubai",
      title: "Coffee & good conversation",
      desc: "Dubai · Downtown & DIFC · 18 members attending",
    },
    london: {
      city: "London",
      title: "Gallery walk & evening tea",
      desc: "London · Mayfair & Soho · 24 members attending",
    },
    mumbai: {
      city: "Mumbai",
      title: "Sunset conversation & artisanal coffee",
      desc: "Mumbai · Bandra & BKC · 32 members attending",
    },
  };

  const currentEvent = CITY_EVENTS[activeCity];

  return (
    <section className="more-ways-section" id="more-ways" aria-labelledby="more-ways-title">
      <div className="more-ways-header">
        <h2 id="more-ways-title">
          More ways to find
          <br />
          <em>your kind of connection.</em>
        </h2>
      </div>

      <div className="bento-grid">
        {/* Card 1: Skip the small talk (Tall Left Card) */}
        <div className="bento-card bento-icebreaker">
          <div className="bento-eyebrow">
            <MessageSquare size={13} />
            <span>SKIP THE SMALL TALK</span>
          </div>
          <h3 className="bento-card-title">
            A better kind
            <br />
            of “hey.”
          </h3>

          <div className="icebreaker-chat-area">
            <div className="icebreaker-bubble-row">
              <img src="/assets/arjun.png" alt="Arjun avatar" className="icebreaker-avatar" />
              <div className="icebreaker-speech-bubble">
                <p>{selectedIcebreaker}</p>
              </div>
            </div>

            <div className="icebreaker-options">
              <button
                className={`icebreaker-btn ${selectedIcebreaker === "Your ideal Sunday?" ? "selected" : ""}`}
                onClick={() => onSelectIcebreaker("Your ideal Sunday?")}
              >
                Your ideal Sunday? <ArrowUpRight size={13} />
              </button>
              <button
                className={`icebreaker-btn ${selectedIcebreaker === "A place that feels like home?" ? "selected" : ""}`}
                onClick={() => onSelectIcebreaker("A place that feels like home?")}
              >
                A place that feels like home? <ArrowUpRight size={13} />
              </button>
              <button
                className={`icebreaker-btn ${selectedIcebreaker === "What made you smile today?" ? "selected" : ""}`}
                onClick={() => onSelectIcebreaker("What made you smile today?")}
              >
                What made you smile today? <ArrowUpRight size={13} />
              </button>
            </div>
          </div>

          <span className="bento-footnote">Sample icebreakers · Try one</span>
        </div>

        {/* Right Bento Column */}
        <div className="bento-right-column">
          {/* Card 2: Offline Connections (Wide Top Card) */}
          <div className="bento-card bento-offline">
            <div className="offline-top-row">
              <div className="offline-content-side">
                <div className="bento-eyebrow">
                  <MapPin size={13} />
                  <span>SOME CONNECTIONS HAPPEN OFFLINE</span>
                </div>
                <h3 className="bento-card-title">
                  A new place.
                  <br />
                  A familiar feeling.
                </h3>
              </div>

              <div className="offline-map-visual">
                <div className="map-grid-lines">
                  {/* Animated SVG Flight Path & Particle */}
                  <svg className="map-curve-svg" viewBox="0 0 320 100" fill="none">
                    <defs>
                      <linearGradient id="flightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#be185d" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#411c2b" stopOpacity="1" />
                        <stop offset="100%" stopColor="#be185d" stopOpacity="0.8" />
                      </linearGradient>
                      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    {/* Flight Route Path Definition */}
                    <path
                      id="globalFlightRoute"
                      d="M 52 42 Q 116 12, 180 52 Q 228 32, 275 64"
                      fill="none"
                    />

                    {/* Static Background Track */}
                    <path
                      d="M 52 42 Q 116 12, 180 52 Q 228 32, 275 64"
                      stroke="rgba(197, 178, 170, 0.45)"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />

                    {/* Animated Flowing Pulse Line */}
                    <path
                      d="M 52 42 Q 116 12, 180 52 Q 228 32, 275 64"
                      stroke="url(#flightGradient)"
                      strokeWidth="2.2"
                      strokeDasharray="10 14"
                      className="animated-flight-stream"
                    />

                    {/* Glowing Traveling Beacon Particle following the flight route */}
                    <g className="flying-beacon-group">
                      <animateMotion
                        dur="4.5s"
                        repeatCount="indefinite"
                        rotate="auto"
                      >
                        <mpath href="#globalFlightRoute" />
                      </animateMotion>
                      <circle r="6" fill="#be185d" opacity="0.3" filter="url(#glow)" />
                      <circle r="3.5" fill="#411c2b" />
                      <circle r="1.5" fill="#ffffff" />
                    </g>
                  </svg>

                  {/* Pin 1: London */}
                  <button
                    type="button"
                    className={`map-pin pin-london ${activeCity === "london" ? "active" : ""}`}
                    onClick={() => setActiveCity("london")}
                    aria-label="Select London hub"
                  >
                    {activeCity === "london" && (
                      <div className="radar-ripple-container">
                        <span className="radar-wave wave-1" />
                        <span className="radar-wave wave-2" />
                      </div>
                    )}
                    <div className="pin-badge-wrapper">
                      {activeCity === "london" ? (
                        <div className="pin-badge">
                          <MapPin size={13} />
                        </div>
                      ) : (
                        <span className="pin-dot">
                          <MapPin size={11} />
                        </span>
                      )}
                    </div>
                    <span className="pin-label">London</span>
                  </button>

                  {/* Pin 2: Dubai */}
                  <button
                    type="button"
                    className={`map-pin pin-dubai ${activeCity === "dubai" ? "active" : ""}`}
                    onClick={() => setActiveCity("dubai")}
                    aria-label="Select Dubai hub"
                  >
                    {activeCity === "dubai" && (
                      <div className="radar-ripple-container">
                        <span className="radar-wave wave-1" />
                        <span className="radar-wave wave-2" />
                      </div>
                    )}
                    <div className="pin-badge-wrapper">
                      {activeCity === "dubai" ? (
                        <div className="pin-badge">
                          <MapPin size={13} />
                        </div>
                      ) : (
                        <span className="pin-dot">
                          <MapPin size={11} />
                        </span>
                      )}
                    </div>
                    <span className="pin-label">Dubai</span>
                  </button>

                  {/* Pin 3: Mumbai */}
                  <button
                    type="button"
                    className={`map-pin pin-mumbai ${activeCity === "mumbai" ? "active" : ""}`}
                    onClick={() => setActiveCity("mumbai")}
                    aria-label="Select Mumbai hub"
                  >
                    {activeCity === "mumbai" && (
                      <div className="radar-ripple-container">
                        <span className="radar-wave wave-1" />
                        <span className="radar-wave wave-2" />
                      </div>
                    )}
                    <div className="pin-badge-wrapper">
                      {activeCity === "mumbai" ? (
                        <div className="pin-badge">
                          <MapPin size={13} />
                        </div>
                      ) : (
                        <span className="pin-dot">
                          <MapPin size={11} />
                        </span>
                      )}
                    </div>
                    <span className="pin-label">Mumbai</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Dynamic Event Preview Bar */}
            <div className="offline-event-bar">
              <div className="event-icon-box">
                <Coffee size={16} />
              </div>
              <div className="event-info">
                <h4>{currentEvent.title}</h4>
                <p>{currentEvent.desc}</p>
              </div>
              <ArrowUpRight size={16} className="event-arrow" />
            </div>
          </div>

          {/* Middle Row: Card 3 (Voice) & Card 4 (Individuality) */}
          <div className="bento-middle-row">
            {/* Card 3: Voice behind the words */}
            <div
              className="bento-card bento-voice"
              onClick={onToggleVoice}
            >
              <div className="bento-eyebrow">
                <Headphones size={13} />
                <span>A VOICE BEHIND THE WORDS</span>
              </div>

              <div className="voice-player-row">
                <div className={`voice-play-icon ${voicePlaying ? "playing" : ""}`}>
                  <MessageCircle size={16} />
                </div>
                <div className={`waveform-bars ${voicePlaying ? "animated" : ""}`}>
                  <span style={{ height: "40%" }} />
                  <span style={{ height: "70%" }} />
                  <span style={{ height: "100%" }} />
                  <span style={{ height: "55%" }} />
                  <span style={{ height: "85%" }} />
                  <span style={{ height: "45%" }} />
                  <span style={{ height: "90%" }} />
                  <span style={{ height: "65%" }} />
                  <span style={{ height: "100%" }} />
                  <span style={{ height: "50%" }} />
                  <span style={{ height: "80%" }} />
                  <span style={{ height: "60%" }} />
                  <span style={{ height: "95%" }} />
                  <span style={{ height: "40%" }} />
                  <span style={{ height: "75%" }} />
                  <span style={{ height: "35%" }} />
                  <span style={{ height: "65%" }} />
                </div>
                <span className="voice-duration">0:12</span>
              </div>

              <p className="voice-quote">
                “I think the best plans leave a little room for the unexpected.”
              </p>
              <span className="bento-footnote">Voice message concept · Transcript preview only</span>
            </div>

            {/* Card 4: Same direction / Beautifully different (Dark Wine Card) */}
            <div className="bento-card bento-different">
              <div className="bento-eyebrow light">
                <Compass size={13} />
                <span>SAME DIRECTION. YOUR OWN WAY.</span>
              </div>

              <h3 className="bento-card-title light">
                Room to be
                <br />
                <em>beautifully different.</em>
              </h3>

              <div className="different-notes">
                <p>One plans the weekend.</p>
                <p>One finds the unexpected turn.</p>
                <p>Both want to go together.</p>
              </div>

              <button
                className="different-link"
                onClick={onOpenReasons || onOpenJourney}
              >
                See the reasons <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

          {/* Card 5: Your pace. Your space. (Bottom Control Card) */}
          <div className="bento-card bento-control">
            <div className="bento-eyebrow">
              <Eye size={13} />
              <span>YOUR PACE. YOUR SPACE.</span>
            </div>
            <h3 className="bento-card-title">A little more control.</h3>

            <div className="control-toggle-row">
              <div className="control-label-group">
                <span className="control-main-label">Profile discovery</span>
                <span className="control-sub-label">
                  {profileHidden ? "Hidden until you are ready" : "Visible to mutual matches"}
                </span>
              </div>
              <Switch
                checked={!profileHidden}
                onCheckedChange={(checked) => onToggleProfileHidden(!checked)}
                aria-label="Toggle profile discovery"
              />
            </div>

            <span className="bento-footnote">Control preview · No live profile is affected.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
