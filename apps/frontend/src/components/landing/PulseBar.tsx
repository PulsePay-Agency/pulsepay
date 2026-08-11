"use client";
import React, { useState, useEffect } from "react";
import { Activity, ShieldCheck, Clock, Percent } from "lucide-react";
import { motion } from "framer-motion";
import { SectionReveal, StaggerReveal, staggerItem } from "@/components/ui/SectionReveal";

type PulseBarState = "loading" | "loaded" | "error";

/* ── Section 3: Live Protocol Pulse Bar ───────────────────────────────── */
export default function PulseBar() {
  const [dataState, setDataState] = useState<PulseBarState>("loading");

  useEffect(() => {
    const t = setTimeout(() => setDataState("loaded"), 600);
    return () => clearTimeout(t);
  }, []);

  const pills = [
    {
      icon: Activity,
      label: "Network Status",
      loaded: (
        <div className="flex items-center gap-1.5 text-xs font-bold text-fg">
          <span className="w-2 h-2 rounded-full bg-signal animate-master-pulse-scale" />
          Soroban Testnet Live
        </div>
      ),
    },
    {
      icon: ShieldCheck,
      label: "Active Anchors",
      loaded: <span className="text-xs font-bold text-fg font-mono-num">190+ SEP-24 Anchors</span>,
    },
    {
      icon: Clock,
      label: "Avg Claim Time",
      loaded: <span className="text-xs font-bold text-fg font-mono-num">&lt; 2.4 sec</span>,
    },
    {
      icon: Percent,
      label: "Protocol Fee",
      loaded: <span className="text-xs font-bold text-accent font-mono-num">0.25% Flat</span>,
    },
  ];

  return (
    <section id="pulse-bar" className="w-full relative z-20">
      <SectionReveal>
        <div className="w-full bg-bg-elevated border-y border-border py-4 animate-border-pulse">
          <StaggerReveal className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
            {pills.map(({ icon: Icon, label, loaded }) => (
              <motion.div
                key={label}
                variants={staggerItem}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-bg-sunken border border-border"
              >
                <div className="p-2 rounded-lg bg-bg-elevated border border-border text-accent">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-medium text-fg-muted block">{label}</span>
                  {dataState === "loading" ? (
                    <div className="h-4 w-20 bg-border rounded mt-1" />
                  ) : dataState === "error" ? (
                    <div className="flex items-center gap-1.5 text-xs font-medium text-fg-muted">
                      <span className="w-2 h-2 rounded-full bg-fg-faint" />
                      —
                    </div>
                  ) : (
                    loaded
                  )}
                </div>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>
      </SectionReveal>
    </section>
  );
}
