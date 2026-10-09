"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 px-4 text-center">
      <div className="max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Something went wrong</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          An unexpected error occurred. Please try resetting the view.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 rounded-full bg-primary text-white font-semibold text-xs transition-opacity hover:opacity-90"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
