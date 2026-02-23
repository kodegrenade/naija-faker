# Naija Faker

[![npm (scoped)](https://img.shields.io/npm/v/@codegrenade/naija-faker.svg)](https://www.npmjs.com/package/@codegrenade/naija-faker)
[![npm (scoped)](https://img.shields.io/badge/npm-%40codegrenade%2Fnaija--faker-brightgreen.svg)](https://www.npmjs.com/package/@codegrenade/naija-faker)
[![npm (scoped)](https://img.shields.io/npm/l/@codegrenade/naija-faker)](https://www.npmjs.com/package/@codegrenade/naija-faker)

Naija Faker is a javascript library that generates fake typical Nigerian data ranging from `name`, `address`, `phone number`, `lgas` and `states` for you. It supports **Yoruba**, **Igbo**, and **Hausa** ethnic groups with culturally authentic data.

## Features
- 🇳🇬 Authentic Nigerian names (Yoruba, Igbo, Hausa)
- 📱 Phone numbers for all 4 major networks (MTN, Glo, Airtel, 9mobile)
- 📍 Addresses across all Nigerian regions
- 🏛️ All 37 states (36 states + FCT)
- 🏘️ 774 Local Government Areas
- 👑 Nigerian-specific titles (Chief, Alhaji, Oba, Emir, Igwe, and more)
- 🏦 BVN, NIN, and bank account generation (26 Nigerian banks)
- 🚗 License plates, companies, and 42 Nigerian universities
- 🎯 Geographically consistent identities (name + state + LGA all match)
- 💼 Detailed persons with education, work, and vehicle records
- 🩸 Date of birth, blood group, genotype, marital status
- 💰 Salary generation with level-based income bands
- 👨‍👩‍👧 Next of kin generation
- 📦 Bulk export to JSON or CSV
- 🎲 Seeded deterministic generation for reproducible tests
- 📝 TypeScript support with full IntelliSense
- 🤖 AI/LLM integration via `schema.json` and `describe()` method

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
const faker = require('@codegrenade/naija-faker')
```

Configuration for data choice (**optional**)

> sets default language and gender for names to be generated and the local network provider for phone number
```javascript
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

faker.states() // array of states in Nigeria (36 states + FCT)

faker.lgas() // array of local government areas in Nigeria

// returns a bank account details
faker.bankAccount()
// → { bankName: 'Zenith Bank', bankCode: '057', accountNumber: '1234567890' }

// returns a BVN (11-digit Bank Verification Number)
faker.bvn() // → '22312345678'

// returns a NIN (11-digit National Identification Number)
faker.nin() // → '98765432101'
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
// returns person details of a male from the hausa language
faker.person("hausa", "male") 
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
faker.people(20) // returns 20 persons in the array
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

// returns a bank account for a specific bank
faker.bankAccount("Access Bank")
```

## Seeded Generation

Use `faker.seed()` for reproducible output — perfect for snapshot testing and consistent test fixtures.

```javascript
faker.seed(12345)
faker.name("yoruba", "male") // Always returns the same name
faker.person("igbo")         // Always returns the same person

faker.seed(12345)            // Reset to same seed
faker.name("yoruba", "male") // Identical output as above

faker.seed()                 // Reset to non-deterministic mode
```

## Consistent Identities

Generate persons where name ethnicity, address, state, and LGA are all geographically coherent.

```javascript
faker.consistentPerson("yoruba", "male")

// → All fields match: Yoruba name, western address, western state, matching LGA
{
  title: 'Chief',
  firstName: 'Adebayo',
  lastName: 'Ogunlesi',
  fullName: 'Adebayo Ogunlesi',
  email: 'adebayo.ogunlesi@gmail.com',
  phone: '+2348031234567',
  address: 'Plot 45, Oluwaseun Adedayo Street, Ibadan',
  state: 'Oyo',
  lga: 'Ibadan North'
}
```

```javascript
// Generate multiple consistent people
faker.consistentPeople(5, "hausa", "female")
// → 5 Hausa female persons, all with northern states and matching LGAs
```

## License Plates, Companies & Universities

```javascript
// Generate a Nigerian license plate
faker.licensePlate() // → 'LAG-234XY'
faker.licensePlate("Kano") // → 'KAN-891AB'

// Generate a Nigerian company
faker.company()
// → { name: 'Pan-African Solutions Ltd', rcNumber: 'RC-1234567', industry: 'Technology' }

// Generate a Nigerian university
faker.university()
// → { name: 'University of Lagos', abbreviation: 'UNILAG', state: 'Lagos', type: 'federal' }
```

## Records

```javascript
faker.educationRecord("yoruba")
// → { university: 'University of Lagos', abbreviation: 'UNILAG', degree: 'B.Sc', course: 'Computer Science', graduationYear: 2019 }

faker.workRecord()
// → { company: 'Pan-African Solutions Ltd', position: 'Senior Analyst', industry: 'Technology', startYear: 2019 }

faker.vehicleRecord("Lagos")
// → { licensePlate: 'LAG-234XY', make: 'Toyota', model: 'Corolla', year: 2021, color: 'Silver' }
```

## Detailed Person

Generate a rich identity with education, work, and vehicle records — all geographically coherent.

```javascript
faker.detailedPerson("yoruba", "male")

{
  title: 'Chief',
  firstName: 'Adebayo',
  lastName: 'Ogunlesi',
  fullName: 'Adebayo Ogunlesi',
  email: 'adebayo.ogunlesi@gmail.com',
  phone: '+2348031234567',
  address: 'Plot 45, Oluwaseun Adedayo Street, Ibadan',
  state: 'Oyo',
  lga: 'Ibadan North',
  dateOfBirth: { date: '1990-03-15', age: 35 },
  maritalStatus: 'Married',
  bloodGroup: 'O+',
  genotype: 'AA',
  salary: {
    amount: 450000,
    currency: 'NGN',
    level: 'mid',
    frequency: 'monthly'
  },
  nextOfKin: {
    fullName: 'Folake Adeyemi',
    relationship: 'Spouse',
    phone: '+2348091234567',
    address: '12, Akinola Crescent, Ibadan'
  },
  education: {
    university: 'University of Ibadan',
    abbreviation: 'UI',
    degree: 'B.Sc',
    course: 'Computer Science',
    graduationYear: 2019
  },
  work: {
    company: 'Pan-African Solutions Ltd',
    position: 'Software Engineer',
    industry: 'Technology',
    startYear: 2020
  },
  vehicle: {
    licensePlate: 'OYO-234XY',
    make: 'Toyota',
    model: 'Corolla',
    year: 2021,
    color: 'Silver'
  }
}
```

```javascript
// Generate multiple detailed people
faker.detailedPeople(5, "igbo", "female")
```

## Personal Data

```javascript
faker.dateOfBirth() // → { date: '1990-03-15', age: 35 }
faker.dateOfBirth({ minAge: 25, maxAge: 40 }) // custom range

faker.maritalStatus() // → 'Married'
faker.bloodGroup() // → 'O+'
faker.genotype() // → 'AS'
```

## Salary

```javascript
faker.salary()
// → { amount: 450000, currency: 'NGN', level: 'mid', frequency: 'monthly' }

faker.salary({ level: 'executive' })
// → { amount: 3500000, currency: 'NGN', level: 'executive', frequency: 'monthly' }
```

## Next of Kin

```javascript
faker.nextOfKin("yoruba", "male")
// → { fullName: 'Adebayo Ogunlesi', relationship: 'Brother', phone: '+234...', address: '...' }
```

## Bulk Export

```javascript
// Export as JSON string
faker.export("person", 5) // 5 persons as JSON

// Export as CSV
faker.export("person", 5, "csv")
// → title,firstName,lastName,fullName,email,phone,address\n...

// Export detailed persons (nested fields are flattened in CSV)
faker.export("detailedPerson", 10, "csv")
```

## TypeScript Support

Naija Faker ships with TypeScript declarations out of the box. You get full IntelliSense and type checking with no additional setup.

```typescript
import faker from '@codegrenade/naija-faker'

const person = faker.person("yoruba", "female")
// Full autocomplete for person.title, person.firstName, etc.
```

## AI/LLM Integration

Naija Faker is designed to work seamlessly with AI agents and LLM-powered development tools.

### Runtime Introspection

Use the `describe()` method to discover available methods at runtime:

```javascript
// Get schema for all methods
faker.describe()

// Get schema for a specific method
faker.describe('person')
// Returns: { name: 'person', description: '...', parameters: [...], returns: {...}, example: {...} }
```

### Schema File

A `schema.json` file is included in the package, providing a full JSON Schema description of the API. AI agents can use this for tool discovery:

```javascript
const schema = require('@codegrenade/naija-faker/schema.json')
```

## Contributing
Please feel free to fork the package and contribute by submitting a pull request to enhance the functionlities.

## License
Naija Faker is release under the MIT License. See [`LICENSE`](LICENSE) for details.

## Feedback
If you have any feedback, please reach out to me at brhamix@gmail.com

## Author
- [@kodegrenade](https://www.github.com/kodegrenade)
