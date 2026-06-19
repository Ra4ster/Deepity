# ![Deepity](resources/Deepity.png)

A PC model library that can run CPU (*and WIP: CUDA*) optimized inference and updating with extremely low variance and speed.

![cpu_metric](resources/LayerCPUMetrics.png)

### Single layer Informatics:

1. Batch size does help.

| Batch Size | Time (ms) |
| ---------- | --------- |
| 1 (None)   | 4484      |
| 16         | 3149      |
| 32         | 2634      |
| 64         | 2338      |
| 128        | 2263      |
| **256**    | **2233**  |
| 512        | 2265      |

2. OpenRAND versus mt19937; essentially equal.

- **OpenRAND**: 4712 ms.
- **mt19937**: 4482 ms.
(~5% difference)

3. Contiguous versus separate heap allocation:

This was a measurement of separate vectors allocated to the heap (W, z, err, p) versus a single vector "arr" containing all.

- **Separate**: 4481ms
- **Contiguous**: 4484ms
(Near 0 difference)