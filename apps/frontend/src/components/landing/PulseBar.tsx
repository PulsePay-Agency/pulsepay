"use client";
import React, { useState, useEffect } from "react";
import { Activity, ShieldCheck, Clock, Percent } from "lucide-react";

type PulseBarState = "loading" | "loaded" | "error";

/* ── Section 3: Live Protocol Pulse Bar ───────────────────────────────── */
export default function PulseBar() {
  const [dataState, setDataState] = useState<PulseBarState>("loaded");

  // Simulate protocol pulse state checks
  useEffect(() => {
    // Keep loaded state by default; can toggle or handle live fetch
    setDataState("loaded");
  }, []);

  return (
    <section id="pulse-bar" className="w-full relative z-20">
      <div className="w-full bg-[#16141F]/80 border-y border-[rgba(248,250,252,0.08)] py-4 backdrop-blur-md animate-border-pulse">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
          
          {/* Pill 1: Network Status */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#0B0A12]/40 border border-[rgba(248,250,252,0.06)]">
            <div className="p-2 rounded-lg bg-[#10B981]/10 text-[#10B981]">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-[#94A3B8] block">Network Status</span>
              {dataState === "loading" ? (
                <div className="h-4 w-20 bg-white/10 rounded animate-pulse mt-1" />
              ) : dataState === "error" ? (
                <div className="flex items-center gap-1.5 text-xs font-medium text-[#94A3B8]">
                  <span className="w-2 h-2 rounded-full bg-zinc-500" />
                  —
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#F8FAFC]">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                  Soroban Testnet Live
                </div>
              )}
            </div>
          </div>

          {/* Pill 2: Anchor Count */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#0B0A12]/40 border border-[rgba(248,250,252,0.06)]">
            <div className="p-2 rounded-lg bg-[#3B82F6]/10 text-[#3B82F6]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-[#94A3B8] block">Active Anchors</span>
              {dataState === "loading" ? (
                <div className="h-4 w-16 bg-white/10 rounded animate-pulse mt-1" />
              ) : dataState === "error" ? (
                <div className="flex items-center gap-1.5 text-xs font-medium text-[#94A3B8]">
                  <span className="w-2 h-2 rounded-full bg-zinc-500" />
                  —
                </div>
              ) : (
                <span className="text-xs font-bold text-[#F8FAFC] font-mono-num">190+ SEP-24 Anchors</span>
              )}
            </div>
          </div>

          {/* Pill 3: Average Claim Time */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#0B0A12]/40 border border-[rgba(248,250,252,0.06)]">
            <div className="p-2 rounded-lg bg-[#A855F7]/10 text-[#A855F7]">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-[#94A3B8] block">Avg Claim Time</span>
              {dataState === "loading" ? (
                <div className="h-4 w-16 bg-white/10 rounded animate-pulse mt-1" />
              ) : dataState === "error" ? (
                <div className="flex items-center gap-1.5 text-xs font-medium text-[#94A3B8]">
                  <span className="w-2 h-2 rounded-full bg-zinc-500" />
                  —
                </div>
              ) : (
                <span className="text-xs font-bold text-[#F8FAFC] font-mono-num">&lt; 2.4 sec</span>
              )}
            </div>
          </div>

          {/* Pill 4: Protocol Fee */}
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#0B0A12]/40 border border-[rgba(248,250,252,0.06)]">
            <div className="p-2 rounded-lg bg-[#F97316]/10 text-[#F97316]">
              <Percent className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-medium text-[#94A3B8] block">Protocol Fee</span>
              {dataState === "loading" ? (
                <div className="h-4 w-14 bg-white/10 rounded animate-pulse mt-1" />
              ) : dataState === "error" ? (
                <div className="flex items-center gap-1.5 text-xs font-medium text-[#94A3B8]">
                  <span className="w-2 h-2 rounded-full bg-zinc-500" />
                  —
                </div>
              ) : (
                <span className="text-xs font-bold text-[#F97316] font-mono-num">0.25% Flat</span>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
