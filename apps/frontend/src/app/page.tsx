"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight, Zap, Shield, Globe, Clock, TrendingUp,
  Users, Star, ChevronRight, Layers, Activity, Lock
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";

/* ── Animated number ticker ─────────────────────── */
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
      <span className="text-[var(--fg-muted)] text-2xl font-medium">$</span>
      <span className="text-5xl font-bold text-[var(--fg)] tracking-tight">{Number(w).toLocaleString()}</span>
      <span className="text-3xl font-bold grad-brand-text">.{d}</span>
    </div>
  );
}

/* ── Hero Balance Card ───────────────────────────── */
function HeroCard() {
  return (
    <div className="relative">
      {/* Glow blob behind card */}
      <div className="absolute -inset-8 bg-ink-500/20 blur-[60px] rounded-full pointer-events-none" />
      <div className="relative card shadow-card-dark noise p-7 space-y-5 rounded-4xl">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div>
            <p className="label-xs mb-1.5">Claimable Balance</p>
            <Ticker base={14382.218} ratePerSec={0.00463} />
          </div>
          <div className="w-11 h-11 grad-brand rounded-2xl flex items-center justify-center glow-ink flex-shrink-0">
            <Activity className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Rate pill */}
        <div className="flex items-center gap-2">
          <span className="pill pill-jade">
            <span className="w-1.5 h-1.5 rounded-full bg-jade-400 animate-pulse" />
            +$0.004630 / sec
          </span>
          <span className="pill pill-ink">2 active streams</span>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-xs text-[var(--fg-faint)] mb-2">
            <span>Aug 1</span>
            <span className="text-[var(--fg-muted)] font-medium">63% streamed</span>
            <span>Sep 1</span>
          </div>
          <div className="h-2 rounded-full bg-[var(--surface-3)] overflow-hidden">
            <div
              className="h-full grad-brand rounded-full animate-pulse2"
              style={{ width: "63%" }}
            />
          </div>
        </div>

        {/* Transaction rows */}
        <div className="space-y-2 pt-1">
          {[
            { name: "Acme Corp", amount: "+$8,000", status: "Streaming" },
            { name: "Stellar Labs", amount: "+$6,000", status: "Streaming" },
          ].map(({ name, amount, status }) => (
            <div key={name} className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-[var(--surface-2)] group hover:bg-[var(--surface-3)] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 grad-brand rounded-lg flex items-center justify-center text-white text-xs font-bold">
                  {name[0]}
                </div>
                <span className="text-sm font-medium text-[var(--fg)]">{name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-mono text-jade-500">{amount}</span>
                <span className="pill pill-jade text-[10px]">{status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating mini cards */}
      <div className="absolute -top-5 -right-6 card shadow-lift px-4 py-3 rounded-2xl animate-float text-sm">
        <p className="label-xs mb-1">Daily Earnings</p>
        <p className="text-mono font-bold text-[var(--fg)]">$400.00</p>
      </div>
      <div className="absolute -bottom-5 -left-6 card shadow-lift px-4 py-3 rounded-2xl animate-float [animation-delay:1.5s] text-sm">
        <p className="label-xs mb-1">Protocol Fee</p>
        <p className="text-mono font-bold grad-gold-text">0.25%</p>
      </div>
    </div>
  );
}

/* ── Simulator ───────────────────────────────────── */
function Simulator() {
  const [rate, setRate] = useState(30);
  const perSec = rate / 3600;
  const perDay = rate * 24;
  const perMonth = perDay * 30;
  return (
    <div className="card shadow-card p-8 rounded-4xl noise">
      <p className="label-xs text-ink-500 mb-5">Interactive Demo</p>
      <h3 className="text-display text-2xl text-[var(--fg)] mb-2">See Your Streaming Rate</h3>
      <p className="text-[var(--fg-muted)] text-sm mb-8">Adjust your hourly rate to preview how much you earn every second.</p>

      <div className="mb-8">
        <div className="flex justify-between text-sm mb-3">
          <span className="text-[var(--fg-muted)]">Hourly Rate</span>
          <span className="text-mono font-bold text-[var(--fg)]">${rate}/hr</span>
        </div>
        <input
          type="range" min={5} max={250} value={rate}
          onChange={e => setRate(+e.target.value)}
          className="w-full h-2 rounded-full appearance-none cursor-pointer accent-ink-500"
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { l: "Per Second", v: `$${perSec.toFixed(6)}`, c: "grad-brand-text" },
          { l: "Per Day",    v: `$${perDay.toFixed(2)}`,  c: "text-jade-400" },
          { l: "Per Month",  v: `$${perMonth.toFixed(0)}`, c: "grad-gold-text" },
        ].map(({ l, v, c }) => (
          <div key={l} className="bg-[var(--surface-2)] rounded-2xl p-4 text-center">
            <p className={`text-mono text-base font-bold leading-snug ${c}`}>{v}</p>
            <p className="text-[10px] text-[var(--fg-faint)] mt-1.5 font-medium uppercase tracking-wide">{l}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-[var(--fg-faint)] text-center mt-4">Traditional payroll: you wait 30 days. PulsePay: you have it now.</p>
    </div>
  );
}

/* ── Features ────────────────────────────────────── */
const features = [
  { icon: Clock,    title: "Ledger-Timestamp Streaming",   desc: "Accrual runs on Soroban's on-chain clock. No oracles, no off-chain drift — integer math only.",     color: "text-ink-400",  bg: "bg-ink-500/10"  },
  { icon: Shield,   title: "Passkey-Native Signing",       desc: "Transactions are authorised with FaceID, TouchID or hardware keys. No seed phrases exposed.",       color: "text-jade-400", bg: "bg-jade-500/10" },
  { icon: Globe,    title: "SEP-24 Fiat Off-Ramps",        desc: "Cash out USDC to NGN, BRL, EUR or USD at anchored local banks via the Stellar SEP-24 protocol.",     color: "text-gold-400", bg: "bg-gold-500/10" },
  { icon: Zap,      title: "0.25% Flat Fee",               desc: "25 basis points on worker withdrawals only. Zero subscription costs. Zero hidden transfer fees.",    color: "text-ink-400",  bg: "bg-ink-500/10"  },
  { icon: Layers,   title: "Non-Custodial Vaults",         desc: "Employer capital is locked in a Soroban vault. The contract enforces that only the worker can claim.", color: "text-jade-400", bg: "bg-jade-500/10" },
  { icon: Users,    title: "Enterprise Roster Control",    desc: "Manage unlimited streams, pause in real-time, and clawback unstreamed capital instantly.",            color: "text-gold-400", bg: "bg-gold-500/10" },
];

/* ── Steps ───────────────────────────────────────── */
const steps = [
  { n: "01", title: "Employer Funds Vault", desc: "Deposit USDC into the non-custodial Soroban vault. Set worker address, total amount, start and end timestamps." },
  { n: "02", title: "Stream Accrues Live",  desc: "Balance grows every ledger second. Workers watch the ticker tick up in real time — no manual settlement needed." },
  { n: "03", title: "Worker Withdraws",     desc: "Authenticate with Passkey, select an amount, confirm. The 0.25% fee is deducted and the rest is sent instantly." },
  { n: "04", title: "Cash Out Locally",     desc: "Use SEP-24 anchor to convert USDC to local currency — MoneyGram, local banks, or mobile money — same day." },
];

/* ── Testimonials ────────────────────────────────── */
const quotes = [
  { q: "I used to wait 30 days for invoices to clear. Now I see every dollar the moment I earn it.", name: "Amara O.", role: "Freelance Designer · Lagos" },
  { q: "Setting up payroll for 12 contractors across 6 countries took ten minutes flat.", name: "Daniel K.", role: "CTO · Remote-first SaaS" },
  { q: "The anchor integration means I walk into a shop and withdraw cash the same day I'm paid.", name: "Priya M.", role: "Contractor · Bangalore" },
];

/* ── Stats ───────────────────────────────────────── */
const stats = [
  { v: "0.25%", l: "Flat protocol fee" },
  { v: "<5s",   l: "Settlement on Testnet" },
  { v: "3–7%",  l: "Saved vs wire fees" },
  { v: "$0",    l: "Minimum stream size" },
];

/* ── Page ────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--surface-0)]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-28 px-6 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-ink-500/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-60 right-10 w-[300px] h-[300px] bg-gold-500/8 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-[1fr,1.1fr] gap-20 items-center">
          {/* Left */}
          <div>
            <div className="pill pill-ink mb-8 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-ink-400 animate-pulse" />
              Live on Stellar Soroban Testnet
            </div>

            <h1 className="text-display text-[clamp(2.6rem,5.5vw,4.2rem)] text-[var(--fg)] mb-6 animate-fade-up">
              Continuous Payroll.
              <br />
              <span className="grad-brand-text">Instant Global</span>
              <br />
              Off-Ramps.
            </h1>

            <p className="text-[var(--fg-muted)] text-lg leading-relaxed max-w-xl mb-10 animate-fade-up-delay">
              PulsePay replaces 30-day pay cycles with per-ledger-second wage streaming. Workers claim earnings any time. Employers manage streams in one click.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up-delay2">
              <Link
                href="/login?role=employer"
                className="grad-brand glow-ink text-white font-semibold px-7 py-3.5 rounded-2xl hover:opacity-90 interactive flex items-center gap-2"
              >
                Stream Salaries <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login?role=worker"
                className="card border-subtle text-[var(--fg)] font-semibold px-7 py-3.5 rounded-2xl hover:bg-[var(--surface-2)] interactive flex items-center gap-2"
              >
                Claim Earnings <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex items-center gap-6 mt-10">
              {["Non-custodial", "Biometric auth", "MIT open source"].map(t => (
                <div key={t} className="flex items-center gap-2 text-xs text-[var(--fg-muted)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-jade-400" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Right — floating card */}
          <div className="hidden lg:block animate-fade-in">
            <HeroCard />
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <div className="border-y border-subtle py-5 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-10">
          {["Stellar Foundation", "SEP-24 Compliant", "Soroban Contracts", "WebAuthn / Passkeys", "Open Source"].map(t => (
            <span key={t} className="text-xs font-semibold text-[var(--fg-faint)] uppercase tracking-widest">{t}</span>
          ))}
        </div>
      </div>

      {/* ── Stats ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ v, l }) => (
            <div key={l} className="card p-6 rounded-3xl text-center group hover:shadow-card-dark transition-all">
              <p className="text-mono text-3xl font-bold grad-brand-text mb-2">{v}</p>
              <p className="text-xs text-[var(--fg-muted)]">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="label-xs text-ink-400 mb-4">Capabilities</p>
            <h2 className="text-display text-[clamp(2rem,4vw,3rem)] text-[var(--fg)] mb-4">
              Cutting-Edge Features for<br />Global Financial Access
            </h2>
            <p className="text-[var(--fg-muted)] max-w-xl mx-auto text-base">
              Every primitive is built on open, verifiable Soroban contracts — not proprietary middleware.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc, color, bg }) => (
              <div
                key={title}
                className="card p-6 rounded-3xl group hover:shadow-card-dark hover:-translate-y-1 transition-all duration-200"
              >
                <div className={`w-11 h-11 ${bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h3 className="font-semibold text-base text-[var(--fg)] mb-2 tracking-tight">{title}</h3>
                <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Simulator + Explainer ── */}
      <section className="py-24 px-6 bg-[var(--surface-1)]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="label-xs text-ink-400 mb-5">Live Simulator</p>
            <h2 className="text-display text-[clamp(2rem,4vw,3rem)] text-[var(--fg)] mb-5">
              What Streaming Means<br />for Your Wallet
            </h2>
            <p className="text-[var(--fg-muted)] leading-relaxed mb-8">
              Traditional payroll pays once a month. PulsePay streams every ledger second — giving workers real-time liquidity to pay bills, invest, or withdraw locally.
            </p>
            <ul className="space-y-4">
              {[
                "No 30-day liquidity wait between paychecks",
                "Withdraw exactly what you need, precisely when you need it",
                "Cash out to physical fiat in 190+ countries via anchors",
              ].map(t => (
                <li key={t} className="flex items-start gap-3 text-sm text-[var(--fg-muted)]">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-jade-500/15 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-jade-400" />
                  </div>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <Simulator />
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="label-xs text-ink-400 mb-4">Workflow</p>
            <h2 className="text-display text-[clamp(2rem,4vw,3rem)] text-[var(--fg)]">
              A Smarter Way to<br />Manage Global Pay
            </h2>
          </div>
          <div className="relative">
            {/* Connector line */}
            <div className="absolute left-[27px] top-12 bottom-12 w-px bg-gradient-to-b from-ink-500/50 via-ink-500/20 to-transparent hidden md:block" />
            <div className="space-y-4">
              {steps.map(({ n, title, desc }, i) => (
                <div
                  key={n}
                  className="card p-6 rounded-3xl flex gap-5 items-start group hover:shadow-card-dark hover:border-ink-500/20 transition-all duration-200"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-14 h-14 grad-brand rounded-2xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0 glow-ink group-hover:scale-105 transition-transform text-mono">
                    {n}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--fg)] mb-1.5">{title}</h3>
                    <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-6 bg-[var(--surface-1)]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <p className="label-xs text-ink-400 mb-3">Testimonials</p>
            <h2 className="text-display text-[clamp(2rem,4vw,3rem)] text-[var(--fg)]">
              The Stories Trusted<br />By Thousands
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {quotes.map(({ q, name, role }) => (
              <div key={name} className="card p-7 rounded-3xl group hover:shadow-card-dark hover:-translate-y-1 transition-all duration-200">
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />
                  ))}
                </div>
                <p className="text-sm text-[var(--fg-muted)] leading-relaxed mb-6">"{q}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 grad-brand rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--fg)]">{name}</p>
                    <p className="text-xs text-[var(--fg-faint)]">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative card rounded-4xl p-16 noise overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-ink-500/15 via-transparent to-transparent pointer-events-none" />
            <div className="relative">
              <p className="label-xs text-ink-400 mb-5">Get Started</p>
              <h2 className="text-display text-[clamp(2rem,4vw,3rem)] text-[var(--fg)] mb-5">
                Ready to Upgrade<br />Your Payroll?
              </h2>
              <p className="text-[var(--fg-muted)] mb-10 max-w-md mx-auto">
                Join employers and workers using real-time streaming on Stellar Soroban.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login?role=employer" className="grad-brand glow-ink text-white font-semibold px-8 py-4 rounded-2xl hover:opacity-90 interactive flex items-center gap-2 justify-center">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/docs" className="card border-subtle text-[var(--fg)] font-semibold px-8 py-4 rounded-2xl hover:bg-[var(--surface-2)] interactive">
                  Read the Docs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-subtle bg-[var(--surface-1)]">
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-base mb-5">
              <span className="w-7 h-7 grad-brand rounded-[10px] flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </span>
              PulsePay
            </Link>
            <p className="text-sm text-[var(--fg-muted)] leading-relaxed mb-5">
              Real-time global payroll on Soroban. Continuous liquidity for the world's remote workforce.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-jade-400 animate-pulse2" />
              <span className="text-xs text-[var(--fg-faint)]">Stellar Testnet Live</span>
            </div>
          </div>
          {[
            { title: "Product", links: ["Features", "Pricing", "Security", "Docs"] },
            { title: "Protocol", links: ["Contract", "GitHub", "Docs Site"] },
            { title: "Legal", links: ["Privacy", "Terms", "Audit"] },
          ].map(({ title, links }) => (
            <div key={title}>
              <p className="label-xs mb-5">{title}</p>
              <ul className="space-y-3">
                {links.map(l => (
                  <li key={l}>
                    <Link href="#" className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors">{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-subtle px-6 py-5 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--fg-faint)]">© 2026 PulsePay · MIT License · Built on Stellar Soroban</p>
          <p className="text-mono text-xs text-[var(--fg-faint)]">CBH3AT…EFHRZW</p>
        </div>
      </footer>
    </div>
  );
}
