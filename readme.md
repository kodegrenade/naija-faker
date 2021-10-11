# Naija Faker

[![npm (scoped)](https://img.shields.io/npm/v/@codegrenade/naija-faker.svg)](https://www.npmjs.com/package/@codegrenade/naija-faker)
[![npm (scoped)](https://img.shields.io/badge/npm-%40codegrenade%2Fnaija--faker-brightgreen.svg)](https://www.npmjs.com/package/@codegrenade/naija-faker)
[![npm (scoped)](https://img.shields.io/npm/l/@codegrenade/naija-faker)](https://www.npmjs.com/package/@codegrenade/naija-faker)

Naija Faker is a javascript library that generates fake typical nigerian data ranging from `name`, `address`, `phone number`, `lgas` and `states` for you.

## Installation
Install the package in your existing project

```bash
npm install @codegrenade/naija-faker
```

## Basic Usage/Examples
Import or require the the package in your project to initialize the faker generator.

```javascript
import faker from '@codegrenade/naija-faker'
```
or 

```javascript
const faker = require('@codegrenade/naija-faker)
```

Configuration for data choice (**optional**)

```javascript
// sets default language and gender for names to be generated and the local network provider for phone number
faker.config({
	language: "yoruba",
	gender: "male",
	network: "glo",
})

```
> NB: `Yoruba`, `Igbo` and `Hausa` are the only Nigerian languages supported at the moment.

Generate fake data by calling `faker` methods.

```javascript
faker.title() // Mrs.

faker.name() // Temilade Abolade

faker.address() // 45, Alhaji Kazeem Street, Kaduna

faker.phoneNumber() // 09123456634

faker.email() // temilade.abolade@ymail.com

faker.states() // array of states in Nigeria

faker.lgas() // array of states in Nigeria
```

```javascript
// call to person method
faker.person() 

// object of person details
{
  title: 'Engr.',
  firstName: 'Akintunde',
  lastName: 'Owoyele',
  fullName: 'Akintunde Owoyele',
  email: 'akintunde.owoyele@gmail.com',
  phone: '+2349093636382',
  address: '63, Ebubedike Uzoma Avenue, Awka'
}
```

> If you want a person of a particular language and gender

```javascript
faker.person("hausa", "male") // returns person details of a male from the hausa language
```


```javascript
// call to people method
faker.people()

// array of person objects
[
{
  title: 'Engr.',
  firstName: 'Akintunde',
  lastName: 'Owoyele',
  fullName: 'Akintunde Owoyele',
  email: 'akintunde.owoyele@gmail.com',
  phone: '+2349093636382',
  address: '63, Ebubedike Uzoma Avenue, Awka'
}
{
  title: 'Mr.',
  firstName: 'Olayinka',
  lastName: 'Adedayo',
  fullName: 'Olayinka Adedayo',
  email: 'olayinka.adedayo@hotmail.fr',
  phone: '+2348189416772',
  address: 'Km 9, Lanre Ayotunde Crescent, Ilorin'
}
]
```
> The `people` method returns 10 persons by default. If you want more persons to be returned by the method, use the example below.

```javascript
faker.peole(20) // returns 20 persons in the array
```

### Specifing desired parameter values
```javascript
// returns a male title
faker.title("male") 

// returns an igbo language name
faker.name("igbo") 

// returns a yoruba name for the male gender
faker.name("yoruba", "male") 

// returns a phone number from the mtn network
faker.phoneNumber("mtn")

// returns an email address from the name supplied
faker.email("Aboderin Joshua")
```

## Contributing
Please feel free to fork the package and contribute by submitting a pull request to enhance the functionlities.

## License
Naija Faker is release under the MIT License. See [`LICENSE`](LICENSE) for details.

## Feedback
If you have any feedback, please reach out to me at brhamix@gmail.com

## Author
- [@kodegrenade](https://www.github.com/kodegrenade)