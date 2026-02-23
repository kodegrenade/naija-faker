/**
 * Name Providers
 */
const { hausaMale, hausaFemale } = require('../Providers/names/Hausa')
const { igboMale, igboFemale } = require('../Providers/names/Igbo')
const { yorubaMale, yorubaFemale } = require('../Providers/names/Yoruba')

/**
 * Location Providers
 */
const states = require('../Providers/locations/States')
const lgas = require('../Providers/locations/Lgas')

/**
 * Number Provider
 */
const { networks, prefix } = require('../Providers/numbers')

/**
 * Address Provider
 */
const { types, suffixes, locale, places, names } = require('../Providers/address')

/**
 * Title Provider
 */
const { maleTitles, femaleTitles } = require('../Providers/title')

/**
 * Email Provider
 */
const { extensions } = require('../Providers/email')

/**
 * Bank Provider
 */
const { banks } = require('../Providers/bank')

/**
 * Geo Provider
 */
const { regionMap, stateLgas, languageToRegions } = require('../Providers/geo')

/**
 * Plates Provider
 */
const { stateCodes } = require('../Providers/plates')

/**
 * Company Provider
 */
const { companySuffixes, companyPrefixes, companyNouns, industries } = require('../Providers/company')

/**
 * University Provider
 */
const { universities } = require('../Providers/university')

/**
 * Vehicle Provider
 */
const { vehicleMakes, vehicleColors } = require('../Providers/vehicles')

/**
 * Jobs Provider
 */
const { positions, degrees, courses } = require('../Providers/jobs')

class Factory {
  /**
   * Internal PRNG state
   * @private
   */
  static _prng = null

  /**
   * Set a seed for deterministic output.
   * Call without arguments to reset to non-deterministic mode.
   * 
   * @param {number} value - Seed value (optional)
   */
  static seed(value) {
    if (value === undefined || value === null) {
      this._prng = null
      return
    }
    let s = value | 0
    this._prng = function () {
      s |= 0; s = s + 0x6D2B79F5 | 0
      let t = Math.imul(s ^ s >>> 15, 1 | s)
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
      return ((t ^ t >>> 14) >>> 0) / 4294967296
    }
  }

  /**
   * Internal random number generator.
   * Uses seeded PRNG if set, otherwise Math.random().
   * 
   * @returns {number} Random float between 0 (inclusive) and 1 (exclusive)
   * @private
   */
  static _random() {
    return this._prng ? this._prng() : Math.random()
  }

  /**
   * Faker Configuration
   * @param {Object} options
   */
  static config(options) {
    if (typeof options === 'object' && typeof options !== undefined) {
      this.language = (options.language) ? options.language.trim() : options.language
      this.gender = (options.gender) ? options.gender.trim() : options.gender
      this.network = (options.network) ? options.network.trim() : options.network
    }
  }

