const DEFAULT_BASE_URL = "https://api.stream.estate";

export class StreamEstateClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl?: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl ?? DEFAULT_BASE_URL;
  }

  async get(path: string, params?: Record<string, unknown>): Promise<unknown> {
    const qs = params ? this.buildQueryString(params) : "";
    const url = `${this.baseUrl}${path}${qs ? `?${qs}` : ""}`;
    return this.request(url, { method: "GET" });
  }

  async post(path: string, body: Record<string, unknown>): Promise<unknown> {
    const url = `${this.baseUrl}${path}`;
    return this.request(url, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  async put(path: string, body: Record<string, unknown>): Promise<unknown> {
    const url = `${this.baseUrl}${path}`;
    return this.request(url, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  async del(path: string): Promise<unknown> {
    const url = `${this.baseUrl}${path}`;
    return this.request(url, { method: "DELETE" });
  }

  private async request(url: string, init: RequestInit): Promise<unknown> {
    const res = await fetch(url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": this.apiKey,
        ...((init.headers as Record<string, string>) ?? {}),
      },
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`API ${res.status}: ${res.statusText}${text ? ` — ${text}` : ""}`);
    }

    if (res.status === 204) return { success: true };
    return res.json();
  }

  /**
   * Build query string with PHP-style array notation: param[]=v1&param[]=v2
   * Also maps order params: orderCreatedAt -> order[createdAt]
   */
  buildQueryString(params: Record<string, unknown>): string {
    const parts: string[] = [];

    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null) continue;

      // Map flat order params to API bracket notation
      const orderMatch = key.match(/^order(By)?(.+)$/);
      if (orderMatch && typeof value === "string") {
        const field = orderMatch[2]!;
        const apiField = field.charAt(0).toLowerCase() + field.slice(1);
        parts.push(`order[${apiField}]=${encodeURIComponent(value)}`);
        continue;
      }

      if (Array.isArray(value)) {
        for (const item of value) {
          parts.push(`${encodeURIComponent(key)}[]=${encodeURIComponent(String(item))}`);
        }
        continue;
      }

      if (typeof value === "object") {
        // Handle nested objects like expressions
        for (const [subKey, subVal] of Object.entries(value as Record<string, unknown>)) {
          parts.push(`${encodeURIComponent(key)}[${encodeURIComponent(subKey)}]=${encodeURIComponent(String(subVal))}`);
        }
        continue;
      }

      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    }

    return parts.join("&");
  }

  /**
   * Transform expressions from simplified format to API's nested array format.
   * Input: [{ word: "balcon", includes: true, strict: false }]
   * Output: expressions[0][0][value]=balcon&expressions[0][0][options][includes]=true&expressions[0][0][options][strict]=false
   */
  buildExpressionsParams(
    expressions: Array<{ word: string; includes?: boolean; strict?: boolean }>
  ): Record<string, string> {
    const result: Record<string, string> = {};
    expressions.forEach((expr, groupIdx) => {
      const prefix = `expressions[${groupIdx}][0]`;
      result[`${prefix}[value]`] = expr.word;
      result[`${prefix}[options][includes]`] = String(expr.includes ?? true);
      result[`${prefix}[options][strict]`] = String(expr.strict ?? false);
    });
    return result;
  }
}
