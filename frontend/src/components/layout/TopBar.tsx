import DateTimeDisplay from "../DateTimeDisplay/DateTimeDisplay";
import { Search, Bell, UserCircle, Zap, LogOut } from "lucide-react";
import { useTradingStore } from "../../store/tradingStore";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";
 
export function TopBar() {
  const search = useTradingStore((s) => s.search);
  const setSearch = useTradingStore((s) => s.setSearch);
  const clearSession = useAuthStore((s) => s.clearSession);
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-white/10 bg-[#0b0f14]/95 px-4 md:px-6 flex items-center gap-4 backdrop-blur">
    {/* Main TradeMatrix brand */}
    <div className="flex items-center gap-3 shrink-0">
      <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
        <Zap className="w-6 h-6 text-white fill-white" />
      </div>
      <div className="text-base font-semibold tracking-tight text-white">
        TradeMatrix
      </div>
    </div>

      {/* Main TradeMatrix brand */}
      <div className="relative flex-1 max-w-xl mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search stocks, crypto, indices..."
        className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-3 pl-11 pr-4 outline-none"
        />
      </div>

    {/* Date & Time - right side */}
    <div className="flex items-center ml-auto px-4 shrink-0">
      <DateTimeDisplay />
    </div>

{/* Existing right-side controls */}
<div className="flex items-center gap-3 text-gray-400 shrink-0"></div>

      

      <div className="flex items-center gap-3 text-gray-400 shrink-0">
        <button className="p-2 rounded-lg hover:bg-white/5" aria-label="Notifications">
          <Bell aria-hidden="true" className="w-5 h-5" />
        </button>
        <button
          onClick={() => { clearSession(); navigate("/login"); }}
          title={user?.name ? `Sign out ${user.name}` : "Sign out"}
          className="p-2 rounded-lg hover:bg-white/5"
          aria-label="Sign out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
