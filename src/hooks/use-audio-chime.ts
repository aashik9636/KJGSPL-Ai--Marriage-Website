"use client";
import { useCallback } from "react";

export function useAudioChime(soundEnabled: boolean) {
  // Rich Harmonic Two-Tone Crystal Chime for Match & Spark Reveals
  const playChime = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ac = new AudioCtx();
      const now = ac.currentTime;

      // Primary Crystal Tone (C5 -> G5)
      const osc1 = ac.createOscillator();
      const gain1 = ac.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.18); // G5
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.025, now + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);
      osc1.connect(gain1);
      gain1.connect(ac.destination);
      osc1.start(now);
      osc1.stop(now + 0.65);

      // Harmonic Over-Tone (E5 -> C6) for warmth & luxury sparkle
      const osc2 = ac.createOscillator();
      const gain2 = ac.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(659.25, now + 0.04); // E5
      osc2.frequency.exponentialRampToValueAtTime(1046.5, now + 0.22); // C6
      gain2.gain.setValueAtTime(0, now + 0.04);
      gain2.gain.linearRampToValueAtTime(0.015, now + 0.06);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);
      osc2.connect(gain2);
      gain2.connect(ac.destination);
      osc2.start(now + 0.04);
      osc2.stop(now + 0.75);

      osc2.onended = () => {
        try {
          ac.close();
        } catch {
          // ignore
        }
      };
    } catch {
      // Audio is optional on browsers with strict autoplay policies
    }
  }, [soundEnabled]);

  // Soft tactile click for toggles & bookmarking
  const playClickChime = useCallback(() => {
    if (!soundEnabled) return;
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
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
      gain.gain.setValueAtTime(0.012, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start(now);
      osc.stop(now + 0.16);
      osc.onended = () => {
        try {
          ac.close();
        } catch {
          // ignore
        }
      };
    } catch {
      // Audio optional
    }
  }, [soundEnabled]);

  return { playChime, playClickChime };
}
