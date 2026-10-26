import React from "react";

export default function Question(): JSX.Element {
  return (
    <svg
      style={{
        position: "absolute",
        top: "-4%",
        right: "12%",
        width: "26%",
        height: "26%",
        overflow: "visible",
        animation: "rna-fx-pop 420ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      }}
      viewBox="0 0 50 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circular comic badge */}
      <circle cx="25" cy="28" r="22" fill="#FFEBA4" stroke="#000" strokeWidth="3.5" />
      {/* Question mark shape */}
      <path
        d="M18 19C18 14.5 21 12 25.5 12C29.5 12 33 14.5 33 19C33 23 30 25.5 27 28L25.5 30V33"
        stroke="#000"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="25.5" cy="40" r="2.8" fill="#000" />
    </svg>
  );
}
