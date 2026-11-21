import Image from "next/image";

const HANDLE_CHARS = ["0", "x", "d", "e", "v", "p", "r", "a", "b", "h", "u"];

export default function Loading() {
  return (
    <div
      aria-label="Loading route"
      role="status"
      className="fixed inset-0 z-[99999] flex items-center justify-center px-4 bg-slate-50/98 dark:bg-[#030712]/98 backdrop-blur-xl select-none"
    >
      <div className="w-full max-w-[440px] rounded-3xl bg-white dark:bg-[#090f1d] border border-slate-200/90 dark:border-slate-800/90 p-5 sm:p-6 shadow-[0_24px_60px_-15px_rgba(15,23,42,0.12)] dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.7)]">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          {/* Portrait Frame */}
          <div className="relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <Image
              src="/assets/images/profile.jpg"
              alt="Prabhu P"
              fill
              sizes="96px"
              priority
              className="object-cover"
            />
          </div>

          {/* Solari Split-Flap Tiles */}
          <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left">
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
              Full Stack Developer
            </span>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white tracking-tight mt-0.5">
              Prabhu P
            </h2>

            <div className="flex items-center gap-[3px] mt-3">
              {HANDLE_CHARS.map((char, idx) => (
                <div
                  key={idx}
                  className={`relative w-[21px] h-8 rounded-[5px] flex items-center justify-center font-mono text-xs font-bold border ${
                    idx < 2
                      ? "bg-primary/10 border-primary/40 text-primary"
                      : "bg-slate-900 dark:bg-slate-800 border-slate-800 dark:border-slate-700 text-white"
                  }`}
                >
                  <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/20 dark:bg-black/50" />
                  <span>{char}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}