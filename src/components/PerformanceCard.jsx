function PerformanceCard() {
  return (
    <div className="text-start">
      <style>{`
        .perf-card {
          --panel: #131b2b;
          --border: #263149;
          --accent: #5ec8f2;
          position: relative;
          border-radius: 6px;
          border: 1px solid var(--border);
          background-color: var(--panel-2);
        }

        /* corner bracket marks, matching the MNIST readout / code cards */
        .perf-card .corner {
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: var(--accent);
          opacity: 0.9;
          z-index: 1;
          pointer-events: none;
        }
        .perf-card .corner-tl { top: -1px; left: -1px; border-top: 2px solid var(--accent); border-left: 2px solid var(--accent); }
        .perf-card .corner-tr { top: -1px; right: -1px; border-top: 2px solid var(--accent); border-right: 2px solid var(--accent); }
        .perf-card .corner-bl { bottom: -1px; left: -1px; border-bottom: 2px solid var(--accent); border-left: 2px solid var(--accent); }
        .perf-card .corner-br { bottom: -1px; right: -1px; border-bottom: 2px solid var(--accent); border-right: 2px solid var(--accent); }

        .perf-card-inner {
          background-color: var(--panel);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          overflow: hidden;
        }
      `}</style>

      <div className="perf-card">
        <span className="corner corner-tl" />
        <span className="corner corner-tr" />
        <span className="corner corner-bl" />
        <span className="corner corner-br" />

        <div className="perf-card-inner">
          <div className="p-4">
            <h5 className="text-white fw-bold mb-3 AllianceNo2">
              Theoretical Performance
            </h5>

            <hr style={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />

            <div className="py-2">
              <div className="text-info fs-5 roboto fw-semibold mb-1">
                144.4 GFLOPs / 1.175 s
              </div>
              <div className="text-primary display-5 fw-bold">
                ≈ 122.89 GFLOPS
              </div>
            </div>

            <hr style={{ borderColor: "rgba(255, 255, 255, 0.08)" }} />

            <ul className="list-unstyled text-white roboto mt-3 mb-0">
              {/* CPU Item */}
              <li className="d-flex align-items-center mb-3">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="me-3 text-secondary"
                >
                  <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                  <rect x="9" y="9" width="6" height="6"></rect>
                  <line x1="9" y1="1" x2="9" y2="4"></line>
                  <line x1="15" y1="1" x2="15" y2="4"></line>
                  <line x1="9" y1="20" x2="9" y2="23"></line>
                  <line x1="15" y1="20" x2="15" y2="23"></line>
                  <line x1="20" y1="9" x2="23" y2="9"></line>
                  <line x1="20" y1="14" x2="23" y2="14"></line>
                  <line x1="1" y1="9" x2="4" y2="9"></line>
                  <line x1="1" y1="14" x2="4" y2="14"></line>
                </svg>
                CPU-Only (For Now)
              </li>

              {/* Checkmark Items */}
              {[
                "SIMD-Optimized Kernels",
                "OpenBLAS + OpenMP",
                "Batched Inputs",
                "High Accuracy",
                "Iterative Settling",
              ].map((item, index) => (
                <li key={index} className="d-flex align-items-center mb-3">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#28a745"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="me-3"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerformanceCard;
