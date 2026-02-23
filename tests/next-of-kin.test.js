const faker = require('../src/Faker/Factory/factory')
const assert = require('assert').strict

describe("provider - nextOfKin()", function () {
  const expectedKeys = ['fullName', 'relationship', 'phone', 'address']

  it("should return an object with all expected keys", function () {
    const kin = faker.nextOfKin()
    for (const key of expectedKeys) {
      assert.ok(key in kin, `Missing key: ${key}`)
    }
  })

  it("relationship should be a valid type", function () {
    const validRelationships = ["Father", "Mother", "Brother", "Sister", "Spouse", "Uncle", "Aunt", "Son", "Daughter"]
    for (let i = 0; i < 20; i++) {
      const kin = faker.nextOfKin()
      assert.ok(
        validRelationships.includes(kin.relationship),
        `Invalid relationship: ${kin.relationship}`
      )
    }
  })

  it("male kin should have male relationships", function () {
    const maleRelationships = ["Father", "Brother", "Spouse", "Uncle", "Son"]
    for (let i = 0; i < 20; i++) {
      const kin = faker.nextOfKin(null, "male")
      assert.ok(
        maleRelationships.includes(kin.relationship),
        `Expected male relationship, got: ${kin.relationship}`
      )
    }
  })

  it("female kin should have female relationships", function () {
    const femaleRelationships = ["Mother", "Sister", "Spouse", "Aunt", "Daughter"]
    for (let i = 0; i < 20; i++) {
      const kin = faker.nextOfKin(null, "female")
      assert.ok(
        femaleRelationships.includes(kin.relationship),
        `Expected female relationship, got: ${kin.relationship}`
      )
    }
  })

  it("phone should start with +234", function () {
    const kin = faker.nextOfKin()
    assert.ok(kin.phone.startsWith("+234"))
  })

  it("should respect language parameter", function () {
    const kin = faker.nextOfKin("yoruba")
    assert.ok(kin.fullName.length > 0)
  })
})
