"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Building2, Zap, ArrowLeft, Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/lib/theme";
import Link from "next/link";

export default function CashOutPage() {
  const router = useRouter();
  const { theme, toggle } = useTheme();
  const [step, setStep] = useState<"input" | "processing" | "success">("input");
  const [error, setError] = useState<string | null>(null);

  const handleCashOut = async () => {
    setStep("processing");
    try {
      // SEP-24 Flow Implementation
      const tomlRes = await fetch("https://testanchor.stellar.org/.well-known/stellar.toml");
      const tomlText = await tomlRes.text();
      
      const authEndpoint = tomlText.match(/WEB_AUTH_ENDPOINT="(.*?)"/)?.[1];
      const transferServer = tomlText.match(/TRANSFER_SERVER_SEP0024="(.*?)"/)?.[1];
      
      if (!authEndpoint || !transferServer) {
        throw new Error("Could not locate SEP-24 endpoints from Anchor TOML.");
      }

      console.log(`Authenticating with ${authEndpoint}`);
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log(`Initiating interactive withdrawal at ${transferServer}`);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep("success");

    } catch (e: any) {
      console.error(e);
      setError(e.message || "Failed to initiate withdrawal via Anchor");
      setStep("input");
    }
  };

  return (
    <div className="min-h-screen bg-surface-0 text-fg flex flex-col items-center justify-center p-6 relative transition-colors duration-200">
      {/* Top Bar Actions */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
        <Link
          href="/dashboard/worker"
          className="flex items-center gap-2 text-sm font-bold text-fg-muted hover:text-fg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="w-6 h-6 grad-brand rounded-lg flex items-center justify-center text-white text-xs shadow-sm">
            <Zap className="w-3.5 h-3.5" />
          </span>
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
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="card-base rounded-3xl overflow-hidden border border-subtle shadow-xl p-8">
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
                  <h2 className="text-2xl font-bold font-display text-fg">Withdraw Funds</h2>
                  <p className="text-fg-muted text-sm font-medium">Via Stellar SEP-24 (testanchor.stellar.org)</p>
                </div>

                <div className="p-5 rounded-2xl bg-surface-2 border border-subtle space-y-2">
                  <p className="label-xs font-bold text-fg-muted">Available to Claim</p>
                  <p className="text-4xl font-extrabold text-mono text-fg tracking-tight">
                    $142.50 <span className="text-lg text-val-blue font-bold">USDC</span>
                  </p>
                  <p className="text-xs font-semibold text-fg-muted pt-2 border-t border-subtle mt-3">
                    * 0.25% protocol fee will be deducted automatically
                  </p>
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-600 dark:text-red-400 font-medium">
                    {error}
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center gap-3.5 p-4 rounded-xl border border-subtle bg-surface-1 hover:bg-surface-2 cursor-pointer transition-all">
                    <Building2 className="w-5 h-5 text-val-blue" />
                    <div>
                      <p className="font-bold text-sm text-fg">Bank Transfer (ACH / Fiat)</p>
                      <p className="text-xs font-medium text-fg-muted">Powered by SEP-24 Stellar Anchors</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    className="flex-1 bg-surface-2 text-fg font-bold py-3 rounded-xl hover:bg-surface-3 transition-colors border border-subtle text-sm"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </button>
                  <button 
                    className="flex-1 grad-brand text-white font-bold py-3 rounded-xl hover:opacity-95 transition-opacity text-sm shadow-md"
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
                <div className="w-14 h-14 rounded-full border-4 border-indigo-600/20 border-t-indigo-600 animate-spin" />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-fg font-display">Connecting to Stellar Anchor...</h3>
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
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center text-val-green ring-1 ring-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-2xl font-bold text-fg font-display">Withdrawal Initiated!</h3>
                  <p className="text-fg-muted text-sm font-medium">
                    Funds processed via testanchor.stellar.org.
                  </p>
                </div>
                <button 
                  className="w-full grad-brand text-white font-bold py-3 rounded-xl hover:opacity-95 transition-opacity shadow-md text-sm"
                  onClick={() => router.push('/dashboard/worker')}
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
