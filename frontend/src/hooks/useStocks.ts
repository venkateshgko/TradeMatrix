import { useQuery } from "@tanstack/react-query";
import { getStock, getStocks } from "../api/marketApi";

export function useStocks() {
  return useQuery({
    queryKey: ["stocks"],
    queryFn: getStocks,
  });
}

export function useStock(symbol: string) {
  return useQuery({
    queryKey: ["stock", symbol],
    queryFn: () => getStock(symbol),
    enabled: Boolean(symbol),
  });
}