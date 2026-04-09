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
  const [activeTab, setActiveTab] = useState<"home" | "archive" | "contact">("home");
  
  // Mounted status to prevent Next.js hydration errors with LocalStorage
  const [isMounted, setIsMounted] = useState(false);

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
        // Default initial links if empty
        setLinks([
          { id: "1", title: "Official Instagram", url: "https://instagram.com", required: false },
          { id: "2", title: "Archive Email", url: "mailto:hello@example.com", required: true }
        ]);
      }
    } catch (e) {
      console.error("Failed to load local storage data");
    }
  }, []);

  // Archive Handlers
  const handleSaveMemo = (index: number, text: string) => {
    const newMemos = { ...memos, [index]: text };
    setMemos(newMemos);
    localStorage.setItem(STORAGE_KEY_MEMO, JSON.stringify(newMemos));
  };

  // Contact Links Handlers
  const handleAddLink = () => {
    // 1. Validation: Title check
    if (!linkForm.title.trim()) {
      setLinkError("Please enter a title.");
      return;
    }
    
    // 2. Validation: URL format check (http, https, or mailto)
    // - 예외 처리: URL 형식 오류 시 빨간색 경고 표시
    const urlPattern = /^(https?:\/\/|mailto:).+/;
    if (!urlPattern.test(linkForm.url.trim())) {
      setLinkError("URL must start with 'http://', 'https://', or 'mailto:'");
      return;
    }

    // 3. Save entry to state and storage
    const newLink = {
      id: Date.now().toString(),
      title: linkForm.title.trim(),
      url: linkForm.url.trim(),
      required: linkForm.required
    };

    const newLinks = [...links, newLink];
    setLinks(newLinks);
    localStorage.setItem(STORAGE_KEY_LINKS, JSON.stringify(newLinks));
    
    // 4. Reset Form
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
    <main className="min-h-screen bg-white text-black p-4 md:p-6 font-sans antialiased text-[14px] flex flex-col justify-between selection:bg-black selection:text-white tracking-tight">
      
      {/* Top Nav */}
      <header className="flex justify-between items-start z-10">
        <nav className="flex flex-col space-y-1">
          <button onClick={() => setActiveTab("home")} className={`text-left hover:underline w-max text-xs uppercase tracking-widest ${activeTab === 'home' ? 'font-bold' : ''}`}>
            Index
          </button>
          <button onClick={() => setActiveTab("archive")} className={`text-left hover:underline w-max text-xs uppercase tracking-widest ${activeTab === 'archive' ? 'font-bold' : ''}`}>
            Archive
          </button>
          <button onClick={() => setActiveTab("contact")} className={`text-left hover:underline w-max text-xs uppercase tracking-widest ${activeTab === 'contact' ? 'font-bold' : ''}`}>
            Contact
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center w-full min-h-[60vh]">
        
        {/* ==================================================== */}
        {/* HOMEPAGE VIEW */}
        {/* ==================================================== */}
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

        {/* ==================================================== */}
        {/* ARCHIVE VIEW */}
        {/* ==================================================== */}
        {activeTab === "archive" && (
          <div className="w-full h-full max-w-6xl p-4 pt-16 pb-10 overflow-y-auto">
            <h2 className="text-xs uppercase mb-8 border-b border-black/20 pb-2 flex justify-between">
              <span>Archive_Log</span>
              <span className="opacity-50 text-[10px]">Ratio: 3:4 / 1:1</span>
            </h2>

            {/* Grid for placeholder images */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => {
                // 요구사항: 3:4 나 1:1 로만 업로드 -> 지그재그 혼합 형태로 기본 할당
                const isSquare = i % 2 !== 0; 
                const isSelected = selectedArchiveIndex === i;

                return (
                  <div key={i} className="flex flex-col space-y-3">
                    
                    {/* Image Placeholder */}
                    <div 
                      onClick={() => setSelectedArchiveIndex(isSelected ? null : i)}
                      className={`group relative w-full cursor-pointer bg-[#f5f5f5] overflow-hidden flex items-center justify-center border border-black/10 hover:border-black transition-colors duration-300 ${isSquare ? 'aspect-square' : 'aspect-[3/4]'}`}
                    >
                      <span className="font-mono text-[10px] opacity-30 uppercase tracking-widest select-none">
                        Drop {isSquare ? '1:1' : '3:4'} Image
                      </span>
                      
                      {/* Hover Info */}
                      <div className="absolute inset-0 bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                         <p className="text-[10px] font-mono font-bold">SLOT_{String(i + 1).padStart(2, '0')}</p>
                         <p className="text-[10px] font-mono opacity-50">CLICK TO ADD MEMO</p>
                      </div>
                    </div>

                    {/* Memo Section (Toggles when clicked) */}
                    {isSelected && (
                      <div className="border border-black p-3 bg-white flex flex-col animate-in fade-in slide-in-from-top-2 shadow-sm">
                         <div className="flex justify-between items-center border-b border-black/10 pb-2 mb-2">
                            <span className="text-[10px] uppercase font-mono font-bold">Inspector / Notes</span>
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

        {/* ==================================================== */}
        {/* CONTACT VIEW (LINKS MANAGEMENT) */}
        {/* ==================================================== */}
        {activeTab === "contact" && (
          <div className="w-full max-w-3xl p-4 py-16">
             <div className="flex justify-between items-end border-b border-black pb-4 mb-10">
               <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none">Access Links</h2>
               
               {/* Add Link Button */}
               <button 
                 onClick={() => {
                   setIsAddingLink(!isAddingLink);
                   setLinkError(""); // Reset error when toggling
                 }} 
                 className={`text-[10px] md:text-xs uppercase font-mono px-3 py-1 border border-black transition-colors ${
                   isAddingLink ? 'bg-white text-black' : 'bg-black text-white hover:bg-black/80'
                 }`}
               >
                 {isAddingLink ? '[- Close Form]' : '[+ Add Link]'}
               </button>
             </div>

             {/* Link Creation Form */}
             {isAddingLink && (
                <div className="border border-black p-4 md:p-6 mb-10 bg-[#fafafa]">
                  <div className="flex justify-between items-center mb-6 pb-2 border-b border-black/10">
                     <span className="text-[11px] uppercase font-bold font-mono">Create New Entry</span>
                  </div>
                  
                  <div className="space-y-5">
                    {/* Title Input */}
                    <div>
                      <label className="block text-[10px] uppercase font-mono mb-2">Platform / Title</label>
                      <input 
                        type="text" 
                        value={linkForm.title}
                        onChange={(e) => setLinkForm({ ...linkForm, title: e.target.value })}
                        className="w-full border border-black px-4 py-3 text-sm focus:bg-white bg-transparent outline-none transition-colors"
                        placeholder="e.g. My Artstation Portfolio"
                      />
                    </div>

                    {/* URL Input */}
                    <div>
                      <label className="block text-[10px] uppercase font-mono mb-2">Destination URL <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        value={linkForm.url}
                        onChange={(e) => {
                          setLinkForm({ ...linkForm, url: e.target.value });
                          if (linkError) setLinkError(""); // Clear error visually while user corrects it
                        }}
                        // 예외 처리: 에러가 있을 시 빨간색(red-500) 테두리와 옅은 빨강 배경으로 경고 표시
                        className={`w-full border px-4 py-3 text-sm outline-none transition-colors ${
                          linkError 
                          ? 'border-red-500 bg-red-50 text-red-900 focus:border-red-600 focus:bg-red-100' 
                          : 'border-black bg-transparent focus:bg-white'
                        }`}
                        placeholder="https://..."
                      />
                      {/* 예외 처리: 에러 메시지 텍스트 표시 */}
                      {linkError && (
                        <p className="text-red-500 text-[10px] uppercase font-mono mt-2 animate-in fade-in flex items-center">
                          <span className="mr-1">⚠</span> {linkError}
                        </p>
                      )}
                    </div>

                    {/* Priority Toggle (Mandatory / Optional) */}
                    <div className="flex items-center space-x-2 pt-2 pb-2">
                       <input 
                         type="checkbox" 
                         id="priority" 
                         checked={linkForm.required} 
                         onChange={(e) => setLinkForm({ ...linkForm, required: e.target.checked })}
                         className="accent-black w-4 h-4 cursor-pointer"
                       />
                       <label htmlFor="priority" className="text-[10px] uppercase font-mono cursor-pointer flex items-center space-x-2">
                         <span>Mark Priority Level:</span>
                         {linkForm.required ? (
                            <span className="bg-black text-white px-1 font-bold">[REQUIRED]</span>
                         ) : (
                            <span className="border border-black px-1">[OPTIONAL]</span>
                         )}
                       </label>
                    </div>

                    {/* Form Action Buttons */}
                    <div className="pt-4 flex space-x-2 border-t border-black/10">
                      <button onClick={handleAddLink} className="flex-1 bg-black text-white text-[11px] uppercase font-mono py-3 hover:bg-black/90 transition-colors">Save Entry</button>
                      <button onClick={() => { setIsAddingLink(false); setLinkError(""); }} className="flex-1 border border-black text-[11px] uppercase font-mono py-3 hover:bg-gray-100 transition-colors">Cancel</button>
                    </div>
                  </div>
                </div>
             )}

             {/* Links Directory List */}
             <div className="space-y-0">
                {!isMounted && (
                   <div className="text-center text-xs opacity-50 py-10 font-mono">Loading data...</div>
                )}
                {isMounted && links.length === 0 && !isAddingLink && (
                  <div className="text-center text-xs opacity-50 py-10 font-mono">No access links available.</div>
                )}
                {isMounted && links.map((link) => (
                   <div 
                     key={link.id} 
                     className="group border-b border-black/10 py-5 flex flex-col md:flex-row md:justify-between md:items-center hover:border-black transition-colors will-change-transform"
                   >
                     <div className="flex items-center mb-2 md:mb-0">
                        {/* 우선순위 필수 / 선택 구분 태그 */}
                        {link.required ? (
                          <span className="w-24 text-[10px] font-mono bg-black text-white px-2 py-1 mr-4 uppercase tracking-wider text-center shrink-0">
                            [REQUIRED]
                          </span>
                        ) : (
                          <span className="w-24 text-[10px] font-mono border border-black px-2 py-1 mr-4 uppercase tracking-wider text-center text-black/50 shrink-0">
                            [OPTIONAL]
                          </span>
                        )}
                        
                        <a href={link.url} target="_blank" rel="noreferrer" className="text-sm md:text-base font-bold hover:underline underline-offset-4 overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px] sm:max-w-[300px] md:max-w-none">
                          {link.title}
                        </a>
                     </div>
                     <div className="flex justify-end w-full md:w-auto">
                        <button 
                          onClick={() => handleDeleteLink(link.id)} 
                          className="text-[10px] uppercase font-mono opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity text-red-500 hover:text-red-700 bg-red-50 px-2 py-1 border border-red-200"
                        >
                          Delete
                        </button>
                     </div>
                   </div>
                ))}
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
