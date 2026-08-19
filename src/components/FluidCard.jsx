import React from "react";

/**
 * A card that looks like it's filled with animated blue fluid.
 * The "liquid" is two overlapping wave SVGs that scroll horizontally
 * at different speeds/opacities (classic parallax liquid-fill trick),
 * plus a few bubbles drifting upward for extra life.
 *
 * fillPercent: how full the card looks (0–100)
 * color: base fluid color (solid, no gradient)
 */
export default function FluidCard({
  fillPercent = 65,
  color = "#0d6efd",
  width = 220,
  height = 120,
}) {
  return (
    <div
      className="rounded border border-secondary position-relative"
      style={{
        overflow: "hidden",
        height,
        width,
        backgroundColor: "#0d1420",
      }}
    >
      <style>{`
        @keyframes fluid-wave-scroll-a {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes fluid-wave-scroll-b {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes fluid-bob {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(4px); }
        }
        @keyframes fluid-bubble-rise {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          10%  { opacity: 0.55; }
          90%  { opacity: 0.2; }
          100% { transform: translateY(-160px) scale(0.6); opacity: 0; }
        }
      `}</style>

      {/* Fluid fill container, pinned to the bottom */}
      <div
        className="position-absolute bottom-0 start-0 w-100"
        style={{
          height: `${fillPercent}%`,
          animation: "fluid-bob 3.6s ease-in-out infinite",
        }}
      >
        {/* Back wave layer — slower, more transparent, sits behind */}
        <div
          className="position-absolute top-0 start-0"
          style={{
            width: "200%",
            height: "100%",
            top: -10,
            animation: "fluid-wave-scroll-a 9s linear infinite",
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 2400 400"
            preserveAspectRatio="none"
            style={{ display: "block" }}
          >
            <path
              d="M0,80 C150,140 350,20 600,80 C850,140 1050,20 1200,80
                 C1350,140 1550,20 1800,80 C1950,140 2150,20 2400,80
                 L2400,400 L0,400 Z"
              fill={color}
              opacity="0.45"
            />
          </svg>
        </div>

        {/* Front wave layer — faster, full opacity, sits on top */}
        <div
          className="position-absolute top-0 start-0"
          style={{
            width: "200%",
            height: "100%",
            top: 6,
            animation: "fluid-wave-scroll-b 6s linear infinite",
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 2400 400"
            preserveAspectRatio="none"
            style={{ display: "block" }}
          >
            <path
              d="M0,60 C200,10 400,110 600,60 C800,10 1000,110 1200,60
                 C1400,10 1600,110 1800,60 C2000,10 2200,110 2400,60
                 L2400,400 L0,400 Z"
              fill={color}
            />
          </svg>
        </div>

        {/* Solid fill below the waves so the bottom stays a flat block of color */}
        <div
          className="position-absolute bottom-0 start-0 w-100"
          style={{ height: "70%", backgroundColor: color }}
        />

        {/* Rising bubbles */}
        {[
          { left: "15%", size: 6, delay: "0s", duration: "4.5s" },
          { left: "38%", size: 4, delay: "1.2s", duration: "5.2s" },
          { left: "62%", size: 5, delay: "2.4s", duration: "4s" },
          { left: "82%", size: 3, delay: "0.6s", duration: "5.8s" },
        ].map((b, i) => (
          <div
            key={i}
            className="position-absolute rounded-circle bg-white"
            style={{
              left: b.left,
              bottom: 10,
              width: b.size,
              height: b.size,
              animation: `fluid-bubble-rise ${b.duration} ease-in infinite`,
              animationDelay: b.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
