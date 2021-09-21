import React from "react";

export default function earSmall(props: { color: string }): SVGElement {
  const { color } = props;
  return (
    <svg
      style={{
        position: "absolute",
        width: "16%",
        height: "15%",
        top: "13%",
        left: "19.8%"
      }}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path d="M30.5 6.17556C28.17 5.40834 25.6547 5 23.08 5C12.5866 5 4.08007 11.5 5.08001 23.5C6.12162 36 13.5866 40.5 24.08 40.5C25.2476 40.5 26.3906 40.3975 27.5 40.2011C28.7105 39.9869 29.8811 39.6609 31 39.2347" stroke="#171921" strokeWidth="9" />
      <path d="M31.5 39.0361C29.2204 39.9786 26.7127 40.5 24.08 40.5C13.5866 40.5 6.12162 36 5.08001 23.5C4.08007 11.5 12.5866 5 23.08 5C26.2175 5 29.2667 5.60635 32 6.72957L31.5 39.0361Z" fill={color} />
      <path d="M27.5 13.5004C23.5 11.6671 14.7 10.7004 11.5 21.5004" stroke="#171921" strokeWidth="4" />
      <path d="M17 14C19.1667 15.8333 23.3 21.5 22.5 29.5" stroke="#171921" strokeWidth="4" />
    </svg>
  );
}
