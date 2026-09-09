import { useNavigate } from "react-router-dom";

export default function UtilButton({ backLink, nextLink }) {
  const navigate = useNavigate();

  const goTo = (link, fallback) => {
    navigate(link ?? fallback);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex gap-3">
      <button
        type="button"
        onClick={() => goTo(backLink, -1)}
        aria-label="Go back"
        title="Go back"
        className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-black bg-white text-black shadow-lg transition-all duration-300 hover:scale-105 hover:bg-black hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300 group-hover:rotate-90"
          aria-hidden="true"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => goTo(nextLink, 1)}
        aria-label="Go to next page"
        title="Go to next page"
        className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-black bg-white text-black shadow-lg transition-all duration-300 hover:scale-105 hover:bg-black hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300 group-hover:rotate-90"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
