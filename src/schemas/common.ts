import { z } from "zod";

export const paginationParams = {
  page: z.number().optional().describe("Page number (default: 1)"),
  itemsPerPage: z.number().optional().describe("Items per page (max: 30)"),
};

export const propertyOrderParams = {
  orderByCreatedAt: z.enum(["asc", "desc"]).optional().describe("Sort by creation date"),
  orderByUpdatedAt: z.enum(["asc", "desc"]).optional().describe("Sort by last update date"),
  orderByPrice: z.enum(["asc", "desc"]).optional().describe("Sort by price"),
  orderBySurface: z.enum(["asc", "desc"]).optional().describe("Sort by surface area"),
  orderByPricePerMeter: z.enum(["asc", "desc"]).optional().describe("Sort by price per m²"),
};
