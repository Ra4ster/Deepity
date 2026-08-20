import TutorialLayout, { CodeBlock } from "../TutorialLayout";

const menuItems = [
  "The TrainStep Method",
  "Inference Steps",
  "Manual LR Decay",
  "Monitoring Energy",
];

export default function TrainingCpp() {
  return (
    <TutorialLayout
      title="Training a PCN (C++)"
      description="Take full control of the Predictive Coding training loop, manage your own learning rate schedules, and monitor local energy states."
      menuItems={menuItems}
      language="cpp"
    >
      <h2 id="TheTrainStepMethod" className="mt-5 mb-3">
        The TrainStep Method
      </h2>
      <p>
        In the C++ backend, training is executed one batch at a time using the{" "}
        <code>TrainStep()</code> method on your{" "}
        <code>DiscriminativePCNetwork</code>. This method abstracts away the
        manual clamping and state-update loops, handling the full forward and
        backward pass natively.
      </p>
      <CodeBlock
        language="cpp"
        code={`// Run a single training step on a batched input and target
float batchEnergy = net.TrainStep(x_batch, y_batch, inferenceSteps);`}
      />

      <h2 id="InferenceSteps" className="mt-5 mb-3">
        Inference Steps
      </h2>
      <p>
        The <code>inferenceSteps</code> integer defines the length of the
        biological settling loop. Because PCNs update weights using local
        errors, the network's latent states must relax into an equilibrium
        before the gradients are valid.
      </p>
      <p>
        If your energy landscape is failing to converge, try increasing the
        inference steps to give the <code>CalculateState()</code> and{" "}
        <code>UpdateState()</code> functions more time to minimize the
        prediction errors.
      </p>

      <h2 id="ManualLRDecay" className="mt-5 mb-3">
        Manual LR Decay
      </h2>
      <p>
        Because the C++ engine does not impose a strict epoch structure, you
        must manage your own learning rate schedules. You can dynamically adjust
        the network's learning rate between batches or epochs using the{" "}
        <code>SetLearningRate()</code> method.
      </p>
      <CodeBlock
        language="cpp"
        code={`float currentLR = 0.06f;
float decayRate = 0.98f;

for (int epoch = 0; epoch < 50; ++epoch) {
    // 1. Update the network's learning rate for this epoch
    net.SetLearningRate(currentLR);
    
    // 2. Loop through all your batches
    for (size_t b = 0; b < numBatches; ++b) {
        net.TrainStep(x_batches[b], y_batches[b], 60);
    }
    
    // 3. Apply exponential decay for the next epoch
    currentLR *= decayRate;
}`}
      />

      <h2 id="MonitoringEnergy" className="mt-5 mb-3">
        Monitoring Energy
      </h2>
      <p>
        The <code>TrainStep()</code> function returns a float representing the
        total free energy of the network right before the weights were updated.
      </p>
      <p>
        This value is mathematically equivalent to the sum of the squared
        prediction errors across every layer. By accumulating this returned
        value across your batches and dividing by the batch count, you can track
        the average epoch energy to ensure your model is actively learning and
        converging correctly.
      </p>
    </TutorialLayout>
  );
}
