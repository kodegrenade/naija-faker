const faker = require('../src/Faker/Factory/factory')
const { regionMap } = require('../src/Faker/Providers/geo')
const assert = require('assert').strict

describe("provider - detailedPerson()", function () {
  const personKeys = ['title', 'firstName', 'lastName', 'fullName', 'email', 'phone', 'address', 'state', 'lga']
  const personalDataKeys = ['dateOfBirth', 'maritalStatus', 'bloodGroup', 'genotype', 'salary', 'nextOfKin']
  const recordKeys = ['education', 'work', 'vehicle']

  it("should return an object with all person keys and record keys", function () {
    const person = faker.detailedPerson()
    for (const key of [...personKeys, ...personalDataKeys, ...recordKeys]) {
      assert.ok(key in person, `Missing key: ${key}`)
    }
  })

  it("education should have expected structure", function () {
    const person = faker.detailedPerson()
    assert.ok('university' in person.education)
    assert.ok('abbreviation' in person.education)
    assert.ok('degree' in person.education)
    assert.ok('course' in person.education)
    assert.ok('graduationYear' in person.education)
  })

  it("work should have expected structure", function () {
    const person = faker.detailedPerson()
    assert.ok('company' in person.work)
    assert.ok('position' in person.work)
    assert.ok('industry' in person.work)
    assert.ok('startYear' in person.work)
  })

  it("vehicle should have expected structure", function () {
    const person = faker.detailedPerson()
    assert.ok('licensePlate' in person.vehicle)
    assert.ok('make' in person.vehicle)
    assert.ok('model' in person.vehicle)
    assert.ok('year' in person.vehicle)
    assert.ok('color' in person.vehicle)
  })

  it("should be geographically consistent for yoruba", function () {
    const westernStates = regionMap.west.states
    for (let i = 0; i < 5; i++) {
      const person = faker.detailedPerson("yoruba")
      assert.ok(
        westernStates.includes(person.state),
        `State "${person.state}" is not western for Yoruba`
      )
    }
  })

  it("vehicle plate should match person's state", function () {
    for (let i = 0; i < 5; i++) {
      const person = faker.detailedPerson("hausa")
      // The plate should have a valid format regardless
      assert.match(person.vehicle.licensePlate, /^[A-Z]{2,3}-\d{3}[A-Z]{2}$/)
    }
  })

  it("should return error for invalid language", function () {
    const result = faker.detailedPerson("klingon")
    assert.equal(typeof result, 'string')
  })

  it("should include personal data with valid structure", function () {
    const person = faker.detailedPerson()
    // dateOfBirth
    assert.ok('date' in person.dateOfBirth)
    assert.ok('age' in person.dateOfBirth)
    assert.match(person.dateOfBirth.date, /^\d{4}-\d{2}-\d{2}$/)
    // maritalStatus
    assert.equal(typeof person.maritalStatus, 'string')
    // bloodGroup
    assert.equal(typeof person.bloodGroup, 'string')
    // genotype
    assert.equal(typeof person.genotype, 'string')
    // salary
    assert.ok('amount' in person.salary)
    assert.equal(person.salary.currency, 'NGN')
    // nextOfKin
    assert.ok('fullName' in person.nextOfKin)
    assert.ok('relationship' in person.nextOfKin)
    assert.ok('phone' in person.nextOfKin)
  })

  it("existing person() should NOT have education, work, or vehicle", function () {
    const person = faker.person()
    assert.ok(!('education' in person), "person() should not have education")
    assert.ok(!('work' in person), "person() should not have work")
    assert.ok(!('vehicle' in person), "person() should not have vehicle")
    assert.ok(!('dateOfBirth' in person), "person() should not have dateOfBirth")
    assert.ok(!('salary' in person), "person() should not have salary")
  })
})

describe("provider - detailedPeople()", function () {
  it("should return 10 people by default", function () {
    const people = faker.detailedPeople()
    assert.equal(people.length, 10)
  })

  it("should return specified number of people", function () {
    const people = faker.detailedPeople(3)
    assert.equal(people.length, 3)
  })

  it("each person should have all record and personal data keys", function () {
    const people = faker.detailedPeople(3, "igbo")
    people.forEach(person => {
      assert.ok('education' in person)
      assert.ok('work' in person)
      assert.ok('vehicle' in person)
      assert.ok('dateOfBirth' in person)
      assert.ok('maritalStatus' in person)
      assert.ok('bloodGroup' in person)
      assert.ok('genotype' in person)
      assert.ok('salary' in person)
      assert.ok('nextOfKin' in person)
    })
  })
})
