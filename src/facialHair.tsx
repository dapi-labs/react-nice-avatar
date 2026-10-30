import { OriginalFacialHair } from "./originals";
import React from "react";
import { FacialHairStyle } from "./types";
export default function FacialHair({style, color}: {style: FacialHairStyle, color: string}) {
 if (style === "originalBeard" || style === "scruff") return <OriginalFacialHair style={style} color={color} />;
 if (style === "none") return null;
 if (style === "chinBeard") return <svg style={{position: "absolute", top: "-30%", left: "-3%", width: "100%", height: "100%"}} viewBox="0 0 200 320" fill={color}>
   {/* Open cheeks and upper lip; the inner edge follows the jaw with a soft chin tuft. */}
   <path d="M29 126C33 124 36 123 38 124C38 134 44 141 44 152C44 175 49 194 61 207C72 219 88 228 103 229C108 229 110 222 117 221C126 219 130 225 136 225C147 224 163 208 171 193C179 180 181 169 178 156L163 84L167 83L184 153C185 159 185 162 185 165C187 202 163 235 126.329 244.261C85.0616 254.149 43.5944 229.112 32.9916 188.208L29 126Z" />
 </svg>;
 if (style === "fullBeard") return <svg style={{position: "absolute", top: "-30%", left: "-3%", width: "100%", height: "100%"}} viewBox="0 0 200 320" fill={color}>
   {/* Use the face frame so the beard follows its actual jaw and ear junction. */}
   <path fillRule="evenodd" d="M29 126C33 124 36 123 38 124C38 134 45 140 45 151C45 166 48 183 53 192C56 200 72 202 91 197C92 181 99 173 108.35 172.15L125.35 169.6C133.85 168.75 138.95 174.7 139.8 184.9C140 188 140.2 190 140.4 192C153 193 168 185 174 178C180 171 179 165 178 156L163 84L167 83L184 153C185 159 185 162 185 165C187 202 163 235 126.329 244.261C85.0616 254.149 43.5944 229.112 32.9916 188.208L29 126ZM97.3 192.55L98.15 204.45C98.15 210.4 103.25 212.95 109.2 212.1C113.45 211.25 113.45 207 116.85 206.15C120.25 205.3 121.95 210.4 125.35 210.4C133.85 209.55 138.1 205.3 138.1 198.5L137.25 188.3C136.4 179.8 132.15 177.25 125.35 178.1L108.35 179.8C100.7 180.65 97.3 185.75 97.3 192.55Z" />
 </svg>;
 if (style === "goatee") return <svg style={{position: "absolute", top: "23%", right: "23%", width: "50%", height: "25.5%"}} viewBox="0 0 64 96" fill={color}>
   {/* One continuous silhouette; the opening follows the original mouth tilt. */}
   <path fillRule="evenodd" d="M2 27C2 12 9 4 20 3L40 0C50 -1 56 6 57 18C58 31 59 48 58 61C58 68 57 74 54 80C39 88 21 90 3 88L3 59ZM7 27L8 41C8 48 14 51 21 50C26 49 26 44 30 43C34 42 36 48 40 48C50 47 55 42 55 34L54 22C53 12 48 9 40 10L20 12C11 13 7 19 7 27Z" />

 </svg>;
 return <svg style={{position: "absolute", top: "19%", right: "23%", width: "50%", height: "17%"}} viewBox="0 0 64 64" fill={color} stroke={color} strokeWidth="0.8" strokeLinejoin="round">
 {style === "mustache" && <path d="M6 31C12 29 15 23 22 21C27 20 30 22 32 24C35 20 39 18 44 19C50 20 53 24 58 24C56 31 49 34 42 30C38 28 35 28 32 30C27 28 24 30 20 33C14 37 8 36 6 31Z"/>}
 {style === "handlebar" && <path d="M32 24C27 19 22 20 17 25C12 31 7 33 5 28C4 25 5 23 7 21C1 22 0 28 3 33C7 40 16 37 22 32C26 29 29 28 32 30C36 27 39 27 44 29C52 33 60 28 61 21C62 16 59 13 55 14C58 16 59 18 57 21C54 26 48 24 44 21C39 18 35 19 32 24Z"/>}

 </svg>;
}
