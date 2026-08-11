"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Building2, ArrowLeft } from "lucide-react";
import { PulsePayLogo } from "@/components/ui/PulsePayLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CashOutPage() {
  const router = useRouter();
  const [step, setStep] = useState<"input" | "processing" | "success">("input");
  const [error, setError] = useState<string | null>(null);

  const handleCashOut = async () => {
    setStep("processing");
    try {
      const tomlRes = await fetch("https://testanchor.stellar.org/.well-known/stellar.toml");
      const tomlText = await tomlRes.text();

      const authEndpoint = tomlText.match(/WEB_AUTH_ENDPOINT="(.*?)"/)?.[1];
      const transferServer = tomlText.match(/TRANSFER_SERVER_SEP0024="(.*?)"/)?.[1];

      if (!authEndpoint || !transferServer) {
        throw new Error("Could not locate SEP-24 endpoints from Anchor TOML.");
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStep("success");
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to initiate withdrawal via Anchor";
      setError(message);
      setStep("input");
    }
  };

  return (
    <div className="min-h-screen bg-bg text-fg flex flex-col items-center justify-center p-6 relative">
      <div className="absolute inset-0 paper-grain opacity-40" aria-hidden />

      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
        <Link
          href="/dashboard/worker"
          className="flex items-center gap-2 text-sm font-bold text-fg-muted hover:text-fg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <PulsePayLogo className="w-7 h-7" size={28} />
          <span>PulsePay</span>
        </Link>
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="card-base rounded-3xl overflow-hidden shadow-xl p-8">
          <AnimatePresence mode="wait">
            {step === "input" && (
              <motion.div
                key="input"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-fg">Withdraw Funds</h2>
                  <p className="text-fg-muted text-sm font-medium">
                    Via Stellar SEP-24 (testanchor.stellar.org)
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-bg-sunken border border-border space-y-2">
                  <p className="label-xs font-bold text-fg-muted">Available to Claim</p>
                  <p className="text-4xl font-extrabold text-mono text-fg tracking-tight">
                    $142.50 <span className="text-lg text-accent font-bold">USDC</span>
                  </p>
                  <p className="text-xs font-semibold text-fg-muted pt-2 border-t border-border mt-3">
                    * 0.25% protocol fee will be deducted automatically
                  </p>
                </div>

                {error && (
                  <div className="bg-danger/10 border border-danger/30 rounded-xl px-4 py-3 text-sm text-danger font-medium">
                    {error}
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center gap-3.5 p-4 rounded-xl border border-border bg-bg-elevated hover:border-border-strong cursor-pointer transition-colors">
                    <Building2 className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-bold text-sm text-fg">Bank Transfer (ACH / Fiat)</p>
                      <p className="text-xs font-medium text-fg-muted">
                        Powered by SEP-24 Stellar Anchors
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    className="flex-1 btn-secondary py-3 rounded-xl text-sm"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 grad-brand font-bold py-3 rounded-xl hover:opacity-95 transition-opacity text-sm"
                    onClick={handleCashOut}
                  >
                    Confirm →
                  </button>
                </div>
              </motion.div>
            )}

            {step === "processing" && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="py-12 flex flex-col items-center text-center space-y-6"
              >
                <div className="w-14 h-14 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-fg">Connecting to Stellar Anchor...</h3>
                  <p className="text-sm font-medium text-fg-muted max-w-[260px] mx-auto">
                    Negotiating SEP-10 Auth & SEP-24 interactive URL
                  </p>
                </div>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-6 flex flex-col items-center text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-signal/15 flex items-center justify-center text-signal ring-1 ring-signal/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-2xl font-bold text-fg">Withdrawal Initiated!</h3>
                  <p className="text-fg-muted text-sm font-medium">
                    Funds processed via testanchor.stellar.org.
                  </p>
                </div>
                <button
                  className="w-full grad-brand font-bold py-3 rounded-xl hover:opacity-95 transition-opacity text-sm"
                  onClick={() => router.push("/dashboard/worker")}
                >
                  Return to Dashboard
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
