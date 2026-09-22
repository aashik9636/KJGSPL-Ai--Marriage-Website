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
  EyeOff,
  Shield,
  ShieldCheck,
  PhoneCall,
  Sparkles,
  Heart,
  CheckCircle2,
  Lock,
  Play,
  Pause,
  Volume2,
  SlidersHorizontal,
  Home
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
  const [isPlayingVoice, setIsPlayingVoice] = React.useState(false);
  const [currentTimeStr, setCurrentTimeStr] = React.useState("0:00");
  const [photoShield, setPhotoShield] = React.useState(true);
  const [contactShield, setContactShield] = React.useState(true);
  const voiceAudioRef = React.useRef<HTMLAudioElement | null>(null);
  const bgMusicRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const voiceAudio = new Audio("/assets/voice-sample.mp3");
      const bgMusic = new Audio("/assets/soothing-music.wav");
      
      voiceAudio.volume = 1.0;
      bgMusic.volume = 0.22; // Gentle, soothing background volume
      bgMusic.loop = true;

      voiceAudioRef.current = voiceAudio;
      bgMusicRef.current = bgMusic;

      const handleTimeUpdate = () => {
        if (voiceAudio.duration && !isNaN(voiceAudio.duration)) {
          const cur = voiceAudio.currentTime;
          const mins = Math.floor(cur / 60);
          const secs = Math.floor(cur % 60);
          setCurrentTimeStr(`${mins}:${secs < 10 ? "0" : ""}${secs}`);
        }
      };

      const handleEnded = () => {
        setIsPlayingVoice(false);
        setCurrentTimeStr("0:00");
        if (bgMusicRef.current) {
          bgMusicRef.current.pause();
          bgMusicRef.current.currentTime = 0;
        }
      };

      voiceAudio.addEventListener("timeupdate", handleTimeUpdate);
      voiceAudio.addEventListener("ended", handleEnded);

      return () => {
        voiceAudio.pause();
        bgMusic.pause();
        voiceAudio.removeEventListener("timeupdate", handleTimeUpdate);
        voiceAudio.removeEventListener("ended", handleEnded);
      };
    }
  }, []);

  const handleVoiceToggle = () => {
    const voiceAudio = voiceAudioRef.current;
    const bgMusic = bgMusicRef.current;

    if (isPlayingVoice) {
      if (voiceAudio) {
        voiceAudio.pause();
        voiceAudio.currentTime = 0;
      }
      if (bgMusic) {
        bgMusic.pause();
        bgMusic.currentTime = 0;
      }
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingVoice(false);
      setCurrentTimeStr("0:00");
    } else {
      if (voiceAudio) {
        voiceAudio.currentTime = 0;
        if (bgMusic) {
          bgMusic.currentTime = 0;
          bgMusic.play().catch(() => {});
        }
        voiceAudio
          .play()
          .then(() => {
            setIsPlayingVoice(true);
          })
          .catch(() => {
            // SpeechSynthesis fallback with gentle natural tone
            if (typeof window !== "undefined" && "speechSynthesis" in window) {
              window.speechSynthesis.cancel();
              const utterance = new SpeechSynthesisUtterance(
                "I think the best plans leave a little room for the unexpected."
              );
              const voices = window.speechSynthesis.getVoices();
              const femaleVoice = voices.find(
                (v) =>
                  v.name.includes("Samantha") ||
                  v.name.includes("Victoria") ||
                  v.name.includes("Karen") ||
                  v.name.includes("Zira") ||
                  v.name.includes("Neerja") ||
                  (v.lang.startsWith("en") && v.name.toLowerCase().includes("female"))
              );

              if (femaleVoice) utterance.voice = femaleVoice;
              utterance.rate = 0.92;
              utterance.pitch = 1.05;

              utterance.onstart = () => {
                setIsPlayingVoice(true);
                if (bgMusic) {
                  bgMusic.currentTime = 0;
                  bgMusic.play().catch(() => {});
                }
              };
              utterance.onend = () => {
                setIsPlayingVoice(false);
                setCurrentTimeStr("0:00");
                if (bgMusic) {
                  bgMusic.pause();
                  bgMusic.currentTime = 0;
                }
              };
              utterance.onerror = () => {
                setIsPlayingVoice(false);
                setCurrentTimeStr("0:00");
                if (bgMusic) {
                  bgMusic.pause();
                  bgMusic.currentTime = 0;
                }
              };

              window.speechSynthesis.speak(utterance);
            }
          });
      }
    }
    if (onToggleVoice) {
      onToggleVoice();
    }
  };

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
        <div>
          <div className="eyebrow">06 / INTELLIGENT AI FEATURES</div>
          <h2 id="more-ways-title">
            More ways to find
            <br />
            <em>your kind of connection.</em>
          </h2>
        </div>
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

          <div className="icebreaker-preview">
            <img src="/assets/arjun.png" alt="Arjun avatar" className="icebreaker-avatar" />
            <div className="chat-bubble-sample">{selectedIcebreaker}</div>
          </div>

          <div className="icebreaker-pills">
            {["Your ideal Sunday?", "A place that feels like home?", "What made you smile today?"].map(
              (prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className={`icebreaker-pill ${selectedIcebreaker === prompt ? "active" : ""}`}
                  onClick={() => onSelectIcebreaker(prompt)}
                >
                  <span>{prompt}</span>
                  <ArrowUpRight size={13} />
                </button>
              )
            )}
          </div>

          <span className="bento-footnote">✦ Tap any prompt to preview</span>
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
              className={`bento-card bento-voice ${isPlayingVoice ? "is-playing" : ""}`}
              onClick={handleVoiceToggle}
              role="button"
              tabIndex={0}
              aria-label={isPlayingVoice ? "Pause voice note" : "Play voice note"}
            >
              <div className="bento-eyebrow">
                <Headphones size={13} />
                <span>A VOICE BEHIND THE WORDS</span>
              </div>

              <div className="voice-player-row">
                <button
                  type="button"
                  className={`voice-play-icon ${isPlayingVoice ? "playing" : ""}`}
                  aria-label={isPlayingVoice ? "Pause voice note" : "Play voice note"}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVoiceToggle();
                  }}
                >
                  {isPlayingVoice ? (
                    <Pause size={14} />
                  ) : (
                    <Play size={14} style={{ marginLeft: "2px" }} />
                  )}
                </button>
                <div className={`waveform-bars ${isPlayingVoice ? "animated" : ""}`}>
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
                <span className="voice-duration">
                  {isPlayingVoice ? currentTimeStr : "0:12"}
                </span>
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
        </div>

        {/* Card 5: Your pace. Your space. (Bottom Control Card - Spans Full Width) */}
        <div className="bento-card bento-control">
          <div className="control-card-header">
            <div className="bento-eyebrow">
              <Shield size={13} />
              <span>YOUR PACE. YOUR SPACE.</span>
            </div>
            <div className={`control-status-pill ${profileHidden ? "private" : "discoverable"}`}>
              <span>{profileHidden ? "Incognito Shield Active" : "Public Discovery Active"}</span>
            </div>
          </div>

          <div className="control-stage-grid">
            {/* Left Column: Toggles Stack */}
            <div className="control-toggles-col">
              <h3 className="bento-card-title control-title">
                A little more control over your presence.
              </h3>
              <p className="control-intro-desc">
                Browse silently at your own comfort. Control who sees your photos, contact details, and activity.
              </p>

              <div className="control-toggles-stack">
                {/* Toggle 1: Ghost Mode (Discovery) */}
                <div
                  className={`control-toggle-card ${profileHidden ? "active-private" : ""}`}
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest('button[role="switch"]')) return;
                    onToggleProfileHidden(!profileHidden);
                  }}
                >
                  <div className="control-toggle-left">
                    <div className="toggle-icon-wrap">
                      {profileHidden ? <EyeOff size={15} /> : <Eye size={15} />}
                    </div>
                    <div className="control-label-group">
                      <span className="control-main-label">Ghost Mode (Stealth Discovery)</span>
                      <span className="control-sub-label">
                        {profileHidden
                          ? "Invisible in search · Only profiles you like can view you"
                          : "Discoverable to verified community members"}
                      </span>
                    </div>
                  </div>
                  <Switch
                    checked={profileHidden}
                    onCheckedChange={(checked) => onToggleProfileHidden(checked)}
                    aria-label="Toggle ghost mode"
                  />
                </div>

                {/* Toggle 2: Photo Guard */}
                <div
                  className={`control-toggle-card ${photoShield ? "active-private" : ""}`}
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest('button[role="switch"]')) return;
                    setPhotoShield(!photoShield);
                  }}
                >
                  <div className="control-toggle-left">
                    <div className="toggle-icon-wrap">
                      <Lock size={15} />
                    </div>
                    <div className="control-label-group">
                      <span className="control-main-label">Photo Privacy Shield</span>
                      <span className="control-sub-label">
                        {photoShield
                          ? "Photos softly protected until mutual match interest"
                          : "Photos visible to all verified community members"}
                      </span>
                    </div>
                  </div>
                  <Switch
                    checked={photoShield}
                    onCheckedChange={(checked) => setPhotoShield(checked)}
                    aria-label="Toggle photo shield"
                  />
                </div>

                {/* Toggle 3: Contact Lock */}
                <div
                  className={`control-toggle-card ${contactShield ? "active-private" : ""}`}
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest('button[role="switch"]')) return;
                    setContactShield(!contactShield);
                  }}
                >
                  <div className="control-toggle-left">
                    <div className="toggle-icon-wrap">
                      <PhoneCall size={15} />
                    </div>
                    <div className="control-label-group">
                      <span className="control-main-label">Direct Contact Guard</span>
                      <span className="control-sub-label">
                        {contactShield
                          ? "Phone & WhatsApp locked until personal mutual consent"
                          : "Phone contact visible to accepted matches"}
                      </span>
                    </div>
                  </div>
                  <Switch
                    checked={contactShield}
                    onCheckedChange={(checked) => setContactShield(checked)}
                    aria-label="Toggle contact guard"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Front-Facing Mobile Phone Mockup */}
            <div className="control-phone-wrapper">
              <div className="privacy-phone-chassis">
                {/* Phone Bezel & Outer Shell */}
                <div className="privacy-phone-inner">
                  {/* Top Status Bar with Dynamic Island */}
                  <div className="privacy-phone-status-row">
                    <span className="phone-clock">3:28</span>
                    <div className="privacy-phone-island">
                      <div className="island-lens" />
                      <div className="island-sensor" />
                    </div>
                    <div className="phone-status-dots">
                      <span>•••</span>
                    </div>
                  </div>

                  {/* Sub-header Filter Line */}
                  <div className="phone-sub-nav">
                    <span className="sub-nav-text">For a little more</span>
                    <SlidersHorizontal size={13} className="sub-nav-icon" />
                  </div>

                  {/* In-App Mobile Screen */}
                  <div className="privacy-screen-body">
                    {/* User Profile Header */}
                    <div className="phone-maya-header">
                      <div className="maya-avatar-wrap">
                        <img
                          src="/assets/mira.png"
                          alt="Maya"
                          className={`maya-avatar-img ${photoShield ? "photo-shielded" : ""}`}
                        />
                        {photoShield && (
                          <div className="maya-shield-icon-badge" title="Photo Guard Active">
                            <Lock size={11} />
                          </div>
                        )}
                        {profileHidden && !photoShield && (
                          <div className="maya-ghost-badge" title="Ghost Mode Active">
                            <EyeOff size={11} />
                          </div>
                        )}
                      </div>
                      <div className="maya-name-box">
                        <h4 className="maya-name">
                          Maya, 29
                          {profileHidden && <span className="maya-private-tag">🔒 Private</span>}
                        </h4>
                        <div className="maya-role-contact-line">
                          <span className="maya-role">Architect · Dubai</span>
                          {contactShield ? (
                            <span className="maya-contact-pill locked" title="Direct Contact Locked">
                              <Lock size={8} /> Locked
                            </span>
                          ) : (
                            <span className="maya-contact-pill shared" title="Direct Contact Shared">
                              <PhoneCall size={8} /> 📞 Shared
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Section Heading */}
                    <div className="maya-about-section">
                      <span className="maya-eyebrow">A LITTLE ABOUT ME</span>
                      <h3 className="maya-headline">
                        Big dreams.
                        <br />
                        Small joys.
                        <br />
                        <em>Room for two.</em>
                      </h3>
                      <p className="maya-bio">
                        I design spaces for a living. My favorite place? A table full of people I love.
                      </p>

                      {/* Interest Chips */}
                      <div className="maya-chips-row">
                        <span className="maya-chip">Architecture</span>
                        <span className="maya-chip">Long walks</span>
                        <span className="maya-chip">Sunday cooking</span>
                      </div>

                      {/* Bottom Feature Card */}
                      <div className="maya-life-card">
                        <div className="life-card-top">
                          <Home size={12} className="life-card-icon" />
                          <strong>A life I&apos;d love</strong>
                        </div>
                        <p>A home in Dubai, close to family.</p>
                      </div>
                    </div>
                  </div>

                  {/* Phone Bottom Home Bar */}
                  <div className="phone-home-indicator-bar" />
                </div>
              </div>
            </div>
          </div>

          <span className="bento-footnote">✦ Interactive Privacy Simulator · Test your security settings on mobile in real-time</span>
        </div>
      </div>
    </section>
  );
};
