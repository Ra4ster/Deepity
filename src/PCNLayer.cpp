#include "PCNLayer.h"
#include <cblas.h>
#include <iostream>
#include <algorithm>
#include <cassert>
#include <openrand/tyche.h>
#include <omp.h>

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
    size_t totalSize = outSize * inSize;

    this->W = std::make_unique<float[]>(totalSize + outSize + inSize + inSize);
    this->z = std::make_unique<float[]>(outSize);

#pragma omp parallel
    {
        uint64_t thread_seed = base_seed + (uint64_t)omp_get_thread_num();
        RNG rng(thread_seed, 0);

#pragma omp for
        for (size_t i = 0; i < totalSize; i++) {
            W.get()[i] = rng.rand<float>() * 0.02f - 0.01f;
        }
#pragma omp for
        for (size_t i=0; i < outSize; i++) {
            z.get()[i] = rng.rand<float>() * 0.02f - 0.01f;
        }
    }
    this->p = std::make_unique<float[]>(inSize);
    this->err = std::make_unique<float[]>(inSize);
}

void PCLayer::CalcPrediction() noexcept
{
    cblas_sgemv( // p = Wz
        CblasRowMajor,
        CblasNoTrans,
        inputSize,
        outputSize,
        1.0f,
        W.get(),
        outputSize,
        z.get(),
        1,
        0.0f,
        p.get(),
        1);
}

void PCLayer::CalcStepError(const float *x) noexcept
{
    assert(x != nullptr && "Cannot calculate error if x is null!");
    cblas_scopy(inputSize, x, 1, err.get(), 1); // err = x
    cblas_saxpy(                                // err -= p
        inputSize,
        -1.0f,
        p.get(), 1,
        err.get(), 1);
}

void PCLayer::UpdateBeliefs() noexcept
{
    cblas_sgemv(        // z = ir * (W^T * err) + 1.0 * z
        CblasRowMajor,
        CblasTrans,
        inputSize,      // M = physical rows of W
        outputSize,     // N = physical cols of W
        ir,             // alpha = ir  (replaces sscal)
        W.get(),
        outputSize,     // lda
        err.get(), 1,
        1.0f,           // beta = 1.0  (replaces saxpy, accumulates into z)
        z.get(), 1);
}

void PCLayer::RunPrediction(const float *x) noexcept
{
#ifdef _DEBUG
    std::cout << "[PCN] Now running inference on " << stepSize << " steps." << std::endl;
#endif

    for (int i = 0; i < stepSize; i++)
    {
        CalcPrediction();
        CalcStepError(x);
        UpdateBeliefs();
    }
    UpdateWeights(x);
}

void PCLayer::UpdateWeights(const float *x) noexcept
{
    (void)x; // Suppress unused for now

    cblas_sger( // W += lr * e * x^T
        CblasRowMajor,
        inputSize,
        outputSize,
        lr,
        err.get(), 1,
        z.get(), 1,
        W.get(), outputSize);
}