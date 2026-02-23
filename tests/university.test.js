const faker = require('../src/Faker/Factory/factory')
const { universities } = require('../src/Faker/Providers/university')
const assert = require('assert').strict

describe("provider - university()", function () {
  it("should return an object with name, abbreviation, state, type", function () {
    const uni = faker.university()
    assert.ok('name' in uni)
    assert.ok('abbreviation' in uni)
    assert.ok('state' in uni)
    assert.ok('type' in uni)
  })

  it("should return a valid university from the list", function () {
    const uni = faker.university()
    const names = universities.map(u => u.name)
    assert.ok(names.includes(uni.name), `Unknown university: ${uni.name}`)
  })

  it("type should be federal, state, or private", function () {
    const uni = faker.university()
    assert.ok(
      ["federal", "state", "private"].includes(uni.type),
      `Invalid type: ${uni.type}`
    )
  })
})

describe("data quality - universities", function () {
  it("should have no duplicate university names", function () {
    const names = universities.map(u => u.name)
    const dupes = names.filter((v, i) => names.indexOf(v) !== i)
    assert.deepEqual(dupes, [])
  })

  it("should have no duplicate abbreviations", function () {
    const abbrs = universities.map(u => u.abbreviation)
    const dupes = abbrs.filter((v, i) => abbrs.indexOf(v) !== i)
    assert.deepEqual(dupes, [])
  })

  it("should have at least 10 federal universities", function () {
    const federal = universities.filter(u => u.type === "federal")
    assert.ok(federal.length >= 10)
  })

  it("all universities should have non-empty fields", function () {
    universities.forEach(uni => {
      assert.ok(uni.name.length > 0, "Empty name")
      assert.ok(uni.abbreviation.length > 0, "Empty abbreviation")
      assert.ok(uni.state.length > 0, "Empty state")
    })
  })
})
