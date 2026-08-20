import TutorialLayout, { CodeBlock } from "../TutorialLayout";

const menuItems = [
  "Includes & Setup",
  "Network Initialization",
  "The Settling Loop",
  "Reading Predictions",
];

export default function YourFirstPCNCpp() {
  return (
    <TutorialLayout
      title="Your First PCN (C++)"
      description="Construct and train a Predictive Coding Network from scratch using the high-performance Deepity C++ backend."
      menuItems={menuItems}
    >
      <h2 id="IncludesSetup" className="mt-5 mb-3">
        Includes & Setup
      </h2>
      <p>
        We begin by including standard C++ utilities and the core{" "}
        <code>DiscriminativePCNetwork</code> header. We will also define our XOR
        dataset using flattened 1D standard vectors, which the Deepity backend
        consumes natively.
      </p>
      <CodeBlock
        language="cpp"
        code={`#include <iostream>
#include <vector>
#include <random>
#include "DiscriminativePCNetwork.h"

int main() {
    // 4 samples, 2 features each (flattened)
    std::vector<float> X = {
        0.0f, 0.0f,
        0.0f, 1.0f,
        1.0f, 0.0f,
        1.0f, 1.0f
    };

    // Bipolar targets for the 2 output classes
    std::vector<float> Y = {
        -0.9f, -0.9f,
         0.9f,  0.9f,
         0.9f,  0.9f,
        -0.9f, -0.9f
    };`}
      />

      <h2 id="NetworkInitialization" className="mt-5 mb-3">
        Network Initialization
      </h2>
      <p>
        We construct the network by explicitly setting the batch size (4) and
        defining the layer sizes. The <code>Compile()</code> method then
        calculates the required float counts and binds all <code>W</code>,{" "}
        <code>b</code>, <code>e</code>, and <code>z</code> tensor pointers to a
        contiguous <code>MemoryArena</code>.
      </p>
      <CodeBlock
        language="cpp"
        code={`    // Initialize network for a batch size of 4
    Deep::DiscriminativePCNetwork net(4);

    // Layer 0: Input(2) -> Hidden(16)
    net.AddLayer(2, 16, 0.05f, 0.1f, 0.0f, 0.0001f, Deep::ActivationType::TANH, Deep::ActivationType::dTANH);
    
    // Layer 1: Hidden(16) -> Output(2)
    net.AddLayer(16, 2, 0.05f, 0.1f, 0.0f, 0.0001f, Deep::ActivationType::TANH, Deep::ActivationType::dTANH);
    
    // Layer 2: Terminal Layer
    net.AddLayer(2, 0, 0.05f, 0.1f, 0.0f, 0.0001f, Deep::ActivationType::LINEAR, Deep::ActivationType::dLINEAR);

    // Bind memory and initialize weights
    net.Compile();
    
    std::mt19937 rng(42);
    net.RandomizeWeights(rng);`}
      />

      <h2 id="TheSettlingLoop" className="mt-5 mb-3">
        The Settling Loop
      </h2>
      <p>
        The core of the PCN is the <code>TrainStep</code> method. It
        automatically clamps the data, runs the local energy-minimization loop,
        applies Hebbian weight updates, and returns the total energy of the
        network before the update.
      </p>
      <CodeBlock
        language="cpp"
        code={`    int epochs = 100;
    int inferenceSteps = 30;

    std::cout << "Starting training loop..." << std::endl;

    for (int epoch = 0; epoch < epochs; ++epoch) {
        // Run a full forward inference and backward update step
        float energy = net.TrainStep(X, Y, inferenceSteps);
        
        if (epoch % 20 == 0) {
            std::cout << "Epoch " << epoch << " | Energy: " << energy << std::endl;
        }
    }`}
      />

      <h2 id="ReadingPredictions" className="mt-5 mb-3">
        Reading Predictions
      </h2>
      <p>
        After the network has minimized its free energy, we use{" "}
        <code>Predict()</code>. This leaves the terminal layer unclamped,
        forcing the network to infer the correct output states organically.
      </p>
      <CodeBlock
        language="cpp"
        code={`    // Evaluate the test batch
    std::vector<float> predictions = net.Predict(X, inferenceSteps);

    std::cout << "\\nFinal Predictions:" << std::endl;
    for (int i = 0; i < 4; ++i) {
        float class0 = predictions[i * 2];
        float class1 = predictions[i * 2 + 1];
        
        int predicted_class = (class1 > class0) ? 1 : 0;
        std::cout << "Sample " << i << " -> Class: " << predicted_class << std::endl;
    }

    return 0;
}`}
      />
    </TutorialLayout>
  );
}
