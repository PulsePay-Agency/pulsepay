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
    <main className="min-h-screen bg-[#0B0A12] text-[#F8FAFC] selection:bg-[#E85A3C]/30 relative overflow-hidden">
      {/* Section 1: Sticky Glass Navigation */}
      <Navigation />

      {/* Section 2: Hero Section & The Mandarin River */}
      <HeroRiver />

      {/* Section 3: Live Protocol Pulse Bar */}
      <PulseBar />

      {/* Section 4: Dual Reality Section */}
      <DualReality />

      {/* Section 5: Anchor River Continuation (The Delta) */}
      <AnchorDelta />

      {/* Section 6: Trust & Transparency Strip */}
      <TrustStrip />

      {/* Section 7: Final CTA Banner */}
      <FinalCTA />

      {/* Section 8: Footer */}
      <Footer />
    </main>
  );
}
