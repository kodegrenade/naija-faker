/**
 * Name Providers
 */
const { hausaMale, hausaFemale } = require('../Providers/names/Hausa')
const { igboMale, igboFemale } = require('../Providers/names/Igbo')
const { yorubaMale, yorubaFemale } =  require('../Providers/names/Yoruba')

/**
 * Location Providers
 */
const states = require('../Providers/locations/States')
const lgas = require('../Providers/locations/Lgas')

/**
 * Number Provider
 */
const { networks, prefix } = require('../Providers/numbers/Numbers')

/**
 * Address Provider
 */
const { types, locale } = require('../Providers/address/Address')

class Factory
{
	/**
	 * Pick Name
	 * 
	 * @param {string} language 
	 * @param {string} gender 
	 * @returns {string}
	 */
	static pickName(language, gender) {
		const languageOptions  = [ "yoruba", "hausa", "igbo",]
		const genderOptions = ["male", "female"]

		let languagePicked = (language) 
			? language : languageOptions[Math.floor(Math.random() * languageOptions.length)]
		let genderPicked = (gender) 
			? gender : genderOptions[Math.floor(Math.random() * genderOptions.length)]

		let firstName;
		let lastName;

		switch (languagePicked) {
			case "yoruba":
				if (genderPicked == "male") {
					firstName = yorubaMale[Math.floor(Math.random() * yorubaMale.length)]
					lastName = yorubaMale[Math.floor(Math.random() * yorubaMale.length)]
					return `${firstName} ${lastName}`
				} else {
					firstName = yorubaFemale[Math.floor(Math.random() * yorubaFemale.length)]
					lastName = yorubaMale[Math.floor(Math.random() * yorubaMale.length)]
					return `${firstName} ${lastName}`
				}
				break;

			case "hausa":
				if (genderPicked == "male") {
					firstName = hausaMale[Math.floor(Math.random() * hausaMale.length)]
					lastName = hausaMale[Math.floor(Math.random() * hausaMale.length)]
					return `${firstName} ${lastName}`
				} else {
					firstName = hausaFemale[Math.floor(Math.random() * hausaFemale.length)]
					lastName = hausaMale[Math.floor(Math.random() * hausaMale.length)]
					return `${firstName} ${lastName}`
				}
				break;

			case "igbo":
				if (genderPicked == "male") {
					firstName = igboMale[Math.floor(Math.random() * igboMale.length)]
					lastName = igboMale[Math.floor(Math.random() * igboMale.length)]
					return `${firstName} ${lastName}`
				} else {
					firstName = igboFemale[Math.floor(Math.random() * igboFemale.length)]
					lastName = igboMale[Math.floor(Math.random() * igboMale.length)]
					return `${firstName} ${lastName}`
				}
				break;
		
			default:
				return "no name selected"
				break;
		}
	}

	/**
	 * Pick Person
	 * 
	 * @returns {object}
	 */
	static pickPerson() {
		return {
			name: this.pickName(),
			phone: this.pickPhoneNumber(),
			address: this.pickAddress()
		}
	}

	/**
	 * Pluck People
	 * 
	 * @param {integer} number
	 * @returns {array}
	 */
	static pluckPeople(number) {
		let count = (number) ? number : 1
		let list = []
		for (let index = 0; index < count; index++) {
			const data = this.pickPerson();
			list.push(data)
		}
		return list;
	}

	/**
	 * Pick Title
	 * 
	 * @returns {string}
	 */
	static pickTitle() {

	}

	/**
	 * Pick Address
	 * 
	 * @returns {string}
	 */
	static pickAddress() {
		const addressType = types[Math.floor(Math.random() * types.length)];
		const addressLocale = locale[Math.floor(Math.random() * locale.length)];
		const number = Math.floor((Math.random() * 200) + 1)
		const fullAddress = `${number}, ${this.pickName(addressLocale)} ${addressType}`
		return fullAddress
	}

	/**
	 * Pick Phone Number
	 * 
	 * @param {string} network
	 * @returns {string}
	 */
	static pickPhoneNumber(network) {
		if (network && typeof network !== 'string' && typeof network !== undefined) {
            return 'String value expected for network.'
        }
		
		let wordCase = (network) 
			? `${network.charAt(0).toUpperCase()}${network.slice(1)}` : networks[Math.floor(Math.random() * networks.length)]
		let index = networks.indexOf(wordCase)
		if(index < 0) {
			return 'Invalid network type.'
		}
		
		let selected = networks[index]
		let prefixOptions = prefix[0][selected]
		let selectedPrefix = prefixOptions[Math.floor(Math.random() * prefixOptions.length)]
		const number = Math.floor((Math.random() * 10000000) + 1)
		return `${selectedPrefix}${number}`
	}
}

module.exports = Factory