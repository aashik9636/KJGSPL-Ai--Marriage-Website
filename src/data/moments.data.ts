import { MomentsTabKey } from "@/types/common.types";

export interface MomentsTabContent {
  title: string;
  description: string;
}

export const momentsTabsData: Record<MomentsTabKey, MomentsTabContent> = {
  discover: {
    title: "Your coffee can wait a minute.",
    description:
      "Meet someone who wants the kind of future you do. A little curiosity fits into any day.",
  },
  understand: {
    title: "A closer look when you have a moment.",
    description:
      "Explore shared values, communication rhythms, and what really matters to both of you.",
  },
  connect: {
    title: "Start a conversation with ease.",
    description:
      "Turn a thoughtful question into a meaningful dialogue that feels natural and unhurried.",
  },
};
