import React from "react";
import { motion } from "framer-motion";

export default function VoteResultSummary({
  menus,
  isVotingClosed,
  onToggleCloseVote,
}) {
  const totalVotes = menus.reduce((acc, curr) => acc + curr.votes, 0);
  const sortedMenus = [...menus].sort((a, b) => b.votes - a.votes);
  const winner = totalVotes > 0 ? sortedMenus[0] : null;

  return (
    <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm space-y-6 shadow-xl">
      {/* Header & Close Vote Control */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-700">
        <div>
          <h3 className="text-lg font-bold text-slate-100">
            สรุปผลการโหวตทั้งหมด
          </h3>
          <p className="text-xs text-slate-400">
            จำนวนคนลงคะแนนรวม: {totalVotes} ครั้ง
          </p>
        </div>

        <button
          onClick={onToggleCloseVote}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
            isVotingClosed
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30"
              : "bg-amber-500 text-slate-950 hover:bg-amber-400"
          }`}
        >
          {isVotingClosed
            ? "🔓 เปิดรับโหวตอีกครั้ง"
            : "🔒 ปิดโหวต & สรุปมื้อนี้!"}
        </button>
      </div>

      {/* Winner Announcement */}
      {winner && winner.votes > 0 ? (
        <div
          className={`border rounded-xl p-4 flex items-center gap-4 transition-all ${
            isVotingClosed
              ? "bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-yellow-500/20 border-amber-400 shadow-amber-500/10 shadow-lg"
              : "bg-slate-900/60 border-slate-700"
          }`}
        >
          <div className="text-4xl">🏆</div>
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
              {isVotingClosed
                ? "🎉 สรุปเมนูชนะเลิศมื้อนี้!"
                : "เมนูนำอันดับ #1"}
            </span>
            <h3 className="text-xl font-black text-white">{winner.name}</h3>
            <p className="text-xs text-slate-400">
              ได้รับคะแนน {winner.votes} คะแนน (
              {totalVotes > 0
                ? Math.round((winner.votes / totalVotes) * 100)
                : 0}
              %)
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-2 text-slate-400 text-sm">
          ⏳ ยังไม่มีการโหวตเกิดขึ้น ส่งต่อมือถือแล้วเริ่มกดโหวตได้เลย!
        </div>
      )}

      {/* Progress Bars */}
      <div className="space-y-3">
        {sortedMenus.map((item) => {
          const percentage =
            totalVotes > 0 ? Math.round((item.votes / totalVotes) * 100) : 0;

          return (
            <div key={item.id} className="space-y-1">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-200">{item.name}</span>
                <span className="text-slate-400">
                  {item.votes} คะแนน ({percentage}%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700/50">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
