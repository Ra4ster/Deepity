import TutorialLayout, { CodeBlock } from "../TutorialLayout";

const menuItems = [
  "Data Preparation",
  "Model Architecture",
  "Training Phase",
  "Evaluation",
];

export default function YourFirstPCNPython() {
  return (
    <TutorialLayout
      title="Your First PCN (Python)"
      description="Learn the fundamentals of pydeepity by training a Sequential PCN to solve the classic XOR problem."
      menuItems={menuItems}
      language="python"
    >
      <h2 id="DataPreparation" className="mt-5 mb-3">
        Data Preparation
      </h2>
      <p>
        The XOR problem is a classic non-linear classification task. We will
        create a small, synthetic dataset using NumPy. Since PCNs use energy
        minimization, we format our binary targets as bipolar values (
        <code>-0.9</code> and <code>0.9</code>) to comfortably sit within the
        bounds of a <code>tanh</code> activation function.
      </p>
      <CodeBlock
        language="python"
        code={`import numpy as np

# 4 standard XOR inputs
X = np.array([
    [0.0, 0.0],
    [0.0, 1.0],
    [1.0, 0.0],
    [1.0, 1.0]
], dtype=np.float32)

# Bipolar targets: False = [-0.9, -0.9], True = [0.9, 0.9]
Y = np.array([
    [-0.9, -0.9],
    [ 0.9,  0.9],
    [ 0.9,  0.9],
    [-0.9, -0.9]
], dtype=np.float32)`}
      />

      <h2 id="ModelArchitecture" className="mt-5 mb-3">
        Model Architecture
      </h2>
      <p>
        Next, we initialize a <code>SequentialPCN</code>. We will use a batch
        size of 4 (to process the entire XOR dataset simultaneously) and build a
        simple <code>2 &rarr; 16 &rarr; 2 &rarr; 0</code> network hierarchy.
      </p>
      <CodeBlock
        language="python"
        code={`from pydeepity import SequentialPCN

net = SequentialPCN(batch_size=4)

# Layer 0: Input (2) -> Hidden (16)
net.add_layer(2, 16, lr=0.05, ir=0.1, pr=0.0, act="tanh", lmbda=0.0001)

# Layer 1: Hidden (16) -> Output (2)
net.add_layer(16, 2, lr=0.05, ir=0.1, pr=0.0, act="tanh", lmbda=0.0001)

# Layer 2: Terminal marker (output size is 0)
net.add_layer(2, 0, lr=0.05, ir=0.1, pr=0.0, act="linear", lmbda=0.0001)

net.compile()
net.randomize_weights()`}
      />

      <h2 id="TrainingPhase" className="mt-5 mb-3">
        Training Phase
      </h2>
      <p>
        Unlike a standard feed-forward network, the PCN training step requires
        an <code>inference_steps</code> parameter. This dictates how many times
        the network passes signals up and down its layers to minimize prediction
        errors before updating its weights.
      </p>
      <CodeBlock
        language="python"
        code={`epochs = 100
steps = 30 # Number of iterations for the biological settling loop

print("Training started...")
net.fit(
    X, Y,
    epochs=epochs,
    steps=steps,
    initial_lr=0.05,
    decay_rate=0.99
)
print("Training complete.")`}
      />

      <h2 id="Evaluation" className="mt-5 mb-3">
        Evaluation
      </h2>
      <p>
        To test the network, we call the <code>predict</code> method. The
        network will run the same settling loop without the target labels, using
        only its bottom-up priors to infer the correct output states.
      </p>
      <CodeBlock
        language="python"
        code={`# Run top-down inference to extract predictions
predictions = net.predict(X, steps=30)

print("Final Predictions:")
for i in range(len(X)):
    pred_class = np.argmax(predictions[i])
    print(f"Input: {X[i]} -> Predicted Class: {pred_class}")`}
      />
    </TutorialLayout>
  );
}
