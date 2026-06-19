#include "PCNLayer.h"
#include <cblas.h>
#include <iostream>
#include <algorithm>
#include <cassert>
#include <openrand/tyche.h>
#include <omp.h>

#include "Optimize.h"

using namespace Deep;
using RNG = openrand::Tyche;
uint64_t base_seed = 12345; // <- Consider changing

/**
 * Implementation Notes: 
 * The sizes are of the following and in the following order:
 * - W is outSize * inSize
 * - z is outSize
 * - p is inSize
 * - err is inSize
 */

PCLayer::PCLayer(size_t inSize, size_t outSize, float lr, float ir, int stepSize)
    : inputSize(inSize), outputSize(outSize), lr(lr), ir(ir), stepSize(stepSize)
{
    B = GetBatchSize();
    #ifdef _DEBUG
    std::cout << "[Deepity] Initialized layer with batch size " << B << std::endl;
    #endif
    zBegin   = outSize * inSize;
    pBegin   = zBegin + B * outputSize;   // Z is [B × outSize]
    errBegin = pBegin + B * inputSize;    // P is [B × inSize]
    totalSize = errBegin + B * inputSize;

    this->arr = std::make_unique<float[]>(totalSize);
    this->inputBuffer = std::make_unique<float[]>(B * inputSize);

#pragma omp parallel
    {
        uint64_t thread_seed = base_seed + (uint64_t)omp_get_thread_num();
        RNG rng(thread_seed, 0);

#pragma omp for
        for (size_t i = 0; i < pBegin; i++) {
            arr.get()[i] = rng.rand<float>() * 0.02f - 0.01f;
        }
    }
}

void PCLayer::CalcPrediction() noexcept
{
cblas_sgemm(
    CblasRowMajor, CblasNoTrans, CblasTrans,
    B,          // M = batch size
    inputSize,  // N = output cols
    outputSize, // K = inner dim
    1.0f,
    arr.get() + zBegin, outputSize,   // Z is [B × outSize]
    arr.get(), outputSize,   // W is [inSize × outSize], transposed
    0.0f,
    arr.get() + pBegin, inputSize);
}

void PCLayer::CalcStepError(const float *x) noexcept
{
    assert(x != nullptr && "Cannot calculate error if x is null!");
    cblas_scopy(B * inputSize, x, 1, arr.get() + errBegin, 1); // E = X
    cblas_saxpy(B * inputSize, -1.0f,
        arr.get() + pBegin, 1,
        arr.get() + errBegin, 1); 
}

void PCLayer::UpdateBeliefs() noexcept
{
    cblas_sgemm(
        CblasRowMajor, CblasNoTrans, CblasNoTrans,
        B,          // M = batch size
        outputSize, // N
        inputSize,  // K
        ir,
        arr.get() + errBegin, inputSize,    // E is [B × inSize]
        arr.get(), outputSize,   // W is [inSize × outSize]
        1.0f,
        arr.get() + zBegin, outputSize); 
}

void PCLayer::RunBatchedPrediction(const float *x) noexcept
{
    for (int i = 0; i < stepSize; i++)
    {
        CalcPrediction();
        CalcStepError(x);
        UpdateBeliefs();
    }
    UpdateWeights(x);
}

void PCLayer::RunPrediction(const float *x) noexcept
{
    size_t slot = pendingCount * inputSize;
    cblas_scopy(inputSize, x, 1, inputBuffer.get() + slot, 1);
    pendingCount++;

    if (pendingCount == B) {
        RunBatchedPrediction(inputBuffer.get());
        pendingCount = 0;
    }
}

void PCLayer::Flush() noexcept
{
    if (pendingCount > 0) {
        RunBatchedPrediction(inputBuffer.get()); // partial batch
        pendingCount = 0;
    }
}

void PCLayer::UpdateWeights(const float *x) noexcept
{
    (void)x; // Suppress unused for now

    cblas_sgemm(
    CblasRowMajor, CblasTrans, CblasNoTrans,
    inputSize,  // M
    outputSize, // N
    B,          // K = batch size
    lr,
    arr.get() + errBegin, inputSize,
    arr.get() + zBegin, outputSize,
    1.0f,
    arr.get(), outputSize);
}