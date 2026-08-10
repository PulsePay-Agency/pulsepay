"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { motion, AnimatePresence } from "framer-motion";
import { PulsePayLogo } from "@/components/ui/PulsePayLogo";

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
    { href: "https://oobayemi.gitbook.io/pulsepay", label: "Documentation", external: true },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-sm border-b border-subtle"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display font-bold text-lg tracking-tight group"
        >
          <div className="w-8 h-8 rounded-xl bg-black/90 p-1 border border-emerald-500/20 shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center">
            <PulsePayLogo className="w-full h-full" />
          </div>
          <span className="text-fg">PulsePay</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(({ href, label, external }) =>
            external ? (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-sm font-semibold text-fg-muted hover:text-fg hover:bg-surface-2 transition-all duration-150"
              >
                {label}
              </a>
            ) : (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-fg-muted hover:text-fg hover:bg-surface-2 transition-all duration-150"
              >
                {label}
              </Link>
            )
          )}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-fg-muted hover:text-fg hover:bg-surface-2 border border-subtle transition-all"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          <Link
            href="/login"
            className="px-4 py-2 rounded-xl text-sm font-bold text-fg-muted hover:text-fg transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/login"
            className="grad-brand text-white text-sm font-bold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity shadow-md"
          >
            Launch App →
          </Link>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-fg-muted border border-subtle"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-fg-muted hover:text-fg border border-subtle"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-subtle px-6 py-4 space-y-2 overflow-hidden"
          >
            {links.map(({ href, label, external }) =>
              external ? (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-fg-muted hover:text-fg hover:bg-surface-2 transition-all"
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-fg-muted hover:text-fg hover:bg-surface-2 transition-all"
                >
                  {label}
                </Link>
              )
            )}
            <div className="pt-2 border-t border-subtle">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block grad-brand text-white text-sm font-bold px-5 py-2.5 rounded-xl text-center shadow-md"
              >
                Launch App →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
