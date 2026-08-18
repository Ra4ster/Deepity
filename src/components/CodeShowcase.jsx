import { useState, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";

const snippets = [
  {
    lang: "cpp",
    label: "C++",
    accent: "#5ec8f2",
    code: `#include <SimplePCNetwork>

int main() {
    Deep::SimplePCNetwork net(4); // batch size 4

    // in, out, lr, ir, lmbda, activation, dActivation
    net.AddLayer(2, 8, 0.05f, 0.3f, 0.0001f, Deep::tanh, Deep::dTanh);
    net.AddLayer(8, 1, 0.05f, 0.3f, 0.0001f, Deep::linear, Deep::dLinear);
    net.Compile();

    std::mt19937 rng(42);
    net.RandomizeWeights(rng);

    std::vector<float> X = {-1,-1, -1,1, 1,-1, 1,1};
    std::vector<float> Y = {-1, 1, 1, -1};

    for (int epoch = 0; epoch < 1500; ++epoch)
        float energy = net.TrainStep(X, Y, 150);

    std::vector<float> predictions = net.Predict(X, 150);
    return 0;
}`,
  },
  {
    lang: "python",
    label: "Python",
    accent: "#4169e1",
    code: `import deepity as dy

net = dy.SimplePCN(batch_size=4)

# in, out, lr, ir, lmbda, activation, dActivation
net.add_layer(2, 8, 0.05, 0.3, 0.0001, "tanh", "dtanh")
net.add_layer(8, 1, 0.05, 0.3, 0.0001, "linear", "dlinear")
net.compile()

net.randomize_weights()

X = [-1, -1, -1, 1, 1, -1, 1, 1]
Y = [-1, 1, 1, -1]

net.train(X, Y, 150, 1500)
pred = net.predict(X, 150)






`,
  },
];

function CodeShowcase() {
  const [copiedIndex, setCopiedIndex] = useState(null);
  const timeoutRef = useRef(null);

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="container py-2">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        .code-root {
          --ink: #0d1420;
          --panel: #131b2b;
          --border: #263149;
          --text: #eef2f8;
          --text-muted: #8593ab;
        }

        .code-card {
          position: relative;
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 6px;
        }

        /* corner bracket marks, matching the MNIST readout cards */
        .code-card .corner {
          position: absolute;
          width: 12px;
          height: 12px;
          border-color: var(--accent, var(--border));
          opacity: 0.9;
          z-index: 1;
          pointer-events: none;
        }
        .corner-tl { top: -1px; left: -1px; border-top: 2px solid; border-left: 2px solid; }
        .corner-tr { top: -1px; right: -1px; border-top: 2px solid; border-right: 2px solid; }
        .corner-bl { bottom: -1px; left: -1px; border-bottom: 2px solid; border-left: 2px solid; }
        .corner-br { bottom: -1px; right: -1px; border-bottom: 2px solid; border-right: 2px solid; }

        .code-card-inner {
          border-radius: 6px;
          overflow: hidden;
        }

        .code-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.65rem 1rem;
          border-bottom: 1px solid var(--border);
        }

        .code-lang-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent);
        }

        .code-lang-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent);
        }

        .code-body {
          position: relative;
        }

        .code-body pre {
          margin: 0 !important;
          padding: 1.1rem 1.25rem !important;
          background: transparent !important;
          font-family: 'IBM Plex Mono', monospace !important;
          font-size: 0.82rem !important;
          line-height: 1.65 !important;
        }

        .copy-btn {
          position: absolute;
          right: 0.9rem;
          bottom: 0.9rem;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.04em;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 0.32rem 0.6rem;
          cursor: pointer;
          transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
        }

        .copy-btn:hover {
          color: var(--text);
          border-color: var(--accent);
          background: rgba(255, 255, 255, 0.07);
        }

        .copy-btn.copied {
          color: var(--accent);
          border-color: var(--accent);
        }
      `}</style>

      <div className="code-root">
        <div className="row g-4">
          {snippets.map((snip, index) => (
            <div className="col-md-6" key={snip.lang}>
              <div
                className="code-card h-100"
                style={{ "--accent": snip.accent }}
              >
                <span className="corner corner-tl" />
                <span className="corner corner-tr" />
                <span className="corner corner-bl" />
                <span className="corner corner-br" />

                <div className="code-card-inner">
                  <div className="code-card-header">
                    <span className="code-lang-badge">
                      <span className="code-lang-dot" />
                      {snip.label}
                    </span>
                  </div>

                  <div className="code-body">
                    <SyntaxHighlighter
                      language={snip.lang}
                      style={vscDarkPlus}
                      customStyle={{
                        background: "transparent",
                        margin: 0,
                      }}
                      codeTagProps={{
                        style: { fontFamily: "'IBM Plex Mono', monospace" },
                      }}
                    >
                      {snip.code}
                    </SyntaxHighlighter>

                    <button
                      type="button"
                      className={`copy-btn ${copiedIndex === index ? "copied" : ""}`}
                      onClick={() => handleCopy(snip.code, index)}
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check size={13} /> copied
                        </>
                      ) : (
                        <>
                          <Copy size={13} /> copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CodeShowcase;
