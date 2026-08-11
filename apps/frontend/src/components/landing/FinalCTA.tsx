"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { MicroPulseLine } from "./Navigation";
import { SectionReveal } from "@/components/ui/SectionReveal";

/* ── Section 7: Final CTA Banner ───────────────────────────────────────── */
export default function FinalCTA() {
  return (
    <section className="py-24 px-6 max-w-5xl mx-auto text-center">
      <SectionReveal>
        <div className="relative panel p-12 lg:p-16 rounded-3xl overflow-hidden space-y-8">
          <div
            className="absolute top-0 inset-x-0 h-[3px]"
            style={{
              background: "linear-gradient(to right, var(--ribbon-1), var(--accent), var(--river-b))",
            }}
          />

          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-fg">
              Start the stream.
            </h2>
            <p className="text-base text-fg-muted leading-relaxed">
              Deploy your payroll vault in minutes or connect your wallet to start claiming
              real-time global liquidity today.
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <Link
              href="/login?role=employer"
              className="btn-primary px-7 py-3.5 rounded-xl flex items-center gap-2"
            >
              Employer Portal <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login?role=worker"
              className="btn-secondary px-7 py-3.5 rounded-xl flex items-center gap-2"
            >
              Worker Portal <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-6 flex justify-center">
            <MicroPulseLine width={120} />
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
