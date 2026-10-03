import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuForm from "./components/MenuForm";
import MenuList from "./components/MenuList";
import VoteCard from "./components/VoteCard";
import VoteResultSummary from "./components/VoteResultSummary";

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isVotingClosed, setIsVotingClosed] = useState(false); // ระบบปิดโหวต
  const [lastVotedMenu, setLastVotedMenu] = useState(null); // แสดง Toast เมื่อโหวตเสร็จ

  const [menus, setMenus] = useState(() => {
    const saved = localStorage.getItem("office_menus");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("office_menus", JSON.stringify(menus));
  }, [menus]);

  const handleAddMenu = (newMenu) => {
    setMenus((prev) => [...prev, newMenu]);
  };

  // โหวตได้เรื่อยๆ สำหรับส่งต่อมือถือ
  const handleVote = (menuId) => {
    if (isVotingClosed) return;

    const votedItem = menus.find((m) => m.id === menuId);
    setMenus((prev) =>
      prev.map((item) =>
        item.id === menuId ? { ...item, votes: item.votes + 1 } : item,
      ),
    );

    // แจ้งเตือนเพื่อให้ส่งต่อให้คนถัดไป
    setLastVotedMenu(votedItem?.name || "เมนูนี้");
    setTimeout(() => setLastVotedMenu(null), 3000);
  };

  const handleToggleCloseVote = () => {
    setIsVotingClosed((prev) => !prev);
  };

  const handleResetAll = () => {
    if (window.confirm("คุณต้องการล้างข้อมูลเมนูและผลโหวตทั้งหมดใช่หรือไม่?")) {
      setMenus([]);
      setIsVotingClosed(false);
      setCurrentStep(1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">
              🍔 มื้อนี้กินอะไรดี? (Office Kiosk)
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              ส่งต่อมือถือโหวตร่วมกันในออฟฟิศ
            </p>
          </div>

          <button
            onClick={handleResetAll}
            className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-2 rounded-lg transition-colors"
          >
            🔄 รีเซ็ตระบบทั้งหมด
          </button>
        </header>

        {/* Toast แจ้งเตือนเมื่อโหวตสำเร็จ */}
        <AnimatePresence>
          {lastVotedMenu && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 px-4 py-3 rounded-xl text-center font-semibold shadow-lg"
            >
              🎉 โหวตให้กับ "{lastVotedMenu}" เรียบร้อยแล้ว!
              ส่งต่อมือถือให้คนถัดไปได้เลย
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Tabs */}
        <div className="flex bg-slate-800 p-1.5 rounded-xl border border-slate-700">
          <button
            onClick={() => setCurrentStep(1)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              currentStep === 1
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Step 1: จัดการเมนู ({menus.length})
          </button>
          <button
            onClick={() => {
              if (menus.length === 0) {
                alert("กรุณาเพิ่มเมนูอย่างน้อย 1 รายการก่อนเปิดโหวต");
                return;
              }
              setCurrentStep(2);
            }}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              currentStep === 2
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Step 2: เปิดโหวต & สรุปผล
          </button>
        </div>

        {/* Views */}
        <AnimatePresence mode="wait">
          {currentStep === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <MenuForm onAddMenu={handleAddMenu} />
              <MenuList menus={menus} onStartVote={() => setCurrentStep(2)} />
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              <VoteResultSummary
                menus={menus}
                isVotingClosed={isVotingClosed}
                onToggleCloseVote={handleToggleCloseVote}
              />

              <div>
                <h3 className="text-xl font-bold mb-4 text-slate-200">
                  🗳️ รายการเมนูสำหรับลงคะแนน {isVotingClosed && "(ปิดโหวตแล้ว)"}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {menus.map((menu) => (
                    <VoteCard
                      key={menu.id}
                      menu={menu}
                      isVotingClosed={isVotingClosed}
                      onVote={() => handleVote(menu.id)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
