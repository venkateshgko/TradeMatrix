import { useParams } from "react-router-dom";
import { useStock } from "../hooks/useStocks";
import { TradingChart } from "../components/charts/TradingChart";
import { BuySellPanel } from "../components/trading/BuySellPanel";
import { useTradingStore } from "../store/tradingStore";

export function StockDetails() {
  const { symbol = "RELIANCE" } = useParams();
  const { data: stock, isLoading } = useStock(symbol);
  const timeframe = useTradingStore((s) => s.timeframe) as "1H" | "1D" | "1W" | "1M" | "1Y" | "5Y";
  const setTimeframe = useTradingStore((s) => s.setTimeframe);

  if (isLoading || !stock) return <div className="text-gray-500">Loading {symbol}...</div>;

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{stock.symbol}</h1>
            <span className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-400">{stock.exchange}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">{stock.name}</p>
          <div className="flex items-baseline gap-3 mt-3">
            <span className="text-3xl font-bold">₹{stock.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            <span className={stock.changePercent >= 0 ? "text-emerald-400" : "text-red-400"}>
              {stock.change >= 0 ? "+" : ""}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        <div className="flex gap-1 p-1 rounded-xl bg-white/[0.04]">
          {["1H", "1D", "1W", "1M", "1Y", "5Y"].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1.5 rounded-lg text-xs ${timeframe === tf ? "bg-white/10 text-white" : "text-gray-500"}`}
            >{tf}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-3">
          <TradingChart basePrice={stock.price} timeframe={timeframe} />
        </div>
        <BuySellPanel symbol={stock.symbol} price={stock.price} />
      </div>
    </div>
  );
}