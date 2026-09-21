/**
 * Job and Education Data
 */

/**
 * Positions grouped by seniority so pay and years of experience can line up.
 */
const positionLevels = {
  entry: [
    "Administrative Officer", "Customer Service Manager", "Quality Assurance Officer",
    "Human Resources Officer", "Associate", "Coordinator", "Specialist",
  ],
  mid: [
    "Software Engineer", "Accountant", "Data Analyst", "Financial Analyst",
    "Sales Executive", "Compliance Officer", "Consultant", "Supervisor", "Team Lead",
  ],
  senior: [
    "Senior Analyst", "Project Manager", "Marketing Manager", "Operations Manager",
    "Business Development Manager", "Product Manager", "IT Manager",
    "Supply Chain Manager", "Branch Manager", "Legal Counsel",
  ],
  executive: [
    "Chief Executive Officer", "Managing Director", "Executive Director",
    "Head of Operations",
  ],
}

const positions = Object.values(positionLevels).flat()

/**
 * Roles that genuinely need a matching qualification. Everything else is
 * left open, since changing field mid-career is ordinary enough.
 */
const positionDisciplines = {
  "Legal Counsel": ["law"],
  "Accountant": ["business"],
  "Financial Analyst": ["business"],
  "Software Engineer": ["science", "engineering"],
}

/**
 * Courses grouped by discipline so a degree is never awarded in an
 * unrelated subject (no "B.Pharm in History").
 */
const courseDisciplines = {
  science: [
    "Computer Science", "Biochemistry", "Microbiology", "Chemistry", "Physics",
    "Mathematics", "Industrial Chemistry", "Agricultural Science", "Nursing",
  ],
  engineering: [
    "Electrical Engineering", "Mechanical Engineering", "Civil Engineering",
    "Petroleum Engineering", "Chemical Engineering", "Architecture",
  ],
  business: [
    "Accounting", "Business Administration", "Economics", "Banking & Finance",
    "Estate Management",
  ],
  arts: [
    "Mass Communication", "English Language", "History", "Philosophy",
    "Sociology", "Political Science", "Public Administration",
  ],
  law: ["Law"],
  medicine: ["Medicine & Surgery"],
  pharmacy: ["Pharmacy"],
}

const courses = Object.values(courseDisciplines).flat()

/**
 * gradAge    - typical age the qualification is completed, so graduation
 *              years stay behind the date of birth and ahead of the first job.
 * disciplines - which course groups the degree can be awarded in.
 */
const degrees = [
  { code: "B.Sc", full: "Bachelor of Science", gradAge: 22, disciplines: ["science", "business", "arts"] },
  { code: "B.A", full: "Bachelor of Arts", gradAge: 22, disciplines: ["arts"] },
  { code: "B.Eng", full: "Bachelor of Engineering", gradAge: 23, disciplines: ["engineering"] },
  { code: "B.Tech", full: "Bachelor of Technology", gradAge: 23, disciplines: ["engineering", "science"] },
  { code: "B.Ed", full: "Bachelor of Education", gradAge: 22, disciplines: ["arts", "science"] },
  { code: "LL.B", full: "Bachelor of Law", gradAge: 23, disciplines: ["law"] },
  { code: "B.Pharm", full: "Bachelor of Pharmacy", gradAge: 23, disciplines: ["pharmacy"] },
  { code: "MBBS", full: "Bachelor of Medicine", gradAge: 25, disciplines: ["medicine"] },
  { code: "M.Sc", full: "Master of Science", gradAge: 25, disciplines: ["science", "business", "engineering"] },
  { code: "M.A", full: "Master of Arts", gradAge: 25, disciplines: ["arts"] },
  { code: "MBA", full: "Master of Business Administration", gradAge: 27, disciplines: ["business"] },
  { code: "M.Eng", full: "Master of Engineering", gradAge: 26, disciplines: ["engineering"] },
  { code: "Ph.D", full: "Doctor of Philosophy", gradAge: 30, disciplines: Object.keys(courseDisciplines) },
  { code: "HND", full: "Higher National Diploma", gradAge: 23, disciplines: ["engineering", "science", "business"] },
  { code: "OND", full: "Ordinary National Diploma", gradAge: 20, disciplines: ["engineering", "science", "business"] },
]

module.exports = { positions, positionLevels, positionDisciplines, degrees, courses, courseDisciplines }
