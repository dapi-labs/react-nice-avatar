import React from "react";
import Reflection from "./reflection";

/** Original square-glasses placement and anchors, with mirrored trapezoid lenses. */
export default function Aviator({tinted = false, dark = false, color = "#ADBFFF"}: {tinted?: boolean, dark?: boolean, color?: string}) {
  return <svg style={{width: "100%", height: "22%", position: "absolute", top: "0.5%", left: "-3%"}}
    viewBox="0 0 160 74" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M35 42.8L2 49.125" />
    <path d="M85.5 37.125L107.5 33.625" />
    <path fill={dark ? "#292B35" : tinted ? color : "none"} fillOpacity={dark ? 1 : tinted ? 0.32 : 1} d="M38 19C47 16 68 13 76 14C83 15 86 21 85 29L81 53C80 60 76 64 69 65L52 68C45 69 41 65 39 58L33 34C31 26 32 21 38 19Z" />
    <path fill={dark ? "#292B35" : tinted ? color : "none"} fillOpacity={dark ? 1 : tinted ? 0.32 : 1} d="M109 10C117 7 138 4 147 4C154 4 156 10 156 18L155 43C155 50 152 55 145 56L128 58C121 59 116 56 113 49L104 27C101 20 102 13 109 10Z" />

    {dark && <>
      <Reflection outline="M38 19C47 16 68 13 76 14C83 15 86 21 85 29L81 53C80 60 76 64 69 65L52 68C45 69 41 65 39 58L33 34C31 26 32 21 38 19Z" line="M35 75L87 8" />
      <Reflection outline="M109 10C117 7 138 4 147 4C154 4 156 10 156 18L155 43C155 50 152 55 145 56L128 58C121 59 116 56 113 49L104 27C101 20 102 13 109 10Z" line="M104 65L157 -2" />
    </>}
    {dark && <g fill="none" stroke="black" strokeWidth="4"><path d="M38 19C47 16 68 13 76 14C83 15 86 21 85 29L81 53C80 60 76 64 69 65L52 68C45 69 41 65 39 58L33 34C31 26 32 21 38 19Z" /><path d="M109 10C117 7 138 4 147 4C154 4 156 10 156 18L155 43C155 50 152 55 145 56L128 58C121 59 116 56 113 49L104 27C101 20 102 13 109 10Z" /></g>}
</svg>;
}
