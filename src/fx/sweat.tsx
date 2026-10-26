import React from "react";

export default function Sweat(): JSX.Element {
  return (
    <svg
      style={{
        position: "absolute",
        top: "22%",
        right: "12%",
        width: "18%",
        height: "22%",
        overflow: "visible",
        animation: "rna-fx-sweat 1.6s ease-in-out infinite",
      }}
      viewBox="0 0 32 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Drop body */}
      <path
        d="M16 2C16 2 2 18 2 28C2 35.73 8.27 42 16 42C23.73 42 30 35.73 30 28C30 18 16 2 16 2Z"
        fill="#6BD9E9"
        stroke="#000"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Curved glossy highlight */}
      <path d="M9 25C9 21 12 17 15 15" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="10" cy="31" rx="2.5" ry="3.5" fill="#FFF" />
    </svg>
  );
}
