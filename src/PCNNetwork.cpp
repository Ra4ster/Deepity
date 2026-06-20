#include "PCNNetwork.h"
#include <cassert>
#include <cblas.h>
#include <iostream>
#include <new>
#include <cstdio>

using namespace Deep;

PCNetwork::~PCNetwork() 
    {
        if (masterArena != nullptr) {
            ::operator delete[](masterArena, std::align_val_t{64});
            masterArena = nullptr;
        }
    }

void PCNetwork::Compile() noexcept
{
    arenaSize = 0;
    for (const auto &layer : layers)
    {
        arenaSize += layer.GetTotalSize();
    }

    masterArena = new (std::align_val_t{64}) float[arenaSize];

    size_t currentOffset = 0;
    for (auto &layer : layers)
    {
        layer.Attach(masterArena + currentOffset);
        currentOffset += layer.GetTotalSize();
    }

#ifdef _DEBUG
    std::cout << "[Deepity] Network Compiled. Total Memory Arena: "
              << (arenaSize * sizeof(float)) / 1024.0 / 1024.0 << " MB\n";
#endif
}

void PCNetwork::TrainStep(float *x, float *target) 
{
    (void)target; // TODO

    if (layers.empty()) return;

    // Feed the input directly to the bottom layer
    if (x != nullptr) {
        layers.front().RunPrediction(x);
    }
    
    // TODO: eventually want a PCLayer::SetTarget(float* t) 
    // method that directly maps to the 'err' or 'p' boundaries of the top layer

    // Track the batch to cascade data upwards
    pendingCount++;
    
    if (pendingCount == layers.front().GetBatchSize()) {
        // Cascade the beliefs (Z) upwards layer by layer.
        for (size_t l = 0; l < layers.size() - 1; ++l) {
            
            if (l + 1 >= layers.size()) break; 

            float* z_out = layers[l].GetBeliefs();
            size_t out_dim = layers[l].GetOutputSize();
            size_t B = layers[l].GetBatchSize();
            
            for (size_t b = 0; b < B; ++b) {
                layers[l + 1].RunPrediction(z_out + (b * out_dim));
            }
        }
        pendingCount = 0; // Reset for the next batch
    }
}

void PCNetwork::RunPrediction(float *x, float *target)
{
    TrainStep(x, target);
}

void PCNetwork::Flush()
{
    if (layers.empty() || pendingCount == 0)
        return;

    layers.front().Flush();

    // Cascade the partial batch upwards
    for (size_t l = 0; l < layers.size() - 1; ++l)
    {
        float *z_out = layers[l].GetBeliefs();
        size_t out_dim = layers[l].GetOutputSize();

        for (size_t b = 0; b < pendingCount; ++b)
        {
            layers[l + 1].RunPrediction(z_out + (b * out_dim));
        }
        // Flush the next layer immediately after feeding it the partial batch
        layers[l + 1].Flush();
    }

    pendingCount = 0;
}

float PCNetwork::GetTotalEnergy() const noexcept
{
    float totalEnergy = 0.0f;

    for (const auto &layer : layers)
    {
        const float *err = layer.GetInferenceError();

        int total_elements = static_cast<int>(layer.GetBatchSize() * layer.GetInputSize());
        totalEnergy += cblas_sdot(total_elements, err, 1, err, 1); // err^2
    }

    return 0.5f * totalEnergy;
}

void PCNetwork::SaveModel(const char *path) const noexcept
{
    assert(path && "Cannot save uncompiled network!");

    FILE *fp = fopen(path, "wb");
    assert(fp && "Failed to open file for saving model.");

    fwrite(masterArena, sizeof(float), arenaSize, fp);

    fclose(fp);
}

void PCNetwork::LoadModel(const char *path) noexcept
{
    FILE *fp = fopen(path, "rb");
    assert(fp && "Failed to open file for loading model.");

    fread(masterArena, sizeof(float), arenaSize, fp);
    fclose(fp);
}

#ifdef _DEBUG
void PCNetwork::DebugStats()
{
    std::cout << "\n======================================================================================\n";
    std::cout << "                           DEEPITY NETWORK HEALTH REPORT                              \n";
    std::cout << "======================================================================================\n";

    if (layers.empty() || masterArena == nullptr)
    {
        std::cout << "[ERROR] Network is uncompiled or empty!\n";
        return;
    }

    std::cout << "Total Layers   : " << layers.size() << '\n';
    std::cout << "Memory Arena   : " << (arenaSize * sizeof(float)) / 1024.0 / 1024.0 << " MB (64-byte Aligned)\n";
    std::cout << "Global Energy  : " << GetTotalEnergy() << '\n';

    for (size_t i = 0; i < layers.size(); ++i)
    {
        layers[i].DebugStats(static_cast<int>(i));
    }
    std::cout << "======================================================================================\n\n";
}

#endif