import { Link } from "react-router-dom";

export default function MainFooter() {
  return (
    <footer className="bg-gradient-to-b from-[#11161c] via-[#0d1217] to-[#050709] px-8 py-12 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <img
                src="/d-100-light.png"
                alt="Deepity Logo"
                className="h-10 w-auto"
              />
              <div className="text-2xl AllianceNo1">Deepity</div>
            </div>
            <p className="mt-2 max-w-sm text-sm text-white/50">
              High-performance Predictive Coding Networks for C++ and Python.
            </p>
          </div>
          <div className="flex gap-10 text-sm">
            <div className="flex flex-col gap-2">
              <span className="font-bold text-white/80">Project</span>
              <a
                href="https://github.com/Ra4ster/Deepity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 no-underline hover:text-white"
              >
                GitHub
              </a>
              <Link
                to="/docs"
                className="text-white/50 no-underline hover:text-white"
              >
                Documentation
              </Link>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-bold text-white/80">Developer</span>
              <a
                href="https://ra4ster.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 no-underline hover:text-white"
              >
                Ra4ster
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-5 text-xs text-white/40">
          © {new Date().getFullYear()} Ra4ster · Deepity is open source under
          the MIT License.
        </div>
      </div>
    </footer>
  );
}
