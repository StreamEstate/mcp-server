# Stream.estate MCP Server

MCP server for the [Stream.estate](https://stream.estate) French real estate API. Search properties, get market statistics, manage saved searches with webhook notifications, and more.

## Prerequisites

- Node.js >= 20
- [Stream.estate API key](https://stream.estate/signup)

## Installation

```bash
pnpm install
pnpm run build
```

## Configuration

| Environment Variable | Required | Default | Description |
|---------------------|----------|---------|-------------|
| `STREAM_ESTATE_API_KEY` | Yes | — | Your Stream.estate API key |
| `STREAM_ESTATE_BASE_URL` | No | `https://api.stream.estate` | API base URL |

## Usage with Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "stream-estate": {
      "command": "node",
      "args": ["/path/to/mcp.stream.estate/build/index.js"],
      "env": {
        "STREAM_ESTATE_API_KEY": "your-api-key"
      }
    }
  }
}
```

## Usage with Claude Code

Add to your `.mcp.json`:

```json
{
  "mcpServers": {
    "stream-estate": {
      "command": "node",
      "args": ["/path/to/mcp.stream.estate/build/index.js"],
      "env": {
        "STREAM_ESTATE_API_KEY": "your-api-key"
      }
    }
  }
}
```

## Available Tools

### Properties
| Tool | Description |
|------|-------------|
| `search-properties` | Search properties with 50+ filters (location, price, size, energy, etc.) |
| `get-property` | Get full property details by UUID |
| `find-similar-properties` | Find properties similar to a given one |

### Indicators
| Tool | Description |
|------|-------------|
| `get-cities` | Search cities by name, zipcode, or INSEE code |
| `location-autocomplete` | Autocomplete city/department names (returns IDs for filters) |
| `get-points-of-interest` | Find nearby schools, hospitals, restaurants, etc. |
| `get-price-per-meter` | Price/m² statistics with average, median, and time series |

### Saved Searches
| Tool | Description |
|------|-------------|
| `create-search` | Create a saved search with webhook notifications |
| `list-searches` | List all saved searches |
| `get-search` | Get a specific saved search |
| `update-search` | Update saved search criteria |
| `delete-search` | Delete a saved search |

### Webhooks
| Tool | Description |
|------|-------------|
| `test-webhook` | Send a test payload to a webhook endpoint |

## Key Concepts

- **Property types**: 0=Flat, 1=House, 2=Building, 3=Parking, 4=Office, 5=Land, 6=Shop
- **Transaction types**: 0=Sell, 1=Rent
- **Publisher types**: 0=Individual, 1=Professional
- **Energy categories**: A (most efficient) through G (least efficient)
- Use `location-autocomplete` first to find city/department IDs for search filters

## Development

```bash
pnpm run dev    # Watch mode
pnpm run build  # Production build
pnpm start      # Run server
```

## License

MIT
