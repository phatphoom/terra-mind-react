"use client";
import React, { useState } from "react";
import { ShapeSelector } from "./ShapeSelector";

interface CalculationResult {
  orientation: string;
  count: number;
  arrangement: string;
  efficiency: number;
}

export const AreaForm = () => {
  const [boxLength, setBoxLength] = useState<string>("");
  const [boxWidth, setBoxWidth] = useState<string>("");
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  const [description, setDescription] = useState<string>("");
  const [result, setResult] = useState<string | null>(null);
  const [detailedResults, setDetailedResults] = useState<CalculationResult[]>([]);

  const handleShapeInput = (field: string, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const calculateOptimalFit = () => {
    const boxL = parseFloat(boxLength);
    const boxW = parseFloat(boxWidth);
    
    if (!boxL || !boxW || !selectedShape) {
      setResult("กรุณากรอกข้อมูลให้ครบ");
      setDetailedResults([]);
      return;
    }

    const results: CalculationResult[] = [];
    const totalArea = boxL * boxW;

    switch (selectedShape) {
      case "สี่เหลี่ยมจัตุรัส": {
        const side = parseFloat(inputs.side);
        if (!side) return;
        
        const countX = Math.floor(boxL / side) * Math.floor(boxW / side);
        results.push({
          orientation: "ปกติ",
          count: countX,
          arrangement: `${Math.floor(boxL / side)}×${Math.floor(boxW / side)}`,
          efficiency: (countX * side * side / totalArea) * 100
        });
        break;
      }

      case "สี่เหลี่ยมผืนผ้า": {
        const rectL = parseFloat(inputs.length);
        const rectW = parseFloat(inputs.width);
        if (!rectL || !rectW) return;

        const count1 = Math.floor(boxL / rectL) * Math.floor(boxW / rectW);
        results.push({
          orientation: "ยาว-กว้าง",
          count: count1,
          arrangement: `${Math.floor(boxL / rectL)}×${Math.floor(boxW / rectW)}`,
          efficiency: (count1 * rectL * rectW / totalArea) * 100
        });
        break;
      }

      case "วงกลม": {
        const radius = parseFloat(inputs.radius);
        if (!radius) return;

        const diameter = radius * 2;
        const rowHeight = radius * Math.sqrt(3);
        const rows = Math.floor(boxW / rowHeight);
        
        let totalHex = 0;
        for (let i = 0; i < rows; i++) {
          totalHex += i % 2 === 0 
            ? Math.floor(boxL / diameter) 
            : Math.floor((boxL - radius) / diameter);
        }

        results.push({
          orientation: "Hexagonal",
          count: totalHex,
          arrangement: `${rows} แถว`,
          efficiency: (totalHex * Math.PI * radius * radius / totalArea) * 100
        });
        break;
      }
      
      case "สามเหลี่ยม": {
        const base = parseFloat(inputs.base);
        const height = parseFloat(inputs.height);
        if (!base || !height) return;

        const triangleArea = 0.5 * base * height;

        // การวางปกติ
        const normalCount = Math.floor(boxL / base) * Math.floor(boxW / height);
        results.push({
          orientation: "ฐานตามแนว X",
          count: normalCount,
          arrangement: `${Math.floor(boxL / base)} × ${Math.floor(boxW / height)}`,
          efficiency: (normalCount * triangleArea / totalArea) * 100
        });
        
        // Tessellation
        const tessellationCount = Math.floor(totalArea / triangleArea);
        results.push({
          orientation: "Tessellation ",
          count: tessellationCount,
          arrangement: "ใช้พื้นที่เต็มประสิทธิภาพ",
          efficiency: 100.0
        });
        break;
      }

      case "สามเหลี่ยมด้านเท่า": {
        const side = parseFloat(inputs.side);
        if (!side) return;
        
        const height = (Math.sqrt(3) / 2) * side;
        const triangleArea = (Math.sqrt(3) / 4) * side * side;

        const tessellationCount = Math.floor(totalArea / triangleArea);
        results.push({
          orientation: "Tessellation ",
          count: tessellationCount,
          arrangement: "ใช้พื้นที่เต็มประสิทธิภาพ",
          efficiency: 100.0
        });

        const normalCount = Math.floor(boxL / side) * Math.floor(boxW / height);
        results.push({
          orientation: "ด้านตามแนว X",
          count: normalCount,
          arrangement: `${Math.floor(boxL / side)}×${Math.floor(boxW / height)}`,
          efficiency: (normalCount * triangleArea / totalArea) * 100
        });
        break;
      }

      case "สามเหลี่ยมด้านไม่เท่า": {
        const sideA = parseFloat(inputs.sideA);
        const sideB = parseFloat(inputs.sideB);
        const sideC = parseFloat(inputs.sideC);
        
        // ตรวจสอบความถูกต้องของสามเหลี่ยม
        if (!sideA || !sideB || !sideC || 
            sideA + sideB <= sideC ||
            sideA + sideC <= sideB ||
            sideB + sideC <= sideA) {
          setResult("ข้อมูลด้านไม่ถูกต้อง");
          return;
        }

        // คำนวณพื้นที่ด้วยสูตรของเฮรอน
        const s = (sideA + sideB + sideC) / 2;
        const triangleArea = Math.sqrt(
          s * (s - sideA) * (s - sideB) * (s - sideC)
        );

        // หาด้านที่ยาวที่สุดเป็นฐาน
        const base = Math.max(sideA, sideB, sideC);
        const height = (2 * triangleArea) / base;

        // คำนวณการจัดวางปกติ
        const normalCount = Math.floor(boxL / base) * Math.floor(boxW / height);
        results.push({
          orientation: "การจัดวางปกติ",
          count: normalCount,
          arrangement: `${Math.floor(boxL / base)} × ${Math.floor(boxW / height)}`,
          efficiency: (normalCount * triangleArea / totalArea) * 100
        });

        // Tessellation
        const tessellationCount = Math.floor(totalArea / triangleArea);
        results.push({
          orientation: "Tessellation ",
          count: tessellationCount,
          arrangement: "ใช้พื้นที่เต็มประสิทธิภาพ",
          efficiency: 100.0
        });
        break;
      }
    }

    results.sort((a, b) => b.count - a.count);
    setDetailedResults(results);

    if (results.length > 0) {
      const best = results[0];
      setResult(`วิธีที่ดีที่สุด: ${best.orientation} - ${best.count} ชิ้น (ประสิทธิภาพ ${best.efficiency.toFixed(1)}%)`);
    } else {
      setResult("ไม่สามารถคำนวณได้");
    }
  };

  const renderShapeInputs = () => {
    switch (selectedShape) {
      case "สี่เหลี่ยมจัตุรัส":
        return (
          <label>
            ด้าน (หน่วย):
            <input
              type="number"
              value={inputs.side || ""}
              onChange={(e) => handleShapeInput("side", e.target.value)}
            />
          </label>
        );

      case "สี่เหลี่ยมผืนผ้า":
        return (
          <>
            <label>
              ความยาว:
              <input
                type="number"
                value={inputs.length || ""}
                onChange={(e) => handleShapeInput("length", e.target.value)}
              />
            </label>
            <label>
              ความกว้าง:
              <input
                type="number"
                value={inputs.width || ""}
                onChange={(e) => handleShapeInput("width", e.target.value)}
              />
            </label>
          </>
        );

      case "วงกลม":
        return (
          <label>
            รัศมี:
            <input
              type="number"
              value={inputs.radius || ""}
              onChange={(e) => handleShapeInput("radius", e.target.value)}
            />
          </label>
        );
      
      case "สามเหลี่ยม":
        return (
          <>
            <label>
              ฐาน:
              <input
                type="number"
                value={inputs.base || ""}
                onChange={(e) => handleShapeInput("base", e.target.value)}
              />
            </label>
            <label>
              สูง:
              <input
                type="number"
                value={inputs.height || ""}
                onChange={(e) => handleShapeInput("height", e.target.value)}
              />
            </label>
          </>
        );
      case "สามเหลี่ยมด้านเท่า":
        return (
          <label>
            ด้าน:
            <input
              type="number"
              value={inputs.side || ""}
              onChange={(e) => handleShapeInput("side", e.target.value)}
            />
          </label>
        );

      case "สามเหลี่ยมด้านไม่เท่า":
        return (
          <div className="input-group">
            <label>
              ด้าน A:
              <input
                type="number"
                value={inputs.sideA || ""}
                onChange={(e) => handleShapeInput("sideA", e.target.value)}
              />
            </label>
            <label>
              ด้าน B:
              <input
                type="number"
                value={inputs.sideB || ""}
                onChange={(e) => handleShapeInput("sideB", e.target.value)}
              />
            </label>
            <label>
              ด้าน C:
              <input
                type="number"
                value={inputs.sideC || ""}
                onChange={(e) => handleShapeInput("sideC", e.target.value)}
              />
            </label>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form className="area-form" onSubmit={(e) => e.preventDefault()}>
      <label>
        ความยาวกล่อง (หน่วย):
        <input
          type="number"
          value={boxLength}
          onChange={(e) => setBoxLength(e.target.value)}
          placeholder="กรอกความยาวกล่อง"
        />
      </label>

      <label>
        ความกว้างกล่อง (หน่วย):
        <input
          type="number"
          value={boxWidth}
          onChange={(e) => setBoxWidth(e.target.value)}
          placeholder="กรอกความกว้างกล่อง"
        />
      </label>

      <div className="form-shape-selector">
        <h3>เลือกรูปทรง</h3>
        <ShapeSelector selected={selectedShape} onSelect={setSelectedShape} />
      </div>

      {selectedShape && (
        <div className="dynamic-inputs">
          <h4>ข้อมูลรูปทรง: {selectedShape}</h4>
          {renderShapeInputs()}
        </div>
      )}

      <label>
        คำอธิบาย:
        <textarea
          placeholder="อธิบายการคำนวณนี้..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <div className="form-buttons">
        <button 
          type="button" 
          className="calculate-button" 
          onClick={calculateOptimalFit}
        >
          คำนวณการจัดวาง
        </button>
        <button type="button" className="save-button">
          บันทึกข้อมูล
        </button>
      </div>

      {result && (
        <div className="results">
          <div className="best-result">
            <p> {result}</p>
          </div>

          {detailedResults.length > 0 && (
            <div className="comparison-table">
              <h4>การเปรียบเทียบทั้งหมด</h4>
              <table>
                <thead>
                  <tr>
                    <th>รูปแบบ</th>
                    <th>จำนวนชิ้น</th>
                    <th>การจัดเรียง</th>
                    <th>ประสิทธิภาพ</th>
                  </tr>
                </thead>
                <tbody>
                  {detailedResults.map((res, index) => (
                    <tr key={index} className={index === 0 ? "best-row" : ""}>
                      <td>{res.orientation}{index === 0 && " "}</td>
                      <td>{res.count}</td>
                      <td>{res.arrangement}</td>
                      <td>{res.efficiency.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </form>
  );
};
