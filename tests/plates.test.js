const faker = require('../src/Faker/Factory/factory')
const { stateCodes } = require('../src/Faker/Providers/plates')
const assert = require('assert').strict

describe("provider - licensePlate()", function () {
  it("should return a string matching plate format", function () {
    const plate = faker.licensePlate()
    assert.match(plate, /^[A-Z]{2,3}-\d{3}[A-Z]{2}$/)
  })

  it("should use correct state code when state is provided", function () {
    const plate = faker.licensePlate("Lagos")
    assert.ok(plate.startsWith("LAG-"), `Expected LAG prefix, got: ${plate}`)
  })

  it("should be case-insensitive for state name", function () {
    const plate = faker.licensePlate("kano")
    assert.ok(plate.startsWith("KAN-"), `Expected KAN prefix, got: ${plate}`)
  })

  it("should return error for invalid state", function () {
    const result = faker.licensePlate("Narnia")
    assert.equal(result, 'Invalid state name.')
  })

  it("should generate different plates on multiple calls", function () {
    const plates = new Set()
    for (let i = 0; i < 20; i++) {
      plates.add(faker.licensePlate())
    }
    assert.ok(plates.size > 1, "Expected varied plates")
  })
})

describe("data quality - plates", function () {
  it("should have codes for all 37 states", function () {
    assert.equal(Object.keys(stateCodes).length, 37)
  })

  it("all codes should be 3 uppercase letters", function () {
    for (const [state, code] of Object.entries(stateCodes)) {
      assert.match(code, /^[A-Z]{3}$/, `Invalid code "${code}" for state "${state}"`)
    }
  })

  it("should have no duplicate codes", function () {
    const codes = Object.values(stateCodes)
    const dupes = codes.filter((v, i) => codes.indexOf(v) !== i)
    assert.deepEqual(dupes, [])
  })
})
