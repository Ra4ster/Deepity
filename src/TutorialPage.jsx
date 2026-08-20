import { useState } from "react";
import Footer1 from "./components/Footer1";
import {
  BicepsFlexed,
  Check,
  ChevronRight,
  Code2,
  Download,
  Zap,
} from "lucide-react";
import GithubIcon from "./assets/github.svg";

import FeaturedTutorial from "./components/FeaturedTutorial";
import PreviewTutorial from "./components/PreviewTutorial";
import TutorialNavCard from "./components/TutorialNavCard";
import FluidCard from "./components/FluidCard";
import { Link } from "react-router-dom";

export default function TutorialPage({ language = "python" }) {
  const menuItems = [
    "Featured Tutorial",
    "Getting Started",
    "Core Concepts",
    "Advanced",
    "Ecosystem",
    "Need Help?",
  ];

  const menuItemIds = {
    "Featured Tutorial": "FeaturedTutorial",
    "Getting Started": "GettingStarted",
    "Core Concepts": "CoreConcepts",
    Advanced: "Advanced",
    Ecosystem: "Ecosystem",
    "Need Help?": "NeedHelp",
  };

  const nextUpLinks = [
    { label: "Training on MNIST", href: "/Deepity/benchmarks" },
    { label: "Advanced Training Techniques", href: "/Deepity/benchmarks" },
    { label: "Performance Tuning Guide", href: "/Deepity/benchmarks" },
  ];

  const [activeItem, setActiveItem] = useState(menuItems[0]);
  const activeIndex = menuItems.indexOf(activeItem);

  const [hoveredLink, setHoveredLink] = useState(null);

  return (
    <>
      <div className="container-fluid my-4">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 7fr 2fr",
            columnGap: "1.5rem",
            rowGap: "1rem",
          }}
        >
          {/* Left Column */}
          <div style={{ gridColumn: "1", gridRow: "1 / 3" }}>
            <TutorialNavCard language={language} />
            <div className="card rounded border-secondary bg-dark bg-opacity-75 mt-4">
              <div className="card-body text-light">
                <p className="roboto" style={{ fontWeight: 400, fontSize: 20 }}>
                  Something else?
                </p>
                <span
                  className="roboto"
                  style={{ fontWeight: 300, fontSize: 15 }}
                >
                  Join our community on Discord or open an issue on GitHub.
                </span>
                <div className="d-grid gap-2 mt-5">
                  <a
                    className="btn btn-outline-secondary text-light align-items-center"
                    href="https://discord.gg/5vDvFDeSrV"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-discord me-2"
                      viewBox="0 0 16 16"
                    >
                      <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
                    </svg>
                    Join Discord
                  </a>
                  <a
                    className="btn btn-outline-secondary text-light align-items-center"
                    href="https://github.com/ra4ster/deepity/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={GithubIcon} width="16" className="me-2" />
                    GitHub Issues
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Center Column */}
          <div style={{ gridColumn: "2", gridRow: "1" }}>
            <div className="px-3">
              <h1 className="text-white fw-bold hero-title display-5 inter">
                Tutorials
              </h1>

              <p className="text-white Roboto fw-light fs-5 hero-description mt-3">
                Step-by-step guides to help you get up and running with Deepity.
                <br />
                From your first network to advanced performance tuning.
              </p>
            </div>
            <div className="px-3 my-1">
              <Link
                className={`btn btn-outline-light me-2 transition-all ${language === "cpp" ? "glow" : ""}`}
                to="/tutorials/cpp"
                onClick={() => alert("Switched to C++ Tutorials.")}
              >
                C++
              </Link>

              <Link
                className={`btn btn-outline-light me-2 transition-all ${language === "python" ? "glow" : ""}`}
                to="/tutorials/python"
                onClick={() => alert("Switched to Python Tutorials.")}
              >
                Python
              </Link>

              <Link
                /* NOTE: Kept "disabled" here, WIP */
                className={`btn btn-outline-light me-2 transition-all ${language === "java" ? "glow" : "disabled"}`}
                to="/tutorials/java"
              >
                Java <div className="badge bg-dark ms-1">WIP</div>
              </Link>
            </div>
            <p
              className="roboto text-light fw-semibold ms-3 mt-2"
              style={{ fontWeight: 300, fontSize: 30 }}
              id="FeaturedTutorial"
            >
              Featured Tutorial
            </p>
            <FeaturedTutorial language={language} />
            <p
              className="roboto text-light fw-semibold ms-3 my-2"
              style={{ fontWeight: 300, fontSize: 25 }}
              id="GettingStarted"
            >
              Getting Started
            </p>
            <div className="d-flex justify-content-center gap-2">
              <PreviewTutorial
                number={1}
                icon={Download}
                title="Installation"
                description="Install Deepity in Python, C++, or build from source."
                time={5}
              />
              <PreviewTutorial
                number={2}
                icon={Code2}
                title="Your First PCN"
                description="Define a network, compile it, and randomize weights."
                time={7}
              />
              <PreviewTutorial
                number={3}
                icon={BicepsFlexed}
                title="Training"
                description="Train on a simple dataset using energy minimization."
                time={8}
              />
              <PreviewTutorial
                number={4}
                icon={Zap}
                title="Prediction"
                description="Run inference and interpret your network outputs."
                time={5}
              />
            </div>
          </div>

          {/* Right Column */}
          <div style={{ gridColumn: "3", gridRow: "1" }}>
            <div className="p-3 rounded mb-3 bg-dark bg-opacity-75 border border-secondary">
              <h6
                className="text-white mb-2 ms-3"
                style={{ fontSize: "0.85rem" }}
              >
                On this page
              </h6>

              <div className="position-relative ms-1">
                <div
                  className="bg-primary"
                  style={{
                    position: "absolute",
                    left: "-1px",
                    top: `${activeIndex * 32}px`,
                    width: "2px",
                    height: "32px",
                    transition: "top 0.3s ease-in-out",
                  }}
                />

                <div className="d-flex flex-column">
                  {menuItems.map((item) => {
                    const isActive = activeItem === item;
                    return (
                      <Link
                        key={item}
                        to={`/tutorials/${language}/${menuItemIds[item]}`}
                        onClick={() => setActiveItem(item)}
                        className="text-start px-3 bg-transparent text-white border-0 d-flex align-items-center roboto text-decoration-none"
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 300,
                          height: "32px",
                          transition: "color 0.2s ease-in-out",
                        }}
                      >
                        {item}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="p-3 rounded mb-3 bg-dark bg-opacity-75 border border-secondary">
              <h6 className="text-white mb-2 ms-3" style={{ fontSize: "1rem" }}>
                Why Deepity?
              </h6>

              <div className="position-relative ms-1">
                <div
                  className="text-white fs-7 roboto ms-2 my-3 d-flex align-items-center inline-block"
                  style={{ fontWeight: 300 }}
                >
                  <Check
                    size={17}
                    color="#28a745"
                    strokeWidth={2.5}
                    className="me-2"
                  />
                  Higher accuracy
                </div>
                <div
                  className="text-white fs-7 roboto ms-2 my-3 d-flex align-items-center inline-block"
                  style={{ fontWeight: 300 }}
                >
                  <Check
                    size={17}
                    color="#28a745"
                    strokeWidth={2.5}
                    className="me-2"
                  />
                  Faster training
                </div>
                <div
                  className="text-white fs-7 roboto ms-2 my-3 d-flex align-items-center inline-block"
                  style={{ fontWeight: 300 }}
                >
                  <Check
                    size={17}
                    color="#28a745"
                    strokeWidth={2.5}
                    className="me-2"
                  />
                  CPU optimized
                </div>
                <div
                  className="text-white fs-7 roboto ms-2 my-3 d-flex align-items-center inline-block"
                  style={{ fontWeight: 300 }}
                >
                  <Check
                    size={17}
                    color="#28a745"
                    strokeWidth={2.5}
                    className="me-2"
                  />
                  Easy to use
                </div>

                <a
                  href="/Deepity/benchmarks"
                  className="text-primary text-decoration-none fs-7 roboto ms-2 mt-4 d-flex align-items-center inline-block"
                >
                  See benchmarks →
                </a>
              </div>
            </div>
            <div className="p-3 rounded mb-2 bg-dark bg-opacity-75 border border-secondary">
              <h6 className="text-white mb-2" style={{ fontSize: "1rem" }}>
                Next Up
              </h6>
              <span className="text-secondary small roboto">
                After this tutorial
              </span>
              <div className="position-relative ms-1">
                <div className="d-flex flex-column">
                  {nextUpLinks.map(({ label, href }, idx) => {
                    const isHovered = hoveredLink === idx;
                    return (
                      <a
                        key={label}
                        href={href}
                        onMouseEnter={() => setHoveredLink(idx)}
                        onMouseLeave={() => setHoveredLink(null)}
                        className="text-decoration-none robot mt-3 d-flex align-items-center justify-content-between"
                        style={{
                          fontSize: 16,
                          color: isHovered ? "#6ea8fe" : "#0d6efd",
                          transition: "color 0.2s ease-in-out",
                        }}
                      >
                        <span>{label}</span>
                        <ChevronRight
                          className="text-light ms-2 flex-shrink-0"
                          size={20}
                          style={{
                            transform: isHovered
                              ? "translateX(4px)"
                              : "translateX(0)",
                            transition: "transform 0.2s ease-in-out",
                          }}
                        />
                      </a>
                    );
                  })}
                </div>

                <button
                  className="btn btn-outline-primary mt-3"
                  style={{ fontSize: 15 }}
                >
                  View all tutorials →
                </button>
              </div>
            </div>
          </div>

          {/* Ready for real data */}
          <div style={{ gridColumn: "2 / 4", gridRow: "2" }}>
            <div className="card bg-dark bg-opacity-75 border-secondary text-light p-3">
              <div className="d-flex justify-content-between align-items-center">
                <div className="pe-3">
                  <p className="fw-semibold mb-1">Ready for real data?</p>
                  <span
                    className="roboto d-block"
                    style={{ fontWeight: 200, fontSize: 13 }}
                  >
                    Train on MNIST and see how Deepity achieves 93% accuracy in
                    1000s.
                  </span>
                  <a
                    href="#"
                    className="btn btn-outline-primary mt-3 fw-semibold"
                    style={{ fontSize: 12, width: "fit-content" }}
                  >
                    Go to MNIST Tutorial →
                  </a>
                </div>

                <FluidCard
                  fillPercent={93}
                  width="33%"
                  height={150}
                  text="93%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer1 />
    </>
  );
}
