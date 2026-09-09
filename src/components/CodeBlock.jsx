import { useState, memo } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

const syntaxCustomStyle = {
  margin: 0,
  padding: "1rem",
  fontSize: "0.875rem",
  flex: 1,
  overflow: "auto",
  background: "rgb(250,250,250)",
};

const CodeBlock = memo(({ language, code, icon, title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden border border-black/15 shadow-sm w-full bg-white rounded">
      <div className="flex items-center justify-between border-b border-black/15 bg-[#f1f2f3] px-4 py-2">
        <div className="flex items-center gap-2">
          {icon && (
            <img src={icon} alt={title} className="h-4 w-4 object-contain" />
          )}
          <span className="text-sm font-medium text-black/70">{title}</span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center cursor-pointer gap-1.5 text-black/50 transition-colors hover:text-black"
          aria-label={`Copy ${title} code`}
        >
          <span className="text-xs">{copied ? "Copied!" : "Copy"}</span>
          {copied ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          )}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneLight}
        customStyle={syntaxCustomStyle}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
});

export default CodeBlock;
