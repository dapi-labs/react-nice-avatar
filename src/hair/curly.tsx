import React from "react";

/** Original thick-hair anchors and sideburn, with a soft curly crown. */
export default function Curly({color}: {color: string}) {
  return (
    <svg style={{position: "absolute", left: 0, bottom: "40.2%", width: "93.5%", height: "64%"}}
      viewBox="0 0 240 200" fill={color} stroke="#171921" strokeWidth="3.8" strokeLinejoin="round">
      <path d="M30.677 134.896
        C21 111 20 88 32 70
        C23 51 39 33 58 36
        C60 15 84 7 102 19
        C118 1 144 6 153 23
        C177 13 200 27 198 48
        C218 56 222 77 209 91
        C199 102 187 98 177 88
        C165 93 149 84 141 73
        C128 92 104 98 87 84
        C74 90 68 111 70 152
        C64 150 57 151 51 154
        C54 169 60 184 66.177 196.396
        C58.678 197.396 59.677 206.396 30.677 134.896Z" />
    </svg>
  );
}
