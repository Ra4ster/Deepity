import { Link } from "react-router-dom";
import Arrow from "./components/arrow";
import PythonIcon from "./assets/python.png";
import CppIcon from "./assets/cpp.png";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { lazy, Suspense, useState, memo } from "react";
import MainFooter from "./components/MainFooter";

const BenchmarkChart = lazy(() => import("./components/BenchmarkChart"));
const PCNRepresentation = lazy(() => import("./components/PCNRepresentation"));

const pythoncode = `from pydeepity import SimplePCN 

net = SimplePCN(batch_size=250)
net.add_layer(784, 512, lr=0.001, ir=0.08, act="linear")
net.add_layer(512, 512, lr=0.001, ir=0.08, act="sigmoid")
net.add_layer(512, 10, lr=0.001, ir=0.08, act="sigmoid")
net.add_layer(10, 0, lr=0.001, ir=0.08, act="linear")

net.set_optimizer("ADAM")
net.compile()
net.randomize_weights()

X: np.ndarray = np.array([-1, -1, -1, 1, 1, -1, 1, 1], dtype=np.float32)
Y: np.ndarray = np.array([-1, 1, 1, -1], dtype=np.float32)

for epoch in range(1500):
  energy = net.train_step(X, Y, steps=150)

predictions = net.predict(X, steps=150)
`;

const cppcode = `#include <deepity/networks/SimplePCNetwork.h>

Deep::SimplePCNetwork net(4);
net.AddLayer(784, 512, 0.01f, 0.1f, 0.0f, Deep::ActivationType::TANH, Deep::ActivationType::dTANH);
net.AddLayer(512, 512, 0.01f, 0.1f, 0.0f, Deep::ActivationType::TANH, Deep::ActivationType::dTANH);
net.AddLayer(512, 10, 0.01f, 0.1f, 0.0f, Deep::ActivationType::TANH, Deep::ActivationType::dTANH);
net.AddLayer(10, 0, 0.01f, 0.1f, 0.0f, Deep::ActivationType::LINEAR, Deep::ActivationType::dLINEAR);

net.SetOptimizer(Deep::OptimizerType::ADAM);
net.Compile();
net.RandomizeWeights();

std::vector<float> X = {-1, -1, -1, 1, 1, -1, 1, 1};
std::vector<float> Y = {-1, 1, 1, -1};

for (int epoch = 0; epoch < 1500; ++epoch)
    float energy = net.TrainStep(X, Y, 150);

std::vector<float> predictions = net.Predict(X, 150);`;

const heroStyle = {
  backgroundImage: `url(./flowerpot.jpg)`,
  backgroundSize: "cover",
  backgroundPosition: "center 65%",
};

const syntaxCustomStyle = {
  margin: 0,
  padding: "1.25rem",
  fontSize: "14px",
  fontFamily: "Fira Code, monospace",
  background: "#fafafa",
};

const CodeBlock = memo(({ language, code, icon, title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="overflow-hidden border border-black/15">
      <div className="flex items-center justify-between border-b border-black/15 bg-[#f1f2f3] px-4 py-2">
        <div className="flex items-center gap-2">
          <img src={icon} alt={title} className="h-4 w-4 object-contain" />
          <span className="text-sm font-medium text-black/70">{title}</span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-black/50 transition-colors hover:text-black"
          aria-label={`Copy ${title} code`}
        >
          <span className="text-xs">{copied ? "Copied!" : "Copy"}</span>
          {copied ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          )}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={docco}
        customStyle={syntaxCustomStyle}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
});

