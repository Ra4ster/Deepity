import { useEffect, useRef, useState } from "react";

// Fog is a Three.js-based Vanta effect, so load Three.js first.
// Loading both as classic <script> tags avoids Vite's import-analysis issues
// with Vanta's deep package paths.
const THREE_SRC =
  "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";

const VANTA_FOG_SRC =
  "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js";

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
  const containerRef = useRef(null);
  const vantaRef = useRef(null);
  const destroyTimeoutRef = useRef(null);

  const [reduceMotion, setReduceMotion] = useState(false);

  // Percentage height on an absolutely positioned element only resolves if
  // its containing block has an *explicit* height. Our relative wrapper in
  // App.jsx doesn't set one (its height is just whatever its content adds
  // up to), so `height: "100%"` can't compute against it. Instead, measure
  // the real document height in JS and apply it as an explicit pixel value,
  // keeping it in sync as content/layout changes.
  const [pageHeight, setPageHeight] = useState(0);

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

  // Keep pageHeight in sync with the document's actual scrollable height.
  useEffect(() => {
    const measure = () => {
      const doc = document.documentElement;
      const body = document.body;

      const height = Math.max(
        doc.scrollHeight,
        doc.offsetHeight,
        body.scrollHeight,
        body.offsetHeight,
      );

      setPageHeight(height);

      // Vanta effects size their canvas from the container's bounding
      // rect on window "resize" events; a height change driven by React
      // state (e.g. route change, content loading in) isn't a resize
      // event, so nudge Vanta to recalculate explicitly.
      vantaRef.current?.resize?.();
    };

    measure();

    window.addEventListener("resize", measure);

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("resize", measure);
      resizeObserver.disconnect();
    };
  }, []);

  // Initialize Vanta Fog.
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
      try {
        // Fog requires Three.js.
        await loadScriptOnce(THREE_SRC);

        // Load Vanta Fog after Three.js.
        await loadScriptOnce(VANTA_FOG_SRC);

        if (!containerRef.current) {
          console.log(
            `[EnergyBackground:${runId}] bailing — container unmounted`,
          );
          return;
        }

        if (!window.VANTA || !window.VANTA.FOG) {
          console.error(
            `[EnergyBackground:${runId}] window.VANTA.FOG is missing`,
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

        vantaRef.current = window.VANTA.FOG({
          el: containerRef.current,

          mouseControls: true,
          touchControls: true,
          gyroControls: false,

          minHeight: 200.0,
          minWidth: 200.0,

          highlightColor: 0xd100ff,
          midtoneColor: 0xb5ff,
          lowlightColor: 0x0, // consider 0x2eff,
          baseColor: 0x0,

          blurFactor: 0.6,
          zoom: 0.3,
          speed: 1.0,
        });

        window.__vantaEffect = vantaRef.current;
      } catch (err) {
        console.error(
          `[EnergyBackground:${runId}] failed to load/init Vanta Fog:`,
          err,
        );
      }
    }

    init();

    return () => {
      // Defer destruction so React Strict Mode's development-only
      // mount → cleanup → mount cycle doesn't unnecessarily destroy
      // and recreate the Vanta instance.
      destroyTimeoutRef.current = setTimeout(() => {
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
      ref={containerRef}
      style={{
        // Absolute (not fixed): scrolls with the rest of the page instead
        // of staying pinned to the viewport. Height is an explicit pixel
        // value from the measurement effect above (percentage height won't
        // resolve here — see comment on pageHeight). Falls back to 100dvh
        // for the very first render, before the first measurement runs.
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: pageHeight ? `${pageHeight}px` : "100dvh",

        zIndex: 0,

        pointerEvents: "none",
        overflow: "hidden",

        opacity,
        backgroundColor: "#00111c",
      }}
    />
  );
}

export default EnergyBackground;
