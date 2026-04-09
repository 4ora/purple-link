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
      
      {/* Top Header - Removed Navigation Tabs */}
      <header className="flex justify-between items-start z-10 pb-8 md:pb-16">
         <span className="text-xs uppercase tracking-widest font-bold">Bora Jo (BRJ)</span>
      </header>

      {/* Main Single Page Scrolling Content */}
      <div className="flex-1 flex flex-col w-full max-w-5xl mx-auto space-y-24 md:space-y-32">
        
        {/* ==================================================== */}
        {/* SECTION 1: PROFILE INTRO */}
        {/* ==================================================== */}
        <section className="w-full text-left max-w-sm">
          <h1 className="text-3xl font-black mb-6 uppercase tracking-widest leading-none">
            조보라
          </h1>
          <p className="leading-relaxed text-sm md:text-base border-l-2 border-black pl-3 py-1">
            안녕하세요.<br />
            한양대학교 의류학과 조보라입니다.
          </p>
        </section>

        {/* ==================================================== */}
        {/* SECTION 2: ARCHIVE GRID */}
        {/* ==================================================== */}
        <section className="w-full">
            <h2 className="text-xs uppercase mb-8 border-b border-black/20 pb-2 flex justify-between">
              <span>Archive_Log</span>
              <span className="opacity-50 text-[10px]">Ratio: 3:4 / 1:1</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
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
        </section>

        {/* ==================================================== */}
        {/* SECTION 3: LINKS DIRECTORY (SNS) */}
        {/* ==================================================== */}
        <section className="w-full max-w-3xl border-t-2 border-black pt-10">
             <div className="flex justify-between items-end border-b border-black/20 pb-4 mb-10">
               <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest">Access Links</h2>
               
               <button 
                 onClick={() => {
                   setIsAddingLink(!isAddingLink);
                   setLinkError("");
                 }} 
                 className={`text-[10px] md:text-xs uppercase font-mono px-3 py-1 border border-black transition-colors ${
                   isAddingLink ? 'bg-white text-black' : 'bg-black text-white hover:bg-black/80'
                 }`}
               >
                 {isAddingLink ? '[- Close]' : '[+ Add Link]'}
               </button>
             </div>

             {/* Add Form */}
             {isAddingLink && (
                <div className="border border-black p-4 md:p-6 mb-10 bg-[#fafafa]">
                  <div className="flex justify-between items-center mb-6 pb-2 border-b border-black/10">
                     <span className="text-[11px] uppercase font-bold font-mono">Create New Entry</span>
                  </div>
                  
                  <div className="space-y-5">
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

                    <div>
                      <label className="block text-[10px] uppercase font-mono mb-2">Destination URL <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        value={linkForm.url}
                        onChange={(e) => {
                          setLinkForm({ ...linkForm, url: e.target.value });
                          if (linkError) setLinkError(""); 
                        }}
                        className={`w-full border px-4 py-3 text-sm outline-none transition-colors ${
                          linkError 
                          ? 'border-red-500 bg-red-50 text-red-900 focus:border-red-600 focus:bg-red-100' 
                          : 'border-black bg-transparent focus:bg-white'
                        }`}
                        placeholder="https://..."
                      />
                      {linkError && (
                        <p className="text-red-500 text-[10px] uppercase font-mono mt-2 animate-in fade-in flex items-center">
                          <span className="mr-1">⚠</span> {linkError}
                        </p>
                      )}
                    </div>

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

                    <div className="pt-4 flex space-x-2 border-t border-black/10">
                      <button onClick={handleAddLink} className="flex-1 bg-black text-white text-[11px] uppercase font-mono py-3 hover:bg-black/90 transition-colors">Save Entry</button>
                      <button onClick={() => { setIsAddingLink(false); setLinkError(""); }} className="flex-1 border border-black text-[11px] uppercase font-mono py-3 hover:bg-gray-100 transition-colors">Cancel</button>
                    </div>
                  </div>
                </div>
             )}

             {/* Links Directory List */}
             <div className="space-y-0 pb-10">
                {!isMounted && (
                   <div className="text-center text-xs opacity-50 py-10 font-mono">Loading data...</div>
                )}
                {isMounted && links.length === 0 && !isAddingLink && (
                  <div className="text-center text-xs opacity-50 py-10 font-mono">No access links available.</div>
                )}
                {isMounted && links.map((link) => (
                   <div 
                     key={link.id} 
                     className="group border-b border-black/10 py-5 flex flex-col sm:flex-row sm:justify-between sm:items-center hover:border-black transition-colors will-change-transform"
                   >
                     <div className="flex items-center mb-4 sm:mb-0">
                        {link.required ? (
                          <span className="w-24 text-[10px] font-mono bg-black text-white px-2 py-1 mr-4 uppercase tracking-wider text-center shrink-0">
                            [REQUIRED]
                          </span>
                        ) : (
                          <span className="w-24 text-[10px] font-mono border border-black px-2 py-1 mr-4 uppercase tracking-wider text-center text-black/50 shrink-0">
                            [OPTIONAL]
                          </span>
                        )}
                        
                        <a href={link.url} target="_blank" rel="noreferrer" className="text-sm md:text-base font-bold hover:underline underline-offset-4 overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px] md:max-w-none">
                          {link.title}
                        </a>
                     </div>
                     <div className="flex justify-end w-full sm:w-auto">
                        <button 
                          onClick={() => handleDeleteLink(link.id)} 
                          className="text-[10px] uppercase font-mono opacity-0 sm:group-hover:opacity-100 focus:opacity-100 transition-opacity text-red-500 hover:text-red-700 bg-red-50 px-2 py-1 border border-red-200"
                        >
                          Delete
                        </button>
                     </div>
                   </div>
                ))}
             </div>
        </section>

      </div>

      {/* Bottom Footer */}
      <footer className="text-[11px] leading-snug md:text-xs shrink-0 pt-8 mt-12 w-full">
        <div className="pt-2 border-t border-black/10 flex justify-between">
          <span>Bora Jo (BRJ)</span>
          <span className="text-black/50">ARCHIVE_LOG SYSTEM</span>
        </div>
      </footer>

    </main>
  );
}
