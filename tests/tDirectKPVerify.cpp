#include <deepity/networks/DirectKPPCNetwork.h>
#include <cstdio>
#include <cmath>
#include <random>

using namespace Deep;

namespace
{
    void SettleNetwork(DirectKPPCNetwork &net, const std::vector<float> &x,
                       const std::vector<float> &y, int steps)
    {
        net.ResetState();
        net.Clamp(x);
        net.ProjectForward();
        net.GetTerminalLayer()->ClampState(y);

        for (int t = 0; t < steps; ++t)
            net.Step();
    }

    float TotalEnergy(DirectKPPCNetwork &net)
    {
        float e = 0.0f;
        for (auto &layer : net.GetLayers())
            e += layer->CalculateState();
        return e;
    }
}

int main()
{
    const int batchSize = 1;
    const size_t terminalSize = 2;
    const float eps = 3e-3;
    const float tolerance = 1e-2f;

    DirectKPPCNetwork net(batchSize);
    net.AddLayer(3, 3, terminalSize, 0.0f, 0.08f, 0.0f, 0.0f,
                 ActivationType::SIGMOID, ActivationType::dSIGMOID);
    net.AddLayer(3, (size_t)terminalSize, terminalSize, 1.0f, 0.08f, 0.0f, 0.0f,
                 ActivationType::LINEAR, ActivationType::dLINEAR);
    net.AddLayer(terminalSize, 0, terminalSize, 0.0f, 0.08f, 0.0f, 0.0f,
                 ActivationType::LINEAR, ActivationType::dLINEAR);
    net.Compile();

    std::mt19937 rng(42);
    net.RandomizeWeights(rng);

    net.SetOptimizer(OptimizerType::SGD);
    net.SetLearningRate(1.0f); // strips scaling -- see file header

    std::vector<float> x = {0.2f, -0.5f, 0.8f, 0.1f};
    std::vector<float> y = {1.0f, -1.0f};

    DirectKPPCLayer *testLayer = net.GetLayers()[1].get();
    float *W = const_cast<float *>(testLayer->GetWeights());
    const size_t testIdx = 0; // check W[0] specifically

    SettleNetwork(net, x, y, /*steps=*/5);

    float wOriginal = W[testIdx];

    // Perturb W only
    W[testIdx] = wOriginal + eps;
    float energyPlus = TotalEnergy(net);

    W[testIdx] = wOriginal - eps;
    float energyMinus = TotalEnergy(net);

    W[testIdx] = wOriginal;

    printf("Baseline energy: %.6f, energyPlus: %.6f, energyMinus: %.6f\n",
           TotalEnergy(net), energyPlus, energyMinus);

    float numericalGrad = (energyPlus - energyMinus) / (2.0f * eps);

    SettleNetwork(net, x, y, /*steps=*/5);
    TotalEnergy(net);

    float wBefore = W[testIdx];
    testLayer->UpdateWeights();
    float wAfter = W[testIdx];

    float impliedGrad = -(wAfter - wBefore);

    printf("Numerical dE/dW[%zu]:  % .6f\n", testIdx, numericalGrad);
    printf("Analytical dE/dW[%zu]: % .6f\n", testIdx, impliedGrad);

    float diff = std::fabs(numericalGrad - impliedGrad);
    float relDenom = std::fabs(numericalGrad) + 1e-6f;
    float relError = diff / relDenom;

    printf("Absolute difference: %.6f, relative error: %.6f\n", diff, relError);

    if (relError > tolerance)
    {
        printf("FAILED: gradient mismatch exceeds tolerance (%.4f)\n", tolerance);
        return 1;
    }

    printf("PASSED\n");
    return 0;
}