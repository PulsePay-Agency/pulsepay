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
        <linearGradient id="pp-react-g" x1="0" y1="200" x2="200" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00FF9D" />
          <stop offset="50%" stopColor="#00E5FF" />
          <stop offset="100%" stopColor="#00A3FF" />
        </linearGradient>
        <filter id="pp-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="200" height="200" rx="46" fill="#080C13" />
      <rect x="2" y="2" width="196" height="196" rx="44" fill="none" stroke="url(#pp-react-g)" strokeWidth="1" strokeOpacity="0.18" />

      {/* P — vertical stem */}
      <rect x="58" y="38" width="14" height="124" rx="7" fill="url(#pp-react-g)" filter="url(#pp-glow)" />

      {/* P — top bar */}
      <rect x="68" y="38" width="58" height="14" rx="7" fill="url(#pp-react-g)" filter="url(#pp-glow)" />

      {/* P — curved right bump */}
      <path
        d="M 126 52 C 152 52 152 104 126 104"
        stroke="url(#pp-react-g)"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
        filter="url(#pp-glow)"
      />

      {/* P — middle bar */}
      <rect x="68" y="97" width="58" height="14" rx="7" fill="url(#pp-react-g)" filter="url(#pp-glow)" />

      {/* ECG Pulse Wave */}
      <path
        d="M 48 148 L 70 148 L 82 124 L 96 172 L 110 118 L 124 148 L 152 148"
        stroke="url(#pp-react-g)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#pp-glow)"
      />

      {/* Pulse node dot */}
      <circle cx="152" cy="148" r="5.5" fill="url(#pp-react-g)" filter="url(#pp-glow)" />
    </svg>
  );
}
