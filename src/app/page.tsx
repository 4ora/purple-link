"use client";

import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"home" | "archive" | "contact">("home");

  return (
    <main className="min-h-screen bg-white text-black p-4 md:p-6 font-sans antialiased text-[14px] flex flex-col justify-between selection:bg-black selection:text-white tracking-tight">
      
      {/* Top Nav */}
      <header className="flex justify-between items-start z-10">
        <nav className="flex flex-col space-y-1">
          <button 
            onClick={() => setActiveTab("home")} 
            className={`text-left hover:underline w-max text-xs uppercase tracking-widest ${activeTab === 'home' ? 'font-bold' : ''}`}
          >
            Index
          </button>
          <button 
            onClick={() => setActiveTab("archive")} 
            className={`text-left hover:underline w-max text-xs uppercase tracking-widest ${activeTab === 'archive' ? 'font-bold' : ''}`}
          >
            Archive
          </button>
          <button 
            onClick={() => setActiveTab("contact")} 
            className={`text-left hover:underline w-max text-xs uppercase tracking-widest ${activeTab === 'contact' ? 'font-bold' : ''}`}
          >
            Contact
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center w-full">
        
        {/* HOMEPAGE VIEW */}
        {activeTab === "home" && (
          <div className="w-full p-4 md:w-[80%] md:max-w-[480px] lg:w-[400px] lg:max-w-none text-center md:text-left transition-opacity duration-500">
            <h1 className="text-base font-normal mb-8 uppercase tracking-widest">
              조보라
            </h1>
            <p className="leading-relaxed text-sm md:text-base">
              안녕하세요.<br />
              한양대학교 의류학과 조보라입니다.
            </p>
          </div>
        )}

        {/* ARCHIVE VIEW */}
        {activeTab === "archive" && (
          <div className="w-full h-full max-w-6xl p-4 pt-16 pb-10 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
               {/* 6 Dummy Images for visual portfolio */}
              {[...Array(6)].map((_, i) => (
                <div key={i} className="group relative w-full aspect-[3/4] bg-[#f5f5f5] overflow-hidden flex items-center justify-center border border-black/10">
                  {/* Dummy placeholder indicator */}
                  <span className="font-mono text-[10px] opacity-30 uppercase tracking-widest">Image_Slot_{String(i + 1).padStart(2, '0')}</span>
                  
                  {/* Hover Info (PAF style technical data) */}
                  <div className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                     <p className="text-[10px] font-mono font-bold">PROJECT_{String(i + 1).padStart(2, '0')}</p>
                     <p className="text-[10px] font-mono opacity-50">2026. FW COLLECTION</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT VIEW */}
        {activeTab === "contact" && (
          <div className="w-full max-w-xl p-4 text-center">
             <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12 leading-none">
                Get In<br/>Touch
             </h2>
             <div className="flex flex-col items-center space-y-6 font-mono text-sm tracking-widest">
                <a href="mailto:hello@example.com" className="border-b-2 border-transparent hover:border-black transition-colors duration-300 pb-1">hello@example.com</a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="border-b-2 border-transparent hover:border-black transition-colors duration-300 pb-1">@instagram_id</a>
             </div>
          </div>
        )}
      </div>

      {/* Bottom Footer */}
      <footer className="text-[11px] leading-snug md:text-xs shrink-0 pt-4 z-10 w-full relative bg-white">
        <div className="pt-2 border-t border-black/10 flex justify-between cursor-pointer" onClick={() => setActiveTab("home")}>
          <span>Bora Jo (BRJ)</span>
        </div>
      </footer>

    </main>
  );
}
