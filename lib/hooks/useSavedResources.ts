'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { parseSavedIds } from '@/lib/utils/directory';

export type ResourceKind =
  'tools' | 'questions' | 'episodes' | 'shows' | 'practised';
const EMPTY: string[] = [];
type Store = {
  ids: string[] | null;
  error: boolean;
  listeners: Set<() => void>;
};
const stores = new Map<ResourceKind, Store>();
const key = (kind: ResourceKind) => `ai-pulse-saved-${kind}`;
function storeFor(kind: ResourceKind) {
  let store = stores.get(kind);
  if (!store) {
    store = { ids: null, error: false, listeners: new Set() };
    stores.set(kind, store);
  }
  return store;
}
function read(kind: ResourceKind) {
  const store = storeFor(kind);
  if (store.ids === null) {
    try {
      store.ids = parseSavedIds(localStorage.getItem(key(kind)));
    } catch {
      store.ids = [];
    }
  }
  return store.ids;
}
function subscribe(kind: ResourceKind, listener: () => void) {
  const store = storeFor(kind);
  // Re-read when returning to a collection after its last subscriber left.
  if (store.listeners.size === 0 && !store.error) store.ids = null;
  store.listeners.add(listener);
  const sync = (event: StorageEvent) => {
    if (event.key !== null && event.key !== key(kind)) return;
    store.ids = null;
    store.error = false;
    listener();
  };
  window.addEventListener('storage', sync);
  return () => {
    store.listeners.delete(listener);
    window.removeEventListener('storage', sync);
  };
}
export function toggleSavedResource(kind: ResourceKind, id: string) {
  const store = storeFor(kind);
  const current = read(kind);
  store.ids = current.includes(id)
    ? current.filter((saved) => saved !== id)
    : [...current, id];
  try {
    localStorage.setItem(key(kind), JSON.stringify(store.ids));
    store.error = false;
  } catch {
    store.error = true;
  }
  store.listeners.forEach((listener) => listener());
}
export function useSavedResources(kind: ResourceKind) {
  const subscribeToKind = useCallback(
    (listener: () => void) => subscribe(kind, listener),
    [kind],
  );
  const savedIds = useSyncExternalStore(
    subscribeToKind,
    () => read(kind),
    () => EMPTY,
  );
  const storageError = useSyncExternalStore(
    subscribeToKind,
    () => storeFor(kind).error,
    () => false,
  );
  return {
    savedIds,
    storageError,
    toggleSaved: (id: string) => toggleSavedResource(kind, id),
  };
}
