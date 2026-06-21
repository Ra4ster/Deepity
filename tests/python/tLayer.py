import deepity as deep
import numpy as np
import time
from tEquivalent import PCLayerNaive

pc = deep.PCLayer(1000, 100)
pcNaive = PCLayerNaive(1000, 100)

rng = np.random.default_rng(42)

RUNS = 5
ITERS = 10000
input_dim = pc.get_input_size()

print(f"Generating mock dataset of {ITERS} distinct inputs...")
large_dataset = rng.uniform(-1.0, 1.0, (ITERS, input_dim)).astype(np.float32)

print("Running warmup iterations...")
for i in range(256):
    pc.run_prediction(large_dataset[i % ITERS])
pc.flush()

print(f"Running {ITERS} inputs over {RUNS} runs.")
times1 = []
for r in range(RUNS):
    start = time.perf_counter()
    for i in range(ITERS):
        pc.run_prediction(large_dataset[i])
    pc.flush()
    end = time.perf_counter()
    times1.append((end - start) * 1000)

times2 = []
for r in range(RUNS):
    start = time.perf_counter()
    for i in range(ITERS):
        pcNaive.run_prediction(large_dataset[i])
    end = time.perf_counter()
    times2.append((end - start) * 1000)

print("\n================= RESULTS =================")
print("1. Naive Predictive Coding in NumPy:\n")
print(f"Avg: {sum(times2) / RUNS:.3f} ms  Min: {min(times2):.3f} ms  Max: {max(times2):.3f} ms")
print("2. Predictive Coding in Deepity:\n")
print(f"Avg: {sum(times1) / RUNS:.3f} ms  Min: {min(times1):.3f} ms  Max: {max(times1):.3f} ms")