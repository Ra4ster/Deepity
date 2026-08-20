import React, { useState } from "react";
import {
  House,
  Download,
  Code2,
  Layers2,
  Zap,
  Brain,
  Flame,
  LayerArrowUp,
  Activity,
  SquaresUnite,
  SquareActivity,
  LifeBuoy,
  Podium,
  Feather,
  ArrowLeft,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NAV_GROUPS = [
  {
    title: "Getting Started",
    items: [
      {
        icon: Download,
        label: "Installation",
        href: "installation",
        number: 1,
      },
      {
        icon: Code2,
        label: "Your First PCN",
        href: "your-first-pcn",
        number: 2,
      },
      {
        icon: Layers2,
        label: "Training a PCN",
        href: "training-a-pcn",
        number: 3,
      },
      {
        icon: Zap,
        label: "Making Predictions",
        href: "making-predictions",
        number: 4,
      },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      {
        icon: Brain,
        label: "Predictive Coding 101",
        href: "predictive-coding-101",
        isGlobal: true, // Flagged to break out of /python/ or /cpp/
      },
      {
        icon: Flame,
        label: "Energy Minimization",
        href: "energy-minimization",
        isGlobal: true,
      },
      {
        icon: LayerArrowUp,
        label: "Layers & Connections",
        href: "layers-connections",
        isGlobal: true,
      },
      {
        icon: Activity,
        label: "Activations",
        href: "activations",
        isGlobal: true,
      },
      {
        icon: SquaresUnite,
        label: "Batched Computation",
        href: "batched-computation",
        isGlobal: true,
      },
    ],
  },
  {
    title: "Advanced",
    items: [
      {
        icon: SquareActivity,
        label: "Custom Activations",
        href: "custom-activations",
      },
      {
        icon: LifeBuoy,
        label: "Advanced Training",
        href: "advanced-training",
      },
      {
        icon: Podium,
        label: "Performance Tuning",
        href: "performance-tuning",
      },
      {
        icon: Feather,
        label: "Persistence & I/O",
        href: "persistence-io",
      },
    ],
  },
  {
    title: "Ecosystem",
    items: [
      { label: "Python API", href: "/tutorials/python-api", isGlobal: true },
      { label: "C++ API", href: "/tutorials/cpp-api", isGlobal: true },
      { label: "Java", href: "#", disabled: true, badge: "WIP" },
    ],
  },
];

function NavLink({
  icon: Icon,
  label,
  language,
  number,
  href,
  disabled,
  badge,
  isActive,
  isGlobal, // Extract the new flag
  onClick,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const showHighlight = isActive || (isHovered && !disabled);

  // Construct an absolute path to prevent relative routing bugs
  const targetPath = href.startsWith("/")
    ? href
    : isGlobal
      ? `/tutorials/${href}`
      : `/tutorials/${language}/${href}`;

  const sharedProps = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    className: "d-flex align-items-center roboto text-decoration-none rounded",
    style: {
      fontSize: "0.85rem",
      fontWeight: isActive ? 500 : 300,
      padding: "6px 8px",
      gap: 8,
      color: disabled ? "#5a6473" : isActive ? "#ffffff" : "#c8ced8",
      backgroundColor:
        showHighlight && !disabled ? "rgba(13, 110, 253, 0.15)" : "transparent",
      transition: "background-color 0.15s ease-in-out, color 0.15s ease-in-out",
      cursor: disabled ? "not-allowed" : "pointer",
    },
  };

  const content = (
    <>
      {Icon && (
        <Icon
          size={15}
          className="flex-shrink-0"
          style={{ display: "block" }}
        />
      )}
      <span className="flex-grow-1">
        {number ? `${number}. ` : ""}
        {label}
      </span>
      {badge && (
        <span
          className="roboto"
          style={{
            fontSize: "0.65rem",
            fontWeight: 600,
            padding: "1px 6px",
            borderRadius: 4,
            color: "#f0ad4e",
            border: "1px solid #f0ad4e",
            letterSpacing: "0.03em",
          }}
        >
          {badge}
        </span>
      )}
    </>
  );

  if (disabled) {
    return (
      <span
        {...sharedProps}
        aria-disabled="true"
        style={{ ...sharedProps.style, pointerEvents: "none" }}
      >
        {content}
      </span>
    );
  }

  return (
    <Link to={targetPath} onClick={onClick} {...sharedProps}>
      {content}
    </Link>
  );
}

export default function TutorialNavCard({ language = "python" }) {
  const [activeHref, setActiveHref] = useState("overview");
  const location = useLocation();

  const isHubPage =
    location.pathname === `/tutorials/${language}` ||
    location.pathname === `/tutorials/${language}/` ||
    location.pathname === `/tutorials` ||
    location.pathname === `/tutorials/`;

  const handleClick = (href) => (e) => {
    setActiveHref(href);
  };

  const backTarget =
    language === "core" ? "/tutorials" : `/tutorials/${language}`;
  const backLabel =
    language === "cpp"
      ? "C++ Hub"
      : language === "core"
        ? "Tutorials Overview"
        : "Python Hub";

  return (
    <div className="p-3 rounded mb-2 bg-dark bg-opacity-75 border border-secondary">
      {!isHubPage && (
        <Link
          to={backTarget}
          className="d-flex align-items-center text-secondary text-decoration-none mb-3 roboto"
          style={{ fontSize: "0.85rem", transition: "color 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6c757d")}
        >
          <ArrowLeft size={16} className="me-2" />
          Back to {backLabel}
        </Link>
      )}

      <h6
        className="text-white mb-2 roboto"
        style={{
          fontSize: "0.95rem",
          fontWeight: 600,
          letterSpacing: "0.04em",
        }}
      >
        TUTORIALS
      </h6>
      <hr className="border-secondary opacity-25 my-2" />

      <div className="d-flex flex-column mb-3">
        <NavLink
          icon={House}
          label="Overview"
          language={language}
          href="/tutorials"
          isGlobal={true}
          isActive={activeHref === "overview"}
          onClick={handleClick("overview")}
        />
      </div>

      {NAV_GROUPS.map((group, groupIdx) => (
        <React.Fragment key={group.title}>
          {groupIdx > 0 && <hr className="border-secondary opacity-25 my-2" />}
          <p
            className="text-light roboto mb-1 mt-2"
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
            }}
          >
            {group.title.toUpperCase()}
          </p>
          <div className="d-flex flex-column">
            {group.items.map((item) => (
              <NavLink
                key={item.href}
                icon={item.icon}
                label={item.label}
                language={language}
                number={item.number}
                href={item.href}
                disabled={item.disabled}
                badge={item.badge}
                isGlobal={item.isGlobal}
                isActive={activeHref === item.href}
                onClick={handleClick(item.href)}
              />
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}
