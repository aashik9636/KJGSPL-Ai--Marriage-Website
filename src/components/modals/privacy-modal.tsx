"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface PrivacyModalProps {
  onOpenPreferences: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({
  onOpenPreferences,
}) => {
  return (
    <>
      <DialogTitle className="dialog-display">
        Your boundaries matter.
      </DialogTitle>
      <DialogDescription>
        What this demonstration does—and what it needs before launch.
      </DialogDescription>
      <p>
        All profiles, portraits and compatibility results are fictional.
        Scores do not estimate the probability of love, marriage or
        relationship success.
      </p>
      <p>
        This website stores sound, motion and saved-profile choices in
        your browser. It has no production authentication, messaging,
        payments, analytics or verification service.
      </p>
      <p>
        The separate member and Superadmin apps can connect to the same
        persisted demo service. Administrative changes and billing
        remain explicitly simulated.
      </p>
      <p>
        You can clear local choices in Experience settings. Browser
        settings can remove all website storage. No real backend account
        is created by this website.
      </p>
      <button
        className="button button-dark"
        onClick={onOpenPreferences}
      >
        Open experience settings
        <ArrowRight size={17} />
      </button>
    </>
  );
};
