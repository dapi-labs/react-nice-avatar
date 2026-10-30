import React from "react";
import Reflection from "./reflection";

export default function glassesRound({dark = false}: {dark?: boolean}): SVGElement {
  return (
    <svg
      style={{
        width: "100%",
        height: "20%",
        position: "absolute",
        top: "1.5%",
        left: "-3%"
      }}
      width="152"
      height="65"
      viewBox="0 0 152 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <circle fill={dark ? "#292B35" : "none"} cx="123.5" cy="28" r="26" stroke="black" strokeWidth="4" />
      <circle fill={dark ? "#292B35" : "none"} cx="56.5" cy="37" r="26" stroke="black" strokeWidth="4" />
      <path d="M98.5 35C98.5 32.8783 97.6571 30.8434 96.1569 29.3431C94.6566 27.8429 92.6217 27 90.5 27C88.3783 27 86.3434 27.8429 84.8431 29.3431C83.3429 30.8434 82.5 32.8783 82.5 35" stroke="black" strokeWidth="4" />
      <path d="M31 39L1 44.5" stroke="black" strokeWidth="4" />

    {dark && <>
      <Reflection outline="M82.5 37A26 26 0 1 0 30.5 37A26 26 0 1 0 82.5 37Z" line="M30 64L83 10" />
      <Reflection outline="M149.5 28A26 26 0 1 0 97.5 28A26 26 0 1 0 149.5 28Z" line="M97 55L150 1" />
    </>}
    {dark && <g fill="none" stroke="black" strokeWidth="4"><path d="M82.5 37A26 26 0 1 0 30.5 37A26 26 0 1 0 82.5 37Z" /><path d="M149.5 28A26 26 0 1 0 97.5 28A26 26 0 1 0 149.5 28Z" /></g>}
</svg>
  );
}
