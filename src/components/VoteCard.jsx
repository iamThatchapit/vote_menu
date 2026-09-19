import React from "react";
import { motion } from "framer-motion";
import { DEFAULT_IMAGE } from "../constants";

export default function VoteCard({ menu, isVotingClosed, onVote }) {
  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden flex flex-col justify-between hover:border-slate-600 transition-colors shadow-lg">
      {/* รูปภาพใช้ object-contain ไม่โดนตัด */}
      <div className="relative h-44 w-full bg-slate-950/80 flex items-center justify-center p-2">
        <img
          src={menu.image}
          alt={menu.name}
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE;
          }}
          className="w-full h-full object-contain"
        />
        <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md border border-slate-700 px-3 py-1 rounded-full text-xs font-bold text-amber-400 shadow-md">
          {menu.price} ฿
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h4 className="font-bold text-lg text-slate-100">{menu.name}</h4>
          <span className="text-xs bg-slate-700 text-slate-300 px-2.5 py-1 rounded-md font-semibold">
            {menu.votes} คะแนน
          </span>
        </div>

        <motion.button
          whileHover={!isVotingClosed ? { scale: 1.02 } : {}}
          whileTap={!isVotingClosed ? { scale: 0.95 } : {}}
          onClick={onVote}
          disabled={isVotingClosed}
          className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            isVotingClosed
              ? "bg-slate-700 text-slate-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 text-white shadow-md active:bg-orange-700"
          }`}
        >
          {isVotingClosed ? "🔒 ปิดรับโหวตแล้ว" : "👍 กดโหวตเมนูนี้"}
        </motion.button>
      </div>
    </div>
  );
}
