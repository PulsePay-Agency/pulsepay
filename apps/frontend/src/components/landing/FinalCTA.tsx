"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { MicroPulseLine } from "./Navigation";

/* ── Section 7: Final CTA Banner ───────────────────────────────────────── */
export default function FinalCTA() {
  return (
    <section className="py-24 px-6 max-w-5xl mx-auto text-center">
      <div className="relative glass-card p-12 lg:p-16 rounded-3xl border border-[rgba(248,250,252,0.08)] bg-gradient-to-b from-[#16141F] to-[#0B0A12] shadow-2xl overflow-hidden space-y-8">
        
        {/* Warm Gradient Edge Highlight */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#F97316] via-[#E85A3C] to-[#10B981]" />

        <div className="space-y-4 max-w-2xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-[#F8FAFC]">
            Start the stream.
          </h2>
          <p className="text-base text-[#94A3B8] leading-relaxed">
            Deploy your payroll vault in minutes or connect your wallet to start claiming real-time global liquidity today.
          </p>
        </div>

        {/* Centered Dual CTAs */}
        <div className="flex flex-wrap justify-center items-center gap-4">
          <Link
            href="/login?role=employer"
            className="bg-[#E85A3C] hover:bg-[#d44e32] text-[#F8FAFC] font-semibold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-[#E85A3C]/25 flex items-center gap-2"
          >
            Employer Portal <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/login?role=worker"
            className="btn-glass px-7 py-3.5 rounded-xl font-semibold transition-all hover:-translate-y-0.5 flex items-center gap-2"
          >
            Worker Portal <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 120px Centered Micro-Pulse Line */}
        <div className="pt-6 flex justify-center">
          <MicroPulseLine width={120} />
        </div>

      </div>
    </section>
  );
}
