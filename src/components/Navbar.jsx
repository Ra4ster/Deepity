import { Link, useNavigate } from "react-router-dom";
import Star from "../assets/star.svg";
import { useState, useEffect, useRef } from "react";

function Navbar() {
  const [starCount, setStarCount] = useState(null);
  const navRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);
  const [showLangModal, setShowLangModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.github.com/repos/ra4ster/deepity")
      .then((response) => response.json())
      .then((data) => {
        if (data.stargazers_count) {
          setStarCount(data.stargazers_count);
        }
      })
      .catch((err) => console.error("Error fetching stars: ", err));
  }, []);

  // The navbar is `fixed-top`, so it's out of normal document flow and
  // would otherwise sit on top of (covering) whatever comes right after it.
  // Measure its real rendered height — which changes when the mobile menu
  // expands/collapses, when the star count text wraps, on window resize,
  // etc. — and use that to size a spacer element that reserves the same
  // amount of space in the normal document flow.
  useEffect(() => {
    if (!navRef.current) return;

    const measure = () => setNavHeight(navRef.current.offsetHeight);

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(navRef.current);

    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Close the language modal on Escape.
  useEffect(() => {
    if (!showLangModal) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setShowLangModal(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showLangModal]);

  const languages = [
    { label: "C++", path: "/tutorials/cpp" },
    { label: "Python", path: "/tutorials/python" },
    { label: "Java", path: "/notfound" },
  ];

  const handleLanguageSelect = (path) => {
    setShowLangModal(false);
    navigate(path);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="navbar navbar-expand-lg navbar-dark py-3 fixed-top"
        style={{
          backgroundColor: "rgba(0, 17, 28, 0.55)",
          borderBottom: "1px solid #202d3b",
          backdropFilter: "blur(14px) saturate(150%)",
          WebkitBackdropFilter: "blur(14px) saturate(150%)",
        }}
      >
        {" "}
        <Link
          className="navbar-brand Inter fs-3 fw-semibold py-0 d-flex align-items-center"
          to="/"
        >
          <img
            src="chicken-96.png"
            width="32"
            height="32"
            className="d-inline-block align-top me-2 ms-3"
            alt="Chicken"
            style={{
              filter: "drop-shadow(1px 1px 1px rgba(65, 105, 225, 0.5))",
            }}
          />
          Deepity
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse me-3" id="navbarNavAltMarkup">
          <div
            className="navbar-nav ms-auto align-items-center gap-3 me-4 Roboto"
            style={{ fontWeight: 300, fontSize: 15 }}
          >
            <a className="nav-item nav-link" href="/Deepity/docs/index.html">
              Docs
            </a>
            <button
              type="button"
              className="nav-item nav-link p-0 border-0 bg-transparent"
              style={{
                fontWeight: 300,
                fontSize: 15,
                color: "rgba(255, 255, 255, 0.85)",
                textDecoration: "none",
              }}
              onClick={() => setShowLangModal(true)}
            >
              Tutorials
            </button>
            <Link className="nav-item nav-link" to="#API">
              API
            </Link>
            <Link className="nav-item nav-link" to="#Benchmarks">
              Benchmarks
            </Link>
            <Link className="nav-item nav-link" to="#Examples">
              Examples
            </Link>
            <Link className="nav-item nav-link" to="#Community">
              Community
            </Link>
            <a
              className="nav-item nav-link"
              href="https://github.com/Ra4ster/Deepity"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ms-1"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          </div>
          <a
            href="https://github.com/ra4ster/deepity"
            className="btn btn-outline-light border-secondary my-2 my-sm-0 d-flex align-items-center text-center text-decoration-none"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={Star}
              width="20"
              height="20"
              className="star-icon me-2"
              alt="Star icon"
            />
            Star on GitHub
            {starCount !== null && (
              <span className="ms-2 ps-2 border-start border-secondary lh-1">
                {starCount.toLocaleString()}
              </span>
            )}
          </a>
        </div>
      </nav>

      {/* Reserves space in normal document flow equal to the fixed
          navbar's real height, so page content doesn't start out hidden
          underneath it. */}
      <div style={{ height: navHeight }} aria-hidden="true" />

      {/* Language-selection modal, shown before navigating to a tutorials
          track. Styled to match the navbar's dark glass look. */}
      {showLangModal && (
        <div
          onClick={() => setShowLangModal(false)}
          role="presentation"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1050,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 8, 14, 0.6)",
            backdropFilter: "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="tutorial-lang-modal-title"
            className="Roboto"
            style={{
              backgroundColor: "rgba(0, 17, 28, 0.9)",
              border: "1px solid #202d3b",
              backdropFilter: "blur(14px) saturate(150%)",
              WebkitBackdropFilter: "blur(14px) saturate(150%)",
              borderRadius: 12,
              padding: "28px 28px 24px",
              width: "90%",
              maxWidth: 380,
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
              color: "#fff",
            }}
          >
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5
                id="tutorial-lang-modal-title"
                className="Inter fw-semibold m-0"
              >
                Choose a language
              </h5>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setShowLangModal(false)}
                className="btn btn-sm text-light p-0 border-0 bg-transparent"
                style={{
                  fontSize: 20,
                  lineHeight: 1,
                  opacity: 0.7,
                  textDecoration: "none",
                }}
              >
                &times;
              </button>
            </div>

            <p
              className="Roboto mb-3"
              style={{ fontWeight: 300, fontSize: 14, opacity: 0.8 }}
            >
              Pick which tutorials track you'd like to view.
            </p>

            <div className="d-flex flex-column gap-2">
              {languages.map(({ label, path }) => (
                <button
                  key={path}
                  type="button"
                  onClick={() => handleLanguageSelect(path)}
                  className="btn btn-outline-light border-secondary text-start"
                  style={{ fontWeight: 300 }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
