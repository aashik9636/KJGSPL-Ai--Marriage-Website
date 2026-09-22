import fs from "fs";
import path from "path";

// Generate a 16-bit 44.1kHz Stereo WAV file with rich soothing ambient chords and acoustic guitar/piano harmonics
function generateSoothingWav(outputPath, durationSeconds = 12) {
  const sampleRate = 44100;
  const numChannels = 2;
  const numSamples = Math.floor(sampleRate * durationSeconds);
  const blockAlign = numChannels * 2; // 16-bit = 2 bytes per sample
  const byteRate = sampleRate * blockAlign;
  const dataSize = numSamples * blockAlign;
  const headerSize = 44;
  const buffer = Buffer.alloc(headerSize + dataSize);

  // RIFF Header
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);

  // "fmt " Subchunk
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  buffer.writeUInt16LE(1, 20); // AudioFormat (1 for PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34); // BitsPerSample

  // "data" Subchunk
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  // Musical notes frequencies (Hz) for soothing cinematic progression:
  // Chord 1: Cmaj9 (C3, E3, G3, B3, D4, G4)
  // Chord 2: Am9 (A2, E3, G3, C4, E4, B4)
  // Chord 3: Fmaj7 (F2, C3, E3, A3, C4, E4)
  // Chord 4: Gadd9 (G2, D3, G3, B3, D4, A4)

  const chords = [
    { start: 0.0, end: 3.2, notes: [130.81, 164.81, 196.00, 246.94, 293.66, 392.00] },
    { start: 3.0, end: 6.2, notes: [110.00, 164.81, 196.00, 261.63, 329.63, 493.88] },
    { start: 6.0, end: 9.2, notes: [87.31, 130.81, 164.81, 220.00, 261.63, 329.63] },
    { start: 9.0, end: 12.0, notes: [98.00, 146.83, 196.00, 246.94, 293.66, 440.00] },
  ];

  // Pluck notes (arpeggio style like a soft fingerpicked acoustic guitar / harp)
  const arpeggios = [
    { time: 0.1, freq: 261.63, pan: -0.3 },
    { time: 0.5, freq: 329.63, pan: 0.2 },
    { time: 0.9, freq: 392.00, pan: -0.2 },
    { time: 1.3, freq: 493.88, pan: 0.4 },
    { time: 1.8, freq: 392.00, pan: -0.1 },
    { time: 2.3, freq: 587.33, pan: 0.3 },

    { time: 3.1, freq: 220.00, pan: -0.3 },
    { time: 3.5, freq: 261.63, pan: 0.2 },
    { time: 3.9, freq: 329.63, pan: -0.2 },
    { time: 4.3, freq: 440.00, pan: 0.3 },
    { time: 4.8, freq: 493.88, pan: -0.1 },
    { time: 5.3, freq: 659.25, pan: 0.4 },

    { time: 6.1, freq: 174.61, pan: -0.3 },
    { time: 6.5, freq: 261.63, pan: 0.2 },
    { time: 6.9, freq: 329.63, pan: -0.2 },
    { time: 7.3, freq: 440.00, pan: 0.3 },
    { time: 7.8, freq: 523.25, pan: -0.1 },
    { time: 8.3, freq: 659.25, pan: 0.4 },

    { time: 9.1, freq: 196.00, pan: -0.3 },
    { time: 9.5, freq: 293.66, pan: 0.2 },
    { time: 9.9, freq: 392.00, pan: -0.2 },
    { time: 10.3, freq: 493.88, pan: 0.3 },
    { time: 10.8, freq: 440.00, pan: -0.1 },
    { time: 11.3, freq: 392.00, pan: 0.2 },
  ];

  // Reverb buffer for lush spatial depth
  const delaySamplesL = Math.floor(sampleRate * 0.12);
  const delaySamplesR = Math.floor(sampleRate * 0.17);
  const reverbL = new Float32Array(delaySamplesL);
  const reverbR = new Float32Array(delaySamplesR);
  let revIdxL = 0;
  let revIdxR = 0;

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;

    let left = 0;
    let right = 0;

    // 1. Warm Pad Harmony Layer (Soft filtered sine + harmonics with slow tremolo)
    for (const chord of chords) {
      if (t >= chord.start && t < chord.end) {
        const chordProgress = (t - chord.start) / (chord.end - chord.start);
        // Smooth swell envelope
        const env = Math.sin(chordProgress * Math.PI) * 0.14;

        for (let n = 0; n < chord.notes.length; n++) {
          const f = chord.notes[n];
          // Warm harmonic structure: Fundamental + subtle 2nd & 3rd harmonic
          const tone = (
            Math.sin(2 * Math.PI * f * t) * 0.65 +
            Math.sin(2 * Math.PI * f * 2 * t) * 0.25 +
            Math.sin(2 * Math.PI * f * 3 * t) * 0.10
          );
          // Subtle stereo chorus effect
          const chorusL = Math.sin(2 * Math.PI * 0.25 * t);
          const chorusR = Math.cos(2 * Math.PI * 0.25 * t);

          left += tone * env * (0.5 + 0.15 * chorusL);
          right += tone * env * (0.5 + 0.15 * chorusR);
        }
      }
    }

    // 2. Gentle Fingerpicked Acoustic Plucks (Warm acoustic guitar tone)
    for (const arp of arpeggios) {
      if (t >= arp.time && t < arp.time + 2.5) {
        const dt = t - arp.time;
        // Acoustic pluck envelope: fast attack, organic exponential decay
        const pluckEnv = Math.exp(-dt * 3.2) * (1 - Math.exp(-dt * 80));
        
        // Multi-harmonic acoustic guitar timbre
        const pluck = (
          Math.sin(2 * Math.PI * arp.freq * dt) * 0.55 +
          Math.sin(2 * Math.PI * (arp.freq * 2) * dt) * 0.28 * Math.exp(-dt * 4.5) +
          Math.sin(2 * Math.PI * (arp.freq * 3) * dt) * 0.12 * Math.exp(-dt * 6.0) +
          Math.sin(2 * Math.PI * (arp.freq * 4) * dt) * 0.05 * Math.exp(-dt * 8.0)
        );

        const panL = 0.5 - arp.pan * 0.4;
        const panR = 0.5 + arp.pan * 0.4;

        left += pluck * pluckEnv * 0.28 * panL;
        right += pluck * pluckEnv * 0.28 * panR;
      }
    }

    // 3. Reverb / Ambient Space
    const delayedL = reverbL[revIdxL];
    const delayedR = reverbR[revIdxR];

    reverbL[revIdxL] = left + delayedL * 0.42;
    reverbR[revIdxR] = right + delayedR * 0.45;

    revIdxL = (revIdxL + 1) % delaySamplesL;
    revIdxR = (revIdxR + 1) % delaySamplesR;

    left = (left + delayedL * 0.25);
    right = (right + delayedR * 0.25);

    // Master fade out at the end
    const masterFade = t > 10.5 ? Math.max(0, (12.0 - t) / 1.5) : (t < 0.8 ? t / 0.8 : 1.0);
    left *= masterFade * 0.65;
    right *= masterFade * 0.65;

    // Clamp and convert to 16-bit integer PCM
    const clampL = Math.max(-1, Math.min(1, left));
    const clampR = Math.max(-1, Math.min(1, right));

    const offset = headerSize + i * 4;
    buffer.writeInt16LE(Math.floor(clampL * 32767), offset);
    buffer.writeInt16LE(Math.floor(clampR * 32767), offset + 2);
  }

  fs.writeFileSync(outputPath, buffer);
  console.log(`Generated soothing ambient audio (${durationSeconds}s): ${outputPath} [${buffer.length} bytes]`);
}

generateSoothingWav("public/assets/soothing-music.wav", 12);
