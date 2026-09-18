import { PlanTier } from "@/types/plan.types";

export const plans: PlanTier[] = [
  {
    name: "Discover",
    level: "Free",
    price: "0",
    description: "Start with what matters.",
    items: [
      "Up to 10 eligible profiles a day",
      "Key compatibility discussion points",
      "Interest & mutual-consent messaging",
      "Essential privacy & safety",
    ],
  },
  {
    name: "Connect",
    level: "Plus",
    price: "19.99",
    description: "Make room for a deeper connection.",
    items: [
      "Everything in Discover",
      "Detailed alignment breakdowns",
      "Collections & private notes",
      "1 boost per monthly cycle",
    ],
  },
  {
    name: "Intent",
    level: "Premium",
    price: "39.99",
    description: "Be more intentional with your time.",
    items: [
      "Everything in Connect",
      "Saved soft-preference filters",
      "3 boosts per monthly cycle",
      "Aggregate activity insights",
    ],
  },
];
