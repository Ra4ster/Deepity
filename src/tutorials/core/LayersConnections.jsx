import TutorialLayout from "../TutorialLayout";
import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";

const menuItems = [
  "The Bidirectional Hierarchy",
  "Top-Down Predictions",
  "Bottom-Up Errors",
  "The State Update Rule",
];

export default function LayersConnections() {
  return (
    <TutorialLayout
      title="Layers & Connections"
      description="Learn how Deepity layers communicate in both directions, generating predictions downward and sending prediction errors upward during inference."
      menuItems={menuItems}
      language="core"
    >
      {/* Hero */}
      <div className="p-4 p-md-5 my-4 rounded border border-secondary bg-dark">
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <span className="badge bg-info text-dark mb-3">
              PCN ARCHITECTURE
            </span>

            <h2 className="display-6 fw-bold mb-3">
              Every layer listens.
              <br />
              <span className="text-info">
                Every layer <span className="magic-text">predicts.</span>
              </span>
            </h2>

            <p className="lead text-secondary mb-0">
              Deepity layers are not passive steps in a pipeline. Each layer
              maintains a latent state and continuously exchanges predictions
              and errors with its neighbors.
            </p>
          </div>

          <div className="col-lg-5">
            <div className="border border-secondary rounded p-4 bg-black text-center font-monospace">
              <div className="text-primary">HIGHER LAYER</div>

              <div className="fs-4 text-info my-2">↓ μ</div>

              <div className="border border-info rounded p-3">
                <strong>z⁽ˡ⁾</strong>
                <div className="small text-secondary mt-1">
                  current latent state
                </div>
              </div>

              <div className="fs-4 text-warning my-2">↑ e</div>

              <div className="text-success">LOWER LAYER</div>
            </div>
          </div>
        </div>
      </div>

      {/* Architecture */}
      <h2 id="TheBidirectionalHierarchy" className="mt-5 mb-3">
        The Bidirectional Hierarchy
      </h2>

      <p>
        In a conventional feedforward network, layers are usually presented as a
        sequence: input enters one layer, is transformed, and is passed to the
        next. The computation has a clear forward direction.
      </p>

      <p>
        In Deepity, a <code>DiscriminativePCLayer</code> is better thought of as
        a <strong>stateful node</strong> inside a hierarchy. Each layer
        maintains its own latent state <InlineMath math="z" /> and communicates
        with the layers immediately above and below it.
      </p>

      <div className="p-4 rounded border border-secondary bg-black my-4">
        <div className="text-center font-monospace">
          <div
            className="border border-primary rounded p-3 mx-auto"
            style={{ maxWidth: 400 }}
          >
            <div className="text-primary fw-bold">LAYER l + 1</div>
            <div className="small text-secondary">
              higher-level representation
            </div>
          </div>

          <div className="row justify-content-center g-3 my-3">
            <div className="col-5">
              <div className="text-info">
                ↓
                <br />
                <strong>μ⁽ˡ⁾</strong>
                <div className="small text-secondary">prediction</div>
              </div>
            </div>

            <div className="col-5">
              <div className="text-warning">
                ↑
                <br />
                <strong>e⁽ˡ⁾</strong>
                <div className="small text-secondary">prediction error</div>
              </div>
            </div>
          </div>

          <div
            className="border border-success rounded p-3 mx-auto"
            style={{ maxWidth: 400 }}
          >
            <div className="text-success fw-bold">LAYER l</div>
            <div className="small text-secondary">latent state z⁽ˡ⁾</div>
          </div>

          <div className="row justify-content-center g-3 my-3">
            <div className="col-5">
              <div className="text-info">
                ↓
                <br />
                <strong>μ⁽ˡ⁻¹⁾</strong>
              </div>
            </div>

            <div className="col-5">
              <div className="text-warning">
                ↑
                <br />
                <strong>e⁽ˡ⁻¹⁾</strong>
              </div>
            </div>
          </div>

          <div
            className="border border-secondary rounded p-3 mx-auto"
            style={{ maxWidth: 400 }}
          >
            <div className="fw-bold">LAYER l − 1</div>
            <div className="small text-secondary">
              lower-level representation
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3 my-4">
        <div className="col-md-6">
          <div className="h-100 p-4 rounded border border-info bg-dark">
            <h5 className="text-info">↓ Top-down</h5>
            <p className="mb-0 text-secondary">
              Higher layers tell lower layers what they expect to see.
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="h-100 p-4 rounded border border-warning bg-dark">
            <h5 className="text-warning">↑ Bottom-up</h5>
            <p className="mb-0 text-secondary">
              Lower layers tell higher layers where those expectations are
              wrong.
            </p>
          </div>
        </div>
      </div>

      <div className="alert alert-info border-0 my-4">
        <strong>Core idea:</strong> the network is not waiting for a separate
        backward pass. Prediction and error signals are part of the same ongoing
        inference process.
      </div>

      {/* Predictions */}
      <h2 id="TopDownPredictions" className="mt-5 mb-3">
        Top-Down Predictions <InlineMath math="\mu" />
      </h2>

      <p>
        The primary job of a layer is to predict the activity of the layer
        directly beneath it.
      </p>

      <p>
        During the settling loop, layer <InlineMath math="l+1" /> takes its
        current latent state <InlineMath math="z^{(l+1)}" /> and projects it
        downward through its weights. The result is transformed by the layer's
        activation function to produce the prediction{" "}
        <InlineMath math="\mu^{(l)}" />.
      </p>

      <div className="p-4 rounded border border-info bg-dark my-4">
        <div className="text-center">
          <div className="small text-info mb-2">TOP-DOWN GENERATION</div>

          <BlockMath math="\mu^{(l)} = f(W^{(l)}z^{(l+1)} + b^{(l)})" />
        </div>
      </div>

      <div className="row align-items-center g-3 my-4">
        <div className="col-md-4 text-center">
          <div className="border border-secondary rounded p-3 bg-dark font-monospace">
            z⁽ˡ⁺¹⁾
            <div className="small text-secondary mt-1">latent state</div>
          </div>
        </div>

        <div className="col-md-4 text-center">
          <div className="text-info fs-4">
            W, b, f
            <br />↓
          </div>
        </div>

        <div className="col-md-4 text-center">
          <div className="border border-info rounded p-3 bg-dark font-monospace">
            μ⁽ˡ⁾
            <div className="small text-secondary mt-1">prediction</div>
          </div>
        </div>
      </div>

      <p>
        Notice that this looks almost identical to an ordinary neural-network
        forward pass. The important difference is what the result <em>means</em>
        : <InlineMath math="\mu" /> is not necessarily the final output. It is
        an expectation that will be checked against the state of the layer
        below.
      </p>

      {/* Errors */}
      <h2 id="BottomUpErrors" className="mt-5 mb-3">
        Bottom-Up Errors <InlineMath math="e" />
      </h2>

      <p>
        The lower layer now compares the prediction it received with its own
        current state. The difference becomes the local prediction error.
      </p>

      <div className="p-4 rounded border border-warning bg-dark my-4">
        <div className="text-center">
          <div className="small text-warning mb-2">PREDICTION ERROR</div>

          <BlockMath math="e^{(l)} = z^{(l)} - \mu^{(l)}" />
        </div>
      </div>

      <div className="row g-3 my-4">
        <div className="col-md-4">
          <div className="p-4 rounded border border-secondary bg-dark h-100 text-center">
            <div className="font-monospace fs-4">z</div>
            <div className="small text-secondary mt-2">
              What the layer currently represents
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-4 rounded border border-info bg-dark h-100 text-center">
            <div className="font-monospace fs-4 text-info">μ</div>
            <div className="small text-secondary mt-2">
              What the layer was expected to represent
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-4 rounded border border-warning bg-dark h-100 text-center">
            <div className="font-monospace fs-4 text-warning">e = z − μ</div>
            <div className="small text-secondary mt-2">
              The mismatch between them
            </div>
          </div>
        </div>
      </div>

      <p>
        A small error means the prediction already agrees with the current
        state. A large error means the network needs to change its internal
        state, its predictions, or eventually its parameters.
      </p>

      <div className="alert alert-secondary border-0 my-4">
        <strong>Important:</strong> prediction error is not necessarily “mistake
        = bad.” It is information. A surprising observation is exactly what
        tells the model that its current internal explanation needs to change.
      </div>

      {/* State update */}
      <h2 id="TheStateUpdateRule" className="mt-5 mb-3">
        The State Update Rule
      </h2>

      <p>
        This is where the bidirectional architecture becomes especially
        interesting. The latent state <InlineMath math="z^{(l)}" /> is adjusted
        during the settling process. It is influenced by both its own local
        prediction error and the error arriving from the layer below.
      </p>

      <div className="p-4 rounded border border-success bg-dark my-4">
        <div className="text-center">
          <div className="small text-success mb-3">STATE DYNAMICS</div>

          <BlockMath math="\frac{dz^{(l)}}{dt} = -e^{(l)} + (W^{(l-1)})^T e^{(l-1)} \odot f'(\mu^{(l-1)})" />
        </div>
      </div>

      <h4 className="mt-4">Reading the equation</h4>

      <div className="my-4">
        <div className="p-3 mb-2 rounded border border-warning bg-dark">
          <div className="font-monospace text-warning fs-5">−e⁽ˡ⁾</div>
          <div className="small text-secondary mt-2">
            <strong>Local correction.</strong> The layer changes its state to
            reduce its own prediction error.
          </div>
        </div>

        <div className="p-3 rounded border border-info bg-dark">
          <div className="font-monospace text-info fs-5">
            (W⁽ˡ⁻¹⁾)ᵀ e⁽ˡ⁻¹⁾ ⊙ f'(μ⁽ˡ⁻¹⁾)
          </div>
          <div className="small text-secondary mt-2">
            <strong>Influence from below.</strong> The error at the lower layer
            is transformed through the lower layer's generative mapping and
            tells the current layer how its prediction should change.
          </div>
        </div>
      </div>

      {/* Settling loop */}
      <h4 className="mt-5 mb-3">The settling loop</h4>

      <p>
        The key word is <strong>iteratively</strong>. The network does not
        necessarily solve everything in one operation. Instead, the latent
        states can be repeatedly updated as predictions and errors propagate
        through the hierarchy.
      </p>

      <div className="row g-2 my-4 text-center font-monospace">
        <div className="col-6 col-md-3">
          <div className="p-3 h-100 rounded border border-secondary bg-dark">
            <div className="text-secondary small">STEP 1</div>
            <div className="text-info my-2">Predict</div>
            <div className="small text-secondary">Generate μ</div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="p-3 h-100 rounded border border-secondary bg-dark">
            <div className="text-secondary small">STEP 2</div>
            <div className="text-warning my-2">Compare</div>
            <div className="small text-secondary">Compute e</div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="p-3 h-100 rounded border border-secondary bg-dark">
            <div className="text-secondary small">STEP 3</div>
            <div className="text-success my-2">Update</div>
            <div className="small text-secondary">Adjust z</div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="p-3 h-100 rounded border border-secondary bg-dark">
            <div className="text-secondary small">STEP 4</div>
            <div className="text-primary my-2">Repeat</div>
            <div className="small text-secondary">Until stable</div>
          </div>
        </div>
      </div>

      <div className="p-4 p-md-5 rounded border border-primary bg-dark my-5">
        <span className="badge bg-primary mb-3">THE BIG PICTURE</span>

        <h3>Layers form a conversation, not a pipeline.</h3>

        <p className="text-secondary mb-3">
          Higher layers provide context and expectations. Lower layers provide
          sensory evidence and prediction errors. The latent states evolve until
          the hierarchy reaches a state where its predictions and observations
          are mutually consistent.
        </p>

        <div className="text-center font-monospace fs-5">
          <span className="text-info">Prediction ↓</span>
          {"  "}
          <span className="text-secondary">↔</span>
          {"  "}
          <span className="text-warning">↑ Error</span>
          {"  "}
          <span className="text-secondary">↻</span>
          {"  "}
          <span className="text-success">Settled State</span>
        </div>
      </div>
    </TutorialLayout>
  );
}
