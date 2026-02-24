const faker = require('../src/Faker/Factory/factory')
const assert = require('assert').strict

describe("provider - export()", function () {
  it("should return valid JSON string by default", function () {
    const result = faker.export("person", 3)
    const parsed = JSON.parse(result)
    assert.ok(Array.isArray(parsed))
    assert.equal(parsed.length, 3)
  })

  it("should default to 10 records", function () {
    const result = faker.export("person")
    const parsed = JSON.parse(result)
    assert.equal(parsed.length, 10)
  })

  it("should support csv format", function () {
    const result = faker.export("person", 3, "csv")
    const lines = result.split('\n')
    // 1 header + 3 data rows
    assert.equal(lines.length, 4)
  })

  it("csv should have header row", function () {
    const result = faker.export("person", 2, "csv")
    const header = result.split('\n')[0]
    assert.ok(header.includes('firstName'))
    assert.ok(header.includes('lastName'))
    assert.ok(header.includes('email'))
  })

  it("should support detailedPerson type", function () {
    const result = faker.export("detailedPerson", 2)
    const parsed = JSON.parse(result)
    assert.equal(parsed.length, 2)
    assert.ok('education' in parsed[0])
    assert.ok('work' in parsed[0])
    assert.ok('vehicle' in parsed[0])
  })

  it("should support consistentPerson type", function () {
    const result = faker.export("consistentPerson", 2)
    const parsed = JSON.parse(result)
    assert.equal(parsed.length, 2)
    assert.ok('state' in parsed[0])
    assert.ok('lga' in parsed[0])
  })

  it("csv for detailedPerson should flatten nested objects", function () {
    const result = faker.export("detailedPerson", 2, "csv")
    const header = result.split('\n')[0]
    assert.ok(header.includes('education.university'), `Header missing education.university: ${header}`)
    assert.ok(header.includes('work.company'), `Header missing work.company: ${header}`)
    assert.ok(header.includes('vehicle.make'), `Header missing vehicle.make: ${header}`)
  })

  it("should throw for invalid type", function () {
    assert.throws(() => faker.export("banana"), { name: 'NaijaFakerError', code: 'INVALID_TYPE' })
  })
})
