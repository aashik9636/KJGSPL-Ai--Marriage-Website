"use client";
import { useEffect, useState, useCallback } from "react";
import { UserPreferences } from "@/types/common.types";

export function usePreferences() {
  const [sound, setSound] = useState(false);
  const [motion, setMotion] = useState(true);
  const [savedProfiles, setSavedProfiles] = useState<string[]>([]);
  const [interestedProfiles, setInterestedProfiles] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    try {
      const p: UserPreferences = JSON.parse(
        localStorage.getItem("aim-web-preferences") || "{}"
      );
      setSound(p.sound === true);
      setMotion(
        p.motion !== false &&
          !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
      setSavedProfiles(JSON.parse(localStorage.getItem("aim-web-saved") || "[]"));
    } catch {
      // LocalStorage fallback
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = String(motion);
  }, [motion]);

  useEffect(() => {
    if (!toastMessage) return;
    const t = setTimeout(() => setToastMessage(""), 3600);
    return () => clearTimeout(t);
  }, [toastMessage]);

  const updatePreferences = useCallback((s: boolean, m: boolean) => {
    setSound(s);
    setMotion(m);
    try {
      localStorage.setItem(
        "aim-web-preferences",
        JSON.stringify({ sound: s, motion: m })
      );
    } catch {
      // ignore
    }
  }, []);

  const toggleSaveProfile = useCallback((profileKey: string, profileName: string) => {
    setSavedProfiles((prev) => {
      const exists = prev.includes(profileKey);
      const next = exists
        ? prev.filter((x) => x !== profileKey)
        : [...prev, profileKey];
      try {
        localStorage.setItem("aim-web-saved", JSON.stringify(next));
      } catch {
        // ignore
      }
      setToastMessage(
        !exists
          ? `${profileName} saved in this browser demo.`
          : `Removed ${profileName} from saved profiles.`
      );
      return next;
    });
  }, []);

  const recordInterest = useCallback((_profileKey: string) => {
    setInterestedProfiles((prev) => [...prev, _profileKey]);
    setToastMessage("Demo interest recorded in this page. No one was contacted.");
  }, []);

  return {
    sound,
    motion,
    savedProfiles,
    interestedProfiles,
    toastMessage,
    setToastMessage,
    updatePreferences,
    toggleSaveProfile,
    recordInterest,
  };
}
