import { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User, Lock, Mail, UserPlus, LogIn, Zap } from "lucide-react";
import { login, register } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

export function AuthPage({ mode }: { mode: "login" | "register" }) {
  const isRegister = mode === "register";
  const navigate = useNavigate();
  const location = useLocation();
  const setSession = useAuthStore((s) => s.setSession);
const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setBusy(true);

    try {
      const result = isRegister
        ? await register(username, name, email, password)
        : await login(username, password);

      if (!result.token) throw new Error("Authentication token was not returned.");

      setSession(
        {
          username: result.username,
          name: result.name,
          email: result.email,
        },
        result.token
      );

      const destination = (location.state as { from?: string } | null)?.from ?? "/dashboard";
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#080b10] text-white flex items-center justify-center p-5">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Zap aria-hidden="true" className="w-6 h-6 fill-white" />
          </div>
          <span className="text-2xl font-bold">TradeMatrix</span>
        </div>

        <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-[#0b0f14] p-6 space-y-4">
          <div>
            <h1 className="text-2xl font-semibold">{isRegister ? "Create your account" : "Welcome back"}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {isRegister ? "Start building your trading workspace." : "Sign in to continue to TradeMatrix."}
            </p>
          </div>

          <label className="block">
            <span className="text-xs text-gray-500 flex items-center gap-1.5">
              <User aria-hidden="true" className="w-3.5 h-3.5" /> Username
            </span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
              autoComplete="username"
              placeholder="Enter username"
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 outline-none focus:border-blue-500"
            />
          </label>

          {isRegister && (
            <>
              <label className="block">
                <span className="text-xs text-gray-500 flex items-center gap-1.5">
                  <UserPlus aria-hidden="true" className="w-3.5 h-3.5" /> Name
                </span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  minLength={2}
                  autoComplete="name"
                  placeholder="Your name"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 outline-none focus:border-blue-500"
                />
              </label>

              <label className="block">
                <span className="text-xs text-gray-500 flex items-center gap-1.5">
                  <Mail aria-hidden="true" className="w-3.5 h-3.5" /> Email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 outline-none focus:border-blue-500"
                />
              </label>
            </>
          )}

          <label className="block">
            <span className="text-xs text-gray-500 flex items-center gap-1.5">
              <Lock aria-hidden="true" className="w-3.5 h-3.5" /> Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete={isRegister ? "new-password" : "current-password"}
              placeholder="Enter password"
              className="mt-1 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 outline-none focus:border-blue-500"
            />
          </label>

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <button
            disabled={busy}
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 py-3 font-semibold flex items-center justify-center gap-2"
          >
            {isRegister ? <UserPlus aria-hidden="true" className="w-4 h-4" /> : <LogIn aria-hidden="true" className="w-4 h-4" />}
            {busy ? "Please wait..." : isRegister ? "Create account" : "Sign in"}
          </button>

          <p className="text-sm text-center text-gray-500">
            {isRegister ? "Already have an account? " : "New to TradeMatrix? "}
            <Link className="text-blue-400 hover:text-blue-300" to={isRegister ? "/login" : "/register"}>
              {isRegister ? "Sign in" : "Create account"}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
