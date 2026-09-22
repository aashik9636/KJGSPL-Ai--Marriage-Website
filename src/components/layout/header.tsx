"use client";
import React from "react";
import Link from "next/link";
import { Heart, ArrowUpRight } from "lucide-react";

interface HeaderProps {
  onOpenJourney: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenJourney }) => {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="AI Marriage home">
        <span className="brand-symbol">
          <Heart size={20} strokeWidth={1.6} />
        </span>
        <span>
          ai marriage<span className="brand-dot">.</span>
        </span>
      </Link>
      <nav aria-label="Main navigation">
        <a href="#story">Philosophy</a>
        <a href="#experience">Experience</a>
        <a href="#preview">Preview</a>
        <a href="#moments">Moments</a>
        <a href="#more-ways">Possibilities</a>
        <a href="#membership">Pricing</a>
        <Link href="/register/step-1" className="header-register-nav">Register</Link>
      </nav>
      <Link
        href="/register/step-1"
        className="header-cta-btn"
      >
        <span>Find your kind of connection</span>
        <ArrowUpRight size={16} />
      </Link>
    </header>
  );
};
