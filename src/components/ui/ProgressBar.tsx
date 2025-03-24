import { useEffect, useState } from "react";

interface ProgressProps {
  progress: number;
  className?: string;
}

export function ProgressAnimated({ progress, className }: ProgressProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-800", ${className}`}
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 animate-pulse"
        style={{ width: "100%" }}
      />
      <div
        className={`h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500 ease-out" ${
          mounted ? "transition-all" : "transition-none"
        }`}
        style={{ width: `${progress}%` }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>

      <div
        className="absolute inset-0 rounded-full opacity-30 blur-sm bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default ProgressAnimated;
