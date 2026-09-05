import { Link } from "react-router-dom";

export default function TutorialCard({
  title,
  subtitle,
  description,
  img,
  link,
}) {
  return (
    <Link
      to={link}
      className="group flex flex-col h-full max-w-sm rounded relative overflow-hidden shadow-md transition-shadow bg-white"
    >
      <div className="px-6 py-4 flex-grow">
        <h5 className="font-bold text-xl mb-2 AllianceNo2">{title}</h5>
        <p className="text-gray-700">{subtitle}</p>
        <p className="text-gray-500">{description}</p>
      </div>

      <img
        src={img}
        alt="Tutorial image"
        className="w-full mt-auto object-cover"
      />

      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10">
        <div className="group/btn flex items-center gap-4 bg-white border border-black shadow-lg px-5 py-3 text-base text-black font-bold transition-all duration-300 hover:bg-black hover:text-white hover:scale-110 transform translate-y-4 group-hover:translate-y-0">
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
            className="transition-transform duration-300 group-hover/btn:rotate-90"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
          Go
        </div>
      </div>
    </Link>
  );
}
