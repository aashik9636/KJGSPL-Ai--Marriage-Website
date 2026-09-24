"use client";
import React from "react";
import { useRegistration } from "@/context/registration-context";
import { ArrowRight, User, Mail, Phone, Calendar, Sparkles } from "lucide-react";
import { CityCountry } from "@/components/ui/city-country";

const GENDER_OPTIONS = [
  { id: "Female", label: "Female" },
  { id: "Male", label: "Male" },
  { id: "Other", label: "Other / Non-Binary" },
];

export default function Step1BasicDetailsPage() {
  const { formData, updateField, errors, goToNextStep } = useRegistration();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goToNextStep();
  };

  return (
    <form onSubmit={handleSubmit} className="reg-step-form" noValidate>
      {/* Step Header */}
      <div className="reg-step-header">
        <div className="step-eyebrow">
          <Sparkles size={13} className="sparkle-rose" />
          <span>STEP 1 OF 4 • BASIC DETAILS</span>
        </div>
        <h1 className="reg-step-title">
          Let’s start with the <em>basics.</em>
        </h1>
        <p className="reg-step-subtitle">
          Your authentic details help us create a verified, trusted foundation for genuine connections.
        </p>
      </div>

      {/* Form Fields Grid */}
      <div className="reg-fields-grid">
        {/* Full Name */}
        <div className={`form-group ${errors.fullName ? "has-error" : ""}`}>
          <label htmlFor="fullName">
            Full Name <span className="required-star">*</span>
          </label>
          <div className="input-with-icon">
            <User size={16} className="field-icon" />
            <input
              id="fullName"
              type="text"
              placeholder="e.g. Mira Desai"
              value={formData.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              className="form-input"
            />
          </div>
          {errors.fullName && <span className="error-msg">{errors.fullName}</span>}
        </div>

        {/* Email Address */}
        <div className={`form-group ${errors.email ? "has-error" : ""}`}>
          <label htmlFor="email">
            Email Address <span className="required-star">*</span>
          </label>
          <div className="input-with-icon">
            <Mail size={16} className="field-icon" />
            <input
              id="email"
              type="email"
              placeholder="mira.desai@example.com"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="form-input"
            />
          </div>
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </div>

        {/* Mobile Number */}
        <div className={`form-group ${errors.phone ? "has-error" : ""}`}>
          <label htmlFor="phone">
            Mobile Number <span className="required-star">*</span>
          </label>
          <div className="input-with-icon">
            <Phone size={16} className="field-icon" />
            <input
              id="phone"
              type="tel"
              placeholder="+971 50 123 4567 or +91 98765 43210"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="form-input"
            />
          </div>
          {errors.phone && <span className="error-msg">{errors.phone}</span>}
        </div>

        {/* Date of Birth */}
        <div className={`form-group ${errors.dob ? "has-error" : ""}`}>
          <label htmlFor="dob">
            Date of Birth <span className="required-star">*</span>
          </label>
          <div className="input-with-icon">
            <Calendar size={16} className="field-icon" />
            <input
              id="dob"
              type="date"
              value={formData.dob}
              onChange={(e) => updateField("dob", e.target.value)}
              className="form-input"
              max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]}
            />
          </div>
          {errors.dob && <span className="error-msg">{errors.dob}</span>}
        </div>

        {/* Current City / Location Autocomplete */}
        <div className={`form-group full-width ${errors.city ? "has-error" : ""}`}>
          <label htmlFor="city">
            Current City / Location <span className="required-star">*</span>
          </label>
          <CityCountry
            value={formData.city}
            onChange={(fullLoc) => updateField("city", fullLoc)}
            placeholder="Search city or country (e.g. Mumbai, Dubai, London...)"
            hasError={!!errors.city}
          />
          {errors.city && <span className="error-msg">{errors.city}</span>}
        </div>

        {/* Gender Selection */}
        <div className={`form-group full-width ${errors.gender ? "has-error" : ""}`}>
          <label>
            Gender <span className="required-star">*</span>
          </label>
          <div className="gender-chips-row">
            {GENDER_OPTIONS.map((g) => {
              const isSelected = formData.gender === g.id;
              return (
                <button
                  type="button"
                  key={g.id}
                  className={`gender-chip ${isSelected ? "selected" : ""}`}
                  onClick={() => updateField("gender", g.id)}
                >
                  <span className="chip-radio-circle">{isSelected && <span className="inner-dot" />}</span>
                  <span>{g.label}</span>
                </button>
              );
            })}
          </div>
          {errors.gender && <span className="error-msg">{errors.gender}</span>}
        </div>
      </div>

      {/* Form Action Buttons */}
      <div className="reg-actions-row">
        <div className="reg-actions-left">
          <span className="step-safe-note">🔒 All personal data is strictly confidential</span>
        </div>
        <button type="submit" className="reg-continue-btn">
          <span>Continue to Step 2</span>
          <ArrowRight size={17} />
        </button>
      </div>
    </form>
  );
}
