import React from "react";

const swept = "M31 135C19 105 21 78 40 54C58 32 86 22 115 23C142 24 163 20 181 13C180 23 174 30 165 35C188 34 205 49 209 70C212 83 210 94 205 102C193 98 184 88 179 77C158 94 132 99 109 96C121 90 129 83 133 76C107 94 92 100 80 100C69 113 68 133 70 152C64 150 57 151 51 154C54 169 60 184 66 196C57 197 44 166 31 135Z";
const gathered = "M31 135C21 109 21 82 36 59C53 32 83 21 113 23C151 24 185 43 201 68C208 79 210 92 207 105C193 96 180 81 172 65C147 90 105 102 65 96C60 114 64 132 70 152C64 150 57 151 51 154C54 169 60 184 66 196C55 197 43 163 31 135Z";

/** These styles use the original thick cut's coordinate system and ear anchors. */
export default function Refined({style, color, behindFace = false}: {style: string, color: string, behindFace?: boolean}) {
  const frame: React.CSSProperties = {position: "absolute", left: 0, bottom: "40.2%", width: "93.5%", height: "64%", overflow: "visible"};
  if (behindFace) return null;
  if (style === "buzz") {
    // Gray translucent scalp treatment, following the original mohawk's shaved sides.
    return <svg style={{position: "absolute", width: "100%", height: "100%", left: 0, top: 0}} viewBox="0 0 200 320" fill="none">
      <path d="M15.988 117.293C6.315 75.717 32.008 34.069 73.582 24.108C115.156 14.147 156.933 39.631 167.151 81.075L170 93C143 69 113 63 86 72C63 79 48 94 39 113C37 126 40 139 43 151C35 148 30 151 26 154Z" fill="#717376" opacity="0.35" />
    </svg>;
  }
  return <svg style={frame} viewBox="0 0 240 200" fill={color} stroke="#171921" strokeWidth="3.8" strokeLinejoin="round">
    {style === "bun" && <path d="M65 42C49 33 48 17 61 7C70 0 85 0 93 7C107 1 120 8 122 20C124 35 111 47 95 48Z" />}
    <path d={style === "pixie" ? swept : gathered} />
  </svg>;
}
