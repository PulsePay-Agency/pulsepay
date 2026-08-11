"use client";
import React, { useState, useEffect, useRef } from "react";
import { Fingerprint, FileCode, Copy, Check } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { SectionReveal } from "@/components/ui/SectionReveal";

/* ── Section 6: Trust & Transparency Strip ────────────────────────────── */
export default function TrustStrip() {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [glyphMorphed, setGlyphMorphed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const contractAddress = "CCW67355B86...3KLP98";
  const fullAddress = "CCW67355B869201948572019238472910293KLP98";

  // Detail F: Passkey morph once
  useEffect(() => {
    const done = sessionStorage.getItem("pulsepay_passkey_morph");
    if (done) {
      setGlyphMorphed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Time to one pulse beat (~1.9s into cycle feel)
          const delay = reduce ? 0 : 380;
          setTimeout(() => {
            setGlyphMorphed(true);
            sessionStorage.setItem("pulsepay_passkey_morph", "true");
          }, delay);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [reduce]);

  // Detail G: Liquid-burst copy
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
      <SectionReveal>
        <div className="relative panel p-8 rounded-3xl overflow-hidden">
          <div
            className="absolute -inset-8 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--ribbon-2) 12%, transparent), transparent 70%)",
            }}
            aria-hidden
          />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-bg-sunken border border-border flex items-center justify-center text-accent relative">
                {glyphMorphed ? (
                  <Check className="w-5 h-5 text-signal" />
                ) : (
                  <Fingerprint className="w-5 h-5" />
                )}
              </div>
              <div>
                <h5 className="text-sm font-bold text-fg">Passkey Auth</h5>
                <span className="text-xs text-fg-muted">WebAuthn Biometrics</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-bg-sunken border border-border flex items-center justify-center text-accent">
                <span className="text-xs font-bold font-mono-num">%</span>
              </div>
              <div>
                <h5 className="text-sm font-bold text-fg font-mono-num">0.25% Flat Fee</h5>
                <span className="text-xs text-fg-muted">Zero Hidden Markup</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-bg-sunken border border-border flex items-center justify-center text-accent">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-fg">Soroban Core</h5>
                <span className="text-xs text-fg-muted">Formally Audited</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-bg-sunken border border-border">
              <div className="space-y-0.5">
                <span className="text-[10px] font-semibold text-fg-muted uppercase tracking-wider block">
                  Contract ID
                </span>
                <span className="text-xs font-bold text-fg font-mono-num">{contractAddress}</span>
              </div>

              <button
                onClick={handleCopy}
                className="relative p-2 rounded-lg bg-bg-elevated border border-border hover:border-border-strong text-fg-muted hover:text-fg transition-colors overflow-visible"
                aria-label="Copy contract address"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-signal relative z-10" />
                    {!reduce && (
                      <span
                        className="absolute inset-0 rounded-full pointer-events-none animate-liquid-burst"
                        style={{
                          background: "color-mix(in srgb, var(--river-a) 40%, transparent)",
                        }}
                      />
                    )}
                  </>
                ) : copyFailed ? (
                  <span className="text-xs text-danger font-bold">Failed</span>
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
