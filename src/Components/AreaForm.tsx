// Components/AreaForm.tsx
import React from 'react';
import { ShapeSelector } from './ShapeSelector';

export const AreaForm = () => {
  return (
    <form className="area-form">
      <label>
        ความยาวกล่อง (หน่วย):
        <input type="number" placeholder="กรอกความยาวกล่อง" />
      </label>
      <label>
        ความกว้างกล่อง (หน่วย):
        <input type="number" placeholder="กรอกความกว้างกล่อง" />
      </label>

      {/* ShapeSelector ถูกแทรกไว้ตรงนี้ */}
      <div className="form-shape-selector">
        <h3>เลือกรูปทรง</h3>
        <ShapeSelector />
      </div>

      <label>
        คำอธิบาย:
        <textarea placeholder="อธิบายการคำนวณนี้..."></textarea>
      </label>

      <div className="form-buttons">
        <button type="submit" className="calculate-button">คำนวณพื้นที่</button>
        <button type="button" className="save-button">บันทึกข้อมูล</button>
      </div>
    </form>
  );
};
