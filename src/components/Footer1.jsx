function Footer1() {
  return (
    <footer
      // Changed to flex-column on mobile, flex-md-row on medium+ screens
      className="container p-3 mt-3 mb-3 d-flex flex-column flex-md-row align-items-center text-center text-md-start"
      style={{
        "--panel": "#131b2b",
        "--border": "#263149",
        backgroundColor: "var(--panel)",
        border: "1px solid var(--border)",
        borderRadius: "6px",
      }}
    >
      {/* Added mb-3 mb-md-0 for mobile spacing */}
      <img
        src="chicken-64.png"
        width="32"
        alt="Chicken"
        className="mx-3 mb-3 mb-md-0"
      />

      <div>
        <h1 className="roboto fs-5 text-light mb-1" style={{ fontWeight: 250 }}>
          Predict the future. Code the present.
        </h1>
        <span className="magic-text fs-3 fw-semibold" style={{ lineHeight: 1 }}>
          Deepity
        </span>
      </div>

      {/* Allowed buttons to wrap and added top margin for mobile */}
      <div className="ms-md-auto mt-4 mt-md-0 d-flex flex-wrap justify-content-center gap-2 me-md-3">
        <a href="/Deepity/docs/index.html" className="btn btn-outline-light">
          Read the docs
        </a>
        <button type="button" className="btn btn-outline-primary">
          Explore Benchmarks
        </button>
      </div>
    </footer>
  );
}

export default Footer1;
