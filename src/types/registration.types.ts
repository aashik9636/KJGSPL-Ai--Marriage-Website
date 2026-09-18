export interface RegistrationFormData {
  // Step 1: Basic Details
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  city: string;

  // Step 2: About You
  education: string;
  occupation: string;
  maritalStatus: string;
  religion: string;

  // Step 3: Partner Preferences
  partnerGender: string;
  preferredAgeRange: string;
  preferredLocation: string;
  coreValues: string[]; // Select up to 3

  // Step 4: Your Expectations
  marriageIntent: string;
  bio: string;
}

export type RegistrationStep = 1 | 2 | 3 | 4;

export const INITIAL_REGISTRATION_DATA: RegistrationFormData = {
  fullName: "",
  email: "",
  phone: "",
  dob: "",
  gender: "",
  city: "",
  education: "",
  occupation: "",
  maritalStatus: "",
  religion: "",
  partnerGender: "",
  preferredAgeRange: "",
  preferredLocation: "",
  coreValues: [],
  marriageIntent: "",
  bio: "",
};
