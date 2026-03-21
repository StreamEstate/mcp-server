import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
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

export function registerPropertyTools(server: McpServer, client: StreamEstateClient): void {
  // Tool 1: search-properties
  server.tool(
    "search-properties",
    "Search French real estate properties with extensive filters for location, price, size, rooms, energy rating, and more. Returns paginated results with property details, adverts, photos, and nearby stations. Use location-autocomplete first to resolve city/department IDs.",
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
      ...propertyOrderParams,
    },
    async (params) => {
      try {
        const { expressions, ...rest } = params;
        const queryParams: Record<string, unknown> = { ...rest };

        if (expressions?.length) {
          const exprParams = client.buildExpressionsParams(expressions);
          Object.assign(queryParams, exprParams);
        }

        const data = await client.get("/documents/properties", queryParams);
        return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { content: [{ type: "text" as const, text: `Error: ${message}` }], isError: true };
      }
    },
  );

  // Tool 2: get-property
  server.tool(
    "get-property",
    "Get full details for a single property by UUID, including all adverts, price history events, photos, contact info, and nearby transit stations.",
    {
      id: z.string().describe("Property UUID"),
    },
    async (params) => {
      try {
        const data = await client.get(`/documents/properties/${params.id}`);
        return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { content: [{ type: "text" as const, text: `Error: ${message}` }], isError: true };
      }
    },
  );

  // Tool 3: find-similar-properties
  server.tool(
    "find-similar-properties",
    "Find properties similar to a given property. Useful for market comparisons and finding alternatives.",
    {
      id: z.string().describe("Reference property UUID"),
      fromDate: z.string().optional().describe("Creation start date (ISO 8601)"),
      ...paginationParams,
      ...propertyOrderParams,
    },
    async (params) => {
      try {
        const { id, ...queryParams } = params;
        const data = await client.get(`/documents/properties/${id}/similar-properties`, queryParams);
        return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { content: [{ type: "text" as const, text: `Error: ${message}` }], isError: true };
      }
    },
  );
}
