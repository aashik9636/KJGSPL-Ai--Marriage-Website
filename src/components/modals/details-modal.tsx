"use client";
import React from "react";
import { Heart, MessageCircle, Bookmark } from "lucide-react";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ProfileFixture, PairKey } from "@/types/profile.types";
import { families } from "@/data/profiles.data";

interface DetailsModalProps {
  person: ProfileFixture;
  pair: PairKey;
  saved: string[];
  interested: string[];
  onSave: () => void;
  onInterest: () => void;
}

export const DetailsModal: React.FC<DetailsModalProps> = ({
  person,
  pair,
  saved,
  interested,
  onSave,
  onInterest,
}) => {
  return (
    <>
      <DialogTitle className="dialog-display">
        A closer look at
        <br />
        <em>Mira + {person.name}</em>
      </DialogTitle>
      <DialogDescription>
        Illustrative alignment: {person.score}/100. Based on fictional
        profile answers, never photographs.
      </DialogDescription>
      <div className="category-bars">
        {families.map((label, i) => (
          <div key={label}>
            <div>
              <span>{label}</span>
              <strong>{person.values[i]}</strong>
            </div>
            <div className="bar">
              <span style={{ width: `${person.values[i]}%` }} />
            </div>
          </div>
        ))}
      </div>
      <h3>What brings them closer</h3>
      <ul className="reason-list">
        {person.why.map((x) => (
          <li key={x}>
            <Heart size={15} />
            {x}
          </li>
        ))}
      </ul>
      <h3>Worth a conversation</h3>
      {person.differences.map((x) => (
        <p className="difference" key={x}>
          {x}
        </p>
      ))}
      <div className="conversation-prompt">
        <MessageCircle size={20} />
        <div>
          <span>A THOUGHTFUL FIRST QUESTION</span>
          <p>
            “What would a really lovely ordinary Sunday look like for
            you?”
          </p>
        </div>
      </div>
      <div className="dialog-actions">
        <button className="button button-outline" onClick={onSave}>
          <Bookmark size={17} />
          {saved.includes(pair) ? "Saved" : "Save profile"}
        </button>
        <button
          className="button button-dark"
          disabled={interested.includes(pair)}
          onClick={onInterest}
        >
          <Heart size={17} />
          {interested.includes(pair)
            ? "Demo interest sent"
            : "Express demo interest"}
        </button>
      </div>
      <small>
        Local website demonstration. No member receives these actions.
        Category fixtures are explanatory samples, not a production
        scoring formula.
      </small>
    </>
  );
};
