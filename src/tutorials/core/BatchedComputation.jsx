import TutorialLayout from "../TutorialLayout";

const menuItems = [
  "The Stateful Architecture",
  "Memory Locality",
  "Vectorization & SIMD",
  "Gradient Accumulation",
];

function BatchDiagram() {
  return (
    <div className="my-5 rounded-4 border border-secondary bg-dark overflow-hidden">
      <div className="p-3 p-md-4 border-bottom border-secondary">
        <div className="fw-semibold">One network, many independent states</div>
        <div className="small text-secondary">
          The weights are shared. The inference state is not.
        </div>
      </div>

      <div className="p-4">
        <div className="row g-3 align-items-center">
          {["Image 01", "Image 02", "Image 03", "Image 04"].map(
            (item, index) => (
              <div className="col-6 col-md-3" key={item}>
                <div className="p-3 rounded-3 border border-secondary text-center bg-black">
                  <div className="small text-secondary mb-2">
                    SAMPLE {String(index + 1).padStart(2, "0")}
                  </div>

                  <div
                    className="mx-auto mb-3 rounded-2 border border-info d-flex align-items-center justify-content-center text-info"
                    style={{
                      width: 70,
                      height: 55,
                    }}
                  >
                    {index === 0
                      ? "A"
                      : index === 1
                        ? "B"
                        : index === 2
                          ? "C"
                          : "D"}
                  </div>

                  <div className="font-monospace small">state[{index}]</div>
                </div>
              </div>
            ),
          )}
        </div>

        <div className="text-center text-secondary fs-3 my-3">↓</div>

        <div className="p-3 p-md-4 rounded-3 border border-warning bg-black">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-warning fw-semibold">SHARED NETWORK</span>

            <span className="font-monospace small text-secondary">W, b</span>
          </div>

          <div className="progress" style={{ height: 8 }}>
            <div className="progress-bar w-100" />
          </div>

          <div className="small text-secondary mt-3">
            Every sample uses the same parameters while maintaining its own
            latent state and prediction errors.
          </div>
        </div>
      </div>
    </div>
  );
}

