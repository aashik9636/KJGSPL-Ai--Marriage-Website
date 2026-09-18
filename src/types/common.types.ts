export type ModalType = "journey" | "details" | "preferences" | "privacy" | "matchmaking" | "reasons" | "quiz" | null;
export type StageType = "intro" | "scanning" | "result";
export type MomentsTabKey = "discover" | "understand" | "connect";

export interface MockupStep {
  id: number;
  num: string;
  label: string;
}

export interface UserPreferences {
  sound: boolean;
  motion: boolean;
}
