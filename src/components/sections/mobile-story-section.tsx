"use client";
import React from "react";
import { ArrowUpRight, Bookmark } from "lucide-react";

interface MobileStorySectionProps {
  saved: string[];
  onToggleSaveDev: () => void;
  onOpenJourney: () => void;
}

export const MobileStorySection: React.FC<MobileStorySectionProps> = ({
  saved,
  onToggleSaveDev,
  onOpenJourney,
}) => {
  const isDevSaved = saved.includes("dev");

  return (
    <section className="mobile-story">
      <div className="mobile-story-copy">
        <span className="eyebrow">04 / MAKE SPACE FOR SOMETHING REAL</span>
        <h2>
          Fewer profiles.
          <br />
          <em>More possibility.</em>
        </h2>
        <p>
          Up to ten thoughtful introductions a day. Room to be curious,
          understand your differences, and choose what comes next.
        </p>
        <div className="journey-list">
          <div>
            <span>01</span>
            <div>
              <h3>Tell your story</h3>
              <p>Who you are, what matters, and what you’re looking for.</p>
            </div>
          </div>
          <div>
            <span>02</span>
            <div>
              <h3>Discover the human</h3>
              <p>Shared values, honest differences, better questions.</p>
            </div>
          </div>
          <div>
            <span>03</span>
            <div>
              <h3>Choose each other</h3>
              <p>A conversation begins when interest is mutual.</p>
            </div>
          </div>
        </div>
        <button
          className="text-button"
          onClick={onOpenJourney}
        >
          Take a small first step <ArrowUpRight size={19} />
        </button>
      </div>
      <div className="app-editorial">
        <div className="app-editorial-image">
          <img
            src="/assets/dev.png"
            alt="Dev Shah, a fictional 31-year-old member"
          />
          <span className="editorial-tag">
            A LITTLE MORE YOUR KIND OF HUMAN
          </span>
        </div>
        <div className="app-editorial-note">
          <span className="eyebrow">MEET DEV, 31 · DUBAI</span>
          <h3>
            “Slow Sundays. Good books.
            <br />
            <em>A life we build, together.”</em>
          </h3>
          <div className="interest-tags">
            <span>Sunday cooking</span>
            <span>Bookshops</span>
            <span>Long walks</span>
          </div>
          <button
            aria-pressed={isDevSaved}
            onClick={onToggleSaveDev}
            className="round-save"
            aria-label={isDevSaved ? "Unsave Dev" : "Save Dev"}
          >
            <Bookmark
              fill={isDevSaved ? "currentColor" : "none"}
              size={20}
            />
          </button>
        </div>
      </div>
    </section>
  );
};
