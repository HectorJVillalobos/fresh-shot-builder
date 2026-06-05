import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "freshshot-favorites";

function readIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(readIds());
  }, []);

  const persist = useCallback((next: string[]) => {
    setIds(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const isFavorite = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback(
    (id: string) => {
      persist(isFavorite(id) ? ids.filter((x) => x !== id) : [...ids, id]);
    },
    [ids, isFavorite, persist],
  );

  return { ids, isFavorite, toggle };
}
