import { Outlet } from "react-router-dom";
import { TopBar } from "../components/layout/TopBar";
import { Sidebar } from "../components/layout/Sidebar";

export function TradingLayout() {
  return (
    <div className="min-h-screen bg-[#080b10] text-gray-100">
      <TopBar />

      {/* Fixed top bar occupies 64px; content begins below it. */}
      <div className="flex pt-20">
        {/* Fixed sidebar stays below the top bar while the main content scrolls. */}
        <div className="hidden md:block w-72 shrink-0">
          <div className="fixed top-20 bottom-0 w-72 overflow-y-auto border-r border-white/10 bg-[#0b0f14]">
            <Sidebar />
          </div>
        </div>

        <main className="min-w-0 flex-1 p-5 md:p-6 lg:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
