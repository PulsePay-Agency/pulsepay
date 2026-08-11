import React from "react";

interface PulsePayLogoProps {
  className?: string;
  size?: number;
  /** When true, skip opaque ink square — for inline nav on light/dark bg */
  transparent?: boolean;
}

export function PulsePayLogo({
  className = "w-8 h-8",
  size,
  transparent = false,
}: PulsePayLogoProps) {
  const style = size ? { width: size, height: size } : undefined;
  const uid = React.useId().replace(/:/g, "");

  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-hidden
    >
      <defs>
        <linearGradient
          id={`ink-clay-${uid}`}
          x1="40"
          y1="160"
          x2="170"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="var(--river-b)" />
          <stop offset="55%" stopColor="var(--river-a)" />
          <stop offset="100%" stopColor="var(--ribbon-1)" />
        </linearGradient>
      </defs>

      {!transparent && (
        <>
          <rect width="200" height="200" rx="40" fill="var(--bg-sunken)" />
          <rect
            x="3"
            y="3"
            width="194"
            height="194"
            rx="37"
            fill="none"
            stroke="var(--border-strong)"
            strokeWidth="1.5"
          />
        </>
      )}

      {/* Continuous river forming P + pulse notch */}
      <path
        d="M 58 42
           L 58 158
           M 58 42
           C 58 42 118 42 132 42
           C 162 42 168 78 140 96
           C 128 104 110 106 96 106
           L 58 106
           M 96 106
           C 130 106 150 130 128 152
           C 118 162 98 158 88 148
           L 102 128
           L 114 158
           L 128 138
           L 148 148"
        stroke={`url(#ink-clay-${uid})`}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        className="animate-master-pulse-scale"
        style={{ transformOrigin: "100px 100px" }}
      />

      <path
        d="M 48 168 C 80 156 110 172 152 160"
        stroke="var(--ribbon-2)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeOpacity="0.55"
        fill="none"
      />
    </svg>
  );
}
