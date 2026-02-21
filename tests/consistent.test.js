const faker = require('../src/Faker/Factory/factory')
const { regionMap, stateLgas, languageToRegions } = require('../src/Faker/Providers/geo')
const assert = require('assert').strict

describe("provider - consistentPerson()", function () {
  const expectedKeys = ['title', 'firstName', 'lastName', 'fullName', 'email', 'phone', 'address', 'state', 'lga']

  it("should return an object with all expected keys including state and lga", function () {
    const person = faker.consistentPerson()
    for (const key of expectedKeys) {
      assert.ok(key in person, `Missing key: ${key}`)
    }
  })

  it("yoruba person should have a western Nigerian state", function () {
    const westernStates = regionMap.west.states
    for (let i = 0; i < 10; i++) {
      const person = faker.consistentPerson("yoruba")
      assert.ok(
        westernStates.includes(person.state),
        `State "${person.state}" is not a western state for Yoruba`
      )
    }
  })

  it("hausa person should have a northern Nigerian state", function () {
    const northernStates = regionMap.north.states
    for (let i = 0; i < 10; i++) {
      const person = faker.consistentPerson("hausa")
      assert.ok(
        northernStates.includes(person.state),
        `State "${person.state}" is not a northern state for Hausa`
      )
    }
  })

  it("igbo person should have an eastern or southern Nigerian state", function () {
    const igboStates = [...regionMap.east.states, ...regionMap.south.states]
    for (let i = 0; i < 10; i++) {
      const person = faker.consistentPerson("igbo")
      assert.ok(
        igboStates.includes(person.state),
        `State "${person.state}" is not an eastern/southern state for Igbo`
      )
    }
  })

  it("lga should belong to the person's state", function () {
    for (let i = 0; i < 10; i++) {
      const person = faker.consistentPerson("yoruba")
      const lgasForState = stateLgas[person.state]
      assert.ok(
        lgasForState && lgasForState.includes(person.lga),
        `LGA "${person.lga}" does not belong to state "${person.state}"`
      )
    }
  })

  it("should respect gender parameter", function () {
    const person = faker.consistentPerson("hausa", "female")
    for (const key of expectedKeys) {
      assert.ok(key in person, `Missing key: ${key}`)
    }
  })

  it("should return error for invalid language", function () {
    const result = faker.consistentPerson("klingon")
    assert.equal(typeof result, 'string')
    assert.ok(result.includes('Invalid language'))
  })
})

describe("provider - consistentPeople()", function () {
  it("should return 10 people by default", function () {
    const people = faker.consistentPeople()
    assert.equal(people.length, 10)
  })

  it("should return specified number of people", function () {
    const people = faker.consistentPeople(5)
    assert.equal(people.length, 5)
  })

  it("all people should have state and lga fields", function () {
    const people = faker.consistentPeople(5, "yoruba")
    people.forEach(person => {
      assert.ok('state' in person)
      assert.ok('lga' in person)
    })
  })

  it("should respect language parameter for all people", function () {
    const westernStates = regionMap.west.states
    const people = faker.consistentPeople(5, "yoruba")
    people.forEach(person => {
      assert.ok(
        westernStates.includes(person.state),
        `State "${person.state}" is not western for Yoruba person`
      )
    })
  })
})

describe("data quality - geo mapping", function () {
  it("all states in regionMap should exist in stateLgas", function () {
    for (const region of Object.values(regionMap)) {
      for (const state of region.states) {
        assert.ok(
          state in stateLgas,
          `State "${state}" from regionMap is missing in stateLgas`
        )
      }
    }
  })

  it("all states in stateLgas should have at least 1 LGA", function () {
    for (const [state, lgas] of Object.entries(stateLgas)) {
      assert.ok(
        Array.isArray(lgas) && lgas.length > 0,
        `State "${state}" has no LGAs`
      )
    }
  })

  it("regionMap should cover all 3 languages", function () {
    assert.ok('yoruba' in languageToRegions)
    assert.ok('igbo' in languageToRegions)
    assert.ok('hausa' in languageToRegions)
  })
})
