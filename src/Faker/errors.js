/**
 * Custom error class for naija-faker
 */
class NaijaFakerError extends Error {
  /**
   * @param {string} message - Human-readable error message
   * @param {string} code - Machine-readable error code (e.g. 'INVALID_LANGUAGE')
   */
  constructor(message, code) {
    super(message)
    this.name = 'NaijaFakerError'
    this.code = code
  }
}

module.exports = { NaijaFakerError }
