import React from "react";
import { motion } from "framer-motion";
import { DEFAULT_IMAGE } from "../constants";

export default function MenuList({ menus, onStartVote }) {
  // Empty State Guard
  if (menus.length === 0) {
    return (
      <div className="bg-slate-800/50 border border-dashed border-slate-700 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
        <span className="text-4xl mb-3">🍲</span>
        <p className="text-slate-300 font-medium">ยังไม่มีเมนูในระบบ</p>
        <p className="text-slate-500 text-xs mt-1">
          กรุณาเพิ่มเมนูที่ฟอร์มด้านซ้ายเพื่อเตรียมเปิดโหวต
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between shadow-lg">
      <div>
        <h2 className="text-xl font-bold mb-4 text-amber-400 flex items-center gap-2">
          <span>📋</span> รายการเมนูที่เตรียมเปิดโหวต ({menus.length})
        </h2>
        <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
          {menus.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 bg-slate-900 p-3 rounded-xl border border-slate-700/60"
            >
              <img
                src={item.image}
                alt={item.name}
                onError={(e) => {
                  e.target.src = DEFAULT_IMAGE;
                }}
                className="w-12 h-12 rounded-lg object-cover bg-slate-800 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate text-slate-100">
                  {item.name}
                </p>
                <p className="text-xs text-slate-400">{item.price} บาท</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStartVote}
        className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-lg"
      >
        🚀 เรียบร้อยแล้ว! ไปหน้าเปิดโหวต
      </motion.button>
    </div>
  );
}
