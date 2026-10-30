import React from "react";

/** Back volume wraps the nape; the front tucks cleanly above the visible ear. */
let nextBobId = 0;
export default class Bob extends React.Component<{color: string, behindFace?: boolean}> {
  private readonly maskId = `nice-bob-fill-${++nextBobId}`;
  render() {
  const {color, behindFace = false} = this.props;
  const back = "M35 233C33 210 29 187 25 162C17 117 17 76 43 47C69 18 109 10 147 17C185 23 208 47 213 83C217 119 212 158 218 192C220 207 225 222 221 230C202 242 176 246 151 245C126 248 105 255 83 256C65 254 47 246 35 233Z";
  const front = "M25 162C17 117 17 76 43 47C69 18 109 10 147 17C185 23 208 47 213 83C201 92 188 84 180 73C168 90 149 101 130 104C136 98 141 91 144 85C120 105 92 115 65 118C61 134 59 152 60 175C54 172 49 174 43 179C35 179 28 173 25 162Z";
  // The fringe ends at the face, not at the outside edge of the back layer.
  const hairline = "M201 88C194 88 186 81 180 73C168 90 149 101 130 104C136 98 141 91 144 85C120 105 92 115 65 118C61 134 59 152 60 175";
  return <svg style={{position: "absolute", bottom: "20%", width: "94%", height: "81%", left: "-0.5%"}}
    viewBox="0 0 240 270" fill={color} stroke="#171921" strokeWidth="3.8" strokeLinejoin="round">
    {behindFace ? <path d={back} /> : <>
      {/* Keep the foreground fill inside the back outline. The outer stroke
          is drawn once, behind the face, and never patched in segments. */}
      <defs>
        <mask id={this.maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="240" height="270" style={{maskType: "luminance"}}>
          <path d={back} fill="white" stroke="black" strokeWidth="3.8" />
        </mask>
      </defs>
      <path d={front} stroke="none" mask={`url(#${this.maskId})`} />
      <path d={hairline} fill="none" strokeLinecap="round" />
    </>}
  </svg>;
}
}
