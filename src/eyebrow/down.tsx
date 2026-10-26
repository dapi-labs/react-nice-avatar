import React from "react";

export default function eyebrowDown({
  style: styleOverride,
}: {
  style?: React.CSSProperties;
}): React.ReactElement {
  return (
    <svg
      style={{
        position: "absolute",
        width: "80%",
        height: "13%",
        top: "calc(0% + var(--rna-top-shift, 0%))",
        ...styleOverride,
      }}
      width="149"
      height="48"
      viewBox="0 0 149 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M99 16.2143C104.667 18.5476 118 20.1143 126 8.7143"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M23.5791 12.521C25.6497 18.6104 33.2612 29.3959 47.1418 26.8224"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
