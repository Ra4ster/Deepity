import React, { useState } from "react";
import { Clock, ChevronRight } from "lucide-react";

export default function PreviewTutorial({
  number,
  title,
  description,
  time,
  icon: Icon,
  href = "#",
}) {
  const [isHovered, setIsHovered] = useState(false);
  const gradientId = `magic-gradient-${number}`;

  return (
    <a
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="d-block p-3 rounded mb-2 bg-dark bg-opacity-75 border border-secondary text-decoration-none"
      style={{
        borderColor: isHovered ? "#0d6efd" : undefined,
        transition: "border-color 0.2s ease-in-out",
        position: "relative",
        maxWidth: "50%",
        width: "100%",
      }}
    >
      {/* Shared gradient definition so the icon's stroke matches .magic-text's colors.
          (background-clip:text only paints actual text glyphs, so the icon needs its
          own SVG gradient rather than the magic-text class itself.) */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--purple)" />
            <stop offset="50%" stopColor="var(--violet)" />
            <stop offset="100%" stopColor="var(--blue)" />
          </linearGradient>
        </defs>
      </svg>

      <div className="d-flex align-items-center justify-content-between mb-3">
        <span
          className="d-flex align-items-center justify-content-center roboto fw-semibold"
          style={{
            width: 28,
            height: 28,
            fontSize: 13,
            borderRadius: "50%",
            border: "1px solid transparent",
            background:
              "linear-gradient(#131b2b, #131b2b) padding-box, linear-gradient(to right, var(--purple), var(--violet), var(--blue)) border-box",
          }}
        >
          <span className="magic-text">{number}</span>
        </span>
        {Icon && (
          <Icon
            size={20}
            stroke={`url(#${gradientId})`}
            style={{ display: "block", flexShrink: 0 }}
          />
        )}
      </div>

      <h6
        className="text-white roboto fw-semibold mb-3"
        style={{ fontSize: 16 }}
      >
        {title}
      </h6>

      <p
        className="text-light roboto mb-5"
        style={{
          fontSize: 14,
          fontWeight: 300,
        }}
      >
        {description}
      </p>

      <div className="d-flex align-items-center justify-content-between">
        <div
          className="d-flex align-items-center text-secondary roboto"
          style={{ fontSize: 13 }}
        >
          <Clock size={14} className="me-1" />
          {time} mins
        </div>
        <ChevronRight
          size={18}
          className="text-light"
          style={{
            transform: isHovered ? "translateX(4px)" : "translateX(0)",
            transition: "transform 0.2s ease-in-out",
          }}
        />
      </div>
    </a>
  );
}