export default function HomePage() {
  return (
    <div className="bg-[#e4e6e7]">
      <div
        className="min-h-screen flex flex-col items-center justify-center AllianceNo1 gap-4 text-center border-b border-[#202d3b]-200 backdrop-blur-md"
        style={heroStyle}
      >
        <span className="text-4xl AllianceNo1">Welcome to Deepity</span>
        <span className="text-lg AllianceNo1 mb-10">
          A high-performance implementation of
          <br /> Predictive Coding Networks in C++ and Python.
        </span>
        <Link
          to="/docs"
          className="group flex items-center gap-4 shadow-lg border border-black px-5 py-3 mt-3 text-base text-black font-bold no-underline transition-colors duration-300 hover:bg-black hover:text-white hover:scale-105"
        >
          Get Started
          <Arrow />
        </Link>
      </div>

      <section className="bg-[#e6e8e9] border-b border-[#202d3b]-200 px-8 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl AllianceNo1">Proven Performance</h2>

          <p className="mt-3 max-w-2xl text-base text-black/70">
            Deepity's DKPPCN reaches 97.73% test accuracy on MNIST, approaching
            PyTorch's feedforward backprop accuracy while training entirely on
            the CPU.
          </p>
          <Suspense fallback={<div className="h-96" />}>
            <BenchmarkChart />
          </Suspense>
        </div>
      </section>

      <section className="bg-[#e6e8e9] border-b border-[#202d3b]-200 px-8 py-20">
        <div className="mx-auto max-w-5xl justify-center align-items text-center">
          <h2 className="text-3xl AllianceNo1">What is Predictive Coding?</h2>

          <p className="mt-3 text-black/70">
            Deepity implements Predictive Coding Networks, where neurons
            iteratively minimize local prediction errors rather than propagating
            gradients backward through the entire network.
          </p>
          <Suspense fallback={<div className="h-48" />}>
            <PCNRepresentation />
          </Suspense>
          <p className="mt-3 text-black/70">
            This approach is inspired by the brain's predictive coding theory,
            which suggests that the brain constantly generates predictions about
            incoming sensory information and updates its internal model based on
            the prediction errors. This architecture is capable of learning
            complex representations, continuous learning, and even generalized
            learning across tasks.
            <br />
            <br />
            The problem is this algorithm is computationally expensive and slow
            to train, which is why Deepity focuses on optimizing its
            implementation for better performance.
          </p>
        </div>
      </section>

      <section className="bg-[#e6e8e9] border-b border-[#202d3b]-200 px-8 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl AllianceNo1 justify-center text-center">
            Why Deepity?
          </h2>
          <ul className="mt-5 list-disc list-inside text-black/70 tracking-widest AllianceNo1">
            <li className="m-3">
              <b>CPU-First</b>: Bundled with OpenBLAS and OpenMP for optimized
              CPU performance, making it ideal for edge devices and low-power
              environments. Custom SIMD kernels for Intel and AMD CPUs, with ARM
              support in progress.
            </li>
            <li className="m-3">
              <b>Strongly Bound</b>: Built with nanobind for seamless
              integration with Python ecosystems and a wheel size under 1MB.
            </li>
            <li className="m-3">
              <b>Well-Documented</b>: Comprehensive documentation (using
              Doxygen) and examples to help users get started quickly. Examples
              are tested during every push with GitHub Actions.
            </li>
            <li className="m-3">
              <b>Open-Source</b>: Licensed under the MIT License, making it
              freely available for anyone to use and contribute to. Deepity was
              made by a single developer and is actively maintained with a focus
              on performance and usability. For my full story, check out{" "}
              <a
                href="https://ra4ster.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline text-blue-600"
              >
                my website here
              </a>
              .
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-[#e6e8e9] border-b border-[#202d3b]-200 px-8 py-10">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl AllianceNo1">Code Examples</h2>
          <p className="mt-2 text-black/70">
            Deepity is designed to be easy to use and integrate into existing
            projects. Here are some code examples to get you started.
          </p>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <CodeBlock
              language="python"
              code={pythoncode}
              icon={PythonIcon}
              title="Python"
            />

            <CodeBlock
              language="cpp"
              code={cppcode}
              icon={CppIcon}
              title="C++"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#e6e8e9] border-b border-[#202d3b]/20 px-8 py-20">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
          <div className="flex-1">
            <h2 className="text-3xl AllianceNo1">Interested in Development?</h2>

            <p className="mt-3 max-w-2xl text-black/70">
              Deepity is an open-source implementation of Predictive Coding
              Networks, and I welcome contributions from the community. If
              you're interested in contributing to the project, please check out
              the GitHub repository and feel free to submit pull requests or
              open issues. Your contributions can help improve the performance,
              usability, and documentation of Deepity.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="mailto:jackrose2335@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-black hover:shadow-lg px-5 py-3 font-bold no-underline text-black transition-colors hover:bg-black hover:text-white"
              >
                Contact Me
              </a>

              <Link
                to="/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-black hover:shadow-lg px-5 py-3 font-bold no-underline text-black transition-colors hover:bg-black hover:text-white"
              >
                Learn More Theory
              </Link>
            </div>
          </div>

          <iframe
            src="https://discord.com/widget?id=1545278281807433808&theme=dark"
            width="350"
            height="350"
            allowtransparency="true"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
            className="shrink-0 w-full md:w-[350px] shadow-xl"
          />
        </div>
      </section>
      <MainFooter />
    </div>
  );
}
