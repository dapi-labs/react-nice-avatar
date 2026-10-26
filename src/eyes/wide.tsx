import React from "react";

export default function eyesWide({
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
      <ellipse cx="16" cy="30" rx="10" ry="12" fill="black" />
      <ellipse cx="80" cy="19" rx="10" ry="12" fill="black" />
    </svg>
  );
}
