"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";

/* ── Section 2: Hero Section & The Mandarin River ─────────────────────── */
export default function HeroRiver() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [scrollY, setScrollY] = useState(0);
  const [shimmerOffset, setShimmerOffset] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduce || !isDesktop) return;
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reduce, isDesktop]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !isDesktop || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    // Detail B: only shimmer layer displaces within ~120px feel — soft 2–4px
    const nx = ((cx / rect.width) - 0.5) * 8;
    const ny = ((cy / rect.height) - 0.5) * 8;
    setShimmerOffset({
      x: Math.max(-4, Math.min(4, nx)),
      y: Math.max(-4, Math.min(4, ny)),
    });
  };

  const coreParallax = reduce || !isDesktop ? 0 : scrollY * 0.15;
  const ribbonParallax = reduce || !isDesktop ? 0 : scrollY * 0.28;
  const shimmerParallax = reduce || !isDesktop ? 0 : scrollY * 0.4;

  return (
    <section className="relative pt-28 lg:pt-0 min-h-[720px] lg:h-screen max-h-[1080px] flex items-center px-6 overflow-hidden">
      <div className="absolute inset-0 paper-grain opacity-60" aria-hidden />
      <div
        className="absolute top-1/3 right-0 w-[55%] h-[50%] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
            Zero-click global payroll
          </span>

          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-fg">
            Money that <br className="hidden sm:inline" />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, var(--river-a), var(--ribbon-1), var(--river-b))",
              }}
            >
              never sleeps.
            </span>
          </h1>

          <p className="text-lg text-fg-muted max-w-xl leading-relaxed">
            Wages stream continuously on Soroban. Workers claim anytime. Employers fund once.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/login?role=employer"
              className="btn-primary px-6 py-3.5 rounded-xl flex items-center gap-2"
            >
              Employer Portal <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login?role=worker"
              className="btn-secondary px-6 py-3.5 rounded-xl flex items-center gap-2"
            >
              Worker Portal <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Column: Mandarin River */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setShimmerOffset({ x: 0, y: 0 })}
          className="lg:col-span-7 relative w-full h-[400px] lg:h-[580px] flex items-center justify-center"
        >
          {/* Shimmer reflection — Detail B + Parallax A */}
          <div
            className={`absolute inset-0 pointer-events-none ${reduce ? "" : "animate-shimmer"}`}
            style={{
              transform: `translate3d(${shimmerOffset.x}px, ${shimmerOffset.y + shimmerParallax}px, 0)`,
              filter: "blur(28px)",
              opacity: 0.45,
              transition: "transform 0.15s ease-out",
            }}
          >
            <svg viewBox="0 0 700 450" className="w-full h-full" fill="none" aria-hidden>
              <path
                d="M 50 220 Q 200 120 350 240 T 650 180"
                stroke="var(--river-a)"
                strokeWidth="70"
                strokeOpacity="0.35"
              />
            </svg>
          </div>

          <svg
            viewBox="0 0 700 480"
            className="w-full h-full relative z-10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <defs>
              <linearGradient id="river-core" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--river-a)" />
                <stop offset="100%" stopColor="var(--river-b)" />
              </linearGradient>
              <linearGradient id="feather-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--ribbon-1)" stopOpacity="0.75" />
                <stop offset="100%" stopColor="var(--ribbon-1)" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="feather-2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--ribbon-2)" stopOpacity="0.65" />
                <stop offset="100%" stopColor="var(--ribbon-2)" stopOpacity="0.15" />
              </linearGradient>
            </defs>

            {/* Ribbons — Parallax A */}
            <g style={{ transform: `translateY(${ribbonParallax}px)` }}>
              <path
                d="M 40 250 C 140 180 230 330 380 230 C 470 170 540 210 650 140"
                stroke="url(#feather-2)"
                strokeWidth="16"
                strokeLinecap="round"
                fill="none"
                className={reduce ? "" : "animate-ribbon-2"}
              />
              <path
                d="M 40 210 C 160 290 270 140 390 260 C 480 320 560 250 660 300"
                stroke="url(#feather-1)"
                strokeWidth="14"
                strokeLinecap="round"
                fill="none"
                className={reduce ? "" : "animate-ribbon-1"}
              />
            </g>

            {/* Core stream */}
            <g style={{ transform: `translateY(${coreParallax}px)` }}>
              <path
                d="M 30 220 Q 180 140 340 230 T 640 180"
                stroke="url(#river-core)"
                strokeWidth="22"
                strokeLinecap="round"
                fill="none"
                className={reduce ? "" : "animate-master-pulse"}
                style={{ transformOrigin: "center" }}
              />
              {/* Flow shimmer along path */}
              {!reduce && (
                <path
                  d="M 30 220 Q 180 140 340 230 T 640 180"
                  stroke="var(--cta-on)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.45"
                  className="animate-flow-dash"
                />
              )}

              {/* Branches */}
              <path d="M 340 230 Q 420 120 540 90" stroke="url(#river-core)" strokeWidth="7" strokeLinecap="round" fill="none" className={reduce ? "opacity-85" : "animate-master-pulse opacity-85"} style={{ animationDelay: "0.1s" }} />
              <path d="M 360 220 Q 450 160 560 160" stroke="url(#river-core)" strokeWidth="6" strokeLinecap="round" fill="none" className={reduce ? "opacity-80" : "animate-master-pulse opacity-80"} style={{ animationDelay: "0.15s" }} />
              <path d="M 350 235 Q 460 260 560 240" stroke="url(#river-core)" strokeWidth="6" strokeLinecap="round" fill="none" className={reduce ? "opacity-80" : "animate-master-pulse opacity-80"} style={{ animationDelay: "0.2s" }} />
              <path d="M 330 240 Q 430 340 550 330" stroke="url(#river-core)" strokeWidth="5" strokeLinecap="round" fill="none" className={reduce ? "opacity-75" : "animate-master-pulse opacity-75"} style={{ animationDelay: "0.25s" }} />
              <path d="M 310 245 Q 400 390 530 410" stroke="url(#river-core)" strokeWidth="4" strokeLinecap="round" fill="none" className={reduce ? "opacity-70" : "animate-master-pulse opacity-70"} style={{ animationDelay: "0.3s" }} />
            </g>
          </svg>

          {/* Currency badges — solid panels, soft float */}
          <div className="absolute inset-0 pointer-events-none z-20">
            {[
              { top: "12%", right: "18%", label: "USDC Stream", delay: "0s", dot: "var(--river-a)" },
              { top: "28%", right: "8%", label: "EURC Euro", delay: "0.4s", dot: "var(--ribbon-1)" },
              { top: "46%", right: "10%", label: "BRL Real", delay: "0.8s", dot: "var(--river-b)" },
              { top: "65%", right: "14%", label: "NGN Naira", delay: "1.2s", dot: "var(--ribbon-2)" },
            ].map((b) => (
              <div
                key={b.label}
                className={`absolute panel px-3.5 py-1.5 rounded-full text-xs font-semibold text-fg shadow-md flex items-center gap-1.5 ${reduce ? "" : "animate-badge-float"}`}
                style={{ top: b.top, right: b.right, animationDelay: b.delay }}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: b.dot }} />
                {b.label}
              </div>
            ))}
            <div
              className="absolute panel px-3 py-1 rounded-full text-[11px] font-medium text-fg-muted shadow-sm"
              style={{ top: "82%", right: "22%" }}
            >
              + 190+ Anchors
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
