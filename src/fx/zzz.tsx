import React from "react";

export default function Zzz(): JSX.Element {
  return (
    <div
      style={{
        position: "absolute",
        top: "-6%",
        right: "8%",
        width: "35%",
        height: "35%",
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      {/* Three staggered Z's drifting up */}
      <span
        style={{
          position: "absolute",
          top: "60%",
          left: "10%",
          fontSize: "1rem",
          fontWeight: 900,
          color: "#86B4FF",
          WebkitTextStroke: "1.5px black",
          animation: "rna-fx-float-zzz 2.4s ease-in-out infinite",
          animationDelay: "0s",
        }}
      >
        Z
      </span>
      <span
        style={{
          position: "absolute",
          top: "35%",
          left: "35%",
          fontSize: "1.4rem",
          fontWeight: 900,
          color: "#86B4FF",
          WebkitTextStroke: "2px black",
          animation: "rna-fx-float-zzz 2.4s ease-in-out infinite",
          animationDelay: "0.5s",
        }}
      >
        Z
      </span>
      <span
        style={{
          position: "absolute",
          top: "5%",
          left: "65%",
          fontSize: "1.8rem",
          fontWeight: 900,
          color: "#86B4FF",
          WebkitTextStroke: "2.5px black",
          animation: "rna-fx-float-zzz 2.4s ease-in-out infinite",
          animationDelay: "1s",
        }}
      >
        Z
      </span>
    </div>
  );
}
