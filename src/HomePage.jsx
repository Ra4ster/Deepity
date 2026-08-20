import CppLogo from "./assets/cpp.png";
import PythonLogo from "./assets/python.png";
import JavaLogo from "./assets/java.png";
import GitHubLogo from "./assets/github.svg";

import PerformanceCard from "./components/PerformanceCard";
import FeatureCarousel from "./components/FeatureCarousel";
import MNIST from "./components/MNIST";
import CodeShowcase from "./components/CodeShowcase";
import BuildCard from "./components/BuildCard";
import Footer1 from "./components/Footer1";
import EnergyBackground from "./components/EnergyBackground";

function HomePage() {
  return (
    <div className="min-vh-100 bg position-relative">
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Hero Section */}
        <div className="container-fluid px-3 px-md-5 py-5">
          <div className="row w-100 align-items-center mx-0">
            {/* Left Column: Heading, Description, and Buttons */}
            <div className="col-lg-7 mb-5 mb-lg-0">
              <h1 className="text-white fw-bold hero-title">
                Predictive Coding <br />
                Networks.
                <br className="d-block d-xl-none" />
                <span className="magic-text"> Optimized.</span>
              </h1>

              <p className="text-white Roboto fw-light fs-5 hero-description">
                Deepity is a high-performance library for Predictive Coding
                Networks with custom SIMD kernels, batched evaluation, and
                intuitive APIs. Built for speed. Designed for accuracy.
              </p>

              {/* Language / Platform Buttons */}
              <div className="d-flex flex-wrap align-items-center pt-2 gap-2">
                <button
                  className="btn border border-secondary text-white d-flex align-items-center justify-content-center p-2 touch-button"
                  style={{ transition: "none", cursor: "default" }}
                >
                  <img
                    src={PythonLogo}
                    height="20"
                    alt="Python"
                    className="me-2"
                  />
                  Python
                </button>

                <button
                  className="btn border border-secondary text-white d-flex align-items-center justify-content-center p-2 touch-button"
                  style={{ transition: "none", cursor: "default" }}
                >
                  <img src={CppLogo} height="20" alt="C++" className="me-2" />
                  C++
                </button>

                <button
                  className="btn border border-secondary text-white d-flex align-items-center justify-content-center p-2 touch-button"
                  style={{ transition: "none", cursor: "default" }}
                >
                  <img src={JavaLogo} height="20" alt="Java" className="me-1" />
                  Java
                  <span className="ms-2 badge bg-black fw-light">WIP</span>
                </button>
              </div>

              {/* CTA Buttons */}
              <div className="d-flex flex-column flex-sm-row align-items-stretch align-items-sm-center mt-4 gap-2 AllianceNo1">
                <a
                  className="btn btn-primary d-flex align-items-center justify-content-center touch-button"
                  href="#GetStarted"
                >
                  Get Started
                  <svg
                    width="18"
                    height="18"
                    className="ms-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>

                <a
                  href="https://github.com/ra4ster/deepity/"
                  className="btn btn-outline-secondary text-light d-flex align-items-center justify-content-center text-decoration-none touch-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                  <img
                    src={GitHubLogo}
                    width="20"
                    height="20"
                    className="ms-2"
                    alt="GitHub"
                  />
                </a>
              </div>
            </div>

            {/* Right Column: Performance Card */}
            <div className="col-lg-5">
              <PerformanceCard />
            </div>
          </div>
        </div>

        {/* Feature Carousel */}
        <FeatureCarousel />

        {/* MNIST Section */}
        <h1 className="text-center text-white fs-3 mt-4">
          Benchmarked on MNIST
        </h1>

        <h2
          className="text-center text-light Roboto"
          style={{ fontWeight: 150, fontSize: 15 }}
        >
          Higher accuracy in less time.
        </h2>

        <MNIST />

        {/* API Section */}
        <h1 className="text-center text-white fs-3 mt-4">
          Intuitive APIs. Maximum Performance.
        </h1>

        <CodeShowcase />

        {/* Build Section */}
        <BuildCard />

        {/* Footer */}
        <Footer1 />
      </div>
    </div>
  );
}

export default HomePage;
