import { Navigate, Route, Routes } from "react-router-dom";
import { TradingLayout } from "./layouts/TradingLayout";
import { Dashboard } from "./pages/Dashboard";
import { Markets } from "./pages/Markets";
import { Portfolio } from "./pages/Portfolio";
import { Orders } from "./pages/Orders";
import { Watchlist } from "./pages/Watchlist";
import { StockDetails } from "./pages/StockDetails";
import { AuthPage } from "./pages/AuthPage";
import { AuthCallback } from "./pages/AuthCallback";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/register" element={<AuthPage mode="register" />} />
      <Route path="/auth/callback" element={<AuthCallback />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<TradingLayout />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/stock/:symbol" element={<StockDetails />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
