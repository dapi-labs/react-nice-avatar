import React from "react";
import Avatar, { genConfig } from "@oniharnantyo/react-nice-avatar";

const config = genConfig({
  sex: "man",
  hairStyle: "mohawk",
  earSize: "small",
  glassesStyle: "none",
  noseStyle: "short",
  mouthStyle: "smile",
  shirtStyle: "polo",
});

export default function App() {
  return (
    <div style={{ display: "flex", gap: "1rem", padding: "2rem" }}>
      <Avatar style={{ width: "5rem", height: "5rem" }} {...config} />
      <Avatar style={{ width: "5rem", height: "5rem" }} shape="rounded" {...genConfig("example")} />
      <Avatar style={{ width: "5rem", height: "5rem" }} shape="square" {...genConfig()} />
    </div>
  );
}
