export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-px bg-black border border-black relative">
        
        {/* Decorative corner markers (PAF Techwear Aesthetic) */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-4 border-l-4 border-black -translate-x-1 -translate-y-1 z-10 bg-white"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-4 border-r-4 border-black translate-x-1 -translate-y-1 z-10 bg-white"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-4 border-l-4 border-black -translate-x-1 translate-y-1 z-10 bg-white"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-4 border-r-4 border-black translate-x-1 translate-y-1 z-10 bg-white"></div>

        {/* Top Header Row */}
        <header className="col-span-1 md:col-span-12 flex justify-between items-center bg-white px-6 py-3">
          <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest flex space-x-6">
            <span><span className="font-bold">SYSTEM_ID:</span> PAF_ARCHIVE_01</span>
            <span className="hidden md:inline"><span className="font-bold">STATUS:</span> ACTIVE_PROTOTYPE</span>
          </div>
          <div className="text-[10px] md:text-xs font-mono uppercase tracking-widest">
            <span className="font-bold mr-2">DATE.</span> 2026.04.10
          </div>
        </header>

        {/* Left Column - Imagery & Big Typography */}
        <div className="col-span-1 md:col-span-5 flex flex-col bg-white">
          <div className="w-full aspect-[4/5] bg-[#ececec] relative flex items-center justify-center overflow-hidden group border-b border-black">
            {/* Placeholder Image / Graphic */}
            <div className="absolute inset-0 opacity-10 flex flex-col items-center justify-center pointer-events-none transition-transform duration-1000 group-hover:scale-110">
               <span className="text-[12rem] leading-none font-bold tracking-tighter">BORA</span>
            </div>
            
            {/* Crosshair target design inside box */}
            <div className="relative z-10 flex items-center justify-center w-3/4 h-3/4 border border-black/20 group-hover:border-black transition-colors duration-500">
               <div className="absolute top-2 left-2 text-[10px] font-mono">TOP_L</div>
               <div className="absolute bottom-2 right-2 text-[10px] font-mono">BTM_R</div>
               {/* Center Focus mark */}
               <div className="w-8 h-8 border border-black flex items-center justify-center">
                 <div className="w-1 h-1 bg-black"></div>
               </div>
            </div>
          </div>

          <div className="p-6 md:p-10 flex-grow flex flex-col justify-end">
             <p className="font-mono text-xs uppercase mb-4 tracking-widest font-bold">Subject_Name</p>
             <h1 className="text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none">
               조보라
             </h1>
          </div>
        </div>

        {/* Right Column - Data & Details */}
        <div className="col-span-1 md:col-span-7 flex flex-col bg-white">
          <div className="flex-grow p-6 md:p-10 lg:p-16 flex flex-col justify-center space-y-12">
            
            <div className="space-y-4">
              <h2 className="text-sm font-mono uppercase bg-black text-white inline-block px-3 py-1 font-bold">
                Identity_Log
              </h2>
              <div className="font-mono text-sm md:text-base leading-relaxed tracking-tight border-l-2 border-black pl-4 py-1 space-y-4">
                <p>
                  <span className="text-[10px] uppercase opacity-50 block mb-1">&gt;&gt; Text_Input</span>
                  안녕하세요.<br/>
                  한양대학교 의류학과 조보라입니다.
                </p>
                <p className="text-xs opacity-70">
                  <span className="text-[10px] uppercase block mb-1">&gt;&gt; Dept_Tags</span>
                  [CLOTHING & TEXTILES] [DESIGN_ARCHIVE] [EXPERIMENTAL]
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px bg-black border border-black">
              <div className="bg-white p-4 h-32 flex flex-col justify-between">
                <span className="font-mono text-[10px] uppercase font-bold relative inline-block">
                  Skill_Set
                  <div className="absolute -left-4 top-1 w-2 h-px bg-black"></div>
                </span>
                <span className="font-sans text-xl md:text-2xl font-bold tracking-tighter uppercase">Design<br/>System</span>
              </div>
              <div className="bg-white p-4 h-32 flex flex-col justify-between">
                <span className="font-mono text-[10px] uppercase font-bold text-right w-full block">Data_Spec</span>
                <span className="font-mono text-right text-sm">HANYANG_UNIV<br/>CLASS_OF_2X</span>
              </div>
            </div>

          </div>

          {/* Action Area */}
          <div className="mt-auto border-t border-black bg-white">
            <button className="w-full group font-mono text-sm md:text-base py-6 hover:bg-black hover:text-white transition-colors duration-300 uppercase tracking-widest flex justify-between items-center px-6 md:px-10">
              <span className="font-bold relative overflow-hidden">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">Expand_Archive</span>
                <span className="inline-block absolute left-0 top-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">Access_Granted</span>
              </span>
              <span className="text-xl">⬎</span>
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
