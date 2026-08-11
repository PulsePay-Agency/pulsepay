"use client";
import React, { useState } from "react";
import { Globe, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionReveal, StaggerReveal, staggerItem } from "@/components/ui/SectionReveal";

interface AnchorCardProps {
  name: string;
  region: string;
  asset: string;
  badge: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function AnchorCard({ name, region, asset, badge, isHovered, onHover, onLeave }: AnchorCardProps) {
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.12;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.12;
    setTransform({
      x: Math.max(-4, Math.min(4, x)),
      y: Math.max(-4, Math.min(4, y)),
    });
  };

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0 });
    onLeave();
  };

  return (
    <motion.div
      variants={staggerItem}
      tabIndex={0}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onFocus={onHover}
      onBlur={handleMouseLeave}
      className={`panel p-6 rounded-2xl transition-shadow duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent ${
        isHovered ? "border-border-strong shadow-lg -translate-y-1" : ""
      }`}
      style={{
        transform: isHovered
          ? `translate3d(${transform.x}px, ${transform.y - 4}px, 0)`
          : "translate3d(0, 0, 0)",
        borderColor: isHovered ? "var(--border-strong)" : undefined,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-bg-sunken border border-border flex items-center justify-center font-bold text-fg">
          {name[0]}
        </div>
        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-bg-sunken text-accent border border-border">
          {badge}
        </span>
      </div>

      <h4 className="text-lg font-bold text-fg mb-1 flex items-center justify-between">
        {name}
        <ExternalLink
          className={`w-3.5 h-3.5 transition-opacity text-accent ${isHovered ? "opacity-100" : "opacity-0"}`}
        />
      </h4>

      <p className="text-xs text-fg-muted font-medium mb-3">{region}</p>

      <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
        <span className="text-fg-muted">Supported Asset</span>
        <span className="font-bold text-fg font-mono-num">{asset}</span>
      </div>
    </motion.div>
  );
}

/* ── Section 5: Anchor River Continuation (The Delta) ─────────────────── */
export default function AnchorDelta() {
  const [activeAnchor, setActiveAnchor] = useState<number | null>(null);

  const anchors = [
    { name: "MoneyGram", region: "Global Physical Retail", asset: "USDC Fiat Cash", badge: "SEP-24 Cash Out" },
    { name: "Yellow Card", region: "Pan-Africa & Nigeria", asset: "NGN / USDC", badge: "Instant Bank" },
    { name: "Flutterwave", region: "West Africa Treasury", asset: "NGN / GHS", badge: "Direct Mobile" },
    { name: "Bitso", region: "Mexico & LATAM", asset: "MXN / USDC", badge: "SPEI Transfer" },
    { name: "Mercado Pago", region: "Brazil & Argentina", asset: "BRL / ARS", badge: "PIX Rails" },
    { name: "ANX Anchor", region: "Southeast Asia", asset: "SGD / PHP", badge: "Fast Settlement" },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
      <SectionReveal className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-bg-sunken text-accent text-xs font-semibold border border-border">
          <Globe className="w-3.5 h-3.5" />
          The Global Delta
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-fg">
          Cash out in local currency. <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, var(--river-a), var(--river-b))",
            }}
          >
            Anywhere the river reaches.
          </span>
        </h2>
        <p className="text-fg-muted text-base leading-relaxed">
          Soroban streams connect with Stellar SEP-24 anchors to convert digital value into
          physical cash or local bank accounts.
        </p>
      </SectionReveal>

      <div className="w-full h-24 mb-6 relative">
        <svg viewBox="0 0 1000 100" className="w-full h-full overflow-visible" fill="none" aria-hidden>
          {[100, 300, 500, 700, 900].map((x, i) => (
            <path
              key={x}
              d={`M 500 0 Q 500 50 ${x} 100`}
              stroke="url(#delta-grad)"
              strokeWidth={activeAnchor === i || activeAnchor === null ? 3 : 2}
              strokeOpacity={
                activeAnchor === null ? 0.4 : activeAnchor === i ? 1 : 0.2
              }
              className="transition-all duration-300 animate-master-pulse"
              style={{ animationDelay: `${i * 0.08}s` }}
            />
          ))}
          <defs>
            <linearGradient id="delta-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--river-a)" />
              <stop offset="100%" stopColor="var(--river-b)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {anchors.map((anchor, index) => (
          <AnchorCard
            key={anchor.name}
            {...anchor}
            isHovered={activeAnchor === index}
            onHover={() => setActiveAnchor(index)}
            onLeave={() => setActiveAnchor(null)}
          />
        ))}
      </StaggerReveal>
    </section>
  );
}
