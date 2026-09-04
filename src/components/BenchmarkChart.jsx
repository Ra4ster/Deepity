import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const dkpAcc = [
  89.36, 93.44, 94.16, 94.48, 95.44, 96.52, 96.4, 96.56, 96.84, 97.52, 97.68,
  97.32, 97.72, 97.76, 97.96, 97.8, 98.44, 98.32, 97.8, 98.8, 98.8, 98.44,
  98.64, 98.68, 98.32, 98.32, 98.64, 99.04, 98.8, 99.16, 98.96, 99.24, 99.28,
  99.12, 98.96, 99.2, 99.4, 99.04, 99.32, 99.36, 98.72, 99.32, 98.96, 99.24,
  99.28, 99.36, 99.2, 99.12, 99.36, 99.48,
];

const ngcAcc = [
  26.91, 42.96, 60.12, 75.2, 84.68, 89.52, 91.9, 93.45, 94.3, 94.8, 95.13,
  95.38, 95.63, 95.74, 95.95,
];

const data = Array.from({ length: 50 }, (_, i) => ({
  epoch: i + 1,
  dkp: dkpAcc[i],
  ngc: ngcAcc[i] ?? null,
}));

export default function BenchmarkChart() {
  return (
    <div className="w-full border-b-black/20">
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 20, bottom: 15 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="epoch"
            label={{
              value: "Epoch",
              position: "insideBottom",
              offset: -10,
            }}
          />

          <YAxis
            domain={[85, 100]}
            label={{
              value: "Accuracy (%)",
              angle: -90,
              position: "insideLeft",
              offset: -10,
            }}
          />

          <Tooltip />

          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ paddingBottom: "20px" }}
          />

          <Line
            type="monotone"
            dataKey="dkp"
            name="DKPPCN"
            stroke="#111"
            strokeWidth={3}
            dot={false}
          />

          <Line
            type="monotone"
            dataKey="ngc"
            name="NGC"
            stroke="#777"
            strokeWidth={2}
            strokeDasharray="6 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-8 grid grid-cols-2 gap-8 border-t border-black/20 pt-6 text-center">
        <div>
          <div className="text-3xl font-bold">97.73%</div>

          <div className="mt-1 text-sm text-black/60">DKPPCN test accuracy</div>
        </div>

        <div>
          <div className="text-3xl font-bold">98.27%</div>

          <div className="mt-1 text-sm text-black/60">
            PyTorch backprop test accuracy
          </div>
        </div>
      </div>
    </div>
  );
}
