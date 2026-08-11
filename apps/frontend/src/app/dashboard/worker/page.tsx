"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, TrendingUp, ArrowUpRight, X, Fingerprint, Activity } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PulsePayLogo } from "@/components/ui/PulsePayLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

/* ── Accrued balance (static — no fake ticking counters) ── */
function AccruedBalance({ amount }: { amount: number }) {
  const [w, d] = amount.toFixed(2).split(".");
  return (
    <div className="text-mono flex items-end gap-1 leading-none">
      <span className="text-fg-muted text-2xl font-bold">$</span>
      <span className="text-[clamp(2.5rem,6vw,4rem)] font-extrabold text-fg tracking-tight">
        {Number(w).toLocaleString()}
      </span>
      <span className="text-2xl font-bold text-accent">.{d}</span>
    </div>
  );
}

/* ── Cash-out Modal ─────────────────────────────── */
function CashOutModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [pct, setPct] = useState(50);
  const [anchor, setAnchor] = useState("MoneyGram");
  const [processing, setProcessing] = useState(false);

  const total = 1382.22;
  const amount = (total * pct) / 100;
  const fee = amount * 0.0025;
  const net = amount - fee;

  const confirm = async () => {
    setProcessing(true);
    try {
      const ch = new Uint8Array(32); crypto.getRandomValues(ch);
      await navigator.credentials.get({ publicKey: { challenge: ch, rpId: window.location.hostname, userVerification: "preferred" } });
    } catch {}
    await new Promise(r => setTimeout(r, 1000));
    setStep(4);
    setProcessing(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-[var(--bg-sunken)]/80 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="card-base w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Step indicator */}
          <div className="flex gap-1.5 p-5 pb-0">
            {[1, 2, 3].map(s => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  step > s ? "bg-signal" : step === s ? "bg-accent" : "bg-border"
                }`}
              />
            ))}
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="label-xs text-val-blue">{step < 4 ? `Step ${step} of 3` : "Complete"}</p>
                <h3 className="text-lg font-bold text-fg mt-0.5">
                  {["Select Amount", "Fee Preview", "Confirm Passkey", "Done"][step - 1]}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-fg-muted hover:bg-surface-2 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {step === 1 && (
              <div className="space-y-5">
                <p className="text-sm font-medium text-fg-muted">
                  Available: <span className="text-mono font-bold text-fg">${total.toLocaleString()} USDC</span>
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {[25, 50, 75, 100].map(p => (
                    <button
                      key={p}
                      onClick={() => setPct(p)}
                      className={`py-2.5 rounded-xl text-sm font-bold transition-all ${
                        pct === p
                          ? "grad-brand shadow-md"
                          : "bg-surface-2 text-fg-muted hover:text-fg border border-subtle"
                      }`}
                    >
                      {p}%
                    </button>
                  ))}
                </div>
                <div className="bg-surface-2 rounded-2xl p-4 border border-subtle">
                  <p className="label-xs mb-1">Amount to Withdraw</p>
                  <p className="text-mono text-3xl font-extrabold text-fg">${amount.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="w-full grad-brand font-bold py-3 rounded-xl hover:opacity-90 transition-all shadow-md"
                >
                  Continue →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div className="space-y-1">
                  {[
                    { l: "Withdrawal Amount", v: `$${amount.toFixed(2)}`, c: "text-fg" },
                    { l: "Protocol Fee (0.25%)", v: `-$${fee.toFixed(4)}`, c: "text-red-600 dark:text-red-400" },
                  ].map(({ l, v, c }) => (
                    <div key={l} className="flex justify-between py-2.5 border-b border-subtle">
                      <span className="text-sm font-medium text-fg-muted">{l}</span>
                      <span className={`text-sm font-bold text-mono ${c}`}>{v}</span>
                    </div>
                  ))}
                  <div className="flex justify-between py-2.5">
                    <span className="text-sm font-bold text-fg">You Receive</span>
                    <span className="text-lg font-extrabold text-mono text-val-green">${net.toFixed(4)}</span>
                  </div>
                </div>

                <div>
                  <p className="label-xs mb-2">Cash-out Method</p>
                  <div className="grid grid-cols-3 gap-2">
                    {["MoneyGram", "Local Bank", "USDC"].map(a => (
                      <button
                        key={a}
                        onClick={() => setAnchor(a)}
                        className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                          anchor === a
                            ? "grad-brand border-transparent shadow-sm"
                            : "bg-surface-2 text-fg-muted border-subtle hover:text-fg"
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-surface-2 text-fg font-bold py-2.5 rounded-xl hover:bg-surface-3 transition-colors border border-subtle text-sm"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 grad-brand font-bold py-2.5 rounded-xl hover:opacity-90 transition-all text-sm shadow-md"
                  >
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5 text-center">
                <div className="bg-surface-2 rounded-2xl p-6 border border-subtle">
                  <div className="w-14 h-14 grad-brand rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md">
                    <Fingerprint className="w-7 h-7 text-[var(--cta-on)]" />
                  </div>
                  <p className="text-sm font-medium text-fg-muted">
                    Sending <span className="font-bold text-fg text-mono">${net.toFixed(2)}</span> via{" "}
                    <span className="font-bold text-fg">{anchor}</span>
                  </p>
                </div>
                <button
                  onClick={confirm}
                  disabled={processing}
                  className="w-full grad-brand font-bold py-3.5 rounded-xl hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-md"
                >
                  <Fingerprint className="w-5 h-5" />
                  {processing ? "Authorising..." : "Confirm with Passkey"}
                </button>
              </div>
            )}

            {step === 4 && (
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-signal/15 rounded-full flex items-center justify-center mx-auto mb-4 border border-signal/30">
                  <span className="text-val-green text-2xl font-bold">✓</span>
                </div>
                <h3 className="text-lg font-bold text-fg mb-1">Withdrawal Submitted!</h3>
                <p className="text-xs font-medium text-fg-muted mb-6">${net.toFixed(2)} processed via {anchor}.</p>
                <button
                  onClick={onClose}
                  className="grad-brand font-bold px-6 py-2.5 rounded-xl hover:opacity-90 transition-all text-sm shadow-md"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/* ── Streams & History ──────────────────────────── */
const streams = [
  { employer: "Acme Corp", rate: 0.001157, total: 3000, pct: 63, badgeClass: "pill-jade" },
  { employer: "Stellar Labs", rate: 0.002314, total: 6000, pct: 46, badgeClass: "pill-jade" },
];

const history = [
  { date: "Aug 5", amount: 250.0, method: "MoneyGram", status: "Settled" },
  { date: "Jul 28", amount: 500.0, method: "Local Bank", status: "Settled" },
  { date: "Jul 15", amount: 120.5, method: "USDC", status: "Settled" },
];

/* ── Worker Dashboard ───────────────────────────── */
export default function WorkerDashboard() {
  const router = useRouter();
  const [cashout, setCashout] = useState(false);

  return (
    <div className="min-h-screen bg-bg text-fg">
      {/* Header */}
      <header className="bg-bg-elevated sticky top-0 z-40 px-6 h-16 flex items-center justify-between border-b border-border">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
          <PulsePayLogo className="w-8 h-8" size={32} />
          <span>PulsePay</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-bg-sunken rounded-full px-3 py-1 border border-border">
            <span className="w-2 h-2 rounded-full bg-signal animate-master-pulse-scale" />
            <span className="text-xs font-semibold text-fg-muted">Stellar Soroban Testnet</span>
          </div>
          <ThemeToggle />
          <div className="w-8 h-8 grad-brand rounded-full flex items-center justify-center text-[var(--cta-on)] font-bold text-xs shadow-sm cursor-default">
            W
          </div>
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-1.5 text-xs font-semibold text-fg-muted hover:text-fg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* Balance Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card-base rounded-3xl p-8 border border-subtle relative overflow-hidden"
        >
          <div className="relative z-10">
            <span className="label-xs font-bold text-fg-muted">Total Claimable Balance</span>
            <div className="mt-2 mb-3">
              <AccruedBalance amount={1382.22} />
              <p className="text-sm text-fg-muted mt-2">
                Earnings stream continuously on Soroban — claim anytime.
              </p>
            </div>
            <p className="text-sm font-semibold text-signal flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Accruing across 2 active streams
            </p>
            <button
              onClick={() => setCashout(true)}
              className="mt-6 grad-brand font-bold px-6 py-3 rounded-xl hover:opacity-95 transition-opacity flex items-center gap-2 shadow-md text-sm"
            >
              <ArrowUpRight className="w-4 h-4" /> Withdraw Funds
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Streams */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-bold text-fg text-lg font-display">Active Wage Streams</h2>
            {streams.map((s, index) => (
              <motion.div
                key={s.employer}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 * index }}
                className="card-base rounded-2xl p-6 border border-subtle hover:border-border-strong transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 grad-brand rounded-xl flex items-center justify-center text-[var(--cta-on)] font-bold text-sm shadow-sm">
                      {s.employer[0]}
                    </div>
                    <div>
                      <p className="font-bold text-fg text-base">{s.employer}</p>
                      <p className="text-xs font-bold text-fg-muted text-mono">${s.rate.toFixed(6)}/sec</p>
                    </div>
                  </div>
                  <span className="pill-jade inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
                    Streaming
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                  <div className="bg-surface-2 rounded-xl p-3 border border-subtle">
                    <p className="text-mono text-sm font-extrabold text-fg">${s.total.toLocaleString()}</p>
                    <p className="text-[10px] text-fg-muted font-bold uppercase mt-0.5">Total Cap</p>
                  </div>
                  <div className="bg-surface-2 rounded-xl p-3 border border-subtle">
                    <p className="text-mono text-sm font-extrabold text-val-blue">${s.rate.toFixed(6)}</p>
                    <p className="text-[10px] text-fg-muted font-bold uppercase mt-0.5">Per Second</p>
                  </div>
                  <div className="bg-surface-2 rounded-xl p-3 border border-subtle">
                    <p className="text-mono text-sm font-extrabold text-val-green">{s.pct}%</p>
                    <p className="text-[10px] text-fg-muted font-bold uppercase mt-0.5">Elapsed</p>
                  </div>
                </div>

                <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: `${s.pct}%` }} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* History Sidebar */}
          <div className="space-y-4">
            <h2 className="font-bold text-fg text-lg font-display">Withdrawal History</h2>
            {history.map((h, i) => (
              <motion.div
                key={h.date}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * i }}
                className="card-base rounded-2xl p-4 flex items-center justify-between border border-subtle"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-signal/10 rounded-xl flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4 text-val-green" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-fg">{h.method}</p>
                    <p className="text-xs font-medium text-fg-muted">{h.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-extrabold text-mono text-fg">-${h.amount.toFixed(2)}</p>
                  <p className="text-xs font-bold text-val-green">{h.status}</p>
                </div>
              </motion.div>
            ))}

            {/* Summary */}
            <div className="card-base rounded-2xl p-5 border border-subtle">
              <h3 className="text-sm font-bold text-fg mb-3 font-display">Monthly Summary</h3>
              {[
                { l: "Total Streamed", v: "$9,000.00" },
                { l: "Withdrawn", v: "$870.50" },
                { l: "Protocol Fees (0.25%)", v: "$2.18" },
                { l: "Net Received", v: "$868.32" },
              ].map(({ l, v }) => (
                <div key={l} className="flex justify-between py-2 border-b border-subtle last:border-0">
                  <span className="text-xs font-semibold text-fg-muted">{l}</span>
                  <span className="text-xs font-bold text-mono text-fg">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {cashout && <CashOutModal onClose={() => setCashout(false)} />}
    </div>
  );
}
