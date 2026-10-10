import { Link } from "react-router-dom";
import type { Stock } from "../../types/market";
import { useTradingStore } from "../../store/tradingStore";

function formatCompact(value: number) {
  if (value >= 1e12) return `₹${(value / 1e12).toFixed(1)}T`;
  if (value >= 1e9) return `₹${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `₹${(value / 1e6).toFixed(1)}M`;
  return `₹${value.toLocaleString()}`;
}

export function StockList({ stocks }: { stocks: Stock[] }) {
  const setSelectedSymbol = useTradingStore((s) => s.setSelectedSymbol);
  const search = useTradingStore((s) => s.search).toLowerCase();

  const filtered = stocks.filter((s) =>
    `${s.symbol} ${s.name} ${s.exchange}`.toLowerCase().includes(search)
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <h2 className="font-semibold">Markets</h2>
        <span className="text-xs text-gray-500">{filtered.length} instruments</span>
      </div>

      <div className="divide-y divide-white/5">
        {filtered.map((stock) => (
          <Link
            key={stock.symbol}
            to={`/stock/${stock.symbol}`}
            onClick={() => setSelectedSymbol(stock.symbol)}
            className="grid grid-cols-[1.4fr_0.7fr_0.8fr] md:grid-cols-[1.5fr_0.8fr_0.8fr_0.7fr] gap-3 px-4 py-3 hover:bg-white/[0.04] transition"
          >
            <div>
              <div className="font-medium text-sm">{stock.symbol}</div>
              <div className="text-xs text-gray-500 truncate">{stock.name}</div>
            </div>
            <div className="text-right font-medium text-sm">₹{stock.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
            <div className={`text-right text-sm ${stock.changePercent >= 0 ? "text-emerald-400" : "text-red-400"}`}>
              {stock.changePercent >= 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%
            </div>
            <div className="hidden md:block text-right text-xs text-gray-500">{formatCompact(stock.marketCap)}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}