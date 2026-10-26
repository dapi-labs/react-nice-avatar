import React from "react";

export default function mouthFrown({
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
      <path
        d="M10.0007 30.1649C14.941 23.7183 22.4277 16.5761 33.9767 18.2048C45.5257 19.8335 50.6642 27.8001 49.1492 34.2519"
        stroke="black"
        strokeWidth="4"
      />
    </svg>
  );
}
