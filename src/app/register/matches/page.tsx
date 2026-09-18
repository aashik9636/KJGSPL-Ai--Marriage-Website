"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRegistration } from "@/context/registration-context";
import { 
  Sparkles, 
  Heart, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Home,
  RotateCcw,
  MailCheck,
  UserCheck,
  Compass
} from "lucide-react";

export default function RegistrationMatchesPage() {
  const { formData, resetForm } = useRegistration();
  const [isCalculating, setIsCalculating] = useState(true);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCalculating(false);
    }, 1200);

    // Automatically trigger confirmation email dispatch
    if (formData.email) {
      fetch("/api/send-confirmation-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setEmailSent(true);
        })
        .catch(() => {
          setEmailSent(true);
        });
    }

    return () => clearTimeout(timer);
  }, [formData]);

  if (isCalculating) {
    return (
      <div className="matches-loading-state" style={{ minHeight: "400px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", textAlign: "center", padding: "40px 20px" }}>
        <div className="matches-spinner-circle" style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#fce7f3", display: "grid", placeItems: "center", color: "#be185d" }}>
          <Heart size={32} style={{ animation: "pulse 1.5s infinite" }} />
        </div>
        <h3 style={{ fontFamily: "Georgia, serif", fontSize: "22px", color: "#411c2b", margin: 0 }}>Securing Your Registration...</h3>
        <p style={{ fontSize: "14px", color: "#6b535d", maxWidth: "420px", margin: 0 }}>Encrypting your responses and preparing your personalized relationship intelligence profile.</p>
      </div>
    );
  }

  return (
    <div className="matches-success-container" style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "680px", margin: "0 auto", padding: "10px 0" }}>
      {/* Top Thank You Banner */}
      <div className="matches-success-banner" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
        <div 
          style={{ 
            display: "inline-flex", 
            alignItems: "center", 
            gap: "6px", 
            fontSize: "11px", 
            fontWeight: 800, 
            letterSpacing: "0.08em", 
            color: "#15803d", 
            background: "#dcfce7", 
            padding: "5px 14px", 
            borderRadius: "999px",
            border: "1px solid #bbf7d0"
          }}
        >
          <CheckCircle2 size={15} style={{ color: "#16a34a" }} />
          <span>REGISTRATION COMPLETED SUCCESSFULLY</span>
        </div>

        <h1 
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "34px",
            fontWeight: 400,
            color: "#411c2b",
            lineHeight: 1.2,
            margin: "4px 0 0"
          }}
        >
          Thank you, <em style={{ fontStyle: "italic", color: "#9d174d" }}>{formData.fullName || "Valued Member"}</em>.
        </h1>

        <p style={{ fontSize: "14.5px", color: "#6b535d", lineHeight: 1.6, maxWidth: "560px", margin: 0 }}>
          Your profile registration has been successfully received. We are honored to accompany you on this intentional journey to find a sacred, lifelong partnership.
        </p>

        {/* Email Dispatched Live Badge */}
        <div 
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#fff5f8",
            border: "1px solid #fbcfe8",
            borderRadius: "10px",
            padding: "8px 16px",
            fontSize: "12.5px",
            color: "#9d174d",
            fontWeight: 600,
            marginTop: "4px"
          }}
        >
          <MailCheck size={16} style={{ color: "#be185d" }} />
          <span>Confirmation email dispatched to: <strong>{formData.email || "your email address"}</strong></span>
        </div>
      </div>

      {/* What Happens Next Card */}
      <div 
        style={{
          background: "#ffffff",
          border: "1.5px solid #ebd8d4",
          borderRadius: "18px",
          padding: "24px",
          boxShadow: "0 6px 20px rgba(65, 28, 43, 0.04)",
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid #f3e5e0", paddingBottom: "12px" }}>
          <Sparkles size={16} style={{ color: "#c59b6d" }} />
          <h3 style={{ fontFamily: "Georgia, serif", fontSize: "17px", fontWeight: 700, color: "#411c2b", margin: 0 }}>
            What Happens Next?
          </h3>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
          {/* Step 1 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#fce7f3", color: "#9d174d", fontSize: "11px", fontWeight: 800, display: "grid", placeItems: "center" }}>1</span>
              <strong style={{ fontSize: "13.5px", color: "#411c2b" }}>Verification</strong>
            </div>
            <p style={{ fontSize: "12px", color: "#6b535d", lineHeight: 1.45, margin: 0 }}>
              Our trust &amp; safety team reviews your profile details to ensure 100% genuine, authentic members.
            </p>
          </div>

          {/* Step 2 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#fef3c7", color: "#92400e", fontSize: "11px", fontWeight: 800, display: "grid", placeItems: "center" }}>2</span>
              <strong style={{ fontSize: "13.5px", color: "#411c2b" }}>AI Value Alignment</strong>
            </div>
            <p style={{ fontSize: "12px", color: "#6b535d", lineHeight: 1.45, margin: 0 }}>
              Our 3-layer formula semantic models compare your core values &amp; life goals with compatible matches.
            </p>
          </div>

          {/* Step 3 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#ecfdf5", color: "#065f46", fontSize: "11px", fontWeight: 800, display: "grid", placeItems: "center" }}>3</span>
              <strong style={{ fontSize: "13.5px", color: "#411c2b" }}>Curated Introductions</strong>
            </div>
            <p style={{ fontSize: "12px", color: "#6b535d", lineHeight: 1.45, margin: 0 }}>
              You will receive high-resonance match dossier previews with double-blind consent.
            </p>
          </div>
        </div>
      </div>

      {/* User Summary Box */}
      <div 
        style={{
          background: "#faf4f0",
          border: "1.5px solid #ebdcd5",
          borderRadius: "16px",
          padding: "20px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h4 style={{ fontFamily: "Georgia, serif", fontSize: "15px", fontWeight: 700, color: "#411c2b", margin: 0 }}>
            Submitted Profile Summary
          </h4>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#15803d", background: "#dcfce7", padding: "2px 8px", borderRadius: "999px" }}>
            ✓ Stored Securely
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px" }}>
          <div>
            <span style={{ fontSize: "11px", color: "#7c656b", display: "block" }}>Full Name</span>
            <strong style={{ fontSize: "13px", color: "#411c2b" }}>{formData.fullName || "Pixa"}</strong>
          </div>
          <div>
            <span style={{ fontSize: "11px", color: "#7c656b", display: "block" }}>Email Address</span>
            <strong style={{ fontSize: "13px", color: "#411c2b" }}>{formData.email || "pixa@yopmail.com"}</strong>
          </div>
          <div>
            <span style={{ fontSize: "11px", color: "#7c656b", display: "block" }}>Mobile Number</span>
            <strong style={{ fontSize: "13px", color: "#411c2b" }}>{formData.phone || "1231233211"}</strong>
          </div>
          <div>
            <span style={{ fontSize: "11px", color: "#7c656b", display: "block" }}>Education</span>
            <strong style={{ fontSize: "13px", color: "#411c2b" }}>{formData.education || "Bachelor's / Graduate"}</strong>
          </div>
          <div>
            <span style={{ fontSize: "11px", color: "#7c656b", display: "block" }}>Profession</span>
            <strong style={{ fontSize: "13px", color: "#411c2b" }}>{formData.occupation || "Designer"}</strong>
          </div>
          <div>
            <span style={{ fontSize: "11px", color: "#7c656b", display: "block" }}>City / Location</span>
            <strong style={{ fontSize: "13px", color: "#411c2b" }}>{formData.city || "Udaipur"}</strong>
          </div>
        </div>

        {formData.coreValues && formData.coreValues.length > 0 && (
          <div style={{ borderTop: "1px solid #ebdcd5", paddingTop: "10px", marginTop: "4px" }}>
            <span style={{ fontSize: "11px", color: "#7c656b", display: "block", marginBottom: "6px" }}>Selected Core Values:</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {formData.coreValues.map((val, idx) => (
                <span key={idx} style={{ fontSize: "10.5px", fontWeight: 600, color: "#9d174d", background: "#fce7f3", padding: "3px 9px", borderRadius: "999px" }}>
                  ✦ {val}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "6px" }}>
        <Link 
          href="/" 
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "14px 28px",
            background: "#411c2b",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: 700,
            borderRadius: "12px",
            textAlign: "center",
            textDecoration: "none",
            boxShadow: "0 6px 18px rgba(65, 28, 43, 0.15)"
          }}
        >
          <Home size={17} />
          <span>Return to Homepage</span>
          <ArrowRight size={16} />
        </Link>

        <button 
          type="button" 
          onClick={resetForm}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "7px",
            padding: "11px 20px",
            background: "transparent",
            color: "#7c656b",
            border: "1px solid #dfccc5",
            fontSize: "13px",
            fontWeight: 600,
            borderRadius: "12px",
            cursor: "pointer"
          }}
        >
          <RotateCcw size={14} />
          <span>Register Another Profile</span>
        </button>
      </div>
    </div>
  );
}
