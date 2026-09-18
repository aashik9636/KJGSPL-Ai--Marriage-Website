"use client";
import React, { useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ShowcaseSection } from "@/components/sections/showcase-section";
import { ProfileStepsSection } from "@/components/sections/profile-steps-section";
import { MomentsSection } from "@/components/sections/moments-section";
import { BentoFeaturesSection } from "@/components/sections/bento-features-section";
import { MobileStorySection } from "@/components/sections/mobile-story-section";
import { MembershipSection } from "@/components/sections/membership-section";
import { TrustSection } from "@/components/sections/trust-section";
import { DetailsModal } from "@/components/modals/details-modal";
import { JourneyModal } from "@/components/modals/journey-modal";
import { PreferencesModal } from "@/components/modals/preferences-modal";
import { PrivacyModal } from "@/components/modals/privacy-modal";
import { MatchmakingModal } from "@/components/modals/matchmaking-modal";
import { ReasonsModal } from "@/components/modals/reasons-modal";
import { QuizModal } from "@/components/modals/quiz-modal";
import { ToastNotice } from "@/components/ui/toast-notice";
import { useAudioChime } from "@/hooks/use-audio-chime";
import { usePreferences } from "@/hooks/use-preferences";
import { fixtures } from "@/data/profiles.data";
import { PairKey, StageType, ModalType, MomentsTabKey } from "@/types";

