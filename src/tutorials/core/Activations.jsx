import TutorialLayout from "../TutorialLayout";
import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";

const menuItems = [
  "The Role of Activations",
  "Forward Pass (Predictions)",
  "Backward Pass (Derivatives)",
  "Supported Functions",
];

const activationData = [
  {
    name: "Linear",
    formula: "f(x)=x",
    range: "(-∞, ∞)",
    derivative: "f'(x)=1",
    description:
      "The identity function. Useful when the output should remain unrestricted.",
    use: "Output layers / unrestricted values",
    border: "border-secondary",
    text: "text-light",
  },
  {
    name: "ReLU",
    formula: "f(x)=\\max(0,x)",
    range: "[0, ∞)",
    derivative: "f'(x)=1_{x>0}",
    description:
      "Keeps positive signals while suppressing negative ones. Simple and computationally efficient.",
    use: "Sparse feature representations",
    border: "border-info",
    text: "text-info",
  },
  {
    name: "Tanh",
    formula: "f(x)=\\tanh(x)",
    range: "(-1, 1)",
    derivative: "f'(x)=1-\\tanh^2(x)",
    description:
      "Produces bounded, zero-centered states. The bounded range can be useful when network states need to remain stable.",
    use: "Bounded hidden states",
    border: "border-success",
    text: "text-success",
  },
  {
    name: "Sigmoid",
    formula: "f(x)=\\frac{1}{1+e^{-x}}",
    range: "(0, 1)",
    derivative: "f'(x)=f(x)(1-f(x))",
    description: "Maps values into a probability-like range between 0 and 1.",
    use: "Probability-like outputs / gates",
    border: "border-warning",
    text: "text-warning",
  },
];

