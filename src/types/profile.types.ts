export interface ProfileFixture {
  name: string;
  full: string;
  age: number;
  job: string;
  score: number;
  values: number[];
  quote: string;
  tags: string[];
  why: string[];
  differences: string[];
}

export type PairKey = "arjun" | "dev";
export type FixturesRecord = Record<PairKey, ProfileFixture>;
