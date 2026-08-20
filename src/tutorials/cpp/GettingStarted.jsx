import TutorialLayout, { TerminalBlock, CodeBlock } from "../TutorialLayout";
import { Link } from "react-router-dom";

const menuItems = [
  "Integration",
  "Building a Network",
  "Training Loop",
  "Inference",
];

export default function GettingStartedCpp() {
  return (
    <TutorialLayout
      title="Getting Started (C++)"
      description="Integrate Deepity's core C++ engine directly into your high-performance applications for maximum control and speed."
      menuItems={menuItems}
      language="cpp"
    >
      <h2 id="Integration" className="mt-5 mb-3">
        Integration
      </h2>
      <p>
        To use the C++ engine natively,{" "}
        <Link to="/#GetStarted" className="text-light">
          link the Deepity core library
        </Link>{" "}
        to your project and include the main network header. Ensure your build
        system (like CMake) is configured to use C++17 or higher.
      </p>
      <CodeBlock
        language="cpp"
        code={`#include <vector>
#include <random>
#include "DiscriminativePCNetwork.h"`}
      />

      <h2 id="BuildingaNetwork" className="mt-5 mb-3">
        Building a Network
      </h2>
      <p>
        You can initialize the network by passing the expected batch size
        directly into the constructor. When adding layers, you explicitly define
        the architecture sizes alongside the learning rates, inference rates,
        precision rates, and activation functions.
      </p>
      <CodeBlock
        language="cpp"
        code={`// 1. Initialize a network with a batch size of 256
Deep::DiscriminativePCNetwork net(256);

// 2. Add Layers: Input (784) -> Hidden (512) -> Output (10) -> Terminal (0)
// Signature: AddLayer(size, nextSize, lr, ir, pr, lambda, act, dAct)
net.AddLayer(784, 512, 0.06f, 0.08f, 0.0f, 0.0001f, Deep::ActivationType::TANH, Deep::ActivationType::dTANH);
net.AddLayer(512, 10,  0.06f, 0.08f, 0.0f, 0.0001f, Deep::ActivationType::TANH, Deep::ActivationType::dTANH);
net.AddLayer(10,  0,   0.06f, 0.08f, 0.0f, 0.0001f, Deep::ActivationType::LINEAR, Deep::ActivationType::dLINEAR);

// 3. Allocate the MemoryArena and compile the tensor pointers
net.Compile();

// 4. Initialize weights using a standard Mersenne Twister
std::mt19937 rng(42);
net.RandomizeWeights(rng);`}
      />

      <h2 id="TrainingLoop" className="mt-5 mb-3">
        The Training Loop
      </h2>
      <p>
        Unlike the Python wrapper's high-level <code>fit()</code> method, the
        C++ backend gives you granular control over the training loop. You feed
        standard <code>std::vector&lt;float&gt;</code> batches directly into{" "}
        <code>TrainStep()</code>.
      </p>
      <p>
        <code>TrainStep()</code> automatically clamps the data, runs the
        biological settling loop for the specified number of steps, applies
        Hebbian weight updates, and returns the final energy state of the batch.
      </p>
      <CodeBlock
        language="cpp"
        code={`int epochs = 50;
int inferenceSteps = 60;

for (int epoch = 0; epoch < epochs; ++epoch) {
    // Assume x_batch and y_batch are flattened 1D std::vector<float> 
    // containing exactly 256 samples
    
    float batchEnergy = net.TrainStep(x_batch, y_batch, inferenceSteps);
    
    // You can implement custom learning rate decay here by calling
    // net.SetLearningRate(new_lr);
}`}
      />

      <h2 id="Inference" className="mt-5 mb-3">
        Inference
      </h2>
      <p>
        To perform predictions, use the <code>Predict()</code> method. It runs
        the exact same energy-minimization loop, but leaves the top-level
        targets unclamped so the network infers the label organically using only
        bottom-up errors.
      </p>
      <CodeBlock
        language="cpp"
        code={`// Run inference on the test batch
// Returns a flattened 1D vector of shape (batch_size * output_size)
std::vector<float> predictions = net.Predict(x_test_batch, inferenceSteps);

// To extract the prediction for the first image in the batch:
int num_classes = 10;
float max_val = predictions[0];
int best_class = 0;

for (int i = 1; i < num_classes; ++i) {
    if (predictions[i] > max_val) {
        max_val = predictions[i];
        best_class = i;
    }
}`}
      />
    </TutorialLayout>
  );
}
