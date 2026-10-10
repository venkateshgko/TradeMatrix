import { create } from "zustand";

type Timeframe = "1H" | "1D" | "1W" | "1M" | "1Y" | "5Y";

interface TradingState {
  selectedSymbol: string;
  timeframe: Timeframe;
  search: string;
  setSelectedSymbol: (symbol: string) => void;
  setTimeframe: (timeframe: Timeframe) => void;
  setSearch: (search: string) => void;
}

export const useTradingStore = create<TradingState>((set) => ({
  selectedSymbol: "RELIANCE",
  timeframe: "1D",
  search: "",
  setSelectedSymbol: (selectedSymbol) => set({ selectedSymbol }),
  setTimeframe: (timeframe) => set({ timeframe }),
  setSearch: (search) => set({ search }),
}));