import React from "react";

export default function mouthPeace({
  style: styleOverride,
}: {
  style?: React.CSSProperties;
}): React.ReactElement {
  return (
    <svg
      style={{
        width: "50%",
        height: "19%",
        position: "absolute",
        top: "calc(23% + var(--rna-top-shift, 0%))",
        right: "23%",
        ...styleOverride,
      }}
      width="67"
      height="64"
      viewBox="0 0 67 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2.5 17.5C5 34.5 33.5 42.5 59.5 23" stroke="black" strokeWidth="4" />
    </svg>
  );
}
