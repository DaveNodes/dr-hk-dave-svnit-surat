import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const ADMIN_USER = "admin";
const ADMIN_PASS = "admin";
const SESSION_KEY = "admin_session";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(SESSION_KEY) === "true";
  });

  const login = useCallback((username: string, password: string): boolean => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      localStorage.setItem(SESSION_KEY, "true");
      setIsLoggedIn(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setIsLoggedIn(false);
  }, []);

  useEffect(() => {
    // Sync across tabs
    const handler = () => {
      setIsLoggedIn(localStorage.getItem(SESSION_KEY) === "true");
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
