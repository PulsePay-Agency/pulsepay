"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Zap } from "lucide-react";
import { useTheme } from "@/lib/theme";

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#features", label: "Features" },
    { href: "/#how-it-works", label: "Protocol" },
    { href: "/pricing", label: "Pricing" },
    { href: "/security", label: "Security" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-card-dark border-b border-subtle"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-[64px] flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display font-bold text-[1.1rem] tracking-tight interactive"
        >
          <span className="relative flex items-center justify-center w-8 h-8 grad-brand rounded-[10px] glow-ink">
            <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
          </span>
          <span className="text-[var(--fg)]">PulsePay</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-2 rounded-xl text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-2)] transition-all duration-150"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-2)] transition-all"
          >
            {theme === "dark"
              ? <Sun className="w-4 h-4" />
              : <Moon className="w-4 h-4" />}
          </button>

          <Link
            href="/login"
            className="px-4 py-2 rounded-xl text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/login"
            className="grad-brand glow-ink text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 interactive"
          >
            Launch App →
          </Link>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggle} className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--fg-muted)]">
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button onClick={() => setOpen(!open)} className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--fg-muted)] hover:text-[var(--fg)]">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden glass border-t border-subtle animate-fade-up px-6 py-4 space-y-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 rounded-xl text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-[var(--surface-2)] transition-all"
            >
              {label}
            </Link>
          ))}
          <div className="pt-3 border-t border-subtle">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="block grad-brand glow-ink text-white text-sm font-semibold px-5 py-3 rounded-xl text-center hover:opacity-90 transition-opacity"
            >
              Launch App →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
