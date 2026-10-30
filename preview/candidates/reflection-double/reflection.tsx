import React from "react";

let nextReflectionId = 0;
/** Parallel broad and fine reflections, clipped inside the glass. */
export default function Reflection({outline, line}: {outline: string, line: string}) {
  const id = `nice-avatar-reflection-${++nextReflectionId}`;
  return <g stroke="none">
    <defs><clipPath id={id}><path d={outline} /></clipPath></defs>
    <g clipPath={`url(#${id})`} fill="none" stroke="white" strokeOpacity="0.55" strokeLinecap="butt">
      <path d={line} strokeWidth="8" />
      <path d={line} transform="translate(12 0)" strokeWidth="3" />
    </g>
  </g>;
}
