"use client";

import { useState, useEffect } from "react";

// For local storage persistence
const STORAGE_KEY_MEMO = "archive_memos";
const STORAGE_KEY_LINKS = "contact_links";

type LinkItem = {
  id: string;
  title: string;
  url: string;
  required: boolean;
};

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  // Screen State: 'home' is the linktree-like list, 'archive' is the photo grid gallery
  const [activeScreen, setActiveScreen] = useState<"home" | "archive">("home");

  // Archive State
  const [memos, setMemos] = useState<{ [key: number]: string }>({});
  const [selectedArchiveIndex, setSelectedArchiveIndex] = useState<number | null>(null);

  // Contact Links State
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [linkForm, setLinkForm] = useState({ title: "", url: "", required: true });
  const [linkError, setLinkError] = useState("");

  // Load from Storage
  useEffect(() => {
    setIsMounted(true);
    try {
      const savedMemos = localStorage.getItem(STORAGE_KEY_MEMO);
      if (savedMemos) setMemos(JSON.parse(savedMemos));

      const savedLinks = localStorage.getItem(STORAGE_KEY_LINKS);
      if (savedLinks) {
        setLinks(JSON.parse(savedLinks));
      } else {
        setLinks([
          { id: "1", title: "Official Instagram", url: "https://instagram.com", required: false },
          { id: "2", title: "Archive Email", url: "mailto:hello@example.com", required: true }
        ]);
      }
    } catch (e) {
      console.error("Failed to load local storage data");
    }
  }, []);

  const handleSaveMemo = (index: number, text: string) => {
    const newMemos = { ...memos, [index]: text };
    setMemos(newMemos);
    localStorage.setItem(STORAGE_KEY_MEMO, JSON.stringify(newMemos));
  };

  const handleAddLink = () => {
    if (!linkForm.title.trim()) {
      setLinkError("Please enter a title.");
      return;
    }
    
    const urlPattern = /^(https?:\/\/|mailto:).+/;
    if (!urlPattern.test(linkForm.url.trim())) {
      setLinkError("URL must start with 'http://', 'https://', or 'mailto:'");
      return;
    }

    const newLink = {
      id: Date.now().toString(),
      title: linkForm.title.trim(),
      url: linkForm.url.trim(),
      required: linkForm.required
    };

    const newLinks = [...links, newLink];
    setLinks(newLinks);
    localStorage.setItem(STORAGE_KEY_LINKS, JSON.stringify(newLinks));
    
    setLinkForm({ title: "", url: "", required: true });
    setLinkError("");
    setIsAddingLink(false);
  };
  
  const handleDeleteLink = (id: string) => {
    const newLinks = links.filter(l => l.id !== id);
    setLinks(newLinks);
    localStorage.setItem(STORAGE_KEY_LINKS, JSON.stringify(newLinks));
  };


  return (
    <main className="min-h-screen bg-white text-black p-4 md:p-6 lg:p-10 font-sans antialiased text-[14px] flex flex-col justify-between selection:bg-black selection:text-white tracking-tight">
      
      {/* Top Header */}
      <header className="flex justify-between items-start z-10 pb-8 md:pb-16 pt-4">
         <span 
            className="text-xs uppercase tracking-widest font-bold cursor-pointer" 
            onClick={() => setActiveScreen("home")}
         >
           Bora Jo (BRJ)
         </span>
         {activeScreen === "archive" && (
           <button 
             onClick={() => setActiveScreen("home")} 
             className="text-xs uppercase font-mono border-b border-black hover:bg-black hover:text-white px-2 transition-colors"
           >
             ← Back to Links
           </button>
         )}
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full max-w-2xl mx-auto space-y-12">
        
        {/* ==================================================== */}
        {/* HOMEPAGE VIEW (LINKTREE STYLE) */}
        {/* ==================================================== */}
        {activeScreen === "home" && (
          <div className="w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
            
            {/* 1. Intro Section */}
            <section className="w-full text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-widest leading-none">
                조보라
              </h1>
              <p className="leading-relaxed text-sm md:text-base font-mono inline-block">
                안녕하세요.<br />
                한양대학교 의류학과 조보라입니다.
              </p>
            </section>

            {/* 2. Link Buttons Block */}
            <section className="w-full space-y-3">
               
               {/* Archive Link Button (Internal SPA Router) */}
               <button 
                 onClick={() => setActiveScreen("archive")}
                 className="w-full p-4 md:p-5 border-2 border-black flex justify-between items-center bg-black text-white hover:bg-white hover:text-black transition-colors"
               >
                 <span className="font-bold uppercase tracking-widest text-sm md:text-base">ENTER ARCHIVE_LOG</span>
                 <span className="font-mono">→</span>
               </button>

               {/* External SNS Links */}
               {!isMounted && (
                 <div className="text-center text-xs opacity-50 py-10 font-mono">Loading links...</div>
               )}
               {isMounted && links.map((link) => (
                  <div key={link.id} className="relative group w-full">
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="w-full p-4 border border-black flex justify-between items-center hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        {link.required ? (
                          <span className="text-[10px] font-mono bg-black text-white px-2 py-0.5 mr-3 uppercase">[REQ]</span>
                        ) : (
                          <span className="text-[10px] font-mono border border-black px-2 py-0.5 mr-3 uppercase text-black/50">[OPT]</span>
                        )}
                        <span className="font-bold uppercase tracking-widest text-sm text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px] md:max-w-[400px]">
                          {link.title}
                        </span>
                      </div>
                      <span className="font-mono text-xs opacity-50">↗</span>
                    </a>
                    
                    {/* Delete Link Button (Appears on hover next to the link block) */}
                    <button 
                      onClick={() => handleDeleteLink(link.id)} 
                      className="absolute -right-2 top-1/2 -translate-y-1/2 translate-x-full opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:underline text-[10px] font-mono p-2 hidden md:block"
                    >
                      DEL
                    </button>
                    {/* Mobile delete button inside */}
                    <button 
                      onClick={() => handleDeleteLink(link.id)} 
                      className="absolute right-12 top-1/2 -translate-y-1/2 md:hidden text-red-500 text-[10px] font-mono bg-white px-2"
                    >
                      DEL
                    </button>
                  </div>
               ))}

               {/* Add Link Form Section */}
               <div className="pt-8">
                 {!isAddingLink && (
                   <button 
                     onClick={() => setIsAddingLink(true)} 
                     className="w-full border border-dashed border-black/30 text-black/50 p-4 text-xs font-mono uppercase hover:bg-gray-50 hover:border-black hover:text-black transition-colors"
                   >
                     + Add External Link
                   </button>
                 )}
                 {isAddingLink && (
                    <div className="border border-black p-4 md:p-6 bg-[#fafafa] text-left">
                      <div className="flex justify-between items-center mb-4 pb-2 border-b border-black/10">
                         <span className="text-[11px] uppercase font-bold font-mono">Create New Entry</span>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <input 
                            type="text" 
                            value={linkForm.title}
                            onChange={(e) => setLinkForm({ ...linkForm, title: e.target.value })}
                            className="w-full border border-black px-3 py-2 text-sm focus:bg-white bg-transparent outline-none transition-colors"
                            placeholder="Link Title (e.g. My Artstation)"
                          />
                        </div>
                        <div>
                          <input 
                            type="text" 
                            value={linkForm.url}
                            onChange={(e) => {
                              setLinkForm({ ...linkForm, url: e.target.value });
                              if (linkError) setLinkError(""); 
                            }}
                            className={`w-full border px-3 py-2 text-sm outline-none transition-colors ${
                              linkError ? 'border-red-500 bg-red-50 text-red-900' : 'border-black bg-transparent focus:bg-white'
                            }`}
                            placeholder="Destination URL (https://...)"
                          />
                          {linkError && <p className="text-red-500 text-[10px] uppercase font-mono mt-1">⚠ {linkError}</p>}
                        </div>
                        <div className="flex items-center space-x-2 py-1">
                           <input 
                             type="checkbox" id="priority" checked={linkForm.required} 
                             onChange={(e) => setLinkForm({ ...linkForm, required: e.target.checked })}
                             className="accent-black w-4 h-4 cursor-pointer"
                           />
                           <label htmlFor="priority" className="text-[10px] uppercase font-mono cursor-pointer flex items-center space-x-2">
                             <span>Mark as [REQUIRED]</span>
                           </label>
                        </div>
                        <div className="flex space-x-2 pt-2">
                          <button onClick={handleAddLink} className="flex-1 bg-black text-white text-[11px] uppercase font-mono py-2 hover:bg-black/90">Save</button>
                          <button onClick={() => { setIsAddingLink(false); setLinkError(""); }} className="flex-1 border border-black text-[11px] uppercase font-mono py-2 hover:bg-gray-100">Cancel</button>
                        </div>
                      </div>
                    </div>
                 )}
               </div>

            </section>
          </div>
        )}

        {/* ==================================================== */}
        {/* ARCHIVE VIEW (PHOTO GRID) */}
        {/* ==================================================== */}
        {activeScreen === "archive" && (
          <div className="w-full max-w-6xl animate-in slide-in-from-right-8 fade-in duration-500">
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest mb-8 border-b-2 border-black pb-2">
              Archive_Log
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => {
                const isSquare = i % 2 !== 0; 
                const isSelected = selectedArchiveIndex === i;

                return (
                  <div key={i} className="flex flex-col space-y-3">
                    <div 
                      onClick={() => setSelectedArchiveIndex(isSelected ? null : i)}
                      className={`group relative w-full cursor-pointer bg-[#f5f5f5] overflow-hidden flex items-center justify-center border border-black/10 hover:border-black transition-colors duration-300 ${isSquare ? 'aspect-square' : 'aspect-[3/4]'}`}
                    >
                      <span className="font-mono text-[10px] opacity-30 uppercase tracking-widest select-none">
                        Drop {isSquare ? '1:1' : '3:4'} Image
                      </span>
                      <div className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                         <p className="text-[10px] font-mono font-bold">SLOT_{String(i + 1).padStart(2, '0')}</p>
                         <p className="text-[10px] font-mono opacity-50">CLICK TO ADD MEMO</p>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="border border-black p-3 bg-white flex flex-col shadow-sm">
                         <div className="flex justify-between items-center border-b border-black/10 pb-2 mb-2">
                            <span className="text-[10px] uppercase font-mono font-bold">Notes</span>
                            <span className="text-[10px] uppercase font-mono bg-black text-white px-1">Active</span>
                         </div>
                         <textarea 
                           className="w-full bg-transparent text-[13px] md:text-[14px] resize-none outline-none font-mono placeholder:opacity-40 leading-relaxed" 
                           rows={4} 
                           placeholder="Type notes for this archive item..."
                           value={memos[i] || ""}
                           onChange={(e) => handleSaveMemo(i, e.target.value)}
                         />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Bottom Footer */}
      <footer className="text-[11px] leading-snug md:text-xs shrink-0 pt-8 mt-12 w-full text-center opacity-50 font-mono flex flex-col space-y-1">
          <span>ARCHIVE_LOG SYSTEM</span>
          <span>© 2026 BRJ</span>
      </footer>

    </main>
  );
}
