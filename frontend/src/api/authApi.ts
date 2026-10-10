export interface AuthUser {
  username: string;
  name: string;
  email: string;
  token?: string | null;
}

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message ?? `Request failed (${response.status})`);
  }

  return data as T;
}

export function register(username: string, name: string, email: string, password: string) {
  return request<AuthUser>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ username, name, email, password }),
  });
}

export function login(username: string, password: string) {
  return request<AuthUser>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export function getMe(token: string) {
  return request<AuthUser>("/api/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
}
