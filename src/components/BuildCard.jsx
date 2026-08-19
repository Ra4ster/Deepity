import { useState, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  CheckCircle2,
  Package,
  FileText,
  Users,
  BarChart3,
  Copy,
  Check,
} from "lucide-react";

const features = [
  { text: "CPU-Only (for now) — Fully optimized for x86_64" },
  { text: "SIMD (SSE/AVX/AVX2/AVX512) accelerated kernels" },
  { text: "Multi-threaded with OpenMP" },
  { text: "Deterministic, lightweight arena memory" },
  { text: "Easy to extend and contribute" },
];

const ecosystem = [
  { icon: Package, text: "Pip / vcpkg / CMake" },
  { icon: FileText, text: "MIT License" },
  { icon: Users, text: "Active Development" },
  { icon: BarChart3, text: "Continuous Benchmarks" },
];

const installCode = `# Python
pip install deepity

# C++ Windows
vcpkg install deepity

# C++ Cross-platform
git clone https://github.com/ra4ster/deepity.git
cd deepity
python build.py
`;

function BuildCard() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(installCode);
    setCopied(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="container py-2">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        .build-card {
          --panel: #131b2b;
          --border: #263149;
          --accent: violet;
          --text: #eef2f8;
          --text-muted: #8593ab;
          position: relative;
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 6px;
        }

        /* corner bracket marks, matching the code showcase cards */
        .build-card .corner {
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: var(--accent);
          opacity: 0.9;
          z-index: 1;
          pointer-events: none;
        }
        .build-card .corner-tl { top: -1px; left: -1px; border-top: 2px solid var(--accent); border-left: 2px solid var(--accent); }
        .build-card .corner-tr { top: -1px; right: -1px; border-top: 2px solid var(--accent); border-right: 2px solid var(--accent); }
        .build-card .corner-bl { bottom: -1px; left: -1px; border-bottom: 2px solid var(--accent); border-left: 2px solid var(--accent); }
        .build-card .corner-br { bottom: -1px; right: -1px; border-bottom: 2px solid var(--accent); border-right: 2px solid var(--accent); }

        .build-card-inner {
          border-radius: 6px;
          overflow: hidden;
        }

        .build-section {
          padding: 1.75rem 1.32rem;
          border-bottom: 1px solid var(--border);
        }

        @media (min-width: 768px) {
          .build-section {
            border-bottom: none;
            border-right: 1px solid var(--border);
          }
          .build-section:last-child {
            border-right: none;
          }
        }

        .build-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
          color: var(--text);
          margin-bottom: 1.25rem;
        }

        .build-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .build-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.82rem;
          line-height: 1.5;
          color: var(--text);
          margin-bottom: 0.85rem;
        }

        .build-list li:last-child {
          margin-bottom: 0;
        }

        .build-list svg {
          flex-shrink: 0;
          margin-top: 0.1rem;
        }

        .build-code-wrap {
          position: relative;
          background: #0d1420;
          border: 1px solid var(--border);
          border-radius: 4px;
        }

        .build-code-wrap pre {
          margin: 0 !important;
          padding: 1rem 1.1rem !important;
          background: transparent !important;
          font-family: 'IBM Plex Mono', monospace !important;
          font-size: 0.76rem !important;
          line-height: 1.65 !important;
        }

        .build-copy-btn {
          position: absolute;
          right: 0.7rem;
          bottom: 0.7rem;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.04em;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 0.28rem 0.55rem;
          cursor: pointer;
          transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
        }

        .build-copy-btn:hover {
          color: var(--text);
          border-color: var(--accent);
          background: rgba(255, 255, 255, 0.07);
        }

        .build-copy-btn.copied {
          color: var(--accent);
          border-color: var(--accent);
        }
      `}</style>

      <div className="build-card">
        <span className="corner corner-tl" />
        <span className="corner corner-tr" />
        <span className="corner corner-bl" />
        <span className="corner corner-br" />

        <div className="build-card-inner" id="GetStarted">
          <div className="row g-0">
            {/* Section 1: Built for CPUs + Developers */}
            <div className="col-md-3 build-section">
              <div className="build-heading">Built for CPUs + Developers.</div>
              <ul className="build-list">
                {features.map((f, i) => (
                  <li key={i}>
                    <CheckCircle2 size={17} color="#28a745" strokeWidth={2.5} />
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 2: Ecosystem */}
            <div className="col-md-2 build-section">
              <div className="build-heading">Ecosystem</div>
              <ul className="build-list">
                {ecosystem.map((e, i) => {
                  const Icon = e.icon;
                  return (
                    <li key={i}>
                      <Icon size={17} color="var(--accent)" strokeWidth={2} />
                      <span>{e.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Section 3: Get Started */}
            <div className="col-md-7 build-section">
              <div className="build-heading">Get Started</div>
              <div className="build-code-wrap">
                <SyntaxHighlighter
                  language="bash"
                  style={vscDarkPlus}
                  customStyle={{ background: "transparent", margin: 0 }}
                  codeTagProps={{
                    style: { fontFamily: "'IBM Plex Mono', monospace" },
                  }}
                >
                  {installCode}
                </SyntaxHighlighter>

                <button
                  type="button"
                  className={`build-copy-btn ${copied ? "copied" : ""}`}
                  onClick={handleCopy}
                >
                  {copied ? (
                    <>
                      <Check size={12} /> copied
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> copy
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuildCard;
