import React from "react";
import "./DrawPage.css";

const Menu = ({ setLineColor, setLineWidth, setLineOpacity }) => {
  return (
    <div className="Menu">
      <label>Brush Color </label>
      <input
        type="color"
        onChange={(e) => {
          setLineColor(e.target.value);
        }}
      />
      <label>Brush Width </label>
      <input
        type="range"
        min="3"
        max="20"
        onChange={(e) => {
          setLineWidth(e.target.value);
        }}
      />
      <button>Clear Canvas</button>
      <button>Save Image</button>
      <button>Invite a Friend</button>
    </div>
  );
};

export default Menu;
