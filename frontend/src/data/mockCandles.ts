import type { Candle } from "../types/market";

type Timeframe = "1H" | "1D" | "1W" | "1M" | "1Y" | "5Y";

const settings: Record<Timeframe, { count: number; seconds: number; volatility: number }> = {
  "1H": { count: 60, seconds: 60, volatility: 0.45 },
  "1D": { count: 96, seconds: 15 * 60, volatility: 0.8 },
  "1W": { count: 140, seconds: 60 * 60, volatility: 1.4 },
  "1M": { count: 120, seconds: 6 * 60 * 60, volatility: 2.2 },
  "1Y": { count: 252, seconds: 24 * 60 * 60, volatility: 3.5 },
  "5Y": { count: 260, seconds: 7 * 24 * 60 * 60, volatility: 5.5 },
};

export function generateCandles(base = 1450, timeframe: Timeframe = "1D"): Candle[] {
  const { count, seconds, volatility } = settings[timeframe];
  const candles: Candle[] = [];
  let price = base;
  const now = Math.floor(Date.now() / 1000);

  for (let i = count - 1; i >= 0; i--) {
    const open = price;
    const trend = Math.sin(i / 11) * volatility * 0.8;
    const wave = Math.sin(i / 4.5) * volatility * 0.45;
    const noise = ((i * 17) % 11 - 5) * volatility * 0.12;
    const move = trend + wave + noise;
    const close = Math.max(1, open + move);
    const high = Math.max(open, close) + volatility * (0.8 + (i % 4) * 0.18);
    const low = Math.min(open, close) - volatility * (0.8 + (i % 3) * 0.2);

    candles.push({
      time: now - i * seconds,
      open,
      high,
      low,
      close,
    });

    price = close;
  }

  return candles;
}
