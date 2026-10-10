import { NavLink } from "react-router-dom";
import { BarChart3, LayoutDashboard, Wallet, ClipboardList, Star, Settings } from "lucide-react";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/markets", label: "Markets", icon: BarChart3 },
  { to: "/watchlist", label: "Watchlist", icon: Star },
  { to: "/portfolio", label: "Portfolio", icon: Wallet },
  { to: "/orders", label: "Orders", icon: ClipboardList },
];

export function Sidebar() {
  return (
    <aside className="w-full min-h-full flex flex-col p-4">
      <nav className="space-y-1">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-4 px-3 py-2.5 rounded-xl text-sm transition ${
                isActive ? "bg-blue-600/15 text-blue-400" : "text-gray-400 hover:text-white hover:bg-white/5"
              }`
            }
          >
            <Icon aria-hidden="true" className="w-5 h-5 shrink-0" strokeWidth={1.8} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto">
        <button className="w-full flex items-center gap-4 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-white/5">
          <Settings aria-hidden="true" className="w-5 h-5 shrink-0" strokeWidth={1.8} /> Settings
        </button>
      </div>
    </aside>
  );
}