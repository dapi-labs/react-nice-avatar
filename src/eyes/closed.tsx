import React from "react";

export default function eyesClosed({
  style: styleOverride,
}: {
  style?: React.CSSProperties;
}): React.ReactElement {
  return (
    <svg
      style={{
        width: "100%",
        height: "12%",
        position: "absolute",
        top: "calc(7% + var(--rna-top-shift, 0%))",
        ...styleOverride,
      }}
      width="96"
      height="48"
      viewBox="0 0 96 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 28L20 28" stroke="black" strokeWidth="4" strokeLinecap="round" />
      <path d="M77 19L90 19" stroke="black" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
