"use client";
import React from "react";
import { Check, ArrowUpRight } from "lucide-react";
import { plans } from "@/data/plans.data";

interface MembershipSectionProps {
  onOpenJourney: () => void;
}

export const MembershipSection: React.FC<MembershipSectionProps> = ({
  onOpenJourney,
}) => {
  return (
    <section className="membership" id="membership">
      <div className="section-top">
        <div>
          <span className="eyebrow">03 / YOUR PACE. YOUR CHOICE.</span>
          <h2>
            Room to <em>grow closer.</em>
          </h2>
        </div>
        <p>
          Start freely. Choose more tools when they feel right.
          <br />
          Every plan respects the same consent and safety rules.
        </p>
      </div>
      <div className="plan-grid">
        {plans.map((p, i) => (
          <article
            className={`plan-card ${i === 1 ? "plan-featured" : ""}`}
            key={p.name}
          >
            <div className="plan-title">
              <h3>{p.name}</h3>
              <span className={`plan-badge plan-badge-${p.level.toLowerCase()}`}>
                {p.level}
              </span>
            </div>
            <p className="plan-desc">{p.description}</p>
            <div className="plan-price">
              <span className="price-curr">US$</span>
              <span className="price-val">{p.price}</span>
              <span className="price-period">/month</span>
            </div>
            <div className="plan-divider" />
            <ul className="plan-feature-list">
              {p.items.map((item) => (
                <li key={item}>
                  <span className="check-icon-circle">
                    <Check size={12} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button
              className={
                i === 1
                  ? "plan-btn plan-btn-featured"
                  : "plan-btn plan-btn-outline"
              }
              onClick={onOpenJourney}
            >
              Explore {p.name}
              <ArrowUpRight size={16} />
            </button>
          </article>
        ))}
      </div>
      <p className="pricing-note">
        Proposed demo prices in USD. Billing is simulated in the member app.
        Paid plans never change compatibility scores or the daily
        recommendation limit. Future benefits appear as previews until
        implemented.
      </p>
    </section>
  );
};
