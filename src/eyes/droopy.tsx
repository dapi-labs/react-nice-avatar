import React from "react";

export default function eyesDroopy({
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
      <path d="M8 30C12 22 20 22 22 24" stroke="black" strokeWidth="4" strokeLinecap="round" />
      <path d="M72 20C76 12 84 12 86 14" stroke="black" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