  /**
   * Generates fake name
   * 
   * @param {string} language 
   * @param {string} gender 
   * @returns {string}
   */
  static name(language, gender) {
    const languageOptions = ["yoruba", "hausa", "igbo",]
    const genderOptions = ["male", "female"]

    let languagePicked = (language)
      ? language.trim() : (this.language ? this.language : languageOptions[Math.floor(this._random() * languageOptions.length)])
    let genderPicked = (gender)
      ? gender.trim() : (this.gender ? this.gender : genderOptions[Math.floor(this._random() * genderOptions.length)])

    let firstName;
    let lastName;

    switch (languagePicked) {
      case "yoruba":
        if (genderPicked == "male") {
          firstName = yorubaMale[Math.floor(this._random() * yorubaMale.length)]
          lastName = yorubaMale[Math.floor(this._random() * yorubaMale.length)]
          return `${firstName} ${lastName}`
        } else {
          firstName = yorubaFemale[Math.floor(this._random() * yorubaFemale.length)]
          lastName = yorubaMale[Math.floor(this._random() * yorubaMale.length)]
          return `${firstName} ${lastName}`
        }
        break;

      case "hausa":
        if (genderPicked == "male") {
          firstName = hausaMale[Math.floor(this._random() * hausaMale.length)]
          lastName = hausaMale[Math.floor(this._random() * hausaMale.length)]
          return `${firstName} ${lastName}`
        } else {
          firstName = hausaFemale[Math.floor(this._random() * hausaFemale.length)]
          lastName = hausaMale[Math.floor(this._random() * hausaMale.length)]
          return `${firstName} ${lastName}`
        }
        break;

      case "igbo":
        if (genderPicked == "male") {
          firstName = igboMale[Math.floor(this._random() * igboMale.length)]
          lastName = igboMale[Math.floor(this._random() * igboMale.length)]
          return `${firstName} ${lastName}`
        } else {
          firstName = igboFemale[Math.floor(this._random() * igboFemale.length)]
          lastName = igboMale[Math.floor(this._random() * igboMale.length)]
          return `${firstName} ${lastName}`
        }
        break;

      default:
        return "no name selected"
        break;
    }
  }

  /**
   * Generates fake person data
   * 
   * @returns {object} person
   */
  static person(language, gender) {
    let fullName = this.name(language || null, gender || null)
    let splitName = fullName.split(" ")
    return {
      title: this.title(gender),
      firstName: splitName[0],
      lastName: splitName[1],
      fullName: fullName,
      email: this.email(fullName),
      phone: this.phoneNumber(),
      address: this.address(),
    }
  }

  /**
   * Generates fake people data
   * 
   * @param {integer} number
   * @returns {array} people
   */
  static people(number) {
    let count = (number) ? number : 10
    let list = []
    for (let index = 0; index < count; index++) {
      const data = this.person();
      list.push(data)
    }
    return list;
  }

  /**
   * Generates fake title
   * 
   * @returns {string} title
   */
  static title(gender) {
    const genders = ["male", "female"]
    let selectedGender = (gender)
      ? gender.trim() : (this.gender ? this.gender
        : genders[Math.floor(this._random() * genders.length)])

    selectedGender = selectedGender.toLowerCase();
    let title;

    switch (selectedGender) {
      case "male":
        title = maleTitles[Math.floor(this._random() * maleTitles.length)]
        return title
        break;
      case "female":
        title = femaleTitles[Math.floor(this._random() * femaleTitles.length)]
        return title
        break;
      default:
        return "no title selected"
        break;
    }
  }

  /**
   * Generates fake email address
   * 
   * @param {string} name
   * @returns {string} email
   */
  static email(name) {
    let value = (name) ? name.trim() : this.name()
    const domain = extensions[Math.floor(this._random() * extensions.length)]
    const separators = [".", ""];
    const separator = separators[Math.floor(this._random() * separators.length)]
    value = value.toLowerCase().replace(/[^A-Z0-9]+/ig, separator)
    const address = `${value}${domain}`
    return address
  }

  /**
   * Generates fake address
   * 
   * @returns {string} address
   */
  static address() {
    const addressType = types[Math.floor(this._random() * types.length)];
    const addressLocale = locale[Math.floor(this._random() * locale.length)];
    const placeList = places[0][addressLocale]
    const addressName = (addressLocale) == "east"
      ? this.name("igbo") : (addressLocale == "west"
        ? this.name("yoruba") : (addressLocale == "south"
          ? this.name("igbo") : this.name("hausa")))
    const number = Math.floor((this._random() * 200) + 1)
    const addressSuffix = suffixes[Math.floor(this._random() * suffixes.length)]
    const addressPlace = placeList[Math.floor(this._random() * placeList.length)]
    const fullAddress = `${addressSuffix} ${number}, ${addressName} ${addressType}, ${addressPlace}`
    return fullAddress.trim()
  }

