export default function PCNRepresentation() {
  return (
    <div className="flex justify-center mt-5 AllianceNo1">
      <svg width="500" height="180" viewBox="0 0 500 180">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="black" />
          </marker>

          <marker
            id="arrowhead-reverse"
            markerWidth="10"
            markerHeight="7"
            refX="1"
            refY="3.5"
            orient="auto-start-reverse"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="black" />
          </marker>
        </defs>

        <line
          x1="150"
          y1="70"
          x2="350"
          y2="70"
          stroke="black"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />

        <line
          x1="350"
          y1="110"
          x2="150"
          y2="110"
          stroke="black"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
        />

        <circle
          cx="100"
          cy="90"
          r="30"
          fill="lightblue"
          stroke="black"
          strokeWidth="2"
        />
        <circle
          cx="400"
          cy="90"
          r="30"
          fill="lightpink"
          stroke="black"
          strokeWidth="2"
        />

        <text x="100" y="90" textAnchor="middle" dominantBaseline="middle">
          Layer 1
        </text>

        <text x="400" y="90" textAnchor="middle" dominantBaseline="middle">
          Layer 2
        </text>

        <text x="250" y="55" textAnchor="middle">
          prediction
        </text>

        <text x="250" y="135" textAnchor="middle">
          error
        </text>
      </svg>
    </div>
  );
}
