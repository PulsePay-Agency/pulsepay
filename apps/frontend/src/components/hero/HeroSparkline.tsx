"use client";
import React, { useState } from "react";
import { TrendingUp, Activity, DollarSign, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function HeroSparkline() {
  const [activeTab, setActiveTab] = useState<"flow" | "xlm">("flow");

  // Data sets normalized for SVG viewBox 0 0 300 100
  const flowPathData = {
    path: "M 0,80 Q 30,70 60,65 T 120,45 T 180,35 T 240,25 T 300,10",
    area: "M 0,80 Q 30,70 60,65 T 120,45 T 180,35 T 240,25 T 300,10 V 100 H 0 Z",
    metricPrimary: "+$0.0046 / sec",
    metricSub: "Active Accrual Velocity",
    badge: "100% Soroban Finality",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  const xlmPathData = {
    path: "M 0,65 Q 40,75 80,55 T 160,40 T 220,30 T 300,15",
    area: "M 0,65 Q 40,75 80,55 T 160,40 T 220,30 T 300,15 V 100 H 0 Z",
    metricPrimary: "$0.1604 XLM",
    metricSub: "Stellar Native Token",
    badge: "+2.4% (24h)",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  };

  const current = activeTab === "flow" ? flowPathData : xlmPathData;

  return (
    <div className="card-base p-5 rounded-2xl border border-subtle bg-surface-1 shadow-md space-y-4">
      {/* Header & Tabs */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-2 border border-subtle">
          <button
            onClick={() => setActiveTab("flow")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "flow"
                ? "bg-surface-0 text-fg shadow-sm border border-subtle"
                : "text-fg-muted hover:text-fg"
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            Stream Velocity
          </button>
          <button
            onClick={() => setActiveTab("xlm")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === "xlm"
                ? "bg-surface-0 text-fg shadow-sm border border-subtle"
                : "text-fg-muted hover:text-fg"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
            XLM Price
          </button>
        </div>

        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${current.badgeColor}`}>
          {current.badge}
        </span>
      </div>

      {/* Primary Metric */}
      <div className="flex items-baseline justify-between pt-1">
        <div>
          <AnimatePresence mode="wait">
            <motion.p
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-2xl font-extrabold text-fg font-mono tabular-nums tracking-tight"
            >
              {current.metricPrimary}
            </motion.p>
          </AnimatePresence>
          <p className="text-xs font-medium text-fg-muted">{current.metricSub}</p>
        </div>

        <div className="text-right">
          <span className="text-xs font-bold text-fg-muted uppercase tracking-wider block">Network</span>
          <span className="text-xs font-extrabold text-val-blue font-mono">Stellar Soroban</span>
        </div>
      </div>

      {/* Interactive SVG Sparkline */}
      <div className="relative h-28 w-full pt-2">
        <svg
          viewBox="0 0 300 100"
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.0" />
            </linearGradient>
            <filter id="glow-spark" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1="25" x2="300" y2="25" stroke="currentColor" className="text-subtle opacity-30" strokeDasharray="4 4" />
          <line x1="0" y1="65" x2="300" y2="65" stroke="currentColor" className="text-subtle opacity-30" strokeDasharray="4 4" />

          {/* Area Fill */}
          <motion.path
            key={`area-${activeTab}`}
            d={current.area}
            fill={`url(#${activeTab === "flow" ? "emeraldGradient" : "cyanGradient"})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />

          {/* Glowing Path Stroke */}
          <motion.path
            key={`path-${activeTab}`}
            d={current.path}
            fill="none"
            stroke={activeTab === "flow" ? "#10B981" : "#06B6D4"}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow-spark)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Active End Pulse Node */}
          <circle
            cx="300"
            cy="10"
            r="4"
            fill={activeTab === "flow" ? "#10B981" : "#06B6D4"}
            className="animate-ping"
          />
          <circle
            cx="300"
            cy="10"
            r="4"
            fill={activeTab === "flow" ? "#10B981" : "#06B6D4"}
          />
        </svg>
      </div>
    </div>
  );
}
