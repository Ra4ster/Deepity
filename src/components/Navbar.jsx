import { Link } from "react-router-dom";
import DeepityLogo from "/d-100.png";
import "./../index.css";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center border-b border-[#202d3b] backdrop-blur-md">
      <Link
        to="/"
        className="ml-8 flex items-center text-2xl font-semibold text-dark AllianceNo2 no-underline"
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

      <div className="ml-auto mr-8 flex items-center gap-3 AllianceNo2 no-underline">
        <a
          className="text-[15px] font-light text-dark no-underline hover-underline"
          href="/Deepity/docs/index.html"
        >
          Docs
        </a>

        <Link
          className="text-[15px] font-light text-dark no-underline hover-underline"
          to="/notfound"
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
    </nav>
  );
}
