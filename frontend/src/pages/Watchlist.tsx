import { useStocks } from "../hooks/useStocks";
import { StockList } from "../components/market/StockList";

export function Watchlist() {
  const { data: stocks = [] } = useStocks();
  return (
    <div className="space-y-5 max-w-[1600px] mx-auto">
      <h1 className="text-2xl font-bold">Watchlist</h1>
      <StockList stocks={stocks.slice(0, 5)} />
    </div>
  );
}