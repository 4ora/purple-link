export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black p-4 md:p-6 font-sans antialiased text-[14px] flex flex-col justify-between selection:bg-black selection:text-white tracking-tight">
      
      {/* Top Nav (Replicating PAF's sparse, unstyled link aesthetic) */}
      <header className="flex justify-between items-start">
        <nav className="flex flex-col space-y-1">
          <a href="#" className="hover:underline">Archive</a>
          <a href="#" className="hover:underline">Contact</a>
        </nav>
      </header>

      {/* Main Intro (Extremely minimal typography) */}
      <div className="flex-1 flex items-center justify-center -mt-10">
        <div className="max-w-md w-full text-center md:text-left">
          <h1 className="text-base font-normal mb-6 uppercase tracking-wider">
            조보라
          </h1>
          <p className="leading-relaxed text-sm md:text-base">
            안녕하세요.<br />
            한양대학교 의류학과 조보라입니다.
          </p>
        </div>
      </div>

      {/* Bottom Footer (Replicating PAF's characteristic staff names footer) */}
      <footer className="text-[11px] leading-snug md:text-xs">
        <p className="mb-4 text-justify opacity-80 break-words md:break-normal">
          Dongjoon Lim Sookyo Jeong Jun Jegal Eunyoung Choi Sangsu Lee Dowon Ahn Moonyoung Kim Jincheol Shin Geonhu Park Juwon Jung Jaehyeon Park Taeyoung Lim Yoosung Kim Seungwoo Woo Sumin Jeon Kyuli Kim Seungmin Lee Wonjung Woo Victoria Ohanyan Hanseul Nam Jiwan Kim Joohwan Lee Sookyeong Han Jo Bora
        </p>
        <div className="flex flex-col md:flex-row justify-between pt-2 border-t border-black/10">
          <span className="mb-1 md:mb-0">POST ARCHIVE FACTION (PAF)</span>
          <span>© 2026 POST ARCHIVE FACTION (PAF)</span>
        </div>
      </footer>

    </main>
  );
}
