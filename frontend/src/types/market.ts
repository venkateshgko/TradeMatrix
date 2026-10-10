export interface Stock {
  symbol: string;
  name: string;
  exchange: "NSE" | "BSE" | "NASDAQ" | "NYSE" | "CRYPTO";
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  sector: string;
}

export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface Order {
  id: string;
  symbol: string;
  side: "BUY" | "SELL";
  quantity: number;
  price: number;
  status: "EXECUTED" | "PENDING" | "CANCELLED";
  createdAt: string;
}

export interface Position {
  symbol: string;
  quantity: number;
  averagePrice: number;
  ltp: number;
}