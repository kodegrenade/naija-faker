const faker = require('../src/Faker/Factory/factory')
const assert = require('assert').strict

describe("provider - registerProvider() + generate()", function () {
  afterEach(function () {
    // Clean up custom providers between tests
    faker._customProviders = {}
  })

  it("should register and generate from a custom provider", function () {
    faker.registerProvider('religion', (f) => {
      const religions = ['Christianity', 'Islam', 'Traditional']
      return religions[Math.floor(f._random() * religions.length)]
    })

    const result = faker.generate('religion')
    assert.ok(['Christianity', 'Islam', 'Traditional'].includes(result))
  })

  it("should be case-insensitive for provider names", function () {
    faker.registerProvider('LocalFood', () => 'Jollof Rice')
    assert.equal(faker.generate('localfood'), 'Jollof Rice')
    assert.equal(faker.generate('LOCALFOOD'), 'Jollof Rice')
  })

  it("should support complex return types", function () {
    faker.registerProvider('vehicle_insurance', (f) => ({
      provider: 'AXA Mansard',
      policyNumber: `POL-${Math.floor(f._random() * 900000 + 100000)}`,
      type: 'comprehensive',
    }))

    const insurance = faker.generate('vehicle_insurance')
    assert.ok('provider' in insurance)
    assert.ok('policyNumber' in insurance)
    assert.ok(insurance.policyNumber.startsWith('POL-'))
  })

  it("should throw for unregistered provider", function () {
    assert.throws(
      () => faker.generate('unknown'),
      { name: 'NaijaFakerError', code: 'INVALID_PARAM' }
    )
  })

  it("should throw when overriding built-in method", function () {
    assert.throws(
      () => faker.registerProvider('name', () => 'test'),
      { name: 'NaijaFakerError', code: 'INVALID_PARAM' }
    )
  })

  it("should throw for invalid handler", function () {
    assert.throws(
      () => faker.registerProvider('test', 'not-a-function'),
      { name: 'NaijaFakerError', code: 'INVALID_PARAM' }
    )
  })

  it("should throw for empty provider name", function () {
    assert.throws(
      () => faker.registerProvider('', () => 'test'),
      { name: 'NaijaFakerError', code: 'INVALID_PARAM' }
    )
  })
})

describe("provider - listProviders()", function () {
  afterEach(function () {
    faker._customProviders = {}
  })

  it("should return empty array when no providers registered", function () {
    assert.deepEqual(faker.listProviders(), [])
  })

  it("should list all registered providers", function () {
    faker.registerProvider('religion', () => 'Christianity')
    faker.registerProvider('localFood', () => 'Jollof')
    const providers = faker.listProviders()
    assert.ok(providers.includes('religion'))
    assert.ok(providers.includes('localfood'))
    assert.equal(providers.length, 2)
  })
})