export default function Activations() {
  return (
    <TutorialLayout
      title="Activations"
      description="Learn how nonlinear activation functions shape predictions, transform local error signals, and influence the dynamics of a Predictive Coding Network."
      menuItems={menuItems}
      language="core"
    >
      {/* Hero */}
      <div className="p-4 p-md-5 my-4 rounded border border-secondary bg-dark">
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <span className="badge bg-info text-dark mb-3">
              PCN FUNDAMENTALS
            </span>

            <h2 className="display-6 fw-bold mb-3">
              One function.
              <br />
              <span className="magic-text">Two directions.</span>
            </h2>

            <p className="lead text-secondary mb-0">
              In a Predictive Coding Network, an activation function doesn't
              just transform a forward signal. Its derivative also determines
              how local prediction errors are transmitted through the network.
            </p>
          </div>

          <div className="col-lg-5">
            <div className="border border-secondary rounded p-4 text-center font-monospace">
              <div className="text-info mb-2">FORWARD</div>

              <BlockMath math="\mu = f(a)" />

              <div className="text-secondary my-2">↕</div>

              <div className="text-warning mb-2">ERROR</div>

              <BlockMath math="e \odot f'(a)" />
            </div>
          </div>
        </div>
      </div>

      {/* Role */}
      <h2 id="TheRoleofActivations" className="mt-5 mb-3">
        The Role of Activations
      </h2>

      <p>
        A neural network made entirely from linear operations can only represent
        linear relationships. No matter how many linear layers we stack
        together, the entire network can still be reduced to one large linear
        transformation.
      </p>

      <p>
        Activation functions solve this problem by introducing{" "}
        <strong>nonlinearity</strong>. They allow a network to represent curves,
        thresholds, complex feature boundaries, and other structures that cannot
        be captured by a purely linear model.
      </p>

      <div className="p-4 rounded border border-secondary bg-dark my-4">
        <div className="row align-items-center text-center g-3 font-monospace">
          <div className="col-md-4">
            <div className="border border-secondary rounded p-3">
              Linear
              <div className="small text-secondary mt-1">weighted sum</div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="fs-3 text-info">→</div>
            <div className="text-info">f(x)</div>
            <div className="small text-secondary">nonlinearity</div>
          </div>

          <div className="col-md-4">
            <div className="border border-info rounded p-3">
              Rich representation
              <div className="small text-secondary mt-1">complex features</div>
            </div>
          </div>
        </div>
      </div>

      <p>
        In Deepity, an activation is defined by two related functions:
        <InlineMath math="f(x)" /> determines how predictions are generated,
        while <InlineMath math="f'(x)" /> determines how prediction-error
        information is modulated as it travels through the same nonlinear
        mapping.
      </p>

      <div className="alert alert-info border-0 my-4">
        <strong>Think of an activation as a valve.</strong> The function shapes
        the signal going forward; its derivative controls how strongly error
        information can flow backward through that transformation.
      </div>

      {/* Forward */}
      <h2 id="ForwardPassPredictions" className="mt-5 mb-3">
        Forward Pass: Predictions
      </h2>

      <p>
        During the top-down prediction phase, a higher layer{" "}
        <InlineMath math="l+1" /> attempts to predict the state of the layer
        below it. First, the network computes a weighted combination of the
        higher-level state:
      </p>

      <div className="p-4 rounded border border-secondary bg-black my-4">
        <div className="text-center">
          <div className="small text-secondary mb-2">PRE-ACTIVATION</div>

          <BlockMath math="a^{(l)} = W^{(l)}z^{(l+1)} + b^{(l)}" />

          <div className="text-info my-3">↓ apply activation</div>

          <div className="small text-secondary mb-2">PREDICTION</div>

          <BlockMath math="\mu^{(l)} = f(a^{(l)})" />
        </div>
      </div>

      <p>
        The activation therefore determines the shape and range of the
        prediction. For example, using <code>tanh</code> means the prediction is
        constrained to the interval <InlineMath math="(-1,1)" />.
      </p>

      <div className="row g-3 my-4">
        <div className="col-md-6">
          <div className="p-4 h-100 rounded border border-primary bg-dark">
            <h5 className="text-primary">Without an activation</h5>
            <div className="font-monospace my-3">z → Wz + b</div>
            <p className="small text-secondary mb-0">
              The layer remains a linear transformation.
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="p-4 h-100 rounded border border-info bg-dark">
            <h5 className="text-info">With an activation</h5>
            <div className="font-monospace my-3">z → f(Wz + b)</div>
            <p className="small text-secondary mb-0">
              The layer can model nonlinear relationships.
            </p>
          </div>
        </div>
      </div>

      {/* Backward */}
      <h2 id="BackwardPassDerivatives" className="mt-5 mb-3">
        Backward Pass: Derivatives
      </h2>

      <p>
        Prediction errors provide information about how well the network's
        expectations match the current state. When that error signal travels
        through a nonlinear prediction function, the activation's derivative
        determines how strongly the signal is transmitted.
      </p>

      <div className="p-4 rounded border border-warning bg-dark my-4">
        <div className="text-center">
          <div className="small text-secondary mb-2">
            LOCAL ERROR × LOCAL SENSITIVITY
          </div>

          <BlockMath math="\tilde{e}^{(l)} = e^{(l-1)} \odot f'(a^{(l-1)})" />

          <p className="small text-secondary mb-0 mt-3">
            The derivative is evaluated at the corresponding pre-activation and
            applied element-wise.
          </p>
        </div>
      </div>

      <p>
        This is a crucial difference in interpretation. The derivative is not
        merely a bookkeeping term for a global gradient calculation. In a PCN,
        it can be understood as a <strong>local gain</strong> that modulates how
        prediction-error information interacts with the nonlinear generative
        mapping.
      </p>

      <h4 className="mt-4">What happens when a unit saturates?</h4>

      <p>
        Consider <code>sigmoid</code> or <code>tanh</code>. Their derivatives
        become very small when the input moves far into either tail of the
        function.
      </p>

      <div className="row g-3 my-4">
        <div className="col-md-4">
          <div className="p-3 rounded border border-secondary bg-dark h-100">
            <div className="text-secondary small">1. PRE-ACTIVATION</div>
            <div className="font-monospace fs-5 my-2">a ≫ 0</div>
            <div className="small text-secondary">
              The activation approaches its upper limit.
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-3 rounded border border-warning bg-dark h-100">
            <div className="text-warning small">2. DERIVATIVE</div>
            <div className="font-monospace fs-5 my-2">f'(a) ≈ 0</div>
            <div className="small text-secondary">
              Local sensitivity becomes very small.
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-3 rounded border border-danger bg-dark h-100">
            <div className="text-danger small">3. ERROR SIGNAL</div>
            <div className="font-monospace fs-5 my-2">e · f'(a) ≈ 0</div>
            <div className="small text-secondary">
              The transmitted error is strongly attenuated.
            </div>
          </div>
        </div>
      </div>

      <div className="alert alert-warning border-0 my-4">
        <strong>Key takeaway:</strong> the choice of activation affects not only
        what a layer can represent, but also how easily error information can
        influence that layer.
      </div>

      {/* Supported functions */}
      <h2 id="SupportedFunctions" className="mt-5 mb-3">
        Supported Functions
      </h2>

      <p>
        Deepity currently supports several standard activation/derivative pairs.
        Each one makes a different trade-off between range, saturation,
        sparsity, and numerical behavior.
      </p>

      <div className="row g-3 my-4">
        {activationData.map((activation) => (
          <div className="col-md-6" key={activation.name}>
            <div
              className={`h-100 p-4 rounded border ${activation.border} bg-dark`}
            >
              <div className="d-flex justify-content-between align-items-start">
                <h4 className={activation.text}>{activation.name}</h4>

                <span className="badge bg-secondary">{activation.range}</span>
              </div>

              <div className="my-3">
                <BlockMath math={activation.formula} />
              </div>

              <div className="small text-secondary mb-2">DERIVATIVE</div>

              <div className="font-monospace mb-3">
                <InlineMath math={activation.derivative} />
              </div>

              <p className="small text-secondary">{activation.description}</p>

              <div className="pt-2 border-top border-secondary">
                <span className="small">
                  <strong>Good for:</strong> {activation.use}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick reference */}
      <h3 className="mt-5 mb-3">Quick Reference</h3>

      <div className="table-responsive my-4">
        <table className="table table-dark table-bordered align-middle">
          <thead>
            <tr>
              <th>Function</th>
              <th>Output Range</th>
              <th>Saturates?</th>
              <th>Typical Role</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <strong>Linear</strong>
              </td>
              <td>Unbounded</td>
              <td>No</td>
              <td>Output / unrestricted values</td>
            </tr>

            <tr>
              <td>
                <strong>ReLU</strong>
              </td>
              <td>0 → ∞</td>
              <td>Negative side</td>
              <td>Sparse features</td>
            </tr>

            <tr>
              <td>
                <strong>Tanh</strong>
              </td>
              <td>-1 → 1</td>
              <td>Yes</td>
              <td>Bounded hidden states</td>
            </tr>

            <tr>
              <td>
                <strong>Sigmoid</strong>
              </td>
              <td>0 → 1</td>
              <td>Yes</td>
              <td>Probability-like values</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Final takeaway */}
      <div className="p-4 p-md-5 rounded border border-info bg-dark my-5">
        <span className="badge bg-info text-dark mb-3">REMEMBER</span>

        <h3>
          Activations shape both prediction{" "}
          <span className="magic-text">and </span>error.
        </h3>

        <p className="text-secondary mb-0">
          The forward function <InlineMath math="f(x)" /> determines the
          prediction produced by a layer. Its derivative{" "}
          <InlineMath math="f'(x)" /> determines how sensitive that prediction
          is to incoming error signals. In a Predictive Coding Network, these
          two pieces work together throughout the settling process.
        </p>
      </div>
    </TutorialLayout>
  );
}
