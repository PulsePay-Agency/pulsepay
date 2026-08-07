"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Zap, LogOut, TrendingUp, ArrowUpRight, X, Fingerprint, Activity } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { Sun, Moon } from "lucide-react";
import Link from "next/link";

/* ── Ticker ─────────────────────────────────────── */
function LiveBalance({ rate }: { rate: number }) {
  const [v, setV] = useState(1382.219143);
  const t = useRef(Date.now());
  useEffect(() => {
    let id: number;
    const loop = () => {
      const now = Date.now();
      setV(b => b + rate * ((now - t.current) / 1000));
      t.current = now;
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [rate]);
  const [w, d] = v.toFixed(6).split(".");
  return (
    <div className="text-mono flex items-end gap-1 leading-none">
      <span className="text-[var(--fg-muted)] text-2xl font-medium">$</span>
      <span className="text-[clamp(2.5rem,6vw,4rem)] font-bold text-[var(--fg)] tracking-tight">{Number(w).toLocaleString()}</span>
      <span className="text-2xl font-bold grad-brand-text">.{d}</span>
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-end sm:items-center justify-center z-50 p-4">
      <div className="card w-full max-w-md rounded-4xl border-subtle animate-slide-in-right shadow-lift overflow-hidden">
        {/* Step bar */}
        <div className="flex gap-1.5 p-5 pb-0">
          {[1,2,3].map(s => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                step > s ? "bg-jade-400" : step === s ? "grad-brand" : "bg-[var(--surface-3)]"
              }`}
            />
          ))}
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="label-xs text-ink-400">{step < 4 ? `Step ${step} of 3` : "Complete"}</p>
              <h3 className="text-lg font-bold text-[var(--fg)] mt-0.5">
                {["Select Amount","Fee Preview","Confirm","Done"][step - 1]}
              </h3>
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-2)] transition-all">
              <X className="w-4 h-4" />
            </button>
          </div>

          {step === 1 && (
            <div className="space-y-5">
              <p className="text-sm text-[var(--fg-muted)]">Available: <span className="text-mono font-semibold text-[var(--fg)]">${total.toLocaleString()} USDC</span></p>
              <div className="grid grid-cols-4 gap-2">
                {[25,50,75,100].map(p => (
                  <button key={p} onClick={() => setPct(p)}
                    className={`py-2.5 rounded-2xl text-sm font-semibold transition-all ${pct === p ? "grad-brand text-white glow-ink" : "bg-[var(--surface-2)] text-[var(--fg-muted)] hover:text-[var(--fg)]"}`}>
                    {p}%
                  </button>
                ))}
              </div>
              <div className="bg-[var(--surface-2)] rounded-2xl p-5">
                <p className="label-xs mb-2">Amount to Withdraw</p>
                <p className="text-mono text-3xl font-bold text-[var(--fg)]">${amount.toFixed(2)}</p>
              </div>
              <button onClick={() => setStep(2)} className="w-full grad-brand glow-ink text-white font-semibold py-3.5 rounded-2xl hover:opacity-90 interactive">
                Continue →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="space-y-1">
                {[
                  { l: "Withdrawal Amount", v: `$${amount.toFixed(2)}`, c: "text-[var(--fg)]" },
                  { l: "Protocol Fee (0.25%)", v: `-$${fee.toFixed(4)}`, c: "text-red-400" },
                ].map(({ l, v, c }) => (
                  <div key={l} className="flex justify-between py-3 border-b border-subtle">
                    <span className="text-sm text-[var(--fg-muted)]">{l}</span>
                    <span className={`text-sm font-semibold text-mono ${c}`}>{v}</span>
                  </div>
                ))}
                <div className="flex justify-between py-3">
                  <span className="text-sm text-[var(--fg-muted)]">You Receive</span>
                  <span className="text-lg font-bold text-mono text-jade-400">${net.toFixed(4)}</span>
                </div>
              </div>
              <div>
                <p className="label-xs mb-3">Cash-out Method</p>
                <div className="grid grid-cols-3 gap-2">
                  {["MoneyGram","Local Bank","USDC"].map(a => (
                    <button key={a} onClick={() => setAnchor(a)}
                      className={`py-3 rounded-2xl text-xs font-semibold transition-all ${anchor === a ? "grad-brand text-white" : "bg-[var(--surface-2)] text-[var(--fg-muted)] hover:text-[var(--fg)]"}`}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 bg-[var(--surface-2)] text-[var(--fg)] font-semibold py-3 rounded-2xl hover:bg-[var(--surface-3)] transition-colors">Back</button>
                <button onClick={() => setStep(3)} className="flex-1 grad-brand glow-ink text-white font-semibold py-3 rounded-2xl hover:opacity-90 interactive">Continue →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="bg-[var(--surface-2)] rounded-3xl p-8 text-center">
                <div className="w-16 h-16 grad-brand rounded-3xl flex items-center justify-center mx-auto mb-4 glow-ink animate-pulse2">
                  <Fingerprint className="w-8 h-8 text-white" />
                </div>
                <p className="text-sm text-[var(--fg-muted)]">
                  Sending <span className="font-bold text-[var(--fg)] text-mono">${net.toFixed(2)}</span> via <span className="font-bold text-[var(--fg)]">{anchor}</span>
                </p>
              </div>
              <button onClick={confirm} disabled={processing}
                className="w-full grad-brand glow-ink text-white font-semibold py-4 rounded-2xl hover:opacity-90 interactive disabled:opacity-50 flex items-center justify-center gap-2">
                <Fingerprint className="w-5 h-5" />
                {processing ? "Authorising..." : "Confirm with Passkey"}
              </button>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-jade-500/15 rounded-full flex items-center justify-center mx-auto mb-5 glow-jade">
                <span className="text-jade-400 text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-bold text-[var(--fg)] mb-2">Submitted!</h3>
              <p className="text-sm text-[var(--fg-muted)] mb-8">${net.toFixed(2)} is being routed via {anchor}.</p>
              <button onClick={onClose} className="grad-brand glow-ink text-white font-semibold px-8 py-3 rounded-2xl hover:opacity-90 interactive">
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Streams data ───────────────────────────────── */
const streams = [
  { employer: "Acme Corp",    rate: 0.001157, total: 3000, pct: 63, color: "from-ink-600 to-ink-400" },
  { employer: "Stellar Labs", rate: 0.002314, total: 6000, pct: 46, color: "from-violet-700 to-violet-400" },
];

const history = [
  { date: "Aug 5", amount: 250.00, method: "MoneyGram", status: "Settled" },
  { date: "Jul 28", amount: 500.00, method: "Local Bank", status: "Settled" },
  { date: "Jul 15", amount: 120.50, method: "USDC", status: "Settled" },
];

/* ── Page ───────────────────────────────────────── */
export default function WorkerDashboard() {
  const router = useRouter();
  const { theme, toggle } = useTheme();
  const [cashout, setCashout] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--surface-0)]">
      {/* Header */}
      <header className="glass border-b border-subtle px-6 h-16 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-base tracking-tight">
          <span className="w-7 h-7 grad-brand rounded-[10px] flex items-center justify-center glow-ink">
            <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
          </span>
          PulsePay
        </Link>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-[var(--surface-2)] rounded-full px-3 py-1.5 border border-subtle">
            <span className="w-1.5 h-1.5 rounded-full bg-jade-400 animate-pulse2" />
            <span className="text-xs font-medium text-[var(--fg-muted)]">Soroban Testnet</span>
          </div>
          <button onClick={toggle} className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-2)] transition-all">
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <div className="w-8 h-8 grad-brand rounded-full flex items-center justify-center text-white font-bold text-sm glow-ink cursor-default">W</div>
          <button onClick={() => router.push("/")} className="flex items-center gap-1.5 text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* Balance Hero */}
        <div className="card rounded-4xl p-8 noise relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-ink-500/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="relative">
            <p className="label-xs mb-4">Total Claimable Balance</p>
            <LiveBalance rate={0.003472} />
            <p className="text-sm text-[var(--fg-muted)] mt-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-jade-400" />
              +$0.003472 / sec · 2 active streams
            </p>
            <button
              onClick={() => setCashout(true)}
              className="mt-6 grad-brand glow-ink text-white font-semibold px-7 py-3.5 rounded-2xl hover:opacity-90 interactive flex items-center gap-2"
            >
              <ArrowUpRight className="w-4 h-4" /> Withdraw Funds
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Streams */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-bold text-[var(--fg)] text-lg">Active Streams</h2>
            {streams.map(s => (
              <div key={s.employer} className="card rounded-3xl p-6 group hover:shadow-card-dark hover:-translate-y-0.5 transition-all">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold bg-gradient-to-br ${s.color}`}>
                      {s.employer[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-[var(--fg)]">{s.employer}</p>
                      <p className="text-xs text-[var(--fg-faint)] text-mono">${s.rate.toFixed(6)}/sec</p>
                    </div>
                  </div>
                  <span className="pill pill-jade">
                    <span className="w-1.5 h-1.5 rounded-full bg-jade-400 animate-pulse" />
                    Streaming
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { l: "Total",  v: `$${s.total.toLocaleString()}`, c: "text-[var(--fg)]" },
                    { l: "Rate",   v: `$${s.rate.toFixed(6)}/s`,      c: "grad-brand-text" },
                    { l: "Elapsed", v: `${s.pct}%`,                    c: "text-jade-400" },
                  ].map(({ l, v, c }) => (
                    <div key={l} className="bg-[var(--surface-2)] rounded-2xl p-3.5 text-center">
                      <p className={`text-mono text-sm font-bold ${c}`}>{v}</p>
                      <p className="text-[10px] text-[var(--fg-faint)] mt-1 uppercase tracking-wide">{l}</p>
                    </div>
                  ))}
                </div>
                <div className="h-2 rounded-full bg-[var(--surface-3)] overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${s.color} transition-all`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <h2 className="font-bold text-[var(--fg)] text-lg">History</h2>
            {history.map(h => (
              <div key={h.date} className="card rounded-2xl p-4 flex items-center justify-between group hover:shadow-card-dark transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-jade-500/12 rounded-xl flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4 text-jade-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--fg)]">{h.method}</p>
                    <p className="text-xs text-[var(--fg-faint)]">{h.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-mono text-[var(--fg)]">-${h.amount.toFixed(2)}</p>
                  <p className="text-xs text-jade-400">{h.status}</p>
                </div>
              </div>
            ))}

            {/* Summary card */}
            <div className="card rounded-3xl p-5">
              <h3 className="text-sm font-semibold text-[var(--fg)] mb-4">Monthly Summary</h3>
              {[
                { l: "Total Streamed", v: "$9,000.00" },
                { l: "Withdrawn",      v: "$870.50" },
                { l: "Protocol Fees",  v: "$2.18" },
                { l: "Net Received",   v: "$868.32" },
              ].map(({ l, v }) => (
                <div key={l} className="flex justify-between py-2.5 border-b border-subtle last:border-0">
                  <span className="text-xs text-[var(--fg-muted)]">{l}</span>
                  <span className="text-xs font-semibold text-mono text-[var(--fg)]">{v}</span>
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
