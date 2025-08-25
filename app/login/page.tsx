"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  const router = useRouter();
  const { signInUser } = useUserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    const result = await signInUser(email, password);
    setIsSubmitting(false);

    if (!result.success || !result.data?.session) {
      setError(result.error ?? "Invalid credentials");
      return;
    }

    const accessToken = result.data.session.access_token;
    const expiresAt = result.data.session.expires_at; // seconds since epoch

    // Set cookies for token and expiry (httpOnly cannot be set from client)
    const expiresDate = expiresAt ? new Date(expiresAt * 1000) : undefined;
    document.cookie = `authToken=${accessToken}; path=/; ${expiresDate ? `expires=${expiresDate.toUTCString()};` : ""}`;
    if (expiresDate) {
      document.cookie = `authExpiresAt=${expiresAt}; path=/; expires=${expiresDate.toUTCString()};`;
    }

    router.replace("/dashboard");
  };

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-6 py-16">
      <div>
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="text-muted-foreground">Access your dashboard</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;



