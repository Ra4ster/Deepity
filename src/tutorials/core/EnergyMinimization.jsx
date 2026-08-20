import TutorialLayout from "../TutorialLayout";
import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";

const menuItems = [
  "The Free Energy Principle",
  "Visualizing Energy",
  "The Settling Loop",
  "The Math",
];

function EnergyLandscape() {
  return (
    <div className="my-5">
      <div className="rounded-4 border border-secondary bg-dark overflow-hidden">
        <div className="p-3 p-md-4 border-bottom border-secondary">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div className="fw-semibold">A conceptual energy landscape</div>
              <div className="small text-secondary">
                One-dimensional slice through a much higher-dimensional space
              </div>
            </div>

            <span className="badge bg-secondary">CONCEPTUAL</span>
          </div>
        </div>

        <div className="p-3 p-md-4">
          <svg
            viewBox="0 0 900 420"
            width="100%"
            role="img"
            aria-label="Conceptual energy landscape showing a state moving downhill toward an energy minimum"
            style={{ maxHeight: 440 }}
          >
            <defs>
              <linearGradient id="energyFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopOpacity="0.18" />
                <stop offset="100%" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="pathGradient" x1="0" x2="1">
                <stop offset="0%" stopOpacity="0.25" />
                <stop offset="100%" stopOpacity="1" />
              </linearGradient>

              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
              </marker>
            </defs>

            {/* Background grid */}
            <g opacity="0.08">
              <line x1="80" y1="70" x2="80" y2="340" stroke="currentColor" />
              <line x1="240" y1="70" x2="240" y2="340" stroke="currentColor" />
              <line x1="400" y1="70" x2="400" y2="340" stroke="currentColor" />
              <line x1="560" y1="70" x2="560" y2="340" stroke="currentColor" />
              <line x1="720" y1="70" x2="720" y2="340" stroke="currentColor" />
              <line x1="840" y1="70" x2="840" y2="340" stroke="currentColor" />

              <line x1="80" y1="100" x2="840" y2="100" stroke="currentColor" />
              <line x1="80" y1="160" x2="840" y2="160" stroke="currentColor" />
              <line x1="80" y1="220" x2="840" y2="220" stroke="currentColor" />
              <line x1="80" y1="280" x2="840" y2="280" stroke="currentColor" />
              <line x1="80" y1="340" x2="840" y2="340" stroke="currentColor" />
            </g>

            {/* Y axis */}
            <line
              x1="80"
              y1="340"
              x2="80"
              y2="55"
              stroke="currentColor"
              strokeOpacity="0.45"
              markerEnd="url(#arrow)"
            />

            {/* X axis */}
            <line
              x1="80"
              y1="340"
              x2="850"
              y2="340"
              stroke="currentColor"
              strokeOpacity="0.45"
              markerEnd="url(#arrow)"
            />

            {/* Energy curve fill */}
            <path
              d="
                M 80 120
                C 135 115, 160 145, 200 180
                C 250 225, 275 270, 330 290
                C 380 308, 420 300, 455 270
                C 495 235, 505 190, 555 165
                C 610 138, 655 170, 700 205
                C 750 245, 790 260, 840 250
                L 840 340
                L 80 340
                Z
              "
              fill="url(#energyFill)"
            />

            {/* Energy curve */}
            <path
              d="
                M 80 120
                C 135 115, 160 145, 200 180
                C 250 225, 275 270, 330 290
                C 380 308, 420 300, 455 270
                C 495 235, 505 190, 555 165
                C 610 138, 655 170, 700 205
                C 750 245, 790 260, 840 250
              "
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Initial state */}
            <circle cx="200" cy="180" r="9" fill="currentColor" />

            <text
              x="200"
              y="145"
              textAnchor="middle"
              fill="currentColor"
              fontSize="17"
              fontWeight="600"
            >
              initial state
            </text>

            <text
              x="200"
              y="165"
              textAnchor="middle"
              fill="currentColor"
              fontSize="13"
              opacity="0.65"
            >
              high energy
            </text>

            {/* Motion arrow */}
            <path
              d="M 220 195 C 270 235, 295 270, 335 285"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="8 8"
              markerEnd="url(#arrow)"
              opacity="0.7"
            />

            {/* Minimum marker */}
            <line
              x1="365"
              y1="290"
              x2="365"
              y2="340"
              stroke="currentColor"
              strokeDasharray="5 6"
              opacity="0.45"
            />

            <circle cx="365" cy="290" r="11" fill="currentColor" />

            <text
              x="365"
              y="250"
              textAnchor="middle"
              fill="currentColor"
              fontSize="18"
              fontWeight="700"
            >
              energy minimum
            </text>

            <text
              x="365"
              y="270"
              textAnchor="middle"
              fill="currentColor"
              fontSize="13"
              opacity="0.65"
            >
              stable configuration
            </text>

            {/* Local slope annotation */}
            <path
              d="M 250 205 Q 290 220 315 255"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 5"
              opacity="0.5"
            />

            <text
              x="270"
              y="195"
              fill="currentColor"
              fontSize="13"
              opacity="0.7"
            >
              descending
            </text>

            {/* Axis labels */}
            <text
              x="460"
              y="390"
              textAnchor="middle"
              fill="currentColor"
              fontSize="15"
              opacity="0.7"
            >
              latent state configuration
            </text>

            <text
              x="25"
              y="200"
              textAnchor="middle"
              fill="currentColor"
              fontSize="15"
              opacity="0.7"
              transform="rotate(-90 25 200)"
            >
              energy
            </text>
          </svg>
        </div>
      </div>

      <p className="small text-secondary mt-2 mb-0 text-center">
        A simplified visualization: real PCN energy landscapes can have
        thousands or millions of dimensions.
      </p>
    </div>
  );
}

