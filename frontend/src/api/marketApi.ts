import type { Stock } from "../types/market";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`TradeMatrix API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export async function getStocks(): Promise<Stock[]> {
  return request<Stock[]>("/api/markets");
}

export async function getStock(symbol: string): Promise<Stock> {
  return request<Stock>(`/api/markets/${encodeURIComponent(symbol)}`);
}
