"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function MicroPulseLine({ width = 24 }: { width?: number }) {
  return (
    <svg
      width={width}
      height="12"
      viewBox="0 0 24 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block align-middle"
    >
      <path
        d="M 0 6 L 6 6 L 9 2 L 13 10 L 16 6 L 24 6"
        stroke="url(#micropulse-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-master-pulse"
      />
      <defs>
        <linearGradient id="micropulse-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Section 1: Sticky Glass Navigation ────────────────────────────────── */
export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full h-[68px] transition-all duration-300 ${
        scrolled
          ? "bg-[#0B0A12]/90 backdrop-blur-xl border-b border-[rgba(248,250,252,0.08)] shadow-lg"
          : "bg-[#16141F]/65 backdrop-blur-md border-b border-[rgba(248,250,252,0.08)]"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Left: Wordmark & Micro-Pulse Line */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="font-bold text-xl text-[#F8FAFC] tracking-tight">PulsePay</span>
          <MicroPulseLine width={24} />
        </Link>

        {/* Center: Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#94A3B8]">
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
        </div>

        {/* Right: Dual CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login?role=worker"
            className="btn-glass px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
          >
            Worker Portal
          </Link>
          <Link
            href="/login?role=employer"
            className="bg-[#E85A3C] hover:bg-[#d44e32] text-[#F8FAFC] font-semibold px-4 py-2 rounded-xl text-sm shadow-md transition-all hover:-translate-y-0.5"
          >
            Employer Portal
          </Link>
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#94A3B8] hover:text-[#F8FAFC] p-2"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[68px] bg-[#0B0A12]/95 backdrop-blur-2xl border-b border-[rgba(248,250,252,0.08)] p-6 space-y-4 animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-3 text-base font-medium text-[#94A3B8] pb-2">
            <a
              href="#pulse-bar"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#F8FAFC]"
            >
              Pricing
            </a>
            <a
              href="#trust"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#F8FAFC]"
            >
              Security
            </a>
            <a
              href="https://oobayemi.gitbook.io/pulsepay"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#F8FAFC]"
            >
              Docs
            </a>
          </div>
          <div className="flex flex-col gap-3 pt-2 border-t border-[rgba(248,250,252,0.08)]">
            <Link
              href="/login?role=worker"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-glass text-center py-3 rounded-xl font-semibold"
            >
              Worker Portal
            </Link>
            <Link
              href="/login?role=employer"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-[#E85A3C] hover:bg-[#d44e32] text-[#F8FAFC] text-center py-3 rounded-xl font-semibold"
            >
              Employer Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
