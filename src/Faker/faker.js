// faker factory
const Factory = require('./Factory/factory')

class Faker extends Factory
{
    /**
     * Faker Configuration
     * 
     * @param {object} object
     */
    static config(object) {
        if (typeof object === 'object' && typeof object !== undefined) {
            this.language = object.language
            this.gender = object.gender
        }
    }

    /**
     * Generates Fake Name
     * 
     * @returns {string}
     */
    static name() {
        return this.pickName(this.language, this.gender)
    }

    /**
     * Generates Fake Person Object
     * 
     * @returns {object}
     */
    static person() {
        return this.pickPerson()
    }

    /**
     * Generates Fake People Array
     * 
     * @param {integer} number
     * @returns {array}
     */
    static people(number) {
        return this.pluckPeople(number)
    }

    /**
     * Generates Fake Address
     * 
     * @returns {string}
     */
    static address() {
        return this.pickAddress()
    }

    /**
     * Generates Fake Phone Number
     * 
     * @param {string} network
     * @returns {string}
     */
    static phoneNumber(network) {
        return this.pickPhoneNumber(network)
    }
}

module.exports = Faker