const faker = require('../src/Faker/Factory/factory')
const assert = require('assert').strict

describe("provider - salary()", function () {
  it("should return an object with amount, currency, level, frequency", function () {
    const sal = faker.salary()
    assert.ok('amount' in sal)
    assert.ok('currency' in sal)
    assert.ok('level' in sal)
    assert.ok('frequency' in sal)
  })

  it("currency should be NGN", function () {
    const sal = faker.salary()
    assert.equal(sal.currency, "NGN")
  })

  it("frequency should be monthly", function () {
    const sal = faker.salary()
    assert.equal(sal.frequency, "monthly")
  })

  it("amount should be rounded to nearest 1000", function () {
    const sal = faker.salary()
    assert.equal(sal.amount % 1000, 0)
  })

  it("entry level should be within 50k-150k", function () {
    for (let i = 0; i < 10; i++) {
      const sal = faker.salary({ level: "entry" })
      assert.ok(sal.amount >= 50000, `Amount ${sal.amount} below 50k`)
      assert.ok(sal.amount <= 150000, `Amount ${sal.amount} above 150k`)
      assert.equal(sal.level, "entry")
    }
  })

  it("mid level should be within 150k-500k", function () {
    for (let i = 0; i < 10; i++) {
      const sal = faker.salary({ level: "mid" })
      assert.ok(sal.amount >= 150000)
      assert.ok(sal.amount <= 500000)
    }
  })

  it("senior level should be within 500k-1.5M", function () {
    for (let i = 0; i < 10; i++) {
      const sal = faker.salary({ level: "senior" })
      assert.ok(sal.amount >= 500000)
      assert.ok(sal.amount <= 1500000)
    }
  })

  it("executive level should be within 1.5M-5M", function () {
    for (let i = 0; i < 10; i++) {
      const sal = faker.salary({ level: "executive" })
      assert.ok(sal.amount >= 1500000)
      assert.ok(sal.amount <= 5000000)
    }
  })

  it("should return error for invalid level", function () {
    const result = faker.salary({ level: "intern" })
    assert.equal(typeof result, 'string')
    assert.ok(result.includes('Invalid level'))
  })
})
