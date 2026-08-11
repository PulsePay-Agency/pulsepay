"use client";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={`w-9 h-9 rounded-xl flex items-center justify-center text-fg-muted hover:text-fg bg-bg-sunken border border-border hover:border-border-strong transition-colors ${className}`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-[var(--ribbon-1)]" />
      ) : (
        <Moon className="w-4 h-4 text-[var(--accent)]" />
      )}
    </button>
  );
}
