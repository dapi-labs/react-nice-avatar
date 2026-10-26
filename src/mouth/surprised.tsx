import React from "react";

export default function mouthSurprised({
  style: styleOverride,
}: {
  style?: React.CSSProperties;
}): React.ReactElement {
  return (
    <svg
      style={{
        width: "40%",
        height: "16%",
        position: "absolute",
        top: "calc(25% + var(--rna-top-shift, 0%))",
        right: "28%",
        ...styleOverride,
      }}
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="32" cy="32" rx="16" ry="18" fill="black" />
      <ellipse cx="32" cy="38" rx="10" ry="8" fill="white" />
    </svg>
  );
}
