const faker = require('../src/Faker/Factory/factory')
const assert = require('assert').strict

describe("provider - seed()", function () {
  afterEach(function () {
    // Always reset to non-deterministic after each test
    faker.seed()
  })

  it("same seed should produce same name", function () {
    faker.seed(12345)
    const name1 = faker.name("yoruba", "male")

    faker.seed(12345)
    const name2 = faker.name("yoruba", "male")

    assert.equal(name1, name2)
  })

  it("same seed should produce same person", function () {
    faker.seed(99999)
    const person1 = faker.person("igbo", "female")

    faker.seed(99999)
    const person2 = faker.person("igbo", "female")

    assert.deepEqual(person1, person2)
  })

  it("same seed should produce same BVN", function () {
    faker.seed(42)
    const bvn1 = faker.bvn()

    faker.seed(42)
    const bvn2 = faker.bvn()

    assert.equal(bvn1, bvn2)
  })

  it("same seed should produce same phone number", function () {
    faker.seed(777)
    const phone1 = faker.phoneNumber("mtn")

    faker.seed(777)
    const phone2 = faker.phoneNumber("mtn")

    assert.equal(phone1, phone2)
  })

  it("same seed should produce same bank account", function () {
    faker.seed(555)
    const account1 = faker.bankAccount()

    faker.seed(555)
    const account2 = faker.bankAccount()

    assert.deepEqual(account1, account2)
  })

  it("different seeds should produce different output", function () {
    faker.seed(111)
    const name1 = faker.name("yoruba", "male")

    faker.seed(222)
    const name2 = faker.name("yoruba", "male")

    assert.notEqual(name1, name2)
  })

  it("resetting seed should return to non-deterministic mode", function () {
    faker.seed(12345)
    faker.seed() // reset

    // Generate multiple names — they should vary (with very high probability)
    const names = new Set()
    for (let i = 0; i < 20; i++) {
      names.add(faker.name())
    }
    assert.ok(names.size > 1, "Expected varied output after seed reset")
  })

  it("seed should produce deterministic sequence across multiple calls", function () {
    faker.seed(42)
    const seq1 = [faker.name(), faker.name(), faker.name()]

    faker.seed(42)
    const seq2 = [faker.name(), faker.name(), faker.name()]

    assert.deepEqual(seq1, seq2)
  })
})
