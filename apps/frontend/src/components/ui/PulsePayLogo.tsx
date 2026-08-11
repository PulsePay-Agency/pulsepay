import React from "react";

interface PulsePayLogoProps {
  className?: string;
  size?: number;
  /** Unused — mark is self-contained on clay tile */
  transparent?: boolean;
}

/**
 * PulsePay logo mark
 * Clay rounded tile · cream filled P · clean heartbeat under the stem
 */
export function PulsePayLogo({ className = "w-8 h-8", size }: PulsePayLogoProps) {
  const style = size ? { width: size, height: size } : undefined;
  const uid = React.useId().replace(/:/g, "");

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      role="img"
      aria-label="PulsePay"
    >
      <defs>
        <linearGradient
          id={`pp-tile-${uid}`}
          x1="20"
          y1="180"
          x2="180"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="var(--river-b, #9A3412)" />
          <stop offset="55%" stopColor="var(--accent, #C45C26)" />
          <stop offset="100%" stopColor="var(--ribbon-1, #D97706)" />
        </linearGradient>
      </defs>

      {/* Clay tile */}
      <rect width="200" height="200" rx="48" fill={`url(#pp-tile-${uid})`} />

      {/* Soft highlight for depth */}
      <rect
        x="10"
        y="10"
        width="180"
        height="180"
        rx="40"
        fill="none"
        stroke="var(--cta-on, #EDE6DC)"
        strokeOpacity="0.12"
        strokeWidth="2"
      />

      {/* Filled P */}
      <path
        fill="var(--cta-on, #EDE6DC)"
        fillRule="evenodd"
        d="M 52 36
           H 118
           C 156 36 178 58 178 92
           C 178 126 156 148 118 148
           H 76
           V 164
           H 52
           Z
           M 76 60
           V 124
           H 114
           C 138 124 150 112 150 92
           C 150 72 138 60 114 60
           Z"
      />

      {/* Clean heartbeat — one spike, no scribble */}
      <path
        d="M 52 172
           L 78 172
           L 90 152
           L 106 184
           L 120 164
           L 132 172
           L 160 172"
        stroke="var(--cta-on, #EDE6DC)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
