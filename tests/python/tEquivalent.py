import numpy as np

class PCLayerNaive:
    def __init__(self, in_size, out_size, lr=1e-4, ir=1e-4, step_size=30):
        self.in_size = in_size
        self.out_size = out_size
        self.lr = lr
        self.ir = ir
        self.step_size = step_size

        self.W = np.random.uniform(-0.01, 0.01, (in_size, out_size)).astype(np.float32)
        self.z = np.zeros(out_size, dtype=np.float32)
        self.p = np.zeros(in_size, dtype=np.float32)
        self.err = np.zeros(in_size, dtype=np.float32)

    def _relu(self, x):
        return np.maximum(0, x)

    def _calc_prediction(self):
        self.p = self.z @ self.W.T

    def _calc_error(self, x):
        self.err = x - self.p

    def _update_beliefs(self):
        self.z = self._relu(self.z + self.ir * (self.err @ self.W))

    def _update_weights(self):
        self.W += self.lr * np.outer(self.err, self.z)

    def run_prediction(self, x):
        for _ in range(self.step_size):
            self._calc_prediction()
            self._calc_error(x)
            self._update_beliefs()
        self._update_weights()

