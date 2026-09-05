import { Link } from "react-router-dom";
import MainFooter from "./components/MainFooter";

function NotFound() {
  return (
    <div className="bg-[#e4e6e7] min-h-screen">
      <div
        className="min-h-screen flex flex-col items-center justify-center AllianceNo1 gap-4 text-center backdrop-blur-md pt-[80px]"
        style={{
          backgroundImage: `url(${import.meta.env.BASE_URL}flowerpot.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center 65%",
        }}
      >
        <span className="text-4xl AllianceNo1 text-black">
          Under Construction
        </span>

        <span className="text-lg AllianceNo1 text-black/70 mb-10 max-w-md">
          This page is still being built.
        </span>

        <Link
          to="/"
          className="group flex items-center gap-4 shadow-lg border border-black px-5 py-3 mt-3 text-base text-black font-bold no-underline transition-all duration-300 hover:bg-black hover:text-white hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-400 group-hover:rotate-90"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back to Home
          <i className="fa fa-arrow-left"></i>
        </Link>
      </div>
      <MainFooter />
    </div>
  );
}

export default NotFound;
