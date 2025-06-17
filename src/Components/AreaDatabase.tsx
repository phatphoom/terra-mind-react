// Components/AreaDatabase.tsx
import React from 'react';

export const AreaDatabase = () => {
  return (
    <div className="area-database">
      <input type="text" placeholder="ค้นหาการคำนวณ..." className="search-input" />
      <button className="search-button">ค้นหา</button>
      <p className="no-data">ยังไม่มีข้อมูลการคำนวณ</p>
    </div>
  );
};
