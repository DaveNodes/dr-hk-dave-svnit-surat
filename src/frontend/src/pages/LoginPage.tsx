import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { GraduationCap, Lock, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) navigate({ to: "/admin" });
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const ok = login(username, password);
    setIsLoading(false);
    if (!ok) setError("Invalid username or password.");
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo / brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 border border-gold/40 mb-4">
            <GraduationCap className="w-8 h-8 text-gold" />
          </div>
          <h1 className="font-display text-3xl font-bold text-white">
            Admin Portal
          </h1>
          <p className="text-white/60 mt-1 text-sm">
            Dr. HK Dave — SVNIT Surat
          </p>
        </div>

        <Card className="border-navy-light/30 shadow-2xl bg-[oklch(0.2_0.07_265/0.95)] backdrop-blur">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg font-semibold text-center">
              Sign In
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="username" className="text-white/80 text-sm">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    id="username"
                    data-ocid="login.input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-gold/60 focus:ring-gold/30"
                    autoComplete="username"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-white/80 text-sm">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    id="password"
                    data-ocid="login.input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••"
                    className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-gold/60 focus:ring-gold/30"
                    autoComplete="current-password"
                    required
                  />
                </div>
              </div>

              {error && (
                <p
                  data-ocid="login.error_state"
                  className="text-red-400 text-sm bg-red-400/10 rounded-md px-3 py-2 border border-red-400/20"
                >
                  {error}
                </p>
              )}

              <Button
                type="submit"
                data-ocid="login.submit_button"
                disabled={isLoading}
                className="w-full bg-gold text-navy font-semibold hover:bg-gold-light transition-colors"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-white/40 text-xs mt-6">
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white/60"
          >
            Built with love using caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
