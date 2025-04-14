export const DETECTION_RULE = {
  category_1: {
    fire: {
      openness: "",
      conscientiousness: "",
      extraversion: "+",
      agreeableness: "-",
      neuroticism: "",
    },
    water: {
      openness: "-",
      conscientiousness: "-",
      extraversion: "-",
      agreeableness: "+",
      neuroticism: "+",
    },
    earth: {
      openness: "-",
      conscientiousness: "+",
      extraversion: "",
      agreeableness: "",
      neuroticism: "",
    },
    air: {
      openness: "+",
      conscientiousness: "+",
      extraversion: "+",
      agreeableness: "",
      neuroticism: "",
    },
  },
  category_2: {
    high_fline: {
      openness: "-",
      conscientiousness: "-",
      extraversion: "-",
      agreeableness: "+",
      neuroticism: "+",
    },
    medium_fline: {
      openness: "",
      conscientiousness: "",
      extraversion: "+",
      agreeableness: "",
      neuroticism: "+",
    },
    low_fline: {
      openness: "",
      conscientiousness: "",
      extraversion: "+",
      agreeableness: "",
      neuroticism: "-",
    },
  },
  category_3: {
    long_mercuryf: {
      openness: "+",
      conscientiousness: "",
      extraversion: "",
      agreeableness: "",
      neuroticism: "-",
    },
    short_mercuryf: {
      openness: "-",
      conscientiousness: "",
      extraversion: "",
      agreeableness: "",
      neuroticism: "+",
    },
  },
  category_4: {
    high_lmars: {
      openness: "",
      conscientiousness: "+",
      extraversion: "+",
      agreeableness: "-",
      neuroticism: "",
    },
    low_lmars: {
      openness: "",
      conscientiousness: "-",
      extraversion: "+",
      agreeableness: "+",
      neuroticism: "",
    },
  },
};

export const CATEGORY_LIST = {
  category_1: ["fire", "water", "earth", "air"],
  category_2: ["high_fline", "medium_fline", "low_fline"],
  categoty_3: ["long_mercuryf", "short_mercuryf"],
  category_4: ["high_lmars", "low_lmars"],
};
