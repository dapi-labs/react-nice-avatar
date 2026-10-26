import React from "react";

export default function Sparkle(): JSX.Element {
  return (
    <div
      style={{
        position: "absolute",
        top: "-8%",
        left: "5%",
        width: "90%",
        height: "60%",
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      {/* Star 1 - large top left */}
      <svg
        style={{
          position: "absolute",
          top: "10%",
          left: "8%",
          width: "28px",
          height: "28px",
          animation: "rna-fx-sparkle 1.4s ease-in-out infinite",
        }}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 0C20 12 28 20 40 20C28 20 20 28 20 40C20 28 12 20 0 20C12 20 20 12 20 0Z"
          fill="#FFD93D"
          stroke="#000"
          strokeWidth="3"
        />
        <circle cx="20" cy="20" r="3" fill="#FFF" />
      </svg>

      {/* Star 2 - medium top right */}
      <svg
        style={{
          position: "absolute",
          top: "0%",
          right: "12%",
          width: "22px",
          height: "22px",
          animation: "rna-fx-sparkle 1.4s ease-in-out infinite",
          animationDelay: "0.4s",
        }}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 0C20 12 28 20 40 20C28 20 20 28 20 40C20 28 12 20 0 20C12 20 20 12 20 0Z"
          fill="#FFAA00"
          stroke="#000"
          strokeWidth="3.5"
        />
        <circle cx="20" cy="20" r="2.5" fill="#FFF" />
      </svg>

      {/* Star 3 - small bottom right */}
      <svg
        style={{
          position: "absolute",
          top: "45%",
          right: "2%",
          width: "18px",
          height: "18px",
          animation: "rna-fx-sparkle 1.4s ease-in-out infinite",
          animationDelay: "0.8s",
        }}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 0C20 12 28 20 40 20C28 20 20 28 20 40C20 28 12 20 0 20C12 20 20 12 20 0Z"
          fill="#FFD93D"
          stroke="#000"
          strokeWidth="3.5"
        />
      </svg>
    </div>
  );
}