  /**
   * Generates fake phone number
   * 
   * @param {string} network
   * @returns {string} phone number
   */
  static phoneNumber(network) {
    if (network && typeof network !== 'string' && typeof network !== undefined) {
      return 'String value expected for network.'
    }

    let wordCase = (network)
      ? `${network.charAt(0).toUpperCase()}${network.slice(1).toLowerCase()}`
      : (this.network ? `${this.network.charAt(0).toUpperCase()}${this.network.slice(1).toLowerCase()}`
        : networks[Math.floor(this._random() * networks.length)])
    let index = networks.indexOf(wordCase)

    if (index < 0) {
      return 'Invalid network type.'
    }

    let selected = networks[index]
    let prefixOptions = prefix[0][selected]
    let selectedPrefix = prefixOptions[Math.floor(this._random() * prefixOptions.length)]
    const number = Math.floor(1000000 + this._random() * 9000000)
    selectedPrefix = selectedPrefix.replace(/^0+/, '+234')
    return `${selectedPrefix}${number}`
  }

  /**
   * Generate nigerian states
   * 
   * @returns {array} states
   */
  static states() {
    return states["states"]
  }

  /**
   * Generates nigerian local governments
   * 
   * @returns {array} lgas
   */
  static lgas() {
    return lgas["lgas"]
  }

  /**
   * Generates a fake BVN (Bank Verification Number)
   * 
   * @returns {string} 11-digit BVN
   */
  static bvn() {
    let bvn = ''
    for (let i = 0; i < 11; i++) {
      bvn += Math.floor(this._random() * 10)
    }
    return bvn
  }

  /**
   * Generates a fake NIN (National Identification Number)
   * 
   * @returns {string} 11-digit NIN
   */
  static nin() {
    let nin = ''
    for (let i = 0; i < 11; i++) {
      nin += Math.floor(this._random() * 10)
    }
    return nin
  }

  /**
   * Generates a fake Nigerian bank account
   * 
   * @param {string} bankName - Optional specific bank name
   * @returns {object} { bankName, bankCode, accountNumber }
   */
  static bankAccount(bankName) {
    let bank
    if (bankName) {
      bank = banks.find(b => b.name.toLowerCase() === bankName.toLowerCase())
      if (!bank) {
        return 'Invalid bank name.'
      }
    } else {
      bank = banks[Math.floor(this._random() * banks.length)]
    }

    let accountNumber = ''
    for (let i = 0; i < 10; i++) {
      accountNumber += Math.floor(this._random() * 10)
    }

    return {
      bankName: bank.name,
      bankCode: bank.code,
      accountNumber: accountNumber,
    }
  }

  /**
   * Generates a geographically consistent fake Nigerian person.
   * All fields (name, title, address, state, lga) are coherent.
   * 
   * @param {string} language - "yoruba", "igbo", or "hausa" (optional, random if not set)
   * @param {string} gender - "male" or "female" (optional, random if not set)
   * @returns {object} Consistent person with state and lga fields
   */
  static consistentPerson(language, gender) {
    const languageOptions = ["yoruba", "hausa", "igbo"]
    const genderOptions = ["male", "female"]

    let lang = (language)
      ? language.trim().toLowerCase()
      : (this.language ? this.language
        : languageOptions[Math.floor(this._random() * languageOptions.length)])
    let gen = (gender)
      ? gender.trim().toLowerCase()
      : (this.gender ? this.gender
        : genderOptions[Math.floor(this._random() * genderOptions.length)])

    // Get matching regions for this language
    const regions = languageToRegions[lang]
    if (!regions) {
      return 'Invalid language. Use "yoruba", "igbo", or "hausa".'
    }

    const region = regions[Math.floor(this._random() * regions.length)]
    const regionData = regionMap[region]
    const state = regionData.states[Math.floor(this._random() * regionData.states.length)]
    const lgaList = stateLgas[state]
    const lga = lgaList
      ? lgaList[Math.floor(this._random() * lgaList.length)]
      : null

    // Get address from the matching region
    const addressPlaces = places[0][region]
    const addressType = types[Math.floor(this._random() * types.length)]
    const addressSuffix = suffixes[Math.floor(this._random() * suffixes.length)]
    const addressNumber = Math.floor((this._random() * 200) + 1)
    const addressName = this.name(lang)
    const addressPlace = addressPlaces[Math.floor(this._random() * addressPlaces.length)]
    const fullAddress = `${addressSuffix} ${addressNumber}, ${addressName} ${addressType}, ${addressPlace}`.trim()

    const fullName = this.name(lang, gen)
    const splitName = fullName.split(' ')

    return {
      title: this.title(gen),
      firstName: splitName[0],
      lastName: splitName[1],
      fullName: fullName,
      email: this.email(fullName),
      phone: this.phoneNumber(),
      address: fullAddress,
      state: state,
      lga: lga,
    }
  }

