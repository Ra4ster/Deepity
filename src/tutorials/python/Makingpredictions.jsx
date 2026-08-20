import TutorialLayout, { CodeBlock } from "../TutorialLayout";

const menuItems = [
  "The Predict Method",
  "Unsupervised Settling",
  "Decoding the Output",
];

export default function MakingPredictionsPython() {
  return (
    <TutorialLayout
      title="Making Predictions (Python)"
      description="Learn how to run top-down inference to extract predictions from your trained Predictive Coding Network."
      menuItems={menuItems}
      language="python"
    >
      <h2 id="ThePredictMethod" className="mt-5 mb-3">
        The Predict Method
      </h2>
      <p>
        Once your network is trained, you can evaluate it on unseen data using
        the <code>predict()</code> method. Just like the training phase, you
        must specify the number of inference steps you want the network to use
        to settle into its final state.
      </p>
      <CodeBlock
        language="python"
        code={`# Pass the test data into the network
# inference_steps is typically kept identical to the training phase
pred_matrix = net.predict(X_test, steps=60)`}
      />

      <h2 id="UnsupervisedSettling" className="mt-5 mb-3">
        Unsupervised Settling
      </h2>
      <p>
        In a standard neural network, prediction is a simple, instant, one-way
        forward pass. In Deepity, prediction is an iterative,
        energy-minimization process.
      </p>
      <p>
        When you call <code>predict()</code>, the network clamps your input data
        to the bottom layer, but it{" "}
        <strong>leaves the top terminal layer unclamped</strong>. The network
        then runs its biological settling loop for the requested number of
        steps. Without a supervised target guiding it, the network relies
        entirely on its learned bottom-up priors to infer the most likely output
        state, minimizing its internal prediction errors along the way.
      </p>

      <h2 id="DecodingtheOutput" className="mt-5 mb-3">
        Decoding the Output
      </h2>
      <p>
        The <code>predict()</code> method returns a 2D NumPy array with a shape
        of <code>(batch_size, output_size)</code>. This matrix contains the
        final settled latent states of the terminal layer.
      </p>
      <p>
        For classification tasks, these values represent the network's
        confidence for each class. You can use standard NumPy utilities like{" "}
        <code>np.argmax</code> to extract the final predicted class for each
        image in your batch.
      </p>
      <CodeBlock
        language="python"
        code={`import numpy as np

# pred_matrix shape: (256, 10) for a batch of 256 MNIST images
pred_matrix = net.predict(X_test, steps=60)

# Extract the index of the highest activation for each batch item
pred_classes = np.argmax(pred_matrix, axis=1)

# Compare against ground truth labels
accuracy = np.sum(pred_classes == Y_test_labels) / len(Y_test_labels)
print(f"Test Accuracy: {accuracy * 100:.2f}%")`}
      />
    </TutorialLayout>
  );
}
