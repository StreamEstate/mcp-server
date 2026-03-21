import { z } from "zod";

// --- Location filters ---
export const locationFilters = {
  includedCities: z.array(z.string()).optional().describe('City IRIs, e.g. ["/cities/30953"]. Use location-autocomplete to find IDs.'),
  includedDepartments: z.array(z.string()).optional().describe('Department IRIs, e.g. ["/departments/77"]'),
  includedZipcodes: z.array(z.string()).optional().describe('Zipcodes, e.g. ["75017", "75018"]'),
  includedInseeCodes: z.array(z.string()).optional().describe('INSEE codes, e.g. ["75117"]'),
  excludedCities: z.array(z.string()).optional().describe("City IRIs to exclude"),
  excludedInseeCodes: z.array(z.string()).optional().describe("INSEE codes to exclude"),
  excludedZipcodes: z.array(z.string()).optional().describe("Zipcodes to exclude"),
  excludedProperties: z.array(z.string()).optional().describe("Property IRIs to exclude"),
  lat: z.number().optional().describe("Latitude for radius search"),
  lon: z.number().optional().describe("Longitude for radius search"),
  radius: z.number().optional().describe("Search radius in km (requires lat+lon)"),
  geoShapes: z.array(z.string()).optional().describe("Geographic polygon coordinates for area search"),
  geocodingAccuracy: z.array(z.number()).optional().describe("1=house-number, 2=neighborhood"),
  withResolvedLocation: z.boolean().optional().describe("Only properties with resolved GPS coordinates"),
};

// --- Price filters ---
export const priceFilters = {
  budgetMin: z.number().optional().describe("Minimum price/budget"),
  budgetMax: z.number().optional().describe("Maximum price/budget"),
  pricePerMeterMin: z.number().optional().describe("Minimum price per m²"),
  pricePerMeterMax: z.number().optional().describe("Maximum price per m²"),
  priceExcludingFeesMin: z.number().optional().describe("Minimum price excluding fees"),
  priceExcludingFeesMax: z.number().optional().describe("Maximum price excluding fees"),
  priceMin: z.number().optional().describe("Minimum advert price"),
  priceMax: z.number().optional().describe("Maximum advert price"),
  withCoherentPrice: z.boolean().optional().describe("Filter for coherent/realistic prices"),
};

// --- Property characteristic filters ---
export const propertyCharacteristicFilters = {
  propertyTypes: z.array(z.number()).optional().describe("0=Flat, 1=House, 2=Building, 3=Parking, 4=Office, 5=Land, 6=Shop"),
  transactionType: z.number().optional().describe("0=Sell, 1=Rent"),
  publisherTypes: z.array(z.number()).optional().describe("0=Individual, 1=Professional"),
  roomMin: z.number().optional().describe("Minimum number of rooms"),
  roomMax: z.number().optional().describe("Maximum number of rooms"),
  bedroomMin: z.number().optional().describe("Minimum number of bedrooms"),
  bedroomMax: z.number().optional().describe("Maximum number of bedrooms"),
  surfaceMin: z.number().optional().describe("Minimum surface area in m²"),
  surfaceMax: z.number().optional().describe("Maximum surface area in m²"),
  furnished: z.boolean().optional().describe("Filter for furnished properties"),
  withVirtualTour: z.boolean().optional().describe("Only properties with virtual tour"),
  isExpired: z.boolean().optional().describe("Filter expired/active properties"),
  sortMode: z.string().optional().describe('"property" or "advert" sorting mode'),
};

// --- Energy filters ---
export const energyFilters = {
  energyCategories: z.array(z.string()).optional().describe("Energy efficiency categories: A through G"),
  energyValueMin: z.number().optional().describe("Minimum energy value"),
  energyValueMax: z.number().optional().describe("Maximum energy value"),
  ghgLetters: z.array(z.string()).optional().describe("Greenhouse gas categories: A through G"),
  ghgValueMin: z.number().optional().describe("Minimum GHG value"),
  ghgValueMax: z.number().optional().describe("Maximum GHG value"),
};

// --- Date filters ---
export const dateFilters = {
  fromDate: z.string().optional().describe("Property creation start date (ISO 8601)"),
  toDate: z.string().optional().describe("Property creation end date (ISO 8601)"),
  fromUpdatedAt: z.string().optional().describe("Property update start date (ISO 8601)"),
  toUpdatedAt: z.string().optional().describe("Property update end date (ISO 8601)"),
};

// --- Event variation filters ---
export const eventFilters = {
  priceEventFromDate: z.string().optional().describe("Price event start date (ISO 8601)"),
  priceEventToDate: z.string().optional().describe("Price event end date (ISO 8601)"),
  priceEventVariationMin: z.number().optional().describe("Minimum price variation %"),
  priceEventVariationMax: z.number().optional().describe("Maximum price variation %"),
  surfaceEventFromDate: z.string().optional().describe("Surface event start date (ISO 8601)"),
  surfaceEventToDate: z.string().optional().describe("Surface event end date (ISO 8601)"),
  surfaceEventVariationMin: z.number().optional().describe("Minimum surface variation %"),
  surfaceEventVariationMax: z.number().optional().describe("Maximum surface variation %"),
};

// --- Misc filters ---
export const miscFilters = {
  constructionYearMin: z.number().optional().describe("Minimum construction year"),
  constructionYearMax: z.number().optional().describe("Maximum construction year"),
  condominiumFeesMin: z.number().optional().describe("Minimum condominium fees"),
  condominiumFeesMax: z.number().optional().describe("Maximum condominium fees"),
  feesPercentageMin: z.number().optional().describe("Minimum fees percentage"),
  feesPercentageMax: z.number().optional().describe("Maximum fees percentage"),
  feesResponsibility: z.number().optional().describe("0=seller, 1=buyer"),
  floorsMin: z.number().optional().describe("Minimum number of floors"),
  floorsMax: z.number().optional().describe("Maximum number of floors"),
  lotCountMin: z.number().optional().describe("Minimum lot count in condominium"),
  lotCountMax: z.number().optional().describe("Maximum lot count in condominium"),
  inventoryPriceMin: z.number().optional().describe("Minimum inventory price"),
  inventoryPriceMax: z.number().optional().describe("Maximum inventory price"),
  rentalChargesMin: z.number().optional().describe("Minimum rental charges"),
  rentalChargesMax: z.number().optional().describe("Maximum rental charges"),
  rentalPledgeMin: z.number().optional().describe("Minimum rental pledge/deposit"),
  rentalPledgeMax: z.number().optional().describe("Maximum rental pledge/deposit"),
  renterFeesMin: z.number().optional().describe("Minimum renter fees"),
  renterFeesMax: z.number().optional().describe("Maximum renter fees"),
};

// --- Full-text search ---
export const expressionFilters = {
  expressions: z.array(z.object({
    word: z.string().describe("Search term"),
    includes: z.boolean().optional().describe("true to include, false to exclude (default: true)"),
    strict: z.boolean().optional().describe("true for exact phrase match (default: false)"),
  })).optional().describe("Full-text search expressions for property title/description"),
};
