export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full border-4 border-slate-200 border-t-primary animate-spin" />
        <span className="text-xs font-mono tracking-widest text-slate-500 uppercase">
          Initializing Portfolio Core...
        </span>
      </div>
    </div>
  );
}
