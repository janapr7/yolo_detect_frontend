export const DETECTION_RULE = {
  category1: {
    Fire: {
      openness: "",
      conscientiousness: "",
      extraversion: "+",
      agreeableness: "-",
      neuroticism: "",
    },
    Water: {
      openness: "-",
      conscientiousness: "-",
      extraversion: "-",
      agreeableness: "+",
      neuroticism: "+",
    },
    Earth: {
      openness: "-",
      conscientiousness: "+",
      extraversion: "",
      agreeableness: "",
      neuroticism: "",
    },
    Air: {
      openness: "+",
      conscientiousness: "+",
      extraversion: "+",
      agreeableness: "",
      neuroticism: "",
    },
  },
  category2: {
    High_FLine: {
      openness: "-",
      conscientiousness: "-",
      extraversion: "-",
      agreeableness: "+",
      neuroticism: "+",
    },
    Medium_FLine: {
      openness: "",
      conscientiousness: "",
      extraversion: "+",
      agreeableness: "",
      neuroticism: "+",
    },
    Low_FLine: {
      openness: "",
      conscientiousness: "",
      extraversion: "+",
      agreeableness: "",
      neuroticism: "-",
    },
  },
  category3: {
    Long_MercuryF: {
      openness: "+",
      conscientiousness: "",
      extraversion: "",
      agreeableness: "",
      neuroticism: "-",
    },
    Short_MercuryF: {
      openness: "-",
      conscientiousness: "",
      extraversion: "",
      agreeableness: "",
      neuroticism: "+",
    },
  },
  category4: {
    High_LMars: {
      openness: "",
      conscientiousness: "+",
      extraversion: "+",
      agreeableness: "-",
      neuroticism: "",
    },
    Low_LMars: {
      openness: "",
      conscientiousness: "-",
      extraversion: "+",
      agreeableness: "+",
      neuroticism: "",
    },
  },
};

export const CATEGORY_LIST = {
  category1: ["Fire", "Water", "Earth", "Air"],
  category2: ["High_FLine", "Medium_FLine", "Low_FLine"],
  category3: ["Long_MercuryF", "Short_MercuryF"],
  category4: ["High_LMars", "Low_LMars"],
  category5: ["Saturnus_Line"],
};
