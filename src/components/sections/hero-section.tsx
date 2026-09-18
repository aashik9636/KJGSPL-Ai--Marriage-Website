"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Heart,
  ArrowRight,
  ArrowUpRight,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Sparkles,
} from "lucide-react";

import { useAudioChime } from "@/hooks/use-audio-chime";

export type HeroStoryStage =
  | "intro"
  | "discovering"
  | "different"
  | "insight"
  | "aligned";

interface HeroSectionProps {
  sound: boolean;
  motion: boolean;
  onToggleSound: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  sound,
  motion,
  onToggleSound,
}) => {
  const [storyStage, setStoryStage] = useState<HeroStoryStage>("intro");
  const [paused, setPaused] = useState(false);
  const storyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Enhanced Harmonic Web Audio Chime
  const { playChime, playClickChime } = useAudioChime(sound);

  const handleToggleSound = () => {
    if (!sound) {
      // Preview chime when turning ON
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        const ac = new AudioCtx();
        const now = ac.currentTime;
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.18);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.025, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.start(now);
        osc.stop(now + 0.45);
        osc.onended = () => void ac.close();
      } catch {
        // ignore
      }
    }
    onToggleSound();
  };

  // Automated Timeline Sequence
  useEffect(() => {
    if (paused) return;

    if (storyTimer.current) clearTimeout(storyTimer.current);

    if (storyStage === "discovering") {
      storyTimer.current = setTimeout(() => {
        setStoryStage("different");
        playChime();
      }, 2400);
    } else if (storyStage === "different") {
      storyTimer.current = setTimeout(() => {
        setStoryStage("insight");
      }, 4200);
    } else if (storyStage === "insight") {
      storyTimer.current = setTimeout(() => {
        setStoryStage("aligned");
        playChime();
      }, 2800);
    }

    return () => {
      if (storyTimer.current) clearTimeout(storyTimer.current);
    };
  }, [storyStage, paused, sound]);

  const startStory = () => {
    playChime();
    setPaused(false);
    setStoryStage("discovering");
  };

  const isAligned = storyStage === "aligned";
  const rightPerson = isAligned
    ? { name: "Dev", age: 31, role: "Product designer · Dubai", img: "/assets/dev.png" }
    : { name: "Arjun", age: 32, role: "Architect · Dubai", img: "/assets/arjun.png" };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="small-line" /> FOR THE BEAUTIFULLY HUMAN
        </div>
        <h1 id="hero-title">
          A little spark.
          <br />A deeper <em>something.</em>
        </h1>
        <p className="hero-description">
          Looks catch your eye.
          <br />
          Shared values make you stay.
        </p>
        <p className="hero-note">
          Meet the person behind the profile.
          <br />
          Find the things that could bring you closer.
        </p>

        <div className="hero-cta-group">
          <button className="button button-dark hero-story-btn" onClick={startStory}>
            <Play size={16} fill="currentColor" /> See beyond the photo
          </button>
          <a className="button button-outline" href="#experience">
            Explore stories <ArrowRight size={17} />
          </a>
        </div>

        <div className="hero-foot">
          <span className="mini-heart">
            <Heart size={15} />
          </span>{" "}
          Built around who you are. And what matters to you.
        </div>
      </div>

      {/* Interactive Editorial Stage with 5-stage animation */}
      <div
        className="hero-editorial"
        aria-label="Interactive profile story demonstration"
      >
        {/* Left Card: Mira */}
        <div className="portrait portrait-mira">
          <img
            src="/assets/mira.png"
            alt="Mira, 29, Creative director"
            fetchPriority="high"
          />
          {storyStage === "discovering" && <div className="light-sweep-scanner" />}
          <div className="portrait-caption">
            <span>Mira, 29</span>
            <small>Dubai · A little curious</small>
          </div>
        </div>

        {/* Right Card: Swaps Arjun -> Dev when aligned */}
        <div
          className={`portrait portrait-arjun ${isAligned ? "portrait-dev-swapped" : ""}`}
          key={rightPerson.name}
        >
          <img
            src={rightPerson.img}
            alt={`${rightPerson.name}, ${rightPerson.age}, ${rightPerson.role}`}
            fetchPriority="high"
          />
          {storyStage === "discovering" && <div className="light-sweep-scanner" />}
          <div className="portrait-caption">
            <span>
              {rightPerson.name}, {rightPerson.age}
            </span>
            <small>{rightPerson.role}</small>
          </div>
        </div>

        {/* Center Joining Symbol */}
        <div className={`hero-center-badge ${isAligned ? "aligned" : ""}`}>
          {isAligned ? (
            <Sparkles size={20} className="sparkle-icon-animated" />
          ) : (
            <span className="join-ampersand">&</span>
          )}
        </div>

        {/* Floating Story Card with 5-Stage Transitions */}
        <div className={`floating-story-card stage-${storyStage}`}>
          {/* Stage 1: Intro */}
          {storyStage === "intro" && (
            <div className="story-card-inner">
              <span className="star-mark">✳</span>
              <div className="story-card-text">
                <div>
                  They look like a match.
                  <br />
                  <em>But are they?</em>
                </div>
              </div>
              <button
                className="story-action-circle"
                onClick={startStory}
                aria-label="See beyond the photo"
              >
                <ArrowUpRight size={20} />
              </button>
            </div>
          )}

          {/* Stage 2: Discovering / Scanning */}
          {storyStage === "discovering" && (
            <div className="story-card-inner discovering-view">
              <div className="discovering-header">
                <span className="discovering-eyebrow">
                  <Sparkles size={12} /> BEYOND THE PHOTO
                </span>
                <span className="discovering-title">
                  Getting to know their self-described answers…
                </span>
              </div>
              <div className="story-chips-row">
                {[
                  "Values & intent",
                  "Lifestyle",
                  "Family",
                  "Communication",
                  "Future plans",
                ].map((tag, idx) => (
                  <span
                    className="story-chip"
                    key={tag}
                    style={{ animationDelay: `${idx * 0.22}s` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Stage 3: Different / Low Alignment */}
          {storyStage === "different" && (
            <div className="story-card-inner different-view">
              <div className="story-score-badge score-low">
                58<span>/100</span>
              </div>
              <div className="story-card-text">
                <strong>Different plans. Important conversations.</strong>
                <p>Mira wants to put down roots; Arjun is considering another move.</p>
              </div>
            </div>
          )}

          {/* Stage 4: Philosophical Insight */}
          {storyStage === "insight" && (
            <div className="story-card-inner insight-view">
              <div className="insight-sparkle-icon">
                <Sparkles size={18} />
              </div>
              <div className="story-card-text">
                <span className="insight-quote">
                  Looks can spark interest.{" "}
                  <em>They cannot tell the whole story.</em>
                </span>
              </div>
            </div>
          )}

          {/* Stage 5: Aligned / Shared Direction */}
          {isAligned && (
            <div className="story-card-inner aligned-view">
              <div className="story-score-badge score-high">
                89<span>/100</span>
              </div>
              <div className="story-card-text">
                <strong>A connection worth exploring.</strong>
                <p>Shared direction. Room for individuality.</p>
              </div>
              <button
                className="story-replay-btn"
                onClick={startStory}
                aria-label="Replay story"
              >
                <RotateCcw size={13} /> Replay
              </button>
            </div>
          )}
        </div>

        <span className="vertical-caption">
          FIRST IMPRESSIONS ARE JUST THE BEGINNING
        </span>
      </div>

      <div className="hero-bottom">
        <span>Something real starts with curiosity.</span>
        <button
          className="sound-button"
          onClick={handleToggleSound}
          aria-pressed={sound}
          aria-label={sound ? "Mute audio" : "Enable audio"}
          title={sound ? "Sound: On" : "Sound: Off"}
        >
          {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
      </div>
    </section>
  );
};
