"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { PulsePayLogo } from "@/components/ui/PulsePayLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function MicroPulseLine({ width = 24 }: { width?: number }) {
  const uid = React.useId().replace(/:/g, "");
  return (
    <svg
      width={width}
      height="12"
      viewBox="0 0 32 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block align-middle"
      aria-hidden
    >
      <path
        d="M 1 6 L 8 6 L 11 2.5 L 16 9.5 L 20 4 L 23 6 L 31 6"
        stroke={`url(#mp-${uid})`}
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-master-pulse-scale"
        style={{ transformOrigin: "16px 6px" }}
      />
      <defs>
        <linearGradient id={`mp-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--river-a)" />
          <stop offset="100%" stopColor="var(--ribbon-1)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Section 1: Sticky Navigation ────────────────────────────────── */
export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full h-[68px] transition-colors duration-300 border-b ${
        scrolled
          ? "bg-bg-elevated border-border shadow-sm"
          : "bg-bg border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <PulsePayLogo className="w-8 h-8" size={32} />
          <span className="font-bold text-xl text-fg tracking-tight">PulsePay</span>
          <MicroPulseLine width={24} />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-fg-muted">
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
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/login?role=worker"
            className="btn-secondary px-4 py-2 rounded-xl text-sm"
          >
            Worker Portal
          </Link>
          <Link
            href="/login?role=employer"
            className="btn-primary px-4 py-2 rounded-xl text-sm"
          >
            Employer Portal
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-fg-muted hover:text-fg p-2"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[68px] bottom-0 bg-bg border-b border-border p-6 space-y-4 z-40">
          <div className="flex flex-col gap-3 text-base font-medium text-fg-muted pb-2">
            <a href="#pulse-bar" onClick={() => setMobileMenuOpen(false)} className="hover:text-fg">
              Pricing
            </a>
            <a href="#trust" onClick={() => setMobileMenuOpen(false)} className="hover:text-fg">
              Security
            </a>
            <a
              href="https://oobayemi.gitbook.io/pulsepay"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-fg"
            >
              Docs
            </a>
          </div>
          <div className="flex flex-col gap-3 pt-2 border-t border-border">
            <Link
              href="/login?role=worker"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-secondary text-center py-3 rounded-xl"
            >
              Worker Portal
            </Link>
            <Link
              href="/login?role=employer"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary text-center py-3 rounded-xl"
            >
              Employer Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
