const maleTitles = [
  "Mr.",
  "Master",
  "Prof.",
  "Dr.",
  "Engr.",
  "Chief",
  "Alhaji",
  "Hon.",
  "Barr.",
  "Pastor",
  "Otunba",
  "Oloye",
  "Igwe",
  "Oba",
  "Emir",
]

const femaleTitles = [
  "Mrs.",
  "Ms.",
  "Prof.",
  "Dr.",
  "Engr.",
  "Chief",
  "Alhaja",
  "Hon.",
  "Barr.",
  "Pastor",
  "Deaconess",
]

/**
 * Coherence rules per title. Titles absent from this map are unconstrained.
 *
 * languages      - title only makes sense for these ethnic groups
 * minAge/maxAge  - plausible age window for holding the title
 * degrees        - title requires one of these qualifications
 * disciplines    - title requires a degree in one of these fields
 * maritalStatus  - title only valid alongside these marital statuses
 * rare           - traditional rulers; picked only occasionally, not 1-in-15
 */
const titleRules = {
  "Master": { maxAge: 17 },
  "Mr.": { minAge: 18 },
  "Mrs.": { minAge: 18, maritalStatus: ["Married", "Divorced", "Widowed", "Separated"] },
  "Ms.": { minAge: 18 },
  "Prof.": { minAge: 40, degrees: ["Ph.D"] },
  "Dr.": { minAge: 28, degrees: ["Ph.D", "MBBS"] },
  "Engr.": { minAge: 23, disciplines: ["engineering"] },
  "Barr.": { minAge: 25, degrees: ["LL.B"] },
  "Hon.": { minAge: 30 },
  "Chief": { minAge: 35 },
  "Pastor": { minAge: 30 },
  "Deaconess": { minAge: 30 },
  "Alhaji": { minAge: 30, languages: ["hausa", "yoruba"] },
  "Alhaja": { minAge: 30, languages: ["hausa", "yoruba"] },
  "Otunba": { minAge: 40, languages: ["yoruba"] },
  "Oloye": { minAge: 40, languages: ["yoruba"] },
  "Oba": { minAge: 45, languages: ["yoruba"], rare: true },
  "Igwe": { minAge: 45, languages: ["igbo"], rare: true },
  "Emir": { minAge: 45, languages: ["hausa"], rare: true },
}

module.exports = { maleTitles, femaleTitles, titleRules }