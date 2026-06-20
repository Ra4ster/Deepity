#include <iostream>
#include <chrono>
#include "PCNLayer.h"
#include <random>
#include <vector>
#include <memory>
#include <algorithm>

int main(void)
{
    Deep::PCLayer pc(1000, 100); // uses stepSize=30, f() = relu, and ir=lr=1e-6 by default
    
    std::mt19937 rng(42);
    std::uniform_real_distribution<float> dist(-1.0f, 1.0f);

    const int RUNS = 5;
    const size_t ITERS = 10000;
    size_t inputDim = pc.GetInputSize();

    // Generate a large, distinct streaming dataset in a contiguous block
    // This forces the CPU to constantly pull fresh input elements from RAM.
    std::cout << "Generating mock dataset of " << ITERS << " distinct inputs..." << std::endl;
    std::vector<float> large_dataset(ITERS * inputDim);
    for (size_t i = 0; i < large_dataset.size(); i++) {
        large_dataset[i] = dist(rng);
    }

    // Warmup
    std::cout << "Running warmup iterations..." << std::endl;
    for (size_t i = 0; i < 256; i++) {
        float* warmup_ptr = large_dataset.data() + ((i * inputDim) % large_dataset.size());
        pc.RunPrediction(warmup_ptr);
    }
    pc.Flush();

    // Multiple timed production runs
    std::cout << "Running " << ITERS << " inputs over " << RUNS << " runs." << std::endl;
    double times[RUNS];

    for (int r = 0; r < RUNS; r++) {
        auto start = std::chrono::high_resolution_clock::now();
        for (size_t i = 0; i < ITERS; i++) {
            float* current_input = large_dataset.data() + (i * inputDim);
            pc.RunPrediction(current_input);
        }
        pc.Flush();
        
        auto end = std::chrono::high_resolution_clock::now();
        times[r] = std::chrono::duration<double, std::milli>(end - start).count();
    }

    #ifdef _DEBUG
    pc.DebugStats();
    #endif

    double sum = 0;
    double minT = times[0], maxT = times[0];
    for (int r = 0; r < RUNS; r++) {
        sum += times[r];
        minT = std::min(minT, times[r]);
        maxT = std::max(maxT, times[r]);
    }

    std::cout << "\n================= RESULTS =================\n";
    std::cout << "Avg: " << sum / RUNS << " ms  "
              << "Min: " << minT << " ms  "
              << "Max: " << maxT << " ms" << std::endl;
              
    return 0;
}