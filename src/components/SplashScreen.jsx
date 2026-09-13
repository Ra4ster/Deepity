import { useEffect, useState } from "react";

export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState("enter");

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const minEnterTime = reduceMotion ? 150 : 700;
    const fillDuration = reduceMotion ? 150 : 500;
    const exitDuration = reduceMotion ? 150 : 500;

    let cancelled = false;
    const frame = requestAnimationFrame(() => setPhase("shown"));

    const pageLoad =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((resolve) =>
            window.addEventListener("load", resolve, { once: true }),
          );

    const fontsReady = document.fonts?.ready ?? Promise.resolve();

    const minEnter = new Promise((resolve) =>
      setTimeout(resolve, minEnterTime),
    );

    Promise.all([pageLoad, fontsReady, minEnter]).then(() => {
      if (cancelled) return;
      setPhase("loaded");
      setTimeout(() => {
        if (cancelled) return;
        setPhase("exit");
        setTimeout(() => {
          if (!cancelled) onDone?.();
        }, exitDuration);
      }, fillDuration);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [onDone]);

  const revealed = phase !== "enter";
  const barFilled = phase === "loaded" || phase === "exit";

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-[#e4e6e7] transition-opacity duration-500 ${
        phase === "exit" ? "opacity-0" : "opacity-100"
      }`}
    >
      <img
        src={`${import.meta.env.BASE_URL}d-100.png`}
        alt="Deepity"
        className={`h-16 w-16 transition-all duration-700 ease-out ${
          revealed ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
      />

      <span
        className={`AllianceNo1 delay-150 text-3xl text-[#0a0a0a] transition-all duration-700 ease-out ${
          revealed ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        Deepity
      </span>

      <div className="h-[2px] w-40 overflow-hidden bg-black/10">
        <div
          className={`h-full bg-[#0a0a0a] transition-all duration-[500ms] ease-out ${
            barFilled ? "w-full" : "w-0"
          }`}
        />
      </div>
    </div>
  );
}
