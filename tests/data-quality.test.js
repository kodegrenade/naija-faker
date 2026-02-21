const assert = require('assert').strict

/**
 * Name Providers
 */
const { hausaMale, hausaFemale } = require('../src/Faker/Providers/names/Hausa')
const { igboMale, igboFemale } = require('../src/Faker/Providers/names/Igbo')
const { yorubaMale, yorubaFemale } = require('../src/Faker/Providers/names/Yoruba')

/**
 * Location Providers
 */
const { states } = require('../src/Faker/Providers/locations/States')
const { lgas } = require('../src/Faker/Providers/locations/Lgas')

/**
 * Other Providers
 */
const { networks, prefix } = require('../src/Faker/Providers/numbers')
const { types, suffixes, locale, places } = require('../src/Faker/Providers/address')
const { maleTitles, femaleTitles } = require('../src/Faker/Providers/title')
const { extensions } = require('../src/Faker/Providers/email')

/**
 * Helper: find duplicates in an array
 */
function findDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) !== index)
}

describe("data quality - names", function () {
  const nameArrays = {
    "Hausa male": hausaMale,
    "Hausa female": hausaFemale,
    "Igbo male": igboMale,
    "Igbo female": igboFemale,
    "Yoruba male": yorubaMale,
    "Yoruba female": yorubaFemale,
  }

  for (const [label, arr] of Object.entries(nameArrays)) {
    it(`${label} names should have no duplicates`, function () {
      const dupes = findDuplicates(arr)
      assert.deepEqual(dupes, [], `Found duplicates: ${dupes.join(', ')}`)
    })

    it(`${label} names should have at least 10 entries`, function () {
      assert.ok(arr.length >= 10, `Only ${arr.length} entries found`)
    })

    it(`${label} names should all be non-empty strings`, function () {
      arr.forEach((name, i) => {
        assert.equal(typeof name, 'string', `Entry at index ${i} is not a string`)
        assert.ok(name.trim().length > 0, `Entry at index ${i} is empty`)
      })
    })
  }
})

describe("data quality - states", function () {
  it("should have 37 entries (36 states + FCT)", function () {
    assert.equal(states.length, 37)
  })

  it("should include Federal Capital Territory", function () {
    assert.ok(states.includes("Federal Capital Territory"), "FCT is missing")
  })

  it("should have no duplicates", function () {
    const dupes = findDuplicates(states)
    assert.deepEqual(dupes, [], `Found duplicates: ${dupes.join(', ')}`)
  })
})

describe("data quality - LGAs", function () {
  it("should have no stray numeric strings", function () {
    const numericEntries = lgas.filter(entry => /^\d+$/.test(entry))
    assert.deepEqual(numericEntries, [], `Found numeric entries: ${numericEntries.join(', ')}`)
  })

  it("should have all non-empty string entries", function () {
    lgas.forEach((lga, i) => {
      assert.equal(typeof lga, 'string', `Entry at index ${i} is not a string`)
      assert.ok(lga.trim().length > 0, `Entry at index ${i} is empty`)
    })
  })
})

describe("data quality - phone numbers", function () {
  it("should have 4 network providers", function () {
    assert.equal(networks.length, 4)
  })

  it("all prefixes should match 4-digit format starting with 0", function () {
    for (const network of networks) {
      const prefixes = prefix[0][network]
      assert.ok(Array.isArray(prefixes), `No prefixes for ${network}`)
      prefixes.forEach(p => {
        assert.match(p, /^0\d{3}$/, `Invalid prefix "${p}" for ${network}`)
      })
    }
  })
})

describe("data quality - email", function () {
  it("all extensions should start with @", function () {
    extensions.forEach(ext => {
      assert.ok(ext.startsWith('@'), `Extension "${ext}" does not start with @`)
    })
  })

  it("all extensions should contain a dot after @", function () {
    extensions.forEach(ext => {
      const domain = ext.slice(1)
      assert.ok(domain.includes('.'), `Extension "${ext}" has no TLD separator`)
    })
  })
})

describe("data quality - address", function () {
  it("should have no duplicate places in any region", function () {
    for (const region of locale) {
      const regionPlaces = places[0][region]
      const dupes = findDuplicates(regionPlaces)
      assert.deepEqual(dupes, [], `Found duplicates in ${region}: ${dupes.join(', ')}`)
    }
  })

  it("should have places for all defined locales", function () {
    for (const region of locale) {
      assert.ok(Array.isArray(places[0][region]), `No places for region: ${region}`)
      assert.ok(places[0][region].length > 0, `Empty places for region: ${region}`)
    }
  })
})

describe("data quality - titles", function () {
  it("male titles should have no duplicates", function () {
    const dupes = findDuplicates(maleTitles)
    assert.deepEqual(dupes, [], `Found duplicates: ${dupes.join(', ')}`)
  })

  it("female titles should have no duplicates", function () {
    const dupes = findDuplicates(femaleTitles)
    assert.deepEqual(dupes, [], `Found duplicates: ${dupes.join(', ')}`)
  })
})
