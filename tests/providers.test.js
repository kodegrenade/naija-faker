const faker = require('../src/Faker/Factory/factory')
const assert = require('assert').strict

describe("provider - name()", function () {
  it("should return a string with first and last name", function () {
    const name = faker.name()
    assert.equal(typeof name, 'string')
    const parts = name.split(' ')
    assert.ok(parts.length >= 2, `Expected at least 2 name parts, got: "${name}"`)
  })

  it("should respect language parameter", function () {
    const name = faker.name("yoruba")
    assert.equal(typeof name, 'string')
    assert.ok(name.split(' ').length >= 2)
  })

  it("should respect both language and gender parameters", function () {
    const name = faker.name("igbo", "female")
    assert.equal(typeof name, 'string')
    assert.ok(name.split(' ').length >= 2)
  })

  it("should throw for invalid language", function () {
    assert.throws(() => faker.name("klingon"), { name: 'NaijaFakerError', code: 'INVALID_LANGUAGE' })
  })
})

describe("provider - person()", function () {
  const expectedKeys = ['title', 'firstName', 'lastName', 'fullName', 'email', 'phone', 'address']

  it("should return an object with all expected keys", function () {
    const person = faker.person()
    for (const key of expectedKeys) {
      assert.ok(key in person, `Missing key: ${key}`)
      assert.equal(typeof person[key], 'string', `Key "${key}" should be a string`)
      assert.ok(person[key].length > 0, `Key "${key}" should not be empty`)
    }
  })

  it("should respect language parameter", function () {
    const person = faker.person("hausa")
    for (const key of expectedKeys) {
      assert.ok(key in person, `Missing key: ${key}`)
    }
  })

  it("should respect language and gender parameters", function () {
    const person = faker.person("yoruba", "female")
    for (const key of expectedKeys) {
      assert.ok(key in person, `Missing key: ${key}`)
    }
  })
})

describe("provider - people()", function () {
  it("should return 10 people by default", function () {
    const people = faker.people()
    assert.equal(people.length, 10)
  })

  it("should return specified number of people", function () {
    const people = faker.people(5)
    assert.equal(people.length, 5)
  })

  it("each person should have all expected keys", function () {
    const people = faker.people(3)
    const expectedKeys = ['title', 'firstName', 'lastName', 'fullName', 'email', 'phone', 'address']
    people.forEach(person => {
      for (const key of expectedKeys) {
        assert.ok(key in person, `Missing key: ${key}`)
      }
    })
  })
})

describe("provider - phoneNumber()", function () {
  it("should return a string starting with +234", function () {
    const phone = faker.phoneNumber()
    assert.equal(typeof phone, 'string')
    assert.ok(phone.startsWith('+234'), `Phone "${phone}" should start with +234`)
  })

  it("should return a valid length phone number", function () {
    const phone = faker.phoneNumber()
    // +234 (4) + remaining prefix digits (4-3=1... actually prefix replaces 0 with +234)
    // Format: +234XXXXXXXYYY where prefix is 0XXX -> +234XXX + 7 digits = 14 chars
    assert.ok(phone.length >= 13 && phone.length <= 14, `Phone "${phone}" has unexpected length ${phone.length}`)
  })

  it("should respect network parameter", function () {
    const phone = faker.phoneNumber("mtn")
    assert.ok(phone.startsWith('+234'), `Phone "${phone}" should start with +234`)
  })

  it("should throw for invalid network", function () {
    assert.throws(() => faker.phoneNumber("vodafone"), { name: 'NaijaFakerError', code: 'INVALID_NETWORK' })
  })
})

describe("provider - email()", function () {
  it("should return a valid email format", function () {
    const email = faker.email()
    assert.equal(typeof email, 'string')
    assert.ok(email.includes('@'), `Email "${email}" should contain @`)
    assert.ok(email.includes('.'), `Email "${email}" should contain a dot`)
  })

  it("should generate email from provided name", function () {
    const email = faker.email("Adebayo Ogunlesi")
    assert.equal(typeof email, 'string')
    assert.ok(email.includes('@'), `Email "${email}" should contain @`)
    assert.ok(
      email.startsWith('adebayo') || email.startsWith('adebayoogunlesi'),
      `Email "${email}" should start with the name`
    )
  })
})

describe("provider - title()", function () {
  it("should return a male title when gender is male", function () {
    const title = faker.title("male")
    assert.equal(typeof title, 'string')
    assert.ok(title.length > 0)
  })

  it("should return a female title when gender is female", function () {
    const title = faker.title("female")
    assert.equal(typeof title, 'string')
    assert.ok(title.length > 0)
  })
})

describe("provider - address()", function () {
  it("should return a non-empty string", function () {
    const address = faker.address()
    assert.equal(typeof address, 'string')
    assert.ok(address.length > 0)
  })

  it("should contain a comma separator", function () {
    const address = faker.address()
    assert.ok(address.includes(','), `Address "${address}" should contain commas`)
  })
})

describe("provider - states()", function () {
  it("should return an array of 37 states", function () {
    const result = faker.states()
    assert.ok(Array.isArray(result))
    assert.equal(result.length, 37)
  })
})

describe("provider - lgas()", function () {
  it("should return a non-empty array", function () {
    const result = faker.lgas()
    assert.ok(Array.isArray(result))
    assert.ok(result.length > 700, "Should have 700+ LGAs")
  })
})

describe("provider - config()", function () {
  afterEach(function () {
    // Reset config directly
    faker.language = undefined
    faker.gender = undefined
    faker.network = undefined
  })

  it("should set language, gender, and network", function () {
    faker.config({ language: "hausa", gender: "male", network: "mtn" })
    const name = faker.name()
    assert.equal(typeof name, 'string')
    assert.ok(name.split(' ').length >= 2)
  })

  it("should persist language choice for name generation", function () {
    faker.config({ language: "igbo" })
    for (let i = 0; i < 5; i++) {
      const name = faker.name()
      assert.equal(typeof name, 'string')
      assert.ok(name.split(' ').length >= 2)
    }
  })

  it("should throw for invalid language in config", function () {
    assert.throws(() => faker.config({ language: "klingon" }), { name: 'NaijaFakerError', code: 'INVALID_LANGUAGE' })
  })

  it("should throw for invalid gender in config", function () {
    assert.throws(() => faker.config({ gender: "other" }), { name: 'NaijaFakerError', code: 'INVALID_GENDER' })
  })

  it("should throw for non-object config", function () {
    assert.throws(() => faker.config("yoruba"), { name: 'NaijaFakerError', code: 'INVALID_PARAM' })
  })
})
