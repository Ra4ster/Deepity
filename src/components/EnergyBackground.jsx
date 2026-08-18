import { useEffect, useRef, useState } from "react";

// Halo is a Three.js-based Vanta effect, so load Three.js first.
// Loading both as classic <script> tags avoids Vite's import-analysis issues
// with Vanta's deep package paths.
const THREE_SRC =
  "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";

const VANTA_HALO_SRC =
  "https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.halo.min.js";

function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);

    if (existing) {
      if (existing.dataset.loaded === "true") {
        resolve();
        return;
      }

      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;

    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };

    script.onerror = reject;

    document.head.appendChild(script);
  });
}

function EnergyBackground({ opacity = 1 }) {
  const backgroundRef = useRef(null);
  const containerRef = useRef(null);
  const vantaRef = useRef(null);
  const destroyTimeoutRef = useRef(null);

  const [reduceMotion, setReduceMotion] = useState(false);

  // Detect reduced-motion preference.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    setReduceMotion(mq.matches);

    const handleChange = (event) => {
      setReduceMotion(event.matches);
    };

    mq.addEventListener?.("change", handleChange);

    return () => {
      mq.removeEventListener?.("change", handleChange);
    };
  }, []);

  // Subtle 15% upward parallax on scroll.
  useEffect(() => {
    if (reduceMotion) return;

    let animationFrameId;
    let lastScrollTop = -1;

    const renderLoop = () => {
      // Read the raw scroll value directly from the window/document on every frame,
      // completely bypassing the broken event pipeline.
      const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      // Only touch the DOM if the user actually moved to save performance
      if (scrollTop !== lastScrollTop && backgroundRef.current) {
        // -0.85 moves the background up slightly slower than the actual scroll
        const offset = scrollTop * -0.65;

        backgroundRef.current.style.transform = `translate3d(0, ${offset}px, 0)`;
        lastScrollTop = scrollTop;
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    // Kick off the loop
    renderLoop();

    return () => cancelAnimationFrame(animationFrameId);
  }, [reduceMotion]);

  // Initialize Vanta Halo.
  useEffect(() => {
    if (reduceMotion) return;

    // React 18 Strict Mode can run cleanup/re-initialization immediately
    // during development. Cancel a pending destroy if that happens.
    if (destroyTimeoutRef.current !== null) {
      clearTimeout(destroyTimeoutRef.current);
      destroyTimeoutRef.current = null;
    }

    const runId = Math.random().toString(36).slice(2, 7);

    async function init() {
      console.log(`[EnergyBackground:${runId}] init start`);

      try {
        // Halo requires Three.js.
        await loadScriptOnce(THREE_SRC);

        console.log(
          `[EnergyBackground:${runId}] Three.js loaded:`,
          window.THREE,
        );

        // Load Vanta Halo after Three.js.
        await loadScriptOnce(VANTA_HALO_SRC);

        console.log(
          `[EnergyBackground:${runId}] Vanta Halo loaded:`,
          window.VANTA,
        );

        if (!containerRef.current) {
          console.log(
            `[EnergyBackground:${runId}] bailing — container unmounted`,
          );
          return;
        }

        if (!window.VANTA || !window.VANTA.HALO) {
          console.error(
            `[EnergyBackground:${runId}] window.VANTA.HALO is missing`,
          );
          return;
        }

        // Avoid creating multiple effects during Strict Mode.
        if (vantaRef.current) {
          console.log(
            `[EnergyBackground:${runId}] skipping — effect already exists`,
          );
          return;
        }

        const { width, height } = containerRef.current.getBoundingClientRect();

        console.log(
          `[EnergyBackground:${runId}] container size:`,
          width,
          height,
        );

        if (width === 0 || height === 0) {
          console.warn(
            `[EnergyBackground:${runId}] container is 0x0 — Vanta will render nothing.`,
          );
        }

        vantaRef.current = window.VANTA.HALO({
          el: containerRef.current,

          mouseControls: false,
          touchControls: true,
          gyroControls: false,

          minHeight: 200.0,
          minWidth: 200.0,

          baseColor: 0x00111c,
          backgroundColor: 0x00111c,

          amplitudeFactor: 1.5,

          // Shift Halo toward the right.
          xOffset: 0.25,
          yOffset: 0.25,

          size: 1.0,
        });

        window.__vantaEffect = vantaRef.current;

        console.log(
          `[EnergyBackground:${runId}] Halo effect created:`,
          vantaRef.current,
        );
      } catch (err) {
        console.error(
          `[EnergyBackground:${runId}] failed to load/init Vanta Halo:`,
          err,
        );
      }
    }

    init();

    return () => {
      console.log(`[EnergyBackground:${runId}] cleanup scheduled`);

      // Defer destruction so React Strict Mode's development-only
      // mount → cleanup → mount cycle doesn't unnecessarily destroy
      // and recreate the Vanta instance.
      destroyTimeoutRef.current = setTimeout(() => {
        console.log(`[EnergyBackground:${runId}] destroying for real`);

        vantaRef.current?.destroy();
        vantaRef.current = null;

        if (window.__vantaEffect) {
          delete window.__vantaEffect;
        }

        destroyTimeoutRef.current = null;
      }, 0);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={backgroundRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",

        // INCREASED HEIGHT: gives the background bleed room
        // at the bottom so parallax doesn't pull it off-screen.
        height: "150dvh",

        // Background layer.
        zIndex: 0,

        pointerEvents: "none",
        overflow: "hidden",

        // Makes the parallax transform smoother.
        willChange: "transform",
      }}
    >
      <div
        ref={containerRef}
        style={{
          position: "absolute",
          inset: 0,

          width: "100%",
          height: "100%",

          opacity,
          backgroundColor: "#00111c",
        }}
      />
    </div>
  );
}

export default EnergyBackground;
