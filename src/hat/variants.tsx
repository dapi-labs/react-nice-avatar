import React from "react";
export default function HatVariants({style, color}: {style: string, color: string}) {
 return <svg style={{position: "absolute", bottom: "58%", left: "3%", width: "88%", height: "48%"}} viewBox="0 0 240 150" fill="none" stroke="#171921" strokeWidth="4" strokeLinejoin="round">
 {style === "bucket" && <><path d="M52 88L67 29Q120 10 176 30L191 88L219 119Q120 146 23 119Z" fill={color}/><path d="M52 88Q120 110 191 88"/></>}
 </svg>;
}
