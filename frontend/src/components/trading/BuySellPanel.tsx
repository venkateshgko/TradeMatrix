import { useState } from "react";

export function BuySellPanel({ symbol, price }: { symbol: string; price: number }) {
  const [side, setSide] = useState<"BUY" | "SELL">("BUY");
  const [quantity, setQuantity] = useState(1);

  const safeQuantity = Number.isFinite(quantity) ? Math.max(1, quantity) : 1;
  const total = safeQuantity * price;

  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex gap-1 p-1 rounded-xl bg-white/[0.04] mb-4">
        <button
          onClick={() => setSide("BUY")}
          className={`flex-1 min-w-0 py-2 rounded-lg text-sm font-medium ${
            side === "BUY" ? "bg-emerald-600 text-white" : "text-gray-400"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setSide("SELL")}
          className={`flex-1 min-w-0 py-2 rounded-lg text-sm font-medium ${
            side === "SELL" ? "bg-red-600 text-white" : "text-gray-400"
          }`}
        >
          Sell
        </button>
      </div>

      <div className="space-y-3 min-w-0">
        <div>
          <label className="text-xs text-gray-500">Instrument</label>
          <div className="mt-1 px-3 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-sm truncate">
            {symbol}
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-500">Quantity</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => {
              const value = Number(e.target.value);
              setQuantity(Number.isFinite(value) && value > 0 ? value : 1);
            }}
            className="mt-1 w-full min-w-0 px-3 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] outline-none focus:border-blue-500/60"
          />
        </div>

        <div className="min-w-0 rounded-xl bg-white/[0.03] border border-white/5 p-3">
          <div className="flex items-start justify-between gap-3">
            <span className="text-xs text-gray-500 shrink-0">Estimated value</span>
            <span className="text-sm text-white font-medium text-right break-all">
              ₹{total.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>

        <button
          className={`w-full min-w-0 py-3 rounded-xl font-semibold truncate ${
            side === "BUY"
              ? "bg-emerald-600 hover:bg-emerald-500"
              : "bg-red-600 hover:bg-red-500"
          }`}
        >
          {side} {symbol}
        </button>
      </div>
    </div>
  );
}
