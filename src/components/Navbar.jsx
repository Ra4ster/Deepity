import Star from "../assets/star.svg";
import { useState, useEffect, useRef } from "react";

function Navbar() {
  const [starCount, setStarCount] = useState(null);
  const navRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);

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
        <a
          className="navbar-brand Inter fs-3 fw-semibold py-0 d-flex align-items-center"
          href="/Deepity/"
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
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
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
            <a className="nav-item nav-link" href="/Deepity/tutorials">
              Tutorials
            </a>
            <a className="nav-item nav-link" href="#API">
              API
            </a>
            <a className="nav-item nav-link" href="#Benchmarks">
              Benchmarks
            </a>
            <a className="nav-item nav-link" href="#Examples">
              Examples
            </a>
            <a className="nav-item nav-link" href="#Community">
              Community
            </a>
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
            href="https://github.com/ra4ster/deepity/stargazers"
            className="btn btn-outline-light border-secondary my-2 my-sm-0 d-flex align-items-center text-decoration-none"
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
    </>
  );
}

export default Navbar;
