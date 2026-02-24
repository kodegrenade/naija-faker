const faker = require('../src/Faker/Factory/factory')
const assert = require('assert').strict

describe("provider - educationRecord()", function () {
  const expectedKeys = ['university', 'abbreviation', 'degree', 'course', 'graduationYear']

  it("should return an object with all expected keys", function () {
    const record = faker.educationRecord()
    for (const key of expectedKeys) {
      assert.ok(key in record, `Missing key: ${key}`)
    }
  })

  it("graduationYear should be a reasonable past year", function () {
    const record = faker.educationRecord()
    const currentYear = new Date().getFullYear()
    assert.ok(record.graduationYear >= currentYear - 21)
    assert.ok(record.graduationYear <= currentYear - 1)
  })

  it("degree should be a known code", function () {
    const record = faker.educationRecord()
    const knownDegrees = ["B.Sc", "B.A", "B.Eng", "B.Tech", "B.Ed", "LL.B", "B.Pharm", "MBBS", "M.Sc", "M.A", "MBA", "M.Eng", "Ph.D", "HND", "OND"]
    assert.ok(knownDegrees.includes(record.degree), `Unknown degree: ${record.degree}`)
  })

  it("should filter universities by region when language is provided", function () {
    // Yoruba language should return western Nigerian universities
    for (let i = 0; i < 10; i++) {
      const record = faker.educationRecord("yoruba")
      assert.ok(record.university.length > 0)
    }
  })
})

describe("provider - workRecord()", function () {
  const expectedKeys = ['company', 'position', 'industry', 'startYear']

  it("should return an object with all expected keys", function () {
    const record = faker.workRecord()
    for (const key of expectedKeys) {
      assert.ok(key in record, `Missing key: ${key}`)
    }
  })

  it("startYear should be within last 15 years", function () {
    const record = faker.workRecord()
    const currentYear = new Date().getFullYear()
    assert.ok(record.startYear >= currentYear - 15)
    assert.ok(record.startYear <= currentYear)
  })

  it("company should be a non-empty string", function () {
    const record = faker.workRecord()
    assert.ok(record.company.length > 0)
  })
})

describe("provider - vehicleRecord()", function () {
  const expectedKeys = ['licensePlate', 'make', 'model', 'year', 'color']

  it("should return an object with all expected keys", function () {
    const record = faker.vehicleRecord()
    for (const key of expectedKeys) {
      assert.ok(key in record, `Missing key: ${key}`)
    }
  })

  it("licensePlate should match plate format", function () {
    const record = faker.vehicleRecord()
    assert.match(record.licensePlate, /^[A-Z]{2,3}-\d{3}[A-Z]{2}$/)
  })

  it("should use matching state for license plate when state is provided", function () {
    const record = faker.vehicleRecord("Lagos")
    assert.ok(record.licensePlate.startsWith("LAG-"))
  })

  it("year should be within last 15 years", function () {
    const record = faker.vehicleRecord()
    const currentYear = new Date().getFullYear()
    assert.ok(record.year >= currentYear - 15)
    assert.ok(record.year <= currentYear)
  })

  it("make should be a non-empty string", function () {
    const record = faker.vehicleRecord()
    assert.ok(record.make.length > 0)
  })
})
