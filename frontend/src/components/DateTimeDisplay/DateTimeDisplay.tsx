import { useEffect, useState } from "react";
import { CalendarDays, Clock } from "lucide-react";

export default function DateTimeDisplay() {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const date = now.toLocaleDateString("en-IN", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return (
    <div className="flex items-center gap-3 whitespace-nowrap">
      <div className="flex items-center gap-2 text-sm text-slate-300">
        <CalendarDays className="h-4 w-4 text-slate-400" />
        <span>{date}</span>
      </div>
      <div className="h-5 w-px bg-white/10" />
      <div className="flex items-center gap-2 text-sm text-slate-300">
        <Clock className="h-4 w-4 text-slate-400" />
        <span>{time}</span>
      </div>
    </div>
  );
}
