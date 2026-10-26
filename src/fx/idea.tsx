import React from "react";

export default function Idea(): JSX.Element {
  return (
    <svg
      style={{
        position: "absolute",
        top: "-4%",
        right: "12%",
        width: "28%",
        height: "28%",
        overflow: "visible",
        animation: "rna-fx-pop 420ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      }}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Radiating shock rays */}
      <line x1="30" y1="4" x2="30" y2="10" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      <line x1="12" y1="14" x2="16" y2="18" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      <line x1="48" y1="14" x2="44" y2="18" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      <line x1="6" y1="30" x2="12" y2="30" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      <line x1="54" y1="30" x2="48" y2="30" stroke="#000" strokeWidth="3" strokeLinecap="round" />

      {/* Bulb body */}
      <path
        d="M20 33C17.5 30 16 26.5 16 23C16 15.3 22.3 9 30 9C37.7 9 44 15.3 44 23C44 26.5 42.5 30 40 33L37 40H23L20 33Z"
        fill="#FFD93D"
        stroke="#000"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Filament highlight */}
      <path d="M25 21C25 18.5 27 16 30 16" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
      {/* Screw base */}
      <path d="M24 43H36" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      <path d="M26 47H34" stroke="#000" strokeWidth="3" strokeLinecap="round" />
      <path d="M28 50H32" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
