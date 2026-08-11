"use client";
import React from "react";
import Link from "next/link";
import { MicroPulseLine } from "./Navigation";
import { PulsePayLogo } from "@/components/ui/PulsePayLogo";

/* ── Section 8: Footer ─────────────────────────────────────────────────── */
export default function Footer() {
  return (
    <footer className="w-full border-t border-border py-12 px-6 bg-bg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-fg-muted">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-fg">
            <PulsePayLogo className="w-7 h-7" size={28} />
            PulsePay
          </Link>
          <MicroPulseLine width={24} />
          <span className="text-xs text-fg-muted ml-2">© 2026 PulsePay Protocol</span>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6">
          <a href="#pulse-bar" className="hover:text-fg transition-colors">
            Pricing
          </a>
          <a href="#trust" className="hover:text-fg transition-colors">
            Security
          </a>
          <a
            href="https://oobayemi.gitbook.io/pulsepay"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fg transition-colors"
          >
            Docs
          </a>
          <a
            href="https://github.com/PulsePay-Agency/pulsepay"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fg transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-fg transition-colors"
          >
            X
          </a>
        </div>

        <div className="text-xs font-medium text-fg-muted">
          Built on <span className="text-fg font-semibold">Stellar</span> · Powered by{" "}
          <span className="text-accent font-semibold font-mono-num">Soroban</span>
        </div>
      </div>
    </footer>
  );
}
