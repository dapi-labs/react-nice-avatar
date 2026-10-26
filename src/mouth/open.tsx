import React from "react";

export default function mouthOpen({
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
      <ellipse cx="32" cy="30" rx="14" ry="10" fill="black" />
    </svg>
  );
}
