"use client";
import React, { useState, useEffect, useRef } from "react";
import { Vault, Droplet, Lock, CheckCircle2 } from "lucide-react";

/* ── Section 4: Dual Reality Section ──────────────────────────────────── */
export default function DualReality() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    // Check session storage to ensure one-time reveal per session
    const sessionRevealed = sessionStorage.getItem("pulsepay_dual_revealed");
    if (sessionRevealed) {
      setHasRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRevealed) {
          setHasRevealed(true);
          sessionStorage.setItem("pulsepay_dual_revealed", "true");
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasRevealed]);

  return (
    <section ref={sectionRef} className="py-24 px-6 max-w-7xl mx-auto">
      <div className="relative rounded-2xl border border-[rgba(248,250,252,0.08)] bg-[#16141F]/50 overflow-hidden shadow-2xl">
        
        {/* Center Glowing Divider (Vertical on desktop, Horizontal on mobile) */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[3px] hidden lg:block bg-gradient-to-b from-[#F97316] via-[#A855F7] to-[#10B981] animate-master-pulse shadow-[0_0_12px_rgba(168,85,247,0.5)] z-20" />
        <div className="h-[3px] w-full lg:hidden bg-gradient-to-r from-[#F97316] via-[#A855F7] to-[#10B981] animate-master-pulse shadow-[0_0_12px_rgba(168,85,247,0.5)] z-20" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative z-10">
          
          {/* Left Side: Employer Treasury */}
          <div className="p-8 lg:p-14 relative bg-radial from-[#F97316]/10 via-transparent to-transparent flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 text-[#F97316] text-xs font-semibold">
                <Vault className="w-3.5 h-3.5" />
                Employer Treasury
              </div>

              <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#F8FAFC]">
                Fund once. <br />
                <span className="text-[#F97316]">Streams run forever.</span>
              </h3>

              <p className="text-[#94A3B8] text-base leading-relaxed max-w-md">
                Employers deposit payroll capital into non-custodial Soroban smart vaults.
                Automated continuous distribution streams unearned capital securely with zero manual intervention or repetitive bank wire fees.
              </p>
            </div>

            {/* Interactive Vault Fill Reveal (Detail C) */}
            <div className="pt-4 border-t border-[rgba(248,250,252,0.08)] flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-xl bg-[#0B0A12] border border-[rgba(248,250,252,0.1)] flex items-center justify-center overflow-hidden">
                <div
                  className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#F97316] to-[#3B82F6] transition-all duration-[1200ms] ease-out ${
                    hasRevealed ? "h-full" : "h-0"
                  }`}
                />
                <Lock className={`w-5 h-5 relative z-10 transition-colors duration-500 ${hasRevealed ? "text-white" : "text-[#94A3B8]"}`} />
              </div>
              <div>
                <span className="text-xs font-bold text-[#F8FAFC] block">On-Chain Vault Collateral</span>
                <span className="text-[11px] text-[#94A3B8] font-mono-num">
                  {hasRevealed ? "Vault Collateral Locked & Active" : "Initializing Vault..."}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Worker Liquidity */}
          <div className="p-8 lg:p-14 relative bg-radial from-[#10B981]/10 via-transparent to-transparent flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-xs font-semibold">
                <Droplet className="w-3.5 h-3.5" />
                Worker Liquidity
              </div>

              <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#F8FAFC]">
                Claim when you need it. <br />
                <span className="text-[#10B981]">Not when they allow it.</span>
              </h3>

              <p className="text-[#94A3B8] text-base leading-relaxed max-w-md">
                Workers accumulate earnings per ledger block. Withdraw settled funds anytime directly into local currency via global anchor off-ramps or passkey biometrics with standard 0.25% flat protocol fees.
              </p>
            </div>

            {/* Interactive Claim Ripple Reveal (Detail D) */}
            <div className="pt-4 border-t border-[rgba(248,250,252,0.08)] flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-xl bg-[#0B0A12] border border-[rgba(248,250,252,0.1)] flex items-center justify-center overflow-hidden">
                <div
                  className={`absolute inset-0 rounded-full bg-[#10B981]/30 transition-transform duration-1000 ease-out ${
                    hasRevealed ? "scale-150 opacity-0" : "scale-0 opacity-100"
                  }`}
                />
                <Droplet className="w-5 h-5 text-[#10B981] relative z-10 animate-master-pulse" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#F8FAFC] block">Living Accrual Stream</span>
                <span className="text-[11px] text-[#94A3B8] font-mono-num">
                  {hasRevealed ? "SEP-24 Anchor Liquidity Ready" : "Awaiting Settlement..."}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
