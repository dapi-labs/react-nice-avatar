import React from "react";

let nextReflectionId = 0;
/** Muted diagonal reflection and lower corner plane, clipped inside each lens. */
export default function Reflection({outline, line}: {outline: string, line: string}) {
  const id = `nice-avatar-reflection-${++nextReflectionId}`;
  const [x1, y1, x2, y2] = (line.match(/-?\d+(?:\.\d+)?/g) || []).map(Number);
  return <g stroke="none">
    <defs><clipPath id={id}><path d={outline} /></clipPath></defs>
    <g clipPath={`url(#${id})`}>
      <path d={line} fill="none" stroke="#515664" strokeWidth="10" strokeLinecap="butt" />
      <path d={`M${x1 + 18} ${y1}L${x2 + 18} ${y2}L${x2 + 150} ${y2}L${x1 + 150} ${y1}Z`} fill="#515664" />
    </g>
  </g>;
}
