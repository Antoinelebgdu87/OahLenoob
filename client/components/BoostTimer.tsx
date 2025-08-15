import { cn } from "@/lib/utils";

interface BoostTimerProps {
  isActive: boolean;
  timeLeft: number;
  className?: string;
}

export function BoostTimer({ isActive, timeLeft, className }: BoostTimerProps) {
  if (!isActive) return null;

  return (
    <div
      className={cn(
        "fixed top-4 left-4 z-50 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg shadow-lg border-2 border-green-400",
        "animate-glow-pulse",
        className,
      )}
    >
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
        <div className="font-bold text-sm">BOOST MODE: {timeLeft}s</div>
        <div className="text-xs">+5-10 R$ chances!</div>
      </div>
    </div>
  );
}
