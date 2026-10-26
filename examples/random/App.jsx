import React, { useState } from "react";
import Avatar, { genConfig } from "@oniharnantyo/react-nice-avatar";

export default function App() {
  const [config, setConfig] = useState(genConfig());

  const regenerate = () => {
    setConfig(genConfig());
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center", fontFamily: "sans-serif" }}>
      <Avatar style={{ width: "8rem", height: "8rem", margin: "0 auto 1rem" }} {...config} />
      <button
        onClick={regenerate}
        style={{
          padding: "0.5rem 1rem",
          fontSize: "0.875rem",
          border: "1px solid #ddd",
          borderRadius: "4px",
          background: "#fff",
          cursor: "pointer",
        }}
      >
        Generate Random Avatar
      </button>
    </div>
  );
}
