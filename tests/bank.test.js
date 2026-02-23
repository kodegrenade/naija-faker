const faker = require('../src/Faker/Factory/factory')
const { banks } = require('../src/Faker/Providers/bank')
const assert = require('assert').strict

describe("provider - bvn()", function () {
  it("should return an 11-digit string", function () {
    const bvn = faker.bvn()
    assert.equal(typeof bvn, 'string')
    assert.equal(bvn.length, 11)
  })

  it("should contain only digits", function () {
    const bvn = faker.bvn()
    assert.match(bvn, /^\d{11}$/)
  })

  it("should generate different BVNs on multiple calls", function () {
    const bvns = new Set()
    for (let i = 0; i < 20; i++) {
      bvns.add(faker.bvn())
    }
    assert.ok(bvns.size > 1, "Expected different BVNs across 20 calls")
  })
})

describe("provider - nin()", function () {
  it("should return an 11-digit string", function () {
    const nin = faker.nin()
    assert.equal(typeof nin, 'string')
    assert.equal(nin.length, 11)
  })

  it("should contain only digits", function () {
    const nin = faker.nin()
    assert.match(nin, /^\d{11}$/)
  })
})

describe("provider - bankAccount()", function () {
  it("should return an object with bankName, bankCode, accountNumber", function () {
    const account = faker.bankAccount()
    assert.equal(typeof account, 'object')
    assert.ok('bankName' in account, "Missing bankName")
    assert.ok('bankCode' in account, "Missing bankCode")
    assert.ok('accountNumber' in account, "Missing accountNumber")
  })

  it("should return a 10-digit account number", function () {
    const account = faker.bankAccount()
    assert.match(account.accountNumber, /^\d{10}$/)
  })

  it("should return a valid bank from the banks list", function () {
    const account = faker.bankAccount()
    const bankNames = banks.map(b => b.name)
    assert.ok(bankNames.includes(account.bankName), `Unknown bank: ${account.bankName}`)
  })

  it("should filter by bank name when provided", function () {
    const account = faker.bankAccount("Zenith Bank")
    assert.equal(account.bankName, "Zenith Bank")
    assert.equal(account.bankCode, "057")
  })

  it("should be case-insensitive for bank name", function () {
    const account = faker.bankAccount("access bank")
    assert.equal(account.bankName, "Access Bank")
  })

  it("should throw for invalid bank name", function () {
    assert.throws(() => faker.bankAccount("Fake Bank"), { name: 'NaijaFakerError', code: 'INVALID_BANK' })
  })
})

describe("data quality - banks", function () {
  it("should have no duplicate bank names", function () {
    const names = banks.map(b => b.name)
    const dupes = names.filter((v, i) => names.indexOf(v) !== i)
    assert.deepEqual(dupes, [])
  })

  it("should have no duplicate bank codes", function () {
    const codes = banks.map(b => b.code)
    const dupes = codes.filter((v, i) => codes.indexOf(v) !== i)
    assert.deepEqual(dupes, [])
  })

  it("all banks should have non-empty name and code", function () {
    banks.forEach(bank => {
      assert.ok(bank.name.length > 0, "Empty bank name")
      assert.ok(bank.code.length > 0, "Empty bank code")
    })
  })
})
