import TechBackground from "../assets/tech-bg.jpg";
import { Link } from "react-router-dom";

export default function FeaturedTutorial({ language = "python" }) {
  return (
    <div
      className="card border border-secondary rounded text-white position-relative overflow-hidden"
      style={{
        backgroundImage: `url(${TechBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for text readability, sitting between the image and the content */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-75" />

      <div className="card-body position-relative mt-3">
        <p className="hero-title fs-3 AllianceNo2">
          Build Your First <br /> Predictive Coding Network
        </p>
        <p
          className="hero-description fs-5 roboto w-50"
          style={{ fontWeight: 300 }}
        >
          Create, train, and evaluate a SimplePCN on the XOR problem in under 50
          lines of code.
        </p>
        <div className="my-3">
          <div className="btn border-success text-success me-3 cursor-default">
            Beginner
          </div>
          <div
            className="btn transition-none me-3 cursor-default"
            style={{ borderColor: "violet", color: "violet" }}
          >
            ~10 min
          </div>
          <div className="btn border-primary text-primary cursor-default">
            Python / C++
          </div>
        </div>
        <Link className="btn btn-primary mt-3 p-2 px-4" to={`/tutorials/${language}/your-first-pcn`}>
          Start Tutorial <span className="ms-2"> →</span>
        </Link>
      </div>
    </div>
  );
}
