"use client";

import { useState } from "react";

const shapes = [
  "สามเหลี่ยม",
  "สี่เหลี่ยม",
  "วงกลม",
  "สามเหลี่ยมด้านเท่า",
  "สามเหลี่ยมด้านไม่เท่า",
];

export const ShapeSelector = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="shape-selector">
      {shapes.map((shape) => (
        <button
          key={shape}
          className={`shape-button ${selected === shape ? "active" : ""}`}
          onClick={() => setSelected(shape)}
        >
          {shape}
        </button>
      ))}
    </div>
  );
};