import React from "react";

export default function eyebrowAngry({
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
        d="M106 14.2143C101.333 16.5476 88 18.1143 80 6.7143"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M17.5791 16.521C19.6497 10.6104 27.2612 -0.3959 41.1418 2.8224"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
