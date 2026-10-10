import type { Stock } from "../types/market";

export const mockStocks: Stock[] = [
  { symbol: "RELIANCE", name: "Reliance Industries", exchange: "NSE", price: 1450.2, change: 18.5, changePercent: 1.29, volume: 18400000, marketCap: 1960000000000, sector: "Energy" },
  { symbol: "TCS", name: "Tata Consultancy Services", exchange: "NSE", price: 3284.65, change: -22.4, changePercent: -0.68, volume: 6200000, marketCap: 1190000000000, sector: "Technology" },
  { symbol: "HDFCBANK", name: "HDFC Bank", exchange: "NSE", price: 1942.3, change: 14.1, changePercent: 0.73, volume: 9100000, marketCap: 1480000000000, sector: "Banking" },
  { symbol: "INFY", name: "Infosys", exchange: "NSE", price: 1682.4, change: 31.2, changePercent: 1.89, volume: 7600000, marketCap: 700000000000, sector: "Technology" },
  { symbol: "ICICIBANK", name: "ICICI Bank", exchange: "NSE", price: 1298.1, change: -5.8, changePercent: -0.45, volume: 8400000, marketCap: 910000000000, sector: "Banking" },
  { symbol: "AAPL", name: "Apple Inc.", exchange: "NASDAQ", price: 228.7, change: 2.15, changePercent: 0.95, volume: 32000000, marketCap: 3500000000000, sector: "Technology" },
  { symbol: "MSFT", name: "Microsoft", exchange: "NASDAQ", price: 521.4, change: -1.8, changePercent: -0.34, volume: 15000000, marketCap: 3880000000000, sector: "Technology" },
  { symbol: "BTC", name: "Bitcoin", exchange: "CRYPTO", price: 114820, change: 1820, changePercent: 1.61, volume: 42000000000, marketCap: 2280000000000, sector: "Crypto" }
];