"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PulsePayLogo } from "@/components/ui/PulsePayLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#pulse-bar", label: "Pricing" },
    { href: "/#trust", label: "Security" },
    { href: "https://oobayemi.gitbook.io/pulsepay", label: "Documentation", external: true },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-bg-elevated shadow-sm border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold text-lg tracking-tight group"
        >
          <PulsePayLogo className="w-8 h-8" size={32} />
          <span className="text-fg">PulsePay</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map(({ href, label, external }) =>
            external ? (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-sm font-semibold text-fg-muted hover:text-fg hover:bg-bg-sunken transition-colors"
              >
                {label}
              </a>
            ) : (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-fg-muted hover:text-fg hover:bg-bg-sunken transition-colors"
              >
                {label}
              </Link>
            )
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/login?role=employer"
            className="grad-brand text-sm font-bold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
          >
            Launch App
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-fg-muted border border-border"
            aria-label="Menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-bg-elevated border-t border-border px-6 py-4 space-y-2 overflow-hidden"
          >
            {links.map(({ href, label, external }) =>
              external ? (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-fg-muted hover:text-fg hover:bg-bg-sunken"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              ) : (
                <Link
                  key={href}
                  href={href}
                  className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-fg-muted hover:text-fg hover:bg-bg-sunken"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              )
            )}
            <Link
              href="/login?role=employer"
              className="block grad-brand text-sm font-bold px-5 py-2.5 rounded-xl text-center"
              onClick={() => setOpen(false)}
            >
              Launch App
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
