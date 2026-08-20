import TutorialLayout, { TerminalBlock, CodeBlock } from "../TutorialLayout";

const menuItems = [
  "Installation",
  "Building a Network",
  "Training",
  "Inference",
];

export default function GettingStartedPython() {
  return (
    <TutorialLayout
      title="Getting Started"
      description="Install Deepity, build a Sequential Predictive Coding Network, and start training in minutes."
      menuItems={menuItems}
      language="python"
    >
      <h2 id="Installation" className="mt-5 mb-3">
        Installation
      </h2>
      <p>
        The easiest way to get started with Deepity is to install the Python
        wrapper, <code>pydeepity</code>. This package interfaces directly with
        the highly optimized C++ backend engine.
      </p>
      <TerminalBlock command="pip install pydeepity" />

      <h2 id="BuildingaNetwork" className="mt-5 mb-3">
        Building a Network
      </h2>
      <p>
        Unlike traditional feedforward neural networks, Deepity uses Predictive
        Coding Networks (PCNs) that iterate to minimize free energy. Here is how
        you initialize a dense <code>SequentialPCN</code>, functionally similar
        to a standard multi-layer perceptron.
      </p>
      <p>
        Notice that the final terminal layer maps its output size to{" "}
        <code>0</code> to indicate the end of the network structure.
      </p>
      <CodeBlock
        language="python"
        code={`from pydeepity import SequentialPCN

# Initialize a batched network
net = SequentialPCN(batch_size=256)

# Layer 0: Input (784) -> Hidden (512)
net.add_layer(784, 512, lr=0.06, ir=0.08, pr=0.0, act="tanh", lmbda=0.0001)

# Layer 1: Hidden (512) -> Output (10)
net.add_layer(512, 10, lr=0.06, ir=0.08, pr=0.0, act="tanh", lmbda=0.0001)

# Layer 2: Terminal Output Layer
net.add_layer(10, 0, lr=0.06, ir=0.08, pr=0.0, act="linear", lmbda=0.0001)

# Compile and initialize weights
net.compile()
net.randomize_weights()`}
      />

      <h2 id="Training" className="mt-5 mb-3">
        Training
      </h2>
      <p>
        Deepity includes a high-level <code>fit</code> method to handle the
        batched inference loops and weight updates automatically. The{" "}
        <code>steps</code> parameter defines how many iterations the network
        uses to settle into its minimum energy state before updating the local
        weights via Hebbian plasticity.
      </p>
      <CodeBlock
        language="python"
        code={`# Train the network using the built-in fit method
net.fit(
    X_train, Y_train,
    epochs=50,
    steps=60,           # Number of inference relaxation steps
    initial_lr=0.06,    # Starting learning rate
    decay_rate=0.98     # Learning rate decay per epoch
)`}
      />

      <h2 id="Inference" className="mt-5 mb-3">
        Inference
      </h2>
      <p>
        To run predictions, pass your inputs through the <code>predict</code>{" "}
        method. The network will execute the same biological settling
        process—driven entirely by bottom-up prediction errors without the
        supervised target signal—to infer the final state.
      </p>
      <CodeBlock
        language="python"
        code={`import numpy as np

# Run top-down inference to get predicted probabilities/activations
pred_matrix = net.predict(X_test, steps=60)

# Extract the highest probability class
pred_classes = np.argmax(pred_matrix, axis=1)`}
      />
    </TutorialLayout>
  );
}
