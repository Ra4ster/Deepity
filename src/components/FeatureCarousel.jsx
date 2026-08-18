import { useEffect, useState } from "react";
import SpeedIcon from "../assets/gradients/speed.png";
import ChartIcon from "../assets/gradients/chart.png";
import GridIcon from "../assets/gradients/grid.png";
import LayersIcon from "../assets/gradients/layers.png";
import SysTaskIcon from "../assets/gradients/systask.png";

const FEATURES = [
  {
    icon: SpeedIcon,
    title: "Hyper-Optimized",
    description:
      "Hand-tuned SIMD kernels and cache-friendly memory layouts extract maximum performance from modern CPUs.",
  },
  {
    icon: LayersIcon,
    title: "Predictive Coding",
    description:
      "Biologically-inspired learning with faster convergence and better sample efficiency.",
  },
  {
    icon: GridIcon,
    title: "Batched by Design",
    description:
      "Train many examples at once with first-class batch support across the entire API.",
  },
  {
    icon: SysTaskIcon,
    title: "Custom Activations",
    description:
      "Built-in custom activation functions with vectorized implementations.",
  },
  {
    icon: ChartIcon,
    title: "OpenBLAS + OpenMP",
    description:
      "Leverages high-performance BLAS and multi-threading out of the box.",
  },
];

const getVisibleItems = () => {
  if (typeof window !== "undefined" && window.innerWidth < 768) {
    return 1;
  }

  return 3;
};

function FeatureCarousel() {
  const [index, setIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(getVisibleItems);

  useEffect(() => {
    const handleResize = () => {
      setVisibleItems(getVisibleItems());
      setIndex(0);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const maxIndex = Math.max(0, FEATURES.length - visibleItems);

  const goPrev = () => {
    setIndex((i) => Math.max(0, i - 1));
  };

  const goNext = () => {
    setIndex((i) => Math.min(maxIndex, i + 1));
  };

  return (
    <div
      id="featureCarousel"
      className="carousel slide position-relative cards"
      style={{
        marginLeft: "1rem",
        marginRight: "1rem",
        padding: "3rem 4rem",
        overflow: "hidden",
        background: "var(--panel)",
        opacity: "0.9",
        border: "1px solid var(--border)",
        borderRadius: "1rem",
        boxShadow: "0 20px 60px -20px rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      {/* left/right edge fade so the panel doesn't feel like a hard-edged
          rectangle dropped onto the hero section */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(to right, var(--panel) 0%, rgba(19,27,43,0) 8%, rgba(19,27,43,0) 92%, var(--panel) 100%)",
        }}
      />

      <div className="carousel-inner overflow-hidden">
        <div
          className="d-flex"
          style={{
            /*
             * IMPORTANT:
             * The transform percentage is relative to the track width,
             * so use FEATURES.length here rather than visibleItems.
             *
             * 5 items / 3 visible:
             * one step = 20% of track = 33.33% of viewport.
             */
            transform: `translateX(-${index * (100 / visibleItems)}%)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              className="flex-shrink-0 position-relative d-flex flex-column"
              style={{
                width: `${100 / visibleItems}%`,
                padding: "0 2rem",
              }}
            >
              {/* vertical fade separator (skip on first item) */}
              {i !== 0 && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "1px",
                    background:
                      "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.25) 20%, rgba(255,255,255,0.25) 80%, rgba(255,255,255,0))",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
                    maskImage:
                      "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
                  }}
                />
              )}

              <div
                className="d-flex align-items-center"
                style={{
                  marginBottom: "0.75rem",
                  gap: "0.75rem",
                }}
              >
                <img
                  src={feature.icon}
                  alt={`${feature.title} icon`}
                  style={{
                    width: "28px",
                    height: "28px",
                    flexShrink: 0,
                  }}
                />

                <h3
                  className="AllianceNo2"
                  style={{
                    color: "#ffffff",
                    fontSize: "1.15rem",
                    margin: 0,
                  }}
                >
                  {feature.title}
                </h3>
              </div>

              <p
                className="Roboto"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: "0.9rem",
                  fontWeight: 200,
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        onClick={goPrev}
        disabled={index === 0}
        style={{
          width: "3rem",
          opacity: index === 0 ? 0.3 : 1,
        }}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        onClick={goNext}
        disabled={index === maxIndex}
        style={{
          width: "3rem",
          opacity: index === maxIndex ? 0.3 : 1,
        }}
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default FeatureCarousel;
