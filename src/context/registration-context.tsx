"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { 
  RegistrationFormData, 
  RegistrationStep, 
  INITIAL_REGISTRATION_DATA 
} from "@/types/registration.types";

interface RegistrationContextType {
  formData: RegistrationFormData;
  currentStep: RegistrationStep;
  errors: Record<string, string>;
  isHydrated: boolean;
  updateField: <K extends keyof RegistrationFormData>(field: K, value: RegistrationFormData[K]) => void;
  updateFields: (fields: Partial<RegistrationFormData>) => void;
  validateStep: (step: RegistrationStep) => boolean;
  goToNextStep: () => boolean;
  goToPrevStep: () => void;
  goToStep: (step: RegistrationStep) => void;
  clearError: (field: string) => void;
  resetForm: () => void;
}

const STORAGE_KEY = "ai_marriage_registration_data";

const RegistrationContext = createContext<RegistrationContextType | null>(null);

export const RegistrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  
  const [formData, setFormData] = useState<RegistrationFormData>(INITIAL_REGISTRATION_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isHydrated, setIsHydrated] = useState(false);

  // Derive current step from pathname
  const getCurrentStepFromPath = (): RegistrationStep => {
    if (pathname.includes("step-2")) return 2;
    if (pathname.includes("step-3")) return 3;
    if (pathname.includes("step-4")) return 4;
    return 1;
  };

  const currentStep = getCurrentStepFromPath();

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setFormData(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load registration data", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isHydrated) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      } catch (e) {
        console.error("Failed to persist registration data", e);
      }
    }
  }, [formData, isHydrated]);

  const updateField = <K extends keyof RegistrationFormData>(
    field: K, 
    value: RegistrationFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const updateFields = (fields: Partial<RegistrationFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
    setErrors((prev) => {
      const next = { ...prev };
      Object.keys(fields).forEach((key) => delete next[key]);
      return next;
    });
  };

  const clearError = (field: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validateStep = (step: RegistrationStep): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Please enter your full name";
      } else if (formData.fullName.trim().length < 2) {
        newErrors.fullName = "Name must be at least 2 characters";
      }

      if (!formData.email.trim()) {
        newErrors.email = "Please enter your email address";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address";
      }

      if (!formData.phone.trim()) {
        newErrors.phone = "Please enter your mobile number";
      } else if (formData.phone.trim().replace(/\D/g, "").length < 8) {
        newErrors.phone = "Please enter a valid mobile number";
      }

      if (!formData.dob) {
        newErrors.dob = "Please select your date of birth";
      } else {
        const birthDate = new Date(formData.dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        if (age < 18) {
          newErrors.dob = "You must be at least 18 years old to register";
        }
      }

      if (!formData.gender) {
        newErrors.gender = "Please select your gender";
      }

      if (!formData.city.trim()) {
        newErrors.city = "Please enter your current city";
      }
    }

    if (step === 2) {
      if (!formData.education.trim()) {
        newErrors.education = "Please select or enter your qualification";
      }

      if (!formData.occupation.trim()) {
        newErrors.occupation = "Please enter your occupation/profession";
      }

      if (!formData.maritalStatus) {
        newErrors.maritalStatus = "Please select your marital status";
      }
    }

    if (step === 3) {
      if (!formData.partnerGender) {
        newErrors.partnerGender = "Please select your partner gender preference";
      }

      if (!formData.preferredAgeRange) {
        newErrors.preferredAgeRange = "Please select preferred age range";
      }

      if (!formData.preferredLocation) {
        newErrors.preferredLocation = "Please select preferred location preference";
      }

      if (!formData.coreValues || formData.coreValues.length === 0) {
        newErrors.coreValues = "Please select at least 1 priority (up to 3)";
      }
    }

    if (step === 4) {
      if (!formData.marriageIntent) {
        newErrors.marriageIntent = "Please select what you are looking for";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToNextStep = (): boolean => {
    const isValid = validateStep(currentStep);
    if (!isValid) return false;

    if (currentStep === 1) {
      router.push("/register/step-2");
    } else if (currentStep === 2) {
      router.push("/register/step-3");
    } else if (currentStep === 3) {
      router.push("/register/step-4");
    } else if (currentStep === 4) {
      router.push("/register/matches");
    }
    return true;
  };

  const goToPrevStep = () => {
    if (currentStep === 2) {
      router.push("/register/step-1");
    } else if (currentStep === 3) {
      router.push("/register/step-2");
    } else if (currentStep === 4) {
      router.push("/register/step-3");
    } else {
      router.push("/");
    }
  };

  const goToStep = (step: RegistrationStep) => {
    router.push(`/register/step-${step}`);
  };

  const resetForm = () => {
    setFormData(INITIAL_REGISTRATION_DATA);
    setErrors({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
    router.push("/register/step-1");
  };

  return (
    <RegistrationContext.Provider
      value={{
        formData,
        currentStep,
        errors,
        isHydrated,
        updateField,
        updateFields,
        validateStep,
        goToNextStep,
        goToPrevStep,
        goToStep,
        clearError,
        resetForm,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error("useRegistration must be used within a RegistrationProvider");
  }
  return context;
};
