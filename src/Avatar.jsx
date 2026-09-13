import React from "react";

export default function Avatar({ name = "", size = "md" }) {
  const initial = name ? name.charAt(0).toUpperCase() : "?";
  return <div className={`avatar avatar-${size}`}>{initial}</div>;
}