"use client";
import React from "react";
import { useRegistration } from "@/context/registration-context";
import { 
  ArrowRight, 
  ArrowLeft, 
  GraduationCap, 
  Briefcase, 
  Heart, 
  Globe, 
  Sparkles 
} from "lucide-react";

const EDUCATION_OPTIONS = [
  "Master's / Postgraduate",
  "Bachelor's / Graduate",
  "Doctorate / PhD",
  "Professional Degree (MD, JD, CA)",
  "Diploma / Associate",
  "High School / Other",
];

const MARITAL_STATUS_OPTIONS = [
  { id: "Never Married", label: "Never Married" },
  { id: "Divorced", label: "Divorced" },
  { id: "Widowed", label: "Widowed" },
  { id: "Other", label: "Other" },
];

const RELIGION_OPTIONS = [
  "Hindu",
  "Muslim",
  "Christian",
  "Sikh",
  "Jain",
  "Buddhist",
  "Jewish",
  "Spiritual / Not Religious",
  "Other",
  "Prefer not to say",
];

export default function Step2AboutYouPage() {
  const { formData, updateField, errors, goToNextStep, goToPrevStep } = useRegistration();

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
          <span>STEP 2 OF 4 • ABOUT YOU</span>
        </div>
        <h1 className="reg-step-title">
          Tell us about your <em>world.</em>
        </h1>
        <p className="reg-step-subtitle">
          Your career, background, and life stage help AI discover partners with aligned ambitions and lifestyles.
        </p>
      </div>

      {/* Form Fields Grid */}
      <div className="reg-fields-grid">
        {/* Education */}
        <div className={`form-group full-width ${errors.education ? "has-error" : ""}`}>
          <label htmlFor="education">
            Education / Highest Qualification <span className="required-star">*</span>
          </label>
          <div className="input-with-icon">
            <GraduationCap size={16} className="field-icon" />
            <select
              id="education"
              value={formData.education}
              onChange={(e) => updateField("education", e.target.value)}
              className="form-input form-select"
            >
              <option value="">Select your education level...</option>
              {EDUCATION_OPTIONS.map((edu) => (
                <option key={edu} value={edu}>
                  {edu}
                </option>
              ))}
            </select>
          </div>
          {errors.education && <span className="error-msg">{errors.education}</span>}
        </div>

        {/* Occupation */}
        <div className={`form-group full-width ${errors.occupation ? "has-error" : ""}`}>
          <label htmlFor="occupation">
            Occupation / Profession <span className="required-star">*</span>
          </label>
          <div className="input-with-icon">
            <Briefcase size={16} className="field-icon" />
            <input
              id="occupation"
              type="text"
              placeholder="e.g. Creative Designer, Software Architect, Doctor, Founder"
              value={formData.occupation}
              onChange={(e) => updateField("occupation", e.target.value)}
              className="form-input"
            />
          </div>
          {errors.occupation && <span className="error-msg">{errors.occupation}</span>}
        </div>

        {/* Marital Status */}
        <div className={`form-group full-width ${errors.maritalStatus ? "has-error" : ""}`}>
          <label>
            Marital Status <span className="required-star">*</span>
          </label>
          <div className="marital-chips-grid">
            {MARITAL_STATUS_OPTIONS.map((m) => {
              const isSelected = formData.maritalStatus === m.id;
              return (
                <button
                  type="button"
                  key={m.id}
                  className={`marital-chip ${isSelected ? "selected" : ""}`}
                  onClick={() => updateField("maritalStatus", m.id)}
                >
                  <span className="chip-radio-circle">{isSelected && <span className="inner-dot" />}</span>
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>
          {errors.maritalStatus && <span className="error-msg">{errors.maritalStatus}</span>}
        </div>

        {/* Religion / Community (Optional) */}
        <div className="form-group full-width">
          <label htmlFor="religion">
            Religion / Community <span className="optional-tag">(Optional)</span>
          </label>
          <div className="input-with-icon">
            <Globe size={16} className="field-icon" />
            <select
              id="religion"
              value={formData.religion}
              onChange={(e) => updateField("religion", e.target.value)}
              className="form-input form-select"
            >
              <option value="">Select community/belief (optional)...</option>
              {RELIGION_OPTIONS.map((rel) => (
                <option key={rel} value={rel}>
                  {rel}
                </option>
              ))}
            </select>
          </div>
          <span className="field-hint">Used only for mutual preference filtering if specified.</span>
        </div>
      </div>

      {/* Form Action Buttons */}
      <div className="reg-actions-row">
        <button type="button" className="reg-back-btn" onClick={goToPrevStep}>
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
        <button type="submit" className="reg-continue-btn">
          <span>Continue to Step 3</span>
          <ArrowRight size={17} />
        </button>
      </div>
    </form>
  );
}
