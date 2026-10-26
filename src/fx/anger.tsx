import React from "react";

export default function Anger(): JSX.Element {
  return (
    <svg
      style={{
        position: "absolute",
        top: "16%",
        left: "14%",
        width: "22%",
        height: "22%",
        overflow: "visible",
        animation: "rna-fx-anger 520ms ease-in-out infinite",
      }}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Anime cross vein mark */}
      <path
        d="M10 18C16 18 18 16 18 10M18 10V18M18 18H10M32 10C32 16 34 18 40 18M40 18H32M32 18V10M10 32C16 32 18 34 18 40M18 40V32M18 32H10M40 32C34 32 32 34 32 40M32 40V32M32 32H40"
        stroke="#FF3838"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="25" cy="25" r="3" fill="#FF3838" />
    </svg>
  );
}
