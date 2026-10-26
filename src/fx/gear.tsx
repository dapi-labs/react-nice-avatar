import React from "react";

export default function Gear(): JSX.Element {
  return (
    <svg
      style={{
        position: "absolute",
        top: "-4%",
        right: "12%",
        width: "28%",
        height: "28%",
        overflow: "visible",
        animation:
          "rna-fx-pop 360ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards, rna-fx-spin 3.2s linear infinite",
      }}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 8-toothed mechanical cog / gear */}
      <path
        d="M21 4H29L30 9C31.5 9.5 33 10.4 34.2 11.4L39 9.5L44 14.5L42.1 19.3C43.1 20.6 44 22.1 44.5 23.7L49.5 24.7V31.7L44.5 32.7C44 34.3 43.1 35.8 42.1 37.1L44 41.9L39 46.9L34.2 45C33 46 31.5 46.9 30 47.4L29 52.4H21L20 47.4C18.5 46.9 17 46 15.8 45L11 46.9L6 41.9L7.9 37.1C6.9 35.8 6 34.3 5.5 32.7L0.5 31.7V24.7L5.5 23.7C6 22.1 6.9 20.6 7.9 19.3L6 14.5L11 9.5L15.8 11.4C17 10.4 18.5 9.5 20 9L21 4Z"
        transform="scale(0.85) translate(4, 4)"
        fill="#9287FF"
        stroke="#000"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Center axle hole */}
      <circle cx="25" cy="27" r="6" fill="#FFF" stroke="#000" strokeWidth="3" />
    </svg>
  );
}
