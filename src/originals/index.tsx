import React from "react";
import Artwork from "./artwork";

export function OriginalMouth({style}: {style: string}) {
  return <svg style={{width:"50%",height:"17%",position:"absolute",top:"23%",right:"23%",overflow:"visible"}} viewBox="0 0 64 64" fill="none"><Artwork name={style}/></svg>;
}
export function OriginalEyebrow({style}: {style: string}) {
  return <svg style={{position:"absolute",width:"80%",height:"13%",top:0,overflow:"visible"}} viewBox="0 0 149 48" fill="none"><Artwork name={style}/></svg>;
}
export function OriginalEyes({color}: {color?: string}) {
  return <svg style={{position:"absolute",width:"100%",height:"12%",top:"6%",overflow:"visible"}} viewBox="0 0 96 48" fill="none"><Artwork name="eyeshadow" color={color}/></svg>;
}
export function OriginalHair({style,color}: {style: string; color: string}) {
  return <svg style={{position:"absolute",left:0,bottom:"40.2%",width:"93.5%",height:"64%"}} viewBox="0 0 240 200" fill="none"><Artwork name={style} color={color}/></svg>;
}
export function OriginalFacialHair({style,color}: {style: string; color: string}) {
  // Same face frame as the approved beards; preserve the original vector silhouette.
  return <svg style={{position:"absolute",top:"-30%",left:"-3%",width:"100%",height:"100%"}} viewBox="0 0 200 320" fill="none"><g transform="translate(35 106)"><Artwork name={style} color={color}/></g></svg>;
}
export function Earrings({style,color,size}: {style?: string; color?: string; size: string}) {
  if (!style || style === "none") return null;
  const big = size === "big";
  return <svg style={{position:"absolute",width:"16%",height:"15%",top:"13%",left:big ? "19%" : "19.8%",overflow:"visible"}} viewBox={big ? "0 0 48 52" : "0 0 48 48"} fill="none">
    {/* Full-size original hoop: its top attaches to the lobe, its circle hangs below. */}
    <g transform={style === "hoop" ? `translate(1 ${big ? 42 : 34})` : `translate(${big ? -5 : -3} ${big ? 38 : 32})`}><Artwork name={style} color={color}/></g>
  </svg>;
}
