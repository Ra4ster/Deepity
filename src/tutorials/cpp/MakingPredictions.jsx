import TutorialLayout, { CodeBlock } from "../TutorialLayout";

const menuItems = [
  "The Predict Method",
  "Unsupervised Settling",
  "Decoding the Output",
];

export default function MakingPredictionsCpp() {
  return (
    <TutorialLayout
      title="Making Predictions (C++)"
      description="Execute native C++ inference to generate predictions from your trained DiscriminativePCNetwork."
      menuItems={menuItems}
      language="cpp"
    >
      <h2 id="ThePredictMethod" className="mt-5 mb-3">
        The Predict Method
      </h2>
      <p>
        In the C++ backend, prediction is handled by calling{" "}
        <code>Predict()</code> on your <code>DiscriminativePCNetwork</code>{" "}
        instance[cite: 3]. You pass in your batched input vector and the number
        of inference iterations.
      </p>
      <CodeBlock
        language="cpp"
        code={`// Run inference on the test batch
int inferenceSteps = 60;
std::vector<float> predictions = net.Predict(x_test_batch, inferenceSteps);`}
      />

      <h2 id="UnsupervisedSettling" className="mt-5 mb-3">
        Unsupervised Settling
      </h2>
      <p>
        When <code>Predict()</code> is called, the network clamps the input data
        to the first layer but keeps the terminal layer unclamped. It then calls{" "}
        <code>CalculateState()</code> and <code>UpdateState()</code> repeatedly
        for the duration of the <code>inferenceSteps</code> loop.
      </p>
      <p>
        Because there is no target <code>Y</code> forcing the network into a
        specific state, the network relies on its trained weights (
        <code>W</code>) to project predictions upward, iteratively settling its
        latent states (<code>z</code>) into the lowest possible energy
        configuration based purely on the input data.
      </p>

      <h2 id="DecodingtheOutput" className="mt-5 mb-3">
        Decoding the Output
      </h2>
      <p>
        The C++ <code>Predict()</code> method returns a flattened 1D{" "}
        <code>std::vector&lt;float&gt;</code> containing the final settled
        states of the terminal layer for the entire batch[cite: 3].
      </p>
      <p>
        If your batch size is 256 and your output size is 10, the returned
        vector will contain exactly 2,560 floats. You must manually iterate
        through this flattened array in chunks of your <code>outputSize</code>{" "}
        to extract the highest confidence prediction for each batch item.
      </p>
      <CodeBlock
        language="cpp"
        code={`int batchSize = 256;
int numClasses = 10;
int correctPredictions = 0;

for (int b = 0; b < batchSize; ++b) {
    // Find the starting index for this specific batch item
    int offset = b * numClasses;
    
    float maxVal = predictions[offset];
    int predictedClass = 0;
    
    // Find the argmax for this item
    for (int c = 1; c < numClasses; ++c) {
        if (predictions[offset + c] > maxVal) {
            maxVal = predictions[offset + c];
            predictedClass = c;
        }
    }
    
    // Compare against your integer ground truth labels
    if (predictedClass == y_test_labels[b]) {
        correctPredictions++;
    }
}

float accuracy = (static_cast<float>(correctPredictions) / batchSize) * 100.0f;
std::cout << "Test Accuracy: " << accuracy << "%" << std::endl;`}
      />
    </TutorialLayout>
  );
}
