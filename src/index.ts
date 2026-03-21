#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamEstateClient } from "./client.js";
import { registerIndicatorTools } from "./tools/indicators.js";
import { registerPropertyTools } from "./tools/properties.js";
import { registerSearchTools } from "./tools/searches.js";
import { registerWebhookTools } from "./tools/webhooks.js";

const apiKey = process.env.STREAM_ESTATE_API_KEY;
if (!apiKey) {
  console.error("STREAM_ESTATE_API_KEY environment variable is required");
  process.exit(1);
}

const baseUrl = process.env.STREAM_ESTATE_BASE_URL || "https://api.stream.estate";
const client = new StreamEstateClient(apiKey, baseUrl);

const server = new McpServer({
  name: "stream-estate",
  version: "1.0.0",
});

registerIndicatorTools(server, client);
registerPropertyTools(server, client);
registerSearchTools(server, client);
registerWebhookTools(server, client);

const transport = new StdioServerTransport();
await server.connect(transport);
