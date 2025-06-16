"use client";

import React from "react";
import { ShapeSelector } from "@/Components/ShapeSelector";
import { AreaForm } from "@/Components/AreaForm";
import { AreaDatabase } from "@/Components/AreaDatabase";

export default function HomePage() {
  return (
    <main className="container">
      <header className="app-header">
        <h1>📐🔢 แอปคำนวณพื้นที่</h1>
        <p>คำนวณพื้นที่รูปทรงต่างๆ พร้อมบันทึกและค้นหาข้อมูล</p>
      </header>

      <div className="content">
        <section className="calculator card">
          <h2>เครื่องคำนวณพื้นที่</h2>
          <ShapeSelector />
          <AreaForm />
        </section>

        <section className="database card">
          <h2>ฐานข้อมูลการคำนวณ</h2>
          <AreaDatabase />
        </section>
      </div>
    </main>
  );
}
