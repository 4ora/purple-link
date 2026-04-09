export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900 p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-500/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-md w-full rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-10 shadow-2xl transform transition-all hover:-translate-y-2 duration-500">
        <div className="flex flex-col items-center text-center space-y-8">
          
          {/* Avatar Ring */}
          <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-purple-400 via-fuchsia-300 to-pink-300 p-1 shadow-[0_0_40px_rgba(192,132,252,0.3)] hover:shadow-[0_0_60px_rgba(192,132,252,0.5)] transition-shadow duration-500">
            <div className="w-full h-full rounded-full bg-indigo-950 flex flex-col items-center justify-center border-4 border-transparent overflow-hidden object-cover relative">
              <span className="text-5xl drop-shadow-md">💜</span>
            </div>
          </div>
          
          {/* Text Content */}
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200 tracking-tight">
              조보라
            </h1>
            <p className="text-purple-100/90 text-lg font-medium leading-relaxed tracking-wide">
              안녕하세요.<br/>
              한양대학교 의류학과 조보라입니다.
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-4 w-full">
            <button className="w-full py-4 px-6 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-semibold transition-all duration-300 flex items-center justify-center space-x-2 group">
              <span>알아보기</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
          
        </div>
      </div>
    </main>
  );
}
