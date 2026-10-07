'use client';
import { useCallback, useSyncExternalStore } from 'react';

export interface StreakData {
  streak: number;
  lastDate: string | null;
  total: number;
}

const STORAGE_KEY = 'ai-pulse-practice-streak';
const DEFAULT: StreakData = { streak: 0, lastDate: null, total: 0 };

type Store = { data: StreakData | null; listeners: Set<() => void> };
const store: Store = { data: null, listeners: new Set() };

function today() {
  return new Date().toISOString().slice(0, 10);
}

function read(): StreakData {
  if (store.data === null) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      store.data = raw ? (JSON.parse(raw) as StreakData) : { ...DEFAULT };
    } catch {
      store.data = { ...DEFAULT };
    }
  }
  return store.data;
}

function notify() {
  store.listeners.forEach((l) => l());
}

export function recordPracticeSession() {
  const date = today();
  const current = read();
  if (current.lastDate === date) return; // already counted today
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  const newStreak = current.lastDate === yesterday ? current.streak + 1 : 1;
  store.data = { streak: newStreak, lastDate: date, total: current.total + 1 };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.data));
  } catch {}
  notify();
}

export function usePracticeStreak() {
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

  return useSyncExternalStore(subscribe, read, () => ({ ...DEFAULT }));
}
