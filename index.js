/**
 * Naija Faker
 * Author: Temitope Ayotunde [@codegrenade]
 * License: MIT
 */
const faker = require('./src/Faker/faker')
for (let index = 0; index < 5; index++) {
    // faker.config({ language: "yoruba", gender: "male" });
    console.log(faker.people(6))
}
// module.exports = faker