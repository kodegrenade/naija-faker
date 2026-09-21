# CHANGELOG

## 2026-09-21, v2.0.0

Generated records are now internally coherent. Every field of a person is
derived from one identity instead of drawn independently, so a record holds
together the way a real one would.

### Breaking Changes
- `detailedPerson().education` is now `EducationRecord | null`. It is `null` when the person is too young to have finished any qualification, rather than the invented diploma 1.x returned. TypeScript consumers using `strictNullChecks` must guard before reading it.
- Seeded output has changed. `seed()` is still exactly reproducible within 2.x, but a given seed produces different values than it did in 1.x. Snapshot fixtures committed against 1.x need regenerating.
- `detailedPerson()` now defaults to ages 22–65 (was 18–65), since the record carries a degree and a job. Pass `{ minAge, maxAge }` to widen it.

### Coherent Data
- Titles are filtered against ethnic group, age, marital status and qualification — no Igbo `Emir`, no 24-year-old `Prof.`, no `Prof.` holding an OND, no single `Mrs.`
- `Oba`, `Igwe` and `Emir` are now rare, instead of turning up in roughly 1 record in 15
- Graduation falls after the date of birth at a plausible age for the degree, and never in the future
- Courses match their degree's discipline — no `B.Pharm` in History
- Employment starts after graduation (or after turning 18, for those with no degree yet), and seniority, position and salary band all follow years of experience
- Marital status and the next-of-kin relationship fit the age — no widowed 19-year-olds, no 25-year-old whose next of kin is their son
- Next of kin shares the family name and lives in the same part of the country
- `dateOfBirth()` returns a real calendar date whose year always agrees with the reported age (1.x capped days at 28 and could be a year out)
- `person()` and `consistentPerson()` resolve language and gender once, so the title always matches the name

### New Features
- `detailedPerson(language, gender, { minAge, maxAge })` and `detailedPeople(count, language, gender, options)` — configurable age range
- `title(gender, { language, age, maritalStatus, degree, discipline })` — context-filtered titles
- `address(region)` — `"east"`, `"west"`, `"north"` or `"south"`
- `consistentPerson(language, gender, profile)` — profile keeps the title plausible
- `educationRecord(language, age)` — returns `null` below the youngest qualification age
- `workRecord(age, graduationYear)` — timeline-aware employment
- `maritalStatus(age)` — age-appropriate statuses
- `nextOfKin(language, gender, profile)` — relationship, surname and region follow the person

### New Fields
- `consistentPerson()` / `detailedPerson()` — `language`, `region`
- `educationRecord()` — `discipline`
- `workRecord()` — `yearsOfExperience`, `level`

### Improvements
- New error code `INVALID_REGION` for `address()`
- Language names are now case-insensitive — `name("Yoruba")` no longer throws
- `tests/coherence.test.js` — cross-field invariants asserted over a 200-record sample
- CI tests Node 22 and 24; Node 16, 18 and 20 are end-of-life and were dropped
- Publish workflow moved from Node 18 to Node 22

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