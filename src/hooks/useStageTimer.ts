
import { useState, useEffect, useRef } from "react";

export function useStageTimer(isRunning: boolean) {
  const [timer, setTimer] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startedRef = useRef<number>(Date.now());

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current as any);
      }
      return;
    }
    startedRef.current = Date.now();
    setTimer(0);
    intervalRef.current = setInterval(() => {
      setTimer(Math.floor((Date.now() - startedRef.current) / 1000));
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current as any);
    };
  }, [isRunning]);

  function getElapsed() {
    return Math.floor((Date.now() - startedRef.current) / 1000);
  }

  return { timer, getElapsed, reset: () => setTimer(0) };
}
