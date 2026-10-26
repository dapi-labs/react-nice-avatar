import React from "react";

export default function eyesSquint({
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
      <path d="M8 30C14 26 19 26 22 28" stroke="black" strokeWidth="4" strokeLinecap="round" />
      <path d="M72 20C78 16 83 16 86 18" stroke="black" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
