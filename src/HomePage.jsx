import { Link } from "react-router-dom";
import Arrow from "./components/arrow";
import Photo from "/flowerpot.jpg";
import BenchmarkChart from "./components/BenchmarkChart";

export default function HomePage() {
  return (
    <div className="background-[#e4e6e7]">
      <div
        className="min-h-screen flex flex-col items-center justify-center AllianceNo1 gap-4 text-center border-b border-[#202d3b]-200 backdrop-blur-md"
        style={{
          backgroundImage: `url(${Photo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <span className="text-4xl AllianceNo1">Welcome to Deepity</span>
        <span className="text-lg AllianceNo1">
          A high-performance implementation of Predictive Coding Networks
          <br /> in C++ and Python.
        </span>
        <Link
          to="/docs"
          className="group flex items-center gap-4 border border-black px-5 py-3 mt-3 text-base text-black font-bold no-underline transition-colors duration-300 hover:bg-black hover:text-white hover:scale-105"
        >
          Get Started
          <Arrow />
        </Link>
      </div>
      <section className="min-h-screen bg-[#e6e8e9] border-b border-[#202d3b]-200 px-8 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl AllianceNo1">Fast-Running</h2>

          <p className="mt-3 max-w-2xl text-base text-black/70">
            Deepity's DKPPCN reaches 97.73% test accuracy on MNIST, approaching
            PyTorch's feedforward backprop accuracy while training entirely on
            the CPU.
          </p>
          <BenchmarkChart />
        </div>
      </section>
      <section className="min-h-screen bg-[#e4e6e7] px-8 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-3xl AllianceNo1">Easy-to-Use</h2>

          <p className="mt-3 max-w-2xl text-base text-black/70">
            Deepity is designed to be easy to use, with a simple API and
            extensive documentation. It is also easy to install, with a single
            command.
          </p>
        </div>
      </section>
      <section className="min-h-screen bg-[#e6e8e9] px-8 py-20"></section>
    </div>
  );
}
