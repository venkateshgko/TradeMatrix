import { useStocks } from "../hooks/useStocks";
import { StockList } from "../components/market/StockList";

export function Markets() {
  const { data: stocks = [], isLoading } = useStocks();

  return (
    <div className="space-y-5 max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-bold">Markets</h1>
        <p className="text-sm text-gray-500 mt-1">Stocks, global equities and crypto.</p>
      </div>
      {isLoading ? <div className="text-gray-500">Loading...</div> : <StockList stocks={stocks} />}
    </div>
  );
}