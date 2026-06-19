#pragma once
#include <cstddef>
#include <memory>

/**
 * @file PCNLayer.h
 * @brief Defines the single-layer implementation of a PC model.
 * 
 * This header includes implementations of inference steps, inference updates, learning, and prediction.
 * 
 * Usage:
 *  #include <PCNLayer.h>
 *  using namespace Deep;
 * 
 * Example:
 *  PCLayer layer(2, 3);
 *  layer.RunPrediction({ 0.1f, 0.75f });
 * 
 * @note All members are stored as unique pointers except for the input itself.
 * @version 1.0
 * @date 2026-06-18
 * @author Jack Rose
 */

namespace Deep
{
    class PCLayer
    {
    public:
        PCLayer(size_t inSize, size_t outSize, float lr = 1e-6, float ir = 1e-6, int stepSize = 30); // default
        ~PCLayer() = default; // destructor

        /// @brief Calculates prediction and returns it.
        /// @return prediction
        void CalcPrediction() noexcept;
        /// @brief Gets error; note, prediction must be ran before this.
        /// @attention x must be set
        void CalcStepError(const float *x) noexcept;
        /// @brief Updates z, one inference step
        void UpdateBeliefs() noexcept;
        /// @brief Runs an inference loop, (learns z)
        /// @param x Input
        void RunPrediction(const float *x) noexcept;
        /// @brief Updates weights using the learning rule `W += lr * e * x^T`
        /// @attention This assumes error has already been calculated
        /// @param x Inputs to learn
        void UpdateWeights(const float *x) noexcept;

        // @internal GETTERS
        float *GetPrediction() const noexcept { return p.get(); }
        float *GetInferenceError() const noexcept { return err.get(); }
        float *GetBeliefs() const noexcept { return z.get(); }
        float *GetWeights() const noexcept { return W.get(); }
        float GetLR() const noexcept { return lr; }
        float GetIR() const noexcept { return ir; }
        size_t GetInputSize() const noexcept { return inputSize; }
        size_t GetOutputSize() const noexcept { return outputSize; }

    private:
        // @internal SIZES
        size_t inputSize = 0;
        size_t outputSize = 0;

        // @internal PARAMS
        float lr = 0.0f; // learning rate
        float ir = 0.0f; // inference rate
        int stepSize = -1; // Inference steps (TODO: May become optimized!!)

        // @internal MEMBERS
        std::unique_ptr<float[]> W; // Weights
        std::unique_ptr<float[]> z; // Belief
        std::unique_ptr<float[]> err; // x - p
        std::unique_ptr<float[]> p; // Wz
    };
}