  /**
   * Generates multiple geographically consistent fake Nigerian persons.
   * 
   * @param {number} number - Number of people (default: 10)
   * @param {string} language - "yoruba", "igbo", or "hausa" (optional)
   * @param {string} gender - "male" or "female" (optional)
   * @returns {array} Array of consistent person objects
   */
  static consistentPeople(number, language, gender) {
    let count = (number) ? number : 10
    let list = []
    for (let index = 0; index < count; index++) {
      const data = this.consistentPerson(language || null, gender || null)
      list.push(data)
    }
    return list
  }

  /**
   * Generates a fake Nigerian license plate number
   * 
   * @param {string} state - Optional state name to use for prefix
   * @returns {string} License plate e.g. "LAG-234XY"
   */
  static licensePlate(state) {
    const stateNames = Object.keys(stateCodes)
    let selectedState

    if (state) {
      selectedState = stateNames.find(s => s.toLowerCase() === state.toLowerCase())
      if (!selectedState) {
        return 'Invalid state name.'
      }
    } else {
      selectedState = stateNames[Math.floor(this._random() * stateNames.length)]
    }

    const code = stateCodes[selectedState]
    const digits = String(Math.floor(100 + this._random() * 900))
    const letters = 'ABCDEFGHJKLMNPRSTUVWXYZ'
    const letter1 = letters[Math.floor(this._random() * letters.length)]
    const letter2 = letters[Math.floor(this._random() * letters.length)]

    return `${code}-${digits}${letter1}${letter2}`
  }

  /**
   * Generates a fake Nigerian company
   * 
   * @returns {object} { name, rcNumber, industry }
   */
  static company() {
    const prefix = companyPrefixes[Math.floor(this._random() * companyPrefixes.length)]
    const noun = companyNouns[Math.floor(this._random() * companyNouns.length)]
    const suffix = companySuffixes[Math.floor(this._random() * companySuffixes.length)]
    const industry = industries[Math.floor(this._random() * industries.length)]
    const rcNum = Math.floor(100000 + this._random() * 9900000)

    return {
      name: `${prefix} ${noun} ${suffix}`,
      rcNumber: `RC-${rcNum}`,
      industry: industry,
    }
  }

  /**
   * Generates a random Nigerian university
   * 
   * @returns {object} { name, abbreviation, state, type }
   */
  static university() {
    const uni = universities[Math.floor(this._random() * universities.length)]
    return { ...uni }
  }

