import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-vh-100 bg position-relative d-flex align-items-center justify-content-center">
      <div className="text-center px-3">
        <h1 className="text-white fw-bold hero-title mb-3">
          Under <span className="magic-text">Construction</span>
        </h1>

        <p className="text-white Roboto fw-light fs-5 mb-4">
          This page doesn't exist yet — or it's still being built.
        </p>

        <Link
          to="/"
          className="btn btn-primary d-inline-flex align-items-center justify-content-center touch-button"
        >
          Back to Home
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
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
