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
      <div className="flex-1 flex items-center justify-center -mt-10 w-full">
        {/* Responsive profile card/container */}
        <div className="w-full p-4 md:w-[80%] md:max-w-[480px] lg:w-[400px] lg:max-w-none text-center md:text-left">
          <h1 className="text-base font-normal mb-6 uppercase tracking-wider">
            조보라
          </h1>
          <p className="leading-relaxed text-sm md:text-base">
            안녕하세요.<br />
            한양대학교 의류학과 조보라입니다.
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <footer className="text-[11px] leading-snug md:text-xs">
        <div className="pt-2 border-t border-black/10">
          <span>Bora Jo (BRJ)</span>
        </div>
      </footer>

    </main>
  );
}
