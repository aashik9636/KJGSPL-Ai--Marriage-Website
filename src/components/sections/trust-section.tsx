"use client";
import React from "react";
import { Heart, Check, ArrowUpRight } from "lucide-react";

interface TrustSectionProps {
  onOpenJourney: () => void;
}

export const TrustSection: React.FC<TrustSectionProps> = ({
  onOpenJourney,
}) => {
  return (
    <section className="trust">
      <div className="trust-icon">
        <Heart size={31} strokeWidth={1.2} />
      </div>
      <h2>
        Your heart.
        <br />
        <em>Your boundaries.</em>
      </h2>
      <p>
        You choose what to share. You choose who to connect with.
        <br />A score is a conversation starter, never a promise.
      </p>
      <div>
        <span>
          <Check size={16} /> Mutual interest before messaging
        </span>
        <span>
          <Check size={16} /> Privacy controls for everyone
        </span>
        <span>
          <Check size={16} /> No beauty scores. Ever.
        </span>
      </div>
      <button
        className="button button-dark"
        onClick={onOpenJourney}
      >
        Beyond the spark <ArrowUpRight size={18} />
      </button>
    </section>
  );
};
