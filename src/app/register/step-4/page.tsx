"use client";
import React, { useState } from "react";
import { useRegistration } from "@/context/registration-context";
import { 
  ArrowLeft, 
  Sparkles, 
  Check, 
  ShieldCheck 
} from "lucide-react";



const SUGGESTED_PROMPTS = [
  "“Building a life that feels as good as a slow Sunday morning.”",
  "“Passionate about design, evening walks, and deep conversations over coffee.”",
  "“Looking for an equal partner with mutual ambition and shared family values.”",
];

export default function Step4ExpectationsPage() {
  const { formData, updateField, errors, goToNextStep, goToPrevStep } = useRegistration();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const success = goToNextStep();
    if (!success) {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reg-step-form" noValidate>
      {/* Step Header */}
      <div className="reg-step-header">
        <div className="step-eyebrow">
          <Sparkles size={13} className="sparkle-rose" />
          <span>STEP 4 OF 4 • MARRIAGE EXPECTATIONS</span>
        </div>
        <h1 className="reg-step-title">
          Your marriage <em>intentions.</em>
        </h1>
        <p className="reg-step-subtitle">
          Finalize your timeline and introduce yourself in your own authentic words before discovering verified matches.
        </p>
      </div>

      {/* Form Fields */}
      <div className="reg-fields-grid">

        {/* Short Bio / Introduction (Optional) */}
        <div className="form-group full-width">
          <div className="label-with-counter">
            <label htmlFor="bio">
              Tell us a little about yourself <span className="optional-tag">(Optional)</span>
            </label>
            <span className="char-counter">
              {(formData.bio || "").length} / 500 characters
            </span>
          </div>
          
          <textarea
            id="bio"
            rows={4}
            maxLength={500}
            placeholder="Share your passions, what a normal Sunday looks like, or what kind of life you dream of building together..."
            value={formData.bio}
            onChange={(e) => updateField("bio", e.target.value)}
            className="form-input form-textarea"
          />

          {/* Quick Prompt Suggestions */}
          <div className="quick-prompts-wrapper">
            <span className="quick-prompt-label">Tap to add an intelligent starter prompt:</span>
            <div className="quick-prompts-chips">
              {SUGGESTED_PROMPTS.map((prompt, idx) => (
                <button
                  type="button"
                  key={idx}
                  className="prompt-chip-btn"
                  onClick={() => {
                    const current = formData.bio ? `${formData.bio}\n${prompt}` : prompt;
                    updateField("bio", current.slice(0, 500));
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Guarantee Box */}
      <div className="reg-guarantee-box">
        <ShieldCheck size={20} className="guarantee-icon" />
        <div>
          <h5>Strict 100% Privacy Guarantee</h5>
          <p>
            Your profile will only be shown to compatible, verified members who match your exact criteria. No public web indexing or swiping.
          </p>
        </div>
      </div>

      {/* Form Action Buttons */}
      <div className="reg-actions-row">
        <button type="button" className="reg-back-btn" onClick={goToPrevStep}>
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="reg-submit-btn"
        >
          <span>Complete Registration</span>
          <Sparkles size={18} className="sparkle-icon" />
        </button>
      </div>
    </form>
  );
}
