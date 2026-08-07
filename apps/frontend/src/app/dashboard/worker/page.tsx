"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Zap, TrendingUp, ArrowUpRight, Clock, LogOut, Fingerprint, X, ChevronDown } from "lucide-react";
import Link from "next/link";

/* ─── Live Balance Ticker ─────────────────────────── */
function BalanceTicker({ ratePerSec }: { ratePerSec: number }) {
  const [bal, setBal] = useState(1247.523142);
  const last = useRef(Date.now());

  useEffect(() => {
    let raf: number;
    const tick = () => {
      const now = Date.now();
      setBal(b => b + ratePerSec * ((now - last.current) / 1000));
      last.current = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ratePerSec]);

  const [w, d] = bal.toFixed(6).split(".");
  return (
    <div className="ticker flex items-end gap-1">
      <span className="text-[#A78BFA] text-3xl font-semibold">$</span>
      <span className="text-5xl md:text-6xl font-extrabold text-white">{Number(w).toLocaleString()}</span>
      <span className="text-3xl font-bold text-[#A78BFA]">.{d}</span>
    </div>
  );
}

/* ─── Cash-Out Modal ──────────────────────────────── */
function CashOutModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [pct, setPct] = useState(50);
  const [anchor, setAnchor] = useState("MoneyGram");
  const [authing, setAuthing] = useState(false);
  const amount = (1247.52 * pct) / 100;
  const fee = amount * 0.0025;
  const net = amount - fee;

  const handleConfirm = async () => {
    setAuthing(true);
    try {
      const ch = new Uint8Array(32); crypto.getRandomValues(ch);
      await navigator.credentials.get({ publicKey: { challenge: ch, rpId: window.location.hostname, userVerification: "preferred" } });
    } catch {}
    await new Promise(r => setTimeout(r, 1200));
    setStep(4);
    setAuthing(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass rounded-3xl w-full max-w-md border border-white/10 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-[#64748B] hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 border-b border-white/5">
          <div className="flex gap-1 mb-1">
            {[1,2,3].map(s => (
              <div key={s} className={`h-1 flex-1 rounded-full transition-all ${step > s ? "bg-emerald-400" : step === s ? "gradient-purple" : "bg-white/10"}`} />
            ))}
          </div>
          <p className="text-xs text-[#64748B] mt-2">Step {Math.min(step,3)} of 3</p>
        </div>

        <div className="p-6">
          {step === 1 && (
            <>
              <h3 className="text-lg font-bold mb-1">Select Amount</h3>
              <p className="text-sm text-[#64748B] mb-6">Available: $1,247.52 USDC</p>
              <div className="grid grid-cols-4 gap-2 mb-6">
                {[25, 50, 75, 100].map(p => (
                  <button key={p} onClick={() => setPct(p)}
                    className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${pct === p ? "gradient-purple text-white glow-purple" : "glass-light border border-white/5 text-[#94A3B8] hover:text-white"}`}>
                    {p}%
                  </button>
                ))}
              </div>
              <div className="glass-light rounded-xl p-4 border border-white/5 mb-6">
                <p className="text-xs text-[#64748B] mb-1">Withdrawal Amount</p>
                <p className="text-2xl font-bold ticker">${amount.toFixed(2)}</p>
              </div>
              <button onClick={() => setStep(2)} className="w-full gradient-purple text-white font-semibold py-3.5 rounded-xl hover:opacity-90 transition-opacity">
                Continue
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h3 className="text-lg font-bold mb-1">Fee Breakdown</h3>
              <p className="text-sm text-[#64748B] mb-6">Flat 0.25% protocol fee — no hidden charges</p>
              <div className="space-y-3 mb-6">
                {[
                  { l: "Withdrawal Amount", v: `$${amount.toFixed(2)}`, c: "text-white" },
                  { l: "Protocol Fee (0.25%)", v: `-$${fee.toFixed(4)}`, c: "text-red-400" },
                  { l: "You Receive", v: `$${net.toFixed(4)}`, c: "text-emerald-400 text-lg font-bold" },
                ].map(({ l, v, c }) => (
                  <div key={l} className="flex justify-between py-2.5 border-b border-white/5 last:border-0">
                    <span className="text-sm text-[#64748B]">{l}</span>
                    <span className={`text-sm font-semibold ticker ${c}`}>{v}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#475569] mb-4">Select cash-out method:</p>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {["MoneyGram", "Local Bank", "USDC"].map(a => (
                  <button key={a} onClick={() => setAnchor(a)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${anchor === a ? "gradient-purple text-white" : "glass-light border border-white/5 text-[#94A3B8]"}`}>
                    {a}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 glass-light border border-white/5 text-white font-semibold py-3 rounded-xl hover:bg-white/10 transition-colors">
                  Back
                </button>
                <button onClick={() => setStep(3)} className="flex-1 gradient-purple text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity">
                  Continue
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h3 className="text-lg font-bold mb-1">Confirm with Passkey</h3>
              <p className="text-sm text-[#64748B] mb-8">Biometric verification required to authorize the withdrawal.</p>
              <div className="glass-light rounded-2xl p-5 border border-white/5 mb-6 text-center">
                <Fingerprint className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                <p className="text-sm text-[#64748B]">Sending <span className="text-white font-semibold">${net.toFixed(2)}</span> via <span className="text-white font-semibold">{anchor}</span></p>
              </div>
              <button onClick={handleConfirm} disabled={authing}
                className="w-full gradient-purple glow-purple text-white font-semibold py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2">
                <Fingerprint className="w-5 h-5" />
                {authing ? "Authorizing..." : "Authorize with Passkey"}
              </button>
            </>
          )}

          {step === 4 && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-emerald-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 text-emerald-400 text-2xl">✓</div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Withdrawal Submitted!</h3>
              <p className="text-sm text-[#64748B] mb-6">${net.toFixed(2)} is being processed via {anchor}.</p>
              <button onClick={onClose} className="gradient-purple text-white font-semibold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity">
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────── */
const streams = [
  { employer: "Acme Corp", rate: 0.001157, total: 3000, start: "Aug 1", end: "Sep 1", pct: 60 },
  { employer: "Stellar Labs", rate: 0.002314, total: 6000, start: "Jul 15", end: "Sep 15", pct: 45 },
];

const history = [
  { date: "Aug 5", amount: 250.00, anchor: "MoneyGram", status: "Settled" },
  { date: "Jul 28", amount: 500.00, anchor: "Local Bank", status: "Settled" },
  { date: "Jul 15", amount: 120.50, anchor: "USDC", status: "Settled" },
];

export default function WorkerDashboard() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B0D1A]">
      {/* Header */}
      <header className="glass border-b border-white/5 px-6 h-16 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2 font-bold text-base">
          <div className="w-7 h-7 gradient-purple rounded-lg flex items-center justify-center glow-purple">
            <Zap className="w-4 h-4 text-white" />
          </div>
          PulsePay
        </Link>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 glass-light border border-white/5 rounded-full px-3 py-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-[#94A3B8]">Soroban Testnet</span>
          </div>
          <div className="w-8 h-8 gradient-purple rounded-full flex items-center justify-center text-white font-bold text-sm glow-purple">W</div>
          <button onClick={() => router.push("/")} className="flex items-center gap-1.5 text-xs text-[#64748B] hover:text-white transition-colors">
            <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Balance hero */}
        <div className="glass rounded-3xl p-8 border border-purple-500/15 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-700/15 blur-[80px] rounded-full pointer-events-none" />
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-[#64748B] mb-1">Total Claimable Balance</p>
                <BalanceTicker ratePerSec={0.003472} />
                <p className="text-xs text-[#64748B] mt-2 flex items-center gap-1.5">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  +$0.003472/sec · 2 active streams
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="gradient-purple glow-purple text-white font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <ArrowUpRight className="w-5 h-5" /> Withdraw Funds
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Streams */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-bold text-lg">Active Streams</h2>
            {streams.map((s) => (
              <div key={s.employer} className="glass rounded-2xl p-5 border border-white/5 hover:border-purple-500/20 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 gradient-purple rounded-xl flex items-center justify-center text-white font-bold text-sm">
                      {s.employer[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-white">{s.employer}</p>
                      <p className="text-xs text-[#64748B]">{s.start} → {s.end}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Streaming
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="glass-light rounded-xl p-3 border border-white/5 text-center">
                    <p className="text-sm font-bold ticker text-white">${s.total.toLocaleString()}</p>
                    <p className="text-xs text-[#64748B] mt-0.5">Total</p>
                  </div>
                  <div className="glass-light rounded-xl p-3 border border-white/5 text-center">
                    <p className="text-sm font-bold ticker text-[#A78BFA]">${s.rate.toFixed(6)}</p>
                    <p className="text-xs text-[#64748B] mt-0.5">Per Second</p>
                  </div>
                  <div className="glass-light rounded-xl p-3 border border-white/5 text-center">
                    <p className="text-sm font-bold ticker text-cyan-400">{s.pct}%</p>
                    <p className="text-xs text-[#64748B] mt-0.5">Elapsed</p>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full gradient-purple rounded-full transition-all" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <h2 className="font-bold text-lg">Withdrawal History</h2>
            {history.map((h) => (
              <div key={h.date} className="glass rounded-2xl p-4 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-500/15 rounded-xl flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{h.anchor}</p>
                    <p className="text-xs text-[#64748B]">{h.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold ticker text-white">-${h.amount.toFixed(2)}</p>
                  <p className="text-xs text-emerald-400">{h.status}</p>
                </div>
              </div>
            ))}

            {/* Quick Stats */}
            <div className="glass rounded-2xl p-5 border border-white/5 mt-2">
              <h3 className="text-sm font-semibold mb-4">Monthly Summary</h3>
              {[
                { l: "Total Streamed", v: "$9,000.00" },
                { l: "Withdrawn", v: "$870.50" },
                { l: "Protocol Fees", v: "$2.18" },
                { l: "Net Received", v: "$868.32" },
              ].map(({ l, v }) => (
                <div key={l} className="flex justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-xs text-[#64748B]">{l}</span>
                  <span className="text-xs font-semibold ticker text-white">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {showModal && <CashOutModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
