import React from "react";

interface PulsePayLogoProps {
  className?: string;
  size?: number;
}

export function PulsePayLogo({ className = "w-8 h-8", size }: PulsePayLogoProps) {
  const style = size ? { width: size, height: size } : {};

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <defs>
        <linearGradient id="pulsepay-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00FF9D" />
          <stop offset="50%" stopColor="#00E5FF" />
          <stop offset="100%" stopColor="#00A3FF" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Main P Outer Frame */}
      <path
        d="M 68 36 H 130 C 162 36 162 104 130 104 H 98 V 118 L 68 144 V 36 Z"
        stroke="url(#pulsepay-grad)"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* P Inner Loop Cutout */}
      <path
        d="M 98 62 H 125 C 142 62 142 80 125 80 H 98 V 62 Z"
        stroke="url(#pulsepay-grad)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Pulse ECG Wave Overlay */}
      <path
        d="M 40 96 H 82 L 94 66 L 108 134 L 122 76 L 134 104 L 146 96 H 160"
        stroke="url(#pulsepay-grad)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PulsePayAppIcon({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <div className={`relative rounded-2xl bg-black/90 p-2 border border-emerald-500/20 shadow-lg flex items-center justify-center ${className}`}>
      <PulsePayLogo className="w-full h-full" />
    </div>
  );
}
