"use client";
import Link from "next/link";
import { useState } from "react";
import { Zap, Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/#features", label: "Features" },
    { href: "/#how-it-works", label: "How It Works" },
    { href: "/pricing", label: "Pricing" },
    { href: "/security", label: "Security" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 glass">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <div className="w-7 h-7 gradient-purple rounded-lg flex items-center justify-center glow-purple">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span>PulsePay</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-[#94A3B8] hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm text-[#94A3B8] hover:text-white transition-colors font-medium">
            Log In
          </Link>
          <Link href="/login" className="gradient-purple glow-purple text-white text-sm font-semibold px-5 py-2 rounded-xl hover:opacity-90 transition-opacity">
            Launch App
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-white/70" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-white/5 px-6 py-4 space-y-4">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="block text-sm text-[#94A3B8] hover:text-white" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/login" className="block gradient-purple text-white text-sm font-semibold px-5 py-2.5 rounded-xl text-center hover:opacity-90 transition-opacity" onClick={() => setOpen(false)}>
            Launch App
          </Link>
        </div>
      )}
    </header>
  );
}
