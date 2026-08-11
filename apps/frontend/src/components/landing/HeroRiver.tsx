"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

/* ── Section 2: Hero Section & The Mandarin River ─────────────────────── */
export default function HeroRiver() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax scroll depth (Detail A)
  const [scrollY, setScrollY] = useState(0);
  // Cursor reactive shimmer ripple (Detail B)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x: x * 0.05, y: y * 0.05 });
  };

  return (
    <section className="relative pt-32 lg:pt-0 min-h-[720px] lg:h-screen max-h-[1080px] flex items-center px-6 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column (5 of 12 cols, ~42%) */}
        <div className="lg:col-span-5 space-y-6 z-10">
          <div className="inline-flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#F97316] font-semibold">
              Zero-click global payroll
            </span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-[#F8FAFC]">
            Money that <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#3B82F6] via-[#10B981] to-[#F97316] bg-clip-text text-transparent">
              never sleeps.
            </span>
          </h1>

          <p className="text-lg text-[#94A3B8] max-w-xl leading-relaxed">
            Wages stream continuously on Soroban. Workers claim anytime. Employers fund once.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/login?role=employer"
              className="bg-[#E85A3C] hover:bg-[#d44e32] text-[#F8FAFC] font-semibold px-6 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg shadow-[#E85A3C]/20 flex items-center gap-2"
            >
              Employer Portal <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login?role=worker"
              className="btn-glass px-6 py-3.5 rounded-xl font-semibold transition-all hover:-translate-y-0.5 flex items-center gap-2"
            >
              Worker Portal <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Column (7 of 12 cols, ~58%): The Mandarin River */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setMousePos({ x: 0, y: 0 });
          }}
          className="lg:col-span-7 relative w-full h-[400px] lg:h-[580px] flex items-center justify-center"
        >
          {/* Shimmer Reflection Layer (Detail B + Parallax A) */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30 transition-transform duration-300 ease-out animate-shimmer"
            style={{
              transform: `translate3d(${mousePos.x * 1.5}px, ${mousePos.y * 1.5 + scrollY * 0.04}px, 0)`,
              filter: "blur(24px)",
            }}
          >
            <svg viewBox="0 0 700 450" className="w-full h-full" fill="none">
              <path
                d="M 50 220 Q 200 120 350 240 T 650 180"
                stroke="#10B981"
                strokeWidth="60"
                strokeOpacity="0.3"
              />
            </svg>
          </div>

          {/* Master SVG River Asset */}
          <svg
            viewBox="0 0 700 480"
            className="w-full h-full relative z-10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* River Core Gradient */}
              <linearGradient id="river-core" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>

              {/* Feather Ribbon 1 (#F97316) */}
              <linearGradient id="feather-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F97316" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#F97316" stopOpacity="0.2" />
              </linearGradient>

              {/* Feather Ribbon 2 (#A855F7) */}
              <linearGradient id="feather-2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#A855F7" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#A855F7" stopOpacity="0.15" />
              </linearGradient>

              {/* River Glow Filter */}
              <filter id="river-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Parallax Group A */}
            <g style={{ transform: `translateY(${scrollY * 0.02}px)` }}>
              {/* Feather Ribbon 2 (#A855F7) - Undulating back layer */}
              <path
                d="M 40 250 C 140 180 230 330 380 230 C 470 170 540 210 650 140"
                stroke="url(#feather-2)"
                strokeWidth="14"
                strokeLinecap="round"
                fill="none"
                className="animate-ribbon-2"
              />

              {/* Feather Ribbon 1 (#F97316) - Undulating front layer */}
              <path
                d="M 40 210 C 160 290 270 140 390 260 C 480 320 560 250 660 300"
                stroke="url(#feather-1)"
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
                className="animate-ribbon-1"
              />
            </g>

            {/* Core Luminous Stream (Gradient #3B82F6 -> #10B981) */}
            <path
              d="M 30 220 Q 180 140 340 230 T 640 180"
              stroke="url(#river-core)"
              strokeWidth="20"
              strokeLinecap="round"
              fill="none"
              filter="url(#river-glow)"
              className="animate-master-pulse"
              style={{ transformOrigin: "center" }}
            />

            {/* Branching Curves (Echoing Pulse 0.12s Sequence) */}
            {/* Branch 1: USDC */}
            <path
              d="M 340 230 Q 420 120 540 90"
              stroke="url(#river-core)"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              className="animate-master-pulse opacity-85"
              style={{ animationDelay: "0.1s" }}
            />
            {/* Branch 2: EURC */}
            <path
              d="M 360 220 Q 450 160 560 160"
              stroke="url(#river-core)"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              className="animate-master-pulse opacity-80"
              style={{ animationDelay: "0.15s" }}
            />
            {/* Branch 3: BRL */}
            <path
              d="M 350 235 Q 460 260 560 240"
              stroke="url(#river-core)"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              className="animate-master-pulse opacity-80"
              style={{ animationDelay: "0.2s" }}
            />
            {/* Branch 4: NGN */}
            <path
              d="M 330 240 Q 430 340 550 330"
              stroke="url(#river-core)"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              className="animate-master-pulse opacity-75"
              style={{ animationDelay: "0.25s" }}
            />
            {/* Branch 5: + More Anchors */}
            <path
              d="M 310 245 Q 400 390 530 410"
              stroke="url(#river-core)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              className="animate-master-pulse opacity-70"
              style={{ animationDelay: "0.3s" }}
            />
          </svg>

          {/* Floating Glass Currency Badges on Branch Endpoints */}
          <div className="absolute inset-0 pointer-events-none z-20">
            {/* USDC Badge */}
            <div className="absolute top-[12%] right-[18%] glass-card px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#F8FAFC] shadow-lg flex items-center gap-1.5 animate-master-pulse border border-[rgba(248,250,252,0.12)]">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
              USDC Stream
            </div>

            {/* EURC Badge */}
            <div className="absolute top-[28%] right-[8%] glass-card px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#F8FAFC] shadow-lg flex items-center gap-1.5 border border-[rgba(248,250,252,0.12)]">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              EURC Euro
            </div>

            {/* BRL Badge */}
            <div className="absolute top-[46%] right-[10%] glass-card px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#F8FAFC] shadow-lg flex items-center gap-1.5 border border-[rgba(248,250,252,0.12)]">
              <span className="w-2 h-2 rounded-full bg-[#F97316]" />
              BRL Real
            </div>

            {/* NGN Badge */}
            <div className="absolute top-[65%] right-[14%] glass-card px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#F8FAFC] shadow-lg flex items-center gap-1.5 border border-[rgba(248,250,252,0.12)]">
              <span className="w-2 h-2 rounded-full bg-[#A855F7]" />
              NGN Naira
            </div>

            {/* + More Anchors Badge */}
            <div className="absolute top-[82%] right-[22%] glass-card px-3 py-1 rounded-full text-[11px] font-medium text-[#94A3B8] shadow-md border border-[rgba(248,250,252,0.08)]">
              + 190+ Anchors
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
