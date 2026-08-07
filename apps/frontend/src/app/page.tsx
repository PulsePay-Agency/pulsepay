"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Globe,
  Zap,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Layers,
  Repeat,
  Sparkles,
  Shield,
  Clock,
  Menu,
  X
} from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#060608] text-white selection:bg-amber-500/30 selection:text-amber-200 overflow-x-hidden font-sans relative">
      {/* Ambient background glow & radial shadows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-gradient-to-b from-amber-600/15 via-amber-900/5 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[100px] pointer-events-none rounded-full" />

      {/* ── Top Navigation Bar ── */}
      <header className="relative z-50 max-w-7xl mx-auto px-6 pt-6 pb-4 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-extrabold shadow-[0_0_20px_rgba(245,158,11,0.5)] group-hover:scale-105 transition-transform">
            <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
            </svg>
          </div>
          <span className="font-bold text-xl tracking-tight text-white font-display">PulsePay</span>
        </Link>

        {/* Floating Capsule Nav (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-full px-3 py-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          {[
            { name: "Home", href: "#" },
            { name: "About", href: "#about" },
            { name: "Services", hasDropdown: true },
            { name: "Blog", badge: "4", href: "#blog" },
            { name: "Pricing", href: "#pricing" },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-all flex items-center gap-1.5 ${
                activeTab === item.name
                  ? "text-amber-200 bg-amber-500/20 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.name}
              {item.badge && (
                <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-500/30 px-1.5 py-0.2 rounded-full border border-amber-400/30">
                  {item.badge}
                </span>
              )}
              {item.hasDropdown && <ChevronDown className="w-3 h-3 text-zinc-400" />}
            </button>
          ))}

          <div className="w-[1px] h-4 bg-white/10 mx-1" />

          <button className="flex items-center gap-1.5 text-xs font-medium text-zinc-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>English</span>
            <ChevronDown className="w-3 h-3 text-zinc-400" />
          </button>
        </nav>

        {/* Right Auth Button */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/login"
            className="px-5 py-2 text-xs font-semibold rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-zinc-200 hover:text-white border border-white/15 backdrop-blur-md transition-all shadow-[0_0_20px_rgba(0,0,0,0.4)]"
          >
            Login / Register
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 z-50 bg-[#0F0E13]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
          <div className="flex flex-col gap-3">
            <Link href="/" className="text-sm font-semibold text-amber-300 py-2 border-b border-white/10">Home</Link>
            <Link href="#about" className="text-sm font-semibold text-zinc-300 py-2 border-b border-white/10">About</Link>
            <Link href="#pricing" className="text-sm font-semibold text-zinc-300 py-2 border-b border-white/10">Pricing</Link>
            <Link href="/login" className="mt-2 w-full text-center py-3 grad-brand rounded-xl font-semibold text-white">Login / Register</Link>
          </div>
        </div>
      )}

      {/* ── Hero Section ── */}
      <section className="relative pt-8 pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        {/* Central Eclipse & Diamond Flare graphics */}
        <div className="relative w-full max-w-2xl h-[280px] sm:h-[340px] flex items-center justify-center mb-8 select-none">
          {/* Big Golden Eclipse Circle */}
          <div className="absolute w-[240px] h-[240px] sm:w-[310px] sm:h-[310px] rounded-full border border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-amber-950/20 to-black shadow-[0_0_90px_rgba(245,158,11,0.25),inset_0_0_60px_rgba(245,158,11,0.15)] flex items-center justify-center">
            {/* Outer halo arc */}
            <div className="absolute inset-0 rounded-full border-t-2 border-amber-400/80 blur-[1px]" />
          </div>

          {/* Central Bright Diamond Star Flare */}
          <motion.div
            animate={{ scale: [0.96, 1.04, 0.96], opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 flex items-center justify-center"
          >
            <div className="absolute w-24 h-24 bg-amber-400/30 blur-2xl rounded-full" />
            <div className="absolute w-48 h-1 bg-gradient-to-r from-transparent via-amber-200 to-transparent blur-[1px]" />
            <div className="absolute w-1 h-48 bg-gradient-to-b from-transparent via-amber-200 to-transparent blur-[1px]" />
            
            {/* SVG Diamond Flare Starburst */}
            <svg className="w-24 h-24 sm:w-28 sm:h-28 text-amber-100 drop-shadow-[0_0_25px_rgba(255,230,150,0.9)]" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 0 C50 35, 65 50, 100 50 C65 50, 50 65, 50 100 C50 65, 35 50, 0 50 C35 50, 50 35, 50 0 Z" />
            </svg>
          </motion.div>

          {/* Orbiting Token Nodes Row */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-between px-2 sm:px-10 z-20 pointer-events-none">
            {[
              { icon: "❖" },
              { icon: "⇄" },
              { icon: "⁘" },
              { icon: "₿" },
              { isSpacer: true },
              { icon: "✕" },
              { icon: "⇵" },
              { icon: "★" },
              { icon: "≡" },
            ].map((node, idx) =>
              node.isSpacer ? (
                <div key={idx} className="w-20 sm:w-28" />
              ) : (
                <div
                  key={idx}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#121118]/80 border border-white/15 backdrop-blur-md flex items-center justify-center text-zinc-300 text-xs sm:text-sm shadow-[0_4px_20px_rgba(0,0,0,0.6)] pointer-events-auto hover:border-amber-400/50 hover:text-amber-300 transition-colors"
                >
                  <span>{node.icon}</span>
                </div>
              )
            )}
          </div>
        </div>

        {/* ── Main Headline ── */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-display text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white max-w-4xl leading-[1.1] mb-6 drop-shadow-md"
        >
          SIMPLIFYING BLOCKCHAIN FINANCE <br className="hidden sm:inline" /> FOR A SMARTER TOMORROW
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8"
        >
          Join the future of digital finance with a secure, fast, and intuitive platform designed for seamless crypto trading, continuous payroll streaming, and instant global investment.
        </motion.p>

        {/* CTA Button Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 z-30"
        >
          <Link
            href="/login"
            className="px-7 py-3 rounded-full bg-white text-black font-bold text-xs sm:text-sm hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105"
          >
            Get Started <ArrowRight className="w-4 h-4 text-black" />
          </Link>
          <Link
            href="#about"
            className="px-7 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white border border-white/15 backdrop-blur-md text-xs sm:text-sm font-semibold transition-all"
          >
            Contact Us
          </Link>
        </motion.div>
      </section>

      {/* ── Floating Crypto Cards at Bottom ── */}
      <div className="relative max-w-7xl mx-auto px-6 pb-24 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: ETH */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[#121118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-[0_15px_35px_rgba(0,0,0,0.6)] relative overflow-hidden group hover:border-amber-500/30 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 text-xs font-bold">
                  ◆
                </div>
                <span className="font-bold text-sm text-zinc-200">ETH</span>
              </div>
              <button className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-xl font-mono font-extrabold text-white tracking-tight">$2,680.26</p>
                <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 mt-1">
                  <TrendingUp className="w-3 h-3" /> ↑ 2.64 %
                </div>
              </div>
              {/* Mini Golden Line Chart SVG */}
              <div className="w-24 h-10">
                <svg className="w-full h-full text-amber-400" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M0 30 Q 20 35, 40 15 T 80 25 T 100 5" stroke="currentColor" fill="none" />
                  <path d="M0 30 Q 20 35, 40 15 T 80 25 T 100 5 L 100 40 L 0 40 Z" fill="url(#amber-grad)" opacity="0.2" />
                  <defs>
                    <linearGradient id="amber-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Card 2: BTC */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-[#121118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-[0_15px_35px_rgba(0,0,0,0.6)] relative overflow-hidden group hover:border-amber-500/30 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xs font-bold">
                  ₿
                </div>
                <span className="font-bold text-sm text-zinc-200">BTC</span>
              </div>
              <button className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-xl font-mono font-extrabold text-white tracking-tight">$96,012.98</p>
                <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400 mt-1">
                  <TrendingDown className="w-3 h-3" /> ↓ 2.64 %
                </div>
              </div>
              {/* Mini Red/Amber Line Chart SVG */}
              <div className="w-24 h-10">
                <svg className="w-full h-full text-rose-400" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M0 10 Q 25 5, 50 25 T 75 15 T 100 35" stroke="currentColor" fill="none" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Card 3: XLM / Soroban */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-[#121118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-[0_15px_35px_rgba(0,0,0,0.6)] relative overflow-hidden group hover:border-amber-500/30 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 text-xs font-bold">
                  ★
                </div>
                <span className="font-bold text-sm text-zinc-200">XLM (Stellar)</span>
              </div>
              <button className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-xl font-mono font-extrabold text-white tracking-tight">$0.4218</p>
                <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 mt-1">
                  <TrendingUp className="w-3 h-3" /> ↑ 5.12 %
                </div>
              </div>
              <div className="w-24 h-10">
                <svg className="w-full h-full text-emerald-400" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M0 35 Q 25 30, 50 15 T 75 20 T 100 5" stroke="currentColor" fill="none" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Card 4: USDC */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-[#121118]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-[0_15px_35px_rgba(0,0,0,0.6)] relative overflow-hidden group hover:border-amber-500/30 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xs font-bold">
                  $
                </div>
                <span className="font-bold text-sm text-zinc-200">USDC Stream</span>
              </div>
              <button className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-xl font-mono font-extrabold text-white tracking-tight">$1.0000</p>
                <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 mt-1">
                  <Zap className="w-3 h-3" /> 0.0034/s
                </div>
              </div>
              <div className="w-24 h-10">
                <svg className="w-full h-full text-amber-400" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M0 20 L 100 20" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer minimal info */}
      <footer className="border-t border-white/10 py-8 px-6 text-center text-xs text-zinc-500">
        <p>© 2026 PulsePay · Continuous Global Payroll & Liquidity Protocol on Stellar Soroban</p>
      </footer>
    </div>
  );
}
