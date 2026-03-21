import { z } from "zod";

export const searchBodyParams = {
  title: z.string().optional().describe("Search title/name"),
  transactionType: z.number().optional().describe("0=Sell, 1=Rent"),
  propertyTypes: z.array(z.number()).optional().describe("0=Flat, 1=House, 2=Building, 3=Parking, 4=Office, 5=Land, 6=Shop"),
  publisherTypes: z.array(z.number()).optional().describe("0=Individual, 1=Professional"),
  budgetMin: z.number().optional().describe("Minimum budget"),
  budgetMax: z.number().optional().describe("Maximum budget"),
  surfaceMin: z.number().optional().describe("Minimum surface in m²"),
  surfaceMax: z.number().optional().describe("Maximum surface in m²"),
  roomMin: z.number().optional().describe("Minimum rooms"),
  roomMax: z.number().optional().describe("Maximum rooms"),
  bedroomMin: z.number().optional().describe("Minimum bedrooms"),
  bedroomMax: z.number().optional().describe("Maximum bedrooms"),
  landSurfaceMin: z.number().optional().describe("Minimum land surface in m²"),
  landSurfaceMax: z.number().optional().describe("Maximum land surface in m²"),
  pricePerMeterMin: z.number().optional().describe("Minimum price per m²"),
  pricePerMeterMax: z.number().optional().describe("Maximum price per m²"),
  furnished: z.boolean().optional().describe("Filter furnished properties"),
  withCoherentPrice: z.boolean().optional().describe("Filter for coherent prices"),
  withVirtualTour: z.boolean().optional().describe("Only with virtual tour"),

  // Location
  includedCities: z.array(z.string()).optional().describe('City IRIs, e.g. ["/cities/30953"]'),
  includedDepartments: z.array(z.string()).optional().describe('Department IRIs, e.g. ["/departments/77"]'),
  includedZipcodes: z.array(z.string()).optional().describe("Zipcodes to include"),
  includedInseeCodes: z.array(z.string()).optional().describe("INSEE codes to include"),
  excludedCities: z.array(z.string()).optional().describe("City IRIs to exclude"),
  lat: z.number().optional().describe("Latitude for radius search"),
  lon: z.number().optional().describe("Longitude for radius search"),
  radius: z.number().optional().describe("Search radius in km"),
  geoShapes: z.array(z.string()).optional().describe("Geographic polygon coordinates"),
  geoAccuracy: z.number().optional().describe("1=house-number, 2=neighborhood"),

  // Full-text search
  expressions: z.array(z.object({
    word: z.string().describe("Search term"),
    includes: z.boolean().optional().describe("Include or exclude (default: true)"),
    strict: z.boolean().optional().describe("Exact phrase match (default: false)"),
  })).optional().describe("Full-text search expressions"),

  // Notifications
  notificationEnabled: z.boolean().optional().describe("Enable webhook/email notifications"),
  notificationRecipient: z.string().optional().describe("Email address for alerts"),
  endpointRecipient: z.string().optional().describe("HTTPS webhook URL for match payloads"),
  eventEndpoint: z.string().optional().describe("HTTPS webhook URL for event payloads"),
  subscribedEvents: z.array(z.string()).optional().describe("Event types: property.ad.create, ad.update.price, ad.update.surface, ad.update.pictures, ad.update.expired, property.ad.update"),
  hidePropertyContact: z.boolean().optional().describe("Hide contact info in payloads"),

  // Source filters
  includedSources: z.array(z.string()).optional().describe("Source sites to include"),
  excludedSources: z.array(z.string()).optional().describe("Source sites to exclude"),
  includedSiteCategories: z.array(z.string()).optional().describe("Site categories to include"),
  excludedSiteCategories: z.array(z.string()).optional().describe("Site categories to exclude"),
};
