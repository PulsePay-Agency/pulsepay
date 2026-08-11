"use client";
import React, { useState, useEffect, useRef } from "react";
import { Vault, Droplet, Lock } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";

/* ── Section 4: Dual Reality Section ──────────────────────────────────── */
export default function DualReality() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    const sessionRevealed = sessionStorage.getItem("pulsepay_dual_revealed");
    if (sessionRevealed) {
      setHasRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true);
          sessionStorage.setItem("pulsepay_dual_revealed", "true");
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 max-w-7xl mx-auto">
      <SectionReveal>
        <div className="relative rounded-2xl border border-border bg-bg-elevated overflow-hidden">
          {/* Divider — clay → stone → rust */}
          <div
            className={`absolute inset-y-0 left-1/2 w-[3px] hidden lg:block z-20 animate-divider-v ${reduce ? "" : ""}`}
            style={{
              background: "linear-gradient(to bottom, var(--ribbon-1), var(--ribbon-2), var(--river-b))",
            }}
          />
          <div
            className="h-[3px] w-full lg:hidden animate-divider-h"
            style={{
              background: "linear-gradient(to right, var(--ribbon-1), var(--ribbon-2), var(--river-b))",
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative z-10">
            {/* Employer */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 lg:p-14 flex flex-col justify-between space-y-8 relative"
              style={{
                background:
                  "radial-gradient(ellipse at top left, color-mix(in srgb, var(--ribbon-1) 14%, transparent), transparent 60%)",
              }}
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-sunken border border-border text-accent text-xs font-semibold">
                  <Vault className="w-3.5 h-3.5" />
                  Employer Treasury
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-fg">
                  Fund once. <br />
                  <span className="text-accent">Streams run forever.</span>
                </h3>
                <p className="text-fg-muted text-base leading-relaxed max-w-md">
                  Employers deposit payroll capital into non-custodial Soroban smart vaults.
                  Automated continuous distribution streams capital securely with zero manual
                  intervention or repetitive bank wire fees.
                </p>
              </div>

              {/* Detail C: Vault fill */}
              <div className="pt-4 border-t border-border flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-xl bg-bg-sunken border border-border flex items-center justify-center overflow-hidden">
                  <div
                    className="absolute bottom-0 inset-x-0 transition-all duration-[1200ms] ease-out"
                    style={{
                      height: hasRevealed || reduce ? "100%" : "0%",
                      background: "linear-gradient(to top, var(--river-b), var(--river-a))",
                    }}
                  />
                  <Lock
                    className={`w-5 h-5 relative z-10 transition-colors duration-500 ${
                      hasRevealed || reduce ? "text-[var(--cta-on)]" : "text-fg-muted"
                    }`}
                  />
                </div>
                <div>
                  <span className="text-xs font-bold text-fg block">On-Chain Vault Collateral</span>
                  <span className="text-[11px] text-fg-muted font-mono-num">
                    {hasRevealed || reduce
                      ? "Vault Collateral Locked & Active"
                      : "Initializing Vault..."}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Worker */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 lg:p-14 flex flex-col justify-between space-y-8 relative"
              style={{
                background:
                  "radial-gradient(ellipse at top right, color-mix(in srgb, var(--ribbon-2) 16%, transparent), transparent 60%)",
              }}
            >
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-sunken border border-border text-[var(--ribbon-2)] text-xs font-semibold">
                  <Droplet className="w-3.5 h-3.5" />
                  Worker Liquidity
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-fg">
                  Claim when you need it. <br />
                  <span className="text-[var(--river-a)]">Not when they allow it.</span>
                </h3>
                <p className="text-fg-muted text-base leading-relaxed max-w-md">
                  Workers accumulate earnings continuously. Withdraw settled funds anytime into
                  local currency via global anchor off-ramps or passkey biometrics with a flat
                  0.25% protocol fee.
                </p>
              </div>

              {/* Detail D: Claim ripple */}
              <div className="pt-4 border-t border-border flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-xl bg-bg-sunken border border-border flex items-center justify-center overflow-hidden">
                  {(hasRevealed || reduce) && (
                    <span
                      className={`absolute inset-0 rounded-full ${reduce ? "opacity-0" : ""}`}
                      style={{
                        background: "color-mix(in srgb, var(--river-a) 35%, transparent)",
                        animation: reduce ? undefined : "liquid-burst 1s ease-out forwards",
                      }}
                    />
                  )}
                  <Droplet className="w-5 h-5 text-accent relative z-10 animate-master-pulse-scale" />
                </div>
                <div>
                  <span className="text-xs font-bold text-fg block">Living Accrual Stream</span>
                  <span className="text-[11px] text-fg-muted font-mono-num">
                    {hasRevealed || reduce
                      ? "SEP-24 Anchor Liquidity Ready"
                      : "Awaiting Settlement..."}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
