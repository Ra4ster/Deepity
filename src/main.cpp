#include <iostream>
#include <chrono>
#include "PCNLayer.h"
#include <cblas.h>

int main(void)
{
    std::unique_ptr<float[]> x = std::make_unique<float[]>(1000);
    for (int i = 0; i < 1000; i++)
        *(x.get() + i) = i + 1;


        Deep::PCLayer pc(1000, 100);

    // Warmup
    float dummy = 0.0f;
    cblas_sscal(1, 1.0f, &dummy, 1);
#pragma omp parallel
    {
    }

    auto start = std::chrono::high_resolution_clock::now();
    for (int i = 0; i < 10000; i++)
    {
        pc.RunPrediction(x.get());
    }
    auto end = std::chrono::high_resolution_clock::now();

    std::chrono::duration<double, std::milli> elapsed = end - start;
    std::cout << "Prediction time elapsed: " << elapsed.count() << " ms" << std::endl;

    std::cout << "Z after predicting: [" << pc.GetBeliefs()[0] << ", " << pc.GetBeliefs()[1] << "]" << std::endl;
    return 0;
}