const faker = require('../src/Faker/Factory/factory')
const { companySuffixes, industries } = require('../src/Faker/Providers/company')
const assert = require('assert').strict

describe("provider - company()", function () {
  it("should return an object with name, rcNumber, industry", function () {
    const comp = faker.company()
    assert.equal(typeof comp, 'object')
    assert.ok('name' in comp, "Missing name")
    assert.ok('rcNumber' in comp, "Missing rcNumber")
    assert.ok('industry' in comp, "Missing industry")
  })

  it("name should be a non-empty string", function () {
    const comp = faker.company()
    assert.equal(typeof comp.name, 'string')
    assert.ok(comp.name.length > 0)
  })

  it("rcNumber should match RC-{digits} format", function () {
    const comp = faker.company()
    assert.match(comp.rcNumber, /^RC-\d{6,7}$/)
  })

  it("industry should be from the industries list", function () {
    const comp = faker.company()
    assert.ok(industries.includes(comp.industry), `Unknown industry: ${comp.industry}`)
  })

  it("should generate different companies on multiple calls", function () {
    const names = new Set()
    for (let i = 0; i < 20; i++) {
      names.add(faker.company().name)
    }
    assert.ok(names.size > 1, "Expected varied company names")
  })
})

describe("data quality - companies", function () {
  it("should have no duplicate industries", function () {
    const dupes = industries.filter((v, i) => industries.indexOf(v) !== i)
    assert.deepEqual(dupes, [])
  })

  it("should have no duplicate suffixes", function () {
    const dupes = companySuffixes.filter((v, i) => companySuffixes.indexOf(v) !== i)
    assert.deepEqual(dupes, [])
  })
})
