import { useEffect, useRef, useState } from "react";

// Vanta's npm package doesn't declare an "exports" map, which trips up
// Vite's import-analysis when resolving deep subpaths like
// "vanta/dist/vanta.topology.min" even though the file exists on disk.
// Loading both libraries as classic <script> tags (as Vanta's own docs
// recommend for non-webpack setups) sidesteps that entirely — they attach
// themselves to `window` and we just wait for them to be ready.

const P5_SRC = "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js";
const VANTA_TOPOLOGY_SRC =
  "https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.topology.min.js";

function loadScriptOnce(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") return resolve();
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", reject);
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

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
  }, []);

  useEffect(() => {
    // No built-in static mode in Vanta, so reduced-motion users just get the
    // flat background color and we skip mounting the canvas altogether.
    if (reduceMotion) return;

    // React 18 Strict Mode runs this effect's cleanup and then re-runs the
    // effect again immediately on every dev mount, to help surface bugs.
    // Cancel any destroy the immediately-preceding pass just scheduled below
    // — if we're here, that was Strict Mode's practice run, not a real
    // unmount, and the Vanta instance it built (or is still building)
    // should be kept rather than torn down.
    if (destroyTimeoutRef.current !== null) {
      clearTimeout(destroyTimeoutRef.current);
      destroyTimeoutRef.current = null;
    }

    const runId = Math.random().toString(36).slice(2, 7);

    async function init() {
      console.log(`[EnergyBackground:${runId}] init start`);
      try {
        await loadScriptOnce(P5_SRC);
        console.log(
          `[EnergyBackground:${runId}] p5 loaded, window.p5 =`,
          window.p5,
        );

        await loadScriptOnce(VANTA_TOPOLOGY_SRC);
        console.log(
          `[EnergyBackground:${runId}] vanta script loaded, window.VANTA =`,
          window.VANTA,
        );

        if (!containerRef.current) {
          console.log(
            `[EnergyBackground:${runId}] bailing — container unmounted`,
          );
          return;
        }

        if (!window.VANTA || !window.VANTA.TOPOLOGY) {
          console.error(
            `[EnergyBackground:${runId}] window.VANTA.TOPOLOGY is missing ` +
              "after script load — the CDN file likely loaded an unexpected " +
              "version, or another script cleared window.VANTA.",
          );
          return;
        }

        // Dedup: Strict Mode may have started this same init sequence
        // twice. Once both awaits above resolve, check whether an earlier
        // pass already finished building the effect — if so, don't build a
        // second one on top of it.
        if (vantaRef.current) {
          console.log(
            `[EnergyBackground:${runId}] skipping — effect already built by an earlier pass`,
          );
          return;
        }

        // Common silent-failure case: the container renders at 0x0 because
        // its positioned ancestor has no explicit height (an absolutely
        // positioned element doesn't contribute to its parent's height).
        // Vanta won't error on this — it'll just paint nothing.
        const { width, height } = containerRef.current.getBoundingClientRect();
        console.log(
          `[EnergyBackground:${runId}] container size at init:`,
          width,
          height,
        );
        if (width === 0 || height === 0) {
          console.warn(
            `[EnergyBackground:${runId}] container is 0x0 — Vanta will ` +
              "render nothing. Give the parent element `position: relative` " +
              "and an explicit height (e.g. minHeight: '100vh').",
          );
        }

        vantaRef.current = window.VANTA.TOPOLOGY({
          el: containerRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 0.75,
          backgroundColor: 0x00111c,
          color: 0x4169e1,
        });

        // Exposed for manual inspection in DevTools: run
        // `window.__vantaEffect` in the console to check it's a real
        // object, and `document.querySelectorAll('canvas')` to see every
        // canvas currently on the page (in case one landed outside this
        // container — a known failure mode if p5/Vanta versions mismatch).
        window.__vantaEffect = vantaRef.current;
        console.log(
          `[EnergyBackground:${runId}] Vanta effect created:`,
          vantaRef.current,
          "canvas in container:",
          containerRef.current.querySelector("canvas"),
          "all canvases on page:",
          document.querySelectorAll("canvas"),
        );
      } catch (err) {
        console.error(
          `[EnergyBackground:${runId}] failed to load/init Vanta:`,
          err,
        );
      }
    }

    init();

    return () => {
      console.log(`[EnergyBackground:${runId}] cleanup scheduled (deferred)`);
      // Defer the actual destroy by a tick. If this was just Strict Mode's
      // practice unmount, the next effect invocation (which runs
      // synchronously right after) will clear this timeout before it ever
      // fires. If the component is really gone, nothing cancels it and the
      // destroy runs for real.
      destroyTimeoutRef.current = setTimeout(() => {
        console.log(`[EnergyBackground:${runId}] destroying for real`);
        vantaRef.current?.destroy();
        vantaRef.current = null;
        destroyTimeoutRef.current = null;
      }, 0);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed" /* Changed from sticky */,
        top: 0,
        left: 0 /* Added to guarantee it pins to the edge */,
        height: "100dvh",
        width: "100%",
        maxWidth: "100vw",
        /* Removed marginBottom: "-100dvh" as it is no longer needed */
        zIndex: 0,
        opacity,
        backgroundColor: "#00111c",
        pointerEvents: "auto",
        overflow: "hidden",
      }}
    />
  );
}

export default EnergyBackground;
