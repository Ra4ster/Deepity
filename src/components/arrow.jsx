import "./arrow.scss";

export default function Arrow() {
  return (
    <span className="scroll-up">
      <span className="left-bar"></span>
      <span className="right-bar"></span>
      <svg width="40" height="40">
        <line className="top" x1="0" y1="0" x2="120" y2="0" />
        <line className="left" x1="0" y1="40" x2="0" y2="-80" />
        <line className="bottom" x1="40" y1="40" x2="-80" y2="40" />
        <line className="right" x1="40" y1="0" x2="40" y2="1200" />
      </svg>
    </span>
  );
}
