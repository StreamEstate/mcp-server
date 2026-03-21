import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { StreamEstateClient } from "../client.js";
import { searchBodyParams } from "../schemas/search-params.js";

export function registerSearchTools(server: McpServer, client: StreamEstateClient): void {
  // ── create-search ───────────────────────────────────────────────────
  server.tool(
    "create-search",
    "Create a saved search with optional webhook notifications for real-time property alerts. Configure location, price, size filters and webhook endpoints.",
    {
      ...searchBodyParams,
    },
    async (params) => {
      try {
        const body: Record<string, unknown> = { ...params };
        const data = await client.post("/searches", body);
        return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { content: [{ type: "text" as const, text: `Error: ${message}` }], isError: true };
      }
    },
  );

  // ── list-searches ───────────────────────────────────────────────────
  server.tool(
    "list-searches",
    "List all saved searches for the authenticated user. Can filter by notification status and title.",
    {
      notificationEnabled: z.boolean().optional().describe("Filter by notification status"),
      orderByTitle: z.enum(["asc", "desc"]).optional().describe("Sort by title"),
      page: z.number().optional().describe("Page number"),
      title: z.string().optional().describe("Filter by title"),
    },
    async (params) => {
      try {
        const data = await client.get("/searches", params);
        return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { content: [{ type: "text" as const, text: `Error: ${message}` }], isError: true };
      }
    },
  );

  // ── get-search ──────────────────────────────────────────────────────
  server.tool(
    "get-search",
    "Get details of a specific saved search by its ID.",
    {
      id: z.string().describe("Search ID"),
    },
    async (params) => {
      try {
        const data = await client.get(`/searches/${params.id}`);
        return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { content: [{ type: "text" as const, text: `Error: ${message}` }], isError: true };
      }
    },
  );

  // ── update-search ───────────────────────────────────────────────────
  server.tool(
    "update-search",
    "Update an existing saved search with new criteria, filters, or webhook configuration.",
    {
      id: z.string().describe("Search ID"),
      ...searchBodyParams,
    },
    async (params) => {
      try {
        const { id, ...body } = params;
        const data = await client.put(`/searches/${id}`, body);
        return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { content: [{ type: "text" as const, text: `Error: ${message}` }], isError: true };
      }
    },
  );

  // ── delete-search ───────────────────────────────────────────────────
  server.tool(
    "delete-search",
    "Delete a saved search by its ID.",
    {
      id: z.string().describe("Search ID"),
    },
    async (params) => {
      try {
        const data = await client.del(`/searches/${params.id}`);
        return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { content: [{ type: "text" as const, text: `Error: ${message}` }], isError: true };
      }
    },
  );
}