export default function Home() {
  // Experience & Flow State
  const [pair, setPair] = useState<PairKey>("arjun");
  const [stage, setStage] = useState<StageType>("intro");
  const [modal, setModal] = useState<ModalType>(null);
  const [journeyStep, setJourneyStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [activeMockupStep, setActiveMockupStep] = useState(0);
  const [momentsTab, setMomentsTab] = useState<MomentsTabKey>("discover");
  const [selectedIcebreaker, setSelectedIcebreaker] = useState("Your ideal Sunday?");
  const [profileHidden, setProfileHidden] = useState(true);
  const [voicePlaying, setVoicePlaying] = useState(false);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Custom Preferences & Storage Hook
  const {
    sound,
    motion,
    savedProfiles,
    interestedProfiles,
    toastMessage,
    setToastMessage,
    updatePreferences,
    toggleSaveProfile,
    recordInterest,
  } = usePreferences();

  // Web Audio Chime Hook
  const { playChime } = useAudioChime(sound);

  const currentPerson = fixtures[pair];

  const handleReveal = () => {
    playChime();
    if (!motion) {
      setStage("result");
      return;
    }
    setStage("scanning");
    timer.current = setTimeout(() => {
      setStage("result");
      playChime();
    }, 1800);
  };

  const handleSwitchPair = (value: PairKey) => {
    if (timer.current) clearTimeout(timer.current);
    setPair(value);
    setStage("intro");
  };

  const handleClearChoices = () => {
    try {
      localStorage.removeItem("aim-web-saved");
    } catch {
      // ignore
    }
    setToastMessage("Local demo choices cleared.");
  };

  const openJourneyFlow = () => {
    setJourneyStep(0);
    setModal("journey");
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {/* Sticky Header */}
      <Header onOpenJourney={openJourneyFlow} />

      <main id="main">
        {/* Hero Section */}
        <HeroSection
          sound={sound}
          motion={motion}
          onToggleSound={() => updatePreferences(!sound, motion)}
        />

        {/* Philosophy Section */}
        <PhilosophySection />

        {/* Experience Section (Interactive Comparison) */}
        <ExperienceSection
          pair={pair}
          person={currentPerson}
          stage={stage}
          onSwitchPair={handleSwitchPair}
          onReveal={handleReveal}
          onSkipAnimation={() => setStage("result")}
          onOpenDetails={() => setModal("details")}
        />

        {/* 4-Phone Showcase Preview Section */}
        <ShowcaseSection
          activeStep={activeMockupStep}
          onSelectStep={setActiveMockupStep}
        />

        {/* Step-by-Step Profile Onboarding & Video Bio Section */}
        <ProfileStepsSection onOpenJourney={openJourneyFlow} />

        {/* Moments Section */}
        <MomentsSection
          momentsTab={momentsTab}
          onSelectTab={setMomentsTab}
          onOpenJourney={openJourneyFlow}
          onOpenQuiz={() => setModal("quiz")}
        />

        {/* Bento Grid Features Section */}
        <BentoFeaturesSection
          selectedIcebreaker={selectedIcebreaker}
          onSelectIcebreaker={setSelectedIcebreaker}
          voicePlaying={voicePlaying}
          onToggleVoice={() => setVoicePlaying(!voicePlaying)}
          profileHidden={profileHidden}
          onToggleProfileHidden={setProfileHidden}
          onOpenJourney={openJourneyFlow}
          onOpenReasons={() => setModal("reasons")}
        />

        {/* Mobile Story Editorial Section */}
        <MobileStorySection
          saved={savedProfiles}
          onToggleSaveDev={() => toggleSaveProfile("dev", "Dev")}
          onOpenJourney={openJourneyFlow}
        />

        {/* Membership Plans Section */}
        <MembershipSection onOpenJourney={openJourneyFlow} />

        {/* Trust & Boundaries Section */}
        <TrustSection onOpenJourney={openJourneyFlow} />
      </main>

      {/* Pre-Footer & Luxury Footer */}
      <Footer
        sound={sound}
        motion={motion}
        onUpdatePreferences={updatePreferences}
        onOpenPrivacy={() => setModal("privacy")}
        onOpenPreferences={() => setModal("preferences")}
        onOpenJourney={openJourneyFlow}
        onOpenMatchmaking={() => setModal("matchmaking")}
      />

      {/* Modals Dialog Shell */}
      <Dialog
        open={modal !== null}
        onOpenChange={(open) => {
          if (!open) setModal(null);
        }}
      >
        <DialogContent
          className={`site-dialog ${modal === "details" ? "details-dialog" : ""} ${modal === "matchmaking" || modal === "reasons" || modal === "quiz" ? "matchmaking-dialog" : ""}`}
        >
          {modal === "quiz" && (
            <QuizModal
              onClose={() => setModal(null)}
            />
          )}

          {modal === "reasons" && (
            <ReasonsModal
              onClose={() => setModal(null)}
              onOpenJourney={() => {
                setModal(null);
                openJourneyFlow();
              }}
            />
          )}

          {modal === "matchmaking" && (
            <MatchmakingModal
              onClose={() => setModal(null)}
              onOpenJourney={() => {
                setModal(null);
                openJourneyFlow();
              }}
            />
          )}

          {modal === "details" && (
            <DetailsModal
              person={currentPerson}
              pair={pair}
              saved={savedProfiles}
              interested={interestedProfiles}
              onSave={() => toggleSaveProfile(pair, currentPerson.name)}
              onInterest={() => recordInterest(pair)}
            />
          )}

          {modal === "journey" && (
            <JourneyModal
              journeyStep={journeyStep}
              answer={answer}
              onSetJourneyStep={setJourneyStep}
              onSetAnswer={setAnswer}
              onClose={() => setModal(null)}
              onExploreDev={() => {
                setModal(null);
                handleSwitchPair("dev");
                document
                  .getElementById("experience")
                  ?.scrollIntoView({
                    behavior: motion ? "smooth" : "instant",
                  });
              }}
            />
          )}

          {modal === "preferences" && (
            <PreferencesModal
              sound={sound}
              motion={motion}
              onUpdatePreferences={updatePreferences}
              onClearData={handleClearChoices}
            />
          )}

          {modal === "privacy" && (
            <PrivacyModal
              onOpenPreferences={() => setModal("preferences")}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Notification Toast */}
      <ToastNotice
        toast={toastMessage}
        onDismiss={() => setToastMessage("")}
      />
    </>
  );
}