function MemoryDiagram() {
  const blocks = [
    ["z", "state"],
    ["e", "error"],
    ["μ", "prediction"],
    ["W", "weights"],
    ["z", "state"],
    ["e", "error"],
    ["μ", "prediction"],
    ["W", "weights"],
  ];

  return (
    <div className="my-5 rounded-4 border border-secondary bg-dark overflow-hidden">
      <div className="p-3 p-md-4 border-bottom border-secondary">
        <div className="fw-semibold">Contiguous memory</div>
        <div className="small text-secondary">
          Keep frequently accessed data close together.
        </div>
      </div>

      <div className="p-4">
        <div className="small text-secondary mb-2">MEMORY ARENA</div>

        <div
          className="d-flex rounded-3 overflow-hidden border border-secondary"
          style={{ minHeight: 90 }}
        >
          {blocks.map(([symbol, label], index) => (
            <div
              key={`${symbol}-${index}`}
              className={`flex-fill d-flex flex-column justify-content-center align-items-center border-end border-secondary ${
                index % 2 === 0 ? "bg-black" : ""
              }`}
            >
              <div className="font-monospace text-info fw-semibold">
                {symbol}
              </div>

              <div className="small text-secondary d-none d-sm-block">
                {label}
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-between mt-3 small text-secondary">
          <span>low address</span>
          <span>high address</span>
        </div>

        <div className="mt-4 p-3 rounded-3 border border-success">
          <div className="text-success fw-semibold mb-1">Why this helps</div>

          <div className="small text-secondary">
            Sequential data access is easier for the CPU cache and memory
            subsystem to handle than repeatedly jumping between unrelated heap
            allocations.
          </div>
        </div>
      </div>
    </div>
  );
}

function SIMDVisual() {
  const values = ["1.2", "0.7", "2.1", "0.4"];

  return (
    <div className="my-5 rounded-4 border border-secondary bg-dark overflow-hidden">
      <div className="p-3 p-md-4 border-bottom border-secondary">
        <div className="fw-semibold">Scalar vs. vectorized computation</div>
        <div className="small text-secondary">
          The operation is the same. The hardware handles multiple elements at
          once.
        </div>
      </div>

      <div className="p-4">
        <div className="row g-4">
          <div className="col-md-6">
            <div className="small text-secondary text-uppercase mb-2">
              Scalar
            </div>

            <div className="p-3 rounded-3 border border-secondary bg-black font-monospace">
              {values.map((value, index) => (
                <div key={value} className="mb-2 last-child:mb-0">
                  <span className="text-secondary">operation({index})</span>
                  <span className="text-info ms-2">{value}</span>
                </div>
              ))}
            </div>

            <div className="small text-secondary mt-2">
              One element handled at a time.
            </div>
          </div>

          <div className="col-md-6">
            <div className="small text-secondary text-uppercase mb-2">
              Vectorized
            </div>

            <div className="p-3 rounded-3 border border-info bg-black font-monospace">
              <div className="text-info">
                [ 1.2&nbsp;&nbsp; 0.7&nbsp;&nbsp; 2.1&nbsp;&nbsp; 0.4 ]
              </div>

              <div className="text-secondary my-2">×</div>

              <div className="text-warning">
                [ w&nbsp;&nbsp; w&nbsp;&nbsp; w&nbsp;&nbsp; w ]
              </div>

              <div className="text-secondary my-2">↓</div>

              <div className="text-success">
                [ result&nbsp;&nbsp; result&nbsp;&nbsp; result&nbsp;&nbsp;
                result ]
              </div>
            </div>

            <div className="small text-secondary mt-2">
              Multiple values can be processed by a single vector instruction.
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-3 border border-warning">
          <div className="text-warning fw-semibold mb-1">
            The important idea
          </div>

          <div className="small text-secondary">
            SIMD does not make the algorithm magically different. It makes
            repeated numerical operations much more efficient on hardware
            designed to perform them in parallel.
          </div>
        </div>
      </div>
    </div>
  );
}

function GradientDiagram() {
  return (
    <div className="my-5 rounded-4 border border-secondary bg-dark overflow-hidden">
      <div className="p-3 p-md-4 border-bottom border-secondary">
        <div className="fw-semibold">Many samples → one weight update</div>
        <div className="small text-secondary">
          Per-sample learning signals are aggregated before changing shared
          parameters.
        </div>
      </div>

      <div className="p-4">
        <div className="row g-3">
          {["Sample A", "Sample B", "Sample C", "Sample D"].map(
            (sample, index) => (
              <div className="col-6 col-md-3" key={sample}>
                <div className="p-3 rounded-3 border border-secondary bg-black text-center">
                  <div className="small text-secondary">{sample}</div>

                  <div className="font-monospace text-info fs-5 my-2">
                    ΔW{index + 1}
                  </div>

                  <div className="small text-secondary">local update</div>
                </div>
              </div>
            ),
          )}
        </div>

        <div className="text-center text-secondary fs-3 my-3">↓</div>

        <div className="p-4 rounded-3 border border-warning bg-black text-center">
          <div className="text-warning fw-semibold">AGGREGATE</div>

          <div className="font-monospace fs-5 my-2">ΔW₁ + ΔW₂ + ΔW₃ + ΔW₄</div>

          <div className="small text-secondary">
            Combine the contributions from the batch.
          </div>
        </div>

        <div className="text-center text-secondary fs-3 my-3">↓</div>

        <div className="p-4 rounded-3 border border-success bg-black text-center">
          <div className="text-success fw-semibold">SHARED WEIGHTS</div>

          <div className="font-monospace fs-5 my-2">W ← W + ΔWbatch</div>

          <div className="small text-secondary">
            One update incorporates information from the entire batch.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BatchedComputation() {
  return (
    <TutorialLayout
      title="Batched Computation"
      description="See how Deepity turns stateful Predictive Coding inference into efficient batched computation using contiguous memory, vectorized operations, and aggregated learning signals."
      menuItems={menuItems}
      language="core"
    >
      {/* Hero */}
      <div className="p-4 p-md-5 my-4 rounded-4 border border-secondary bg-dark">
        <div className="row align-items-center g-5">
          <div className="col-lg-7">
            <span className="badge bg-info text-dark mb-3">
              COMPUTATIONAL ARCHITECTURE
            </span>

            <h2 className="display-6 fw-bold mb-3">
              Stateful inference,
              <br />
              <span className="text-info">running in parallel.</span>
            </h2>

            <p className="lead text-secondary mb-0">
              Predictive Coding introduces a challenge that ordinary neural
              networks largely avoid: every sample has its own evolving state.
              Deepity's job is to keep those states independent while making
              their computation look as regular as possible to the hardware.
            </p>
          </div>

          <div className="col-lg-5">
            <div className="p-4 rounded-4 border border-secondary bg-black">
              <div className="small text-secondary mb-3">BATCH</div>

              <div className="d-flex gap-2 mb-3">
                {["A", "B", "C", "D"].map((item) => (
                  <div
                    key={item}
                    className="flex-fill rounded-2 border border-info text-info text-center py-3 font-monospace"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="text-center text-secondary mb-3">↓</div>

              <div className="p-3 rounded-2 border border-warning text-center">
                <span className="font-monospace text-warning">
                  shared weights
                </span>
              </div>

              <div className="text-center text-secondary my-3">↓</div>

              <div className="d-flex gap-2">
                {["zA", "zB", "zC", "zD"].map((item) => (
                  <div
                    key={item}
                    className="flex-fill rounded-2 border border-success text-success text-center py-2 font-monospace small"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stateful architecture */}
      <h2 id="TheStatefulArchitecture" className="mt-5 mb-3">
        The Stateful Architecture
      </h2>

      <p>
        In a conventional feedforward network, a batch is mostly a convenient
        way of grouping independent examples. Give the network 256 inputs, run
        the same operations on all of them, and collect 256 outputs.
      </p>

      <p>
        A Predictive Coding Network has an additional piece of data to manage:
        <strong> state</strong>. During inference, every example maintains its
        own latent representation while the network repeatedly updates it.
      </p>

      <BatchDiagram />

      <p>
        The important distinction is that the{" "}
        <strong>parameters are shared</strong>, while the{" "}
        <strong>inference state is independent</strong>. Sample A can settle
        toward one representation while Sample B is settling toward a completely
        different one.
      </p>

      <div className="alert alert-info border-0 my-4">
        <strong>Think in two dimensions:</strong> the batch dimension tells us
        which example we are processing; the state dimension tells us what that
        example currently believes. Efficient batching means keeping both
        dimensions organized in memory.
      </div>

      {/* Memory */}
      <h2 id="MemoryLocality" className="mt-5 mb-3">
        Memory Locality & The Arena
      </h2>

      <p>
        Once inference becomes iterative, memory access happens over and over
        again. Every settling step may read and write states, predictions,
        errors, and weights. That makes the layout of those arrays an important
        part of performance.
      </p>

      <p>
        If related data is scattered across many independent heap allocations,
        the processor may need to fetch it from different locations in memory. A
        more compact layout gives the CPU's cache and memory subsystem a much
        easier job.
      </p>

      <MemoryDiagram />

      <p>
        Deepity addresses this with a <strong>Memory Arena</strong>: a
        pre-allocated region from which the engine assigns portions of memory to
        the arrays required by the compiled network.
      </p>

      <div className="row g-3 my-4">
        <div className="col-md-4">
          <div className="p-4 rounded-4 border border-secondary bg-dark h-100">
            <div className="text-info fs-3 mb-2">01</div>
            <strong>Allocate</strong>
            <p className="small text-secondary mt-2 mb-0">
              Reserve the required memory ahead of computation.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-4 rounded-4 border border-secondary bg-dark h-100">
            <div className="text-warning fs-3 mb-2">02</div>
            <strong>Partition</strong>
            <p className="small text-secondary mt-2 mb-0">
              Assign offsets to states, errors, predictions, and parameters.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="p-4 rounded-4 border border-secondary bg-dark h-100">
            <div className="text-success fs-3 mb-2">03</div>
            <strong>Reuse</strong>
            <p className="small text-secondary mt-2 mb-0">
              Reuse the same memory throughout the repeated settling loop.
            </p>
          </div>
        </div>
      </div>

      <p>
        This doesn't eliminate memory costs—the states still have to exist—but
        it makes their ownership and lifetime predictable, reducing allocation
        overhead and making the access pattern easier to optimize.
      </p>

      {/* SIMD */}
      <h2 id="VectorizationSIMD" className="mt-5 mb-3">
        Vectorization & SIMD
      </h2>

      <p>
        Once the data is laid out efficiently, the next opportunity is the
        computation itself. PCNs repeatedly perform the same numerical
        operations across many elements, which makes them a natural target for
        vectorized linear algebra.
      </p>

      <p>
        Rather than writing the batch as a series of independent scalar
        operations, Deepity can represent the data as dense arrays and hand
        large matrix operations to optimized numerical kernels such as{" "}
        <code>sgemm</code>.
      </p>

      <SIMDVisual />

      <p>
        Modern CPUs contain SIMD/vector registers that can operate on several
        numerical values as part of the same instruction. Optimized BLAS
        implementations go much further than simply “doing four things at once”:
        they carefully combine vectorization, cache blocking, register reuse,
        threading, and other low-level optimizations.
      </p>

      <div className="p-4 rounded-4 border border-secondary bg-dark my-4">
        <div className="row align-items-center g-4">
          <div className="col-md-4 text-center">
            <div className="text-secondary small mb-2">
              HIGH-LEVEL OPERATION
            </div>

            <div className="font-monospace fs-5">matrix × matrix</div>
          </div>

          <div className="col-md-4 text-center">
            <div className="text-secondary small mb-2">OPTIMIZED KERNEL</div>

            <div className="font-monospace fs-5 text-info">SGEMM</div>
          </div>

          <div className="col-md-4 text-center">
            <div className="text-secondary small mb-2">HARDWARE</div>

            <div className="font-monospace fs-5 text-success">SIMD + CACHE</div>
          </div>
        </div>
      </div>

      <p>
        The result is that the batch's independent states can participate in the
        same underlying numerical kernels, allowing the hardware to exploit the
        regularity of the workload.
      </p>

      {/* Gradient accumulation */}
      <h2 id="GradientAccumulation" className="mt-5 mb-3">
        Gradient Accumulation
      </h2>

      <p>
        The batch dimension becomes especially useful when learning. Every
        sample has its own state and therefore produces its own learning signal,
        but all samples ultimately contribute to the same shared parameters.
      </p>

      <GradientDiagram />

      <p>
        Instead of modifying the shared weights after every individual example,
        a batch can accumulate the contributions from all examples and apply a
        combined update. The exact reduction—sum, mean, weighting, or another
        rule—depends on the optimizer and implementation.
      </p>

      <div className="p-4 rounded-4 border border-warning bg-dark my-4">
        <div className="text-warning fw-semibold mb-2">Why aggregate?</div>

        <p className="small text-secondary mb-0">
          Individual examples can produce noisy or conflicting updates.
          Aggregating them gives the optimizer a broader view of the current
          batch before changing the shared parameters.
        </p>
      </div>

      {/* Putting it together */}
      <h2 className="mt-5 mb-3">Putting It All Together</h2>

      <p>
        Efficient PCN computation is therefore less about one clever
        optimization and more about making the entire pipeline cooperate with
        the hardware.
      </p>

      <div className="my-5 rounded-4 border border-secondary bg-dark overflow-hidden">
        <div className="p-3 p-md-4">
          <div className="row g-2 text-center">
            {[
              ["Batch", "independent samples"],
              ["Arena", "predictable memory"],
              ["SIMD", "parallel arithmetic"],
              ["Settle", "iterative state updates"],
              ["Aggregate", "shared learning signal"],
            ].map(([title, description], index) => (
              <div className="col-6 col-md" key={title}>
                <div className="p-3 h-100">
                  <div
                    className="rounded-circle border border-info mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{ width: 46, height: 46 }}
                  >
                    {index + 1}
                  </div>

                  <strong>{title}</strong>

                  <div className="small text-secondary mt-2">{description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 p-md-5 rounded-4 border border-info bg-dark my-5">
        <span className="badge bg-info text-dark mb-3">THE BIG PICTURE</span>

        <h3 className="mb-3">Stateful does not have to mean slow.</h3>

        <p className="text-secondary mb-4">
          A Predictive Coding Network has more state to manage than a
          feedforward network, but that state also has a highly regular
          structure. By organizing memory contiguously, using optimized
          numerical kernels, exploiting vector hardware, and aggregating
          learning signals across samples, Deepity can turn iterative inference
          into a workload the CPU is well equipped to execute.
        </p>

        <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 font-monospace">
          <span className="text-info">Batch</span>

          <span className="text-secondary">→</span>

          <span className="text-warning">Memory</span>

          <span className="text-secondary">→</span>

          <span className="text-primary">SIMD</span>

          <span className="text-secondary">→</span>

          <span className="text-success">Settling</span>

          <span className="text-secondary">→</span>

          <span className="text-info">Update</span>
        </div>
      </div>
    </TutorialLayout>
  );
}
