/**
 * Custom error class for naija-faker
 */
declare class NaijaFakerError extends Error {
  /** Machine-readable error code */
  code: string;
  constructor(message: string, code: string);
}

/**
 * Configuration options for naija-faker
 */
interface FakerConfig {
  /** Nigerian language for name generation: "yoruba", "igbo", or "hausa" */
  language?: "yoruba" | "igbo" | "hausa";
  /** Gender for name and title generation */
  gender?: "male" | "female";
  /** Nigerian mobile network provider */
  network?: "mtn" | "glo" | "airtel" | "9mobile";
}

/**
 * A generated person object with Nigerian identity data
 */
interface Person {
  /** Title/honorific (e.g., "Mr.", "Chief", "Alhaji") */
  title: string;
  /** First name */
  firstName: string;
  /** Last name / surname */
  lastName: string;
  /** Full name (firstName + lastName) */
  fullName: string;
  /** Generated email address */
  email: string;
  /** Nigerian phone number in +234 format */
  phone: string;
  /** Nigerian street address */
  address: string;
}

/**
 * A geographically consistent person with state and LGA
 */
interface ConsistentPerson extends Person {
  /** Nigerian state matching the person's ethnicity/region */
  state: string;
  /** Local Government Area within the person's state */
  lga: string | null;
}

/**
 * A detailed person with education, work, and vehicle records
 */
interface DetailedPerson extends ConsistentPerson {
  /** Date of birth and age */
  dateOfBirth: { date: string; age: number };
  /** Marital status */
  maritalStatus: string;
  /** Blood group */
  bloodGroup: string;
  /** Genotype */
  genotype: string;
  /** Salary details */
  salary: { amount: number; currency: string; level: string; frequency: string };
  /** Next of kin information */
  nextOfKin: { fullName: string; relationship: string; phone: string; address: string };
  /** Education record */
  education: EducationRecord;
  /** Work/employment record */
  work: WorkRecord;
  /** Vehicle ownership record */
  vehicle: VehicleRecord;
}

/**
 * A generated bank account object
 */
interface BankAccount {
  /** Bank name (e.g., "Access Bank", "Zenith Bank") */
  bankName: string;
  /** CBN bank code */
  bankCode: string;
  /** 10-digit NUBAN account number */
  accountNumber: string;
}

/**
 * A generated company object
 */
interface Company {
  /** Company name (e.g., "Pan-African Solutions Ltd") */
  name: string;
  /** RC registration number */
  rcNumber: string;
  /** Industry sector */
  industry: string;
}

/**
 * A generated university object
 */
interface University {
  /** Full university name */
  name: string;
  /** Common abbreviation (e.g., "UNILAG") */
  abbreviation: string;
  /** State where the university is located */
  state: string;
  /** Ownership type: "federal", "state", or "private" */
  type: "federal" | "state" | "private";
}

/**
 * A generated education record
 */
interface EducationRecord {
  /** University name */
  university: string;
  /** University abbreviation */
  abbreviation: string;
  /** Degree code (e.g., "B.Sc", "M.Sc", "Ph.D") */
  degree: string;
  /** Course of study */
  course: string;
  /** Year of graduation */
  graduationYear: number;
}

/**
 * A generated work/employment record
 */
interface WorkRecord {
  /** Company name */
  company: string;
  /** Job position/title */
  position: string;
  /** Industry sector */
  industry: string;
  /** Year employment started */
  startYear: number;
}

/**
 * A generated vehicle record
 */
interface VehicleRecord {
  /** Nigerian license plate number */
  licensePlate: string;
  /** Vehicle make (e.g., "Toyota") */
  make: string;
  /** Vehicle model (e.g., "Corolla") */
  model: string;
  /** Year of manufacture */
  year: number;
  /** Vehicle color */
  color: string;
}

/**
 * API method schema for AI/LLM integration
 */
interface MethodSchema {
  name: string;
  description: string;
  parameters: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
    enum?: string[];
  }>;
  returns: {
    type: string;
    description: string;
  };
  example: {
    call: string;
    result: any;
  };
}

/**
 * Naija Faker - generates fake Nigerian data
 */
interface NaijaFaker {
  /**
   * Set default configuration for data generation
   */
  config(options: FakerConfig): void;

