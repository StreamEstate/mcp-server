import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import type { StreamEstateClient } from "../client.js";

export function registerWebhookTools(server: McpServer, client: StreamEstateClient): void {
  // ── test-webhook ────────────────────────────────────────────────────
  server.tool(
    "test-webhook",
    "Test webhook delivery by sending a simulated match or event payload to an endpoint. Useful for verifying webhook integration.",
    {
      endpoint: z.string().describe("HTTPS webhook URL to test"),
      type: z
        .enum([
          "ad.update.price",
          "ad.update.surface",
          "ad.update.pictures",
          "ad.update.expired",
          "property.ad.create",
          "property.ad.update",
        ])
        .describe("Event type to simulate"),
    },
    async (params) => {
      try {
        const data = await client.get("/webhook-tester", params);
        return { content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return { content: [{ type: "text" as const, text: `Error: ${message}` }], isError: true };
      }
    },
  );
}
