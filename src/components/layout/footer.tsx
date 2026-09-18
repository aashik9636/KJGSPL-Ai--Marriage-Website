"use client";
import React from "react";
import Link from "next/link";
import { Heart, ArrowUpRight, Sparkles, Mail, Globe } from "lucide-react";

interface FooterProps {
  sound: boolean;
  motion: boolean;
  onUpdatePreferences: (s: boolean, m: boolean) => void;
  onOpenPrivacy: () => void;
  onOpenPreferences: () => void;
  onOpenJourney: () => void;
  onOpenMatchmaking?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  sound,
  motion,
  onUpdatePreferences,
  onOpenPrivacy,
  onOpenPreferences,
  onOpenJourney,
  onOpenMatchmaking,
}) => {
  return (
    <>
      {/* PRE-FOOTER CTA CARD */}
      <section className="pre-footer-section">
        <div className="pre-footer-card">
          <div className="pre-footer-glow" />
          <span className="eyebrow light">✦ YOUR STORY BEGINS WITH A QUESTION</span>
          <h2>
            Ready for something
            <br />
            <em>beyond the spark?</em>
          </h2>
          <p>
            Meet the people who share your direction, your lifestyle, and your kind of tomorrow.
          </p>
          <div className="pre-footer-actions">
            <Link
              href="/register/step-1"
              className="button button-light"
            >
              Find your kind of connection <ArrowUpRight size={18} />
            </Link>
            <button
              className="text-button light"
              onClick={onOpenMatchmaking || onOpenPrivacy}
            >
              How our matchmaking works
            </button>
          </div>
        </div>
      </section>

      {/* LUXURY DARK EDITORIAL FOOTER */}
      <footer className="site-footer">
        <div className="footer-top-grid">
          {/* Col 1: Brand & Mission */}
          <div className="footer-brand-col">
            <a className="brand footer-logo" href="#" aria-label="AI Marriage home">
              <span className="brand-symbol">
                <Heart size={20} strokeWidth={1.6} />
              </span>
              <span>
                ai marriage<span className="brand-dot">.</span>
              </span>
            </a>
            
            <p className="footer-tagline">
              The world&apos;s first AI-powered matrimony and relationship intelligence platform. Empowering value-aligned, evidence-based matching for modern couples.
            </p>

            <div className="footer-product-pill">
              <Sparkles size={13} className="footer-pill-icon" />
              <span>A Product of KayJay Global Solutions</span>
            </div>
          </div>

          {/* Col 2: Platform Navigation */}
          <div className="footer-links-col">
            <div className="footer-category-title">
              <span className="footer-dot dot-purple">•</span>
              PLATFORM NAVIGATION
            </div>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#story">The Philosophy</a></li>
              <li><a href="#experience">The Experience</a></li>
              <li><a href="#preview">Product Preview</a></li>
              <li><a href="#moments">Moments in Between</a></li>
              <li><a href="#membership">Membership Plans</a></li>
            </ul>
          </div>

          {/* Col 3: Resources & Principles */}
          <div className="footer-links-col">
            <div className="footer-category-title">
              <span className="footer-dot dot-magenta">•</span>
              RESOURCES
            </div>
            <ul>
              <li><button onClick={onOpenPrivacy}>Blog &amp; Journal</button></li>
              <li><button onClick={onOpenPrivacy}>Verification Standards</button></li>
              <li><button onClick={onOpenPrivacy}>Privacy &amp; Boundaries</button></li>
              <li><button onClick={onOpenPreferences}>Experience Settings</button></li>
              <li><button onClick={onOpenPrivacy}>Terms &amp; Conditions</button></li>
              <li><button onClick={onOpenPrivacy}>Refund Policy</button></li>
            </ul>
          </div>

          {/* Col 4: Contact & Support */}
          <div className="footer-action-col">
            <div className="footer-category-title">
              <span className="footer-dot dot-emerald">•</span>
              CONTACT &amp; SUPPORT
            </div>

            {/* Email Support Glass Card */}
            <a href="mailto:hello@kayjayglobal.com" className="footer-email-card" aria-label="Email support">
              <div className="footer-email-icon-box">
                <Mail size={18} />
              </div>
              <div className="footer-email-details">
                <span className="footer-email-label">EMAIL SUPPORT</span>
                <span className="footer-email-address">hello@kayjayglobal.com</span>
              </div>
            </a>

            {/* Company Website Link */}
            <a 
              href="https://kayjayglobal.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-company-link"
            >
              <Globe size={15} />
              <span>KayJay Global Solutions</span>
              <ArrowUpRight size={14} className="footer-company-arrow" />
            </a>

            {/* Mobile App Download Badges (Coming Soon) */}
            <div className="footer-app-badges">
              <div className="footer-badges-row">
                {/* App Store Badge */}
                <div 
                  className="app-badge-btn" 
                  role="button" 
                  tabIndex={0} 
                  title="Coming soon on the App Store"
                  aria-label="Download on the App Store (Coming Soon)"
                >
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    style={{ width: 18, height: 18, minWidth: 18, minHeight: 18, flexShrink: 0, display: "block" }}
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.64 1.35-.57.65-1.07 1.71-.94 2.73 1 .08 2.04-.48 2.66-1.23z" />
                  </svg>
                  <div className="app-badge-text">
                    <span className="badge-sub">Download on the</span>
                    <span className="badge-main">App Store</span>
                  </div>
                </div>

                {/* Google Play Badge */}
                <div 
                  className="app-badge-btn" 
                  role="button" 
                  tabIndex={0} 
                  title="Coming soon on Google Play"
                  aria-label="Get it on Google Play (Coming Soon)"
                >
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    style={{ width: 18, height: 18, minWidth: 18, minHeight: 18, flexShrink: 0, display: "block" }}
                  >
                    <path d="M3.609 1.814L13.793 12 3.61 22.186c-.347-.291-.564-.725-.564-1.229V3.043c0-.504.217-.938.563-1.229zm11.309 11.31l2.457 2.457-11.666 6.735 9.209-9.192zm0-2.248L5.709 1.684l11.666 6.735-2.457 2.457zm1.124 1.124l3.197 1.846c.86.497.86 1.31 0 1.807l-3.197 1.846-2.146-2.146 2.146-2.146z" />
                  </svg>
                  <div className="app-badge-text">
                    <span className="badge-sub">GET IT ON</span>
                    <span className="badge-main">Google Play</span>
                  </div>
                </div>
              </div>

              <p className="footer-app-disclaimer">
                Apple and the Apple Logo are trademarks of Apple Inc.<br />
                Google Play and the Google Play logo are trademarks of Google LLC.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-left">
            <span>© 2026 KayJay Global Solutions. All rights reserved.</span>
            <span className="footer-bottom-sep">•</span>
            <button onClick={onOpenPrivacy}>Terms &amp; Conditions</button>
            <span className="footer-bottom-sep">•</span>
            <button onClick={onOpenPrivacy}>Privacy Policy</button>
            <span className="footer-bottom-sep">•</span>
            <button onClick={onOpenPrivacy}>Refund &amp; Cancellation</button>
          </div>

          <div className="footer-social-chips">
            {/* LinkedIn */}
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-chip" 
              aria-label="LinkedIn"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            {/* X (formerly Twitter) */}
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-chip" 
              aria-label="X (Twitter)"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* YouTube */}
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-social-chip" 
              aria-label="YouTube"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};


