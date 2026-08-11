"use client";
import Link from "next/link";
import { ArrowRight, ChevronRight, Vault, Droplet } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { PulsePayLogo } from "@/components/ui/PulsePayLogo";
import { MicroPulseLine } from "./Navigation";

/* ── Section 2: Hero — editorial protocol story (no tube graphics) ── */
export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative pt-28 pb-16 lg:pt-32 lg:pb-24 min-h-[85vh] flex items-center px-6 overflow-hidden">
      <div className="absolute inset-0 paper-grain opacity-50" aria-hidden />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 70% 40%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 65%)",
        }}
        aria-hidden
      />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Copy — brand first */}
        <div className="lg:col-span-6 space-y-7">
          <div className="flex items-center gap-3">
            <PulsePayLogo className="w-11 h-11" size={44} />
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-fg">PulsePay</span>
              <MicroPulseLine width={28} />
            </div>
          </div>

          <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent font-semibold">
            Zero-click global payroll
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.05] text-fg max-w-xl">
            Money that never sleeps.
          </h1>

          <p className="text-lg text-fg-muted max-w-md leading-relaxed">
            Employers fund a vault once. Workers claim continuously accrued wages anytime —
            off-ramp to local currency on Stellar.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href="/login?role=employer"
              className="btn-primary px-6 py-3.5 rounded-xl flex items-center gap-2 text-sm"
            >
              Employer Portal <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login?role=worker"
              className="btn-secondary px-6 py-3.5 rounded-xl flex items-center gap-2 text-sm"
            >
              Worker Portal <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-xs text-fg-faint font-medium">
            Sign in with Freighter wallet or Passkey · 0.25% flat fee · Soroban
          </p>
        </div>

        {/* Visual — solid protocol panel, not neon tubes */}
        <div className="lg:col-span-6">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="panel rounded-3xl p-6 sm:p-8 border border-border relative overflow-hidden"
          >
            <div
              className="absolute top-0 inset-x-0 h-1"
              style={{
                background: "linear-gradient(90deg, var(--river-a), var(--ribbon-1), var(--river-b))",
              }}
            />

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-accent">
                  <Vault className="w-3.5 h-3.5" />
                  Employer
                </div>
                <p className="text-lg font-bold text-fg leading-snug">Fund once.</p>
                <p className="text-xs text-fg-muted leading-relaxed">
                  Deposit into a Soroban vault. Distribution runs without wires.
                </p>
              </div>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[var(--ribbon-2)]">
                  <Droplet className="w-3.5 h-3.5" />
                  Worker
                </div>
                <p className="text-lg font-bold text-fg leading-snug">Claim anytime.</p>
                <p className="text-xs text-fg-muted leading-relaxed">
                  Accrued earnings on demand — Freighter or passkey, then off-ramp.
                </p>
              </div>
            </div>

            {/* Living stream bar — single calm meter, not tubes */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center justify-between text-[11px] font-semibold text-fg-muted">
                <span>Continuous accrual</span>
                <span className="font-mono-num text-accent">Live on Soroban</span>
              </div>
              <div className="h-3 rounded-full bg-bg-sunken border border-border overflow-hidden relative">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: "linear-gradient(90deg, var(--river-b), var(--accent), var(--ribbon-1))",
                    width: "68%",
                  }}
                  animate={
                    reduce
                      ? undefined
                      : {
                          opacity: [0.75, 1, 0.85, 1],
                        }
                  }
                  transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                />
                {!reduce && (
                  <motion.div
                    className="absolute inset-y-0 w-16 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, color-mix(in srgb, var(--cta-on) 35%, transparent), transparent)",
                    }}
                    animate={{ left: ["-10%", "75%"] }}
                    transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </div>
              <div className="flex justify-between text-[10px] font-medium text-fg-faint">
                <span>Vault collateral</span>
                <span>Claimable balance</span>
              </div>
            </div>

            {/* Destinations — solid rows, no glowing pipes */}
            <div className="space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-fg-faint mb-3">
                Cash out via anchors
              </p>
              {[
                { code: "USDC", name: "Stablecoin settle", meta: "SEP-24" },
                { code: "NGN", name: "Naira bank / mobile", meta: "Yellow Card" },
                { code: "BRL", name: "PIX & local rails", meta: "Mercado Pago" },
                { code: "+190", name: "Global anchors", meta: "Stellar" },
              ].map((row, i) => (
                <motion.div
                  key={row.code}
                  initial={reduce ? false : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-bg-sunken border border-border"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-10 text-xs font-bold font-mono-num text-accent">{row.code}</span>
                    <span className="text-sm font-medium text-fg">{row.name}</span>
                  </div>
                  <span className="text-[11px] text-fg-muted">{row.meta}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
