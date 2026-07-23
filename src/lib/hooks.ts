import { useEffect, useState } from "react";

function formatIST() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

/** Live HH:MM:SS in IST (Asia/Kolkata). Initialises synchronously to avoid a flash. */
export function useIST() {
  const [time, setTime] = useState<string>(() =>
    typeof window !== "undefined" ? formatIST() : "--:--:--",
  );

  useEffect(() => {
    setTime(formatIST());
    const id = window.setInterval(() => setTime(formatIST()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}
