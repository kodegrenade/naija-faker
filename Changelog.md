# CHANGELOG

## 2026-02-24, v1.0.6
### New Features
- `bvn()` — 11-digit Bank Verification Number
- `nin()` — 11-digit National Identification Number
- `bankAccount()` — bank name, code, and 10-digit account number (26 banks)
- `consistentPerson()` / `consistentPeople()` — geographically coherent identities
- `seed()` — deterministic generation with Mulberry32 PRNG
- `describe()` — AI/LLM schema integration via `schema.json`
- `licensePlate()` — Nigerian license plates with 37 state codes
- `company()` — company name, RC number, and industry
- `university()` — 42 Nigerian universities (federal, state, private)
- `educationRecord()` — university, degree, course, graduation year
- `workRecord()` — company, position, industry, start year
- `vehicleRecord()` — license plate, make, model, year, color
- `detailedPerson()` / `detailedPeople()` — comprehensive person with all records
- `dateOfBirth()` — configurable min/max age, returns `{ date, age }`
- `maritalStatus()` — Single, Married, Divorced, Widowed, Separated
- `bloodGroup()` — A+, A-, B+, B-, AB+, AB-, O+, O-
- `genotype()` — AA, AS, AC, SS, SC
- `salary()` — level-based income bands (entry/mid/senior/executive) in NGN
- `nextOfKin()` — generates related person with relationship type
- `export()` — bulk export to JSON or CSV with nested object flattening
- `registerProvider()` / `generate()` — custom provider registration

### Improvements
- Full TypeScript declaration file (`types/index.d.ts`)
- Custom `NaijaFakerError` class with machine-readable error codes
- Input validation for `config()`, `seed()`, `dateOfBirth()`, `people()`, `export()`
- Edge case validation: negative ages, zero counts, non-numeric seeds, invalid formats
- CI workflow — tests on push/PR across Node 16, 18, 20
- Tag-based publish workflow (`git tag v1.0.6 && git push origin v1.0.6`)

## 2023-08-18, v1.0.4
- Update ReadMe
- Module import path changed

## 2021-10-11, v1.0.3
- New providers for address.
- Generate email address from name.
- New values are added to the person object.

## 2021-10-09, v1.0.2
- Added test file.
- Change package code pattern.
- Added new items to names providers.
- Email address provider and method added.

## 2021-10-04, v1.0.1
- Added more providers for names.
- Code style changes.

## 2021-10-03, v1.0.0
- Initial version.