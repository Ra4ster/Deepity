import React, { useState } from "react";
import { Check, ClipboardCheck, Clipboard } from "lucide-react";
import Footer1 from "../components/Footer1";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import TutorialNavCard from "../components/TutorialNavCard";

export default function TutorialLayout({
  title,
  description,
  menuItems,
  language = "python", // 2. Add language prop (defaults to python)
  children,
}) {
  const [activeItem, setActiveItem] = useState(menuItems[0]);
  const activeIndex = menuItems.indexOf(activeItem);

  return (
    <>
      <div className="container-fluid my-4">
        <div className="row justify-content-center">
          {/* Left Navigation Column */}
          <div className="col-12 col-md-3 mb-3">
            <div className="sticky-top" style={{ top: "20px", zIndex: 10 }}>
              {/* 3. Inject the real nav card and pass the language down */}
              <TutorialNavCard className="fixed-top" language={language} />
            </div>
          </div>

          {/* Center Content Column */}
          <div className="col-12 col-md-7 mb-3">
            <div className="p-3 mb-4">
              <h1 className="text-white fw-bold hero-title AllianceNo2">
                {title}
              </h1>
              <p className="text-white Roboto fw-light fs-5 hero-description mt-3">
                {description}
              </p>
            </div>

            <div
              className="text-light roboto px-3"
              style={{ fontWeight: 300, lineHeight: "1.7" }}
            >
              {children}
            </div>
          </div>

          {/* Right TOC Column */}
          <div className="col-12 col-md-2 mb-3">
            <div className="sticky-top" style={{ top: "20px", zIndex: 10 }}>
              {/* Table of Contents Card */}
              <div className="p-3 rounded mb-3 bg-dark bg-opacity-75 border border-secondary">
                <h6
                  className="text-white mb-2 ms-3"
                  style={{ fontSize: "0.85rem" }}
                >
                  On this page
                </h6>
                <div className="position-relative ms-1">
                  <div
                    className="bg-primary"
                    style={{
                      position: "absolute",
                      left: "-1px",
                      top: `${activeIndex * 32}px`,
                      width: "2px",
                      height: "32px",
                      transition: "top 0.3s ease-in-out",
                    }}
                  />
                  <div className="d-flex flex-column">
                    {menuItems.map((item) => (
                      <a
                        key={item}
                        href={`#${item.replace(/\s+/g, "")}`}
                        onClick={() => setActiveItem(item)}
                        className={`text-start px-3 bg-transparent border-0 d-flex align-items-center roboto text-decoration-none ${
                          activeItem === item
                            ? "text-white fw-bold"
                            : "text-secondary"
                        }`}
                        style={{
                          fontSize: "0.85rem",
                          height: "32px",
                          transition: "color 0.2s ease-in-out",
                        }}
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Why Deepity Card */}
              <div className="p-3 rounded bg-dark bg-opacity-75 border border-secondary">
                <h6
                  className="text-white mb-2 ms-3"
                  style={{ fontSize: "1rem" }}
                >
                  Why Deepity?
                </h6>
                <div className="position-relative ms-1">
                  {[
                    "Higher accuracy",
                    "Faster training",
                    "CPU optimized",
                    "Easy to use",
                  ].map((feature) => (
                    <div
                      key={feature}
                      className="text-white fs-7 roboto ms-2 my-2 d-flex align-items-center inline-block"
                      style={{ fontWeight: 300 }}
                    >
                      <Check
                        size={17}
                        color="#28a745"
                        strokeWidth={2.5}
                        className="me-2 flex-shrink-0"
                      />
                      {feature}
                    </div>
                  ))}
                  <a
                    href="/Deepity/benchmarks"
                    className="text-primary text-decoration-none fs-7 roboto ms-2 mt-3 d-flex align-items-center inline-block"
                  >
                    See benchmarks →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer1 />
    </>
  );
}

// --- HELPER COMPONENTS --- //

export const TerminalBlock = ({ command }) => (
  <div className="bg-black border border-secondary rounded p-3 my-4 font-monospace fs-6 text-light d-flex align-items-center">
    <span className="text-success me-2">$</span> {command}
  </div>
);

export const CodeBlock = ({ code, language = "python" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="bg-black border border-secondary rounded overflow-hidden my-4">
      <div className="bg-dark text-secondary px-3 py-1 fs-7 font-monospace border-bottom border-secondary d-flex justify-content-between align-items-center">
        <span>{language}</span>
        <button
          onClick={handleCopy}
          className="btn btn-sm btn-outline-secondary d-flex align-items-center py-0 px-2"
          style={{ fontSize: "0.75rem" }}
        >
          {copied ? (
            <>
              <ClipboardCheck size={13} className="me-1" /> Copied
            </>
          ) : (
            <>
              <Clipboard size={13} className="me-1" /> Copy
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: "0.75rem 1rem",
          fontSize: "0.9rem",
          background: "transparent",
        }}
        codeTagProps={{ style: { fontFamily: "inherit" } }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
