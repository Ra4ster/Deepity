import { Link } from "react-router-dom";
import TutorialLayout from "../TutorialLayout";

const menuItems = [
  "What is Predictive Coding?",
  "The Architecture",
  "PCNs vs Feedforward",
  "The Path to AGI",
];

export default function PredictiveCoding101() {
  return (
    <TutorialLayout
      title="Predictive Coding 101"
      description="Understand the biological principles behind Predictive Coding, how it differs from traditional machine learning, and why it is attracting attention as a framework for continual learning."
      menuItems={menuItems}
      language="core"
    >
      {/* Hero */}
      <div className="p-4 p-md-5 my-4 rounded border border-secondary bg-dark">
        <div className="row align-items-center g-4">
          <div className="col-lg-7">
            <span className="badge bg-primary mb-3">NEUROSCIENCE × AI</span>

            <h2 className="display-6 fw-bold mb-3">
              Your brain doesn't just process the world.
              <br />
              <span className="magic-text">It predicts it.</span>
            </h2>

            <p className="lead text-secondary mb-0">
              Predictive Coding proposes that perception is an ongoing
              conversation between what the brain expects and what the senses
              actually observe.
            </p>
          </div>

          <div className="col-lg-5">
            <div className="border border-secondary rounded p-4 text-center font-monospace">
              <div className="text-primary mb-2">PREDICTION</div>

              <div className="fs-2 my-2">↓</div>

              <div className="border border-info rounded p-3">
                <strong>WORLD</strong>
                <div className="small text-secondary mt-1">
                  sensory evidence
                </div>
              </div>

              <div className="fs-2 my-2">↓</div>

              <div className="text-warning">PREDICTION ERROR</div>
            </div>
          </div>
        </div>
      </div>

      {/* What is Predictive Coding? */}
      <h2 id="WhatisPredictiveCoding?" className="mt-5 mb-3">
        What is Predictive Coding?
      </h2>

      <p>
        Predictive Coding is a theory of brain function in which perception is
        not simply a passive process of receiving sensory information. Instead,
        the brain continuously generates <strong>predictions</strong> about what
        it expects to encounter and compares those predictions against incoming
        sensory evidence.
      </p>

      <p>
        When you look at a table, your brain already has expectations about its
        shape, color, depth, and texture. Sensory information is then used to
        correct those expectations. The important signal is therefore not just
        the sensory input itself, but the <strong>prediction error</strong>: the
        difference between what was expected and what actually happened.
      </p>

      {/* Concept cards */}
      <div className="row g-3 my-4">
        <div className="col-md-4">
          <div className="h-100 p-4 rounded border border-primary bg-dark">
            <div className="fs-2 mb-2">🧠</div>
            <h5 className="text-primary">Prediction</h5>
            <p className="small text-secondary mb-0">
              Higher-level representations generate expectations about the
              sensory world.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="h-100 p-4 rounded border border-warning bg-dark">
            <div className="fs-2 mb-2">⚡</div>
            <h5 className="text-warning">Prediction Error</h5>
            <p className="small text-secondary mb-0">
              Differences between predictions and observations signal what needs
              to change.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="h-100 p-4 rounded border border-success bg-dark">
            <div className="fs-2 mb-2">🔄</div>
            <h5 className="text-success">Updating</h5>
            <p className="small text-secondary mb-0">
              Internal representations are adjusted to reduce future errors.
            </p>
          </div>
        </div>
      </div>

      <div className="alert alert-info border-0 my-4">
        <strong>Key idea:</strong> perception can be thought of as{" "}
        <em>inference under uncertainty</em>, rather than simply passing
        information from the senses upward.
      </div>

      {/* Architecture */}
      <h2 id="TheArchitecture" className="mt-5 mb-3">
        The Architecture
      </h2>

      <p>
        A Predictive Coding Network (PCN) translates this idea into a
        hierarchical neural architecture. Each layer maintains a representation
        of the world, generates predictions for the layer below, and receives
        error information from below.
      </p>

      {/* Architecture visual */}
      <div className="my-4 p-4 rounded border border-secondary bg-black">
        <div className="text-center font-monospace">
          <div
            className="border border-primary rounded p-3 mx-auto mb-3"
            style={{ maxWidth: 420 }}
          >
            <div className="text-primary fw-bold">
              HIGHER-LEVEL REPRESENTATION
            </div>
            <div className="small text-secondary">
              context • priors • abstract concepts
            </div>
          </div>

          <div className="row justify-content-center align-items-center g-3 mb-3">
            <div className="col-5">
              <div className="text-info">
                ↓
                <br />
                Prediction μ
              </div>
            </div>

            <div className="col-5">
              <div className="text-warning">
                ↑
                <br />
                Error e
              </div>
            </div>
          </div>

          <div
            className="border border-success rounded p-3 mx-auto"
            style={{ maxWidth: 420 }}
          >
            <div className="text-success fw-bold">
              LOWER-LEVEL REPRESENTATION
            </div>
            <div className="small text-secondary">
              sensory features • observations • raw input
            </div>
          </div>

          <div className="mt-4 small text-secondary">
            The network repeatedly exchanges predictions and errors until its
            internal state settles.
          </div>
        </div>
      </div>

      <h4 className="mt-4">The settling process</h4>

      <p>
        Unlike a conventional feedforward network, a PCN does not necessarily
        produce its final representation in one pass. Neural activities can
        repeatedly update as predictions and errors propagate through the
        hierarchy.
      </p>

      <div className="row g-2 my-4 text-center font-monospace">
        {[
          ["01", "Predict", "Generate expectations"],
          ["02", "Compare", "Measure the error"],
          ["03", "Update", "Adjust internal states"],
          ["04", "Settle", "Repeat until stable"],
        ].map(([number, title, description]) => (
          <div className="col-6 col-md-3" key={number}>
            <div className="p-3 h-100 rounded border border-secondary bg-dark">
              <div className="text-secondary small">{number}</div>
              <div className="fw-bold text-info my-1">{title}</div>
              <div className="small text-secondary">{description}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="alert alert-secondary border-0 my-4">
        <strong>Why this matters:</strong> the network's internal state becomes
        part of the computation. That makes PCNs naturally suited to thinking
        about perception as a continuous, time-dependent process.
      </div>

      {/* Comparison */}
      <h2 id="PCNsvsFeedforward" className="mt-5 mb-3">
        PCNs vs. Feedforward Networks
      </h2>

      <p>
        Traditional feedforward neural networks typically move information
        through a sequence of layers and use backpropagation to calculate
        gradients for learning. Predictive Coding networks instead emphasize
        recurrent inference, local prediction errors, and iterative state
        updates.
      </p>

      <div className="table-responsive my-4">
        <table className="table table-dark table-bordered align-middle">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Feedforward + Backprop</th>
              <th>Predictive Coding</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Information Flow</strong>
              </td>
              <td>Primarily bottom → top during inference.</td>
              <td>Continuous top-down and bottom-up interactions.</td>
            </tr>

            <tr>
              <td>
                <strong>Learning Signal</strong>
              </td>
              <td>Gradient-based error propagated through the network.</td>
              <td>Local prediction errors can drive updates.</td>
            </tr>

            <tr>
              <td>
                <strong>Inference</strong>
              </td>
              <td>Typically a forward pass.</td>
              <td>Iterative settling toward a consistent state.</td>
            </tr>

            <tr>
              <td>
                <strong>Biological Inspiration</strong>
              </td>
              <td>Relatively abstract.</td>
              <td>Explicitly inspired by hierarchical brain computation.</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Learning visual */}
      <div className="p-4 rounded border border-secondary bg-dark my-4">
        <h5 className="mb-3">Two ways to reduce error</h5>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="small text-secondary mb-2">
              TRADITIONAL BACKPROPAGATION
            </div>

            <div className="font-monospace">
              Input → Layer → Layer → Output
              <br />
              <span className="text-warning">← global gradient signal</span>
            </div>
          </div>

          <div className="col-md-6">
            <div className="small text-secondary mb-2">PREDICTIVE CODING</div>

            <div className="font-monospace">
              Input ↕ Layer ↕ Layer ↕ Output
              <br />
              <span className="text-success">↕ local prediction errors</span>
            </div>
          </div>
        </div>
      </div>

      {/* AGI */}
      <h2 id="ThePathtoAGI" className="mt-5 mb-3">
        The Path to AGI?
      </h2>

      <p>
        One major challenge in modern machine learning is{" "}
        <strong>continual learning</strong>. When a model learns new tasks,
        updating its parameters can interfere with knowledge acquired from
        earlier tasks—a phenomenon commonly called{" "}
        <strong>catastrophic forgetting</strong>.
      </p>

      <p>
        Predictive Coding is interesting here because its local error signals,
        recurrent inference, and stateful dynamics provide a different way to
        think about learning and adaptation. Researchers are exploring whether
        these properties can contribute to systems that learn more continuously
        and efficiently.
      </p>

      <div className="p-4 rounded border border-warning bg-dark my-4">
        <h5 className="text-warning">A useful distinction</h5>
        <p className="mb-0 text-secondary">
          Predictive Coding is{" "}
          <strong className="text-light">
            not proven to be the path to AGI
          </strong>
          . Its value is that it offers a compelling alternative framework for
          studying perception, learning, biological plausibility, and continual
          adaptation.
        </p>
      </div>

      {/* Takeaways */}
      <h3 className="mt-5 mb-3">Three things to remember</h3>

      <div className="list-group mb-5">
        <div className="list-group-item list-group-item-dark border-secondary">
          <strong>1. The brain predicts.</strong> Perception is not purely
          bottom-up processing.
        </div>

        <div className="list-group-item list-group-item-dark border-secondary">
          <strong>2. Errors carry information.</strong> Prediction errors tell
          the system where its internal model is wrong.
        </div>

        <div className="list-group-item list-group-item-dark border-secondary">
          <strong>3. Learning can be local and continuous.</strong> PCNs explore
          whether local error signals and recurrent dynamics can support more
          flexible forms of learning.
        </div>
      </div>

      {/* Further reading */}
      <div className="p-4 rounded border border-secondary bg-dark">
        <h4>Where to go next</h4>

        <p className="text-secondary">
          Predictive Coding sits at the intersection of neuroscience,
          information theory, and machine learning. Useful concepts to explore
          next include:
        </p>

        <div className="d-flex flex-wrap gap-2">
          <Link
            to="/tutorials/energy-minimization"
            className="btn btn-outline-info btn-sm"
          >
            Free Energy Principle
          </Link>

          <a
            href="https://thedecisionlab.com/reference-guide/neuroscience/hebbian-learning"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-info btn-sm"
          >
            Hebbian Learning
          </a>

          <a
            href="https://www.ibm.com/think/topics/continual-learning"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-info btn-sm"
          >
            Continual Learning
          </a>

          <a
            href="https://biologyinsights.com/what-is-active-inference-and-how-does-it-work/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-info btn-sm"
          >
            Active Inference
          </a>
        </div>
      </div>
    </TutorialLayout>
  );
}
