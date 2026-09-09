import MainFooter from "../MainFooter";
import UtilButton from "../UtilButton";
import CodeBlock from "../CodeBlock";
import PythonLogo from "../../assets/python.png";

const feedforwardCode = `import torch
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(784, 128), # input(784) -> hidden(128)
    nn.ReLU(), # Activation function
    nn.Linear(128, 10) # hidden(128) -> output(10)
)

x = torch.randn(1, 784)
output = model(x)
print(output)`;

const deepityCode = `import pydeepity
import numpy as np

model = pydeepity.SimplePCN(batch_size=1)
model.add_layer(784, 128, lr=0.001, ir=0.08, act='relu')
model.add_layer(128, 10, lr=0.001, ir=0.08, act='linear')
# Terminal layer:
model.add_layer(10, 0, lr=0.001, ir=0.08, act='linear')

model.compile()
model.randomize_weights()

x = np.random.randn(1, 784).astype(np.float32)
output = model.predict(x, 150)
print(output)`;

export default function Tutorial0_Intro() {
  return (
    <div className="bg-gradient-to-t from-[#DDDDDD] to-[#e4e6e7] min-h-screen pt-[90px]">
      <div className="min-h-screen max-w-7xl mx-auto pb-12">
        <UtilButton backLink="/tutorial" nextLink="/tutorial/1-beginning" />
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 px-8 my-5">
          <div className="max-w-full md:max-w-[55%]">
            <h1 className="AllianceNo2 text-4xl font-bold m-5">
              Tutorial 0: Introduction
            </h1>
            <p className="text-lg m-5 AllianceNo1">
              In this tutorial, we will cover more about what predictive coding
              networks (PCNs, as we will refer to them) are, why they're useful,
              and what makes them different from classical neural networks.
              Then, we will go over the practical bottlenecks and implications
              of future work.
              <br />
              <br />
              For additional resources, we recommend you read{" "}
              <a
                href="https://arxiv.org/pdf/2506.06332"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-blue-600 font-semibold"
              >
                Introduction to Predictive Coding Networks for Machine Learning
                (Stenlund 2025)
              </a>{" "}
              and the{" "}
              <a
                href="https://en.wikipedia.org/wiki/Predictive_coding"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-blue-600 font-semibold"
              >
                Wikipedia article
              </a>{" "}
              on the subject.
            </p>
          </div>
          <div className="mt-5 md:mt-10 px-5">
            <img
              src="../doorway.webp"
              alt="Intro Image"
              width="550"
              className="rounded-lg shadow-xl border border-gray-400"
            />
          </div>
        </div>

        <div className="border-t border-gray-400 my-8 mx-8" />

        <div className="px-8 md:px-12 space-y-10 AllianceNo1 text-lg text-gray-800">
          <section>
            <h2 className="text-2xl font-bold mb-4 AllianceNo2">
              The Limits of Classical Neural Networks
            </h2>
            <p className="mb-4">
              Because of recent popularity and successful scaling in production,
              modern neural networks --which use feedforward backpropagation--
              are often considered the only necessary machine learning
              architecture. Indeed, they are extremely optimized for modern
              GPU-parallelized hardware. But they also suffer from structural
              flaws:
            </p>
            <ul className="list-disc list-outside ml-8 space-y-3">
              <li>
                <b>Drawing-board learning:</b> When the network gets something
                wrong, it does not know it. The model will repeat the mistake on
                every new input sequence. The only way to permanently stop this
                is to bring the model back to the drawing board and train it
                offline.
              </li>
              <li>
                <b>Biological/Generalized Potential:</b> Static architectures
                struggle with few-shot adaptation. While a human can synthesize
                abstract concepts from sparse data, most mainstream AI relies
                strictly on vast historical datasets. We can be certain
                biological brains do not learn via backpropagation.
              </li>
              <li>
                <b>Streams versus Maps:</b> Mainstream AI is built purely for
                mapping an input to an output. It is a one-way pipeline.
                Biological brains do not have a strict "first" or "final" layer
                of neurons; they continuously process and predict based on
                active streams of data.
              </li>
            </ul>
            <div className="my-10 flex flex-col md:flex-row justify-center items-start gap-8">
              <div className="flex flex-col items-center w-full md:max-w-[500px]">
                <img
                  src="https://www.researchgate.net/publication/355403594/figure/fig1/AS:1080896144842786@1634717131435/Fully-connected-neural-network_Q640.jpg"
                  alt="Feedforward neural networks visualized"
                  className="block w-full rounded shadow-md border border-black/15"
                />
                <p className="mt-3 text-center text-sm text-gray-600 AllianceNo1">
                  Fig. 1: Feedforward neural networks are a classic one-way
                  pipeline.
                </p>
              </div>
              <div className="flex flex-col items-center w-full md:max-w-[500px]">
                <div className="h-[500px] w-full">
                  <CodeBlock
                    title="feedforward.py"
                    icon={PythonLogo}
                    language="python"
                    code={feedforwardCode}
                  />
                </div>
                <p className="mt-3 text-center text-sm text-gray-600 AllianceNo1">
                  Fig. 2: Standard frameworks map inputs to outputs
                  sequentially.
                </p>
              </div>
            </div>
          </section>

          <div className="border-t border-gray-400 my-8 mx-8" />

          <section>
            <h2 className="text-2xl font-bold mb-4 AllianceNo2">
              What is a Predictive Coding Network?
            </h2>
            <p className="mb-4">
              Predictive Coding flips the feedforward paradigm. Instead of a
              global error signal floating backward through the entire network,
              PCNs rely on <b>local learning</b>.
            </p>
            <p className="mb-6">
              In a PCN, each layer attempts to predict the activity of the layer
              below it. The difference between the prediction and the actual
              state generates a local error. The network then enters a "settling
              phase," where nodes continuously update their internal states to
              minimize this error locally. Because learning is localized, the
              network can adapt to new information organically without requiring
              a complete global forward and backward pass.
            </p>
            <div className="my-6 flex flex-col items-center">
              <img
                src="https://www.frontiersin.org/files/Articles/1062678/fncom-16-1062678-HTML/image_m/fncom-16-1062678-g001.jpg"
                alt="Comparing PCNs with FFNNs"
                width="650"
                className="rounded border border-black/15 shadow-md"
              />
              <p className="mt-3 text-center text-sm text-gray-600">
                Fig. 3: Feedforward backpropagation compared to Local
                Hebbian-style learning
              </p>
            </div>
            <div className="mx-auto mt-6 w-full max-w-[550px] flex flex-col items-center">
              <CodeBlock
                title="Deepity PCN"
                icon={PythonLogo}
                language="python"
                code={deepityCode}
              />
              <p className="mt-3 text-center text-sm text-gray-600 AllianceNo1">
                Fig. 4: Equivalent code in Deepity.
              </p>
            </div>
          </section>
          <div className="border-t border-gray-400 my-8 mx-8" />
          <section>
            <h2 className="text-2xl font-bold mb-4 AllianceNo2">
              Practical Bottlenecks
            </h2>
            <p className="mb-4">
              If PCNs are so biologically plausible, why aren't they everywhere?
              The answer is <b>network performance and hardware constraints.</b>
            </p>
            <p>
              Standard neural networks rely on massive, highly standardized
              matrix multiplications that modern GPUs compute instantly. PCNs
              require expensive iterative settling loops. To simulate this local
              energy minimization efficiently, we cannot just use the same BLAS
              libraries as PyTorch or Keras. The machinery requires heavily
              fused SIMD loops on the CPU and custom kernel dispatches on the
              GPU to prevent memory bandwidth from choking the entire system.
              Building the infrastructure to make PCNs fast is historically the
              largest barrier to entry.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 AllianceNo2">
              Implications of Future Work
            </h2>
            <p className="mb-4">
              By moving away from global backpropagation, PCNs unlock entirely
              new paradigms for artificial intelligence. Future work in this
              architecture points toward{" "}
              <b>autonomous, long-term learning systems</b> that can
              continuously ingest data and update their own structures without
              human intervention or supervised, offline retraining phases.
            </p>
            <p className="mb-4">
              Furthermore, because learning in a PCN is a localized, continuous
              settling process, it enables true <b>local AI adaptation</b>.
              Instead of relying on static models hosted on massive server
              farms, AI running locally on your hardware could organically learn
              from you and adapt its behavior to your specific needs in
              real-time.
            </p>
            <p>
              Perhaps most importantly, continuous local learning could
              eliminate the need for artificial memory workarounds like{" "}
              <b>context windows and self-attention</b>. Modern LLMs are frozen
              in time, forcing us to cram massive conversation histories into
              their input sequences just so they can "remember" what was said. A
              PCN, however, can dynamically update its internal network state on
              the fly, effectively encoding context directly into its structure
              as it interacts with the world.
            </p>
          </section>
          <small>
            <i>
              You can click the buttons on the right to navigate through
              tutorials!
            </i>
          </small>
        </div>
      </div>
      <MainFooter />
    </div>
  );
}
