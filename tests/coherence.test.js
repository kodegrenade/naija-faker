const faker = require('../src/Faker/Factory/factory')
const { regionMap, languageToRegions } = require('../src/Faker/Providers/geo')
const { titleRules } = require('../src/Faker/Providers/title')
const { degrees, positionLevels } = require('../src/Faker/Providers/jobs')
const assert = require('assert').strict

const SAMPLE = 200
const currentYear = new Date().getFullYear()

describe("coherence - detailedPerson()", function () {
  const people = []
  before(function () {
    for (let i = 0; i < SAMPLE; i++) people.push(faker.detailedPerson())
  })

  it("title should be valid for the person's ethnic group", function () {
    for (const p of people) {
      const rule = titleRules[p.title]
      if (!rule || !rule.languages) continue
      assert.ok(
        rule.languages.includes(p.language),
        `"${p.title}" is not a ${p.language} title (${p.fullName}, ${p.state})`
      )
    }
  })

  it("title should be plausible for the person's age", function () {
    for (const p of people) {
      const rule = titleRules[p.title]
      if (!rule) continue
      const age = p.dateOfBirth.age
      if (rule.minAge !== undefined) assert.ok(age >= rule.minAge, `"${p.title}" at ${age}`)
      if (rule.maxAge !== undefined) assert.ok(age <= rule.maxAge, `"${p.title}" at ${age}`)
    }
  })

  it("title should be backed by the qualification it implies", function () {
    for (const p of people) {
      const rule = titleRules[p.title]
      if (!rule) continue
      if (rule.degrees) {
        assert.ok(rule.degrees.includes(p.education.degree),
          `"${p.title}" holding only a ${p.education.degree}`)
      }
      if (rule.disciplines) {
        assert.ok(rule.disciplines.includes(p.education.discipline),
          `"${p.title}" with a ${p.education.discipline} degree`)
      }
    }
  })

  it("'Mrs.' should not be single", function () {
    for (const p of people) {
      if (p.title === "Mrs.") assert.notEqual(p.maritalStatus, "Single", p.fullName)
    }
  })

  it("state should match the language", function () {
    for (const p of people) {
      const validStates = languageToRegions[p.language].flatMap(r => regionMap[r].states)
      assert.ok(validStates.includes(p.state), `${p.language} person in ${p.state}`)
    }
  })

  it("graduation should come after birth, at a plausible age, and not in the future", function () {
    for (const p of people) {
      const birthYear = Number(p.dateOfBirth.date.slice(0, 4))
      const gradAge = degrees.find(d => d.code === p.education.degree).gradAge
      assert.ok(p.education.graduationYear >= birthYear + gradAge,
        `${p.education.degree} in ${p.education.graduationYear}, born ${birthYear}`)
      assert.ok(p.education.graduationYear <= currentYear,
        `graduated in ${p.education.graduationYear}`)
    }
  })

  it("course should belong to the degree's discipline", function () {
    const { courseDisciplines } = require('../src/Faker/Providers/jobs')
    for (const p of people) {
      const degree = degrees.find(d => d.code === p.education.degree)
      assert.ok(degree.disciplines.includes(p.education.discipline),
        `${p.education.degree} in ${p.education.discipline}`)
      assert.ok(courseDisciplines[p.education.discipline].includes(p.education.course),
        `${p.education.course} is not a ${p.education.discipline} course`)
    }
  })

  it("work should start after graduating and not in the future", function () {
    for (const p of people) {
      assert.ok(p.work.startYear >= p.education.graduationYear,
        `started ${p.work.startYear}, graduated ${p.education.graduationYear}`)
      assert.ok(p.work.startYear <= currentYear, `started ${p.work.startYear}`)
    }
  })

  it("position and salary should match the seniority level", function () {
    for (const p of people) {
      assert.ok(positionLevels[p.work.level].includes(p.work.position),
        `"${p.work.position}" is not a ${p.work.level} role`)
      assert.equal(p.salary.level, p.work.level,
        `${p.salary.level} pay for a ${p.work.level} role`)
    }
  })

  it("seniority should be earned by years of experience", function () {
    const minYears = { entry: 0, mid: 3, senior: 8, executive: 15 }
    for (const p of people) {
      assert.ok(p.work.yearsOfExperience >= minYears[p.work.level],
        `${p.work.level} (${p.work.position}) on ${p.work.yearsOfExperience} years`)
    }
  })

  it("marital status should be plausible for the age", function () {
    const minAges = { Married: 21, Separated: 25, Divorced: 27, Widowed: 35 }
    for (const p of people) {
      const min = minAges[p.maritalStatus]
      if (min) assert.ok(p.dateOfBirth.age >= min, `${p.maritalStatus} at ${p.dateOfBirth.age}`)
    }
  })

  it("next of kin should be a relative the person could have", function () {
    for (const p of people) {
      const kin = p.nextOfKin
      const age = p.dateOfBirth.age
      if (kin.relationship === "Spouse") assert.equal(p.maritalStatus, "Married", p.fullName)
      if (kin.relationship === "Son" || kin.relationship === "Daughter") {
        assert.ok(age >= 38, `${age}-year-old with a ${kin.relationship} as next of kin`)
      }
      if (kin.relationship === "Father" || kin.relationship === "Mother") {
        assert.ok(age <= 60, `${age}-year-old with a living ${kin.relationship}`)
      }
      assert.ok(kin.fullName.endsWith(p.lastName), `${kin.fullName} vs ${p.fullName}`)
    }
  })

  it("date of birth should be a real date matching the stated age", function () {
    for (const p of people) {
      const [y, m, d] = p.dateOfBirth.date.split('-').map(Number)
      const date = new Date(y, m - 1, d)
      assert.equal(date.getDate(), d, `invalid date ${p.dateOfBirth.date}`)
      const now = new Date()
      let age = now.getFullYear() - y
      if (now.getMonth() < m - 1 || (now.getMonth() === m - 1 && now.getDate() < d)) age--
      assert.equal(age, p.dateOfBirth.age, `${p.dateOfBirth.date} is not age ${p.dateOfBirth.age}`)
    }
  })

  it("traditional ruler titles should stay rare", function () {
    const rulers = people.filter(p => ["Oba", "Igwe", "Emir"].includes(p.title))
    assert.ok(rulers.length <= SAMPLE * 0.05, `${rulers.length}/${SAMPLE} are traditional rulers`)
  })
})

describe("coherence - standalone providers keep their old contracts", function () {
  it("title() without context still returns a title", function () {
    assert.ok(faker.title("male").length > 0)
    assert.ok(faker.title("female").length > 0)
  })

  it("address() honours an explicit region", function () {
    const { places } = require('../src/Faker/Providers/address')
    for (let i = 0; i < 20; i++) {
      const address = faker.address("east")
      const place = address.split(', ').pop()
      assert.ok(places[0].east.includes(place), `"${place}" is not in the east`)
    }
  })

  it("address() rejects an unknown region", function () {
    assert.throws(() => faker.address("middle-belt"), { code: 'INVALID_REGION' })
  })
})

describe("coherence - credential-bound roles", function () {
  const { positionDisciplines } = require('../src/Faker/Providers/jobs')

  it("should not give a regulated role to someone who never qualified", function () {
    for (let i = 0; i < SAMPLE; i++) {
      const p = faker.detailedPerson()
      const required = positionDisciplines[p.work.position]
      if (!required) continue
      assert.ok(
        required.includes(p.education.discipline),
        `${p.work.position} with a ${p.education.discipline} degree (${p.fullName})`
      )
    }
  })
})
