"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, ArrowUpRight } from "lucide-react";

interface HeaderProps {
  onOpenJourney?: () => void;
}

const NAV_ITEMS = [
  { id: "story", label: "Philosophy", href: "/#story" },
  { id: "experience", label: "Experience", href: "/#experience" },
  { id: "preview", label: "Preview", href: "/#preview" },
  { id: "moments", label: "Moments", href: "/#moments" },
  { id: "more-ways", label: "Possibilities", href: "/#more-ways" },
  { id: "membership", label: "Pricing", href: "/#membership" },
];

export const Header: React.FC<HeaderProps> = ({ onOpenJourney }) => {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    // Only perform scroll spy tracking on the home page
    if (pathname !== "/") {
      return;
    }

    const sectionIds = ["story", "experience", "preview", "moments", "more-ways", "membership"];
    
    const handleScroll = () => {
      // If at the very bottom of the page, activate the last section (Pricing/membership)
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      if (scrollY + windowHeight >= documentHeight - 80) {
        setActiveSection("membership");
        return;
      }

      // If at the very top (Hero section), no inner section active yet
      if (scrollY < 200) {
        setActiveSection("");
        return;
      }

      const headerOffset = 130;
      let current = "";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Element is in view if its top is near or past header and bottom hasn't passed header
          if (rect.top <= headerOffset && rect.bottom > headerOffset) {
            current = id;
            break;
          }
        }
      }

      // Fallback: check if we are beyond a section's top
      if (!current) {
        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const id = sectionIds[i];
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= headerOffset) {
              current = id;
              break;
            }
          }
        }
      }

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const isRegisterActive = pathname?.startsWith("/register");

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        const header = document.querySelector(".site-header") as HTMLElement | null;
        const headerHeight = header ? header.offsetHeight : 76;
        const elementTop = el.getBoundingClientRect().top + window.scrollY;
        const targetScroll = Math.max(0, elementTop - headerHeight + 2);
        
        window.scrollTo({
          top: targetScroll,
          behavior: "smooth",
        });

        if (history.pushState) {
          history.pushState(null, "", `#${id}`);
        }
        setActiveSection(id);
      }
    }
  };

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
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === "/" && activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              className={isActive ? "active" : ""}
              aria-current={isActive ? "page" : undefined}
              onClick={(e) => handleNavClick(e, item.id)}
            >
              {item.label}
            </a>
          );
        })}
        <Link 
          href="/register/step-1" 
          className={`header-register-nav ${isRegisterActive ? "active" : ""}`}
          aria-current={isRegisterActive ? "page" : undefined}
          onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
        >
          Register
        </Link>
      </nav>
      <Link
        href="/register/step-1"
        className="header-cta-btn"
        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
      >
        <span>Find your kind of connection</span>
        <ArrowUpRight size={16} />
      </Link>
    </header>
  );
};
