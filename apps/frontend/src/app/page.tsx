"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, Zap, Shield, Globe, Clock, TrendingUp,
  Users, Star, ChevronRight, Layers, Activity
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";

/* ── Live Ticker ────────────────────────────────── */
function Ticker({ base, ratePerSec }: { base: number; ratePerSec: number }) {
  const [val, setVal] = useState(base);
  const t = useRef(Date.now());

  useEffect(() => {
    let id: number;
    const loop = () => {
      const now = Date.now();
      setVal(v => v + ratePerSec * ((now - t.current) / 1000));
      t.current = now;
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(id);
  }, [ratePerSec]);

  const [w, d] = val.toFixed(6).split(".");
  return (
    <div className="text-mono flex items-end gap-0.5 leading-none">
      <span className="text-fg-muted text-2xl font-bold">$</span>
      <span className="text-4xl sm:text-5xl font-extrabold text-fg tracking-tight">{Number(w).toLocaleString()}</span>
      <span className="text-2xl font-bold text-val-blue">.{d}</span>
    </div>
  );
}

/* ── Hero Balance Card ───────────────────────────── */
function HeroCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative"
    >
      <div className="card-base p-7 rounded-3xl border border-subtle shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="label-xs font-bold text-fg-muted mb-1 block">Claimable Balance</span>
            <Ticker base={14382.218} ratePerSec={0.00463} />
          </div>
          <div className="w-11 h-11 grad-brand rounded-2xl flex items-center justify-center text-white shadow-md">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="pill-jade inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
            +$0.004630 / sec
          </span>
          <span className="pill-ink inline-flex items-center px-3 py-1 rounded-full text-xs font-bold">
            2 active streams
          </span>
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-fg-muted mb-2">
            <span>Aug 1</span>
            <span className="text-val-blue font-extrabold">63% streamed</span>
            <span>Sep 1</span>
          </div>
          <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
            <div className="h-full bg-indigo-600 dark:bg-indigo-400 rounded-full" style={{ width: "63%" }} />
          </div>
        </div>

        <div className="space-y-2 pt-1">
          {[
            { name: "Acme Corp", amount: "+$8,000", status: "Streaming" },
            { name: "Stellar Labs", amount: "+$6,000", status: "Streaming" },
          ].map(({ name, amount, status }) => (
            <div key={name} className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-surface-2 border border-subtle">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 grad-brand rounded-lg flex items-center justify-center text-white text-xs font-bold">
                  {name[0]}
                </div>
                <span className="text-sm font-bold text-fg">{name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-mono text-val-green">{amount}</span>
                <span className="pill-jade text-[10px] font-bold px-2 py-0.5 rounded-full">{status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Simulator ───────────────────────────────────── */
function Simulator() {
  const [rate, setRate] = useState(30);
  const perSec = rate / 3600;
  const perDay = rate * 24;
  const perMonth = perDay * 30;

  return (
    <div className="card-base p-8 rounded-3xl border border-subtle">
      <p className="label-xs text-val-blue mb-4">Interactive Calculator</p>
      <h3 className="text-display text-2xl text-fg mb-2">Wage Accrual Simulator</h3>
      <p className="text-fg-muted text-sm font-medium mb-6">See how fast earnings accumulate per second in real time.</p>

      <div className="mb-6">
        <div className="flex justify-between text-sm font-bold mb-2">
          <span className="text-fg-muted">Hourly Pay</span>
          <span className="text-mono text-fg">${rate}/hr</span>
        </div>
        <input
          type="range" min={5} max={250} value={rate}
          onChange={e => setRate(+e.target.value)}
          className="w-full h-2 rounded-full appearance-none cursor-pointer accent-indigo-600"
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { l: "Per Second", v: `$${perSec.toFixed(6)}`, c: "text-val-blue" },
          { l: "Per Day", v: `$${perDay.toFixed(2)}`, c: "text-val-green" },
          { l: "Per Month", v: `$${perMonth.toFixed(0)}`, c: "text-val-gold" },
        ].map(({ l, v, c }) => (
          <div key={l} className="bg-surface-2 rounded-2xl p-4 text-center border border-subtle">
            <p className={`text-mono text-base font-extrabold ${c}`}>{v}</p>
            <p className="text-[10px] text-fg-muted font-bold mt-1 uppercase">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Feature List ────────────────────────────────── */
const features = [
  { icon: Clock, title: "Ledger-Timestamp Streaming", desc: "Accrual runs on Soroban on-chain clock. No off-chain drift.", color: "text-val-blue", bg: "bg-blue-500/10" },
  { icon: Shield, title: "Passkey-Native Auth", desc: "Biometric WebAuthn signing via FaceID, TouchID or hardware keys.", color: "text-val-green", bg: "bg-emerald-500/10" },
  { icon: Globe, title: "SEP-24 Anchor Cash Out", desc: "Convert USDC to local fiat in 190+ countries via Stellar anchors.", color: "text-val-gold", bg: "bg-amber-500/10" },
  { icon: Zap, title: "0.25% Flat Protocol Fee", desc: "25 basis points on worker withdrawals only. Zero fixed sub costs.", color: "text-val-blue", bg: "bg-blue-500/10" },
  { icon: Layers, title: "Non-Custodial Vaults", desc: "Employer capital is locked on-chain. Only workers can claim earned funds.", color: "text-val-green", bg: "bg-emerald-500/10" },
  { icon: Users, title: "Workforce Treasury Controls", desc: "Manage rosters, pause streams, and clawback unstreamed capital instantly.", color: "text-val-gold", bg: "bg-amber-500/10" },
];

/* ── Page Component ─────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface-0 text-fg transition-colors duration-200">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="pill-ink inline-flex items-center gap-2 mb-6 px-3.5 py-1 rounded-full text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-pulse" />
            Live on Stellar Soroban Testnet
          </div>

          <h1 className="text-display text-4xl sm:text-5xl font-extrabold text-fg mb-6 leading-tight">
            Real-Time Payroll.
            <br />
            <span className="grad-brand-text">Instant Global Liquidity.</span>
          </h1>

          <p className="text-fg-muted font-medium text-lg max-w-xl mb-8 leading-relaxed">
            PulsePay streams wages every ledger second on Soroban. Workers withdraw earnings anytime with 0.25% flat fee. Employers manage payroll vaults in one click.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/login?role=employer"
              className="grad-brand text-white font-bold px-6 py-3.5 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 shadow-md"
            >
              Employer Portal <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login?role=worker"
              className="bg-surface-2 border border-strong text-fg font-bold px-6 py-3.5 rounded-xl hover:bg-surface-3 transition-colors flex items-center gap-2"
            >
              Worker Portal <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

        <HeroCard />
      </section>

      {/* Capabilities */}
      <section id="features" className="py-20 px-6 bg-surface-1 border-y border-subtle">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="label-xs text-val-blue mb-2">Protocol Primitives</p>
            <h2 className="text-display text-3xl font-extrabold text-fg">Built for Global Financial Access</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc, color, bg }) => (
              <motion.div
                key={title}
                whileHover={{ y: -3 }}
                className="card-base p-6 rounded-2xl border border-subtle"
              >
                <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h3 className="font-bold text-fg text-base mb-2">{title}</h3>
                <p className="text-xs font-medium text-fg-muted leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Simulator */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="label-xs text-val-blue mb-2">Instant Accrual</p>
          <h2 className="text-display text-3xl font-extrabold text-fg mb-4">No More 30-Day Pay Checks</h2>
          <p className="text-fg-muted text-sm font-medium leading-relaxed mb-6">
            Traditional payroll locks worker capital for a full month. PulsePay streams continuous balance straight to worker wallets on Stellar.
          </p>
          <div className="space-y-3">
            {[
              "0.25% flat fee on cash outs (no subscription fees)",
              "Passkey WebAuthn non-custodial wallet auth",
              "SEP-24 anchor off-ramps directly to local fiat bank accounts",
            ].map(t => (
              <div key={t} className="flex items-center gap-2.5 text-xs font-bold text-fg">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {t}
              </div>
            ))}
          </div>
        </div>
        <Simulator />
      </section>

      {/* Footer */}
      <footer className="border-t border-subtle py-8 px-6 bg-surface-1">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-fg-muted">
          <p>© 2026 PulsePay · Stellar Soroban Protocol</p>
          <p className="text-mono">Contract: CBH3AT…EFHRZW</p>
        </div>
      </footer>
    </div>
  );
}
