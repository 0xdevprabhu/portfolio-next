import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-950/95 dark:bg-[#030712]/95 backdrop-blur-xl select-none">
      {/* Ambient background glow */}
      <div
        className="absolute w-[360px] h-[360px] rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-glow"
        style={{
          background: "radial-gradient(circle, var(--primary) 0%, rgba(2, 132, 199, 0.15) 45%, transparent 70%)",
        }}
      />

      {/* Main Avatar & Orbiting Dots */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Pulsing Ripple Shockwave */}
        <div className="absolute w-28 h-28 rounded-full border border-primary/30 animate-ripple pointer-events-none" />

        {/* Orbit Tracks */}
        <div className="absolute w-[208px] h-[208px] rounded-full border border-dashed border-primary/25 pointer-events-none" />
        <div className="absolute w-[144px] h-[144px] rounded-full border border-slate-700/40 pointer-events-none" />

        {/* Orbiting Dots Ring */}
        <div className="absolute inset-0 flex items-center justify-center animate-spin-reverse pointer-events-none">
          <div className="absolute -top-1 w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
          <div className="absolute -bottom-1 w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
          <div className="absolute -left-1 w-2.5 h-2.5 rounded-full bg-primary-light shadow-[0_0_8px_var(--primary-light)]" />
          <div className="absolute -right-1 w-2.5 h-2.5 rounded-full bg-primary-light shadow-[0_0_8px_var(--primary-light)]" />
        </div>

        {/* Inner Fast Orbit Dots */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ animation: "spin 3.2s linear infinite" }}
        >
          <div className="absolute top-10 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
          <div className="absolute bottom-10 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
          <div className="absolute left-10 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
          <div className="absolute right-10 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
        </div>

        {/* Center Profile Photo Frame */}
        <div className="relative z-10 w-24 h-24 rounded-full p-[3px] bg-gradient-to-tr from-primary via-primary-light to-accent shadow-[0_0_28px_var(--shadow-glow)]">
          <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-slate-950/80 relative">
            <Image
              src="/assets/images/profile.jpg"
              alt="Prabhu P"
              fill
              sizes="96px"
              priority
              className="object-cover rounded-full select-none"
            />
          </div>
          <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950 shadow-[0_0_8px_#10b981]" />
        </div>
      </div>

      {/* Developer Branding */}
      <div className="flex flex-col items-center mt-6 text-center z-10 space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-[0.28em] text-white/90">
          Prabhu P
        </h2>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono pt-1">
          <span>Loading Experience</span>
          <span className="inline-flex gap-0.5">
            <span className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
          </span>
        </div>
      </div>
    </div>
  );
}