  /**
   * Generates a fake education record
   * 
   * @param {string} language - Optional language to filter universities by region
   * @returns {object} { university, abbreviation, degree, course, graduationYear }
   */
  static educationRecord(language) {
    let uni

    if (language) {
      const regions = languageToRegions[language.toLowerCase()]
      if (regions) {
        const regionStates = []
        regions.forEach(r => regionStates.push(...regionMap[r].states))
        const regionalUnis = universities.filter(u => regionStates.includes(u.state))
        if (regionalUnis.length > 0) {
          uni = regionalUnis[Math.floor(this._random() * regionalUnis.length)]
        }
      }
    }

    if (!uni) {
      uni = universities[Math.floor(this._random() * universities.length)]
    }

    const degree = degrees[Math.floor(this._random() * degrees.length)]
    const course = courses[Math.floor(this._random() * courses.length)]
    const currentYear = new Date().getFullYear()
    const graduationYear = currentYear - Math.floor(this._random() * 20) - 1

    return {
      university: uni.name,
      abbreviation: uni.abbreviation,
      degree: degree.code,
      course: course,
      graduationYear: graduationYear,
    }
  }

  /**
   * Generates a fake work/employment record
   * 
   * @returns {object} { company, position, industry, startYear }
   */
  static workRecord() {
    const comp = this.company()
    const position = positions[Math.floor(this._random() * positions.length)]
    const currentYear = new Date().getFullYear()
    const startYear = currentYear - Math.floor(this._random() * 15)

    return {
      company: comp.name,
      position: position,
      industry: comp.industry,
      startYear: startYear,
    }
  }

  /**
   * Generates a fake vehicle record
   * 
   * @param {string} state - Optional state for license plate
   * @returns {object} { licensePlate, make, model, year, color }
   */
  static vehicleRecord(state) {
    const plate = this.licensePlate(state || null)
    const makeData = vehicleMakes[Math.floor(this._random() * vehicleMakes.length)]
    const model = makeData.models[Math.floor(this._random() * makeData.models.length)]
    const color = vehicleColors[Math.floor(this._random() * vehicleColors.length)]
    const currentYear = new Date().getFullYear()
    const year = currentYear - Math.floor(this._random() * 15)

    return {
      licensePlate: plate,
      make: makeData.make,
      model: model,
      year: year,
      color: color,
    }
  }

  /**
   * Generates a detailed fake Nigerian person with education, work, and vehicle records.
   * Uses consistentPerson() internally for geographic coherence.
   * 
   * @param {string} language - "yoruba", "igbo", or "hausa" (optional)
   * @param {string} gender - "male" or "female" (optional)
   * @returns {object} Rich identity with person + education + work + vehicle
   */
  static detailedPerson(language, gender) {
    const person = this.consistentPerson(language || null, gender || null)

    if (typeof person === 'string') {
      return person // error message from consistentPerson
    }

    // Determine language for regional university matching
    const langOptions = ["yoruba", "hausa", "igbo"]
    const lang = (language)
      ? language.trim().toLowerCase()
      : (this.language ? this.language
        : langOptions[Math.floor(this._random() * langOptions.length)])

    const education = this.educationRecord(lang)
    const work = this.workRecord()
    const vehicle = this.vehicleRecord(person.state)

    return {
      ...person,
      education: education,
      work: work,
      vehicle: vehicle,
    }
  }

  /**
   * Generates multiple detailed fake Nigerian persons.
   * 
   * @param {number} number - Number of people (default: 10)
   * @param {string} language - "yoruba", "igbo", or "hausa" (optional)
   * @param {string} gender - "male" or "female" (optional)
   * @returns {array} Array of detailed person objects
   */
  static detailedPeople(number, language, gender) {
    let count = (number) ? number : 10
    let list = []
    for (let index = 0; index < count; index++) {
      const data = this.detailedPerson(language || null, gender || null)
      list.push(data)
    }
    return list
  }

  /**
   * Get API schema for AI/LLM tool integration
   * Returns structured descriptions of all available methods for agent discovery.
   * 
   * @param {string} method - Optional specific method name to describe
   * @returns {Array|Object|null} Full API schema, single method schema, or null
   */
  static describe(method) {
    const schema = require('../../../schema.json')
    const methods = schema.methods

    if (!method) {
      return methods
    }

    const found = methods.find(m => m.name === method.toLowerCase())
    return found || null
  }
}

module.exports = Factory