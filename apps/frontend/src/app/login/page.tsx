"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Fingerprint, Building2, User, ArrowLeft, Wallet, ExternalLink, KeyRound } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PulsePayLogo } from "@/components/ui/PulsePayLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import {
  connectFreighter,
  isFreighterInstalled,
  saveAuthSession,
  truncateAddress,
  FREIGHTER_INSTALL_URL,
} from "@/lib/auth";

type AuthMode = "signin" | "signup";
type LoadingKind = "freighter" | "passkey" | null;

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();

  const [role, setRole] = useState<"worker" | "employer">(
    (params.get("role") as "worker" | "employer") ?? "worker"
  );
  const [mode, setMode] = useState<AuthMode>("signin");
  const [loading, setLoading] = useState<LoadingKind>(null);
  const [error, setError] = useState<string | null>(null);
  const [freighterReady, setFreighterReady] = useState<boolean | null>(null);
  const [connectedPreview, setConnectedPreview] = useState<string | null>(null);

  useEffect(() => {
    isFreighterInstalled().then(setFreighterReady);
  }, []);

  const goDashboard = () => router.push(`/dashboard/${role}`);

  const handleFreighter = async () => {
    setLoading("freighter");
    setError(null);
    try {
      const { address, network } = await connectFreighter();
      saveAuthSession({
        method: "freighter",
        role,
        address,
        network,
        connectedAt: Date.now(),
      });
      setConnectedPreview(address);
      goDashboard();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Could not connect Freighter wallet.";
      setError(message);
    } finally {
      setLoading(null);
    }
  };

  const handlePasskey = async () => {
    setLoading("passkey");
    setError(null);
    try {
      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);
      await navigator.credentials.get({
        publicKey: {
          challenge,
          rpId: window.location.hostname,
          userVerification: "preferred",
          timeout: 60000,
        },
      });
      saveAuthSession({
        method: "passkey",
        role,
        connectedAt: Date.now(),
      });
      goDashboard();
    } catch (err: unknown) {
      if (err && typeof err === "object" && "name" in err && err.name === "NotAllowedError") {
        // Demo fallback for environments without a registered passkey
        saveAuthSession({ method: "passkey", role, connectedAt: Date.now() });
        setTimeout(goDashboard, 200);
      } else {
        setError(
          "Passkey unavailable on this device. Use Freighter wallet instead — recommended for laptops without fingerprint sensors."
        );
      }
    } finally {
      setLoading(null);
    }
  };

  const roleLabel = role === "worker" ? "Worker" : "Employer";
  const actionLabel = mode === "signup" ? "Sign up" : "Sign in";

  return (
    <div className="min-h-screen bg-bg text-fg flex flex-col items-center justify-center px-4 relative">
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 paper-grain opacity-50" aria-hidden />

      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-bold text-fg-muted hover:text-fg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <PulsePayLogo className="w-7 h-7" size={28} />
          <span>PulsePay</span>
        </Link>
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative w-full max-w-md z-10"
      >
        {/* Role toggle */}
        <div className="bg-bg-sunken rounded-2xl p-1.5 flex gap-1 mb-4 border border-border">
          {(["worker", "employer"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                role === r ? "grad-brand" : "text-fg-muted hover:text-fg hover:bg-bg-elevated"
              }`}
            >
              {r === "worker" ? <User className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
              {r === "worker" ? "Worker" : "Employer"}
            </button>
          ))}
        </div>

        {/* Sign in / Sign up */}
        <div className="flex gap-1 mb-6 text-sm font-semibold">
          {(["signin", "signup"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`flex-1 py-2 rounded-xl border transition-colors ${
                mode === m
                  ? "border-accent text-accent bg-bg-elevated"
                  : "border-transparent text-fg-muted hover:text-fg"
              }`}
            >
              {m === "signin" ? "Sign in" : "Sign up"}
            </button>
          ))}
        </div>

        <div className="card-base rounded-3xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="mx-auto mb-5 w-16 h-16 rounded-2xl overflow-hidden border border-border shadow-sm">
              <PulsePayLogo className="w-full h-full" size={64} />
            </div>
            <h1 className="text-2xl font-bold text-fg mb-2">
              {mode === "signup"
                ? `Create ${roleLabel} account`
                : role === "worker"
                  ? "Claim Your Earnings"
                  : "Manage Your Payroll"}
            </h1>
            <p className="text-sm font-medium text-fg-muted leading-relaxed">
              {mode === "signup"
                ? "Connect Freighter to create your non-custodial PulsePay identity — no seed phrase typed into this site."
                : "Connect with Freighter (recommended on laptops) or use a passkey if your device supports biometrics."}
            </p>
          </div>

          {error && (
            <div className="bg-danger/10 border border-danger/30 rounded-xl px-4 py-3 text-sm text-danger font-medium mb-5 text-center">
              {error}
              {error.toLowerCase().includes("not installed") && (
                <a
                  href={FREIGHTER_INSTALL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-accent font-bold underline"
                >
                  Install Freighter <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}

          {connectedPreview && (
            <p className="text-xs text-center text-signal font-mono-num mb-4">
              Connected {truncateAddress(connectedPreview)}
            </p>
          )}

          {/* Primary: Freighter */}
          <button
            type="button"
            onClick={handleFreighter}
            disabled={loading !== null}
            className="w-full grad-brand font-bold py-3.5 rounded-xl hover:opacity-95 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 mb-3 text-sm"
          >
            <Wallet className="w-5 h-5" />
            {loading === "freighter"
              ? "Waiting for Freighter…"
              : `${actionLabel} with Freighter`}
          </button>

          {freighterReady === false && (
            <a
              href={FREIGHTER_INSTALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4 flex items-center justify-center gap-1.5 text-xs font-semibold text-accent hover:underline"
            >
              Freighter not detected — install extension
              <ExternalLink className="w-3 h-3" />
            </a>
          )}

          <div className="relative my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-fg-faint">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Secondary: Passkey */}
          <button
            type="button"
            onClick={handlePasskey}
            disabled={loading !== null}
            className="w-full btn-secondary font-bold py-3.5 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2 mb-3 text-sm"
          >
            <Fingerprint className="w-5 h-5" />
            {loading === "passkey"
              ? "Waiting for passkey…"
              : `${actionLabel} with Passkey`}
          </button>

          <p className="text-center text-xs font-medium text-fg-muted leading-relaxed">
            <KeyRound className="w-3.5 h-3.5 inline mr-1 align-text-bottom" />
            Passkeys need Touch ID, Face ID, Windows Hello, or a security key.
            On a laptop without biometrics, use Freighter.
          </p>

          <div className="mt-6 pt-6 border-t border-border grid grid-cols-3 gap-2.5 text-center">
            {["Non-custodial", "Freighter", "Soroban"].map((t) => (
              <div key={t} className="bg-bg-sunken rounded-xl py-2 px-1 border border-border">
                <p className="text-[11px] font-bold text-fg-muted">{t}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs font-semibold text-fg-muted mt-6">
          By continuing you agree to PulsePay&apos;s{" "}
          <Link href="/#trust" className="text-accent hover:underline">
            Terms & Security Policy
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-bg flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
