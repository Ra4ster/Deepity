#include "PCNNetwork.h"
#include <iostream>
#include <vector>
#include <random>

int main(void)
{
    std::cout << "[Deepity] Booting...\n";

    Deep::PCNetwork net;

    net.AddLayer(784, 256, 1e-4f, 1e-4f, 30);
    net.AddLayer(256, 64, 1e-4f, 1e-4f, 30);
    net.AddLayer(64, 10, 1e-4f, 1e-4f, 30);

    net.Compile();

    std::mt19937 rng(42);
    std::uniform_real_distribution<float> dist(-1.0f, 1.0f);

    std::vector<float> input_sample(784);
    std::vector<float> target_sample(10, 0.0f);
    target_sample[3] = 1.0f; // one-hot encoding

    for (auto &val : input_sample) {
        val = dist(rng);
    }

    const int TEST_ITERATIONS = 150;
    std::cout << "[Deepity] Running " << TEST_ITERATIONS << " train steps." << std::endl;

    for (int i=0; i < TEST_ITERATIONS; i++) {
        input_sample[0] = dist(rng);

        net.TrainStep(input_sample.data(), target_sample.data());
    }

    std::cout << "[Deepity] Flushing partial batches.\n";
    net.Flush();

    std::cout << "[Deepity] Final network energy: " << net.GetTotalEnergy() << std::endl;

    #ifdef _DEBUG
    net.DebugStats();
    #endif

    return 0;
}