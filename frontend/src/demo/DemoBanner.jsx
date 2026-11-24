import React from "react";
import { resetDemoData } from "./demoApi";

const style = {
  background: "#fff4d6",
  color: "#5c4400",
  borderBottom: "1px solid #e8d18a",
  padding: "6px 12px",
  fontSize: "13px",
  textAlign: "center"
};

export default function DemoBanner() {
  const reset = () => {
    resetDemoData();
    window.location.reload();
  };
  return (
    <div style={style}>
      Demo mode: sample data stored in your browser only, no real accounts or
      server.{" "}
      <button
        onClick={reset}
        style={{ background: "none", border: "none", textDecoration: "underline", cursor: "pointer", color: "inherit", fontSize: "inherit" }}
      >
        Reset demo data
      </button>
    </div>
  );
}
