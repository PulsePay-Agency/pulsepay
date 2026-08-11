"use client";
import React, { useState } from "react";
import { Globe, ExternalLink } from "lucide-react";

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.12;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.12;
    setTransform({ x, y });
  };

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0 });
    onLeave();
  };

  return (
    <div
      tabIndex={0}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onFocus={onHover}
      onBlur={handleMouseLeave}
      className={`glass-card p-6 rounded-2xl border transition-all duration-300 cursor-pointer outline-none focus:ring-2 focus:ring-[#3B82F6] ${
        isHovered
          ? "border-[#10B981]/50 bg-[#16141F] shadow-xl shadow-[#10B981]/10 -translate-y-1"
          : "border-[rgba(248,250,252,0.08)] bg-[#16141F]/60"
      }`}
      style={{
        transform: isHovered
          ? `translate3d(${transform.x}px, ${transform.y - 4}px, 0)`
          : "translate3d(0, 0, 0)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#0B0A12] border border-[rgba(248,250,252,0.08)] flex items-center justify-center font-bold text-[#F8FAFC]">
          {name[0]}
        </div>
        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
          {badge}
        </span>
      </div>

      <h4 className="text-lg font-bold text-[#F8FAFC] mb-1 flex items-center justify-between">
        {name}
        <ExternalLink className={`w-3.5 h-3.5 transition-opacity ${isHovered ? "opacity-100 text-[#10B981]" : "opacity-0"}`} />
      </h4>

      <p className="text-xs text-[#94A3B8] font-medium mb-3">{region}</p>

      <div className="pt-3 border-t border-[rgba(248,250,252,0.06)] flex items-center justify-between text-xs">
        <span className="text-[#94A3B8]">Supported Asset</span>
        <span className="font-bold text-[#F8FAFC] font-mono-num">{asset}</span>
      </div>
    </div>
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
      
      {/* Delta Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] text-xs font-semibold border border-[#3B82F6]/20">
          <Globe className="w-3.5 h-3.5" />
          The Global Delta
        </div>
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-[#F8FAFC]">
          Cash out in local currency. <br />
          <span className="bg-gradient-to-r from-[#3B82F6] to-[#10B981] bg-clip-text text-transparent">
            Anywhere the river reaches.
          </span>
        </h2>
        <p className="text-[#94A3B8] text-base leading-relaxed">
          Soroban streams connect seamlessly with Stellar SEP-24 anchors to convert digital value into physical cash or local bank accounts instantly.
        </p>
      </div>

      {/* SVG Delta Branch Visual Connector */}
      <div className="w-full h-24 mb-6 relative">
        <svg viewBox="0 0 1000 100" className="w-full h-full overflow-visible" fill="none">
          <path
            d="M 500 0 Q 500 50 100 100 M 500 0 Q 500 50 300 100 M 500 0 Q 500 50 500 100 M 500 0 Q 500 50 700 100 M 500 0 Q 500 50 900 100"
            stroke="url(#delta-grad)"
            strokeWidth="3"
            strokeOpacity={activeAnchor !== null ? "0.8" : "0.35"}
            className="transition-all duration-300 animate-master-pulse"
          />
          <defs>
            <linearGradient id="delta-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* 6 Glass Anchor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {anchors.map((anchor, index) => (
          <AnchorCard
            key={anchor.name}
            {...anchor}
            isHovered={activeAnchor === index}
            onHover={() => setActiveAnchor(index)}
            onLeave={() => setActiveAnchor(null)}
          />
        ))}
      </div>
    </section>
  );
}
