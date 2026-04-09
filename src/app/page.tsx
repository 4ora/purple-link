"use client";

import { useState, useEffect } from "react";

// For local storage persistence
const STORAGE_KEY_MEMO = "archive_memos";
const STORAGE_KEY_LINKS = "sns_links";

type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeScreen, setActiveScreen] = useState<"home" | "archive">("home");

  // Archive State
  const [memos, setMemos] = useState<{ [key: number]: string }>({});
  const [selectedArchiveIndex, setSelectedArchiveIndex] = useState<number | null>(null);

  // SNS Links State
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [linkForm, setLinkForm] = useState({ title: "", url: "" });
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
          { id: "1", title: "Instagram", url: "https://instagram.com" },
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
    const urlPattern = /^(https?:\/\/).+/;
    if (!urlPattern.test(linkForm.url.trim())) {
      setLinkError("URL must start with 'http://' or 'https://'");
      return;
    }

    const newLink = {
      id: Date.now().toString(),
      title: linkForm.title.trim(),
      url: linkForm.url.trim(),
    };

    const newLinks = [...links, newLink];
    setLinks(newLinks);
    localStorage.setItem(STORAGE_KEY_LINKS, JSON.stringify(newLinks));
    
    setLinkForm({ title: "", url: "" });
    setLinkError("");
    setIsAddingLink(false);
  };
  
  const handleDeleteLink = (id: string) => {
    const newLinks = links.filter(l => l.id !== id);
    setLinks(newLinks);
    localStorage.setItem(STORAGE_KEY_LINKS, JSON.stringify(newLinks));
  };


  return (
    <main className="min-h-screen bg-white text-black p-4 md:p-10 font-sans antialiased text-[14px] flex flex-col justify-between selection:bg-black selection:text-white tracking-tight">
      
      {/* Top Header - Extremely minimal */}
      <header className="flex justify-between items-start z-10 pb-16 pt-2">
         <span 
            className="text-sm font-normal cursor-pointer hover:underline" 
            onClick={() => setActiveScreen("home")}
         >
           Bora Jo
         </span>
         {activeScreen === "archive" && (
           <button 
             onClick={() => setActiveScreen("home")} 
             className="text-sm hover:underline transition-colors"
           >
             Close Archive
           </button>
         )}
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full max-w-4xl mx-auto space-y-16 lg:space-y-24">
        
        {/* ==================================================== */}
        {/* HOMEPAGE VIEW (RAW TEXT MINIMALISM) */}
        {/* ==================================================== */}
        {activeScreen === "home" && (
          <div className="w-full flex flex-col animate-in fade-in duration-500">
            
            {/* 1. Intro Section */}
            <section className="w-full mb-20 md:mb-32">
              <h1 className="text-xl md:text-3xl font-normal mb-8">
                조보라
              </h1>
              <p className="leading-snug text-sm md:text-base">
                안녕하세요.<br />
                한양대학교 의류학과 조보라입니다.
              </p>
            </section>

            {/* 2. Text Links Area */}
            <section className="w-full flex flex-col space-y-3 text-sm md:text-base text-left">
               
               {/* Fixed Item 1: Archive */}
               <button onClick={() => setActiveScreen("archive")} className="w-max hover:line-through transition-all text-left">
                 Archive
               </button>

               {/* Fixed Item 2: E-mail */}
               <a href="mailto:hello@example.com" className="w-max hover:line-through transition-all">
                 E-mail
               </a>

               {/* Dynamic Item 3: SNS Accounts */}
               {!isMounted && (
                 <div className="opacity-30">Loading...</div>
               )}
               {isMounted && links.map((link) => (
                  <div key={link.id} className="group flex items-center w-max">
                    <a href={link.url} target="_blank" rel="noreferrer" className="w-max hover:line-through transition-all">
                      {link.title}
                    </a>
                    {/* Delete Link Button (hidden unless hovered) */}
                    <button 
                      onClick={() => handleDeleteLink(link.id)} 
                      className="ml-6 text-[10px] text-red-500 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest hidden md:block"
                    >
                      Delete
                    </button>
                    {/* Mobile Delete */}
                    <button 
                      onClick={() => handleDeleteLink(link.id)} 
                      className="ml-6 text-[10px] text-red-500 md:hidden uppercase tracking-widest"
                    >
                      Delete
                    </button>
                  </div>
               ))}

               {/* Adding form logic */}
               <div className="pt-2">
                 {!isAddingLink && (
                   <button 
                     onClick={() => setIsAddingLink(true)} 
                     className="w-max text-black/50 hover:text-black transition-colors"
                   >
                     +
                   </button>
                 )}
                 {isAddingLink && (
                    <div className="mt-4 flex flex-col space-y-2 max-w-xs text-sm">
                      <input 
                        type="text" 
                        value={linkForm.title}
                        onChange={(e) => setLinkForm({ ...linkForm, title: e.target.value })}
                        className="w-full border-b border-black/20 p-2 bg-transparent outline-none focus:border-black placeholder:text-black/30"
                        placeholder="SNS Name (e.g. Instagram)"
                      />
                      <input 
                        type="text" 
                        value={linkForm.url}
                        onChange={(e) => {
                          setLinkForm({ ...linkForm, url: e.target.value });
                          if (linkError) setLinkError(""); 
                        }}
                        className={`w-full border-b p-2 bg-transparent outline-none placeholder:text-black/30 ${
                          linkError ? 'border-red-500 text-red-500' : 'border-black/20 focus:border-black'
                        }`}
                        placeholder="URL (https://...)"
                      />
                      {linkError && <p className="text-red-500 text-[10px] pt-1">{linkError}</p>}

                      <div className="flex space-x-4 pt-2 text-xs">
                        <button onClick={handleAddLink} className="hover:underline">Save</button>
                        <button onClick={() => { setIsAddingLink(false); setLinkError(""); }} className="hover:underline text-black/50">Cancel</button>
                      </div>
                    </div>
                 )}
               </div>

            </section>
          </div>
        )}

        {/* ==================================================== */}
        {/* ARCHIVE VIEW (PHOTO GALLERY) */}
        {/* ==================================================== */}
        {activeScreen === "archive" && (
          <div className="w-full animate-in fade-in duration-500">
            <div className="mb-20">
               <h2 className="text-lg md:text-xl font-normal">Archive</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {[...Array(6)].map((_, i) => {
                const isSquare = i % 2 !== 0; 
                const isSelected = selectedArchiveIndex === i;

                return (
                  <div key={i} className="flex flex-col space-y-4">
                    <div 
                      onClick={() => setSelectedArchiveIndex(isSelected ? null : i)}
                      className={`group relative w-full cursor-pointer bg-white overflow-hidden flex items-center justify-center border border-black/10 hover:border-black/50 transition-colors duration-300 ${isSquare ? 'aspect-square' : 'aspect-[3/4]'}`}
                    >
                       <span className="font-mono text-[10px] opacity-20 uppercase tracking-widest select-none">
                         {isSquare ? '1:1' : '3:4'}
                       </span>
                    </div>

                    {isSelected && (
                      <div className="flex flex-col animate-in fade-in slide-in-from-top-1 px-1">
                         <textarea 
                           className="w-full bg-transparent text-sm resize-none outline-none font-mono placeholder:opacity-30 placeholder:italic leading-relaxed border-b border-white hover:border-black/10 focus:border-black transition-colors pb-1" 
                           rows={3} 
                           placeholder="메모를 입력하세요..."
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
      <footer className="text-[10px] bg-white text-black/40 mt-32 w-full pt-10">
          Dongjoon Lim Sookyo Jeong Jun Jegal Eunyoung Choi Sangsu Lee Dowon Ahn Moonyoung Kim Jincheol Shin Geonhu Park Juwon Jung Jaehyeon Park Taeyoung Lim Yoosung Kim Seungwoo Woo Sumin Jeon Kyuli Kim Seungmin Lee Wonjung Woo Victoria Ohanyan Hanseul Nam Jiwan Kim Joohwan Lee Sookyeong Han Jo Bora
      </footer>

    </main>
  );
}
