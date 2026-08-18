function MNIST() {
  const cards = [
    {
      label: "pcn-torch",
      role: "baseline",
      accentColor: "violet",
      accuracy: 80,
      delta: null,
      time: "2100s",
      speed: "1.0×",
    },
    {
      label: "Deepity",
      role: "challenger",
      accentColor: "#5ec8f2",
      accuracy: 93,
      delta: "+13%",
      time: "1000s",
      speed: "2.1×",
    },
  ];

  return (
    <div className="container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        .readout-root {
          --ink: #0d1420;
          --panel: #131b2b;
          --panel-2: #101827;
          --border: #263149;
          --text: #eef2f8;
          --text-muted: #8593ab;
          font-family: 'IBM Plex Mono', monospace;
        }

        .readout-eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0.75rem;
        }

        .readout-card {
          position: relative;
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 1.75rem 1.75rem 1.5rem;
        }

        /* corner bracket marks, like a measurement instrument */
        .readout-card .corner {
          position: absolute;
          width: 12px;
          height: 12px;
          border-color: var(--accent, var(--border));
          opacity: 0.9;
        }
        .corner-tl { top: -1px; left: -1px; border-top: 2px solid; border-left: 2px solid; }
        .corner-tr { top: -1px; right: -1px; border-top: 2px solid; border-right: 2px solid; }
        .corner-bl { bottom: -1px; left: -1px; border-bottom: 2px solid; border-left: 2px solid; }
        .corner-br { bottom: -1px; right: -1px; border-bottom: 2px solid; border-right: 2px solid; }

        .readout-label {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1.15rem;
          color: var(--text);
          margin-bottom: 0.15rem;
        }

        .readout-role {
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent, var(--text-muted));
          margin-bottom: 1.25rem;
          display: block;
        }

        .readout-figure {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 2.4rem;
          color: var(--text);
          line-height: 1;
        }

        .readout-unit {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-left: 0.4rem;
        }

        .readout-delta {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--accent);
          margin-left: 0.6rem;
        }

        /* ruler-style progress track */
        .readout-track {
          position: relative;
          height: 10px;
          margin-top: 1.1rem;
          border-radius: 2px;
          background-color: rgba(255, 255, 255, 0.06);
          background-image: repeating-linear-gradient(
            to right,
            rgba(255, 255, 255, 0.16) 0,
            rgba(255, 255, 255, 0.16) 1px,
            transparent 1px,
            transparent 10%
          );
          overflow: hidden;
        }

        .readout-fill {
          position: absolute;
          inset: 0;
          width: var(--fill, 0%);
          background-color: var(--accent);
          border-radius: 2px;
          transform-origin: left;
          animation: fill-sweep 1.1s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes fill-sweep {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .readout-fill { animation: none; }
        }

        .readout-footline {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-top: 0.6rem;
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .readout-speed {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          color: var(--accent);
        }

        /* verdict strip */
        .readout-verdict {
          background: var(--panel-2);
          border: 1px solid var(--border);
          border-left: 3px solid #5ec8f2;
          border-radius: 4px;
          padding: 1.1rem 1.5rem;
          font-family: 'IBM Plex Mono', monospace;
          color: var(--text);
          font-size: 0.95rem;
          line-height: 1.7;
        }

        .readout-verdict strong {
          font-family: 'Space Grotesk', sans-serif;
          color: #fff;
        }
      `}</style>

      <div className="readout-root">
        <div className="readout-eyebrow">70k Images · training benchmark</div>

        <div className="row g-4">
          {cards.map((card) => (
            <div className="col-md-6" key={card.label}>
              <div
                className="readout-card h-100 AllianceNo2"
                style={{ "--accent": card.accentColor }}
              >
                <span className="corner corner-tl" />
                <span className="corner corner-tr" />
                <span className="corner corner-bl" />
                <span className="corner corner-br" />

                <div className="readout-label">{card.label}</div>
                <span className="readout-role">{card.role}</span>

                <div>
                  <span className="readout-figure">{card.accuracy}%</span>
                  <span className="readout-unit">accuracy</span>
                  {card.delta && (
                    <span className="readout-delta">[{card.delta}]</span>
                  )}
                </div>

                <div
                  className="readout-track"
                  style={{ "--fill": `${card.accuracy}%` }}
                >
                  <div className="readout-fill" />
                </div>

                <div className="readout-footline">
                  <span>{card.time} to converge</span>
                  <span className="readout-speed">{card.speed}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="readout-verdict AllianceNo2 mt-3">
          <strong>84% accuracy</strong> in <strong>70 seconds</strong> —
          compared to <strong>97%</strong> for backprop.
        </div>
      </div>
    </div>
  );
}

export default MNIST;
