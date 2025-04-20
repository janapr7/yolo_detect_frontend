export type Detection = {
  label: string;
  confidence: number;
  bbox: number[];
};

export type Trait =
  | "openness"
  | "conscientiousness"
  | "extraversion"
  | "agreeableness"
  | "neuroticism";

export type Polarity = "+" | "-" | "";

export type DetectionRule = {
  [category: string]: {
    [label: string]: Partial<Record<Trait, Polarity>>;
  };
};

export type CategoryResult = {
  label: string;
  confidence: number;
} | null;

export type RuleValue = Record<Trait, { positive: number; negative: number }>;
