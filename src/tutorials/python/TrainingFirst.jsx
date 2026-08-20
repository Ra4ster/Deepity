import TutorialLayout, { CodeBlock } from "../TutorialLayout";

const menuItems = [
  "The Fit Method",
  "Inference Steps",
  "Learning Rate Scheduling",
  "Energy Minimization",
];

export default function TrainingPython() {
  return (
    <TutorialLayout
      title="Training a PCN (Python)"
      description="Understand the biological settling loop, free energy minimization, and how to properly tune your training phase using pydeepity."
      menuItems={menuItems}
      language="python"
    >
      <h2 id="TheFitMethod" className="mt-5 mb-3">
        The Fit Method
      </h2>
      <p>
        Unlike classical feed-forward neural networks that use a single global
        backpropagation pass, Predictive Coding Networks (PCNs) update their
        weights using local Hebbian plasticity. The Python wrapper provides a
        high-level <code>fit()</code> method to manage this process
        automatically across your dataset.
      </p>
      <CodeBlock
        language="python"
        code={`# A standard training call
net.fit(
    X_train, Y_train,
    epochs=50,
    steps=60,
    initial_lr=0.06,
    decay_rate=0.98
)`}
      />

      <h2 id="InferenceSteps" className="mt-5 mb-3">
        Inference Steps
      </h2>
      <p>
        The <code>steps</code> parameter is unique to energy-based models like
        Deepity. Before a PCN can update its weights, its internal latent states
        must "settle" into a configuration that minimizes the prediction errors
        between layers.
      </p>
      <p>
        During training, the <code>steps</code> parameter tells the network how
        many times to pass signals up and down the hierarchy per batch. Too few
        steps, and the network updates its weights using inaccurate gradients.
        Too many steps, and you waste compute time. For most standard
        classification tasks, <strong>30 to 60 steps</strong> is the optimal
        sweet spot.
      </p>

      <h2 id="LearningRateScheduling" className="mt-5 mb-3">
        Learning Rate Scheduling
      </h2>
      <p>
        PCNs are highly sensitive to learning rates because they update weights
        locally. If the learning rate is too high, the local updates will cause
        the global energy to explode. Deepity handles this via a built-in
        exponential decay schedule.
      </p>
      <p>
        The <code>initial_lr</code> sets the starting rate, and{" "}
        <code>decay_rate</code> acts as a multiplier applied at the end of every
        epoch. For example, a decay of <code>0.98</code> will drop the learning
        rate by 2% each epoch, allowing the network to make large structural
        changes early and fine-tune its features later.
      </p>

      <h2 id="EnergyMinimization" className="mt-5 mb-3">
        Energy Minimization
      </h2>
      <p>
        Instead of tracking a standard loss function like Cross-Entropy, PCNs
        track <strong>Total Free Energy</strong>. This is a measure of the total
        prediction error across all layers in the network.
      </p>
      <p>
        When you run the <code>fit()</code> method, the console will output the
        average batch energy. Your goal is to see this number steadily decrease
        over the epochs. If the energy spikes or returns `NaN`, your learning
        rate (or your inference rate) is likely set too high.
      </p>
    </TutorialLayout>
  );
}
