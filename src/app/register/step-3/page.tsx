"use client";
import React from "react";
import { useRegistration } from "@/context/registration-context";
import { 
  ArrowRight, 
  ArrowLeft, 
  Heart, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Users, 
  Compass, 
  MessageCircle, 
  Briefcase,
  Smile
} from "lucide-react";

const PARTNER_GENDER_OPTIONS = [
  { id: "Male", label: "Male" },
  { id: "Female", label: "Female" },
  { id: "Other", label: "Other / Prefer not to say" },
];


const LOCATION_OPTIONS = [
  { id: "Same City", label: "Same City", desc: "Local city proximity" },
  { id: "Same State", label: "Same State / Region", desc: "Within traveling distance" },
  { id: "Anywhere in India", label: "Anywhere in India", desc: "Pan-India relocation open" },
  { id: "Anywhere in the World", label: "Anywhere in the World", desc: "Global & NRI open" },
];

const CORE_VALUES = [
  { id: "Trust & Honesty", label: "Trust & Honesty", icon: ShieldCheck, desc: "Transparency & deep integrity" },
  { id: "Caring & Supportive", label: "Caring & Supportive", icon: Heart, desc: "Emotional warmth & empathy" },
  { id: "Family Values", label: "Family Values", icon: Users, desc: "Close family bonds & respect" },
  { id: "Career & Ambition", label: "Career & Ambition", icon: Briefcase, desc: "Growth mindset & shared drive" },
  { id: "Good Communication", label: "Good Communication", icon: MessageCircle, desc: "Healthy conflict resolution" },
  { id: "Similar Lifestyle", label: "Similar Lifestyle", icon: Compass, desc: "Daily rhythm & habit harmony" },
];

export default function Step3PartnerPreferencesPage() {
  const { formData, updateField, errors, goToNextStep, goToPrevStep } = useRegistration();

  const handleToggleValue = (valueId: string) => {
    const current = formData.coreValues || [];
    if (current.includes(valueId)) {
      updateField("coreValues", current.filter((v) => v !== valueId));
    } else {
      if (current.length < 3) {
        updateField("coreValues", [...current, valueId]);
      }
    }
  };

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
          <span>STEP 3 OF 4 • PARTNER PREFERENCES</span>
        </div>
        <h1 className="reg-step-title">
          What matters <em>most to you?</em>
        </h1>
        <p className="reg-step-subtitle">
          Define the person you wish to build a meaningful life with. We focus on real alignment over endless swipes.
        </p>
      </div>

      {/* Form Fields */}
      <div className="reg-fields-grid">
        {/* Partner Gender */}
        <div className={`form-group full-width ${errors.partnerGender ? "has-error" : ""}`}>
          <label>
            What kind of partner are you looking for? <span className="required-star">*</span>
          </label>
          <div className="gender-chips-row">
            {PARTNER_GENDER_OPTIONS.map((pg) => {
              const isSelected = formData.partnerGender === pg.id;
              return (
                <button
                  type="button"
                  key={pg.id}
                  className={`gender-chip ${isSelected ? "selected" : ""}`}
                  onClick={() => updateField("partnerGender", pg.id)}
                >
                  <span className="chip-radio-circle">{isSelected && <span className="inner-dot" />}</span>
                  <span>{pg.label}</span>
                </button>
              );
            })}
          </div>
          {errors.partnerGender && <span className="error-msg">{errors.partnerGender}</span>}
        </div>


        {/* Preferred Location */}
        <div className={`form-group full-width ${errors.preferredLocation ? "has-error" : ""}`}>
          <label>
            Preferred Location <span className="required-star">*</span>
          </label>
          <div className="location-cards-grid">
            {LOCATION_OPTIONS.map((loc) => {
              const isSelected = formData.preferredLocation === loc.id;
              return (
                <button
                  type="button"
                  key={loc.id}
                  className={`location-card ${isSelected ? "selected" : ""}`}
                  onClick={() => updateField("preferredLocation", loc.id)}
                >
                  <div className="loc-card-header">
                    <strong>{loc.label}</strong>
                    <span className="loc-radio">{isSelected && <Check size={12} />}</span>
                  </div>
                  <small>{loc.desc}</small>
                </button>
              );
            })}
          </div>
          {errors.preferredLocation && <span className="error-msg">{errors.preferredLocation}</span>}
        </div>

        {/* What Matters Most in a Partner (Select up to 3) */}
        <div className={`form-group full-width ${errors.coreValues ? "has-error" : ""}`}>
          <div className="label-with-counter">
            <label>
              What matters most to you in a partner? <span className="required-star">*</span>
            </label>
            <span className="badge-counter">
              {(formData.coreValues || []).length} of 3 selected
            </span>
          </div>
          <div className="values-cards-grid">
            {CORE_VALUES.map((val) => {
              const Icon = val.icon;
              const isSelected = (formData.coreValues || []).includes(val.id);
              const isDisabled = !isSelected && (formData.coreValues || []).length >= 3;

              return (
                <button
                  type="button"
                  key={val.id}
                  disabled={isDisabled}
                  className={`value-selection-card ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}`}
                  onClick={() => handleToggleValue(val.id)}
                >
                  <div className="val-icon-box">
                    <Icon size={18} />
                  </div>
                  <div className="val-text-box">
                    <strong>{val.label}</strong>
                    <small>{val.desc}</small>
                  </div>
                  <div className="val-check-box">
                    {isSelected && <Check size={13} />}
                  </div>
                </button>
              );
            })}
          </div>
          {errors.coreValues && <span className="error-msg">{errors.coreValues}</span>}
        </div>
      </div>

      {/* Form Action Buttons */}
      <div className="reg-actions-row">
        <button type="button" className="reg-back-btn" onClick={goToPrevStep}>
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
        <button type="submit" className="reg-continue-btn">
          <span>Continue to Step 4</span>
          <ArrowRight size={17} />
        </button>
      </div>
    </form>
  );
}
