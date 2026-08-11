"use client";
import React from "react";
import Navigation from "@/components/landing/Navigation";
import HeroRiver from "@/components/landing/HeroRiver";
import PulseBar from "@/components/landing/PulseBar";
import DualReality from "@/components/landing/DualReality";
import AnchorDelta from "@/components/landing/AnchorDelta";
import TrustStrip from "@/components/landing/TrustStrip";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function PulsePayLandingPage() {
  return (
    <main className="min-h-screen bg-bg text-fg relative overflow-hidden">
      {/* Section 1 — Sticky Navigation */}
      <Navigation />

      {/* Section 2 — Hero & Mandarin River */}
      <HeroRiver />

      {/* Section 3 — Live Protocol Pulse Bar */}
      <PulseBar />

      {/* Section 4 — Dual Reality */}
      <DualReality />

      {/* Section 5 — Anchor Delta */}
      <AnchorDelta />

      {/* Section 6 — Trust & Transparency */}
      <TrustStrip />

      {/* Section 7 — Final CTA */}
      <FinalCTA />

      {/* Section 8 — Footer */}
      <Footer />
    </main>
  );
}
