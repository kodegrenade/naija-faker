/**
 * Salary Data - Position-aware income bands (monthly, in NGN)
 */
const salaryBands = {
  entry: { min: 50000, max: 150000 },
  mid: { min: 150000, max: 500000 },
  senior: { min: 500000, max: 1500000 },
  executive: { min: 1500000, max: 5000000 },
}

const levels = ["entry", "mid", "senior", "executive"]

module.exports = { salaryBands, levels }
