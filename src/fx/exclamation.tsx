import React from "react";

export default function Exclamation(): JSX.Element {
  return (
    <svg
      style={{
        position: "absolute",
        top: "-4%",
        right: "14%",
        width: "26%",
        height: "26%",
        overflow: "visible",
        animation: "rna-fx-pop 380ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      }}
      viewBox="0 0 50 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="25" cy="28" r="22" fill="#FC909F" stroke="#000" strokeWidth="3.5" />
      <line x1="25" y1="14" x2="25" y2="31" stroke="#000" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="25" cy="39" r="2.8" fill="#000" />
    </svg>
  );
}
