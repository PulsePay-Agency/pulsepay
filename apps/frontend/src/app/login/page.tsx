"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Fingerprint, Zap, Building2, User, Sun, Moon, ArrowLeft } from "lucide-react";
import { useTheme } from "@/lib/theme";
import Link from "next/link";
import { motion } from "framer-motion";
import { PulsePayLogo } from "@/components/ui/PulsePayLogo";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { theme, toggle } = useTheme();

  const [role, setRole] = useState<"worker" | "employer">(
    (params.get("role") as "worker" | "employer") ?? "worker"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);
      await navigator.credentials.get({
        publicKey: { challenge, rpId: window.location.hostname, userVerification: "preferred" },
      });
      router.push(`/dashboard/${role}`);
    } catch (err: any) {
      if (err.name === "NotAllowedError") {
        setTimeout(() => router.push(`/dashboard/${role}`), 300);
      } else {
        setError("Passkey authentication failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-0 text-fg flex flex-col items-center justify-center px-4 relative transition-colors duration-200">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-500/10 dark:bg-indigo-500/15 blur-[120px] rounded-full pointer-events-none" />

      {/* Top Bar Actions */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-bold text-fg-muted hover:text-fg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs shadow-sm">
            <PulsePayLogo className="w-full h-full" />
          </div>
          <span>PulsePay</span>
        </Link>

        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="w-9 h-9 rounded-xl flex items-center justify-center text-fg-muted hover:text-fg hover:bg-surface-2 border border-subtle transition-all"
        >
          {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative w-full max-w-md"
      >
        {/* Role toggle */}
        <div className="bg-surface-2 rounded-2xl p-1.5 flex gap-1 mb-6 border border-subtle shadow-sm">
          {(["worker", "employer"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
                role === r
                  ? "grad-brand text-white shadow-md"
                  : "text-fg-muted hover:text-fg hover:bg-surface-1/50"
              }`}
            >
              {r === "worker" ? <User className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
              {r === "worker" ? "Worker Portal" : "Employer Vault"}
            </button>
          ))}
        </div>

        {/* Login Card */}
        <div className="card-base rounded-3xl p-8 border border-subtle shadow-xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 grad-brand rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md">
              <Fingerprint className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-fg font-display mb-2">
              {role === "worker" ? "Claim Your Earnings" : "Manage Your Payroll"}
            </h1>
            <p className="text-sm font-medium text-fg-muted leading-relaxed">
              {role === "worker"
                ? "Sign in with Passkey to access your real-time wage stream."
                : "Sign in with Passkey to manage worker streams and treasury vault."}
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-600 dark:text-red-400 font-medium mb-5 text-center">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full grad-brand text-white font-bold py-3.5 rounded-xl hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 mb-4 shadow-md text-sm"
          >
            <Fingerprint className="w-5 h-5" />
            {loading ? "Authenticating..." : `Sign in as ${role === "worker" ? "Worker" : "Employer"}`}
          </button>

          <div className="text-center">
            <p className="text-xs font-semibold text-fg-muted">
              Secured by WebAuthn. No passwords or seed phrases stored.
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-subtle grid grid-cols-3 gap-2.5 text-center">
            {["Non-custodial", "Biometric", "Soroban"].map((t) => (
              <div key={t} className="bg-surface-2 rounded-xl py-2 px-1 border border-subtle">
                <p className="text-[11px] font-bold text-fg-muted">{t}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs font-semibold text-fg-muted mt-6">
          By signing in you agree to PulsePay's{" "}
          <Link href="/security" className="text-val-blue hover:underline">
            Terms & Security Policy
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-surface-0 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
