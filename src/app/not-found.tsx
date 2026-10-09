import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 px-4 text-center">
      <div className="max-w-md space-y-4">
        <h1 className="text-6xl font-black text-primary">404</h1>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Page Not Found</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          The page you are looking for does not exist or has been moved.
        </p>
        <div>
          <Link
            href="/"
            className="inline-flex px-6 py-2.5 rounded-full bg-primary text-white font-semibold text-xs transition-opacity hover:opacity-90"
          >
            Return to Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
