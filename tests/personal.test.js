const faker = require('../src/Faker/Factory/factory')
const assert = require('assert').strict

describe("provider - dateOfBirth()", function () {
  it("should return an object with date and age", function () {
    const dob = faker.dateOfBirth()
    assert.ok('date' in dob)
    assert.ok('age' in dob)
  })

  it("date should match YYYY-MM-DD format", function () {
    const dob = faker.dateOfBirth()
    assert.match(dob.date, /^\d{4}-\d{2}-\d{2}$/)
  })

  it("default age should be between 18 and 65", function () {
    for (let i = 0; i < 20; i++) {
      const dob = faker.dateOfBirth()
      assert.ok(dob.age >= 18, `Age ${dob.age} is below 18`)
      assert.ok(dob.age <= 65, `Age ${dob.age} is above 65`)
    }
  })

  it("should respect custom minAge and maxAge", function () {
    for (let i = 0; i < 20; i++) {
      const dob = faker.dateOfBirth({ minAge: 25, maxAge: 30 })
      assert.ok(dob.age >= 25, `Age ${dob.age} is below 25`)
      assert.ok(dob.age <= 30, `Age ${dob.age} is above 30`)
    }
  })

  it("date year should match age", function () {
    const dob = faker.dateOfBirth()
    const birthYear = parseInt(dob.date.split('-')[0])
    const currentYear = new Date().getFullYear()
    assert.ok(
      currentYear - birthYear === dob.age || currentYear - birthYear === dob.age + 1,
      `Year ${birthYear} doesn't match age ${dob.age}`
    )
  })
})

describe("provider - maritalStatus()", function () {
  const validStatuses = ["Single", "Married", "Divorced", "Widowed", "Separated"]

  it("should return a valid marital status", function () {
    const status = faker.maritalStatus()
    assert.ok(validStatuses.includes(status), `Invalid status: ${status}`)
  })

  it("should generate varied statuses", function () {
    const statuses = new Set()
    for (let i = 0; i < 50; i++) {
      statuses.add(faker.maritalStatus())
    }
    assert.ok(statuses.size > 1, "Expected varied marital statuses")
  })
})

describe("provider - bloodGroup()", function () {
  const validGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

  it("should return a valid blood group", function () {
    const group = faker.bloodGroup()
    assert.ok(validGroups.includes(group), `Invalid blood group: ${group}`)
  })

  it("should generate varied blood groups", function () {
    const groups = new Set()
    for (let i = 0; i < 50; i++) {
      groups.add(faker.bloodGroup())
    }
    assert.ok(groups.size > 1, "Expected varied blood groups")
  })
})

describe("provider - genotype()", function () {
  const validGenotypes = ["AA", "AS", "AC", "SS", "SC"]

  it("should return a valid genotype", function () {
    const geno = faker.genotype()
    assert.ok(validGenotypes.includes(geno), `Invalid genotype: ${geno}`)
  })

  it("should generate varied genotypes", function () {
    const genos = new Set()
    for (let i = 0; i < 50; i++) {
      genos.add(faker.genotype())
    }
    assert.ok(genos.size > 1, "Expected varied genotypes")
  })
})
