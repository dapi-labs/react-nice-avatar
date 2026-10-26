import React from "react";

export default function mouthStraight({
  style: styleOverride,
}: {
  style?: React.CSSProperties;
}): React.ReactElement {
  return (
    <svg
      style={{
        width: "50%",
        height: "17%",
        position: "absolute",
        top: "calc(23% + var(--rna-top-shift, 0%))",
        right: "23%",
        ...styleOverride,
      }}
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14 28L48 28" stroke="black" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
