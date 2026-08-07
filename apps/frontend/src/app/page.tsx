"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Zap, Shield, Globe, Clock, TrendingUp, Users, ChevronRight, Star } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/* ─── Live ticker in hero ─────────────────────────── */
function LiveTicker() {
  const [balance, setBalance] = useState(12847.523142);
  const ratePerSec = 0.003472; // $300/day in seconds
  const lastTime = useRef(Date.now());

  useEffect(() => {
    let raf: number;
    const tick = () => {
      const now = Date.now();
      const delta = (now - lastTime.current) / 1000;
      lastTime.current = now;
      setBalance(b => b + ratePerSec * delta);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const [whole, dec] = balance.toFixed(6).split(".");
  return (
    <div className="glass rounded-2xl p-6 w-full max-w-sm mx-auto border border-purple-500/20">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-[#94A3B8] font-medium">Claimable Balance</span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </div>
      <div className="ticker flex items-end gap-0.5 mb-4">
        <span className="text-[#94A3B8] text-xl font-medium">$</span>
        <span className="text-4xl font-bold text-white">{Number(whole).toLocaleString()}</span>
        <span className="text-2xl font-bold text-[#A78BFA]">.{dec}</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-[#64748B]">
        <TrendingUp className="w-3 h-3 text-emerald-400" />
        <span>+${ratePerSec.toFixed(6)}/sec · Active stream</span>
      </div>
      <div className="mt-4 h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div className="h-full w-3/5 gradient-purple rounded-full animate-pulse" />
      </div>
      <div className="flex justify-between text-xs text-[#475569] mt-1.5">
        <span>Aug 1</span>
        <span>60% elapsed</span>
        <span>Sep 1</span>
      </div>
    </div>
  );
}

/* ─── Stream simulator ────────────────────────────── */
function StreamSimulator() {
  const [rate, setRate] = useState(25);
  const perSecond = rate / 3600;
  const perDay = rate * 24;
  const perMonth = perDay * 30;

  return (
    <div className="glass rounded-3xl p-8 border border-white/5">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#7C3AED] mb-6">Live Simulator</p>
      <h3 className="text-2xl font-bold mb-2">See Your Earnings Stream</h3>
      <p className="text-[#64748B] text-sm mb-8">Adjust your hourly rate and watch how streaming unlocks liquidity.</p>

      <label className="block text-sm text-[#94A3B8] mb-2">Hourly rate: <span className="text-white font-semibold">${rate}/hr</span></label>
      <input
        type="range" min={5} max={200} value={rate}
        onChange={e => setRate(Number(e.target.value))}
        className="w-full accent-purple-500 mb-8"
      />

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Per Second", value: `$${perSecond.toFixed(6)}`, color: "text-[#A78BFA]" },
          { label: "Per Day", value: `$${perDay.toFixed(2)}`, color: "text-cyan-400" },
          { label: "Per Month", value: `$${perMonth.toFixed(0)}`, color: "text-emerald-400" },
        ].map(({ label, value, color }) => (
          <div key={label} className="glass-light rounded-xl p-4 text-center border border-white/5">
            <p className={`text-lg font-bold ticker ${color}`}>{value}</p>
            <p className="text-xs text-[#64748B] mt-1">{label}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-[#475569] mt-4 text-center">Traditional payroll: you'd wait 30 days. PulsePay: you have it now.</p>
    </div>
  );
}

/* ─── Features ────────────────────────────────────── */
const features = [
  {
    icon: Clock,
    title: "Ledger-Timestamp Streaming",
    desc: "Every Soroban ledger tick accrues your wages using integer math. No rounding, no drift.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    icon: Shield,
    title: "Passkey-Native Auth",
    desc: "Sign transactions with biometrics — FaceID, TouchID, or hardware keys. No seed phrases.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Globe,
    title: "SEP-24 Fiat Off-Ramps",
    desc: "Cash out USDC to NGN, BRL, EUR, or USD at local anchors using the Stellar SEP-24 standard.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Zap,
    title: "0.25% Flat Protocol Fee",
    desc: "25 basis points on withdrawals only. No monthly subscription, no hidden transfer costs.",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
  {
    icon: TrendingUp,
    title: "Non-Custodial Vaults",
    desc: "Employer capital is locked in a Soroban vault. Only the worker can claim their accrued balance.",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
  },
  {
    icon: Users,
    title: "Enterprise Roster Management",
    desc: "Employers manage unlimited worker streams, cancel in real-time, and clawback unstreamed capital.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
];

/* ─── How it works ────────────────────────────────── */
const steps = [
  { n: "01", title: "Employer Funds Vault", desc: "Deposit USDC into the Soroban vault contract and configure the stream: worker address, total amount, start & end timestamps." },
  { n: "02", title: "Stream Accrues Live", desc: "The contract calculates claimable balance per ledger second. Workers see their balance tick up in real time on the dashboard." },
  { n: "03", title: "Worker Withdraws", desc: "The worker authenticates with Passkey, selects an amount, and submits. The protocol deducts 0.25%, and the rest hits their wallet instantly." },
  { n: "04", title: "Cash Out Locally", desc: "Use the SEP-24 off-ramp flow to convert USDC to local fiat via partnered anchors — MoneyGram, local banks, or mobile money." },
];

/* ─── Stats ───────────────────────────────────────── */
const stats = [
  { value: "0.25%", label: "Protocol fee — flat, no monthly cost" },
  { value: "<5s", label: "Settlement time on Soroban Testnet" },
  { value: "3-7%", label: "Saved vs traditional wire fees" },
  { value: "$0", label: "Minimum — stream any amount" },
];

/* ─── Testimonials ────────────────────────────────── */
const testimonials = [
  {
    quote: "I used to wait 30 days for my invoice to clear. With PulsePay I see every dollar the moment I earn it.",
    name: "Amara O.", role: "Freelance Designer, Lagos",
  },
  {
    quote: "Setting up payroll for 12 remote contractors across 6 countries took 10 minutes. That's unprecedented.",
    name: "Daniel K.", role: "CTO, Remote-first SaaS",
  },
  {
    quote: "The SEP-24 anchor integration means I can walk into a local shop and withdraw cash the same day I'm paid.",
    name: "Priya M.", role: "Contractor, Bangalore",
  },
];

/* ─── Page ────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0D1A]">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* bg blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-purple-700/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              Built on Stellar Soroban · Testnet Live
            </div>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
              <span className="text-white">Continuous Payroll.</span>
              <br />
              <span className="text-gradient">Instant Global</span>
              <br />
              <span className="text-white">Off-Ramps.</span>
            </h1>

            <p className="text-[#94A3B8] text-lg leading-relaxed mb-10 max-w-lg">
              PulsePay replaces 30-day payroll cycles with per-second wage streaming. Workers claim earnings any time. Employers control streams with one click.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login?role=employer" className="gradient-purple glow-purple text-white font-semibold px-7 py-3.5 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 justify-center">
                Stream Salaries <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/login?role=worker" className="glass-light border border-white/10 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2 justify-center">
                Claim Earnings <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex items-center gap-6 mt-10">
              {["Klarna-grade Security", "Non-custodial", "Open Source"].map(t => (
                <div key={t} className="flex items-center gap-1.5 text-xs text-[#64748B]">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <LiveTicker />
            {/* mini stats row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Active Streams", val: "1,204" },
                { label: "Total Streamed", val: "$2.4M" },
                { label: "Anchors", val: "12 +" },
              ].map(({ label, val }) => (
                <div key={label} className="glass-light rounded-xl p-4 text-center border border-white/5">
                  <p className="text-xl font-bold text-white ticker">{val}</p>
                  <p className="text-xs text-[#64748B] mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="border-y border-white/5 py-6 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-10 text-[#475569] text-sm font-semibold">
          {["Stellar Foundation", "SEP-24 Compliant", "Soroban Smart Contracts", "WebAuthn / Passkeys", "Open Source (MIT)"].map(t => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ value, label }) => (
            <div key={label} className="glass rounded-2xl p-6 border border-white/5 text-center">
              <p className="text-3xl font-extrabold text-gradient ticker mb-2">{value}</p>
              <p className="text-xs text-[#64748B]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7C3AED] mb-4">Features</p>
            <h2 className="text-4xl font-bold mb-4">Cutting-Edge Features for<br />Global Financial Inclusion</h2>
            <p className="text-[#64748B] max-w-xl mx-auto">Every component is built on verifiable, open-source Soroban primitives — not bank middleware.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className="glass rounded-2xl p-6 border border-white/5 hover:border-purple-500/20 transition-all group">
                <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Simulator ── */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-purple-900/5 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7C3AED] mb-4">Interactive</p>
            <h2 className="text-4xl font-bold mb-6">See What Streaming<br />Means for You</h2>
            <p className="text-[#64748B] leading-relaxed mb-6">Traditional payroll pays once a month. PulsePay streams every ledger second — giving workers real-time liquidity to pay bills, invest, or withdraw locally.</p>
            <ul className="space-y-3">
              {["No waiting 30 days for your next paycheck", "Withdraw exactly what you need, when you need it", "Cash out to physical fiat in 190+ countries"].map(t => (
                <li key={t} className="flex items-center gap-3 text-sm text-[#94A3B8]">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <StreamSimulator />
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7C3AED] mb-4">Workflow</p>
            <h2 className="text-4xl font-bold">A Smarter Way to<br />Manage Global Pay</h2>
          </div>
          <div className="space-y-6">
            {steps.map(({ n, title, desc }, i) => (
              <div key={n} className="flex gap-6 items-start glass rounded-2xl p-6 border border-white/5 hover:border-purple-500/15 transition-all">
                <div className="w-12 h-12 gradient-purple rounded-2xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 glow-purple">
                  {n}
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7C3AED] mb-3">Testimonials</p>
            <h2 className="text-4xl font-bold">The Stories Trusted<br />By Thousands</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ quote, name, role }) => (
              <div key={name} className="glass rounded-2xl p-6 border border-white/5">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">"{quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full gradient-purple flex items-center justify-center text-white font-bold text-sm">
                    {name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{name}</p>
                    <p className="text-xs text-[#64748B]">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center glass rounded-3xl p-16 border border-purple-500/15 relative overflow-hidden">
          <div className="absolute inset-0 bg-purple-700/10 pointer-events-none" />
          <div className="relative">
            <h2 className="text-4xl font-extrabold mb-4">Ready to Upgrade Your Payroll?</h2>
            <p className="text-[#94A3B8] mb-10">Join employers and workers using real-time streaming on Soroban.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login?role=employer" className="gradient-purple glow-purple text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 justify-center">
                Get Started Today <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/docs" className="glass-light border border-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors">
                Read the Docs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
