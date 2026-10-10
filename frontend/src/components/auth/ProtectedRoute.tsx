import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getMe } from "../../api/authApi";
import { useAuthStore } from "../../store/authStore";

export function ProtectedRoute() {
  const token = useAuthStore((s) => s.token);
  const setSession = useAuthStore((s) => s.setSession);
  const clearSession = useAuthStore((s) => s.clearSession);
  const location = useLocation();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;

    if (!token) {
      setChecking(false);
      return;
    }

    getMe(token)
      .then((user) => {
        if (!active) return;
        setSession(
          {
            username: user.username,
            name: user.name,
            email: user.email,
          },
          token
        );
      })
      .catch(() => {
        if (!active) return;
        clearSession();
      })
      .finally(() => {
        if (active) setChecking(false);
      });

    return () => {
      active = false;
    };
  }, [token, setSession, clearSession]);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#080b10] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
            <span className="text-xl font-bold">⚡</span>
          </div>
          <p className="text-gray-400">Checking your TradeMatrix session...</p>
        </div>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
