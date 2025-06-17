// Components/ShapeSelector.tsx
"use client";
import React from "react";

const shapes = [
  "สี่เหลี่ยมผืนผ้า",
  "สี่เหลี่ยมจัตุรัส",
  "วงกลม",
  "สามเหลี่ยม",
  "สามเหลี่ยมด้านเท่า",
  "สามเหลี่ยมด้านไม่เท่า",
];

export const ShapeSelector = ({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (shape: string) => void;
}) => {
  return (
    <div className="shape-selector">
      {shapes.map((shape) => (
        <button
          type="button"
          key={shape}
          className={`shape-button ${selected === shape ? "active" : ""}`}
          onClick={() => onSelect(shape)}
        >
          {shape}
        </button>
      ))}
    </div>
  );
};
