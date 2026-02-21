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
   * @param options - Configuration options
   */
  config(options: FakerConfig): void;

  /**
   * Set a seed for deterministic output. Call without arguments to reset.
   * @param value - Seed number (omit to reset to non-deterministic)
   */
  seed(value?: number): void;

  /**
   * Generate a fake Nigerian name
   * @param language - Nigerian language: "yoruba", "igbo", or "hausa"
   * @param gender - "male" or "female"
   * @returns Full name string (firstName + lastName)
   */
  name(language?: "yoruba" | "igbo" | "hausa", gender?: "male" | "female"): string;

  /**
   * Generate a fake Nigerian person with complete identity data
   * @param language - Nigerian language: "yoruba", "igbo", or "hausa"
   * @param gender - "male" or "female"
   * @returns Person object with name, email, phone, address, and title
   */
  person(language?: "yoruba" | "igbo" | "hausa", gender?: "male" | "female"): Person;

  /**
   * Generate multiple fake Nigerian persons
   * @param number - Number of people to generate (default: 10)
   * @returns Array of Person objects
   */
  people(number?: number): Person[];

  /**
   * Generate a geographically consistent fake Nigerian person
   * @param language - Nigerian language: "yoruba", "igbo", or "hausa"
   * @param gender - "male" or "female"
   * @returns ConsistentPerson with coherent state, LGA, and address
   */
  consistentPerson(language?: "yoruba" | "igbo" | "hausa", gender?: "male" | "female"): ConsistentPerson;

  /**
   * Generate multiple geographically consistent fake Nigerian persons
   * @param number - Number of people (default: 10)
   * @param language - Nigerian language: "yoruba", "igbo", or "hausa"
   * @param gender - "male" or "female"
   * @returns Array of ConsistentPerson objects
   */
  consistentPeople(number?: number, language?: "yoruba" | "igbo" | "hausa", gender?: "male" | "female"): ConsistentPerson[];

  /**
   * Generate a Nigerian title/honorific
   * @param gender - "male" or "female"
   * @returns Title string (e.g., "Mr.", "Chief", "Alhaji")
   */
  title(gender?: "male" | "female"): string;

  /**
   * Generate a fake email address
   * @param name - Optional name to base the email on
   * @returns Email address string
   */
  email(name?: string): string;

  /**
   * Generate a fake Nigerian street address
   * @returns Address string
   */
  address(): string;

  /**
   * Generate a fake Nigerian phone number
   * @param network - Mobile network: "mtn", "glo", "airtel", or "9mobile"
   * @returns Phone number string in +234 format
   */
  phoneNumber(network?: "mtn" | "glo" | "airtel" | "9mobile"): string;

  /**
   * Generate a fake BVN (Bank Verification Number)
   * @returns 11-digit BVN string
   */
  bvn(): string;

  /**
   * Generate a fake NIN (National Identification Number)
   * @returns 11-digit NIN string
   */
  nin(): string;

  /**
   * Generate a fake Nigerian bank account
   * @param bankName - Optional specific bank name
   * @returns BankAccount object with bankName, bankCode, accountNumber
   */
  bankAccount(bankName?: string): BankAccount;

  /**
   * Get all Nigerian states (36 states + FCT)
   * @returns Array of state names
   */
  states(): string[];

  /**
   * Get all Nigerian Local Government Areas
   * @returns Array of LGA names
   */
  lgas(): string[];

  /**
   * Get API schema for AI/LLM tool integration
   * @param method - Optional specific method name to describe
   * @returns Full API schema or schema for a specific method
   */
  describe(method?: string): MethodSchema[] | MethodSchema | null;
}

declare const faker: NaijaFaker;
export = faker;
