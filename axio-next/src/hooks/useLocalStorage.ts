"use client";

import { useEffect, useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  parse: (value: unknown) => T = (value) => value as T,
) {
  const [value, setValue] = useState<T>(initialValue);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) {
        setValue(parse(JSON.parse(stored)));
      }
    } finally {
      setReady(true);
    }
  }, [key, parse]);

  useEffect(() => {
    if (!ready) {
      return;
    }

    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, ready, value]);

  return [value, setValue, ready] as const;
}
