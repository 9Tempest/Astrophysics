import type { Challenge } from "../../components";

export const cosmicScaleChallenges: readonly Challenge[] = [
  {
    id: "earth-sun-gap",
    title: "Find the Earth-Sun size gap",
    difficulty: "beginner",
    goal: "Compare the Earth and Sun cards and estimate how many orders of magnitude separate their diameters.",
    hint: "Use gap = log10(Sun diameter) - log10(Earth diameter).",
    successCondition: "You should get about 2.04 orders of magnitude, or roughly 109 times wider.",
    explanationAfterSuccess:
      "Two orders of magnitude already means a factor of 100, so the Sun being about 109 Earth diameters wide fits the logarithmic scale."
  },
  {
    id: "parsec-to-light-years",
    title: "Convert 1 parsec",
    difficulty: "beginner",
    goal: "Set the converter to 1 pc and read the light-year result.",
    hint: "The pc row should be the input unit, and the ly row gives the answer.",
    successCondition: "1 pc should display as about 3.26 ly.",
    explanationAfterSuccess:
      "Parsecs come from parallax geometry, but the app converts them through meters just like every other unit."
  },
  {
    id: "place-distance-units",
    title: "Place AU, ly, and pc",
    difficulty: "exploratory",
    goal: "Use the unit landmarks on the ruler to locate AU, light-year, and parsec on the logarithmic scale.",
    hint: "Their exponents are roughly 11.17, 15.98, and 16.49.",
    successCondition: "You can explain why AU is a solar-system unit while ly and pc are interstellar units.",
    explanationAfterSuccess:
      "The AU sits near planetary scales; ly and pc live several orders of magnitude farther out, where nearby stars and galaxies become natural reference points."
  }
];
