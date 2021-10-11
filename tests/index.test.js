const faker = require('../src/Faker/Factory/factory')
const assert = require('assert').strict

describe("integration test", function () {    
    it("should be able to generate name without parameters", function () {
        let name = faker.name()
        assert.notEqual(name.length, 0)
    });

    it("should be able to generate name with parameters", function () {
        let name = faker.name("hausa", "male")
        assert.notEqual(name.length, 0)
    });

    it("should be able to generate phone number without parameters", function () {
        let phone = faker.phoneNumber()
        assert.notEqual(phone.length, 0) 
    });

    it("should be able to generate phone number with parameters", function () {
        let phone = faker.phoneNumber("mtn")
        assert.notEqual(phone.length, 0) 
    });

    it("should be able to generate states data", function () {
        let states = faker.states()
        assert.notEqual(states.length, 0) 
    });

    it("should be able to generate lgas data", function () {
        let lgas = faker.lgas()
        assert.notEqual(lgas.length, 0)
    });

    it("should be able to generate title without parameters", function () {
        let title = faker.title();
        assert.notEqual(title.length, 0) 
    });

    it("should be able to generate title with parameters", function () {
        let title = faker.title("male");
        assert.notEqual(title.length, 0) 
    });

    it("should be able to generate person data without parameters", function () {
        let person = faker.person()
        assert.notEqual(person.length, 0)
    });

    it("should be able to generate person of a tribe", function () {
        let person = faker.person("yoruba")
        assert.notEqual(person.length, 0)
    });

    it("should be able to generate person of a tribe and gender", function () {
        let person = faker.person("yoruba", "male")
        assert.notEqual(person.length, 0)
    });

    it("should be able to generate people without parameters", function () {
        let people = faker.people()
        assert.notEqual(people.length, 0)
    });

    it("should be able to generate people with parameters", function () {
        let people = faker.people(20)
        assert.notEqual(people.length, 0)
    });

    it("should be able to generate email address", function () {
        let email = faker.email()
        assert.notEqual(email.length, 0)
    });

    it("should be able to generate email from name", function () {
        let email = faker.email("Temitope Ayotunde")
        assert.notEqual(email.length, 0)
    });

    it("should be able to generate address", function () {
        let address = faker.address()
        assert.notEqual(address.length, 0)
    })
});