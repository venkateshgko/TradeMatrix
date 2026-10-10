import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getMe } from "../api/authApi";
import { useAuthStore } from "../store/authStore";
import { Zap } from "lucide-react";

export function AuthCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = params.get("token");

    if (!token) {
      setError("Google sign-in did not return an authentication token.");
      return;
    }

    getMe(token)
      .then((user) => {
        setSession({ email: user.email, name: user.name }, token);
        navigate("/dashboard", { replace: true });
      })
      .catch(() => {
        setError("Google sign-in could not be completed. Please try again.");
      });
  }, [navigate, params, setSession]);

  return (
    <div className="min-h-screen bg-[#080b10] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center">
          <Zap className="w-6 h-6 fill-white" />
        </div>
        {error ? (
          <>
            <h1 className="text-xl font-semibold">Sign-in failed</h1>
            <p className="text-gray-500 mt-2">{error}</p>
            <button
              onClick={() => navigate("/login", { replace: true })}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 font-medium"
            >
              Back to login
            </button>
          </>
        ) : (
          <>
            <h1 className="text-xl font-semibold">Signing you in...</h1>
            <p className="text-gray-500 mt-2">Completing Google authentication.</p>
          </>
        )}
      </div>
    </div>
  );
}
