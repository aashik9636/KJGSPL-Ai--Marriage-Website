import { FixturesRecord } from "@/types/profile.types";

export const families = [
  "Values & intent",
  "Reciprocal preferences",
  "Lifestyle & family",
  "Location willingness",
  "Interests & communication",
];

export const fixtures: FixturesRecord = {
  arjun: {
    name: "Arjun",
    full: "Arjun Mehta",
    age: 32,
    job: "Architect",
    score: 58,
    values: [62, 55, 50, 70, 55],
    quote: "A passport full of stories. Always planning the next chapter.",
    tags: ["Architecture", "Travel", "New experiences"],
    why: [
      "Both value kindness and thoughtful conversation.",
      "Both enjoy exploring new places.",
      "Both are open to a meaningful relationship.",
    ],
    differences: [
      "Mira wants to put down roots; Arjun is considering another move.",
      "They describe different timelines for marriage.",
    ],
  },
  dev: {
    name: "Dev",
    full: "Dev Shah",
    age: 31,
    job: "Product designer",
    score: 89,
    values: [94, 88, 86, 90, 78],
    quote: "Slow Sundays. Good books. A life we build, together.",
    tags: ["Sunday cooking", "Bookshops", "Long walks"],
    why: [
      "They share a clear intention to build a lasting relationship.",
      "Both value calm, honest communication.",
      "Their plans for family life and settling in Dubai align.",
    ],
    differences: [
      "Mira recharges with friends; Dev needs a little quiet time.",
      "Their travel rhythms differ—a good first conversation.",
    ],
  },
};
