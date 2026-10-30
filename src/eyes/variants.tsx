import React from "react";

/** Original eye centers, tilt and stroke weight; filled eyes have no extra outline. */
export default function EyeVariants({style}: {style: string}) {
 return <svg style={{width: "100%", height: "12%", position: "absolute", top: "6%"}} viewBox="0 0 96 48" fill="none" stroke="#171921" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
 {style === "wink" && <><path d="M7 31C11 25 20 23 26 28"/><ellipse cx="80.5" cy="19.4" rx="9" ry="13.5" transform="rotate(-6.3 80.5 19.4)" fill="black" stroke="none"/></>}
 {style === "sleepy" && <path d="M7 27C12 33 21 32 27 25M71 17C76 23 85 22 91 15"/>}
 {style === "sparkle" && <g fill="#171921" stroke="none"><path d="M16 16Q19 26 27 28Q19 32 17 42Q14 33 5 31Q14 27 16 16ZM80 6Q83 16 91 18Q83 22 81 32Q78 23 69 21Q78 17 80 6Z"/></g>}
 {style === "focused" && <><path d="M7 23Q16 23 26 26M71 19Q81 16 90 13"/><path d="M11 24C10 39 23 40 23 26ZM75 18C74 33 87 31 87 14Z" fill="black" stroke="none"/></>}
 </svg>;
}
