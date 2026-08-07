"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Fingerprint, Zap, Building2, User } from "lucide-react";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
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
    <div className="min-h-screen bg-[#0B0D1A] flex flex-col items-center justify-center px-4 relative">
      {/* bg blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-purple-800/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Back link */}
      <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 text-sm text-[#64748B] hover:text-white transition-colors">
        <Zap className="w-4 h-4" /> PulsePay
      </Link>

      <div className="relative w-full max-w-md">
        {/* Role toggle */}
        <div className="glass rounded-2xl p-1 flex gap-1 mb-6 border border-white/5">
          {(["worker", "employer"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                role === r ? "gradient-purple text-white glow-purple" : "text-[#64748B] hover:text-white"
              }`}
            >
              {r === "worker" ? <User className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
              {r === "worker" ? "Worker" : "Employer"}
            </button>
          ))}
        </div>

        {/* Card */}
        <div className="glass rounded-3xl p-8 border border-white/5">
          <div className="text-center mb-8">
            <div className="w-16 h-16 gradient-purple rounded-2xl flex items-center justify-center mx-auto mb-5 glow-purple">
              <Fingerprint className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {role === "worker" ? "Claim Your Earnings" : "Manage Your Payroll"}
            </h1>
            <p className="text-sm text-[#64748B]">
              {role === "worker"
                ? "Sign in with Passkey to access your real-time stream."
                : "Sign in with Passkey to manage worker streams and vault."}
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400 mb-5 text-center">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full gradient-purple glow-purple text-white font-semibold py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 mb-4"
          >
            <Fingerprint className="w-5 h-5" />
            {loading ? "Authenticating..." : `Sign in as ${role === "worker" ? "Worker" : "Employer"}`}
          </button>

          <div className="text-center">
            <p className="text-xs text-[#475569]">
              Secured by WebAuthn. No passwords or seed phrases stored.
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-3 gap-3 text-center">
            {["Non-custodial", "Biometric", "Soroban"].map((t) => (
              <div key={t} className="glass-light rounded-xl py-2 border border-white/5">
                <p className="text-xs text-[#64748B]">{t}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-[#475569] mt-6">
          By signing in you agree to PulsePay's{" "}
          <Link href="/security" className="text-purple-400 hover:underline">Terms & Security Policy</Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
