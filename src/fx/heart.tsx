import React from "react";

export default function Heart(): JSX.Element {
  return (
    <svg
      style={{
        position: "absolute",
        top: "-2%",
        right: "12%",
        width: "28%",
        height: "28%",
        overflow: "visible",
        animation: "rna-fx-pulse 920ms ease-in-out infinite",
      }}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25 42C25 42 7 29 7 17C7 10.5 12 6 18 6C21.8 6 24.2 8.4 25 10C25.8 8.4 28.2 6 32 6C38 6 43 10.5 43 17C43 29 25 42 25 42Z"
        fill="#FF477E"
        stroke="#000"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Glossy heart shine */}
      <path d="M13 15C13 11 16 9 19 9" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
