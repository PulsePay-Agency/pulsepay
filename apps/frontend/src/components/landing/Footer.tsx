"use client";
import React from "react";
import Link from "next/link";
import { MicroPulseLine } from "./Navigation";

/* ── Section 8: Footer ─────────────────────────────────────────────────── */
export default function Footer() {
  return (
    <footer className="w-full border-t border-[rgba(248,250,252,0.08)] py-12 px-6 bg-[#0B0A12]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-[#94A3B8]">
        
        {/* Left: Wordmark + Micro-pulse + Copyright */}
        <div className="flex items-center gap-3">
          <Link href="/" className="font-bold text-lg text-[#F8FAFC]">
            PulsePay
          </Link>
          <MicroPulseLine width={24} />
          <span className="text-xs text-[#94A3B8] ml-2">© 2026 PulsePay Protocol</span>
        </div>

        {/* Center: Quick Links */}
        <div className="flex flex-wrap justify-center items-center gap-6">
          <a href="#pulse-bar" className="hover:text-[#F8FAFC] transition-colors">
            Pricing
          </a>
          <a href="#trust" className="hover:text-[#F8FAFC] transition-colors">
            Security
          </a>
          <a
            href="https://oobayemi.gitbook.io/pulsepay"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F8FAFC] transition-colors"
          >
            Docs
          </a>
          <a
            href="https://github.com/PulsePay-Agency/pulsepay"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F8FAFC] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#F8FAFC] transition-colors"
          >
            X
          </a>
        </div>

        {/* Right: Network Attribution */}
        <div className="text-xs font-medium text-[#94A3B8]">
          Built on <span className="text-[#F8FAFC] font-semibold">Stellar</span> · Powered by <span className="text-[#10B981] font-semibold font-mono-num">Soroban</span>
        </div>

      </div>
    </footer>
  );
}
