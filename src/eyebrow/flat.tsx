import React from "react";

export default function eyebrowFlat({
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
      <path d="M101 12H125" stroke="black" strokeWidth="4" strokeLinecap="round" />
      <path d="M25 20H49" stroke="black" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
