'use client';
import { useCallback, useSyncExternalStore } from 'react';

export type ConfidenceRating = 1 | 2 | 3 | 4 | 5;
export type RatingsMap = Record<string, ConfidenceRating>;

const STORAGE_KEY = 'ai-pulse-confidence-ratings';
const EMPTY: RatingsMap = {};

type Store = { data: RatingsMap | null; listeners: Set<() => void> };
const store: Store = { data: null, listeners: new Set() };

function read(): RatingsMap {
  if (store.data === null) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      store.data = raw ? (JSON.parse(raw) as RatingsMap) : {};
    } catch {
      store.data = {};
    }
  }
  return store.data;
}

function notify() {
  store.listeners.forEach((l) => l());
}

export function setConfidenceRating(questionId: string, rating: ConfidenceRating) {
  const current = read();
  store.data = { ...current, [questionId]: rating };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.data));
  } catch {}
  notify();
}

export function useConfidenceRatings() {
  const subscribe = useCallback((listener: () => void) => {
    if (store.listeners.size === 0) store.data = null;
    store.listeners.add(listener);
    const sync = (e: StorageEvent) => {
      if (e.key !== null && e.key !== STORAGE_KEY) return;
      store.data = null;
      listener();
    };
    window.addEventListener('storage', sync);
    return () => {
      store.listeners.delete(listener);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const ratings = useSyncExternalStore(subscribe, read, () => EMPTY);
  return { ratings };
}
