# Naija Faker
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
faker.config({
	language: "yoruba",
	gender: "male",
})

NB: `yoruba`, `igbo` and `hausa` are the only languages supported at the moment.
```

Generate fake data by calling methods

```javascript
faker.name() // Temilade Abolade
faker.address() // 45, Alhaji Kazeem Street, Kaduna
faker.phoneNumber() // 09123456634
```

```javascript
// call to person method
faker.person() 

// object of person details
{
  name: "Abosede Oyedele", 
  phone: "08123456789", 
  address: "11, Odewale Avenue, Kwara"
}
```

```javascript
// call to people method
faker.people()

// array of person objects
[
	{
		name: "Temitayo Odewale",
		phone: "+2348012895678",
		address: "15, Olamilekan Avenue"
	},
	{
		name: "Abikoye Oluwaseun",
		phone: "+2347012345678",
		address: "15, Olamilekan Avenue"
	},
	{
		name : "Ayodele Babatunde",
		phone: "+2349023456734",
		address: "",
	}
]
```

## Contributing
Please feel free to fork the package and contribute by submitting a pull request to enhance the functionlities.

## License
Naija Faker is release under the MIT License. See [`LICENSE`](LICENSE) for details.

## Feedback
If you have any feedback, please reach out to me at brhamix@gmail.com

## Author
- [@kodegrenade](https://www.github.com/kodegrenade)