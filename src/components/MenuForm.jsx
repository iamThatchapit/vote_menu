import React, { useState } from "react";
import { motion } from "framer-motion";
import { DEFAULT_IMAGE } from "../constants";

export default function MenuForm({ onAddMenu }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  // จัดการอัปโหลดไฟล์ภาพ และตรวจสอบขนาดไฟล์ไม่ให้เกิน 2MB
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("ไฟล์ภาพใหญ่เกินไป กรุณาเลือกภาพขนาดไม่เกิน 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !price) return;

    onAddMenu({
      id: Date.now().toString(),
      name: name.trim(),
      price: Number(price),
      image: imagePreview || DEFAULT_IMAGE,
      votes: 0,
    });

    // Reset Form
    setName("");
    setPrice("");
    setImagePreview(null);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 h-fit shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-orange-400 flex items-center gap-2">
        <span>➕</span> เพิ่มเมนูใหม่
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            ชื่ออาหาร/เครื่องดื่ม *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="เช่น กะเพราหมูกรอบ, ชาไทย"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            ราคา (บาท) *
          </label>
          <input
            type="number"
            required
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="เช่น 60"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            อัปโหลดรูปภาพ (ถ้ามี)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-700 file:text-slate-200 hover:file:bg-slate-600 transition-colors cursor-pointer"
          />
        </div>

        {/* Image Preview Box */}
        {imagePreview && (
          <div className="relative w-full h-32 rounded-xl overflow-hidden border border-slate-700 mt-2">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => setImagePreview(null)}
              className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white text-xs p-1 rounded-full px-2 transition-colors"
            >
              ✕ ลบรูป
            </button>
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl text-sm transition-colors mt-2 shadow-md"
        >
          สร้างเมนู
        </motion.button>
      </form>
    </div>
  );
}
