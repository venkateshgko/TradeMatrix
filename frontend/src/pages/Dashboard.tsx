import { Link } from "react-router-dom";
import { Star, ArrowUpRight, TrendingUp, Hand } from "lucide-react";
import { useStocks } from "../hooks/useStocks";

function Sparkline() {
  return <TrendingUp aria-hidden="true" className="w-7 h-7 text-emerald-400" strokeWidth={1.8} />;
}

export function Dashboard() {
  const { data: stocks = [], isLoading } = useStocks();
  const movers = [...stocks].sort((a,b) => b.changePercent-a.changePercent).slice(0,5);
  const watchlist = stocks.slice(0,5);

  return (
    <div className="dashboard-shell space-y-6">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-base text-gray-500">Tuesday, August 11</p>
          <h1 className="text-3xl md:text-4xl font-bold mt-1 flex items-center gap-2">
            <span>Hello Trader!</span>
            <Hand aria-hidden="true" className="w-8 h-8 text-amber-300" strokeWidth={1.8} />
          </h1>
          <p className="text-base text-gray-500 mt-1">Here's what's happening in the markets today.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          ["NIFTY 50","24,680.90","+0.84%"],
          ["SENSEX","80,235.59","+0.71%"],
          ["NASDAQ","21,460.12","+0.42%"],
          ["DOW JONES","39,497.54","+0.41%"],
          ["BTC / USD","$114,820","+1.61%"]
        ].map(([name,value,change]) => (
          <div key={name} className="rounded-xl border border-white/10 bg-[#0d131b] p-5 min-h-[120px]">
            <div className="flex items-center justify-between"><span className="text-sm text-gray-400">{name}</span><Sparkline /></div>
            <div className="text-xl font-semibold mt-2">{value}</div>
            <div className="text-base text-emerald-400 mt-1">{change}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <section className="min-w-0 rounded-xl border border-white/10 bg-[#0d131b] overflow-hidden">
          <div className="px-5 py-4 border-b border-white/10 flex justify-between">
            <div><h2 className="font-semibold">Market Overview</h2><p className="text-xs text-gray-500 mt-0.5">Stocks and major instruments</p></div>
            <Link to="/markets" className="text-sm text-blue-400">View All</Link>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[760px]">
              <div className="grid grid-cols-[1fr_1.25fr_.8fr_.7fr_.75fr_.8fr_30px] gap-3 px-5 py-3 text-xs uppercase tracking-wide text-gray-500 border-b border-white/5">
                <span>Symbol</span><span>Name</span><span>Price</span><span>Change</span><span>Change %</span><span>Volume</span><span />
              </div>
              {isLoading ? <div className="p-8 text-center text-gray-500">Loading markets...</div> :
                stocks.map(stock => (
                  <Link key={stock.symbol} to={`/stock/${stock.symbol}`}
                    className="grid grid-cols-[1fr_1.25fr_.8fr_.7fr_.75fr_.8fr_30px] gap-3 items-center px-5 py-4 border-b border-white/5 hover:bg-white/[0.035]">
                    <span className="font-medium text-sm">{stock.symbol}</span>
                    <span className="text-xs text-gray-400 truncate">{stock.name}</span>
                    <span className="text-sm font-medium">{stock.exchange === "CRYPTO" ? "$" : "₹"}{stock.price.toLocaleString(undefined,{maximumFractionDigits:2})}</span>
                    <span className={stock.change >= 0 ? "text-base text-emerald-400" : "text-base text-red-400"}>{stock.change >= 0 ? "+" : ""}{stock.change.toFixed(2)}</span>
                    <span className={stock.changePercent >= 0 ? "text-base text-emerald-400" : "text-base text-red-400"}>{stock.changePercent >= 0 ? "+" : ""}{stock.changePercent.toFixed(2)}%</span>
                    <span className="text-xs text-gray-400">{(stock.volume/1e6).toFixed(2)}M</span>
                    <Star className="w-4 h-4 text-gray-500" />
                  </Link>
                ))}
            </div>
          </div>
          <Link to="/markets" className="flex justify-center py-3 text-sm text-gray-400 hover:text-white">View All Markets <ArrowUpRight className="w-4 h-4 ml-1" /></Link>
        </section>

        <aside className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-[#0d131b] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/10 flex justify-between"><h2 className="font-semibold">Market Movers</h2><TrendingUp className="w-4 h-4 text-emerald-400" /></div>
            <div className="p-2">{movers.map(s => <Link key={s.symbol} to={`/stock/${s.symbol}`} className="flex justify-between items-center px-2 py-2.5 rounded-lg hover:bg-white/5"><span className="text-sm">{s.symbol}</span><span className="text-sm">{s.exchange === "CRYPTO" ? "$" : "₹"}{s.price.toLocaleString()}</span><span className="text-xs text-emerald-400">{s.changePercent >= 0 ? "+" : ""}{s.changePercent.toFixed(2)}%</span></Link>)}</div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0d131b] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/10 flex justify-between"><h2 className="font-semibold">Watchlist</h2><Link to="/watchlist" className="text-xs text-blue-400">View All</Link></div>
            <div className="p-2">{watchlist.map(s => <Link key={s.symbol} to={`/stock/${s.symbol}`} className="flex items-center gap-2 px-2 py-2.5 rounded-lg hover:bg-white/5"><Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /><span className="flex-1 text-sm">{s.symbol}</span><span className="text-sm">{s.exchange === "CRYPTO" ? "$" : "₹"}{s.price.toLocaleString()}</span><span className={s.changePercent >= 0 ? "text-xs text-emerald-400" : "text-xs text-red-400"}>{s.changePercent >= 0 ? "+" : ""}{s.changePercent.toFixed(2)}%</span></Link>)}</div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#0d131b] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/10 flex justify-between"><h2 className="font-semibold">News</h2><span className="text-xs text-blue-400">View All</span></div>
            <div className="p-4 space-y-4">
              <div><p className="text-sm">Markets open higher as global cues improve</p><span className="text-xs text-gray-500">Market Desk · 5m ago</span></div>
              <div><p className="text-sm">RBI keeps repo rate unchanged</p><span className="text-xs text-gray-500">Economic Desk · 15m ago</span></div>
              <div><p className="text-sm">Global markets mixed ahead of US CPI data</p><span className="text-xs text-gray-500">Global Markets · 30m ago</span></div>
            </div>
          </div>
        </aside>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-white/10 bg-[#0d131b] p-4"><h2 className="font-semibold mb-4">Sector Performance</h2>{[["Nifty Bank","+1.12%"],["Nifty IT","+0.85%"],["Nifty Pharma","+0.42%"],["Nifty Auto","-0.15%"],["Nifty FMCG","-0.33%"]].map(([n,v])=><div key={n} className="flex items-center gap-3 py-1.5 text-sm"><span className="w-24 text-gray-400">{n}</span><div className="h-1.5 flex-1 rounded-full bg-white/5"><div className={v.startsWith("+") ? "h-full w-3/4 rounded-full bg-emerald-500" : "h-full w-1/3 rounded-full bg-red-500"} /></div><span className={v.startsWith("+") ? "text-emerald-400" : "text-red-400"}>{v}</span></div>)}</div>
        <div className="rounded-xl border border-white/10 bg-[#0d131b] p-4"><h2 className="font-semibold mb-4">FII / DII Activity</h2><div className="space-y-3 text-sm"><div className="flex justify-between"><span className="text-gray-400">FII Net Buy</span><span className="text-emerald-400">+1,245.30</span></div><div className="flex justify-between"><span className="text-gray-400">DII Net Buy</span><span className="text-emerald-400">+856.70</span></div><div className="pt-3 border-t border-white/10 flex justify-between"><span>Total Net Buy</span><span className="text-emerald-400">+2,102.00</span></div></div><p className="text-xs text-gray-600 mt-4">Illustrative dashboard data</p></div>
        <div className="rounded-xl border border-white/10 bg-[#0d131b] p-4"><h2 className="font-semibold mb-4">Commodity Prices</h2>{[["Gold","₹69,850","+0.32%"],["Silver","₹82,150","-0.21%"],["Crude Oil","$78.45","+1.02%"],["Natural Gas","$2.35","-0.64%"]].map(([n,p,c])=><div key={n} className="flex justify-between py-1.5 text-sm"><span className="text-gray-400">{n}</span><span>{p}</span><span className={c.startsWith("+") ? "text-emerald-400" : "text-red-400"}>{c}</span></div>)}</div>
      </div>

      <footer className="py-5 text-center text-xs text-gray-600">© 2026 TradeMatrix · Privacy Policy · Terms of Service · Contact Us</footer>
    </div>
  );
}
