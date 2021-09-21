import React from "react";

export default function eyesCircle(): SVGElement {
  return (
    <svg
      style={{
        width: "100%",
        height: "12%",
        position: "absolute",
        top: "7%"
      }}
      width="96"
      height="48"
      viewBox="0 0 96 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="16.1171" cy="28.9268" rx="9" ry="10" transform="rotate(-6.77646 16.1171 28.9268)" fill="black" />
      <ellipse cx="80.1486" cy="18.9231" rx="9" ry="10" transform="rotate(-6.27568 80.1486 18.9231)" fill="black" />
    </svg>
  );
}
