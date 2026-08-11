"use client";
import React, { useState, useEffect, useRef } from "react";
import { Fingerprint, ShieldCheck, FileCode, Copy, Check } from "lucide-react";

/* ── Section 6: Trust & Transparency Strip ────────────────────────────── */
export default function TrustStrip() {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [glyphMorphed, setGlyphMorphed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const contractAddress = "CCW67355B86...3KLP98";
  const fullAddress = "CCW67355B869201948572019238472910293KLP98";

  // Passkey Morph on Scroll (Detail F)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !glyphMorphed) {
          setGlyphMorphed(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [glyphMorphed]);

  // Liquid-burst copy confirmation (Detail G)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopied(true);
      setCopyFailed(false);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyFailed(true);
      setTimeout(() => setCopyFailed(false), 2000);
    }
  };

  return (
    <section id="trust" ref={sectionRef} className="py-16 px-6 max-w-5xl mx-auto">
      <div className="relative glass-card p-8 rounded-3xl border border-[rgba(248,250,252,0.08)] bg-[#16141F]/80 shadow-2xl overflow-hidden">
        
        {/* Ambient Purple Glow */}
        <div className="absolute -inset-10 bg-[#A855F7]/10 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
          
          {/* Item 1: Passkey-Only Auth */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#A855F7]/10 border border-[#A855F7]/20 flex items-center justify-center text-[#A855F7] relative">
              {glyphMorphed ? (
                <Check className="w-5 h-5 animate-in zoom-in duration-300 text-[#10B981]" />
              ) : (
                <Fingerprint className="w-5 h-5" />
              )}
            </div>
            <div>
              <h5 className="text-sm font-bold text-[#F8FAFC]">Passkey Auth</h5>
              <span className="text-xs text-[#94A3B8]">WebAuthn Biometrics</span>
            </div>
          </div>

          {/* Item 2: 0.25% Flat Fee */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F97316]/10 border border-[#F97316]/20 flex items-center justify-center text-[#F97316]">
              <span className="text-xs font-bold font-mono-num">%</span>
            </div>
            <div>
              <h5 className="text-sm font-bold text-[#F8FAFC] font-mono-num">0.25% Flat Fee</h5>
              <span className="text-xs text-[#94A3B8]">Zero Hidden Markup</span>
            </div>
          </div>

          {/* Item 3: Soroban Smart Contracts */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6]">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-bold text-[#F8FAFC]">Soroban Core</h5>
              <span className="text-xs text-[#94A3B8]">Formally Audited</span>
            </div>
          </div>

          {/* Item 4: Contract Address & Copy */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#0B0A12]/60 border border-[rgba(248,250,252,0.08)]">
            <div className="space-y-0.5">
              <span className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider block">Contract ID</span>
              <span className="text-xs font-bold text-[#F8FAFC] font-mono-num">{contractAddress}</span>
            </div>

            <button
              onClick={handleCopy}
              className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors overflow-hidden"
              aria-label="Copy contract address"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#10B981]" />
                  {/* Liquid burst micro-animation */}
                  <span className="absolute inset-0 bg-[#10B981]/20 rounded-lg animate-ping pointer-events-none" />
                </>
              ) : copyFailed ? (
                <span className="text-xs text-red-400 font-bold">Failed</span>
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
