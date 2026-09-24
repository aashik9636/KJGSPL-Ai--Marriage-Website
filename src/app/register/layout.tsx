"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart } from "lucide-react";
import { RegistrationProvider, useRegistration } from "@/context/registration-context";
import "./registration.css";

const STEP_LABELS: { num: 1 | 2 | 3 | 4; title: string; subtitle: string }[] = [
  { num: 1, title: "Basic Details", subtitle: "Identity & Location" },
  { num: 2, title: "About You", subtitle: "Career & Background" },
  { num: 3, title: "Partner Preferences", subtitle: "Values & Priorities" },
  { num: 4, title: "Expectations", subtitle: "Intent & Bio" },
];

const RegistrationHeaderAndProgress: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentStep, goToStep, goToPrevStep } = useRegistration();
  const pathname = usePathname();

  // Ensure the page always starts from the absolute top when navigating to or within registration
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, currentStep]);

  const progressPercent = Math.round((currentStep / 4) * 100);

  return (
    <div className="registration-page-wrapper">
      {/* Top Header */}
      <header className="registration-top-header">
        <div className="reg-header-container">
          <Link href="/" className="brand" aria-label="AI Marriage home">
            <span className="brand-symbol">
              <Heart size={18} strokeWidth={1.8} />
            </span>
            <span>
              ai marriage<span className="brand-dot">.</span>
            </span>
          </Link>

          <div className="reg-header-center">
            <span className="reg-step-badge">
              Step {currentStep} of 4: {STEP_LABELS[currentStep - 1]?.title || "Registration"}
            </span>
          </div>

          <div className="reg-header-right">
            <Link href="/" className="reg-exit-link">
              Exit to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Stepper Progress Bar */}
      <div className="registration-progress-bar-container">
        <div className="reg-progress-track">
          <div 
            className="reg-progress-fill" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        
        {/* Step Tabs */}
        <div className="reg-steps-indicators">
          {STEP_LABELS.map((s) => {
            const isCompleted = currentStep > s.num;
            const isCurrent = currentStep === s.num;
            return (
              <div 
                key={s.num} 
                className={`reg-step-node ${isCurrent ? "current" : ""} ${isCompleted ? "completed" : ""}`}
                onClick={() => {
                  if (s.num <= currentStep) {
                    goToStep(s.num);
                  }
                }}
                style={{ cursor: s.num <= currentStep ? "pointer" : "default" }}
              >
                <div className="node-number-circle">
                  {isCompleted ? "✓" : s.num}
                </div>
                <div className="node-label-group">
                  <span className="node-title">{s.title}</span>
                  <span className="node-sub">{s.subtitle}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Form Content Container */}
      <main className="registration-main-container">
        <div className="registration-card-shell">
          {children}
        </div>
      </main>

      {/* Footer Trust Bar */}
      <footer className="registration-footer-trust">
        <div className="reg-footer-content">
          <span>🔒 256-Bit SSL Encrypted</span>
          <span>•</span>
          <span>100% Privacy Protected</span>
          <span>•</span>
          <span>No Public Profiles</span>
        </div>
      </footer>
    </div>
  );
};

export default function RegistrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RegistrationProvider>
      <RegistrationHeaderAndProgress>
        {children}
      </RegistrationHeaderAndProgress>
    </RegistrationProvider>
  );
}
