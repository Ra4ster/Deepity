#include <iostream>
#include <chrono>
#include "PCNLayer.h"
#include <cblas.h>
#include <random>

int main(void)
{
    Deep::PCLayer pc(1000, 100);
    
    // Random inputs instead of identical sequential values
    std::mt19937 rng(42);
    std::uniform_real_distribution<float> dist(-1.0f, 1.0f);
    std::unique_ptr<float[]> x = std::make_unique<float[]>(pc.GetInputSize());
    for (size_t i = 0; i < pc.GetInputSize(); i++)
        x.get()[i] = dist(rng);

    // Warmup — run a few iterations before timing
    for (int i = 0; i < 100; i++)
        pc.RunPrediction(x.get());
    pc.Flush();

    // Multiple timed runs
    const int RUNS = 5;
    const int ITERS = 10000;
    double times[RUNS];

    for (int r = 0; r < RUNS; r++) {
        auto start = std::chrono::high_resolution_clock::now();
        for (int i = 0; i < ITERS; i++)
            pc.RunPrediction(x.get());
        pc.Flush();
        auto end = std::chrono::high_resolution_clock::now();
        times[r] = std::chrono::duration<double, std::milli>(end - start).count();
    }

    double sum = 0;
    double minT = times[0], maxT = times[0];
    for (int r = 0; r < RUNS; r++) {
        sum += times[r];
        minT = std::min(minT, times[r]);
        maxT = std::max(maxT, times[r]);
    }
    std::cout << "Avg: " << sum / RUNS << " ms  "
              << "Min: " << minT << " ms  "
              << "Max: " << maxT << " ms" << std::endl;
    return 0;
}