  /**
   * Set a seed for deterministic output. Call without arguments to reset.
   */
  seed(value?: number): void;

  /**
   * Generate a fake Nigerian name
   */
  name(language?: "yoruba" | "igbo" | "hausa", gender?: "male" | "female"): string;

  /**
   * Generate a fake Nigerian person with complete identity data
   */
  person(language?: "yoruba" | "igbo" | "hausa", gender?: "male" | "female"): Person;

  /**
   * Generate multiple fake Nigerian persons
   */
  people(number?: number): Person[];

  /**
   * Generate a geographically consistent fake Nigerian person
   */
  consistentPerson(language?: "yoruba" | "igbo" | "hausa", gender?: "male" | "female"): ConsistentPerson;

  /**
   * Generate multiple geographically consistent fake Nigerian persons
   */
  consistentPeople(number?: number, language?: "yoruba" | "igbo" | "hausa", gender?: "male" | "female"): ConsistentPerson[];

  /**
   * Generate a detailed person with education, work, and vehicle records
   */
  detailedPerson(language?: "yoruba" | "igbo" | "hausa", gender?: "male" | "female"): DetailedPerson;

  /**
   * Generate multiple detailed persons
   */
  detailedPeople(number?: number, language?: "yoruba" | "igbo" | "hausa", gender?: "male" | "female"): DetailedPerson[];

  /**
   * Generate a Nigerian title/honorific
   */
  title(gender?: "male" | "female"): string;

  /**
   * Generate a fake email address
   */
  email(name?: string): string;

  /**
   * Generate a fake Nigerian street address
   */
  address(): string;

  /**
   * Generate a fake Nigerian phone number
   */
  phoneNumber(network?: "mtn" | "glo" | "airtel" | "9mobile"): string;

  /**
   * Generate a fake BVN (Bank Verification Number)
   */
  bvn(): string;

  /**
   * Generate a fake NIN (National Identification Number)
   */
  nin(): string;

  /**
   * Generate a fake Nigerian bank account
   */
  bankAccount(bankName?: string): BankAccount;

  /**
   * Generate a fake Nigerian license plate number
   */
  licensePlate(state?: string): string;

  /**
   * Generate a fake Nigerian company
   */
  company(): Company;

  /**
   * Generate a random Nigerian university
   */
  university(): University;

  /**
   * Generate a fake education record
   */
  educationRecord(language?: "yoruba" | "igbo" | "hausa"): EducationRecord;

  /**
   * Generate a fake work/employment record
   */
  workRecord(): WorkRecord;

  /**
   * Generate a fake vehicle record
   */
  vehicleRecord(state?: string): VehicleRecord;

  /**
   * Generate a fake date of birth with age
   */
  dateOfBirth(options?: { minAge?: number; maxAge?: number }): { date: string; age: number };

  /**
   * Generate a random marital status
   */
  maritalStatus(): string;

  /**
   * Generate a random blood group
   */
  bloodGroup(): string;

  /**
   * Generate a random genotype
   */
  genotype(): string;

  /**
   * Generate a fake salary
   */
  salary(options?: { level?: "entry" | "mid" | "senior" | "executive" }): { amount: number; currency: string; level: string; frequency: string };

  /**
   * Generate a fake next of kin
   */
  nextOfKin(language?: "yoruba" | "igbo" | "hausa", gender?: "male" | "female"): { fullName: string; relationship: string; phone: string; address: string };

  /**
   * Export generated data as JSON or CSV string
   */
  export(type?: "person" | "detailedPerson" | "consistentPerson", count?: number, format?: "json" | "csv"): string;

  /**
   * Get all Nigerian states (36 states + FCT)
   */
  states(): string[];

  /**
   * Get all Nigerian Local Government Areas
   */
  lgas(): string[];

  /**
   * Get API schema for AI/LLM tool integration
   */
  describe(method?: string): MethodSchema[] | MethodSchema | null;

  /**
   * Register a custom provider
   */
  registerProvider(name: string, handler: (faker: NaijaFaker) => any): void;

  /**
   * Generate a value from a registered custom provider
   */
  generate(name: string): any;

  /**
   * List all registered custom provider names
   */
  listProviders(): string[];
}

declare const faker: NaijaFaker;
export = faker;
export { NaijaFakerError };
