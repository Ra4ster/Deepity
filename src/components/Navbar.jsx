import { useState } from "react";
import { Link } from "react-router-dom";
import "./../index.css";

const DeepityLogo = `${import.meta.env.BASE_URL}d-100.png`;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#202d3b] backdrop-blur-md">
      <div className="h-20 flex items-center px-6 md:px-8">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center text-2xl font-semibold text-dark AllianceNo2 no-underline"
        >
          <img
            src={DeepityLogo}
            width="32"
            height="32"
            className="mr-3"
            alt="Deepity"
          />
          Deepity
        </Link>

        <div className="ml-auto hidden md:flex items-center gap-6 AllianceNo2">
          <a
            className="text-[15px] font-light text-dark no-underline hover-underline"
            href="/Deepity/docs/index.html"
          >
            Docs
          </a>

          <Link
            className="text-[15px] font-light text-dark no-underline hover-underline"
            to="/tutorial"
          >
            Tutorials
          </Link>

          <Link
            className="text-[15px] font-light text-dark no-underline hover-underline"
            to="/notfound"
          >
            Benchmarks
          </Link>

          <Link
            className="text-[15px] font-light text-dark no-underline hover-underline"
            to="/notfound"
          >
            Research
          </Link>

          <a
            className="flex items-center text-[15px] font-light text-dark no-underline hover-underline"
            href="https://github.com/Ra4ster/Deepity"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
            <span className="ml-1">↗</span>
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="ml-auto block md:hidden rounded-md border border-[#202d3b] p-2 text-dark"
          aria-label="Toggle navigation menu"
        >
          ☰
          <span
            className={`block w-6 h-0.5 bg-dark transition-transform ${
              isOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-dark transition-opacity ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-dark transition-transform ${
              isOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-2 flex flex-col gap-5 AllianceNo2">
          <a
            href="/Deepity/docs/index.html"
            onClick={closeMenu}
            className="text-[16px] font-light text-dark no-underline"
          >
            Docs
          </a>

          <Link
            to="/tutorial"
            onClick={closeMenu}
            className="text-[16px] font-light text-dark no-underline"
          >
            Tutorials
          </Link>

          <Link
            to="/notfound"
            onClick={closeMenu}
            className="text-[16px] font-light text-dark no-underline"
          >
            Benchmarks
          </Link>

          <Link
            to="/notfound"
            onClick={closeMenu}
            className="text-[16px] font-light text-dark no-underline"
          >
            Research
          </Link>

          <a
            href="https://github.com/Ra4ster/Deepity"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="flex items-center text-[16px] font-light text-dark no-underline"
          >
            GitHub
            <span className="ml-1">↗</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
