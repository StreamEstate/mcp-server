import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { StreamEstateClient } from "../client.js";
import { paginationParams, propertyOrderParams } from "../schemas/common.js";
import {
  locationFilters,
  priceFilters,
  propertyCharacteristicFilters,
  energyFilters,
  dateFilters,
  eventFilters,
  miscFilters,
  expressionFilters,
} from "../schemas/property-filters.js";

export function registerIndicatorTools(server: McpServer, client: StreamEstateClient): void {
  // ── get-cities ──────────────────────────────────────────────────────
  server.tool(
    "get-cities",
    "Search French cities by name, zipcode, INSEE code, or geographic polygon. Returns city IDs needed for property search filters.",
    {
      excludeGroupedCities: z.boolean().optional(),
      inseeCode: z.string().optional().describe("Filter by single INSEE code"),
      inseeCodes: z.array(z.string()).optional().describe("Filter by multiple INSEE codes"),
      polygon: z.string().optional().describe("GPS coordinate polygon"),
      label: z.string().optional().describe("Filter by display name"),
      name: z.string().optional().describe("Filter by city name"),
      sortByName: z.enum(["asc", "desc"]).optional(),
      page: z.number().optional(),
      slug: z.string().optional(),
      zipcode: z.string().optional(),
      zipcodes: z.array(z.string()).optional(),
    },
    async (params) => {
      try {
        const data = await client.get("/cities", params);
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { content: [{ type: "text", text: `Error: ${message}` }], isError: true };
      }
    },
  );

  // ── location-autocomplete ───────────────────────────────────────────
  server.tool(
    "location-autocomplete",
    "Autocomplete cities and departments by search query. Returns IDs needed for location filters in search-properties and create-search.",
    {
      query: z.string().describe("Search term (e.g. 'Paris', 'Lyon', 'Marseille')"),
      excludeCities: z.array(z.string()).optional().describe("City IRIs to exclude"),
      excludeDepartments: z.array(z.string()).optional().describe("Department IRIs to exclude"),
    },
    async (params) => {
      try {
        const data = await client.get("/public/location-autocomplete", params);
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { content: [{ type: "text", text: `Error: ${message}` }], isError: true };
      }
    },
  );

  // ── get-points-of-interest ──────────────────────────────────────────
  server.tool(
    "get-points-of-interest",
    "Find points of interest (schools, hospitals, restaurants, parking) near a location. Returns facilities within a radius of given coordinates.",
    {
      lat: z.number().describe("Latitude"),
      lon: z.number().describe("Longitude"),
      radius: z.number().optional().describe("Search radius in km"),
      facilities: z
        .array(z.string())
        .optional()
        .describe('Categories: "kindergarten", "school", "restaurant", "hospital", "parking"'),
    },
    async (params) => {
      try {
        const data = await client.get("/indicators/points_of_interest", params);
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { content: [{ type: "text", text: `Error: ${message}` }], isError: true };
      }
    },
  );

  // ── get-price-per-meter ─────────────────────────────────────────────
  server.tool(
    "get-price-per-meter",
    "Get price per m² statistics (average, median, time series) for properties matching filters. Useful for market analysis and property valuation.",
    {
      ...locationFilters,
      ...priceFilters,
      ...propertyCharacteristicFilters,
      ...energyFilters,
      ...dateFilters,
      ...eventFilters,
      ...miscFilters,
      ...expressionFilters,
      ...paginationParams,
      dateHistogramGranularity: z
        .enum(["month", "year"])
        .optional()
        .describe("Granularity for date histogram"),
    },
    async (params) => {
      try {
        const { expressions, ...rest } = params;
        const queryParams: Record<string, unknown> = { ...rest };
        if (expressions?.length) {
          const exprParams = client.buildExpressionsParams(expressions);
          Object.assign(queryParams, exprParams);
        }
        const data = await client.get("/indicators/price_per_meter", queryParams);
        return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { content: [{ type: "text", text: `Error: ${message}` }], isError: true };
      }
    },
  );
}