function TensionDiagram() {
  return (
    <div className="my-4 p-4 rounded-4 border border-secondary bg-dark">
      <div className="row align-items-center g-4">
        <div className="col-md-5">
          <div className="small text-secondary text-uppercase mb-3">
            Prediction
          </div>

          <div className="border border-info rounded-3 p-4 text-center">
            <div className="display-6 fw-semibold text-info">μ</div>
            <div className="small text-secondary mt-2">
              what the network expects
            </div>
          </div>
        </div>

        <div className="col-md-2 text-center">
          <div className="d-none d-md-block">
            <div className="text-secondary mb-1">difference</div>
            <div className="fs-2">↔</div>
            <div className="text-warning">e</div>
          </div>

          <div className="d-md-none fs-2">↕</div>
        </div>

        <div className="col-md-5">
          <div className="small text-secondary text-uppercase mb-3">
            Current state
          </div>

          <div className="border border-success rounded-3 p-4 text-center">
            <div className="display-6 fw-semibold text-success">z</div>
            <div className="small text-secondary mt-2">
              what the network currently represents
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4 pt-4 border-top border-secondary">
        <span className="text-warning fw-semibold">
          Larger mismatch → larger contribution to energy
        </span>
      </div>
    </div>
  );
}

export default function EnergyMinimization() {
  return (
    <TutorialLayout
      title="Energy Minimization"
      description="Understand how prediction errors create energy in a Predictive Coding Network, why inference behaves like settling into equilibrium, and how Deepity turns that idea into mathematics."
      menuItems={menuItems}
      language="core"
    >
      {/* Hero */}
      <div className="p-4 p-md-5 my-4 rounded-4 border border-secondary bg-dark">
        <div className="row align-items-center g-5">
          <div className="col-lg-7">
            <span className="badge bg-warning text-dark mb-3">
              PCN DYNAMICS
            </span>

            <h2 className="display-6 fw-bold mb-3">
              Prediction errors create tension.
              <br />
              <span className="text-warning">Inference releases it.</span>
            </h2>

            <p className="lead text-secondary mb-0">
              A Predictive Coding Network continually adjusts its latent states
              to reduce the mismatch between its predictions and the states it
              is trying to explain.
            </p>
          </div>

          <div className="col-lg-5">
            <div className="p-4 rounded-4 border border-secondary bg-black">
              <div className="d-flex justify-content-between mb-3">
                <span className="small text-secondary">HIGH ENERGY</span>
                <span className="small text-secondary">LOW ENERGY</span>
              </div>

              <div
                className="rounded-pill"
                style={{
                  height: "8px",
                  background:
                    "linear-gradient(90deg, currentColor 0%, currentColor 45%, transparent 100%)",
                  opacity: 0.75,
                }}
              />

              <div className="d-flex justify-content-between mt-3">
                <span className="text-danger">large error</span>
                <span className="text-success">small error</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Principle */}
      <h2 id="TheFreeEnergyPrinciple" className="mt-5 mb-3">
        The Free Energy Principle
      </h2>

      <p>
        Predictive Coding is closely associated with the{" "}
        <strong>Free Energy Principle</strong>, a theoretical framework
        developed prominently by neuroscientist Karl Friston. At a high level,
        the framework describes how adaptive systems can maintain internal
        models of their environments despite uncertain and changing sensory
        input.
      </p>

      <p>
        In variational inference, <strong>variational free energy</strong> is a
        mathematical quantity that can be minimized as a tractable bound on
        surprise. Predictive Coding connects this idea to perception by
        describing sensory processing as an ongoing attempt to reduce prediction
        error.
      </p>

      <div className="p-4 rounded-4 border border-warning bg-dark my-4">
        <div className="row g-4 text-center">
          <div className="col-md-4">
            <div className="display-6 text-warning mb-2">01</div>
            <strong>Predict</strong>
            <div className="small text-secondary mt-2">
              Build an expectation about incoming information.
            </div>
          </div>

          <div className="col-md-4">
            <div className="display-6 text-warning mb-2">02</div>
            <strong>Compare</strong>
            <div className="small text-secondary mt-2">
              Measure the mismatch between expectation and state.
            </div>
          </div>

          <div className="col-md-4">
            <div className="display-6 text-warning mb-2">03</div>
            <strong>Update</strong>
            <div className="small text-secondary mt-2">
              Change internal states to produce a better explanation.
            </div>
          </div>
        </div>
      </div>

      <div className="alert alert-info border-0 my-4">
        <strong>Keep the terminology straight:</strong> free energy is a formal
        quantity from variational inference. In Deepity, the simplified energy
        objective is based on prediction errors and is used to drive
        latent-state updates.
      </div>

      {/* Visualization */}
      <h2 id="VisualizingEnergy" className="mt-5 mb-3">
        Visualizing Energy
      </h2>

      <p>
        A useful intuition is to imagine each prediction as being connected to
        the state it predicts. When they disagree, there is “tension” in the
        system. When they agree, the mismatch is small.
      </p>

      <TensionDiagram />

      <p>
        This is only an analogy—the network is not storing literal mechanical
        tension. What matters mathematically is the size of the prediction error
        and how that error contributes to the objective being minimized.
      </p>

      <EnergyLandscape />

      {/* Settling */}
      <h2 id="TheSettlingLoop" className="mt-5 mb-3">
        The Settling Loop
      </h2>

      <p>
        A PCN typically reaches a lower-energy configuration through repeated
        state updates rather than a single forward pass. This iterative process
        is called <strong>settling</strong>.
      </p>

      <div className="p-4 rounded-4 border border-secondary bg-dark my-4">
        <div className="row g-0 text-center">
          <div className="col-6 col-md-3">
            <div className="p-3">
              <div
                className="rounded-circle border border-info mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{ width: 48, height: 48 }}
              >
                1
              </div>
              <strong>Predict</strong>
              <div className="small text-secondary mt-2">Generate μ</div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="p-3">
              <div
                className="rounded-circle border border-warning mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{ width: 48, height: 48 }}
              >
                2
              </div>
              <strong>Measure</strong>
              <div className="small text-secondary mt-2">Compute e</div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="p-3">
              <div
                className="rounded-circle border border-primary mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{ width: 48, height: 48 }}
              >
                3
              </div>
              <strong>Update</strong>
              <div className="small text-secondary mt-2">Change z</div>
            </div>
          </div>

          <div className="col-6 col-md-3">
            <div className="p-3">
              <div
                className="rounded-circle border border-success mx-auto mb-3 d-flex align-items-center justify-content-center"
                style={{ width: 48, height: 48 }}
              >
                4
              </div>
              <strong>Repeat</strong>
              <div className="small text-secondary mt-2">Until stable</div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center my-4">
        <div className="d-inline-flex flex-wrap align-items-center justify-content-center gap-2 px-4 py-3 rounded-pill border border-secondary bg-dark font-monospace">
          <span className="text-info">μ</span>
          <span className="text-secondary">→</span>
          <span className="text-warning">e</span>
          <span className="text-secondary">→</span>
          <span className="text-primary">Δz</span>
          <span className="text-secondary">→</span>
          <span className="text-info">μ'</span>
          <span className="text-secondary">↻</span>
        </div>
      </div>

      <p>
        This is why Deepity exposes a <code>steps</code> parameter. More
        settling steps give the latent variables more opportunities to respond
        to prediction errors and approach a stable configuration, at the cost of
        additional computation.
      </p>

      <div className="alert alert-secondary border-0 my-4">
        <strong>Think of settling as inference.</strong> The network is finding
        a latent state that best explains the current observation under its
        existing parameters.
      </div>

      {/* Math */}
      <h2 id="TheMath" className="mt-5 mb-3">
        The Math
      </h2>

      <p>
        In the simplified formulation used by Deepity, the network's energy is
        the sum of squared prediction errors across its layers.
      </p>

      <div className="p-4 p-md-5 rounded-4 border border-warning bg-dark my-4">
        <div className="text-center">
          <div className="small text-warning text-uppercase mb-3">
            Total energy
          </div>

          <BlockMath math="E = \sum_l \frac{1}{2}\left\|z^{(l)}-\mu^{(l)}\right\|^2" />
        </div>
      </div>

      <div className="row g-3 my-4">
        <div className="col-md-4">
          <div className="p-4 rounded-4 border border-secondary bg-dark h-100">
            <div className="text-info fs-4 mb-2">
              <InlineMath math="z^{(l)}" />
            </div>
            <strong>Current state</strong>
            <p className="small text-secondary mt-2 mb-0">
              The latent representation currently held by layer l.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-4 rounded-4 border border-secondary bg-dark h-100">
            <div className="text-warning fs-4 mb-2">
              <InlineMath math="\mu^{(l)}" />
            </div>
            <strong>Prediction</strong>
            <p className="small text-secondary mt-2 mb-0">
              The top-down state predicted for layer l.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-4 rounded-4 border border-secondary bg-dark h-100">
            <div className="text-success fs-4 mb-2">
              <InlineMath math="z^{(l)}-\mu^{(l)}" />
            </div>
            <strong>Error</strong>
            <p className="small text-secondary mt-2 mb-0">
              The mismatch contributing to the energy objective.
            </p>
          </div>
        </div>
      </div>

      <h4 className="mt-5 mb-3">Minimizing the energy</h4>

      <p>
        Inference changes the latent states in response to the energy gradient.
        Conceptually, the update follows the negative gradient:
      </p>

      <div className="p-4 rounded-4 border border-success bg-dark my-4">
        <div className="text-center">
          <BlockMath math="\frac{dz}{dt} \propto -\frac{\partial E}{\partial z}" />

          <div className="small text-secondary mt-3">
            Move the state toward lower energy.
          </div>
        </div>
      </div>

      <p>
        Once the network has settled sufficiently, those local signals can also
        be used to update parameters such as the weights. This gives us an
        important distinction:
      </p>

      <div className="row g-3 my-4">
        <div className="col-md-6">
          <div className="p-4 rounded-4 border border-info bg-dark h-100">
            <div className="badge bg-info text-dark mb-3">INFERENCE</div>

            <div className="fs-4 mb-2">
              <InlineMath math="z \leftarrow z + \Delta z" />
            </div>

            <p className="small text-secondary mb-0">
              Change the current representation to better explain the
              observation.
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="p-4 rounded-4 border border-success bg-dark h-100">
            <div className="badge bg-success text-dark mb-3">LEARNING</div>

            <div className="fs-4 mb-2">
              <InlineMath math="W \leftarrow W + \Delta W" />
            </div>

            <p className="small text-secondary mb-0">
              Change the parameters so future predictions can improve.
            </p>
          </div>
        </div>
      </div>

      {/* Final takeaway */}
      <div className="p-4 p-md-5 rounded-4 border border-warning bg-dark my-5">
        <span className="badge bg-warning text-dark mb-3">REMEMBER</span>

        <h3 className="mb-3">Energy gives the network a direction.</h3>

        <p className="text-secondary mb-4">
          Prediction errors tell the network where its current explanation is
          inconsistent. The energy objective turns those local mismatches into a
          global quantity that can guide inference toward a more coherent state.
        </p>

        <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 font-monospace">
          <span className="text-info">Predict</span>

          <span className="text-secondary">→</span>

          <span className="text-warning">Error</span>

          <span className="text-secondary">→</span>

          <span className="text-primary">Update</span>

          <span className="text-secondary">→</span>

          <span className="text-success">Lower Energy</span>
        </div>
      </div>
    </TutorialLayout>
  );
}
