import React from "react";

/** Rounded shell and expressive screen, drawn with Nice Avatar's flat outlines. */
export default function Robot({color, accent = "#6BD9E9"}: {color: string, accent?: string}) {
  const screenColor = accent;
  return (
    <svg style={{position: "absolute", width: "100%", height: "100%", top: 0, left: 0}}
      viewBox="0 0 200 320" fill="none" stroke="#171921" strokeWidth="4"
      strokeLinecap="round" strokeLinejoin="round">
      <g transform="translate(-8 -13) scale(1.08 1.14)">
      {/* Restored mechanical torso, shoulder joints and short neck. */}
      <path d="M17 320V289Q24 247 69 245H132Q175 249 184 289L190 320Z" fill={color} />
      <path d="M30 264Q7 265 7 300L28 307Q49 281 45 264Z" fill={accent} />
      <path d="M161 264Q184 262 192 298L171 308Q149 280 147 267Z" fill={accent} />
      <path d="M69 233V249Q98 260 132 248V232" fill="#171921" />
      <circle cx="101" cy="285" r="17" fill={accent} />
      <g transform="rotate(-5 100 143)">
        {/* Small side cushions sit behind the white shell. */}
        <rect x="2" y="115" width="26" height="66" rx="13" fill={accent} />
        <rect x="173" y="115" width="25" height="66" rx="12" fill={accent} />
        <path d="M100 56V39" />
        <circle cx="100" cy="30" r="10" fill={accent} />
        <path d="M62 61Q100 51 141 61Q174 65 180 104L185 188Q185 231 145 237L60 237Q17 233 15 194L18 107Q20 69 62 61Z" fill={color} />
        <path d="M65 91Q102 83 140 91Q158 95 161 116L164 180Q163 205 140 210L63 210Q38 207 36 183L38 118Q39 97 65 91Z" fill="#172744" />
        <path d="M55 119Q62 112 72 115M130 115Q140 112 147 119" stroke={screenColor} />
        <ellipse cx="69" cy="151" rx="10" ry="14" fill={screenColor} stroke="none" />
        <ellipse cx="132" cy="151" rx="10" ry="14" fill={screenColor} stroke="none" />
        <path d="M87 182Q101 192 115 182" stroke={screenColor} strokeWidth="5" />
      </g>
      </g>
    </svg>
  );
}
