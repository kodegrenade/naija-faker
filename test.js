const faker = require('./src/Faker/Factory/factory')

// configuration
faker.config({
    language: "yoruba",
    gender: "male",
    network: "9mobile",
});

for (let index = 0; index < 30; index++) {
    let address = faker.address()
    console.log(address)
}